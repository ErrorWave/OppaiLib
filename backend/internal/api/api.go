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
	"time"

	"github.com/youruser/oppailib/internal/ai"
	"github.com/youruser/oppailib/internal/buildinfo"
	"github.com/youruser/oppailib/internal/config"
	"github.com/youruser/oppailib/internal/db"
	"github.com/youruser/oppailib/internal/imagegen"
	"github.com/youruser/oppailib/internal/scraper"
	"github.com/youruser/oppailib/internal/settings"
	"github.com/youruser/oppailib/internal/sources"
	"github.com/youruser/oppailib/internal/storage"
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

	// Image generation. The client is stateless (the A1111 URL is read from settings
	// per call); genCache holds just-generated images in memory so they can be
	// previewed and saved without ever touching disk — the "don't save unless asked"
	// rule. modelThumbDir holds the (encrypted) checkpoint preview images.
	imagegen      *imagegen.Client
	genCache      *genCache
	modelThumbDir string

	thumbSem  chan struct{} // bounds concurrent ffmpeg thumbnail jobs
	thumbWarn sync.Once     // warn once if ffmpeg is missing

	login *loginGuard // rate-limits + bounds the cost of the login endpoint

	// Resolving a remote item costs a throttled round trip to someone else's site,
	// so the answers are cached. A gallery's page list is immutable, so it keeps for
	// a while; a thread's comments are not, so they keep only long enough to absorb
	// a double-tap. See resolveCache.
	pageCache    *resolveCache[[]string]
	commentCache *resolveCache[[]sources.Comment]
}

const (
	sourcePagesTTL    = 10 * time.Minute
	sourceCommentsTTL = 30 * time.Second
)

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
		login:    newLoginGuard(),

		imagegen:      imagegen.New(),
		genCache:      newGenCache(),
		modelThumbDir: filepath.Join(cfg.ConfigDir, "model_thumbs"),

		pageCache:    newResolveCache[[]string](sourcePagesTTL),
		commentCache: newResolveCache[[]sources.Comment](sourceCommentsTTL),
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
	// /me is the session *probe*, so it must not count as activity — the web client
	// polls it to notice a session that has been invalidated, and a poll that kept
	// the session alive would mean an idle tab never idles out. See requireSession.
	mux.HandleFunc("GET /api/auth/me", s.requireSession(s.handleMe, false))
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
	// The conversation an item was posted in — a 4chan thread's comments.
	mux.HandleFunc("GET /api/sources/{id}/item/{item}/comments", s.requireAuth(s.handleSourceComments))
	mux.HandleFunc("GET /api/sources/stream", s.requireAuth(s.handleSourceStream))
	mux.HandleFunc("POST /api/sources/{id}/save", s.requireAuth(s.handleSourceSave))

	// The Android app, served from the box that holds the library it talks to.
	mux.HandleFunc("GET /api/apk/info", s.requireAuth(s.handleAPKInfo))
	mux.HandleFunc("GET /api/apk", s.requireAuth(s.handleAPKDownload))

	// Image generation (protected). Generated images live only in memory until the
	// user explicitly saves one — /generate returns preview ids, /save crosses into
	// the library. The A1111-style backend is on the user's own network.
	mux.HandleFunc("GET /api/imagegen/status", s.requireAuth(s.handleImageGenStatus))
	mux.HandleFunc("POST /api/imagegen/prompt", s.requireAuth(s.handleImageGenPrompt))
	mux.HandleFunc("POST /api/imagegen/generate", s.requireAuth(s.handleImageGenGenerate))
	mux.HandleFunc("GET /api/imagegen/preview/{id}", s.requireAuth(s.handleImageGenPreview))
	mux.HandleFunc("POST /api/imagegen/save", s.requireAuth(s.handleImageGenSave))
	mux.HandleFunc("GET /api/imagegen/model-thumb", s.requireAuth(s.handleGetModelThumb))
	mux.HandleFunc("PUT /api/imagegen/model-thumb", s.requireAuth(s.handleSetModelThumb))

	mux.HandleFunc("POST /api/scrape", s.requireAuth(s.handleScrape))
	mux.HandleFunc("POST /api/scrape/bulk", s.requireAuth(s.handleScrapeBulk))
	mux.HandleFunc("POST /api/scrape/import", s.requireAuth(s.handleScrapeImport))
	mux.HandleFunc("GET /api/scrape/proxy", s.requireAuth(s.handleScrapeProxy))

	// Static web UI (SPA) for everything else.
	mux.Handle("/", oweb.Handler())

	return securityHeaders(logging(s.log, mux))
}

// ── middleware ─────────────────────────────────────────────────────────

type ctxKey string

const userKey ctxKey = "user"

// requireAuth gates a handler on a valid session and counts the request as user
// activity, which is what holds an idle-expiring session open.
func (s *Server) requireAuth(next http.HandlerFunc) http.HandlerFunc {
	return s.requireSession(next, true)
}

// requireSession gates a handler on a valid session. activity says whether reaching
// this handler means the user is *doing* something.
//
// The distinction is the whole of the idle rule. A browser session dies after
// s.cfg.WebIdleTimeout of inactivity (see db.SessionUser), and "inactivity" has to
// mean "the user isn't using the app" — not "the app isn't making requests". The web
// client polls /api/auth/me to find out whether its session is still good, and if
// that poll refreshed the session, a tab left open overnight would keep itself alive
// forever and the idle timeout would be decorative. So the probe reads the session
// without touching it, and every endpoint that exists because the user asked for
// something touches it.
//
// The Android app is exempt from idling entirely (it holds a long-lived token by
// design), so the touch is a no-op for it — see db.TouchSession.
func (s *Server) requireSession(next http.HandlerFunc, activity bool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := bearer(r)
		if token == "" {
			writeErr(w, http.StatusUnauthorized, "missing token")
			return
		}
		user, err := s.db.SessionUser(r.Context(), token, s.cfg.WebIdleTimeout)
		if err != nil {
			writeErr(w, http.StatusUnauthorized, "invalid or expired session")
			return
		}
		if activity {
			// Best-effort: a failed heartbeat write must not fail the request the user
			// actually made. The worst case is an early idle-out, not a wrong answer.
			if err := s.db.TouchSession(r.Context(), token, s.cfg.WebIdleTimeout); err != nil {
				s.log.Debug("touch session", "err", err)
			}
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
