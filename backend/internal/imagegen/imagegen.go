// Package imagegen drives a local image-generation server. Two API dialects are
// spoken: the Automatic1111 / SD.Next one (/sdapi/v1, see a1111.go) and InvokeAI's
// queue-and-graph one (/api/v1 + /api/v2, see invokeai.go). Which dialect a given
// base URL speaks is detected automatically, so the Settings screen stays a single
// URL field.
//
// The package is deliberately thin: it talks to the generator, decodes the images it
// returns, and knows nothing about the library. Storage, encryption and the "don't
// save unless asked" rule all live in the api layer.
//
// The generator runs on the user's own network (its base URL is a setting). Nothing
// here reaches a cloud service, in keeping with the project's no-telemetry design.
package imagegen

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"sync"
	"time"
)

// Kind is the API dialect a generator speaks.
type Kind string

const (
	KindA1111    Kind = "a1111"
	KindInvokeAI Kind = "invokeai"
)

// How long a positive detection is trusted before the URL is probed again. Short
// enough that swapping the software behind an unchanged URL is picked up without a
// restart, long enough that a busy screen doesn't probe on every request.
const kindTTL = 5 * time.Minute

type kindEntry struct {
	kind Kind
	at   time.Time
}

// Client is a stateless caller of a generator API. The base URL is passed per call
// rather than baked in, so it can change at runtime from the Settings screen without
// rebuilding the client. The only state is the detection cache.
type Client struct {
	hc *http.Client

	mu    sync.Mutex
	kinds map[string]kindEntry
}

// New returns a Client. Generation is slow (tens of seconds on CPU), so the timeout
// is generous; listing models is quick and bounded by the caller's context.
func New() *Client {
	return &Client{
		hc:    &http.Client{Timeout: 10 * time.Minute},
		kinds: make(map[string]kindEntry),
	}
}

// Model is one checkpoint the generator can load. Title is the stable selector value
// handed back on generate (A1111's checkpoint title, InvokeAI's model key); the rest
// is for display.
type Model struct {
	Title    string         `json:"title"`
	Name     string         `json:"model_name"`
	Hash     string         `json:"hash,omitempty"`
	Base     string         `json:"base,omitempty"`
	Defaults *ModelDefaults `json:"defaults,omitempty"`
}

// ModelDefaults are the generation settings the generator recommends for a model
// (InvokeAI stores these per model). Zero fields mean "no opinion"; the UI applies
// them when the model is picked, and the user can still override everything.
type ModelDefaults struct {
	Steps     int     `json:"steps,omitempty"`
	CfgScale  float64 `json:"cfgScale,omitempty"`
	Scheduler string  `json:"scheduler,omitempty"`
	Width     int     `json:"width,omitempty"`
	Height    int     `json:"height,omitempty"`
	Vae       string  `json:"vae,omitempty"`
	// Weight is a LoRA's recommended strength (InvokeAI stores just this for LoRAs).
	Weight float64 `json:"weight,omitempty"`
}

// Vae is one standalone VAE the generator can decode with. Key is the selector value
// handed back on generate; Base says which model family it belongs to.
type Vae struct {
	Key  string `json:"key"`
	Name string `json:"name"`
	Base string `json:"base,omitempty"`
}

// Template is a reusable prompt scaffold (InvokeAI calls them style presets, A1111
// calls them styles). Prompt may contain a "{prompt}" placeholder; clients splice the
// user's text in before generating, so the server never needs to know about them.
type Template struct {
	ID             string `json:"id"`
	Name           string `json:"name"`
	Prompt         string `json:"prompt"`
	NegativePrompt string `json:"negativePrompt"`
}

// Lora is one LoRA network. Name is the selector value handed back on generate;
// Alias is a friendlier display label when set.
type Lora struct {
	Name  string `json:"name"`
	Alias string `json:"alias,omitempty"`
	Path  string `json:"path,omitempty"`
}

// ModelDetail is the full editable record for one model or LoRA, as InvokeAI's
// model manager shows it. Key is the stable identifier the update call wants back.
type ModelDetail struct {
	Key            string         `json:"key"`
	Name           string         `json:"name"`
	Base           string         `json:"base,omitempty"`
	Type           string         `json:"type"`
	Description    string         `json:"description,omitempty"`
	TriggerPhrases []string       `json:"triggerPhrases"`
	Defaults       *ModelDefaults `json:"defaults,omitempty"`
}

// ModelChanges is a partial edit to a model record. Nil fields are left unchanged;
// a non-nil Defaults replaces the whole recommended-settings blob (matching how
// InvokeAI's own UI writes it).
type ModelChanges struct {
	Name           *string        `json:"name"`
	Description    *string        `json:"description"`
	TriggerPhrases *[]string      `json:"triggerPhrases"`
	Defaults       *ModelDefaults `json:"defaults"`
}

// Board is one InvokeAI gallery board. The pseudo-id "none" stands for the
// uncategorized pile, mirroring InvokeAI's own API.
type Board struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Count int    `json:"count"`
}

