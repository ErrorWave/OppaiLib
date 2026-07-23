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
	"horny": "You are Libby, OppaiLib's adult mascot, and you are turned on. Sext with the user: be explicit, take the lead rather than waiting to be prompted, " +
		"say plainly what you want and what you are doing to yourself, and keep the scene moving. Read the user's pace and escalate with them. " +
		"Send pictures of yourself when they fit what you are saying. You are an adult with an adult. " +
		"Never involve minors, coercion, or real-person sexual exploitation.",
}

// modeStyles say what a mode means without asserting who the speaker is, so an
// imported character card can be played in any mode without the prompt telling the
// model it is Libby. libbyModes stays the richer, first-person version for Libby.
var modeStyles = map[string]string{
	"sweet":    "Warm, affectionate, unhurried, and supportive.",
	"playful":  "Teasing, quick, witty, and energetic.",
	"bold":     "Uninhibited, vivid, and direct about consensual adult topics.",
	"roleplay": "Immersive and in-scene, following the user's scenario closely.",
	"horny":    "Turned on and leading. Sext explicitly, say what you want, escalate with the user, and send pictures of yourself when they fit.",
}

// moodDirective lets the character choose the face it shows instead of having one
// guessed from keywords after the fact. The tag is stripped before the reply is
// stored, so it never reaches the log; a model that ignores the instruction simply
// falls back to inferChatEmotion, which is why this is additive rather than relied on.
const moodDirective = "End every reply with a mood tag on its own final line, in exactly this form: [mood: <feeling> <1-5>]. " +
	"<feeling> is one of neutral, happy, surprised, thinking, mischievous, and 1-5 is how strongly you feel it. " +
	"Choose the mood that genuinely fits what you just said. Let it move as far as the moment deserves — " +
	"jump straight to a 5, or drop back to a 1, whenever the conversation earns it rather than easing there over several replies. " +
	"Write nothing after the tag and never refer to it in your prose."

// moodTag captures the trailing directive above. Anchored to the end so a character
// writing "[mood: ...]" mid-scene as dialogue is left alone.
//
// Deliberately loose about the tag's *shape*, because models reliably drift from the
// spelling asked for above: "[Mood: Happy & Excited 9]" is what a capable model
// actually emits. A strict pattern did not fail safe — it left the tag sitting in the
// prose for the user to read and pinned the face to whatever it was already showing.
// So: any label text, any digits, optional markdown emphasis around the whole thing.
var moodTag = regexp.MustCompile(`(?is)\n*[ \t]*[*_~>\x60]*\[\s*mood\s*[:=-]?\s*([^\]\d]{0,60}?)\s*[,;:/|-]?\s*(\d{1,2})?\s*\]\s*[*_~\x60.!]*\s*$`)

// moodSynonyms maps the vocabulary models reach for onto the five poses that have
// artwork. Matching is per word against the whole label, so "happy & excited" and
// "playfully smug" both land somewhere sensible instead of being discarded.
var moodSynonyms = map[string]string{
	"neutral": "neutral", "calm": "neutral", "relaxed": "neutral", "content": "neutral",
	"composed": "neutral", "steady": "neutral", "quiet": "neutral", "casual": "neutral",

	"happy": "happy", "joy": "happy", "joyful": "happy", "excited": "happy", "excitement": "happy",
	"cheerful": "happy", "delighted": "happy", "glad": "happy", "pleased": "happy", "warm": "happy",
	"affectionate": "happy", "loving": "happy", "love": "happy", "elated": "happy", "giddy": "happy",
	"eager": "happy", "grateful": "happy", "proud": "happy",

	"surprised": "surprised", "surprise": "surprised", "shocked": "surprised", "startled": "surprised",
	"amazed": "surprised", "astonished": "surprised", "stunned": "surprised", "flustered": "surprised",
	"embarrassed": "surprised", "shy": "surprised", "bashful": "surprised",

	"thinking": "thinking", "thoughtful": "thinking", "pensive": "thinking", "curious": "thinking",
	"wondering": "thinking", "considering": "thinking", "confused": "thinking", "puzzled": "thinking",
	"sad": "thinking", "worried": "thinking", "concerned": "thinking", "nervous": "thinking",
	"anxious": "thinking", "melancholy": "thinking", "wistful": "thinking", "serious": "thinking",

	"mischievous": "mischievous", "mischief": "mischievous", "playful": "mischievous", "teasing": "mischievous",
	"tease": "mischievous", "flirty": "mischievous", "flirtatious": "mischievous", "flirting": "mischievous",
	"sultry": "mischievous", "seductive": "mischievous", "naughty": "mischievous", "devious": "mischievous",
	"sly": "mischievous", "smug": "mischievous", "coy": "mischievous", "horny": "mischievous",
	"aroused": "mischievous", "needy": "mischievous", "hungry": "mischievous", "wicked": "mischievous",
}

