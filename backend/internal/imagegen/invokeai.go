package imagegen

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"math/rand"
	"net/http"
	"net/url"
	"strings"
	"time"
)

// The InvokeAI dialect. InvokeAI has no one-shot txt2img call: a generation is a
// node graph enqueued on a session queue, executed asynchronously, with the result
// saved into InvokeAI's own gallery. This client builds the standard text-to-image
// graph (SD 1.x / 2.x / SDXL), enqueues one session per requested image, polls the
// queue until they finish, downloads the PNGs — and then deletes them from the
// InvokeAI gallery, so the only durable copy is the one the user explicitly saves
// into the library.

// invokeQueue is the queue id InvokeAI creates by default; there is exactly one
// unless the operator runs a custom deployment.
const invokeQueue = "default"

// invokeModelRecord is one entry from /api/v2/models/ (InvokeAI 4.0+).
type invokeModelRecord struct {
	Key  string `json:"key"`
	Hash string `json:"hash"`
	Name string `json:"name"`
	Base string `json:"base"` // "sd-1", "sd-2", "sdxl", "flux", ...
	Type string `json:"type"` // "main", "lora", "vae", ...
}

func invokeBaseSupported(base string) bool {
	return base == "sd-1" || base == "sd-2" || base == "sdxl"
}

func (c *Client) invokeModelList(ctx context.Context, base string) ([]invokeModelRecord, error) {
	var out struct {
		Models []invokeModelRecord `json:"models"`
	}
	if err := c.getJSON(ctx, base+"/api/v2/models/", &out); err != nil {
		return nil, err
	}
	return out.Models, nil
}

// invokeModels lists installed main (checkpoint) models. The model key is the stable
// identifier InvokeAI wants back, so it plays the role A1111's title does.
func (c *Client) invokeModels(ctx context.Context, base string) ([]Model, error) {
	records, err := c.invokeModelList(ctx, base)
	if err != nil {
		return nil, err
	}
	out := []Model{}
	for _, r := range records {
		if r.Type != "main" {
			continue
		}
		out = append(out, Model{Title: r.Key, Name: r.Name, Hash: r.Hash})
	}
	return out, nil
}

func (c *Client) invokeLoras(ctx context.Context, base string) ([]Lora, error) {
	records, err := c.invokeModelList(ctx, base)
	if err != nil {
		return nil, err
	}
	out := []Lora{}
	for _, r := range records {
		if r.Type != "lora" {
			continue
		}
		out = append(out, Lora{Name: r.Name, Alias: r.Name, Path: r.Key})
	}
	return out, nil
}

// invokeScheduler maps a sampler name (possibly an A1111 one) onto InvokeAI's
// scheduler ids, defaulting to euler_a — the workhorse for the SD 1.5-era models
// this feature targets.
func invokeScheduler(sampler string) string {
	s := strings.ToLower(strings.TrimSpace(sampler))
	switch s {
	case "":
		return "euler_a"
	case "euler a":
		return "euler_a"
	case "dpm++ 2m":
		return "dpmpp_2m"
	case "dpm++ 2m karras":
		return "dpmpp_2m_k"
	case "dpm++ 2m sde":
		return "dpmpp_2m_sde"
	case "dpm++ 2m sde karras":
		return "dpmpp_2m_sde_k"
	case "dpm++ sde":
		return "dpmpp_sde"
	case "dpm++ sde karras":
		return "dpmpp_sde_k"
	case "dpm++ 2s a":
		return "dpmpp_2s"
	}
	// Anything already shaped like an InvokeAI id ("euler_k", "unipc", …) passes
	// through; anything else falls back rather than failing graph validation.
	for _, r := range s {
		if (r < 'a' || r > 'z') && (r < '0' || r > '9') && r != '_' {
			return "euler_a"
		}
	}
	return s
}

func invokeModelIdent(r invokeModelRecord) map[string]any {
	return map[string]any{
		"key":  r.Key,
		"hash": r.Hash,
		"name": r.Name,
		"base": r.Base,
		"type": r.Type,
	}
}

