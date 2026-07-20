// Package ai provides local, on-box auto-tagging. No network calls are ever
// made — inference runs entirely on the user's hardware.
//
// Two implementations exist:
//
//   - onnxTagger (build tag `onnx`): runs a real multi-label image classifier via
//     ONNX Runtime. The default Docker image bakes in JoyTag, which tags drawn art
//     and photographs alike over the Danbooru vocabulary — the library holds both,
//     and an anime-only tagger has nothing true to say about a photo. A wd14 tagger
//     still works and additionally emits a rating; see docs/AI.md.
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
	"sort"
	"strings"
	"sync"
	"time"

	_ "golang.org/x/image/webp"

	"github.com/youruser/oppailib/internal/db"
	"github.com/youruser/oppailib/internal/models"
	"github.com/youruser/oppailib/internal/storage"
	"github.com/youruser/oppailib/internal/thumbnail"
)

// AnalyzeAppearance tags an uploaded character reference without adding it to the
// media library. Only person/appearance descriptors survive: scene metadata,
// character identities, ratings, actions and photographed objects are deliberately
// excluded so using the result in image generation doesn't recreate the source scene.
func (m *Manager) AnalyzeAppearance(ctx context.Context, r io.Reader) ([]Suggestion, error) {
	img, _, err := image.Decode(r)
	if err != nil {
		return nil, err
	}
	tags, err := m.tagger.Tag(ctx, img)
	if err != nil {
		return nil, err
	}
	tags = m.filter(tags)
	out := make([]Suggestion, 0, len(tags))
	for _, s := range tags {
		if isAppearanceSuggestion(s) {
			out = append(out, s)
		}
	}
	return out, nil
}

func isAppearanceSuggestion(s Suggestion) bool {
	if s.Category != catGeneral {
		return false
	}
	n := strings.ToLower(strings.ReplaceAll(s.Name, "_", " "))
	// Appearance vocabulary is intentionally positive/allow-listed. This is much
	// safer than trying to enumerate every possible object and action in Danbooru.
	appearanceWords := []string{
		"hair", "eyes", "eye", "skin", "face", "facial", "freckles", "mole", "makeup",
		"lip", "lips", "mouth", "teeth", "fang", "fangs", "ear", "ears", "nose", "eyebrow", "eyebrows", "eyelash", "eyelashes",
		"breast", "breasts", "chest", "waist", "hips", "thigh", "thighs", "legs", "arms", "muscular",
		"slender", "curvy", "chubby", "tall", "short", "body", "tan", "pale",
		"glasses", "tattoo", "tattoos", "piercing", "piercings", "scar", "scars", "beard", "mustache", "androgynous",
		"female", "male", "woman", "man", "girl", "boy", "adult", "elf", "kemonomimi",
		"shirt", "dress", "skirt", "pants", "shorts", "jacket", "coat", "uniform",
		"swimsuit", "bikini", "lingerie", "underwear", "stockings", "gloves", "boots",
		"shoes", "hat", "ribbon", "necklace", "earrings", "outfit", "clothes", "clothing",
	}
	for _, word := range appearanceWords {
		if strings.Contains(" "+n+" ", " "+word+" ") {
			return true
		}
	}
	return false
}

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
//
// Only a model that emits ratings reaches this — JoyTag, the default, does not; a
// wd14 tagger does. It stays because the rule is about ratings, not about wd14.
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
	tagger Tagger
	frames int // frames sampled per video
	store  *storage.Store
	db     *db.DB
	log    *slog.Logger

	sem        chan struct{} // bounds concurrent background tag jobs
	ffmpegWarn sync.Once     // warn once if ffmpeg is missing

	mu   sync.RWMutex
	opts Options
}

// Config selects and configures the tagger at startup. ModelDir and Device are
// baked into the tagger and only change on restart; the knobs in Options are
// live-editable from the Settings screen.
type Config struct {
	Enabled     bool
	ModelDir    string
	Device      string // cpu|cuda
	VideoFrames int    // frames sampled per video; <=0 uses DefaultVideoFrames
}

// Options are the runtime-tunable tagging knobs, edited from the Settings
// screen. They sit on top of the model's own thresholds (see onnx.go): the model
// decides what it is confident enough to suggest at all, and these decide how
// much of that the library actually keeps.
type Options struct {
	Enabled  bool    // master switch; off means no tagging at all
	AutoTag  bool    // tag automatically on upload/import
	MinScore float64 // drop suggestions below this confidence (ratings exempt)
	MaxTags  int     // keep at most this many suggestions per item (ratings exempt)
}

// NewManager picks the best available tagger: the ONNX tagger if the build
// supports it and a model is present, else the heuristic fallback. The tagger is
// built even when tagging starts disabled, so switching it on in Settings
// doesn't require a restart.
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
		frames: frames,
		store:  store,
		db:     database,
		log:    log,
		sem:    make(chan struct{}, workers),
		opts:   Options{Enabled: cfg.Enabled, AutoTag: true, MinScore: 0.35, MaxTags: 20},
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

// SetOptions applies live settings.
func (m *Manager) SetOptions(o Options) {
	m.mu.Lock()
	m.opts = o
	m.mu.Unlock()
}