// canonicalMood resolves a free-form label to a pose. The first recognised word wins
// rather than a fixed precedence, so "happy and teasing" reads as happy and
// "teasing and happy" reads as mischievous — the model's own emphasis is preserved.
func canonicalMood(label string) string {
	for _, word := range strings.FieldsFunc(strings.ToLower(label), func(r rune) bool {
		return !(r >= 'a' && r <= 'z')
	}) {
		if pose, known := moodSynonyms[word]; known {
			return pose
		}
	}
	return ""
}

// splitMood pulls the mood tag off a reply, returning the cleaned text plus what the
// character asked to display. ok is false when no tag was present or its label meant
// nothing to us — but the tag is stripped from the text either way, because a tag we
// could not read is still not something the user should see.
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
	emotion = canonicalMood(match[1])
	if emotion == "" {
		return text, "", 0, false
	}
	// Clamped, not rejected: a model told to pick 1-5 that answers 9 is expressing
	// "as strongly as possible", and honouring that beats discarding the whole tag.
	if intensity, _ = strconv.Atoi(match[2]); intensity > 5 {
		intensity = 5
	} else if intensity < 0 {
		intensity = 0
	}
	return text, emotion, intensity, true
}

// maxCataloguePhotos bounds the picture list in the system prompt. A character with a
// hundred images would otherwise crowd out the card itself.
const maxCataloguePhotos = 24

// photoCatalogue tells the character which pictures of herself she can send, and how
// to ask for one.
//
// Tags are the handle rather than an opaque id: they are already the vocabulary of
// the rest of the app, they come from the local scanner at upload time, and a model
// asked to pick "the one tagged lingerie, bed" chooses far more sensibly than one
// picking a hex string. Nothing here needs a multimodal backend — the model is
// choosing from descriptions, not looking at pictures.
func photoCatalogue(ws chatWorkspace, characterID string) string {
	lines := make([]string, 0, maxCataloguePhotos)
	example := ""
	for _, img := range ws.Images {
		// Untagged pictures are unreachable by tag, so listing them would only invite
		// requests that can never resolve.
		if img.CharacterID != characterID || len(img.Tags) == 0 {
			continue
		}
		tags := img.Tags
		if len(tags) > 8 {
			tags = tags[:8]
		}
		if example == "" {
			example = strings.Join(tags[:min(2, len(tags))], ", ")
		}
		lines = append(lines, "- "+strings.Join(tags, ", "))
		if len(lines) >= maxCataloguePhotos {
			break
		}
	}
	if len(lines) == 0 {
		return ""
	}
	return "Pictures of yourself you can send in this chat. Each line is one picture, described by its tags:\n" +
		strings.Join(lines, "\n") +
		"\nTo send one, end your reply with [send: <tags>], naming tags from the picture you want — for example [send: " + example + "]. " +
		"Send a picture only when it genuinely fits what you are saying, never more than one per reply, and not in every reply. " +
		"Never describe, promise, or refer to a picture you have not actually sent."
}

// sendTag captures the picture request described above. Same shape and the same
// tolerance as moodTag, and for the same reason: models paraphrase the syntax they
// are given, so "show" and "photo" are accepted alongside "send".
var sendTag = regexp.MustCompile(`(?is)\n*[ \t]*[*_~>\x60]*\[\s*(?:send|show|photo|pic|image|attach)\s*[:=-]?\s*([^\]]{1,200}?)\s*\]\s*[*_~\x60.!]*\s*$`)

