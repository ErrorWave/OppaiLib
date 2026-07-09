// Package ai provides local, on-box auto-tagging. No network calls are ever
// made — inference runs entirely on the user's hardware.
//
// Two implementations exist:
//
//   - onnxTagger (build tag `onnx`): runs a real multi-label image classifier via
//     ONNX Runtime. The default Docker image bakes in a wd14 tagger, which emits
//     a rating (general/sensitive/questionable/explicit) plus general and
//     character tags. See docs/AI.md.
//   - HeuristicTagger (always compiled, CPU-only, zero external deps): derives a
//     few structural tags (orientation, resolution). It is the guaranteed
//     fallback, used by the lean cgo-free image and whenever the ONNX tagger
//     cannot load.
//
// The cgo-free build (no `onnx` tag) keeps the static binary + pure-Go sqlite.
package ai

import (
	"bytes"
	"context"
	"errors"
	"image"
	// Register decoders so image.Decode handles common formats.
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"io"
	"log/slog"
	"os"
	"runtime"
	"sync"
	"time"

	_ "golang.org/x/image/webp"

	"github.com/youruser/oppailib/internal/db"
	"github.com/youruser/oppailib/internal/models"
	"github.com/youruser/oppailib/internal/storage"
	"github.com/youruser/oppailib/internal/thumbnail"
)

// DefaultVideoFrames is how many frames a video is sampled at when the config
// leaves it unset. Five spans a clip well without making a bulk import crawl.
const DefaultVideoFrames = 5

// maxVideoFrames caps the configured frame count. Each frame is a full ffmpeg
// seek+decode plus one model inference, so an unbounded value would let a single
// video monopolise a worker for minutes.
const maxVideoFrames = 32

// videoTagTimeout bounds a whole video job: decrypt to temp + probe + N
// seek/decode/infer passes. Generous relative to the single-frame poster job.
const videoTagTimeout = 10 * time.Minute

// Tag categories. These mirror the Danbooru category ids a wd14
// `selected_tags.csv` uses, and are stored verbatim in the tag's category column.
// Note that the `rating` category is a content rating and is unrelated to the
// numeric star rating on a media row.
const (
	catGeneral   = "general"
	catCharacter = "character"
	catRating    = "rating"
)

// ratingSeverity orders the mutually exclusive content ratings. Merging frames
// takes the most severe rating any frame saw, not the highest-scoring one: a
// clip with four tame frames and one explicit frame is an explicit clip, even
// though "general" will have scored higher on more of them.
var ratingSeverity = map[string]int{
	"general":      0,
	"sensitive":    1,
	"questionable": 2,
	"explicit":     3,
}

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
	frames  int // frames sampled per video
	store   *storage.Store
	db      *db.DB
	log     *slog.Logger

	sem        chan struct{} // bounds concurrent background tag jobs
	ffmpegWarn sync.Once     // warn once if ffmpeg is missing
}

// Config selects and configures the tagger.
type Config struct {
	Enabled     bool
	ModelDir    string
	Device      string // cpu|cuda
	VideoFrames int    // frames sampled per video; <=0 uses DefaultVideoFrames
}