// GalleryImage is one image InvokeAI keeps in its gallery.
type GalleryImage struct {
	Name    string `json:"name"`
	Width   int    `json:"width,omitempty"`
	Height  int    `json:"height,omitempty"`
	Created string `json:"created,omitempty"`
}

// GalleryPage is one page of a board's images, newest first.
type GalleryPage struct {
	Items []GalleryImage `json:"items"`
	Total int            `json:"total"`
}

// InstallJob is one model download InvokeAI is running (or has finished).
type InstallJob struct {
	ID         int64  `json:"id"`
	Status     string `json:"status"` // waiting | downloading | running | completed | error | cancelled
	Source     string `json:"source"`
	Error      string `json:"error,omitempty"`
	Bytes      int64  `json:"bytes,omitempty"`
	TotalBytes int64  `json:"totalBytes,omitempty"`
}

// LoraWeight is one LoRA to apply to a generation, by selector name.
type LoraWeight struct {
	Name   string
	Weight float64
}

// GenerateRequest is one txt2img job. Zero values are filled with sane defaults by
// the API layer before this is called, so the generator never sees a 0×0 image.
type GenerateRequest struct {
	Prompt         string
	NegativePrompt string
	Checkpoint     string // Model.Title; empty leaves the choice to the backend
	VAE            string // Vae.Key (or name); empty means the model's own VAE
	Sampler        string
	Steps          int
	Width          int
	Height         int
	CfgScale       float64
	Seed           int64 // -1 for random
	Count          int   // how many images to produce
	Loras          []LoraWeight
}

// GenerateResult carries the decoded image bytes (PNG) and the seeds actually used,
// so a good result can be reproduced or nudged. Seeds is index-aligned with Images;
// Seed is the first one, kept for callers that only track a single value.
type GenerateResult struct {
	Images [][]byte
	Seed   int64
	Seeds  []int64
}

// Backend reports which API dialect the generator at base speaks, probing it if the
// cached answer has expired.
func (c *Client) Backend(ctx context.Context, base string) (Kind, error) {
	c.mu.Lock()
	if e, ok := c.kinds[base]; ok && time.Since(e.at) < kindTTL {
		c.mu.Unlock()
		return e.kind, nil
	}
	c.mu.Unlock()

	kind, err := c.detect(ctx, base)
	if err != nil {
		return "", err
	}
	c.mu.Lock()
	c.kinds[base] = kindEntry{kind: kind, at: time.Now()}
	c.mu.Unlock()
	return kind, nil
}

// detect probes InvokeAI's version endpoint, which an A1111-style server does not
// serve. A definite "not found" answer means A1111; a network failure is reported
// rather than cached, so a generator that is merely down isn't mislabelled.
func (c *Client) detect(ctx context.Context, base string) (Kind, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, base+"/api/v1/app/version", nil)
	if err != nil {
		return "", err
	}
	resp, err := c.hc.Do(req)
	if err != nil {
		return "", fmt.Errorf("image generator unreachable: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode == http.StatusOK {
		var v struct {
			Version string `json:"version"`
		}
		if json.NewDecoder(io.LimitReader(resp.Body, 4<<10)).Decode(&v) == nil && v.Version != "" {
			return KindInvokeAI, nil
		}
	}
	return KindA1111, nil
}

// Models lists the checkpoints the generator has available.
func (c *Client) Models(ctx context.Context, base string) ([]Model, error) {
	kind, err := c.Backend(ctx, base)
	if err != nil {
		return nil, err
	}
	if kind == KindInvokeAI {
		return c.invokeModels(ctx, base)
	}
	return c.a1111Models(ctx, base)
}

// Loras lists the LoRA networks registered with the generator.
func (c *Client) Loras(ctx context.Context, base string) ([]Lora, error) {
	kind, err := c.Backend(ctx, base)
	if err != nil {
		return nil, err
	}
	if kind == KindInvokeAI {
		return c.invokeLoras(ctx, base)
	}
	return c.a1111Loras(ctx, base)
}

// Vaes lists the standalone VAEs the generator has installed. A1111-style servers
// don't expose a comparable listing everywhere, so only InvokeAI answers with any.
func (c *Client) Vaes(ctx context.Context, base string) ([]Vae, error) {
	kind, err := c.Backend(ctx, base)
	if err != nil {
		return nil, err
	}
	if kind == KindInvokeAI {
		return c.invokeVaes(ctx, base)
	}
	return []Vae{}, nil
}

// Templates lists the generator's prompt templates (InvokeAI style presets).
func (c *Client) Templates(ctx context.Context, base string) ([]Template, error) {
	kind, err := c.Backend(ctx, base)
	if err != nil {
		return nil, err
	}
	if kind == KindInvokeAI {
		return c.invokeTemplates(ctx, base)
	}
	return []Template{}, nil
}

// Cover fetches the generator's own preview image for a model or LoRA, by selector
// key or display name. Only InvokeAI keeps cover art; elsewhere this reports
// "no cover" and the caller falls back to whatever it has.
func (c *Client) Cover(ctx context.Context, base, name string) ([]byte, string, error) {
	kind, err := c.Backend(ctx, base)
	if err != nil {
		return nil, "", err
	}
	if kind != KindInvokeAI {
		return nil, "", fmt.Errorf("generator keeps no cover images")
	}
	return c.invokeCover(ctx, base, name)
}