// Options returns the current tuning.
func (m *Manager) Options() Options {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return m.opts
}

// Enabled reports whether auto-tagging is on.
func (m *Manager) Enabled() bool { return m.Options().Enabled }

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
//
// This is the ingest path, so it also honors the AutoTag switch — an explicit
// re-tag from the UI goes through TagMedia and runs regardless.
func (m *Manager) TagMediaAsync(id int64, blobPath, kind string) {
	o := m.Options()
	if !o.Enabled || !o.AutoTag {
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
//
// Videos additionally record *where* each tag was seen, so the viewer can mark
// those offsets on the timeline. Stills have no timeline, and a GIF's frame
// delays are unreliable enough that offsets derived from them would point at the
// wrong picture — both persist tags only.
func (m *Manager) TagMedia(ctx context.Context, id int64, blobPath, kind string) error {
	var (
		tags    []Suggestion
		moments map[tagKey][]db.Moment
		err     error
	)
	switch models.MediaKind(kind) {
	case models.KindImage:
		tags, err = m.tagImage(ctx, id, blobPath)
	case models.KindGIF:
		tags, err = m.tagGIF(ctx, id, blobPath)
	case models.KindVideo:
		tags, moments, err = m.tagVideo(ctx, id, blobPath)
	default:
		return nil
	}
	if err != nil {
		return err
	}
	tags = m.filter(tags)
	if len(tags) == 0 {
		// Nothing to say: either the tagger found nothing above threshold, or the
		// kind was skipped for a missing dependency (which already logged why).
		return nil
	}
	m.persist(ctx, id, tags, moments)
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
func (m *Manager) tagVideo(ctx context.Context, id int64, blobPath string) ([]Suggestion, map[tagKey][]db.Moment, error) {
	if !thumbnail.Available() {
		m.ffmpegWarn.Do(func() {
			m.log.Warn("ai: ffmpeg/ffprobe not found on PATH — video auto-tagging disabled")
		})
		return nil, nil, nil
	}

	tmpPath, err := m.decryptToTemp(blobPath)
	if err != nil {
		return nil, nil, err
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
	frames := make([]framed, 0, len(offsets))
	for _, at := range offsets {
		if err := ctx.Err(); err != nil {
			return nil, nil, err
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
			return nil, nil, err
		}
		frames = append(frames, framed{at: at, sug: s})
	}
	if len(frames) == 0 {
		return nil, nil, errors.New("ai: no frame could be extracted")
	}
	// A probe-less clip is sampled at offset 0 only (see sampleOffsets); one
	// marker pinned to the start says nothing useful, so skip the timeline.
	if dur <= 0 {
		return aggregate(suggestions(frames)), nil, nil
	}
	return aggregate(suggestions(frames)), momentsByTag(frames), nil
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

// persist writes the aggregated suggestions as source="ai" tags, along with the
// per-frame moments backing each one. Moments are cleared first: this run's
// frames are the whole truth about where its tags live, and a re-tag at a
// different frame count would otherwise leave orphaned offsets behind.
func (m *Manager) persist(ctx context.Context, id int64, tags []Suggestion, moments map[tagKey][]db.Moment) {
	if len(moments) > 0 {
		if err := m.db.ClearTagMoments(ctx, id); err != nil {
			m.log.Warn("ai: clear tag moments", "media", id, "err", err)
		}
	}
	for _, s := range tags {
		cat := catOrGeneral(s.Category)
		if err := m.db.AddTag(ctx, id, s.Name, cat, "ai", s.Score); err != nil {
			m.log.Warn("ai: persist tag", "tag", s.Name, "err", err)
			continue
		}
		if ms := moments[keyFor(s)]; len(ms) > 0 {
			if err := m.db.SetTagMoments(ctx, id, s.Name, cat, ms); err != nil {
				m.log.Warn("ai: persist tag moments", "tag", s.Name, "err", err)
			}
		}
	}
	m.log.Info("ai: tagged media", "media", id, "tags", len(tags), "tagger", m.tagger.Name())
}

// filter applies the user's confidence floor and per-item cap, keeping the
// highest-scoring suggestions.
//
// The content rating is exempt from both. It is chosen by argmax, not by passing
// a threshold (see onnx.go), so its score is a relative winner rather than a
// confidence — a tame image can win "general" at 0.3 and still be correctly
// rated. Thresholding it would silently leave items unrated, and letting a cap
// evict it would drop the one verdict the model always has an opinion about.
func (m *Manager) filter(in []Suggestion) []Suggestion {
	o := m.Options()
	rated := make([]Suggestion, 0, 1)
	rest := make([]Suggestion, 0, len(in))
	for _, s := range in {
		switch {
		case s.Category == catRating:
			rated = append(rated, s)
		case s.Score >= o.MinScore:
			rest = append(rest, s)
		}
	}
	sort.SliceStable(rest, func(i, j int) bool { return rest[i].Score > rest[j].Score })
	if o.MaxTags > 0 && len(rest) > o.MaxTags {
		rest = rest[:o.MaxTags]
	}
	return append(rated, rest...)
}