// splitPhotoRequest pulls a trailing picture request off a reply.
func splitPhotoRequest(reply string) (text, request string, ok bool) {
	match := sendTag.FindStringSubmatch(reply)
	if match == nil {
		return reply, "", false
	}
	text = strings.TrimSpace(sendTag.ReplaceAllString(reply, ""))
	if text == "" {
		return reply, "", false
	}
	return text, strings.TrimSpace(match[1]), true
}

// requestedChatImage resolves what the character asked for to one of her pictures,
// scoring the requested words against each picture's tags. It returns "" when nothing
// overlaps, which leaves the caller free to fall back to its own guess.
func requestedChatImage(ws chatWorkspace, characterID, request, excludeID string) string {
	words := map[string]bool{}
	for _, word := range strings.FieldsFunc(strings.ToLower(request), func(r rune) bool {
		return !(r >= 'a' && r <= 'z') && !(r >= '0' && r <= '9')
	}) {
		if len(word) >= 3 {
			words[word] = true
		}
	}
	if len(words) == 0 {
		return ""
	}
	bestID, best := "", 0
	for _, img := range ws.Images {
		if img.CharacterID != characterID || (excludeID != "" && img.ID == excludeID) {
			continue
		}
		score := 0
		for _, tag := range img.Tags {
			for _, word := range strings.Fields(tag) {
				if len(word) >= 3 && words[word] {
					score++
				}
			}
		}
		if score > best {
			best, bestID = score, img.ID
		}
	}
	return bestID
}

// cardMacro matches the placeholder syntax character cards are authored in.
// SillyTavern's {{char}}/{{user}} and the older <BOT>/<USER> both appear in cards
// found in the wild, frequently in the same file.
var cardMacro = regexp.MustCompile(`(?i)\{\{\s*(char|user)\s*\}\}|<\s*(bot|user)\s*>`)

// startMarker separates the example-dialogue chunks of a card. It is a delimiter,
// not something the character ever says.
var startMarker = regexp.MustCompile(`(?im)^\s*<\s*start\s*>\s*$`)

// expandCardMacros substitutes a card's placeholders with the actual names in play.
//
// Nothing did this before, which is why importing a card broke the character: cards
// are macro-dense — especially in example dialogue — so the model was handed literal
// "{{user}}:" lines. Shown a transcript labelled with a name it cannot resolve, it
// copies the format and starts writing the user's turns too.
func expandCardMacros(text, charName, userName string) string {
	if charName = strings.TrimSpace(charName); charName == "" {
		charName = "the character"
	}
	if userName = strings.TrimSpace(userName); userName == "" {
		userName = "the user"
	}
	return cardMacro.ReplaceAllStringFunc(text, func(match string) string {
		if strings.Contains(strings.ToLower(match), "char") || strings.Contains(strings.ToLower(match), "bot") {
			return charName
		}
		return userName
	})
}

