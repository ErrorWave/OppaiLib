package api

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"time"
)

const (
	maxChatMessages = 80
	maxChatText     = 32 << 10
	// Enough to characterise a picture without letting a pathological tagger run
	// flood the system prompt and crowd out the character card.
	maxPhotoTags = 24
)

type chatMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type chatRequest struct {
	Mode        string        `json:"mode"`
	Messages    []chatMessage `json:"messages"`
	CharacterID string        `json:"characterId,omitempty"`
	Emotion     string        `json:"emotion,omitempty"`
	Intensity   int           `json:"intensity,omitempty"`
	// PhotoTags describes a picture the user attached to their latest message. The
	// tags come from the local tagger, not from the model: nothing here requires a
	// multimodal backend, so a text-only model can still react to what was shared.
	PhotoTags []string `json:"photoTags,omitempty"`
	// PhotoImageID is that picture's id, so the reply-attachment picker can skip it.
	PhotoImageID string `json:"photoImageId,omitempty"`
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

// moodDirective lets the character choose the face it shows instead of having one
// guessed from keywords after the fact. The tag is stripped before the reply is
// stored, so it never reaches the log; a model that ignores the instruction simply
// falls back to inferChatEmotion, which is why this is additive rather than relied on.
const moodDirective = "End every reply with a mood tag on its own final line, in exactly this form: [mood: <feeling> <1-5>]. " +
	"<feeling> is one of neutral, happy, surprised, thinking, mischievous, and 1-5 is how strongly you feel it. " +
	"Choose the mood that genuinely fits what you just said and let it shift over the conversation. " +
	"Write nothing after the tag and never refer to it in your prose."

// moodTag captures the trailing directive above. Anchored to the end so a character
// writing "[mood: ...]" mid-scene as dialogue is left alone.
var moodTag = regexp.MustCompile(`(?is)\n*\s*\[\s*mood\s*:\s*([a-z]+)\s*([1-5])?\s*\]\s*$`)

// splitMood pulls the mood tag off a reply, returning the cleaned text plus what the
// character asked to display. ok is false when no tag was present.
func splitMood(reply string) (text, emotion string, intensity int, ok bool) {
	match := moodTag.FindStringSubmatch(reply)
	if match == nil {
		return reply, "", 0, false
	}
	text = strings.TrimSpace(moodTag.ReplaceAllString(reply, ""))
	// A reply that is *only* a mood tag is not a reply; keep the original so the
	// caller's "no message" check reports the real problem.
	if text == "" {
		return reply, "", 0, false
	}
	emotion = strings.ToLower(match[1])
	if !supportedLibbyEmotions[emotion] {
		return text, "", 0, false
	}
	intensity, _ = strconv.Atoi(match[2])
	return text, emotion, intensity, true
}

// photoDirective describes a picture the user attached, using the local tagger's
// output. Tags are the vocabulary of the rest of the app, but they read as metadata
// rather than as something seen, so the model is told to answer as a viewer.
func photoDirective(tags []string) string {
	cleaned := make([]string, 0, len(tags))
	seen := map[string]bool{}
	for _, tag := range tags {
		tag = strings.TrimSpace(tag)
		if tag == "" || seen[strings.ToLower(tag)] || len(cleaned) >= maxPhotoTags {
			continue
		}
		seen[strings.ToLower(tag)] = true
		cleaned = append(cleaned, tag)
	}
	if len(cleaned) == 0 {
		return "The user just shared a photo with you. Respond to it warmly even though you cannot make out its details."
	}
	return "The user just shared a photo with you. It was scanned locally and contains: " + strings.Join(cleaned, ", ") + ". " +
		"React as though you are looking at the picture — describe what stands out and respond in character. " +
		"Never mention tags, scanning, or that you were given a list."
}

func (s *Server) handleChatStatus(w http.ResponseWriter, r *http.Request) {
	cur := s.settings.Get()
	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	probe := s.probeChatBackend(ctx)
	// Probed rather than assumed: only text-generation-webui exposes the internal
	// endpoints, and offering load/unload against a backend that lacks them would
	// surface controls that can only ever fail.
	controllable := cur.ChatURL != "" && s.chatBackendControllable(ctx)
	cancel()
	model := probe.Loaded
	if model == "" {
		model = cur.ChatModel
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"enabled":         probe.Ready,
		"configured":      cur.ChatURL != "",
		"model":           model,
		"message":         probe.Detail,
		"modes":           []string{"sweet", "playful", "bold", "roleplay"},
		"advancedOptions": probe.Ready,
		"modelBackend":    cur.ChatURL != "",
		"modelManagement": controllable,
	})
}

