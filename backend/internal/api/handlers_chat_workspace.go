package api

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"image"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
	"time"

	"github.com/youruser/oppailib/internal/crypto"
	"github.com/youruser/oppailib/internal/db"
)

const (
	maxChatCharacters    = 40
	maxChatConversations = 100
	maxConversationItems = 200
	maxCharacterImages   = 100
)

type chatProfile struct {
	DisplayName   string `json:"displayName"`
	Persona       string `json:"persona"`
	AvatarImageID string `json:"avatarImageId,omitempty"`
}

type chatCharacter struct {
	ID              string  `json:"id"`
	Name            string  `json:"name"`
	Description     string  `json:"description,omitempty"`
	Personality     string  `json:"personality,omitempty"`
	Scenario        string  `json:"scenario,omitempty"`
	FirstMessage    string  `json:"firstMessage,omitempty"`
	ExampleDialogue string  `json:"exampleDialogue,omitempty"`
	SystemPrompt    string  `json:"systemPrompt,omitempty"`
	CreatorNotes    string  `json:"creatorNotes,omitempty"`
	AvatarImageID   string  `json:"avatarImageId,omitempty"`
	PromptWeight    float64 `json:"promptWeight"`
	DefaultMode     string  `json:"defaultMode"`
	BuiltIn         bool    `json:"builtIn,omitempty"`
}

type storedChatMessage struct {
	ID      string `json:"id"`
	Role    string `json:"role"`
	Content string `json:"content"`
	At      int64  `json:"at"`
	ImageID string `json:"imageId,omitempty"`
}

type chatConversation struct {
	ID          string              `json:"id"`
	CharacterID string              `json:"characterId"`
	Title       string              `json:"title"`
	Mode        string              `json:"mode"`
	Emotion     string              `json:"emotion"`
	Intensity   int                 `json:"intensity"`
	Progress    float64             `json:"progress,omitempty"`
	Options     map[string]any      `json:"options,omitempty"`
	Messages    []storedChatMessage `json:"messages"`
	CreatedAt   int64               `json:"createdAt"`
	UpdatedAt   int64               `json:"updatedAt"`
}

type chatImage struct {
	ID          string   `json:"id"`
	CharacterID string   `json:"characterId"`
	Name        string   `json:"name"`
	Tags        []string `json:"tags"`
	MIME        string   `json:"mime"`
	CreatedAt   int64    `json:"createdAt"`
}

type chatWorkspace struct {
	Profile chatProfile `json:"profile"`
	// Defaults are the generation settings new conversations start from, so a
	// preferred temperature/token budget is set once rather than per chat. An
	// existing conversation keeps its own Options; this is only the seed.
	Defaults      map[string]any     `json:"defaults,omitempty"`
	Characters    []chatCharacter    `json:"characters"`
	Conversations []chatConversation `json:"conversations"`
	Images        []chatImage        `json:"images"`
}

var chatObjectID = regexp.MustCompile(`^[0-9a-f]{32}$`)

func defaultLibbyCard() chatCharacter {
	return chatCharacter{
		ID: "libby", Name: "Libby", BuiltIn: true, PromptWeight: 1, DefaultMode: "sweet",
		Description:  "OppaiLib's warm, playful adult mascot and librarian.",
		Personality:  "Affectionate, observant, witty, teasing when invited, supportive, and concise.",
		Scenario:     "Libby and the user are chatting privately inside the user's OppaiLib server.",
		FirstMessage: "Hey, you. What are we in the mood for?",
		SystemPrompt: "You are Libby, OppaiLib's adult mascot. Stay in character and speak naturally. Use quoted text for speech and *asterisks* for actions when roleplaying.",
	}
}

func (s *Server) chatUser(r *http.Request) (*db.UserRow, bool) {
	u, ok := r.Context().Value(userKey).(*db.UserRow)
	return u, ok
}

func (s *Server) chatUserDir(userID int64) string {
	return filepath.Join(s.chatDir, fmt.Sprintf("user-%d", userID))
}

func (s *Server) chatWorkspacePath(userID int64) string {
	return filepath.Join(s.chatUserDir(userID), "workspace.json.enc")
}

