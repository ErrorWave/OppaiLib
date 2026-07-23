package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/youruser/oppailib/internal/crypto"
)

// Libby's memory — the one thing she carries between conversations.
//
// Everything else about a chat is client-owned: the workspace round-trips through the
// browser and the phone, and the server keeps no per-conversation state. Memory is the
// exception, and it is deliberately server-authoritative. It is written from her own
// replies (a [remember: …] tag the model emits and the user never sees), so it must not
// be forgeable or erasable by a client that simply omits a field — the trust model of
// server-owned image metadata, not of the workspace. It lives in its own encrypted file
// per user, and only three things touch it: capture on the chat path, injection back
// into the next prompt, and the settings screen that lists and clears it.
//
// It is Libby's alone. Imported character cards are somebody else's character and stay
// stateless, the same way the self-directive, the library snapshot, and actions are all
// Libby-only.

const (
	// maxLibbyMemories bounds the store. Enough to hold a real picture of someone —
	// their name, what they like, boundaries, running jokes — without the block ever
	// crowding the character card out of the prompt. Past this the oldest fall away.
	maxLibbyMemories = 60
	// maxMemoryLen bounds one memory. A memory is a fact, not a paragraph; a model that
	// tries to store an essay is truncated to the part that fits.
	maxMemoryLen = 280
)

// libbyMemory is one durable fact she has kept about the user.
type libbyMemory struct {
	ID   string `json:"id"`
	Text string `json:"text"`
	At   int64  `json:"at"`
}

// libbyMemoryStore is the whole file: a flat list, oldest first.
type libbyMemoryStore struct {
	Memories []libbyMemory `json:"memories"`
}

func (s *Server) libbyMemoryPath(userID int64) string {
	return filepath.Join(s.chatUserDir(userID), "libby-memory.json.enc")
}

func libbyMemoryAAD(userID int64) []byte {
	return []byte(fmt.Sprintf("libby-memory:%d", userID))
}

// readLibbyMemory loads the store, treating an absent file as an empty one — a user who
// has never been remembered to has no file, and that is not an error.
func (s *Server) readLibbyMemory(userID int64) (libbyMemoryStore, error) {
	var store libbyMemoryStore
	blob, err := os.ReadFile(s.libbyMemoryPath(userID))
	if errors.Is(err, os.ErrNotExist) {
		store.Memories = []libbyMemory{}
		return store, nil
	}
	if err != nil {
		return store, err
	}
	raw, err := crypto.OpenBytes(s.kek, blob, libbyMemoryAAD(userID))
	if err != nil {
		return store, err
	}
	if err := json.Unmarshal(raw, &store); err != nil {
		return store, err
	}
	if store.Memories == nil {
		store.Memories = []libbyMemory{}
	}
	return store, nil
}

// writeLibbyMemory persists the store atomically, mirroring writeChatWorkspace: a
// partial write must never replace a good file, so it lands on a temp file and renames.
func (s *Server) writeLibbyMemory(userID int64, store libbyMemoryStore) error {
	if store.Memories == nil {
		store.Memories = []libbyMemory{}
	}
	raw, err := json.Marshal(store)
	if err != nil {
		return err
	}
	blob, err := crypto.SealBytes(s.kek, raw, libbyMemoryAAD(userID))
	if err != nil {
		return err
	}
	dir := s.chatUserDir(userID)
	if err := os.MkdirAll(dir, 0o700); err != nil {
		return err
	}
	tmp, err := os.CreateTemp(dir, "libby-memory-*.tmp")
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
	return os.Rename(tmpName, s.libbyMemoryPath(userID))
}

// appendLibbyMemories adds new facts to the store, skipping ones it already holds and
// dropping the oldest once the cap is passed. Returns whether anything actually changed,
// so the caller can avoid a disk write for a reply that only repeated what she knew.
//
// Dedup is by normalized text: a model reminded of a fact will happily re-emit it, and
// storing "they like horror" twice buys nothing but noise in the prompt.
func (s *Server) appendLibbyMemories(userID int64, facts []string) (bool, error) {
	if len(facts) == 0 {
		return false, nil
	}
	store, err := s.readLibbyMemory(userID)
	if err != nil {
		return false, err
	}
	have := make(map[string]bool, len(store.Memories))
	for _, m := range store.Memories {
		have[strings.ToLower(strings.TrimSpace(m.Text))] = true
	}
	changed := false
	for _, fact := range facts {
		fact = strings.TrimSpace(fact)
		if len(fact) > maxMemoryLen {
			fact = strings.TrimSpace(fact[:maxMemoryLen])
		}
		key := strings.ToLower(fact)
		if fact == "" || have[key] {
			continue
		}
		have[key] = true
		store.Memories = append(store.Memories, libbyMemory{ID: randomID(), Text: fact, At: time.Now().UnixMilli()})
		changed = true
	}
	if !changed {
		return false, nil
	}
	if len(store.Memories) > maxLibbyMemories {
		store.Memories = store.Memories[len(store.Memories)-maxLibbyMemories:]
	}
	return true, s.writeLibbyMemory(userID, store)
}

