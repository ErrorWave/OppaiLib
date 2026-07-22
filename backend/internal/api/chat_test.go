package api

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestChatProxiesLocalOpenAIEndpoint(t *testing.T) {
	var gotAuth string
	var got struct {
		Model    string        `json:"model"`
		Messages []chatMessage `json:"messages"`
		TopK     int           `json:"top_k"`
		Preset   string        `json:"preset"`
	}
	llm := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		gotAuth = r.Header.Get("Authorization")
		if r.URL.Path != "/v1/chat/completions" {
			t.Fatalf("path = %q", r.URL.Path)
		}
		if err := json.NewDecoder(r.Body).Decode(&got); err != nil {
			t.Fatal(err)
		}
		_, _ = w.Write([]byte(`{"choices":[{"message":{"role":"assistant","content":"Hi from Libby"}}]}`))
	}))
	defer llm.Close()

	s, token := newTestServer(t)
	cur := s.settings.Get()
	cur.ChatURL = llm.URL
	cur.ChatModel = "test-local"
	cur.ChatAPIKey = "local-secret"
	s.settings.Set(cur)

	rec := do(t, s.Handler(), token, http.MethodPost, "/api/chat",
		`{"mode":"playful","messages":[{"role":"user","content":"hello"}],"options":{"top_k":37,"preset":"Libby"}}`)
	if rec.Code != http.StatusOK {
		t.Fatalf("chat: %d %s", rec.Code, rec.Body.String())
	}
	if got.Model != "test-local" || len(got.Messages) != 2 || got.Messages[0].Role != "system" {
		t.Fatalf("forwarded request = %+v", got)
	}
	if got.TopK != 37 || got.Preset != "Libby" {
		t.Fatalf("advanced options not forwarded: %+v", got)
	}
	if gotAuth != "Bearer local-secret" {
		t.Fatalf("Authorization = %q", gotAuth)
	}
	var out map[string]string
	_ = json.Unmarshal(rec.Body.Bytes(), &out)
	if out["message"] != "Hi from Libby" {
		t.Fatalf("response = %q", out["message"])
	}
}

func TestChatRejectsUnknownMode(t *testing.T) {
	s, token := newTestServer(t)
	cur := s.settings.Get()
	cur.ChatURL = "http://127.0.0.1:1"
	cur.ChatModel = "local"
	s.settings.Set(cur)
	rec := do(t, s.Handler(), token, http.MethodPost, "/api/chat",
		`{"mode":"anything","messages":[{"role":"user","content":"hello"}]}`)
	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want 400", rec.Code)
	}
}

func TestChatModelLifecycle(t *testing.T) {
	loaded := "old.gguf"
	llm := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.Method + " " + r.URL.Path {
		case "GET /v1/internal/model/list":
			_, _ = w.Write([]byte(`{"model_names":["old.gguf","new.gguf"]}`))
		case "GET /v1/internal/model/info":
			_, _ = w.Write([]byte(`{"model_name":"` + loaded + `"}`))
		case "POST /v1/internal/model/load":
			var in struct {
				ModelName string `json:"model_name"`
			}
			_ = json.NewDecoder(r.Body).Decode(&in)
			loaded = in.ModelName
			_, _ = w.Write([]byte(`{"status":"ok"}`))
		case "POST /v1/internal/model/unload":
			loaded = ""
			_, _ = w.Write([]byte(`{"status":"ok"}`))
		default:
			http.NotFound(w, r)
		}
	}))
	defer llm.Close()

	s, token := newTestServer(t)
	cur := s.settings.Get()
	cur.ChatURL = llm.URL + "/v1"
	cur.ChatModel = loaded
	s.settings.Set(cur)
	h := s.Handler()
	if rec := do(t, h, token, http.MethodGet, "/api/chat/models", ""); rec.Code != http.StatusOK || !strings.Contains(rec.Body.String(), `"supported":true`) {
		t.Fatalf("list models: %d %s", rec.Code, rec.Body)
	}
	if rec := do(t, h, token, http.MethodPost, "/api/chat/models/load", `{"modelName":"new.gguf"}`); rec.Code != http.StatusOK {
		t.Fatalf("load model: %d %s", rec.Code, rec.Body)
	}
	if s.settings.Get().ChatModel != "new.gguf" {
		t.Fatalf("saved model = %q", s.settings.Get().ChatModel)
	}
	if rec := do(t, h, token, http.MethodPost, "/api/chat/models/unload", `{}`); rec.Code != http.StatusOK || loaded != "" {
		t.Fatalf("unload model: %d %s loaded=%q", rec.Code, rec.Body, loaded)
	}
}