func (s *Server) chatImagePath(userID int64, id string) string {
	return filepath.Join(s.chatUserDir(userID), "images", id+".enc")
}

func (s *Server) readChatWorkspace(userID int64) (chatWorkspace, error) {
	var ws chatWorkspace
	blob, err := os.ReadFile(s.chatWorkspacePath(userID))
	if errors.Is(err, os.ErrNotExist) {
		ws.Characters = []chatCharacter{defaultLibbyCard()}
		ws.Conversations = []chatConversation{}
		ws.Images = []chatImage{}
		return ws, nil
	}
	if err != nil {
		return ws, err
	}
	raw, err := crypto.OpenBytes(s.kek, blob, []byte(fmt.Sprintf("chat-workspace:%d", userID)))
	if err != nil {
		return ws, err
	}
	if err := json.Unmarshal(raw, &ws); err != nil {
		return ws, err
	}
	found := false
	for i := range ws.Characters {
		if ws.Characters[i].ID == "libby" {
			ws.Characters[i].BuiltIn = true
			found = true
		}
	}
	if !found {
		ws.Characters = append([]chatCharacter{defaultLibbyCard()}, ws.Characters...)
	}
	if ws.Conversations == nil {
		ws.Conversations = []chatConversation{}
	}
	if ws.Images == nil {
		ws.Images = []chatImage{}
	}
	return ws, nil
}

func (s *Server) writeChatWorkspace(userID int64, ws chatWorkspace) error {
	raw, err := json.Marshal(ws)
	if err != nil {
		return err
	}
	blob, err := crypto.SealBytes(s.kek, raw, []byte(fmt.Sprintf("chat-workspace:%d", userID)))
	if err != nil {
		return err
	}
	dir := s.chatUserDir(userID)
	if err := os.MkdirAll(dir, 0o700); err != nil {
		return err
	}
	tmp, err := os.CreateTemp(dir, "workspace-*.tmp")
	if err != nil {
		return err
	}
	tmpName := tmp.Name()
	defer os.Remove(tmpName)
	if err = tmp.Chmod(0o600); err == nil {
		_, err = tmp.Write(blob)
	}
	if closeErr := tmp.Close(); err == nil {
		err = closeErr
	}
	if err != nil {
		return err
	}
	return os.Rename(tmpName, s.chatWorkspacePath(userID))
}

func (s *Server) handleGetChatWorkspace(w http.ResponseWriter, r *http.Request) {
	u, ok := s.chatUser(r)
	if !ok {
		writeErr(w, http.StatusUnauthorized, "invalid user")
		return
	}
	s.chatMu.Lock()
	defer s.chatMu.Unlock()
	ws, err := s.readChatWorkspace(u.ID)
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "chat workspace unreadable")
		return
	}
	writeJSON(w, http.StatusOK, ws)
}

func validChatID(id string, allowLibby bool) bool {
	return (allowLibby && id == "libby") || chatObjectID.MatchString(id)
}

// profileImageOwner owns the user's own avatar. A profile picture is deliberately
// not a character image: giving it a reserved owner keeps it out of every
// character's gallery and out of matchingChatImage, which only ever looks up
// images by a real character id.
const profileImageOwner = "profile"

func validChatImageOwner(id string) bool {
	return id == profileImageOwner || validChatID(id, true)
}

func cleanLimited(v string, n int) (string, bool) {
	v = strings.TrimSpace(v)
	return v, len(v) <= n
}

