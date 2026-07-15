package api

import (
	"bytes"
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/youruser/oppailib/internal/crypto"
	"github.com/youruser/oppailib/internal/db"
	"github.com/youruser/oppailib/internal/imagegen"
)

// decodeDataImage decodes a base64 image, tolerating a leading "data:...;base64,"
// prefix so the web UI can hand over either a bare payload or a full data URL.
func decodeDataImage(s string) ([]byte, error) {
	if i := strings.IndexByte(s, ','); i >= 0 && strings.HasPrefix(s, "data:") {
		s = s[i+1:]
	}
	return base64.StdEncoding.DecodeString(strings.TrimSpace(s))
}

// ── ephemeral preview cache ──────────────────────────────────────────────────
//
// Generated images must not land in the library unless the user saves one, so they
// live here — in memory, for a while — between /generate and /save. Nothing is
// written to disk until /save, and an unsaved preview simply expires. This is what
// makes "all generated images don't save unless manually saved" true by construction
// rather than by a flag someone has to remember to check.

const (
	genPreviewTTL = 30 * time.Minute
	genCacheMax   = 96 // hard cap so a generate loop can't grow memory without bound
)

type genPreview struct {
	data     []byte
	at       time.Time
	prompt   string
	negative string
	seed     int64
	model    string
}

type genCache struct {
	mu sync.Mutex
	m  map[string]*genPreview
}

func newGenCache() *genCache { return &genCache{m: make(map[string]*genPreview)} }

// put stores a preview and returns its id, evicting anything expired (and, if still
// over the cap, the oldest) so the map can't grow without bound.
func (c *genCache) put(p *genPreview) string {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.evictLocked()
	id := randomID()
	p.at = time.Now()
	c.m[id] = p
	return id
}

func (c *genCache) get(id string) (*genPreview, bool) {
	c.mu.Lock()
	defer c.mu.Unlock()
	p, ok := c.m[id]
	if !ok || time.Since(p.at) > genPreviewTTL {
		if ok {
			delete(c.m, id)
		}
		return nil, false
	}
	return p, true
}

func (c *genCache) evictLocked() {
	for id, p := range c.m {
		if time.Since(p.at) > genPreviewTTL {
			delete(c.m, id)
		}
	}
	// Still over cap after dropping expired ones: shed the oldest until under it.
	for len(c.m) >= genCacheMax {
		var oldestID string
		var oldest time.Time
		for id, p := range c.m {
			if oldestID == "" || p.at.Before(oldest) {
				oldestID, oldest = id, p.at
			}
		}
		if oldestID == "" {
			break
		}
		delete(c.m, oldestID)
	}
}

func randomID() string {
	b := make([]byte, 16)
	_, _ = rand.Read(b)
	return hex.EncodeToString(b)
}

// ── status ───────────────────────────────────────────────────────────────────

func (s *Server) handleImageGenStatus(w http.ResponseWriter, r *http.Request) {
	set := s.settings.Get()
	if !set.ImageGenEnabled {
		writeJSON(w, http.StatusOK, map[string]any{"enabled": false})
		return
	}
	// Probing the generator is a network round trip; keep it short so a misconfigured
	// URL fails the status check fast rather than hanging the screen.
	ctx, cancel := context.WithTimeout(r.Context(), 8*time.Second)
	defer cancel()
	models, err := s.imagegen.Models(ctx, set.ImageGenURL)
	if err != nil {
		writeJSON(w, http.StatusOK, map[string]any{"enabled": true, "reachable": false, "error": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"enabled": true, "reachable": true, "models": models})
}

// ── prompt optimisation ──────────────────────────────────────────────────────

type promptReq struct {
	Text string `json:"text"`
}

// handleImageGenPrompt turns a scrap of (spoken) natural language into a fuller
// prompt + negative prompt. The speech-to-text itself happens in the browser; this is
// the "optimise into a good prompt" half, done with rules (there is no LLM here).
func (s *Server) handleImageGenPrompt(w http.ResponseWriter, r *http.Request) {
	var req promptReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeErr(w, http.StatusBadRequest, "invalid body")
		return
	}
	prompt, negative := imagegen.BuildPrompt(req.Text)
	writeJSON(w, http.StatusOK, map[string]any{"prompt": prompt, "negativePrompt": negative})
}

// ── generate ─────────────────────────────────────────────────────────────────

type generateReq struct {
	Prompt         string  `json:"prompt"`
	NegativePrompt string  `json:"negativePrompt"`
	Checkpoint     string  `json:"checkpoint"`
	Sampler        string  `json:"sampler"`
	Steps          int     `json:"steps"`
	Width          int     `json:"width"`
	Height         int     `json:"height"`
	CfgScale       float64 `json:"cfgScale"`
	Seed           int64   `json:"seed"`
	Count          int     `json:"count"`
}

