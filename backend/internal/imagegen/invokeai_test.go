package imagegen

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync"
	"testing"
)

// stubInvoke stands in for an InvokeAI server: version probe, model list, enqueue,
// queue-item polling, image download and delete. It records the enqueued batch and
// which gallery images were deleted.
type stubInvoke struct {
	mu      sync.Mutex
	batch   map[string]any
	deleted []string
}

func (st *stubInvoke) server(t *testing.T) *httptest.Server {
	t.Helper()
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch {
		case r.URL.Path == "/api/v1/app/version":
			fmt.Fprint(w, `{"version":"5.4.0"}`)
		case r.URL.Path == "/api/v2/models/":
			fmt.Fprint(w, `{"models":[
				{"key":"key-main","hash":"h1","name":"AnimeThing","base":"sd-1","type":"main"},
				{"key":"key-flux","hash":"h3","name":"FluxThing","base":"flux","type":"main"},
				{"key":"key-lora","hash":"h2","name":"detail-tweaker","base":"sd-1","type":"lora"},
				{"key":"key-lora-xl","hash":"h4","name":"xl-only","base":"sdxl","type":"lora"}
			]}`)
		case r.URL.Path == "/api/v1/queue/default/enqueue_batch":
			var payload struct {
				Batch map[string]any `json:"batch"`
			}
			_ = json.NewDecoder(r.Body).Decode(&payload)
			st.mu.Lock()
			st.batch = payload.Batch
			st.mu.Unlock()
			fmt.Fprint(w, `{"item_ids":[11,12],"batch":{"batch_id":"b1"}}`)
		case strings.HasPrefix(r.URL.Path, "/api/v1/queue/default/i/"):
			id := strings.TrimPrefix(r.URL.Path, "/api/v1/queue/default/i/")
			fmt.Fprintf(w, `{"item_id":%s,"status":"completed","session":{"results":{
				"l2i:0":{"type":"image_output","image":{"image_name":"img-%s.png"}}
			}}}`, id, id)
		case strings.HasSuffix(r.URL.Path, "/full") && strings.HasPrefix(r.URL.Path, "/api/v1/images/i/"):
			name := strings.TrimSuffix(strings.TrimPrefix(r.URL.Path, "/api/v1/images/i/"), "/full")
			fmt.Fprintf(w, "PNGDATA:%s", name)
		case r.Method == http.MethodDelete && strings.HasPrefix(r.URL.Path, "/api/v1/images/i/"):
			st.mu.Lock()
			st.deleted = append(st.deleted, strings.TrimPrefix(r.URL.Path, "/api/v1/images/i/"))
			st.mu.Unlock()
			fmt.Fprint(w, `{}`)
		default:
			http.NotFound(w, r)
		}
	}))
	t.Cleanup(srv.Close)
	return srv
}

func TestBackendDetection(t *testing.T) {
	invoke := (&stubInvoke{}).server(t)
	a1111 := httptest.NewServer(http.HandlerFunc(http.NotFound))
	t.Cleanup(a1111.Close)

	c := New()
	if kind, err := c.Backend(context.Background(), invoke.URL); err != nil || kind != KindInvokeAI {
		t.Fatalf("invoke detection = %q, %v; want invokeai", kind, err)
	}
	if kind, err := c.Backend(context.Background(), a1111.URL); err != nil || kind != KindA1111 {
		t.Fatalf("a1111 detection = %q, %v; want a1111", kind, err)
	}
}

func TestInvokeModelsAndLoras(t *testing.T) {
	srv := (&stubInvoke{}).server(t)
	c := New()

	models, err := c.Models(context.Background(), srv.URL)
	if err != nil {
		t.Fatalf("models: %v", err)
	}
	// Both mains list — the unsupported base only errors if actually chosen.
	if len(models) != 2 || models[0].Title != "key-main" || models[0].Name != "AnimeThing" {
		t.Fatalf("models = %+v", models)
	}
	loras, err := c.Loras(context.Background(), srv.URL)
	if err != nil {
		t.Fatalf("loras: %v", err)
	}
	if len(loras) != 2 || loras[0].Name != "detail-tweaker" {
		t.Fatalf("loras = %+v", loras)
	}
}

func TestInvokeGenerate(t *testing.T) {
	st := &stubInvoke{}
	srv := st.server(t)
	c := New()

	res, err := c.Generate(context.Background(), srv.URL, GenerateRequest{
		Prompt:     "portrait",
		Checkpoint: "key-main",
		Steps:      20, Width: 512, Height: 768, CfgScale: 7,
		Seed: 1000, Count: 2,
		Loras: []LoraWeight{
			{Name: "detail-tweaker", Weight: 0.75},
			{Name: "xl-only", Weight: 1}, // base mismatch: must be skipped, not fatal
		},
	})
	if err != nil {
		t.Fatalf("generate: %v", err)
	}
	if len(res.Images) != 2 || string(res.Images[0]) != "PNGDATA:img-11.png" || string(res.Images[1]) != "PNGDATA:img-12.png" {
		t.Fatalf("images = %q", res.Images)
	}
	if res.Seed != 1000 || len(res.Seeds) != 2 || res.Seeds[1] != 1001 {
		t.Fatalf("seeds = %d %v", res.Seed, res.Seeds)
	}

	st.mu.Lock()
	defer st.mu.Unlock()
	// Both gallery copies must have been cleaned up after download.
	if len(st.deleted) != 2 {
		t.Fatalf("deleted = %v, want both generated images", st.deleted)
	}
	// The enqueued graph carries the chosen model, exactly one LoRA (the sd-1 one),
	// and per-run seeds for the noise node.
	raw, _ := json.Marshal(st.batch)
	batch := string(raw)
	if !strings.Contains(batch, `"key":"key-main"`) {
		t.Errorf("batch is missing the chosen model: %s", batch)
	}
	if !strings.Contains(batch, `"key":"key-lora"`) || strings.Contains(batch, `"key":"key-lora-xl"`) {
		t.Errorf("batch LoRA selection wrong: %s", batch)
	}
	if !strings.Contains(batch, `"node_path":"noise"`) || !strings.Contains(batch, `[1000,1001]`) {
		t.Errorf("batch seed data wrong: %s", batch)
	}
}

func TestInvokeGenerateRejectsUnsupportedBase(t *testing.T) {
	srv := (&stubInvoke{}).server(t)
	c := New()
	_, err := c.Generate(context.Background(), srv.URL, GenerateRequest{
		Prompt: "x", Checkpoint: "key-flux", Steps: 1, Width: 64, Height: 64, CfgScale: 7, Seed: 1, Count: 1,
	})
	if err == nil || !strings.Contains(err.Error(), "flux") {
		t.Fatalf("err = %v, want an unsupported-base error naming flux", err)
	}
}

func TestInvokeScheduler(t *testing.T) {
	for in, want := range map[string]string{
		"":                "euler_a",
		"Euler a":         "euler_a",
		"DPM++ 2M Karras": "dpmpp_2m_k",
		"dpmpp_2m":        "dpmpp_2m",
		"Weird Sampler!":  "euler_a",
	} {
		if got := invokeScheduler(in); got != want {
			t.Errorf("invokeScheduler(%q) = %q, want %q", in, got, want)
		}
	}
}
