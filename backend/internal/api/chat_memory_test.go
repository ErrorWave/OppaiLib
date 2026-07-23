package api

import (
	"net/http"
	"strings"
	"testing"
)

func TestFindRememberTags(t *testing.T) {
	facts := findRememberTags("Noted. [remember: their name is Owen] Anything else? [remember: they hate horror]")
	if len(facts) != 2 || facts[0] != "their name is Owen" || facts[1] != "they hate horror" {
		t.Fatalf("got %#v, want the two facts in order", facts)
	}
	// Capped at two even when a model tries to file the whole conversation.
	facts = findRememberTags("[remember: a] [remember: b] [remember: c]")
	if len(facts) != 2 {
		t.Fatalf("got %d facts, want it capped at %d", len(facts), maxRememberedPerReply)
	}
	if got := findRememberTags("Nothing worth keeping here."); got != nil {
		t.Errorf("found a memory in prose that has none: %#v", got)
	}
	// An empty tag is not a fact.
	if got := findRememberTags("[remember:  ]"); got != nil {
		t.Errorf("accepted an empty remember tag: %#v", got)
	}
}

// The remember tag is machinery the user must never read, so scrubbing takes it out the
// same way it takes out mood and send tags.
func TestScrubDirectivesRemovesRememberTag(t *testing.T) {
	cases := []struct{ reply, want string }{
		{"Got it. [remember: they work nights] Talk soon.", "Got it. Talk soon."},
		{"I'll keep that in mind. [remember: allergic to cats]", "I'll keep that in mind."},
		{"Sure. *makes a note that you like tea* Anyway.", "Sure. Anyway."},
	}
	for _, tc := range cases {
		if got := scrubDirectives(tc.reply); got != tc.want {
			t.Errorf("scrubDirectives(%q)\n got %q\nwant %q", tc.reply, got, tc.want)
		}
	}
	// Prose that merely uses "remember" or "note" is her voice, not machinery, and must
	// survive: the memory scrub only fires on a "<verb> that/this/how/what" clause.
	for _, reply := range []string{
		"*I remember you from before* Good to see you again.",
		"*note the freckle on your shoulder* Cute.",
		"I'll remember you said that.",
		"*saves you a seat* Sit.",
	} {
		if got := scrubDirectives(reply); got != reply {
			t.Errorf("scrubDirectives(%q) = %q, want it unchanged", reply, got)
		}
	}
}

func TestMemoryPromptBlock(t *testing.T) {
	if got := memoryPromptBlock(libbyMemoryStore{}); got != "" {
		t.Errorf("empty store produced a block: %q", got)
	}
	block := memoryPromptBlock(libbyMemoryStore{Memories: []libbyMemory{{Text: "their name is Owen"}}})
	if !strings.Contains(block, "their name is Owen") {
		t.Errorf("block omitted the fact: %q", block)
	}
}

// The store dedups, caps oldest-out, and clears. The user id is arbitrary here — the
// store keys only the file path off it, no DB row required.
func TestLibbyMemoryStoreRoundTrip(t *testing.T) {
	s, _ := newTestServer(t)
	const uid = int64(1)

	changed, err := s.appendLibbyMemories(uid, []string{"likes horror", "hates cilantro"})
	if err != nil || !changed {
		t.Fatalf("first append: changed=%v err=%v", changed, err)
	}
	// Re-filing what she already knows is a no-op, no disk churn.
	changed, err = s.appendLibbyMemories(uid, []string{"likes horror", "LIKES HORROR"})
	if err != nil || changed {
		t.Fatalf("dedup append: changed=%v err=%v (want no change)", changed, err)
	}
	store, err := s.readLibbyMemory(uid)
	if err != nil || len(store.Memories) != 2 {
		t.Fatalf("read back: %d memories, err=%v", len(store.Memories), err)
	}

	// Past the cap, the oldest fall away and the newest survive.
	many := make([]string, maxLibbyMemories+5)
	for i := range many {
		many[i] = "fact number " + strings.Repeat("x", i%3) + string(rune('a'+i%26)) + itoa(int64(i))
	}
	if _, err := s.appendLibbyMemories(uid, many); err != nil {
		t.Fatalf("bulk append: %v", err)
	}
	store, _ = s.readLibbyMemory(uid)
	if len(store.Memories) != maxLibbyMemories {
		t.Fatalf("after overflow: %d memories, want cap %d", len(store.Memories), maxLibbyMemories)
	}
	if store.Memories[len(store.Memories)-1].Text != many[len(many)-1] {
		t.Errorf("newest memory was dropped: last is %q", store.Memories[len(store.Memories)-1].Text)
	}
}

// The settings endpoints read and clear what the chat path wrote.
func TestLibbyMemoryEndpoints(t *testing.T) {
	s, token := newTestServer(t)
	h := s.Handler()
	if _, err := s.appendLibbyMemories(1, []string{"their name is Owen"}); err != nil {
		t.Fatalf("seed memory: %v", err)
	}

	rec := do(t, h, token, http.MethodGet, "/api/libby/memory", "")
	if rec.Code != http.StatusOK || !strings.Contains(rec.Body.String(), "their name is Owen") {
		t.Fatalf("get memory: %d %s", rec.Code, rec.Body)
	}

	rec = do(t, h, token, http.MethodDelete, "/api/libby/memory", "")
	if rec.Code != http.StatusOK {
		t.Fatalf("clear memory: %d %s", rec.Code, rec.Body)
	}
	rec = do(t, h, token, http.MethodGet, "/api/libby/memory", "")
	if strings.Contains(rec.Body.String(), "their name is Owen") {
		t.Fatalf("memory survived clear: %s", rec.Body)
	}
}
