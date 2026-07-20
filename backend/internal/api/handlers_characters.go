package api

import (
	"bytes"
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/youruser/oppailib/internal/crypto"
	"github.com/youruser/oppailib/internal/db"
	"github.com/youruser/oppailib/internal/imagegen"
)

const maxCharacterImage = 12 << 20

type characterView struct {
	ID        int64    `json:"id"`
	Name      string   `json:"name"`
	Tags      []string `json:"tags"`
	CreatedAt int64    `json:"createdAt"`
}

func (s *Server) characterView(row db.CharacterRow) characterView {
	var tags []string
	_ = json.Unmarshal([]byte(s.decrypt(row.TagsEnc, "character-tags")), &tags)
	if tags == nil {
		tags = []string{}
	}
	return characterView{ID: row.ID, Name: s.decrypt(row.NameEnc, "character-name"), Tags: tags, CreatedAt: row.CreatedAt}
}

func (s *Server) handleListCharacters(w http.ResponseWriter, r *http.Request) {
	rows, err := s.db.ListCharacters(r.Context())
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "couldn't list characters")
		return
	}
	out := make([]characterView, 0, len(rows))
	for _, row := range rows {
		out = append(out, s.characterView(row))
	}
	writeJSON(w, http.StatusOK, map[string]any{"characters": out})
}

func (s *Server) handleCreateCharacter(w http.ResponseWriter, r *http.Request) {
	r.Body = http.MaxBytesReader(w, r.Body, maxCharacterImage+(1<<20))
	if err := r.ParseMultipartForm(maxCharacterImage); err != nil {
		writeErr(w, http.StatusBadRequest, "invalid character upload")
		return
	}
	name := strings.TrimSpace(r.FormValue("name"))
	if name == "" {
		writeErr(w, http.StatusBadRequest, "character name is required")
		return
	}
	file, header, err := r.FormFile("file")
	if err != nil {
		writeErr(w, http.StatusBadRequest, "character picture is required")
		return
	}
	defer file.Close()
	data, err := io.ReadAll(io.LimitReader(file, maxCharacterImage+1))
	if err != nil || len(data) == 0 || len(data) > maxCharacterImage {
		writeErr(w, http.StatusBadRequest, "character picture is too large or unreadable")
		return
	}
	mime := http.DetectContentType(data)
	if !strings.HasPrefix(mime, "image/") {
		writeErr(w, http.StatusBadRequest, "character reference must be an image")
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 2*time.Minute)
	defer cancel()
	suggestions, err := s.ai.AnalyzeAppearance(ctx, bytes.NewReader(data))
	if err != nil {
		writeErr(w, http.StatusBadRequest, "couldn't analyze the character picture")
		return
	}
	tags := make([]string, 0, len(suggestions))
	seen := map[string]bool{}
	for _, suggestion := range suggestions {
		tag := strings.TrimSpace(strings.ReplaceAll(suggestion.Name, "_", " "))
		if tag != "" && !seen[tag] {
			seen[tag] = true
			tags = append(tags, tag)
		}
	}
	tagsJSON, _ := json.Marshal(tags)
	nameEnc, _ := crypto.SealBytes(s.kek, []byte(name), []byte("character-name"))
	tagsEnc, _ := crypto.SealBytes(s.kek, tagsJSON, []byte("character-tags"))
	imageEnc, err := crypto.SealBytes(s.kek, data, []byte("character-image"))
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "couldn't encrypt character picture")
		return
	}
	id, err := s.db.CreateCharacter(r.Context(), nameEnc, tagsEnc, imageEnc, mime)
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "couldn't save character")
		return
	}
	_ = header // filename is deliberately not retained; it may describe the scene.
	writeJSON(w, http.StatusCreated, characterView{ID: id, Name: name, Tags: tags, CreatedAt: time.Now().Unix()})
}

func (s *Server) handleCharacterImage(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 64)
	if err != nil {
		writeErr(w, http.StatusBadRequest, "bad character id")
		return
	}
	row, err := s.db.GetCharacter(r.Context(), id)
	if errors.Is(err, sql.ErrNoRows) {
		writeErr(w, http.StatusNotFound, "character not found")
		return
	}
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "couldn't read character")
		return
	}
	data, err := crypto.OpenBytes(s.kek, row.ImageEnc, []byte("character-image"))
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "character picture unreadable")
		return
	}
	w.Header().Set("Content-Type", safeInlineContentType(row.MIME))
	w.Header().Set("Cache-Control", "private, max-age=300")
	_, _ = w.Write(data)
}

func (s *Server) handleDeleteCharacter(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 64)
	if err != nil {
		writeErr(w, http.StatusBadRequest, "bad character id")
		return
	}
	if err := s.db.DeleteCharacter(r.Context(), id); err != nil {
		writeErr(w, http.StatusInternalServerError, "couldn't delete character")
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) handleBooruTags(w http.ResponseWriter, r *http.Request) {
	q := strings.TrimSpace(r.URL.Query().Get("q"))
	extra, _ := s.db.SearchTagNames(r.Context(), q, 50)
	suggestions, correction := imagegen.SuggestTags(q, extra, 12)
	writeJSON(w, http.StatusOK, map[string]any{"suggestions": suggestions, "correction": correction})
}