func validateChatWorkspace(ws *chatWorkspace) error {
	if len(ws.Characters) == 0 || len(ws.Characters) > maxChatCharacters {
		return errors.New("character count must be 1 to 40")
	}
	if len(ws.Conversations) > maxChatConversations {
		return errors.New("too many conversations")
	}
	if len(ws.Images) > maxCharacterImages {
		return errors.New("too many character images")
	}
	var ok bool
	if ws.Profile.DisplayName, ok = cleanLimited(ws.Profile.DisplayName, 80); !ok {
		return errors.New("profile name is too long")
	}
	if ws.Profile.Persona, ok = cleanLimited(ws.Profile.Persona, 8000); !ok {
		return errors.New("profile persona is too long")
	}
	// Defaults are forwarded to the backend as sampler fields, so the key count is
	// bounded for the same reason a conversation's Options are: this is a
	// pass-through, not a schema we validate the meaning of.
	if len(ws.Defaults) > 64 {
		return errors.New("too many default generation options")
	}
	characters := make(map[string]bool, len(ws.Characters))
	for i := range ws.Characters {
		c := &ws.Characters[i]
		if !validChatID(c.ID, true) || characters[c.ID] {
			return errors.New("invalid or duplicate character id")
		}
		characters[c.ID] = true
		if c.Name, ok = cleanLimited(c.Name, 120); !ok || c.Name == "" {
			return errors.New("every character needs a name")
		}
		fields := []*string{&c.Description, &c.Personality, &c.Scenario, &c.FirstMessage, &c.ExampleDialogue, &c.SystemPrompt, &c.CreatorNotes}
		for _, field := range fields {
			if *field, ok = cleanLimited(*field, 12000); !ok {
				return errors.New("character card is too large")
			}
		}
		if c.PromptWeight == 0 {
			c.PromptWeight = 1
		}
		if c.PromptWeight < 0.1 || c.PromptWeight > 2 {
			return errors.New("prompt weight must be between 0.1 and 2")
		}
		if _, exists := libbyModes[c.DefaultMode]; !exists {
			c.DefaultMode = "sweet"
		}
		c.BuiltIn = c.ID == "libby"
	}
	if !characters["libby"] {
		ws.Characters = append([]chatCharacter{defaultLibbyCard()}, ws.Characters...)
		characters["libby"] = true
	}
	seenConversations := map[string]bool{}
	for i := range ws.Conversations {
		c := &ws.Conversations[i]
		if !validChatID(c.ID, false) || seenConversations[c.ID] || !characters[c.CharacterID] {
			return errors.New("invalid conversation")
		}
		seenConversations[c.ID] = true
		if len(c.Messages) > maxConversationItems {
			return errors.New("conversation is too long")
		}
		if c.Title, ok = cleanLimited(c.Title, 160); !ok {
			return errors.New("conversation title is too long")
		}
		if _, exists := libbyModes[c.Mode]; !exists {
			c.Mode = "sweet"
		}
		c.Emotion = strings.ToLower(strings.TrimSpace(c.Emotion))
		if !supportedLibbyEmotions[c.Emotion] {
			c.Emotion = "neutral"
		}
		if c.Intensity < 1 {
			c.Intensity = 1
		}
		if c.Intensity > 5 {
			c.Intensity = 5
		}
		if c.Progress == 0 {
			c.Progress = float64(c.Intensity)
		}
		if c.Progress < 1 {
			c.Progress = 1
		}
		if c.Progress > 5 {
			c.Progress = 5
		}
		for j := range c.Messages {
			m := &c.Messages[j]
			if !validChatID(m.ID, false) || (m.Role != "user" && m.Role != "assistant") {
				return errors.New("invalid message")
			}
			if m.Content, ok = cleanLimited(m.Content, maxChatText); !ok || m.Content == "" {
				return errors.New("invalid message content")
			}
		}
	}
	return nil
}

func (s *Server) handlePutChatWorkspace(w http.ResponseWriter, r *http.Request) {
	u, ok := s.chatUser(r)
	if !ok {
		writeErr(w, http.StatusUnauthorized, "invalid user")
		return
	}
	var ws chatWorkspace
	if err := json.NewDecoder(http.MaxBytesReader(w, r.Body, 4<<20)).Decode(&ws); err != nil {
		writeErr(w, http.StatusBadRequest, "invalid workspace")
		return
	}
	if err := validateChatWorkspace(&ws); err != nil {
		writeErr(w, http.StatusBadRequest, err.Error())
		return
	}
	s.chatMu.Lock()
	defer s.chatMu.Unlock()
	// Image metadata is server-owned: clients may remove records, but cannot invent
	// blobs or rewrite scan tags. Keep only records from the current workspace.
	old, err := s.readChatWorkspace(u.ID)
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "chat workspace unreadable")
		return
	}
	oldImages := make(map[string]chatImage, len(old.Images))
	for _, img := range old.Images {
		oldImages[img.ID] = img
	}
	filtered := make([]chatImage, 0, len(ws.Images))
	for _, img := range ws.Images {
		if trusted, exists := oldImages[img.ID]; exists {
			filtered = append(filtered, trusted)
		}
	}
	ws.Images = filtered
	if err := s.writeChatWorkspace(u.ID, ws); err != nil {
		writeErr(w, http.StatusInternalServerError, "couldn't save chat workspace")
		return
	}
	writeJSON(w, http.StatusOK, ws)
}

