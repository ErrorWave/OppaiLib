package api

import (
	"encoding/json"
	"net/http"
	"strings"
	"testing"
)

func TestChatWorkspacePersistsCharactersProfileAndConversations(t *testing.T) {
	s, token := newTestServer(t)
	h := s.Handler()

	rec := do(t, h, token, http.MethodGet, "/api/chat/workspace", "")
	if rec.Code != http.StatusOK || !strings.Contains(rec.Body.String(), `"id":"libby"`) {
		t.Fatalf("initial workspace: %d %s", rec.Code, rec.Body)
	}

	characterID := strings.Repeat("a", 32)
	conversationID := strings.Repeat("b", 32)
	messageID := strings.Repeat("c", 32)
	body := `{
		"profile":{"displayName":"Owen","persona":"Likes concise replies"},
		"characters":[
			{"id":"libby","name":"Edited Libby","promptWeight":1.25,"defaultMode":"playful","builtIn":true},
			{"id":"` + characterID + `","name":"Mina","personality":"Cheerful","promptWeight":0.9,"defaultMode":"roleplay"}
		],
		"conversations":[{"id":"` + conversationID + `","characterId":"` + characterID + `","title":"Hello","mode":"roleplay","emotion":"happy","intensity":2,"messages":[{"id":"` + messageID + `","role":"user","content":"hello","at":1}],"createdAt":1,"updatedAt":2}],
		"images":[]
	}`
	rec = do(t, h, token, http.MethodPut, "/api/chat/workspace", body)
	if rec.Code != http.StatusOK {
		t.Fatalf("save workspace: %d %s", rec.Code, rec.Body)
	}
	rec = do(t, h, token, http.MethodGet, "/api/chat/workspace", "")
	if !strings.Contains(rec.Body.String(), `"displayName":"Owen"`) ||
		!strings.Contains(rec.Body.String(), `"name":"Edited Libby"`) ||
		!strings.Contains(rec.Body.String(), `"name":"Mina"`) {
		t.Fatalf("reloaded workspace: %s", rec.Body)
	}
}

func TestChatImageIsScannedStoredAndOwned(t *testing.T) {
	s, token := newTestServer(t)
	h := s.Handler()

	rec := do(t, h, token, http.MethodPost, "/api/chat/images",
		`{"characterId":"libby","name":"Beach pose","tags":["beach"],"imageData":"data:image/png;base64,`+validChatPNG+`"}`)
	if rec.Code != http.StatusOK {
		t.Fatalf("upload image: %d %s", rec.Code, rec.Body)
	}
	var image chatImage
	if err := json.Unmarshal(rec.Body.Bytes(), &image); err != nil || image.ID == "" {
		t.Fatalf("image response: %v %+v", err, image)
	}
	if !containsString(image.Tags, "beach") || !containsString(image.Tags, "square") {
		t.Fatalf("scan tags = %v, want supplied + scanner tags", image.Tags)
	}
	rec = do(t, h, token, http.MethodGet, "/api/chat/images/"+image.ID, "")
	if rec.Code != http.StatusOK || rec.Header().Get("Content-Type") != "image/png" {
		t.Fatalf("stream image: %d %q", rec.Code, rec.Header().Get("Content-Type"))
	}
	rec = do(t, h, token, http.MethodDelete, "/api/chat/images/"+image.ID, "")
	if rec.Code != http.StatusOK {
		t.Fatalf("delete image: %d %s", rec.Code, rec.Body)
	}
	if rec = do(t, h, token, http.MethodGet, "/api/chat/images/"+image.ID, ""); rec.Code != http.StatusNotFound {
		t.Fatalf("stream after delete: %d, want 404", rec.Code)
	}
}

const validChatPNG = "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAQSURBVBhXY/jPwPCfARkAAB7zAf+x9MCaAAAAAElFTkSuQmCC"

func containsString(items []string, wanted string) bool {
	for _, item := range items {
		if item == wanted {
			return true
		}
	}
	return false
}
