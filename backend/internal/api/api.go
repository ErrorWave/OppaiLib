// Package api wires the HTTP router, middleware and handlers.
package api

import (
	"context"
	"encoding/json"
	"log/slog"
	"net/http"
	"strings"

	"github.com/youruser/oppailib/internal/ai"
	"github.com/youruser/oppailib/internal/config"
	"github.com/youruser/oppailib/internal/db"
	"github.com/youruser/oppailib/internal/scraper"
	"github.com/youruser/oppailib/internal/storage"
	oweb "github.com/youruser/oppailib/internal/web"
)

type Server struct {
	cfg     *config.Config
	db      *db.DB
	store   *storage.Store
	scraper *scraper.Engine
	ai      *ai.Manager
	kek     []byte
	log     *slog.Logger
}

func NewServer(cfg *config.Config, database *db.DB, store *storage.Store, sc *scraper.Engine, aiMgr *ai.Manager, kek []byte, log *slog.Logger) *Server {
	return &Server{cfg: cfg, db: database, store: store, scraper: sc, ai: aiMgr, kek: kek, log: log}
}

// Handler builds the full http.Handler (API + static web UI).
func (s *Server) Handler() http.Handler {
	mux := http.NewServeMux()

	// Health / readiness.
	mux.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]any{
			"status":     "ok",
			"aiEnabled":  s.ai.Enabled(),
			"aiTagger":   s.ai.TaggerName(),
		})
	})

	// Auth (public).
	mux.HandleFunc("POST /api/auth/login", s.handleLogin)
	mux.HandleFunc("POST /api/auth/logout", s.requireAuth(s.handleLogout))
	mux.HandleFunc("GET /api/auth/me", s.requireAuth(s.handleMe))

	// Media (protected).
	mux.HandleFunc("GET /api/media", s.requireAuth(s.handleListMedia))
	mux.HandleFunc("POST /api/media", s.requireAuth(s.handleUploadMedia))
	mux.HandleFunc("GET /api/media/{id}", s.requireAuth(s.handleGetMedia))
	mux.HandleFunc("GET /api/media/{id}/stream", s.requireAuth(s.handleStreamMedia))
	mux.HandleFunc("POST /api/media/{id}/autotag", s.requireAuth(s.handleAutotag))

	// Scraper (protected).
	mux.HandleFunc("POST /api/scrape", s.requireAuth(s.handleScrape))
	mux.HandleFunc("POST /api/scrape/bulk", s.requireAuth(s.handleScrapeBulk))
	mux.HandleFunc("POST /api/scrape/import", s.requireAuth(s.handleScrapeImport))

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
