// Package api wires the HTTP router, middleware and handlers.
package api

import (
	"context"
	"encoding/json"
	"log/slog"
	"net/http"
	"path/filepath"
	"runtime"
	"strings"
	"sync"

	"github.com/youruser/oppailib/internal/ai"
	"github.com/youruser/oppailib/internal/buildinfo"
	"github.com/youruser/oppailib/internal/config"
	"github.com/youruser/oppailib/internal/db"
	"github.com/youruser/oppailib/internal/scraper"
	"github.com/youruser/oppailib/internal/settings"
	"github.com/youruser/oppailib/internal/storage"
	"github.com/youruser/oppailib/internal/sources"
	oweb "github.com/youruser/oppailib/internal/web"
)

type Server struct {
	cfg      *config.Config
	db       *db.DB
	store    *storage.Store
	scraper  *scraper.Engine
	sources  *sources.Registry
	ai       *ai.Manager
	settings *settings.Store
	kek      []byte
	log      *slog.Logger

	thumbSem  chan struct{} // bounds concurrent ffmpeg thumbnail jobs
	thumbWarn sync.Once      // warn once if ffmpeg is missing
}

func NewServer(cfg *config.Config, database *db.DB, store *storage.Store, sc *scraper.Engine, aiMgr *ai.Manager, set *settings.Store, kek []byte, log *slog.Logger) *Server {
	// Cap thumbnail workers well below core count: ffmpeg is CPU-heavy and this is
	// background work that must not starve request handling on a lean Unraid box.
	workers := runtime.GOMAXPROCS(0) / 2
	if workers < 1 {
		workers = 1
	}
	if workers > 4 {
		workers = 4
	}
	return &Server{
		cfg: cfg, db: database, store: store, scraper: sc, ai: aiMgr, settings: set,
		// Built-in source definitions are embedded; /config/sources overrides them, so
		// a site that restyles can be repaired without a rebuild.
		sources:  sources.NewRegistry(scraperFetcher{e: sc}, filepath.Join(cfg.ConfigDir, "sources"), log),
		kek:      kek,
		log:      log,
		thumbSem: make(chan struct{}, workers),
	}
}

// StartBackgroundJobs kicks off one-time startup work: backfilling video posters
// and indexing comics (page count + cover) that predate the in-app reader. Call
// once after the server is constructed.
func (s *Server) StartBackgroundJobs() {
	go s.backfillThumbnails()
	go s.backfillComics()
}

