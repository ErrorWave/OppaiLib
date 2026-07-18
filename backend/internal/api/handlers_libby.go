package api

import (
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/youruser/oppailib/internal/crypto"
)

// ── Libby outfits ────────────────────────────────────────────────────────────
//
// An outfit is a full replacement wardrobe for the mascot: one image per emotion,
// dropped in by the user. The default art ships in the client; an outfit overrides
// it per emotion, and an emotion the outfit doesn't cover falls back to the
// default art (clients handle that via the image 404).
//
// Which outfit is *worn* is a per-device choice, like hiding Libby — clients keep
// the selection locally and just ask for images by outfit id. Server-side there is
// only storage: encrypted under /config/libby, same scheme as the character
// library, because outfit art is the user's own and may be anything.

// libbyEmotions is the fixed emotion vocabulary — the five poses the clients
// actually render (neutral is the popup/login pose; the rest map to chat modes).
var libbyEmotions = []string{"neutral", "happy", "mischievous", "surprised", "thinking"}

func libbyEmotionValid(e string) bool {
	for _, known := range libbyEmotions {
		if e == known {
			return true
		}
	}
	return false
}

type libbyOutfit struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// libbyOutfitView is what lists return: the record plus which emotions have art,
// so clients can render slots without probing five image URLs per outfit.
type libbyOutfitView struct {
	libbyOutfit
	Emotions []string `json:"emotions"`
}

func (s *Server) libbyOutfitPath(id string) string {
	return filepath.Join(s.libbyDir, id+".json.enc")
}

func (s *Server) libbyEmotionPath(id, emotion string) string {
	return filepath.Join(s.libbyDir, id+"."+emotion+".enc")
}

func (s *Server) readLibbyOutfit(id string) (*libbyOutfit, error) {
	blob, err := os.ReadFile(s.libbyOutfitPath(id))
	if err != nil {
		return nil, err
	}
	data, err := crypto.OpenBytes(s.kek, blob, []byte("libby-outfit"))
	if err != nil {
		return nil, err
	}
	var o libbyOutfit
	if err := json.Unmarshal(data, &o); err != nil {
		return nil, err
	}
	o.ID = id // the filename is authoritative
	return &o, nil
}

func (s *Server) libbyOutfitView(o *libbyOutfit) libbyOutfitView {
	v := libbyOutfitView{libbyOutfit: *o, Emotions: []string{}}
	for _, e := range libbyEmotions {
		if _, err := os.Stat(s.libbyEmotionPath(o.ID, e)); err == nil {
			v.Emotions = append(v.Emotions, e)
		}
	}
	return v
}

func (s *Server) handleListLibbyOutfits(w http.ResponseWriter, r *http.Request) {
	entries, err := os.ReadDir(s.libbyDir)
	if err != nil {
		writeJSON(w, http.StatusOK, map[string]any{"outfits": []libbyOutfitView{}})
		return
	}
	out := []libbyOutfitView{}
	for _, e := range entries {
		id, ok := strings.CutSuffix(e.Name(), ".json.enc")
		if !ok || !charIDPattern.MatchString(id) {
			continue
		}
		o, err := s.readLibbyOutfit(id)
		if err != nil {
			s.log.Debug("read libby outfit", "id", id, "err", err)
			continue
		}
		out = append(out, s.libbyOutfitView(o))
	}
	sort.Slice(out, func(i, j int) bool {
		return strings.ToLower(out[i].Name) < strings.ToLower(out[j].Name)
	})
	writeJSON(w, http.StatusOK, map[string]any{"outfits": out})
}

type saveLibbyOutfitReq struct {
	ID   string `json:"id"` // empty creates, set renames
	Name string `json:"name"`
}

