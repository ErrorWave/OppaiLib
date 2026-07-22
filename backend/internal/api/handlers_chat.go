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

const (
	maxChatMessages = 80
	maxChatText     = 32 << 10
)

type chatMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type chatRequest struct {
	Mode      string        `json:"mode"`
	Messages  []chatMessage `json:"messages"`
	Emotion   string        `json:"emotion,omitempty"`
	Intensity int           `json:"intensity,omitempty"`
	// Options is a future-proof pass-through for text-generation-webui's full
	// ChatCompletionRequest surface (samplers, presets, character fields,
	// templates, grammar, thinking controls, stop strings, and new additions).
	Options map[string]any `json:"options,omitempty"`
}

var supportedLibbyEmotions = map[string]bool{
	"neutral": true, "happy": true, "surprised": true, "thinking": true, "mischievous": true,
}

var libbyModes = map[string]string{
	"sweet":    "You are Libby, OppaiLib's warm, affectionate mascot. Be conversational, supportive, playful, and concise. You are an adult speaking with an adult.",
	"playful":  "You are Libby, OppaiLib's mischievous adult mascot. Be teasing, energetic, witty, and direct. You may discuss explicit adult topics when the user asks, without being coy.",
	"bold":     "You are Libby, OppaiLib's confident adult mascot. Be uninhibited, vivid, and direct about consensual adult NSFW topics. Never involve minors, coercion, or real-person sexual exploitation.",
	"roleplay": "You are Libby, OppaiLib's adult roleplay partner. Stay in character, write immersive responses, and follow the user's consensual adult scenario. Never involve minors, coercion, or real-person sexual exploitation.",
}

func (s *Server) handleChatStatus(w http.ResponseWriter, r *http.Request) {
	cur := s.settings.Get()
	writeJSON(w, http.StatusOK, map[string]any{
		"enabled":         cur.ChatEnabled,
		"model":           cur.ChatModel,
		"modes":           []string{"sweet", "playful", "bold", "roleplay"},
		"advancedOptions": cur.ChatEnabled,
	})
}

func (s *Server) handleChat(w http.ResponseWriter, r *http.Request) {
	cur := s.settings.Get()
	if !cur.ChatEnabled {
		writeErr(w, http.StatusServiceUnavailable, "Libby chat is not configured")
		return
	}
	var in chatRequest
	if err := json.NewDecoder(io.LimitReader(r.Body, 1<<20)).Decode(&in); err != nil {
		writeErr(w, http.StatusBadRequest, "invalid chat request")
		return
	}
	modePrompt, ok := libbyModes[in.Mode]
	if !ok {
		writeErr(w, http.StatusBadRequest, "unknown Libby mode")
		return
	}
	emotion := strings.ToLower(strings.TrimSpace(in.Emotion))
	switch emotion { // accept old clients, but always return a pose with artwork
	case "", "default":
		emotion = "neutral"
	case "sad", "worried":
		emotion = "thinking"
	case "horniness":
		emotion = "mischievous"
	}
	if !supportedLibbyEmotions[emotion] {
		emotion = "neutral"
	}
	if in.Intensity < 1 {
		in.Intensity = 1
	} else if in.Intensity > 5 {
		in.Intensity = 5
	}
	modePrompt += fmt.Sprintf(" Your current displayed emotion is %s at intensity %d of 5; let that subtly color your wording without announcing the setting.", emotion, in.Intensity)
	if len(in.Messages) == 0 || len(in.Messages) > maxChatMessages {
		writeErr(w, http.StatusBadRequest, "chat history must contain 1 to 80 messages")
		return
	}
	messages := make([]chatMessage, 0, len(in.Messages)+1)
	messages = append(messages, chatMessage{Role: "system", Content: modePrompt})
	for _, m := range in.Messages {
		m.Role = strings.ToLower(strings.TrimSpace(m.Role))
		m.Content = strings.TrimSpace(m.Content)
		if (m.Role != "user" && m.Role != "assistant") || m.Content == "" || len(m.Content) > maxChatText {
			writeErr(w, http.StatusBadRequest, "chat messages must have a valid role and content")
			return
		}
		messages = append(messages, m)
	}

	payloadMap := map[string]any{"model": cur.ChatModel, "messages": messages, "stream": false}
	// These three fields belong to OppaiLib: allowing them through would bypass the
	// validated history/model or turn this bounded JSON call into an SSE stream.
	for key, value := range in.Options {
		switch key {
		case "model", "messages", "stream":
			continue
		default:
			payloadMap[key] = value
		}
	}
	payload, _ := json.Marshal(payloadMap)
	ctx, cancel := context.WithTimeout(r.Context(), 2*time.Minute)
	defer cancel()
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, cur.ChatURL+"/v1/chat/completions", bytes.NewReader(payload))
	if err != nil {
		writeErr(w, http.StatusBadGateway, "invalid local LLM URL")
		return
	}
	req.Header.Set("Content-Type", "application/json")
	if cur.ChatAPIKey != "" {
		req.Header.Set("Authorization", "Bearer "+cur.ChatAPIKey)
	}
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		writeErr(w, http.StatusBadGateway, fmt.Sprintf("local LLM: %v", err))
		return
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(io.LimitReader(resp.Body, 4<<20))
	if err != nil {
		writeErr(w, http.StatusBadGateway, "couldn't read the local LLM response")
		return
	}
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		writeErr(w, http.StatusBadGateway, fmt.Sprintf("local LLM returned %s: %s", resp.Status, truncateChatError(body)))
		return
	}
	var out struct {
		Choices []struct {
			Message chatMessage `json:"message"`
		} `json:"choices"`
	}
	if json.Unmarshal(body, &out) != nil || len(out.Choices) == 0 || strings.TrimSpace(out.Choices[0].Message.Content) == "" {
		writeErr(w, http.StatusBadGateway, "local LLM returned no message")
		return
	}
	reply := strings.TrimSpace(out.Choices[0].Message.Content)
	emotion = inferChatEmotion(in.Messages[len(in.Messages)-1].Content, reply, emotion)
	if (in.Mode == "playful" || in.Mode == "bold" || in.Mode == "roleplay") &&
		strings.Contains(strings.ToLower(in.Messages[len(in.Messages)-1].Content), "flirt") && in.Intensity < 5 {
		in.Intensity++
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"message":   reply,
		"emotion":   emotion,
		"intensity": in.Intensity,
	})
}

func inferChatEmotion(user, reply, current string) string {
	text := strings.ToLower(user + " " + reply)
	switch {
	case strings.Contains(text, "?") || strings.Contains(text, "wonder") || strings.Contains(text, "think"):
		return "thinking"
	case strings.Contains(text, "!") || strings.Contains(text, "wow") || strings.Contains(text, "oh my"):
		return "surprised"
	case strings.Contains(text, "tease") || strings.Contains(text, "flirt") || strings.Contains(text, "sexy") || strings.Contains(text, "kiss"):
		return "mischievous"
	case strings.Contains(text, "thank") || strings.Contains(text, "glad") || strings.Contains(text, "happy") || strings.Contains(text, "love"):
		return "happy"
	case supportedLibbyEmotions[current]:
		return current
	default:
		return "neutral"
	}
}

func truncateChatError(body []byte) string {
	s := strings.TrimSpace(string(body))
	if len(s) > 300 {
		s = s[:300] + "…"
	}
	return s
}