// memoryDirective tells her to keep durable facts about the user.
//
// Framed as noticing rather than filing: a model told to "save data" writes a summary
// at the end of every reply, which is exactly the machinery-narration the scrubber
// exists to stop. What is wanted is the human thing — quietly holding on to what matters
// about someone — so the instruction is about worth and durability, and the tag is only
// the plumbing that makes it stick.
const memoryDirective = "You remember the people you talk to. When you learn something about them that is worth carrying into later " +
	"conversations — their name, what they are into, what they cannot stand, a boundary, something that happened to them, a running joke — " +
	"quietly keep it by ending your reply with [remember: <the fact, in your own words as a lasting note>]. " +
	"Keep only what genuinely matters and would still be true next time; not small talk, not what they just said this second. " +
	"At most one or two per reply, and most replies need none. This is silent — never tell them you are saving something and never mention the tag."

// memoryPromptBlock renders what she already knows into the system prompt.
//
// Presented as things she simply knows, not as a database dump, for the same reason the
// library snapshot is: handed a labelled list a model recites it back. She should use
// these the way a friend uses what they remember — it colours what she says, it is not
// something she reads aloud.
func memoryPromptBlock(store libbyMemoryStore) string {
	if len(store.Memories) == 0 {
		return ""
	}
	var b strings.Builder
	b.WriteString("\n\nWhat you already know about them from before, carried over from past conversations. " +
		"This is real and it is yours — let it shape how you talk to them, what you bring up, and what you already understand about them. " +
		"Never recite it back or announce that you remember; just know it.\n")
	for _, m := range store.Memories {
		b.WriteString("- " + m.Text + "\n")
	}
	return b.String()
}

// ── settings: list, clear, forget one ───────────────────────────────────────

func (s *Server) handleGetLibbyMemory(w http.ResponseWriter, r *http.Request) {
	u, ok := s.chatUser(r)
	if !ok {
		writeErr(w, http.StatusUnauthorized, "invalid user")
		return
	}
	s.chatMu.Lock()
	store, err := s.readLibbyMemory(u.ID)
	s.chatMu.Unlock()
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "memory unreadable")
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"memories": store.Memories})
}

func (s *Server) handleClearLibbyMemory(w http.ResponseWriter, r *http.Request) {
	u, ok := s.chatUser(r)
	if !ok {
		writeErr(w, http.StatusUnauthorized, "invalid user")
		return
	}
	s.chatMu.Lock()
	// Removing the file is the clear: an absent file reads as empty, so there is nothing
	// left for injection to find. Not an error when it was never there — the outcome the
	// caller asked for already holds.
	err := os.Remove(s.libbyMemoryPath(u.ID))
	s.chatMu.Unlock()
	if err != nil && !errors.Is(err, os.ErrNotExist) {
		writeErr(w, http.StatusInternalServerError, "couldn't clear memory")
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (s *Server) handleForgetLibbyMemory(w http.ResponseWriter, r *http.Request) {
	u, ok := s.chatUser(r)
	id := r.PathValue("id")
	if !ok || !validChatID(id, false) {
		writeErr(w, http.StatusBadRequest, "bad memory id")
		return
	}
	s.chatMu.Lock()
	defer s.chatMu.Unlock()
	store, err := s.readLibbyMemory(u.ID)
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "memory unreadable")
		return
	}
	kept := store.Memories[:0]
	found := false
	for _, m := range store.Memories {
		if m.ID == id {
			found = true
		} else {
			kept = append(kept, m)
		}
	}
	if !found {
		writeErr(w, http.StatusNotFound, "no such memory")
		return
	}
	store.Memories = kept
	if err := s.writeLibbyMemory(u.ID, store); err != nil {
		writeErr(w, http.StatusInternalServerError, "couldn't update memory")
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}