func (s *Server) handleSaveLibbyOutfit(w http.ResponseWriter, r *http.Request) {
	var req saveLibbyOutfitReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeErr(w, http.StatusBadRequest, "invalid body")
		return
	}
	req.Name = strings.TrimSpace(req.Name)
	if req.Name == "" || len(req.Name) > 80 {
		writeErr(w, http.StatusBadRequest, "an outfit needs a name (up to 80 characters)")
		return
	}
	id := req.ID
	if id == "" {
		id = randomID()
	} else if !charIDPattern.MatchString(id) {
		writeErr(w, http.StatusBadRequest, "bad outfit id")
		return
	}
	o := libbyOutfit{ID: id, Name: req.Name}
	raw, _ := json.Marshal(o)
	blob, err := crypto.SealBytes(s.kek, raw, []byte("libby-outfit"))
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "encrypt failed")
		return
	}
	if err := os.MkdirAll(s.libbyDir, 0o755); err != nil {
		writeErr(w, http.StatusInternalServerError, "storage error")
		return
	}
	if err := os.WriteFile(s.libbyOutfitPath(id), blob, 0o600); err != nil {
		writeErr(w, http.StatusInternalServerError, "write failed")
		return
	}
	writeJSON(w, http.StatusOK, s.libbyOutfitView(&o))
}

func (s *Server) handleDeleteLibbyOutfit(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if !charIDPattern.MatchString(id) {
		writeErr(w, http.StatusBadRequest, "bad outfit id")
		return
	}
	if err := os.Remove(s.libbyOutfitPath(id)); err != nil {
		writeErr(w, http.StatusNotFound, "no such outfit")
		return
	}
	for _, e := range libbyEmotions {
		_ = os.Remove(s.libbyEmotionPath(id, e))
	}
	writeJSON(w, http.StatusOK, map[string]any{"status": "ok"})
}

type setLibbyEmotionReq struct {
	ImageData string `json:"imageData"`
}

func (s *Server) handleSetLibbyEmotion(w http.ResponseWriter, r *http.Request) {
	id, emotion := r.PathValue("id"), r.PathValue("emotion")
	if !charIDPattern.MatchString(id) || !libbyEmotionValid(emotion) {
		writeErr(w, http.StatusBadRequest, "bad outfit id or emotion")
		return
	}
	if _, err := s.readLibbyOutfit(id); err != nil {
		writeErr(w, http.StatusNotFound, "no such outfit")
		return
	}
	var req setLibbyEmotionReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.ImageData == "" {
		writeErr(w, http.StatusBadRequest, "imageData is required")
		return
	}
	data, err := decodeDataImage(req.ImageData)
	if err != nil {
		writeErr(w, http.StatusBadRequest, "bad image data")
		return
	}
	if len(data) == 0 || len(data) > maxModelThumbBytes {
		writeErr(w, http.StatusBadRequest, "image is empty or too large")
		return
	}
	blob, err := crypto.SealBytes(s.kek, data, []byte("libby-emotion"))
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "encrypt failed")
		return
	}
	if err := os.WriteFile(s.libbyEmotionPath(id, emotion), blob, 0o600); err != nil {
		writeErr(w, http.StatusInternalServerError, "write failed")
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"status": "ok"})
}

func (s *Server) handleGetLibbyEmotion(w http.ResponseWriter, r *http.Request) {
	id, emotion := r.PathValue("id"), r.PathValue("emotion")
	if !charIDPattern.MatchString(id) || !libbyEmotionValid(emotion) {
		writeErr(w, http.StatusBadRequest, "bad outfit id or emotion")
		return
	}
	blob, err := os.ReadFile(s.libbyEmotionPath(id, emotion))
	if err != nil {
		writeErr(w, http.StatusNotFound, "this outfit has no art for that emotion")
		return
	}
	data, err := crypto.OpenBytes(s.kek, blob, []byte("libby-emotion"))
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "image unreadable")
		return
	}
	w.Header().Set("Content-Type", safeInlineContentType(http.DetectContentType(data)))
	w.Header().Set("Cache-Control", "private, max-age=60")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(data)
}

func (s *Server) handleDeleteLibbyEmotion(w http.ResponseWriter, r *http.Request) {
	id, emotion := r.PathValue("id"), r.PathValue("emotion")
	if !charIDPattern.MatchString(id) || !libbyEmotionValid(emotion) {
		writeErr(w, http.StatusBadRequest, "bad outfit id or emotion")
		return
	}
	if err := os.Remove(s.libbyEmotionPath(id, emotion)); err != nil {
		writeErr(w, http.StatusNotFound, "this outfit has no art for that emotion")
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"status": "ok"})
}