type invokeLoraApply struct {
	rec    invokeModelRecord
	weight float64
}

// buildInvokeGraph assembles the standard txt2img node graph: model loader → LoRA
// chain → prompts/noise → denoise → latents-to-image. Only the final l2i node is
// non-intermediate, so intermediates never pile up in InvokeAI's gallery.
func buildInvokeGraph(main invokeModelRecord, loras []invokeLoraApply, req GenerateRequest, scheduler string) map[string]any {
	sdxl := main.Base == "sdxl"
	nodes := map[string]any{}
	edges := []map[string]any{}
	edge := func(from, fromField, to, toField string) {
		edges = append(edges, map[string]any{
			"source":      map[string]any{"node_id": from, "field": fromField},
			"destination": map[string]any{"node_id": to, "field": toField},
		})
	}

	loaderType := "main_model_loader"
	if sdxl {
		loaderType = "sdxl_model_loader"
	}
	nodes["model"] = map[string]any{
		"id": "model", "type": loaderType,
		"model":           invokeModelIdent(main),
		"is_intermediate": true,
	}

	// The unet/clip lines thread through each LoRA loader in turn; whatever node is
	// last in the chain feeds the prompts and the denoiser.
	unetNode := "model"
	clipNode := "model"
	for i, l := range loras {
		id := fmt.Sprintf("lora%d", i)
		loraType := "lora_loader"
		if sdxl {
			loraType = "sdxl_lora_loader"
		}
		nodes[id] = map[string]any{
			"id": id, "type": loraType,
			"lora":            invokeModelIdent(l.rec),
			"weight":          l.weight,
			"is_intermediate": true,
		}
		edge(unetNode, "unet", id, "unet")
		edge(clipNode, "clip", id, "clip")
		if sdxl {
			edge(clipNode, "clip2", id, "clip2")
		}
		unetNode, clipNode = id, id
	}

	if sdxl {
		for id, prompt := range map[string]string{"pos": req.Prompt, "neg": req.NegativePrompt} {
			// style == prompt mirrors InvokeAI's own linear UI, which concatenates
			// the prompt into the style field unless the user splits them.
			nodes[id] = map[string]any{
				"id": id, "type": "sdxl_compel_prompt",
				"prompt": prompt, "style": prompt,
				"original_width": req.Width, "original_height": req.Height,
				"target_width": req.Width, "target_height": req.Height,
				"crop_top": 0, "crop_left": 0,
				"is_intermediate": true,
			}
			edge(clipNode, "clip", id, "clip")
			edge(clipNode, "clip2", id, "clip2")
		}
	} else {
		for id, prompt := range map[string]string{"pos": req.Prompt, "neg": req.NegativePrompt} {
			nodes[id] = map[string]any{
				"id": id, "type": "compel",
				"prompt":          prompt,
				"is_intermediate": true,
			}
			edge(clipNode, "clip", id, "clip")
		}
	}

	// The seed set here is a placeholder: the batch data varies noise.seed per run.
	nodes["noise"] = map[string]any{
		"id": "noise", "type": "noise",
		"seed": 0, "width": req.Width, "height": req.Height,
		"use_cpu":         true,
		"is_intermediate": true,
	}
	nodes["denoise"] = map[string]any{
		"id": "denoise", "type": "denoise_latents",
		"steps": req.Steps, "cfg_scale": req.CfgScale,
		"denoising_start": 0.0, "denoising_end": 1.0,
		"scheduler":       scheduler,
		"is_intermediate": true,
	}
	edge("pos", "conditioning", "denoise", "positive_conditioning")
	edge("neg", "conditioning", "denoise", "negative_conditioning")
	edge("noise", "noise", "denoise", "noise")
	edge(unetNode, "unet", "denoise", "unet")

	nodes["l2i"] = map[string]any{
		"id": "l2i", "type": "l2i",
		"fp32":            false,
		"is_intermediate": false,
	}
	edge("denoise", "latents", "l2i", "latents")
	edge("model", "vae", "l2i", "vae")

	return map[string]any{"id": "oppailib_txt2img", "nodes": nodes, "edges": edges}
}

