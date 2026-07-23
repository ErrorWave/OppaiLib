package api

import (
	"context"
	"fmt"
	"regexp"
	"sort"
	"strings"
)

// Letting a character reach into the library: pointing at things by name, and
// looking at the same screen as the user.
//
// Two features share this file because they share a resolver. Linking lets Libby
// name something in the collection and have the user able to open it in one tap;
// browse-together hands her what is on screen so she can talk about it. Both come
// down to "turn a bit of text or a set of ids into real rows, and describe them".
//
// Everything resolves server-side against the user's own database. A client says
// which ids are on screen, never what they are called or what they are tagged: the
// titles and tags a model reads are the ones the library actually holds.

const (
	// maxLinksPerReply bounds what one message may point at. A reply that links six
	// things is a search results page, not a recommendation.
	maxLinksPerReply = 3
	// linkCandidates bounds the rows a name lookup will decrypt and rank. Titles are
	// ciphertext, so a title match cannot use an index — somebody has to open them.
	linkCandidates = 240
	// maxViewingItems bounds the on-screen list folded into the prompt.
	maxViewingItems = 18
	// viewingTags bounds the tags shown per on-screen item, so a shelf of eighteen
	// heavily tagged items cannot crowd out the character card.
	viewingTags = 8
)

// libbyLink is one library item a reply points at. It is deliberately just enough
// to draw a chip and open the viewer: the client already knows how to fetch the
// rest by id.
type libbyLink struct {
	ID       int64  `json:"id"`
	Title    string `json:"title"`
	Kind     string `json:"kind"`
	HasThumb bool   `json:"hasThumb,omitempty"`
}

// linkTag captures a pointer to something in the library. Unlike the mood and photo
// tags this one is *not* anchored to the end of the reply: a link stands in for the
// item's name mid-sentence ("you never finished [link: the beach one]"), so it has
// to be resolvable wherever it lands.
var linkTag = regexp.MustCompile(`(?i)\[\s*link\s*[:=-]?\s*([^\]\n]{1,120}?)\s*\]`)

// linkDirective tells the character how to point at something. It is only ever
// added when the resolver is actually wired up for that request — a model told it
// can link things in a context where nothing resolves would write tags that get
// stripped back out, which reads to the user as her forgetting mid-sentence.
const linkDirective = "You can point at anything in this library by writing [link: <its title>] exactly where you would have said its name — " +
	"the user sees it as something they can open with one tap, so write the sentence as though the link is the name. " +
	"For example: \"you never did finish [link: Summer Nights], you know.\" " +
	"Link only something you are genuinely bringing up, never more than three in one reply, and never in every reply. " +
	"Use the real title of something in the collection; if you cannot remember what a thing was called, just describe it instead."

// normalizeLookupWords reduces a query to the words worth matching on.
func normalizeLookupWords(query string) []string {
	seen := map[string]bool{}
	var words []string
	for _, word := range strings.FieldsFunc(strings.ToLower(query), func(r rune) bool {
		return !(r >= 'a' && r <= 'z') && !(r >= '0' && r <= '9')
	}) {
		// Two-letter words match everything and rank nothing.
		if len(word) < 3 || seen[word] || lookupStopWords[word] {
			continue
		}
		seen[word] = true
		words = append(words, word)
	}
	return words
}

// lookupStopWords are the words a character naturally wraps a title in. Left in,
// "the one with the beach" matches every item whose title contains "one".
// Kind words ("video", "comic") are deliberately absent: they are real tags and a
// real part of a title, so they rank rather than being discarded.
var lookupStopWords = map[string]bool{
	"the": true, "one": true, "that": true, "this": true, "with": true, "and": true,
	"for": true, "you": true, "your": true, "from": true, "about": true, "thing": true,
	"item": true, "saved": true, "have": true, "some": true, "any": true,
}

// libraryCandidate is a row in the running for a name lookup, with its title
// already decrypted and its tags attached.
type libraryCandidate struct {
	link  libbyLink
	title string
	tags  []string
}