func (s *Server) handleChat(w http.ResponseWriter, r *http.Request) {
	cur := s.settings.Get()
	if cur.ChatURL == "" {
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
	var ws chatWorkspace
	var character chatCharacter
	if u, userOK := s.chatUser(r); userOK {
		s.chatMu.Lock()
		ws, _ = s.readChatWorkspace(u.ID)
		s.chatMu.Unlock()
		if selected, found := findChatCharacter(ws, in.CharacterID); found {
			character = selected
		}
	}
	if character.ID == "" {
		character = defaultLibbyCard()
	}
	if character.ID != "libby" {
		modePrompt = "You are roleplaying the adult character described below. Stay in character, respond naturally, and follow the selected style. Never involve minors, coercion, or real-person sexual exploitation. Selected style: " + in.Mode + "."
	}
	// Ordered, not a map range: Go randomises map iteration, so building the card
	// from a map literal reshuffled these fields on every request. That made the
	// prompt differ run to run for an unchanged character, which cost the backend
	// its prefix cache and let the model weight the card differently each time.
	// Description before personality before scenario is also the order character
	// cards are authored in, so the model reads them the way they were written.
	cardFields := []struct{ label, value string }{
		{"Description", character.Description},
		{"Personality", character.Personality},
		{"Scenario", character.Scenario},
		{"Example dialogue", character.ExampleDialogue},
		{"Character instructions", character.SystemPrompt},
	}
	cardParts := []string{"Character name: " + character.Name}
	for _, field := range cardFields {
		if strings.TrimSpace(field.value) != "" {
			cardParts = append(cardParts, field.label+": "+field.value)
		}
	}
	modePrompt += "\n\n" + strings.Join(cardParts, "\n")
	if ws.Profile.DisplayName != "" || ws.Profile.Persona != "" {
		modePrompt += fmt.Sprintf("\nUser profile name: %s\nUser persona: %s", ws.Profile.DisplayName, ws.Profile.Persona)
	}
	// A card stored before PromptWeight existed unmarshals to 0, and telling the
	// model to treat the card's strength as 0.00 reads as "ignore everything above".
	// Absent means unset, not "disabled".
	weight := character.PromptWeight
	if weight <= 0 {
		weight = 1
	}
	modePrompt += fmt.Sprintf("\nTreat the character-card prompt strength as %.2f. Your current displayed emotion is %s at intensity %d of 5; let that subtly color your wording without announcing the setting.", weight, emotion, in.Intensity)
	modePrompt += "\n\n" + moodDirective
	if len(in.PhotoTags) > 0 {
		modePrompt += "\n\n" + photoDirective(in.PhotoTags)
	}
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

	probeCtx, probeCancel := context.WithTimeout(r.Context(), 5*time.Second)
	probe := s.probeChatBackend(probeCtx)
	probeCancel()
	if !probe.Ready {
		writeErr(w, http.StatusServiceUnavailable, probe.Detail)
		return
	}
	model := probe.Loaded
	if model == "" {
		model = cur.ChatModel
	}
	payloadMap := map[string]any{"messages": messages, "stream": false}
	if model != "" {
		payloadMap["model"] = model
	}
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
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, chatBackendBase(cur.ChatURL)+"/v1/chat/completions", bytes.NewReader(payload))
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
	// What the character says it feels wins over what keywords suggest it feels: the
	// heuristic only exists for models that drop the tag.
	reply, declared, declaredLevel, selfDeclared := splitMood(reply)
	if selfDeclared {
		emotion = declared
		if declaredLevel > 0 {
			in.Intensity = declaredLevel
		}
	} else {
		emotion = inferChatEmotion(in.Messages[len(in.Messages)-1].Content, reply, emotion)
		if (in.Mode == "playful" || in.Mode == "bold" || in.Mode == "roleplay") &&
			strings.Contains(strings.ToLower(in.Messages[len(in.Messages)-1].Content), "flirt") && in.Intensity < 5 {
			in.Intensity++
		}
	}
	imageID := matchingChatImage(ws, character.ID, in.Messages[len(in.Messages)-1].Content+" "+reply, in.PhotoImageID)
	writeJSON(w, http.StatusOK, map[string]any{
		"message":   reply,
		"emotion":   emotion,
		"intensity": in.Intensity,
		"imageId":   imageID,
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