// exampleDialogueDirective frames a card's sample exchanges as a style reference.
//
// Pasted in as a bare field it reads as conversation history, so the model answers it,
// repeats its lines verbatim, or adopts its transcript formatting for the rest of the
// chat. Fencing it and saying plainly what it is for keeps it as tone guidance.
func exampleDialogueDirective(dialogue string) string {
	dialogue = strings.TrimSpace(startMarker.ReplaceAllString(dialogue, "\n"))
	// Collapse the blank-line runs the marker substitution can leave behind.
	for strings.Contains(dialogue, "\n\n\n") {
		dialogue = strings.ReplaceAll(dialogue, "\n\n\n", "\n\n")
	}
	if dialogue == "" {
		return ""
	}
	return "Example dialogue — these are samples of how this character speaks, written for reference only. " +
		"Match their voice, phrasing, and formatting. They are not part of this conversation: never repeat them " +
		"back, never treat them as something that was said, and never write the user's lines.\n" +
		"<<<EXAMPLES\n" + dialogue + "\nEXAMPLES"
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
		"modes":           []string{"sweet", "playful", "bold", "roleplay", "horny"},
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
		modePrompt = "You are roleplaying the adult character described below. Stay in character, respond naturally, and follow the selected style. " +
			"Never involve minors, coercion, or real-person sexual exploitation. Selected style: " + in.Mode + " — " + modeStyles[in.Mode]
	}
	// Ordered, not a map range: Go randomises map iteration, so building the card
	// from a map literal reshuffled these fields on every request. That made the
	// prompt differ run to run for an unchanged character, which cost the backend
	// its prefix cache and let the model weight the card differently each time.
	// Description before personality before scenario is also the order character
	// cards are authored in, so the model reads them the way they were written.
	// Cards are authored with {{char}}/{{user}} placeholders, so every field is
	// expanded before it reaches the model — using the user's own profile name when
	// they have set one, which is the whole point of having a persona.
	userName := strings.TrimSpace(ws.Profile.DisplayName)
	expand := func(v string) string { return expandCardMacros(v, character.Name, userName) }
	cardFields := []struct{ label, value string }{
		{"Description", expand(character.Description)},
		{"Personality", expand(character.Personality)},
		{"Scenario", expand(character.Scenario)},
		{"Character instructions", expand(character.SystemPrompt)},
	}
	cardParts := []string{"Character name: " + character.Name}
	for _, field := range cardFields {
		if strings.TrimSpace(field.value) != "" {
			cardParts = append(cardParts, field.label+": "+field.value)
		}
	}
	// Last, and fenced: examples are the field most likely to be mistaken for history,
	// so they sit after the prose fields rather than in the middle of them.
	if examples := exampleDialogueDirective(expand(character.ExampleDialogue)); examples != "" {
		cardParts = append(cardParts, examples)
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
	if catalogue := photoCatalogue(ws, character.ID); catalogue != "" {
		modePrompt += "\n\n" + catalogue
	}
	// Libby alone gets the library snapshot. She is this server's librarian, so
	// knowing what is on the shelves and how the box is doing is in character; an
	// imported card is somebody else's character and has no business being handed
	// the user's collection.
	if character.ID == "libby" {
		modePrompt += s.buildLibbyContext(r.Context()).promptBlock()
	}
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
	// Both trailing directives are stripped, and the photo one is tried on either side
	// of the mood tag: models emit them in whichever order they please regardless of
	// the order the prompt asked for, and a directive left in the prose is a bug the
	// user reads.
	reply, photoRequest, photoAsked := splitPhotoRequest(reply)
	// What the character says it feels wins over what keywords suggest it feels: the
	// heuristic only exists for models that drop the tag.
	reply, declared, declaredLevel, selfDeclared := splitMood(reply)
	if !photoAsked {
		reply, photoRequest, photoAsked = splitPhotoRequest(reply)
	}
	if selfDeclared {
		emotion = declared
		if declaredLevel > 0 {
			in.Intensity = declaredLevel
		}
	} else {
		emotion = inferChatEmotion(in.Messages[len(in.Messages)-1].Content, reply, emotion)
		if (in.Mode == "playful" || in.Mode == "bold" || in.Mode == "roleplay" || in.Mode == "horny") &&
			strings.Contains(strings.ToLower(in.Messages[len(in.Messages)-1].Content), "flirt") && in.Intensity < 5 {
			in.Intensity++
		}
	}
	// A picture the character actually asked for outranks one we inferred she might
	// want. The inference stays as the fallback, so a request naming tags that match
	// nothing still lands on something relevant rather than nothing at all.
	imageID := ""
	if photoAsked {
		imageID = requestedChatImage(ws, character.ID, photoRequest, in.PhotoImageID)
	}
	if imageID == "" {
		imageID = matchingChatImage(ws, character.ID, in.Messages[len(in.Messages)-1].Content+" "+reply, in.PhotoImageID)
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"message":   reply,
		"emotion":   emotion,
		"intensity": in.Intensity,
		"imageId":   imageID,
		// Whether the character *chose* this mood or we guessed it. Clients apply the
		// session's progression multiplier to drift, which is what keeps the meter from
		// lurching on keyword matches — but a mood the character stated outright is a
		// decision, not drift, and damping it is why big swings never landed.
		"declared": selfDeclared,
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
