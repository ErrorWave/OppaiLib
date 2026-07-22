package api

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

type chatModelsResponse struct {
	Models    []string `json:"models"`
	Loaded    string   `json:"loaded"`
	Supported bool     `json:"supported"`
}

type chatBackendProbe struct {
	Ready  bool
	Loaded string
	Detail string
}

func chatBackendBase(raw string) string {
	return strings.TrimSuffix(strings.TrimRight(raw, "/"), "/v1")
}

func (s *Server) chatBackendRequest(ctx context.Context, method, path string, body []byte) (int, []byte, error) {
	cur := s.settings.Get()
	if cur.ChatURL == "" {
		return 0, nil, fmt.Errorf("chat backend URL is not configured")
	}
	req, err := http.NewRequestWithContext(ctx, method, chatBackendBase(cur.ChatURL)+path, bytes.NewReader(body))
	if err != nil {
		return 0, nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	if cur.ChatAPIKey != "" {
		req.Header.Set("Authorization", "Bearer "+cur.ChatAPIKey)
	}
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return 0, nil, err
	}
	defer resp.Body.Close()
	raw, err := io.ReadAll(io.LimitReader(resp.Body, 4<<20))
	return resp.StatusCode, raw, err
}

// probeChatBackend is deliberately read-only. Model load/unload is owned by the
// text-generation backend: doing it through OppaiLib can race the backend WebUI,
// exceed container memory, or leave the API alive with no model loaded.
func (s *Server) probeChatBackend(ctx context.Context) chatBackendProbe {
	cur := s.settings.Get()
	if cur.ChatURL == "" {
		return chatBackendProbe{Detail: "Chat API URL is not configured."}
	}
	status, raw, err := s.chatBackendRequest(ctx, http.MethodGet, "/v1/internal/model/info", nil)
	if err == nil && status >= 200 && status < 300 {
		var info struct {
			ModelName string `json:"model_name"`
		}
		if json.Unmarshal(raw, &info) == nil {
			loaded := strings.TrimSpace(info.ModelName)
			if loaded == "" || strings.EqualFold(loaded, "none") {
				return chatBackendProbe{Detail: "No model is loaded in text-generation-webui. Load one in its WebUI, then refresh."}
			}
			return chatBackendProbe{Ready: true, Loaded: loaded}
		}
	}

	// Generic OpenAI-compatible backends do not expose text-generation-webui's
	// internal endpoint. A non-empty /models response is the best portable
	// readiness signal; prefer the configured model when it appears in the list.
	status, raw, err = s.chatBackendRequest(ctx, http.MethodGet, "/v1/models", nil)
	if err != nil {
		return chatBackendProbe{Detail: "Chat API is unreachable: " + err.Error()}
	}
	if status < 200 || status >= 300 {
		return chatBackendProbe{Detail: fmt.Sprintf("Chat API readiness check returned HTTP %d.", status)}
	}
	var generic struct {
		Data []struct {
			ID string `json:"id"`
		} `json:"data"`
	}
	if json.Unmarshal(raw, &generic) != nil {
		return chatBackendProbe{Detail: "Chat API returned an invalid model list."}
	}
	if len(generic.Data) == 0 {
		return chatBackendProbe{Detail: "Chat API is online, but it reports no loaded model."}
	}
	loaded := strings.TrimSpace(generic.Data[0].ID)
	for _, model := range generic.Data {
		if model.ID == cur.ChatModel {
			loaded = model.ID
			break
		}
	}
	return chatBackendProbe{Ready: true, Loaded: loaded}
}

func (s *Server) handleChatModels(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(r.Context(), 15*time.Second)
	defer cancel()
	status, raw, err := s.chatBackendRequest(ctx, http.MethodGet, "/v1/internal/model/list", nil)
	if err == nil && status >= 200 && status < 300 {
		var list struct {
			ModelNames []string `json:"model_names"`
		}
		if json.Unmarshal(raw, &list) == nil {
			loaded := ""
			if infoStatus, infoRaw, infoErr := s.chatBackendRequest(ctx, http.MethodGet, "/v1/internal/model/info", nil); infoErr == nil && infoStatus >= 200 && infoStatus < 300 {
				var info struct {
					ModelName string `json:"model_name"`
				}
				_ = json.Unmarshal(infoRaw, &info)
				loaded = strings.TrimSpace(info.ModelName)
				if strings.EqualFold(loaded, "none") {
					loaded = ""
				}
			}
			// Listing is read-only. Loading is intentionally left to the backend's
			// own WebUI/startup flags, which know its loader and memory settings.
			writeJSON(w, http.StatusOK, chatModelsResponse{Models: list.ModelNames, Loaded: loaded, Supported: false})
			return
		}
	}
	// Generic OpenAI-compatible backends can usually list models but do not expose
	// load/unload. Show that list read-only instead of failing the whole chat panel.
	status, raw, err = s.chatBackendRequest(ctx, http.MethodGet, "/v1/models", nil)
	if err != nil || status < 200 || status >= 300 {
		writeErr(w, http.StatusBadGateway, "chat backend does not expose model controls")
		return
	}
	var generic struct {
		Data []struct {
			ID string `json:"id"`
		} `json:"data"`
	}
	if json.Unmarshal(raw, &generic) != nil {
		writeErr(w, http.StatusBadGateway, "invalid model list response")
		return
	}
	models := make([]string, 0, len(generic.Data))
	for _, model := range generic.Data {
		if model.ID != "" {
			models = append(models, model.ID)
		}
	}
	loaded := ""
	if len(models) > 0 {
		loaded = models[0]
		configuredModel := s.settings.Get().ChatModel
		for _, model := range models {
			if model == configuredModel {
				loaded = model
				break
			}
		}
	}
	writeJSON(w, http.StatusOK, chatModelsResponse{Models: models, Loaded: loaded, Supported: false})
}

func (s *Server) handleLoadChatModel(w http.ResponseWriter, r *http.Request) {
	writeErr(w, http.StatusConflict, "OppaiLib model loading is disabled; load the model in text-generation-webui, then refresh chat status")
}

func (s *Server) handleUnloadChatModel(w http.ResponseWriter, r *http.Request) {
	writeErr(w, http.StatusConflict, "OppaiLib model unloading is disabled; manage the model in text-generation-webui")
}
