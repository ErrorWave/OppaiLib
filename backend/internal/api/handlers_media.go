package api

import (
	"database/sql"
	"errors"
	"mime"
	"net/http"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/youruser/oppailib/internal/crypto"
	"github.com/youruser/oppailib/internal/db"
	"github.com/youruser/oppailib/internal/models"
)

const maxUpload = 8 << 30 // 8 GiB

// kindFromFilename guesses a media kind from a file extension.
func kindFromFilename(name string) models.MediaKind {
	switch strings.ToLower(filepath.Ext(name)) {
	case ".mp4", ".mkv", ".webm", ".mov", ".avi":
		return models.KindVideo
	case ".gif":
		return models.KindGIF
	case ".cbz", ".cbr", ".pdf":
		return models.KindComic
	case ".zip", ".7z", ".exe", ".apk":
		return models.KindGame
	default:
		return models.KindImage
	}
}

func (s *Server) handleUploadMedia(w http.ResponseWriter, r *http.Request) {
	r.Body = http.MaxBytesReader(w, r.Body, maxUpload)
	if err := r.ParseMultipartForm(32 << 20); err != nil {
		writeErr(w, http.StatusBadRequest, "invalid multipart form")
		return
	}
	file, header, err := r.FormFile("file")
	if err != nil {
		writeErr(w, http.StatusBadRequest, "missing 'file'")
		return
	}
	defer file.Close()

	res, err := s.store.Put(file)
	if err != nil {
		s.log.Error("store put", "err", err)
		writeErr(w, http.StatusInternalServerError, "storage error")
		return
	}

	title := header.Filename
	if t := r.FormValue("title"); t != "" {
		title = t
	}
	titleEnc, err := crypto.SealBytes(s.kek, []byte(title), []byte("title"))
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "encrypt error")
		return
	}
	var sourceEnc []byte
	if src := r.FormValue("source"); src != "" {
		sourceEnc, _ = crypto.SealBytes(s.kek, []byte(src), []byte("source"))
	}

	kind := kindFromFilename(header.Filename)
	if k := r.FormValue("kind"); k != "" {
		kind = models.MediaKind(k)
	}

	id, existed, err := s.db.InsertMedia(r.Context(), &db.MediaRow{
		Kind:      string(kind),
		SHA256:    res.SHA256,
		Size:      res.Size,
		BlobPath:  res.RelPath,
		TitleEnc:  titleEnc,
		SourceEnc: sourceEnc,
	})
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "db error")
		return
	}
	// Fire-and-forget AI auto-tagging (no-op if disabled or non-image).
	if !existed {
		s.ai.TagMediaAsync(id, res.RelPath, string(kind))
	}

	status := http.StatusCreated
	if existed {
		status = http.StatusOK
	}
	writeJSON(w, status, map[string]any{"id": id, "sha256": res.SHA256, "deduped": existed})
}

func (s *Server) handleListMedia(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	limit, _ := strconv.Atoi(q.Get("limit"))
	offset, _ := strconv.Atoi(q.Get("offset"))
	rows, err := s.db.ListMedia(r.Context(), q.Get("kind"), limit, offset)
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "db error")
		return
	}
	out := make([]models.Media, 0, len(rows))
	for _, row := range rows {
		out = append(out, s.toModel(row))
	}
	writeJSON(w, http.StatusOK, map[string]any{"items": out})
}

func (s *Server) handleGetMedia(w http.ResponseWriter, r *http.Request) {
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
	m := s.toModel(row)
	if tags, err := s.db.TagsForMedia(r.Context(), row.ID); err == nil {
		m.Tags = tags
	}
	writeJSON(w, http.StatusOK, m)
}

func (s *Server) handleStreamMedia(w http.ResponseWriter, r *http.Request) {
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
	name := s.decrypt(row.TitleEnc, "title")
	ct := mime.TypeByExtension(filepath.Ext(name))
	if ct == "" {
		// Scraped items are often titled without a file extension; fall back to a
		// type implied by the stored kind so the browser still plays it inline.
		ct = contentTypeForKind(row.Kind)
	}
	w.Header().Set("Content-Type", ct)

	rs, err := s.store.OpenSeeker(row.BlobPath, row.Size)
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "blob error")
		return
	}
	defer rs.Close()
	// ServeContent advertises Accept-Ranges and answers Range requests with 206 +
	// Content-Range — this is what lets the browser seek/scrub video and audio
	// (and resume interrupted downloads). A zero modtime skips Last-Modified.
	http.ServeContent(w, r, name, time.Time{}, rs)
}

// contentTypeForKind gives a best-effort MIME type from a media kind, used when
// the stored title carries no usable file extension. These are the most common
// container per kind; exact-typed items still win via the extension above.
func contentTypeForKind(kind string) string {
	switch models.MediaKind(kind) {
	case models.KindVideo:
		return "video/mp4"
	case models.KindGIF:
		return "image/gif"
	case models.KindImage:
		return "image/jpeg"
	default:
		return "application/octet-stream"
	}
}

// toModel decrypts sensitive columns and builds the API view.
func (s *Server) toModel(row *db.MediaRow) models.Media {
	return models.Media{
		ID:        row.ID,
		Kind:      models.MediaKind(row.Kind),
		SHA256:    row.SHA256,
		Size:      row.Size,
		Title:     s.decrypt(row.TitleEnc, "title"),
		Notes:     s.decrypt(row.NotesEnc, "notes"),
		Source:    s.decrypt(row.SourceEnc, "source"),
		Rating:    row.Rating,
		Favorite:  row.Favorite,
		Duration:  row.Duration.Float64,
		Width:     int(row.Width.Int64),
		Height:    int(row.Height.Int64),
		PageCount: int(row.PageCount.Int64),
		CreatedAt: row.CreatedAt,
		UpdatedAt: row.UpdatedAt,
	}
}

func (s *Server) decrypt(blob []byte, aad string) string {
	if len(blob) == 0 {
		return ""
	}
	pt, err := crypto.OpenBytes(s.kek, blob, []byte(aad))
	if err != nil {
		s.log.Warn("decrypt field failed", "aad", aad, "err", err)
		return ""
	}
	return string(pt)
}