// invokeQueueItem is the slice of a session-queue item this client reads.
type invokeQueueItem struct {
	ItemID       int64  `json:"item_id"`
	BatchID      string `json:"batch_id"`
	Status       string `json:"status"` // pending | in_progress | completed | failed | canceled
	ErrorType    string `json:"error_type"`
	ErrorMessage string `json:"error_message"`
	Error        string `json:"error"` // older InvokeAI versions
	Session      struct {
		Results map[string]struct {
			Type  string `json:"type"`
			Image struct {
				ImageName string `json:"image_name"`
			} `json:"image"`
		} `json:"results"`
	} `json:"session"`
}

func (item *invokeQueueItem) errText() string {
	switch {
	case item.ErrorMessage != "":
		return item.ErrorMessage
	case item.Error != "":
		return item.Error
	default:
		return "generation failed"
	}
}

// imageName digs the finished image out of the session results. Node ids are
// rewritten during batch preparation, so scan for the (single) image output rather
// than looking up "l2i" by name.
func (item *invokeQueueItem) imageName() string {
	for _, r := range item.Session.Results {
		if r.Type == "image_output" && r.Image.ImageName != "" {
			return r.Image.ImageName
		}
	}
	return ""
}

func (c *Client) invokeGenerate(ctx context.Context, base string, req GenerateRequest) (*GenerateResult, error) {
	records, err := c.invokeModelList(ctx, base)
	if err != nil {
		return nil, err
	}

	// Resolve the checkpoint: by key (the id the picker uses), by name as a fallback,
	// or the first installed main model when none was chosen.
	var main invokeModelRecord
	found := false
	for _, r := range records {
		if r.Type != "main" {
			continue
		}
		if req.Checkpoint == "" {
			if !found {
				main, found = r, true
			}
			continue
		}
		if r.Key == req.Checkpoint {
			main, found = r, true
			break
		}
		if !found && r.Name == req.Checkpoint {
			main, found = r, true
		}
	}
	if !found {
		return nil, fmt.Errorf("InvokeAI has no matching model installed")
	}
	if !invokeBaseSupported(main.Base) {
		return nil, fmt.Errorf("model %q is a %s model; only sd-1, sd-2 and sdxl are supported", main.Name, main.Base)
	}

	// Resolve requested LoRAs against what's installed. A LoRA trained for another
	// base would fail InvokeAI's graph validation, so mismatches are skipped rather
	// than sinking the whole generation.
	var loras []invokeLoraApply
	for _, want := range req.Loras {
		for _, r := range records {
			if r.Type == "lora" && (r.Name == want.Name || r.Key == want.Name) {
				if r.Base == main.Base {
					loras = append(loras, invokeLoraApply{rec: r, weight: want.Weight})
				}
				break
			}
		}
	}

	seeds := make([]int64, req.Count)
	for i := range seeds {
		if req.Seed < 0 {
			seeds[i] = rand.Int63n(1 << 32)
		} else {
			seeds[i] = req.Seed + int64(i)
		}
	}

	graph := buildInvokeGraph(main, loras, req, invokeScheduler(req.Sampler))
	payload := map[string]any{
		"prepend": false,
		"batch": map[string]any{
			"graph": graph,
			"runs":  1,
			"data": [][]map[string]any{{
				{"node_path": "noise", "field_name": "seed", "items": seeds},
			}},
		},
	}
	var enq struct {
		ItemIDs []int64 `json:"item_ids"`
		Batch   struct {
			BatchID string `json:"batch_id"`
		} `json:"batch"`
	}
	if err := c.postJSON(ctx, base+"/api/v1/queue/"+invokeQueue+"/enqueue_batch", payload, &enq); err != nil {
		return nil, err
	}
	itemIDs := enq.ItemIDs
	if len(itemIDs) == 0 {
		// Older InvokeAI versions don't return item ids; find them via the batch id.
		itemIDs, err = c.invokeFindItems(ctx, base, enq.Batch.BatchID)
		if err != nil {
			return nil, err
		}
	}
	if len(itemIDs) == 0 {
		return nil, fmt.Errorf("InvokeAI accepted the job but reported no queue items")
	}

	res := &GenerateResult{Seed: seeds[0]}
	for i, id := range itemIDs {
		name, err := c.invokeAwaitImage(ctx, base, id)
		if err != nil {
			return nil, err
		}
		data, err := c.invokeFetchImage(ctx, base, name)
		// Downloaded or not, the gallery copy has served its purpose. Best-effort
		// delete keeps "nothing persists unless saved" true on the InvokeAI side too.
		c.invokeDeleteImage(ctx, base, name)
		if err != nil {
			return nil, err
		}
		res.Images = append(res.Images, data)
		if i < len(seeds) {
			res.Seeds = append(res.Seeds, seeds[i])
		}
	}
	return res, nil
}