func (s *Server) handleImageGenGenerate(w http.ResponseWriter, r *http.Request) {
	set := s.settings.Get()
	if !set.ImageGenEnabled {
		writeErr(w, http.StatusServiceUnavailable, "image generation is not configured")
		return
	}
	var req generateReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeErr(w, http.StatusBadRequest, "invalid body")
		return
	}
	if req.Prompt == "" {
		writeErr(w, http.StatusBadRequest, "a prompt is required")
		return
	}
	clampGenerate(&req)

	gen := imagegen.GenerateRequest{
		Prompt:         req.Prompt,
		NegativePrompt: req.NegativePrompt,
		Checkpoint:     req.Checkpoint,
		Sampler:        req.Sampler,
		Steps:          req.Steps,
		Width:          req.Width,
		Height:         req.Height,
		CfgScale:       req.CfgScale,
		Seed:           req.Seed,
		Count:          req.Count,
	}
	res, err := s.imagegen.Generate(r.Context(), set.ImageGenURL, gen)
	if err != nil {
		s.log.Warn("image generate", "err", err)
		writeErr(w, http.StatusBadGateway, err.Error())
		return
	}

	type preview struct {
		ID   string `json:"id"`
		Seed int64  `json:"seed"`
	}
	out := make([]preview, 0, len(res.Images))
	for _, img := range res.Images {
		id := s.genCache.put(&genPreview{
			data:     img,
			prompt:   req.Prompt,
			negative: req.NegativePrompt,
			seed:     res.Seed,
			model:    req.Checkpoint,
		})
		out = append(out, preview{ID: id, Seed: res.Seed})
	}
	writeJSON(w, http.StatusOK, map[string]any{"images": out, "prompt": req.Prompt})
}

// clampGenerate forces a request into ranges a generator (and our memory) can survive,
// and fills unset fields with sane defaults. Even on the user's own box, an
// accidental 8192×8192×16 batch shouldn't be honoured verbatim.
func clampGenerate(req *generateReq) {
	if req.Steps <= 0 {
		req.Steps = 25
	}
	req.Steps = clampInt(req.Steps, 1, 80)
	if req.Width <= 0 {
		req.Width = 512
	}
	if req.Height <= 0 {
		req.Height = 768
	}
	req.Width = roundTo8(clampInt(req.Width, 64, 2048))
	req.Height = roundTo8(clampInt(req.Height, 64, 2048))
	if req.CfgScale <= 0 {
		req.CfgScale = 7
	}
	if req.CfgScale > 30 {
		req.CfgScale = 30
	}
	if req.Count <= 0 {
		req.Count = 1
	}
	req.Count = clampInt(req.Count, 1, 8)
	if req.Seed == 0 {
		req.Seed = -1
	}
}

func clampInt(v, lo, hi int) int {
	if v < lo {
		return lo
	}
	if v > hi {
		return hi
	}
	return v
}

func roundTo8(v int) int { return (v / 8) * 8 }

// ── preview ──────────────────────────────────────────────────────────────────

func (s *Server) handleImageGenPreview(w http.ResponseWriter, r *http.Request) {
	p, ok := s.genCache.get(r.PathValue("id"))
	if !ok {
		writeErr(w, http.StatusNotFound, "preview expired or not found")
		return
	}
	// Generators return PNG. safeInlineContentType keeps an inline image safe on our
	// origin; no-store keeps an unsaved preview from lingering in a disk cache.
	w.Header().Set("Content-Type", safeInlineContentType("image/png"))
	w.Header().Set("Cache-Control", "private, no-store")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(p.data)
}

// ── save ─────────────────────────────────────────────────────────────────────

type genSaveReq struct {
	ID    string   `json:"id"`
	Title string   `json:"title"`
	Tags  []string `json:"tags"`
}

