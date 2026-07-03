package api

import (
	"database/sql"
	"errors"
	"net/http"
	"strconv"
)

// handleAutotag runs the AI tagger synchronously for one media item and returns
// its refreshed tag list. Useful for re-tagging or tagging older imports.
func (s *Server) handleAutotag(w http.ResponseWriter, r *http.Request) {
	if !s.ai.Enabled() {
		writeErr(w, http.StatusServiceUnavailable, "ai tagging disabled")
		return
	}
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 64)
	if err != nil {
		writeErr(w, http.StatusBadRequest, "bad id")
		return
	}
	row, err := s.db.GetMedia(r.Context(), id)
	if errors.Is(err, sql.ErrNoRows) {
		writeErr(w, http.StatusNotFound, "not found")
		return
	} else if err != nil {
		writeErr(w, http.StatusInternalServerError, "db error")
		return
	}
	if err := s.ai.TagMedia(r.Context(), id, row.BlobPath, row.Kind); err != nil {
		writeErr(w, http.StatusInternalServerError, "tagging failed: "+err.Error())
		return
	}
	tags, _ := s.db.TagsForMedia(r.Context(), id)
	writeJSON(w, http.StatusOK, map[string]any{"tags": tags})
}