// libraryCandidates gathers the rows worth ranking for a set of queries.
//
// Two sources, because the library has two kinds of searchable text and they live
// at opposite ends of the trust model. Tags are plaintext and indexed, so a tag
// word can find something a thousand rows deep. Titles are encrypted, so they can
// only be found by decrypting a bounded run of the newest rows — which is fine,
// since the thing a character brings up by name is overwhelmingly something the
// user added recently.
func (s *Server) libraryCandidates(ctx context.Context, words []string) []libraryCandidate {
	briefs, err := s.db.RecentBriefs(ctx, linkCandidates)
	if err != nil {
		s.log.Warn("library link: recent rows", "err", err)
	}
	seen := make(map[int64]bool, len(briefs))
	for _, brief := range briefs {
		seen[brief.ID] = true
	}
	if tagged, err := s.db.BriefsByTagWords(ctx, words, linkCandidates); err != nil {
		s.log.Warn("library link: tag lookup", "err", err)
	} else {
		for _, brief := range tagged {
			if !seen[brief.ID] {
				seen[brief.ID] = true
				briefs = append(briefs, brief)
			}
		}
	}
	if len(briefs) == 0 {
		return nil
	}
	ids := make([]int64, 0, len(briefs))
	for _, brief := range briefs {
		ids = append(ids, brief.ID)
	}
	tagsByID, err := s.db.TagsForMediaBatch(ctx, ids)
	if err != nil {
		s.log.Warn("library link: tags", "err", err)
	}
	out := make([]libraryCandidate, 0, len(briefs))
	for _, brief := range briefs {
		title := s.decrypt(brief.TitleEnc, "title")
		if title == "" {
			title = "Untitled"
		}
		candidate := libraryCandidate{
			link:  libbyLink{ID: brief.ID, Title: title, Kind: brief.Kind, HasThumb: brief.HasThumb},
			title: strings.ToLower(title),
		}
		for _, tag := range tagsByID[brief.ID] {
			candidate.tags = append(candidate.tags, strings.ToLower(tag.Name))
		}
		out = append(out, candidate)
	}
	return out
}

// bestLibraryMatch scores one query against the candidate set.
//
// A title match outweighs a tag match by a wide margin: a character asked to write
// the real title is usually writing the real title, and a request that happens to
// share one tag word with fifty items should not beat the one thing actually named.
// Whole-phrase containment on top of that settles the common case outright.
func bestLibraryMatch(candidates []libraryCandidate, query string) (libbyLink, bool) {
	words := normalizeLookupWords(query)
	if len(words) == 0 {
		return libbyLink{}, false
	}
	phrase := strings.ToLower(strings.TrimSpace(query))
	best, bestScore := libbyLink{}, 0
	for _, candidate := range candidates {
		score := 0
		if len(phrase) >= 4 && strings.Contains(candidate.title, phrase) {
			score += 12
		}
		for _, word := range words {
			if strings.Contains(candidate.title, word) {
				score += 4
			}
			for _, tag := range candidate.tags {
				if strings.Contains(tag, word) {
					score++
					break
				}
			}
		}
		if score > bestScore {
			best, bestScore = candidate.link, score
		}
	}
	// Two points is one title word, or two independent tag words. One incidental tag
	// hit is noise, and pointing the user at the wrong thing is worse than not
	// pointing at anything.
	if bestScore < 2 {
		return libbyLink{}, false
	}
	return best, true
}

// resolveLibraryLinks turns the link tags in a reply into real items.
//
// Each tag is replaced by the item's actual title rather than being cut out, so
// the sentence still reads as written — "you never finished [link: the beach one]"
// becomes "you never finished Summer at the Coast". A tag that resolves to nothing
// falls back to the character's own words, which keeps the prose intact even when
// she has invented a title that was never in the library.
func (s *Server) resolveLibraryLinks(ctx context.Context, reply string) (string, []libbyLink) {
	requests := linkTag.FindAllStringSubmatch(reply, -1)
	if len(requests) == 0 {
		return reply, nil
	}
	var words []string
	for _, request := range requests {
		words = append(words, normalizeLookupWords(request[1])...)
	}
	candidates := s.libraryCandidates(ctx, words)

	var links []libbyLink
	picked := map[int64]bool{}
	text := linkTag.ReplaceAllStringFunc(reply, func(match string) string {
		query := strings.TrimSpace(linkTag.FindStringSubmatch(match)[1])
		link, found := bestLibraryMatch(candidates, query)
		if !found {
			return query
		}
		// Repeats collapse to one chip but keep reading naturally in the prose: she
		// may well name the same thing twice in a paragraph.
		if !picked[link.ID] && len(links) < maxLinksPerReply {
			picked[link.ID] = true
			links = append(links, link)
		}
		return link.Title
	})
	return strings.TrimSpace(text), links
}