// handleImageGenSave is the one crossing point into the library. It takes a preview
// id, stores those in-memory bytes as an encrypted blob, and files it as an image —
// same ingest path (dedupe, thumbnail, auto-tag) as any other import.
func (s *Server) handleImageGenSave(w http.ResponseWriter, r *http.Request) {
	var req genSaveReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeErr(w, http.StatusBadRequest, "invalid body")
		return
	}
	p, ok := s.genCache.get(req.ID)
	if !ok {
		writeErr(w, http.StatusNotFound, "preview expired or not found")
		return
	}

	put, err := s.store.Put(bytes.NewReader(p.data))
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "store failed")
		return
	}

	title := req.Title
	if title == "" {
		title = "Generated image"
	}
	titleEnc, _ := crypto.SealBytes(s.kek, []byte(title), []byte("title"))
	// The prompt is worth keeping: it's how the image was made and how it'd be made
	// again. Stored in notes like any other free text.
	var notesEnc []byte
	if p.prompt != "" {
		notesEnc, _ = crypto.SealBytes(s.kek, []byte(p.prompt), []byte("notes"))
	}

	id, existed, err := s.db.InsertMedia(r.Context(), &db.MediaRow{
		Kind:     "image",
		SHA256:   put.SHA256,
		Size:     put.Size,
		BlobPath: put.RelPath,
		TitleEnc: titleEnc,
		NotesEnc: notesEnc,
	})
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "db error")
		return
	}
	if !existed {
		s.processIngestAsync(id, put.RelPath, "image", put.Size, 0)
	}
	// Mark its provenance so generated images are findable, then apply user tags.
	if err := s.db.AddTag(r.Context(), id, "ai-generated", "source", "generated", 0); err != nil {
		s.log.Debug("tag generated image", "err", err)
	}
	for _, t := range req.Tags {
		if t == "" {
			continue
		}
		if err := s.db.AddTag(r.Context(), id, t, "general", "manual", 0); err != nil {
			s.log.Debug("tag generated image", "tag", t, "err", err)
		}
	}
	writeJSON(w, http.StatusOK, map[string]any{"id": id, "existed": existed})
}

// ── model (checkpoint) thumbnails ────────────────────────────────────────────
//
// A checkpoint is just a name in a picker; a preview image makes it recognisable. The
// user sets one from a generated image (or an upload); it's stored encrypted, keyed by
// the checkpoint name, under /config/model_thumbs. Not a library item — it's chrome
// for the picker, so it lives beside the config rather than in the media table.

// modelThumbPath maps a checkpoint name to its on-disk (encrypted) preview file. The
// name is hashed so an arbitrary checkpoint title can't escape the directory or
// collide with a control character.
func (s *Server) modelThumbPath(model string) string {
	sum := sha256.Sum256([]byte(model))
	return filepath.Join(s.modelThumbDir, hex.EncodeToString(sum[:])+".enc")
}

func (s *Server) handleGetModelThumb(w http.ResponseWriter, r *http.Request) {
	model := r.URL.Query().Get("model")
	if model == "" {
		writeErr(w, http.StatusBadRequest, "model is required")
		return
	}
	blob, err := os.ReadFile(s.modelThumbPath(model))
	if err != nil {
		writeErr(w, http.StatusNotFound, "no thumbnail for that model")
		return
	}
	data, err := crypto.OpenBytes(s.kek, blob, []byte("model-thumb"))
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "thumbnail unreadable")
		return
	}
	w.Header().Set("Content-Type", safeInlineContentType(http.DetectContentType(data)))
	w.Header().Set("Cache-Control", "private, max-age=60")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(data)
}

type setModelThumbReq struct {
	Model string `json:"model"`
	// Exactly one source: PreviewID reuses a just-generated image; ImageData is a
	// base64 image (a "data:...;base64," prefix is tolerated) for an upload.
	PreviewID string `json:"previewId"`
	ImageData string `json:"imageData"`
}

const maxModelThumbBytes = 8 << 20

func (s *Server) handleSetModelThumb(w http.ResponseWriter, r *http.Request) {
	var req setModelThumbReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeErr(w, http.StatusBadRequest, "invalid body")
		return
	}
	if req.Model == "" {
		writeErr(w, http.StatusBadRequest, "model is required")
		return
	}

	var data []byte
	switch {
	case req.PreviewID != "":
		p, ok := s.genCache.get(req.PreviewID)
		if !ok {
			writeErr(w, http.StatusNotFound, "preview expired or not found")
			return
		}
		data = p.data
	case req.ImageData != "":
		raw, err := decodeDataImage(req.ImageData)
		if err != nil {
			writeErr(w, http.StatusBadRequest, "bad image data")
			return
		}
		data = raw
	default:
		writeErr(w, http.StatusBadRequest, "need a previewId or imageData")
		return
	}
	if len(data) == 0 || len(data) > maxModelThumbBytes {
		writeErr(w, http.StatusBadRequest, "image is empty or too large")
		return
	}

	blob, err := crypto.SealBytes(s.kek, data, []byte("model-thumb"))
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "encrypt failed")
		return
	}
	if err := os.MkdirAll(s.modelThumbDir, 0o755); err != nil {
		writeErr(w, http.StatusInternalServerError, "storage error")
		return
	}
	if err := os.WriteFile(s.modelThumbPath(req.Model), blob, 0o600); err != nil {
		writeErr(w, http.StatusInternalServerError, "write failed")
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"status": "ok"})
}