// NewManager picks the best available tagger: the ONNX tagger if the build
// supports it and a model is present, else the heuristic fallback.
func NewManager(cfg Config, store *storage.Store, database *db.DB, log *slog.Logger) *Manager {
	frames := cfg.VideoFrames
	if frames <= 0 {
		frames = DefaultVideoFrames
	}
	if frames > maxVideoFrames {
		frames = maxVideoFrames
	}

	// Mirror the thumbnail pool: frame extraction and inference are both CPU-bound
	// background work that must not starve request handling on a lean Unraid box.
	workers := runtime.GOMAXPROCS(0) / 2
	if workers < 1 {
		workers = 1
	}
	if workers > 4 {
		workers = 4
	}

	m := &Manager{
		enabled: cfg.Enabled,
		frames:  frames,
		store:   store,
		db:      database,
		log:     log,
		sem:     make(chan struct{}, workers),
	}
	if !cfg.Enabled {
		m.tagger = &HeuristicTagger{}
		return m
	}
	if t, err := newOnnxTagger(cfg.ModelDir, cfg.Device, log); err == nil {
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

// TagMediaAsync runs TagMedia in the background, logging any error. Jobs are
// bounded by the worker semaphore, so a bulk import queues rather than spawning
// one ffmpeg per video at once.
func (m *Manager) TagMediaAsync(id int64, blobPath, kind string) {
	if !m.enabled {
		return
	}
	timeout := 2 * time.Minute
	if kind == string(models.KindVideo) {
		timeout = videoTagTimeout
	}
	go func() {
		m.sem <- struct{}{}
		defer func() { <-m.sem }()

		ctx, cancel := context.WithTimeout(context.Background(), timeout)
		defer cancel()
		if err := m.TagMedia(ctx, id, blobPath, kind); err != nil {
			m.log.Warn("ai: auto-tag failed", "media", id, "err", err)
		}
	}()
}

// TagMedia decrypts the blob, extracts one or more representative frames from
// it, runs the tagger over each, and persists the union of their suggestions as
// tags with source="ai". Comics and games are still skipped — see docs/AI.md.
func (m *Manager) TagMedia(ctx context.Context, id int64, blobPath, kind string) error {
	var (
		frames []Suggestion
		err    error
	)
	switch models.MediaKind(kind) {
	case models.KindImage:
		frames, err = m.tagImage(ctx, id, blobPath)
	case models.KindGIF:
		frames, err = m.tagGIF(ctx, id, blobPath)
	case models.KindVideo:
		frames, err = m.tagVideo(ctx, id, blobPath)
	default:
		return nil
	}
	if err != nil {
		return err
	}
	if len(frames) == 0 {
		// Nothing to say: either the tagger found nothing above threshold, or the
		// kind was skipped for a missing dependency (which already logged why).
		return nil
	}
	m.persist(ctx, id, frames)
	return nil
}

// tagImage handles a single still frame.
func (m *Manager) tagImage(ctx context.Context, id int64, blobPath string) ([]Suggestion, error) {
	rc, err := m.store.Open(blobPath)
	if err != nil {
		return nil, err
	}
	defer rc.Close()

	img, _, err := image.Decode(rc)
	if err != nil {
		return nil, err
	}
	// Record dimensions while we have the decoded image.
	b := img.Bounds()
	_ = m.db.UpdateMediaDimensions(ctx, id, b.Dx(), b.Dy())

	return m.tagger.Tag(ctx, img)
}

// tagGIF replays the animation and tags a sample of composited frames. Pure Go —
// no ffmpeg needed, so animated GIFs get real coverage even on the lean image.
func (m *Manager) tagGIF(ctx context.Context, id int64, blobPath string) ([]Suggestion, error) {
	rc, err := m.store.Open(blobPath)
	if err != nil {
		return nil, err
	}
	imgs, err := gifFrames(rc, m.frames)
	rc.Close()
	if err != nil {
		// Not a real GIF container — a mislabelled webp or png, which the generic
		// decoder handled before frame sampling existed. Keep that working.
		m.log.Debug("ai: gif decode failed, falling back to single frame", "media", id, "err", err)
		return m.tagImage(ctx, id, blobPath)
	}
	// Every composited frame is the full logical screen, so the first is as good
	// as any for the item's dimensions.
	b := imgs[0].Bounds()
	_ = m.db.UpdateMediaDimensions(ctx, id, b.Dx(), b.Dy())

	perFrame := make([][]Suggestion, 0, len(imgs))
	for _, img := range imgs {
		if err := ctx.Err(); err != nil {
			return nil, err
		}
		s, err := m.tagger.Tag(ctx, img)
		if err != nil {
			return nil, err
		}
		perFrame = append(perFrame, s)
	}
	return aggregate(perFrame), nil
}

// tagVideo decrypts the blob to a temp file (ffmpeg needs a seekable input to
// find the moov atom), probes it, then extracts and tags evenly spaced frames.
//
// Frames are pulled at native resolution rather than scaled down: the tagger
// sees the real pixel dimensions, so resolution-sensitive suggestions like
// "high-res" stay truthful. They are decoded one at a time so a 4K clip never
// holds N full frames in memory at once.
//
// Without ffmpeg this is a no-op rather than an error, matching how video poster
// generation degrades on a lean image.
func (m *Manager) tagVideo(ctx context.Context, id int64, blobPath string) ([]Suggestion, error) {
	if !thumbnail.Available() {
		m.ffmpegWarn.Do(func() {
			m.log.Warn("ai: ffmpeg/ffprobe not found on PATH — video auto-tagging disabled")
		})
		return nil, nil
	}

	tmpPath, err := m.decryptToTemp(blobPath)
	if err != nil {
		return nil, err
	}
	defer os.Remove(tmpPath)

	var dur float64
	if meta, err := thumbnail.Probe(ctx, tmpPath); err == nil {
		dur = meta.Duration
		// Idempotent and guarded against zeroes; fills in metadata for videos whose
		// poster job never ran.
		if err := m.db.UpdateVideoMeta(ctx, id, meta.Duration, meta.Width, meta.Height); err != nil {
			m.log.Warn("ai: persist video meta", "media", id, "err", err)
		}
	} else {
		m.log.Debug("ai: probe failed, sampling single frame", "media", id, "err", err)
	}

	offsets := sampleOffsets(dur, m.frames)
	perFrame := make([][]Suggestion, 0, len(offsets))
	for _, at := range offsets {
		if err := ctx.Err(); err != nil {
			return nil, err
		}
		jpg, err := thumbnail.FrameAt(ctx, tmpPath, at, 0)
		if err != nil {
			// A single unreadable offset (a seek past a truncated tail, a corrupt
			// GOP) must not sink the whole clip — keep whatever the others yield.
			m.log.Debug("ai: frame extract failed", "media", id, "at", at, "err", err)
			continue
		}
		img, _, err := image.Decode(bytes.NewReader(jpg))
		if err != nil {
			m.log.Debug("ai: frame decode failed", "media", id, "at", at, "err", err)
			continue
		}
		s, err := m.tagger.Tag(ctx, img)
		if err != nil {
			return nil, err
		}
		perFrame = append(perFrame, s)
	}
	if len(perFrame) == 0 {
		return nil, errors.New("ai: no frame could be extracted")
	}
	return aggregate(perFrame), nil
}

// decryptToTemp streams a blob out of the encrypted store into a plaintext temp
// file and returns its path. The caller owns removal.
func (m *Manager) decryptToTemp(blobPath string) (string, error) {
	tmp, err := os.CreateTemp("", "oppai-aitag-*")
	if err != nil {
		return "", err
	}
	tmpPath := tmp.Name()

	rc, err := m.store.Open(blobPath)
	if err != nil {
		tmp.Close()
		os.Remove(tmpPath)
		return "", err
	}
	_, copyErr := io.Copy(tmp, rc)
	rc.Close()
	if cerr := tmp.Close(); cerr != nil && copyErr == nil {
		copyErr = cerr
	}
	if copyErr != nil {
		os.Remove(tmpPath)
		return "", copyErr
	}
	return tmpPath, nil
}

// persist writes the aggregated suggestions as source="ai" tags.
func (m *Manager) persist(ctx context.Context, id int64, suggestions []Suggestion) {
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
}
