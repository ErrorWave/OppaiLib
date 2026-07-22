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
				loaded = info.ModelName
			}
			writeJSON(w, http.StatusOK, chatModelsResponse{Models: list.ModelNames, Loaded: loaded, Supported: true})
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
	writeJSON(w, http.StatusOK, chatModelsResponse{Models: models, Loaded: s.settings.Get().ChatModel, Supported: false})
}

type loadChatModelReq struct {
	ModelName string         `json:"modelName"`
	Args      map[string]any `json:"args,omitempty"`
}

func (s *Server) handleLoadChatModel(w http.ResponseWriter, r *http.Request) {
	var in loadChatModelReq
	if err := json.NewDecoder(http.MaxBytesReader(w, r.Body, 1<<20)).Decode(&in); err != nil {
		writeErr(w, http.StatusBadRequest, "invalid model request")
		return
	}
	in.ModelName = strings.TrimSpace(in.ModelName)
	if in.ModelName == "" || len(in.ModelName) > 300 {
		writeErr(w, http.StatusBadRequest, "modelName is required")
		return
	}
	if in.Args == nil {
		in.Args = map[string]any{}
	}
	payload, _ := json.Marshal(map[string]any{"model_name": in.ModelName, "args": in.Args})
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Minute)
	defer cancel()
	status, raw, err := s.chatBackendRequest(ctx, http.MethodPost, "/v1/internal/model/load", payload)
	if err != nil {
		writeErr(w, http.StatusBadGateway, "model load failed: "+err.Error())
		return
	}
	if status < 200 || status >= 300 {
		writeErr(w, http.StatusBadGateway, "model load failed: "+truncateChatError(raw))
		return
	}
	cur := s.settings.Get()
	cur.ChatModel = in.ModelName
	if err := s.db.PutSettings(r.Context(), cur.Map()); err != nil {
		writeErr(w, http.StatusInternalServerError, "model loaded but setting could not be saved")
		return
	}
	s.ApplySettings(cur)
	writeJSON(w, http.StatusOK, map[string]any{"status": "ok", "loaded": in.ModelName})
}

func (s *Server) handleUnloadChatModel(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(r.Context(), 2*time.Minute)
	defer cancel()
	status, raw, err := s.chatBackendRequest(ctx, http.MethodPost, "/v1/internal/model/unload", []byte(`{}`))
	if err != nil {
		writeErr(w, http.StatusBadGateway, "model unload failed: "+err.Error())
		return
	}
	if status < 200 || status >= 300 {
		writeErr(w, http.StatusBadGateway, "model unload failed: "+truncateChatError(raw))
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}
