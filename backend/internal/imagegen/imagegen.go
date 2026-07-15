// Package imagegen drives a local Automatic1111 / SD.Next-compatible image
// generation WebUI (the one exposing /sdapi/v1). It is deliberately thin: it speaks
// that API, decodes the base64 images it returns, and knows nothing about the
// library. Storage, encryption and the "don't save unless asked" rule all live in the
// api layer — this package only talks to the generator.
//
// The generator runs on the user's own network (its base URL is a setting). Nothing
// here reaches a cloud service, in keeping with the project's no-telemetry design.
package imagegen

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

// Client is a stateless caller of an A1111-style API. The base URL is passed per call
// rather than baked in, so it can change at runtime from the Settings screen without
// rebuilding the client.
type Client struct {
	hc *http.Client
}

// New returns a Client. Generation is slow (tens of seconds on CPU), so the timeout
// is generous; listing models is quick and bounded by the caller's context.
func New() *Client {
	return &Client{hc: &http.Client{Timeout: 10 * time.Minute}}
}

// Model is one checkpoint the generator can load. Title is what the API's
// override_settings.sd_model_checkpoint expects; the rest is for display.
type Model struct {
	Title string `json:"title"`      // "revAnimated_v122.safetensors [abc123]" — the selector value
	Name  string `json:"model_name"` // "revAnimated_v122" — a friendlier label
	Hash  string `json:"hash,omitempty"`
}

// Models lists the checkpoints the generator has available.
func (c *Client) Models(ctx context.Context, base string) ([]Model, error) {
	var out []Model
	if err := c.getJSON(ctx, base+"/sdapi/v1/sd-models", &out); err != nil {
		return nil, err
	}
	return out, nil
}

// Ping confirms the generator is reachable and speaking the expected API. Used by the
// status endpoint so the UI can say "connected" rather than failing at generate time.
func (c *Client) Ping(ctx context.Context, base string) error {
	return c.getJSON(ctx, base+"/sdapi/v1/sd-models", &[]Model{})
}

// GenerateRequest is one txt2img job. Zero values are filled with sane defaults by
// the API layer before this is called, so the generator never sees a 0×0 image.
type GenerateRequest struct {
	Prompt         string
	NegativePrompt string
	Checkpoint     string // Model.Title; empty leaves the generator on its current one
	Sampler        string
	Steps          int
	Width          int
	Height         int
	CfgScale       float64
	Seed           int64 // -1 for random
	Count          int   // how many images to produce (n_iter)
}

// GenerateResult carries the decoded image bytes (PNG) and the seed actually used, so
// a good result can be reproduced or nudged.
type GenerateResult struct {
	Images [][]byte
	Seed   int64
}

// txt2imgPayload is the wire shape A1111 expects. override_settings swaps the
// checkpoint just for this call, and restore_afterwards puts the generator back so we
// don't leave someone else's UI on a model they didn't pick.
type txt2imgPayload struct {
	Prompt           string         `json:"prompt"`
	NegativePrompt   string         `json:"negative_prompt"`
	Steps            int            `json:"steps"`
	Width            int            `json:"width"`
	Height           int            `json:"height"`
	CfgScale         float64        `json:"cfg_scale"`
	SamplerName      string         `json:"sampler_name,omitempty"`
	Seed             int64          `json:"seed"`
	NIter            int            `json:"n_iter"`
	BatchSize        int            `json:"batch_size"`
	OverrideSettings map[string]any `json:"override_settings,omitempty"`
	RestoreAfter     bool           `json:"override_settings_restore_afterwards"`
}

// txt2imgResponse is the relevant slice of the API's reply. Info is a JSON *string*
// (A1111 double-encodes it) holding the resolved seed among other things.
type txt2imgResponse struct {
	Images []string `json:"images"`
	Info   string   `json:"info"`
}

// Generate runs one txt2img job and returns the decoded images. It does not persist
// anything — that is the caller's decision.
func (c *Client) Generate(ctx context.Context, base string, req GenerateRequest) (*GenerateResult, error) {
	payload := txt2imgPayload{
		Prompt:         req.Prompt,
		NegativePrompt: req.NegativePrompt,
		Steps:          req.Steps,
		Width:          req.Width,
		Height:         req.Height,
		CfgScale:       req.CfgScale,
		SamplerName:    req.Sampler,
		Seed:           req.Seed,
		NIter:          req.Count,
		BatchSize:      1,
		RestoreAfter:   true,
	}
	if req.Checkpoint != "" {
		payload.OverrideSettings = map[string]any{"sd_model_checkpoint": req.Checkpoint}
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}
	httpReq, err := http.NewRequestWithContext(ctx, http.MethodPost, base+"/sdapi/v1/txt2img", bytes.NewReader(body))
	if err != nil {
		return nil, err
	}
	httpReq.Header.Set("Content-Type", "application/json")

	resp, err := c.hc.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("image generator unreachable: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		msg, _ := io.ReadAll(io.LimitReader(resp.Body, 2<<10))
		return nil, fmt.Errorf("image generator returned %d: %s", resp.StatusCode, bytes.TrimSpace(msg))
	}

	var out txt2imgResponse
	if err := json.NewDecoder(resp.Body).Decode(&out); err != nil {
		return nil, fmt.Errorf("decode generator response: %w", err)
	}
	if len(out.Images) == 0 {
		return nil, fmt.Errorf("generator returned no images")
	}

	res := &GenerateResult{Seed: req.Seed}
	for _, s := range out.Images {
		raw, err := decodeImage(s)
		if err != nil {
			return nil, err
		}
		res.Images = append(res.Images, raw)
	}
	// Best-effort: pull the resolved seed out of the info blob so a random (-1) seed
	// comes back as the concrete number that produced this image.
	var info struct {
		Seed int64 `json:"seed"`
	}
	if json.Unmarshal([]byte(out.Info), &info) == nil && info.Seed != 0 {
		res.Seed = info.Seed
	}
	return res, nil
}

// decodeImage turns one API image string into raw bytes. A1111 returns bare base64,
// but tolerate a "data:...;base64," prefix in case a variant sends one.
func decodeImage(s string) ([]byte, error) {
	if i := bytesIndexComma(s); i >= 0 && hasDataPrefix(s) {
		s = s[i+1:]
	}
	raw, err := base64.StdEncoding.DecodeString(s)
	if err != nil {
		return nil, fmt.Errorf("decode generated image: %w", err)
	}
	return raw, nil
}

func hasDataPrefix(s string) bool { return len(s) >= 5 && s[:5] == "data:" }

func bytesIndexComma(s string) int {
	for i := 0; i < len(s); i++ {
		if s[i] == ',' {
			return i
		}
	}
	return -1
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