// invokeFindItems lists the queue and picks out the items belonging to batchID.
func (c *Client) invokeFindItems(ctx context.Context, base, batchID string) ([]int64, error) {
	if batchID == "" {
		return nil, nil
	}
	var out struct {
		Items []invokeQueueItem `json:"items"`
	}
	if err := c.getJSON(ctx, base+"/api/v1/queue/"+invokeQueue+"/list?limit=200", &out); err != nil {
		return nil, err
	}
	var ids []int64
	for _, item := range out.Items {
		if item.BatchID == batchID {
			ids = append(ids, item.ItemID)
		}
	}
	return ids, nil
}

// invokeAwaitImage polls one queue item until it completes and returns the finished
// image's gallery name. The caller's context bounds the wait.
func (c *Client) invokeAwaitImage(ctx context.Context, base string, itemID int64) (string, error) {
	ticker := time.NewTicker(1500 * time.Millisecond)
	defer ticker.Stop()
	for {
		var item invokeQueueItem
		if err := c.getJSON(ctx, fmt.Sprintf("%s/api/v1/queue/%s/i/%d", base, invokeQueue, itemID), &item); err != nil {
			return "", err
		}
		switch item.Status {
		case "completed":
			if name := item.imageName(); name != "" {
				return name, nil
			}
			return "", fmt.Errorf("InvokeAI finished but returned no image")
		case "failed":
			return "", fmt.Errorf("InvokeAI: %s", item.errText())
		case "canceled":
			return "", fmt.Errorf("InvokeAI canceled the generation")
		}
		select {
		case <-ctx.Done():
			return "", ctx.Err()
		case <-ticker.C:
		}
	}
}

func (c *Client) invokeFetchImage(ctx context.Context, base, name string) ([]byte, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, base+"/api/v1/images/i/"+url.PathEscape(name)+"/full", nil)
	if err != nil {
		return nil, err
	}
	resp, err := c.hc.Do(req)
	if err != nil {
		return nil, fmt.Errorf("image generator unreachable: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("fetch generated image: InvokeAI returned %d", resp.StatusCode)
	}
	return io.ReadAll(io.LimitReader(resp.Body, 64<<20))
}

func (c *Client) invokeDeleteImage(ctx context.Context, base, name string) {
	req, err := http.NewRequestWithContext(ctx, http.MethodDelete, base+"/api/v1/images/i/"+url.PathEscape(name), nil)
	if err != nil {
		return
	}
	if resp, err := c.hc.Do(req); err == nil {
		resp.Body.Close()
	}
}

// postJSON POSTs in as JSON and decodes the response into out (which may be nil).
func (c *Client) postJSON(ctx context.Context, u string, in, out any) error {
	body, err := json.Marshal(in)
	if err != nil {
		return err
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, u, bytes.NewReader(body))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := c.hc.Do(req)
	if err != nil {
		return fmt.Errorf("image generator unreachable: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode < 200 || resp.StatusCode > 299 {
		msg, _ := io.ReadAll(io.LimitReader(resp.Body, 2<<10))
		return fmt.Errorf("image generator returned %d: %s", resp.StatusCode, bytes.TrimSpace(msg))
	}
	if out == nil {
		return nil
	}
	return json.NewDecoder(io.LimitReader(resp.Body, 8<<20)).Decode(out)
}