// Handler builds the full http.Handler (API + static web UI).
func (s *Server) Handler() http.Handler {
	mux := http.NewServeMux()

	// Health / readiness.
	mux.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]any{
			"status":    "ok",
			"version":   buildinfo.String(),
			"aiEnabled": s.ai.Enabled(),
			"aiTagger":  s.ai.TaggerName(),
		})
	})

	// Auth (public).
	mux.HandleFunc("POST /api/auth/login", s.handleLogin)
	mux.HandleFunc("POST /api/auth/logout", s.requireAuth(s.handleLogout))
	mux.HandleFunc("GET /api/auth/me", s.requireAuth(s.handleMe))
	mux.HandleFunc("POST /api/auth/password", s.requireAuth(s.handleChangePassword))

	// Settings + library stats (protected; writing settings is admin-only).
	mux.HandleFunc("GET /api/settings", s.requireAuth(s.handleGetSettings))
	mux.HandleFunc("PUT /api/settings", s.requireAuth(s.requireAdmin(s.handlePutSettings)))
	mux.HandleFunc("GET /api/stats", s.requireAuth(s.handleStats))

	// Media (protected).
	mux.HandleFunc("GET /api/media", s.requireAuth(s.handleListMedia))
	mux.HandleFunc("POST /api/media", s.requireAuth(s.handleUploadMedia))
	mux.HandleFunc("POST /api/media/bulk", s.requireAuth(s.handleBulkMedia))
	mux.HandleFunc("GET /api/media/{id}", s.requireAuth(s.handleGetMedia))
	mux.HandleFunc("PATCH /api/media/{id}", s.requireAuth(s.handleUpdateMedia))
	mux.HandleFunc("DELETE /api/media/{id}", s.requireAuth(s.handleDeleteMedia))
	mux.HandleFunc("GET /api/media/{id}/stream", s.requireAuth(s.handleStreamMedia))
	mux.HandleFunc("GET /api/media/{id}/thumb", s.requireAuth(s.handleThumb))
	mux.HandleFunc("POST /api/media/{id}/autotag", s.requireAuth(s.handleAutotag))

	// Comics: read page-by-page out of the archive instead of downloading it.
	mux.HandleFunc("GET /api/media/{id}/comic", s.requireAuth(s.handleComicInfo))
	mux.HandleFunc("GET /api/media/{id}/page/{n}", s.requireAuth(s.handleComicPage))

	// Scraper (protected).
	// Remote sources: browse and stream a catalogue without importing anything.
	// Only /save crosses over into the library.
	mux.HandleFunc("GET /api/sources", s.requireAuth(s.handleListSources))
	mux.HandleFunc("GET /api/sources/{id}/browse", s.requireAuth(s.handleBrowseSource))
	mux.HandleFunc("GET /api/sources/{id}/item/{item}/pages", s.requireAuth(s.handleSourcePages))
	mux.HandleFunc("GET /api/sources/stream", s.requireAuth(s.handleSourceStream))
	mux.HandleFunc("POST /api/sources/{id}/save", s.requireAuth(s.handleSourceSave))

	// The Android app, served from the box that holds the library it talks to.
	mux.HandleFunc("GET /api/apk/info", s.requireAuth(s.handleAPKInfo))
	mux.HandleFunc("GET /api/apk", s.requireAuth(s.handleAPKDownload))

	mux.HandleFunc("POST /api/scrape", s.requireAuth(s.handleScrape))
	mux.HandleFunc("POST /api/scrape/bulk", s.requireAuth(s.handleScrapeBulk))
	mux.HandleFunc("POST /api/scrape/import", s.requireAuth(s.handleScrapeImport))
	mux.HandleFunc("GET /api/scrape/proxy", s.requireAuth(s.handleScrapeProxy))

	// Static web UI (SPA) for everything else.
	mux.Handle("/", oweb.Handler())

	return logging(s.log, mux)
}

// ── middleware ─────────────────────────────────────────────────────────

type ctxKey string

const userKey ctxKey = "user"

func (s *Server) requireAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := bearer(r)
		if token == "" {
			writeErr(w, http.StatusUnauthorized, "missing token")
			return
		}
		user, err := s.db.SessionUser(r.Context(), token)
		if err != nil {
			writeErr(w, http.StatusUnauthorized, "invalid or expired session")
			return
		}
		ctx := context.WithValue(r.Context(), userKey, user)
		next(w, r.WithContext(ctx))
	}
}

// requireAdmin gates a handler that has already passed requireAuth. Settings
// affect every user of the install (and the scraper's behaviour toward third-party
// hosts), so only an admin may change them.
func (s *Server) requireAdmin(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		u, ok := r.Context().Value(userKey).(*db.UserRow)
		if !ok || !u.IsAdmin {
			writeErr(w, http.StatusForbidden, "admin only")
			return
		}
		next(w, r)
	}
}

func bearer(r *http.Request) string {
	h := r.Header.Get("Authorization")
	if after, ok := strings.CutPrefix(h, "Bearer "); ok {
		return after
	}
	// Fall back to cookie for browser SPA.
	if c, err := r.Cookie("oppai_session"); err == nil {
		return c.Value
	}
	return ""
}

func logging(log *slog.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Debug("request", "method", r.Method, "path", r.URL.Path)
		next.ServeHTTP(w, r)
	})
}

// ── helpers ────────────────────────────────────────────────────────────

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func writeErr(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]string{"error": msg})
}