// ── browsing the library together ───────────────────────────────────────────

// chatViewing is what the user says is in front of them. Ids only: what those ids
// are called and what they are tagged is read from the database, not taken on the
// client's word.
type chatViewing struct {
	// FocusID is the one item they are actually looking at, if any.
	FocusID int64 `json:"focusId,omitempty"`
	// IDs are the rest of what is on screen, in the order it is laid out.
	IDs []int64 `json:"ids,omitempty"`
	// Section names where they are — "videos", "favorites", a search term. Free text
	// from the client, so it is quoted into the prompt rather than instructing it.
	Section string `json:"section,omitempty"`
}

// viewingDirective describes the shared screen to the model, and returns "" when
// there is nothing on it worth describing.
//
// The instruction matters as much as the facts. Handed a list and no framing, a
// model summarises the list — it reads back six titles and asks which one you want,
// which is a search interface with a face on it. What is wanted is the person
// sitting next to you, who says one thing about the one thing you are looking at.
func (s *Server) viewingDirective(ctx context.Context, viewing *chatViewing) string {
	if viewing == nil {
		return ""
	}
	ids := make([]int64, 0, maxViewingItems+1)
	seen := map[int64]bool{}
	for _, id := range append([]int64{viewing.FocusID}, viewing.IDs...) {
		if id <= 0 || seen[id] || len(ids) >= maxViewingItems+1 {
			continue
		}
		seen[id] = true
		ids = append(ids, id)
	}
	if len(ids) == 0 {
		return ""
	}
	briefs, err := s.db.BriefsByIDs(ctx, ids)
	if err != nil || len(briefs) == 0 {
		return ""
	}
	tagsByID, _ := s.db.TagsForMediaBatch(ctx, ids)

	// BriefsByIDs does not promise an order, so put them back the way the screen has
	// them: the shelf she is describing should read left to right the way the user
	// sees it.
	position := make(map[int64]int, len(ids))
	for i, id := range ids {
		position[id] = i
	}
	sort.Slice(briefs, func(a, b int) bool { return position[briefs[a].ID] < position[briefs[b].ID] })

	line := func(id int64) string {
		for _, brief := range briefs {
			if brief.ID != id {
				continue
			}
			title := s.decrypt(brief.TitleEnc, "title")
			if title == "" {
				title = "Untitled"
			}
			out := fmt.Sprintf("%q (%s", title, brief.Kind)
			if tags := tagsByID[id]; len(tags) > 0 {
				names := make([]string, 0, viewingTags)
				for _, tag := range tags {
					if len(names) >= viewingTags {
						break
					}
					names = append(names, tag.Name)
				}
				out += ", tagged " + strings.Join(names, ", ")
			}
			return out + ")"
		}
		return ""
	}

	var b strings.Builder
	b.WriteString("\n\nYou and the user are going through their library together, looking at the same screen at the same time. ")
	if section := strings.TrimSpace(viewing.Section); section != "" && len(section) <= 60 {
		fmt.Fprintf(&b, "They are in %q. ", section)
	}
	b.WriteString("This is what is in front of you both:\n")
	for _, id := range ids {
		if id == viewing.FocusID {
			continue
		}
		if text := line(id); text != "" {
			b.WriteString("- " + text + "\n")
		}
	}
	if focus := line(viewing.FocusID); focus != "" {
		fmt.Fprintf(&b, "\nRight now they have opened %s.\n", focus)
		b.WriteString("React to that one thing. Say what catches your eye, whether you like it, what it reminds you of — " +
			"the way someone leaning over your shoulder would, in a sentence or two. ")
	} else {
		b.WriteString("\nThey are looking over the shelf rather than at any one thing. ")
	}
	b.WriteString("Never list what is on screen back to them: they can see it. " +
		"Have opinions — say when something is not to your taste, and say plainly when you want them to open something instead. " +
		"You are allowed to want things: if one of these is more what you are in the mood for, ask for it.")
	return b.String()
}
