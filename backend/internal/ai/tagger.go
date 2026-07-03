// Package ai provides local, on-box auto-tagging. No network calls are ever
// made — inference runs entirely on the user's hardware.
//
// Two implementations exist:
//
//   - HeuristicTagger (always compiled, CPU-only, zero external deps): derives a
//     few structural tags (orientation, animation). It is the guaranteed
//     fallback so the default lean image works without any model.
//   - onnxTagger (build tag `onnx`): runs a real multi-label image classifier
//     via ONNX Runtime against a user-supplied model.onnx + labels.txt in
//     /config/models. See docs/AI.md for model choice and setup.
//
// The default build is cgo-free (keeping the static binary + pure-Go sqlite).
// Real inference is opt-in: build with `-tags onnx` and mount the ONNX runtime.
package ai

import (
	"context"
	"image"
	// Register decoders so image.Decode handles common formats.
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"log/slog"
	"time"

	_ "golang.org/x/image/webp"

	"github.com/youruser/oppailib/internal/db"
	"github.com/youruser/oppailib/internal/models"
	"github.com/youruser/oppailib/internal/storage"
)

// Suggestion is a single proposed tag with a confidence score in [0,1].
type Suggestion struct {
	Name     string
	Category string
	Score    float64
}

// Tagger produces tag suggestions for a decoded image.
type Tagger interface {
	Name() string
	Tag(ctx context.Context, img image.Image) ([]Suggestion, error)
}

// Manager wires a Tagger to the store + db and runs tagging jobs.
type Manager struct {
	enabled bool
	tagger  Tagger
	store   *storage.Store
	db      *db.DB
	log     *slog.Logger
}

// Config selects and configures the tagger.
type Config struct {
	Enabled  bool
	ModelDir string
	Device   string // cpu|cuda
}

// NewManager picks the best available tagger: the ONNX tagger if the build
// supports it and a model is present, else the heuristic fallback.
func NewManager(cfg Config, store *storage.Store, database *db.DB, log *slog.Logger) *Manager {
	m := &Manager{enabled: cfg.Enabled, store: store, db: database, log: log}
	if !cfg.Enabled {
		m.tagger = &HeuristicTagger{}
		return m
	}
	if t, err := newOnnxTagger(cfg.ModelDir, cfg.Device); err == nil {
		log.Info("ai: using ONNX tagger", "model_dir", cfg.ModelDir, "device", cfg.Device)
		m.tagger = t
	} else {
		log.Info("ai: ONNX tagger unavailable, using heuristic fallback", "reason", err)
		m.tagger = &HeuristicTagger{}
	}
	return m
}

// Enabled reports whether auto-tagging is on.
func (m *Manager) Enabled() bool { return m.enabled }

// TaggerName returns the active tagger's name (for status/health).
func (m *Manager) TaggerName() string {
	if m.tagger == nil {
		return "none"
	}
	return m.tagger.Name()
}

// TagMediaAsync runs TagMedia in the background, logging any error.
func (m *Manager) TagMediaAsync(id int64, blobPath, kind string) {
	if !m.enabled {
		return
	}
	go func() {
		ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
		defer cancel()
		if err := m.TagMedia(ctx, id, blobPath, kind); err != nil {
			m.log.Warn("ai: auto-tag failed", "media", id, "err", err)
		}
	}()
}

// TagMedia decrypts the blob, decodes it as an image (videos/comics are skipped
// for now — see docs/AI.md for the frame-extraction roadmap), runs the tagger,
// and persists suggestions as tags with source="ai".
func (m *Manager) TagMedia(ctx context.Context, id int64, blobPath, kind string) error {
	if kind != string(models.KindImage) && kind != string(models.KindGIF) {
		return nil
	}
	rc, err := m.store.Open(blobPath)
	if err != nil {
		return err
	}
	defer rc.Close()

	img, _, err := image.Decode(rc)
	if err != nil {
		return err
	}
	suggestions, err := m.tagger.Tag(ctx, img)
	if err != nil {
		return err
	}
	// Record dimensions while we have the decoded image.
	b := img.Bounds()
	_ = m.db.UpdateMediaDimensions(ctx, id, b.Dx(), b.Dy())

	for _, s := range suggestions {
		cat := s.Category
		if cat == "" {
			cat = "general"
		}
		if err := m.db.AddTag(ctx, id, s.Name, cat, "ai", s.Score); err != nil {
			m.log.Warn("ai: persist tag", "tag", s.Name, "err", err)
		}
	}
	m.log.Info("ai: tagged media", "media", id, "tags", len(suggestions), "tagger", m.tagger.Name())
	return nil
}
