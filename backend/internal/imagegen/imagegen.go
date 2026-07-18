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
	Title string `json:"title"`
	Name  string `json:"model_name"`
	Hash  string `json:"hash,omitempty"`
}

// Lora is one LoRA network. Name is the selector value handed back on generate;
// Alias is a friendlier display label when set.
type Lora struct {
	Name  string `json:"name"`
	Alias string `json:"alias,omitempty"`
	Path  string `json:"path,omitempty"`
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
