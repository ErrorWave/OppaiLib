package api

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

// a 1×1 PNG, the smallest thing a stub generator can hand back that decodes as a real
// image (and so survives the store + thumbnail path).
const onePixelPNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="

// stubA1111 stands in for a local Automatic1111 WebUI: it lists one checkpoint and
// answers txt2img with a fixed image and a resolved seed.
func stubA1111(t *testing.T) *httptest.Server {
	t.Helper()
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case "/sdapi/v1/sd-models":
			w.Header().Set("Content-Type", "application/json")
			_, _ = w.Write([]byte(`[{"title":"rev.safetensors [abc123]","model_name":"rev","hash":"abc123"}]`))
		case "/sdapi/v1/txt2img":
			w.Header().Set("Content-Type", "application/json")
			_, _ = w.Write([]byte(`{"images":["` + onePixelPNG + `"],"info":"{\"seed\":4242}"}`))
		default:
			http.NotFound(w, r)
		}
	}))
	t.Cleanup(srv.Close)
	return srv
}

func enableImageGen(t *testing.T, s *Server, url string) {
	t.Helper()
	cur := s.settings.Get()
	cur.ImageGenURL = url
	s.settings.Set(cur)
	if !s.settings.Get().ImageGenEnabled {
		t.Fatal("image generation did not enable after setting a URL")
	}
}

// The whole ephemeral path: a generate returns preview ids that stream as images and
// never touch the library until an explicit save files one as an image.
func TestImageGenGenerateThenSave(t *testing.T) {
	gen := stubA1111(t)
	s, token := newTestServer(t)
	enableImageGen(t, s, gen.URL)
	h := s.Handler()

	// Status reports the checkpoint the stub lists.
	rec := do(t, h, token, "GET", "/api/imagegen/status", "")
	if rec.Code != http.StatusOK {
		t.Fatalf("status: %d %s", rec.Code, rec.Body)
	}
	var status struct {
		Enabled   bool `json:"enabled"`
		Reachable bool `json:"reachable"`
		Models    []struct {
			Title string `json:"title"`
		} `json:"models"`
	}
	_ = json.Unmarshal(rec.Body.Bytes(), &status)
	if !status.Enabled || !status.Reachable || len(status.Models) != 1 {
		t.Fatalf("status = %+v, want enabled+reachable with one model", status)
	}

	// Generate two images.
	rec = do(t, h, token, "POST", "/api/imagegen/generate",
		`{"prompt":"a test","checkpoint":"`+status.Models[0].Title+`","count":1}`)
	if rec.Code != http.StatusOK {
		t.Fatalf("generate: %d %s", rec.Code, rec.Body)
	}
	var genOut struct {
		Images []struct {
			ID   string `json:"id"`
			Seed int64  `json:"seed"`
		} `json:"images"`
	}
	_ = json.Unmarshal(rec.Body.Bytes(), &genOut)
	if len(genOut.Images) != 1 {
		t.Fatalf("got %d preview ids, want 1", len(genOut.Images))
	}
	if genOut.Images[0].Seed != 4242 {
		t.Errorf("seed = %d, want the resolved 4242 from the info blob", genOut.Images[0].Seed)
	}
	previewID := genOut.Images[0].ID

	// A generate must not have created a library item.
	rec = do(t, h, token, "GET", "/api/media", "")
	if strings.Contains(rec.Body.String(), `"id"`) && strings.Count(rec.Body.String(), `"id"`) > 0 {
		if !strings.Contains(rec.Body.String(), "[]") && strings.Contains(rec.Body.String(), `"kind"`) {
			t.Fatalf("library is not empty after a bare generate: %s", rec.Body)
		}
	}

	// The preview streams as an image from memory.
	rec = do(t, h, token, "GET", "/api/imagegen/preview/"+previewID, "")
	if rec.Code != http.StatusOK {
		t.Fatalf("preview: %d %s", rec.Code, rec.Body)
	}
	if ct := rec.Header().Get("Content-Type"); !strings.HasPrefix(ct, "image/") {
		t.Errorf("preview Content-Type = %q, want image/*", ct)
	}

	// Saving crosses into the library as an image.
	rec = do(t, h, token, "POST", "/api/imagegen/save",
		`{"id":"`+previewID+`","title":"my render","tags":["portrait"]}`)
	if rec.Code != http.StatusOK {
		t.Fatalf("save: %d %s", rec.Code, rec.Body)
	}
	var saved struct {
		ID int64 `json:"id"`
	}
	_ = json.Unmarshal(rec.Body.Bytes(), &saved)
	if saved.ID == 0 {
		t.Fatal("save returned no media id")
	}
	rec = do(t, h, token, "GET", "/api/media", "")
	if !strings.Contains(rec.Body.String(), `"kind":"image"`) {
		t.Errorf("saved generated image not in library: %s", rec.Body)
	}
}

// A preview id must expire out of reach: a save against an unknown id 404s rather than
// resurrecting something.
func TestImageGenSaveUnknownPreview(t *testing.T) {
	s, token := newTestServer(t)
	enableImageGen(t, s, "http://127.0.0.1:1") // never reached; save doesn't call it
	rec := do(t, s.Handler(), token, "POST", "/api/imagegen/save", `{"id":"deadbeef","title":"x"}`)
	if rec.Code != http.StatusNotFound {
		t.Fatalf("save unknown preview: %d, want 404", rec.Code)
	}
}

// Generate is refused when no generator is configured, rather than dialing nothing.
func TestImageGenDisabled(t *testing.T) {
	s, token := newTestServer(t)
	rec := do(t, s.Handler(), token, "GET", "/api/imagegen/status", "")
	var status struct {
		Enabled bool `json:"enabled"`
	}
	_ = json.Unmarshal(rec.Body.Bytes(), &status)
	if status.Enabled {
		t.Error("status reports enabled with no URL set")
	}
	rec = do(t, s.Handler(), token, "POST", "/api/imagegen/generate", `{"prompt":"x"}`)
	if rec.Code != http.StatusServiceUnavailable {
		t.Fatalf("generate while disabled: %d, want 503", rec.Code)
	}
}

// The prompt endpoint turns speech into a fuller prompt + a non-empty negative.
func TestImageGenPromptEndpoint(t *testing.T) {
	s, token := newTestServer(t)
	rec := do(t, s.Handler(), token, "POST", "/api/imagegen/prompt", `{"text":"draw me a photo of a woman"}`)
	if rec.Code != http.StatusOK {
		t.Fatalf("prompt: %d %s", rec.Code, rec.Body)
	}
	var out struct {
		Prompt         string `json:"prompt"`
		NegativePrompt string `json:"negativePrompt"`
	}
	_ = json.Unmarshal(rec.Body.Bytes(), &out)
	if out.Prompt == "" || out.NegativePrompt == "" {
		t.Errorf("prompt endpoint returned empties: %+v", out)
	}
	if strings.Contains(strings.ToLower(out.Prompt), "draw me") {
		t.Errorf("prompt kept the spoken framing: %q", out.Prompt)
	}
}
