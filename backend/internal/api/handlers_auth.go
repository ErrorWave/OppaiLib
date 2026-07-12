package api

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"

	"github.com/youruser/oppailib/internal/auth"
	"github.com/youruser/oppailib/internal/db"
	"github.com/youruser/oppailib/internal/models"
)

type loginReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
	// Client says who is signing in: "android" for the app, anything else (including
	// nothing) is treated as a browser. Only the app is exempt from the idle timeout
	// and the restart purge — see db.ClientAndroid.
	Client string `json:"client"`
}

func (s *Server) handleLogin(w http.ResponseWriter, r *http.Request) {
	var req loginReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeErr(w, http.StatusBadRequest, "invalid body")
		return
	}
	user, err := s.db.UserByName(r.Context(), req.Username)
	if errors.Is(err, sql.ErrNoRows) {
		writeErr(w, http.StatusUnauthorized, "invalid credentials")
		return
	} else if err != nil {
		writeErr(w, http.StatusInternalServerError, "server error")
		return
	}
	ok, err := auth.VerifyPassword(user.PwHash, req.Password)
	if err != nil || !ok {
		writeErr(w, http.StatusUnauthorized, "invalid credentials")
		return
	}
	token, err := auth.NewToken()
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "server error")
		return
	}
	// Anything that doesn't say it's the app is a browser, and gets browser rules.
	client := db.ClientWeb
	if req.Client == db.ClientAndroid {
		client = db.ClientAndroid
	}
	if err := s.db.CreateSession(r.Context(), token, user.ID, s.cfg.SessionTTL, client); err != nil {
		writeErr(w, http.StatusInternalServerError, "server error")
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:     "oppai_session",
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   int(s.cfg.SessionTTL.Seconds()),
	})
	writeJSON(w, http.StatusOK, map[string]any{
		"token": token,
		"user":  models.User{ID: user.ID, Username: user.Username, IsAdmin: user.IsAdmin},
	})
}

func (s *Server) handleLogout(w http.ResponseWriter, r *http.Request) {
	if token := bearer(r); token != "" {
		_ = s.db.DeleteSession(r.Context(), token)
	}
	http.SetCookie(w, &http.Cookie{Name: "oppai_session", Value: "", Path: "/", MaxAge: -1})
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (s *Server) handleMe(w http.ResponseWriter, r *http.Request) {
	u := r.Context().Value(userKey).(*db.UserRow)
	writeJSON(w, http.StatusOK, models.User{ID: u.ID, Username: u.Username, IsAdmin: u.IsAdmin})
}