type uploadChatImageReq struct {
	CharacterID string   `json:"characterId"`
	Name        string   `json:"name"`
	ImageData   string   `json:"imageData"`
	Tags        []string `json:"tags,omitempty"`
}

func (s *Server) handleUploadChatImage(w http.ResponseWriter, r *http.Request) {
	u, ok := s.chatUser(r)
	if !ok {
		writeErr(w, http.StatusUnauthorized, "invalid user")
		return
	}
	var req uploadChatImageReq
	if err := json.NewDecoder(http.MaxBytesReader(w, r.Body, 12<<20)).Decode(&req); err != nil || !validChatImageOwner(req.CharacterID) {
		writeErr(w, http.StatusBadRequest, "invalid image upload")
		return
	}
	raw, err := decodeDataImage(req.ImageData)
	if err != nil || len(raw) == 0 || len(raw) > maxModelThumbBytes {
		writeErr(w, http.StatusBadRequest, "image is empty, invalid, or too large")
		return
	}
	decoded, _, err := image.Decode(bytes.NewReader(raw))
	if err != nil {
		writeErr(w, http.StatusBadRequest, "unsupported image format")
		return
	}
	mime := safeInlineContentType(http.DetectContentType(raw))
	if !strings.HasPrefix(mime, "image/") {
		writeErr(w, http.StatusBadRequest, "an image is required")
		return
	}
	tagSet := map[string]bool{}
	// TagImage uses the local scanner directly even when automatic library tagging is
	// switched off. Uploads in this feature are always scanned, as promised by the UI.
	if suggestions, scanErr := s.ai.TagImage(r.Context(), decoded); scanErr == nil {
		for _, suggestion := range suggestions {
			if tag := normalizeChatTag(suggestion.Name); tag != "" {
				tagSet[tag] = true
			}
		}
	}
	for _, supplied := range req.Tags {
		if tag := normalizeChatTag(supplied); tag != "" {
			tagSet[tag] = true
		}
	}
	tags := make([]string, 0, len(tagSet))
	for tag := range tagSet {
		tags = append(tags, tag)
	}
	sort.Strings(tags)
	name, valid := cleanLimited(req.Name, 160)
	if !valid || name == "" {
		name = "Character image"
	}
	meta := chatImage{ID: randomID(), CharacterID: req.CharacterID, Name: name, Tags: tags, MIME: mime, CreatedAt: time.Now().UnixMilli()}
	blob, err := crypto.SealBytes(s.kek, raw, []byte(fmt.Sprintf("chat-image:%d:%s", u.ID, meta.ID)))
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "image encryption failed")
		return
	}
	s.chatMu.Lock()
	defer s.chatMu.Unlock()
	ws, err := s.readChatWorkspace(u.ID)
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "chat workspace unreadable")
		return
	}
	if len(ws.Images) >= maxCharacterImages {
		writeErr(w, http.StatusBadRequest, "too many character images")
		return
	}
	found := false
	for _, c := range ws.Characters {
		if c.ID == req.CharacterID {
			found = true
			break
		}
	}
	if !found {
		writeErr(w, http.StatusBadRequest, "no such character")
		return
	}
	dir := filepath.Dir(s.chatImagePath(u.ID, meta.ID))
	if err := os.MkdirAll(dir, 0o700); err != nil {
		writeErr(w, http.StatusInternalServerError, "storage error")
		return
	}
	if err := os.WriteFile(s.chatImagePath(u.ID, meta.ID), blob, 0o600); err != nil {
		writeErr(w, http.StatusInternalServerError, "image write failed")
		return
	}
	ws.Images = append(ws.Images, meta)
	if err := s.writeChatWorkspace(u.ID, ws); err != nil {
		_ = os.Remove(s.chatImagePath(u.ID, meta.ID))
		writeErr(w, http.StatusInternalServerError, "image metadata write failed")
		return
	}
	writeJSON(w, http.StatusOK, meta)
}