// errInvokeOnly wraps the features InvokeAI alone offers with a readable refusal
// for an A1111-style backend.
func (c *Client) requireInvoke(ctx context.Context, base, what string) error {
	kind, err := c.Backend(ctx, base)
	if err != nil {
		return err
	}
	if kind != KindInvokeAI {
		return fmt.Errorf("%s requires an InvokeAI backend", what)
	}
	return nil
}

// ModelDetail fetches the full editable record for a model or LoRA by key or name.
func (c *Client) ModelDetail(ctx context.Context, base, name string) (*ModelDetail, error) {
	if err := c.requireInvoke(ctx, base, "editing model settings"); err != nil {
		return nil, err
	}
	return c.invokeModelDetail(ctx, base, name)
}

// UpdateModel applies a partial edit to a model record, so name, description,
// trigger phrases and recommended settings stay in sync with InvokeAI's own UI.
func (c *Client) UpdateModel(ctx context.Context, base, key string, ch ModelChanges) (*ModelDetail, error) {
	if err := c.requireInvoke(ctx, base, "editing model settings"); err != nil {
		return nil, err
	}
	return c.invokeUpdateModel(ctx, base, key, ch)
}

// Boards lists the InvokeAI gallery's boards, with "none" (Uncategorized) first.
func (c *Client) Boards(ctx context.Context, base string) ([]Board, error) {
	if err := c.requireInvoke(ctx, base, "the generator gallery"); err != nil {
		return nil, err
	}
	return c.invokeBoards(ctx, base)
}

// BoardImages lists one board's images, newest first. boardID "none" is the
// uncategorized pile.
func (c *Client) BoardImages(ctx context.Context, base, boardID string, offset, limit int) (*GalleryPage, error) {
	if err := c.requireInvoke(ctx, base, "the generator gallery"); err != nil {
		return nil, err
	}
	return c.invokeBoardImages(ctx, base, boardID, offset, limit)
}

// GalleryImage streams one gallery image (the thumbnail or the full PNG).
func (c *Client) GalleryImage(ctx context.Context, base, name string, thumb bool) ([]byte, string, error) {
	if err := c.requireInvoke(ctx, base, "the generator gallery"); err != nil {
		return nil, "", err
	}
	return c.invokeGalleryImage(ctx, base, name, thumb)
}

// GalleryImagePrompt fetches the positive prompt recorded in an image's metadata,
// best-effort — an image without metadata just yields "".
func (c *Client) GalleryImagePrompt(ctx context.Context, base, name string) string {
	if err := c.requireInvoke(ctx, base, "the generator gallery"); err != nil {
		return ""
	}
	return c.invokeImagePrompt(ctx, base, name)
}

// DeleteGalleryImage removes one image from InvokeAI's gallery.
func (c *Client) DeleteGalleryImage(ctx context.Context, base, name string) error {
	if err := c.requireInvoke(ctx, base, "the generator gallery"); err != nil {
		return err
	}
	return c.invokeDeleteImage(ctx, base, name)
}

// InstallModel asks InvokeAI to download and register a model from a URL (a
// Civitai download link). The download runs inside InvokeAI; poll InstallJobs.
func (c *Client) InstallModel(ctx context.Context, base, source string) (*InstallJob, error) {
	if err := c.requireInvoke(ctx, base, "installing models"); err != nil {
		return nil, err
	}
	return c.invokeInstallModel(ctx, base, source)
}

// InstallJobs lists InvokeAI's model-install queue, newest first.
func (c *Client) InstallJobs(ctx context.Context, base string) ([]InstallJob, error) {
	if err := c.requireInvoke(ctx, base, "installing models"); err != nil {
		return nil, err
	}
	return c.invokeInstallJobs(ctx, base)
}

// Ping confirms the generator is reachable and speaking a supported API. Used by the
// status endpoint so the UI can say "connected" rather than failing at generate time.
func (c *Client) Ping(ctx context.Context, base string) error {
	_, err := c.Models(ctx, base)
	return err
}

// Generate runs one txt2img job and returns the decoded images. It does not persist
// anything in the library — that is the caller's decision.
func (c *Client) Generate(ctx context.Context, base string, req GenerateRequest) (*GenerateResult, error) {
	kind, err := c.Backend(ctx, base)
	if err != nil {
		return nil, err
	}
	if kind == KindInvokeAI {
		return c.invokeGenerate(ctx, base, req)
	}
	return c.a1111Generate(ctx, base, req)
}

// getJSON GETs url and decodes the JSON body into v.
func (c *Client) getJSON(ctx context.Context, url string, v any) error {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return err
	}
	resp, err := c.hc.Do(req)
	if err != nil {
		return fmt.Errorf("image generator unreachable: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("image generator returned %d", resp.StatusCode)
	}
	return json.NewDecoder(io.LimitReader(resp.Body, 8<<20)).Decode(v)
}
