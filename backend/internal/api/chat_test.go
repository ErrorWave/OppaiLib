package api

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
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