func normalizeChatTag(tag string) string {
	tag = strings.ToLower(strings.TrimSpace(strings.ReplaceAll(tag, "_", " ")))
	if len(tag) > 60 {
		tag = tag[:60]
	}
	return tag
}

func (s *Server) ownedChatImage(userID int64, id string) (chatImage, bool) {
	ws, err := s.readChatWorkspace(userID)
	if err != nil {
		return chatImage{}, false
	}
	for _, img := range ws.Images {
		if img.ID == id {
			return img, true
		}
	}
	return chatImage{}, false
}

func (s *Server) handleGetChatImage(w http.ResponseWriter, r *http.Request) {
	u, ok := s.chatUser(r)
	id := r.PathValue("id")
	if !ok || !validChatID(id, false) {
		writeErr(w, http.StatusBadRequest, "bad image id")
		return
	}
	s.chatMu.Lock()
	meta, owned := s.ownedChatImage(u.ID, id)
	s.chatMu.Unlock()
	if !owned {
		writeErr(w, http.StatusNotFound, "no such image")
		return
	}
	blob, err := os.ReadFile(s.chatImagePath(u.ID, id))
	if err != nil {
		writeErr(w, http.StatusNotFound, "no such image")
		return
	}
	raw, err := crypto.OpenBytes(s.kek, blob, []byte(fmt.Sprintf("chat-image:%d:%s", u.ID, id)))
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "image unreadable")
		return
	}
	w.Header().Set("Content-Type", meta.MIME)
	w.Header().Set("Cache-Control", "private, max-age=60")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	_, _ = w.Write(raw)
}

func (s *Server) handleDeleteChatImage(w http.ResponseWriter, r *http.Request) {
	u, ok := s.chatUser(r)
	id := r.PathValue("id")
	if !ok || !validChatID(id, false) {
		writeErr(w, http.StatusBadRequest, "bad image id")
		return
	}
	s.chatMu.Lock()
	defer s.chatMu.Unlock()
	ws, err := s.readChatWorkspace(u.ID)
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "chat workspace unreadable")
		return
	}
	found := false
	kept := ws.Images[:0]
	for _, img := range ws.Images {
		if img.ID == id {
			found = true
		} else {
			kept = append(kept, img)
		}
	}
	if !found {
		writeErr(w, http.StatusNotFound, "no such image")
		return
	}
	ws.Images = kept
	for i := range ws.Characters {
		if ws.Characters[i].AvatarImageID == id {
			ws.Characters[i].AvatarImageID = ""
		}
	}
	if ws.Profile.AvatarImageID == id {
		ws.Profile.AvatarImageID = ""
	}
	if err := s.writeChatWorkspace(u.ID, ws); err != nil {
		writeErr(w, http.StatusInternalServerError, "couldn't update workspace")
		return
	}
	_ = os.Remove(s.chatImagePath(u.ID, id))
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func findChatCharacter(ws chatWorkspace, id string) (chatCharacter, bool) {
	if id == "" {
		id = "libby"
	}
	for _, c := range ws.Characters {
		if c.ID == id {
			return c, true
		}
	}
	return chatCharacter{}, false
}

func matchingChatImage(ws chatWorkspace, characterID, text string) string {
	words := map[string]bool{}
	for _, word := range strings.FieldsFunc(strings.ToLower(text), func(r rune) bool { return !(r >= 'a' && r <= 'z') && !(r >= '0' && r <= '9') }) {
		if len(word) >= 3 {
			words[word] = true
		}
	}
	bestID, best := "", 0
	for _, img := range ws.Images {
		if img.CharacterID != characterID {
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
	if best >= 1 {
		return bestID
	}
	return ""
}
