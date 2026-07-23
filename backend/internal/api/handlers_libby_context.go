package api

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/youruser/oppailib/internal/buildinfo"
	"github.com/youruser/oppailib/internal/db"
)

// Libby's awareness of the server she lives on.
//
// She is the librarian of this collection, so "what did I add recently?" and "how
// is the box doing?" are questions she should be able to answer. Two consumers read
// the same snapshot, which is why it is built once here rather than at each call
// site: handleChat folds it into the system prompt so a local LLM can talk about it,
// and GET /api/libby/context serves it to the web client so her built-in replies can
// answer the same questions with no model loaded at all.
//
// Nothing here leaves the box. It is the user's own library described back to them.

// libbyRecentCount bounds the recent-uploads list. Enough for "what have I been
// adding lately" without crowding the character card out of the prompt.
const libbyRecentCount = 12

// libbyRecentTags bounds the tags shown per item, for the same reason.
const libbyRecentTags = 6

type libbyRecentItem struct {
	ID    int64    `json:"id"`
	Title string   `json:"title"`
	Kind  string   `json:"kind"`
	Tags  []string `json:"tags,omitempty"`
	At    int64    `json:"at"`
}

type libbyContext struct {
	Version   string            `json:"version"`
	UptimeSec int64             `json:"uptimeSec"`
	Items     int64             `json:"items"`
	Bytes     int64             `json:"bytes"`
	Tags      int64             `json:"tags"`
	Kinds     []db.KindStat     `json:"kinds"`
	AIEnabled bool              `json:"aiEnabled"`
	AITagger  string            `json:"aiTagger"`
	ImageGen  bool              `json:"imageGen"`
	ChatModel string            `json:"chatModel,omitempty"`
	Recent    []libbyRecentItem `json:"recent"`
}

// buildLibbyContext snapshots the library and the server for Libby.
//
// Failures are absorbed rather than propagated: a stats query that errors should
// cost her the numbers, not the whole conversation. Every field is independently
// optional for that reason.
func (s *Server) buildLibbyContext(ctx context.Context) libbyContext {
	cur := s.settings.Get()
	out := libbyContext{
		Version:   buildinfo.String(),
		UptimeSec: int64(time.Since(s.startedAt).Seconds()),
		AIEnabled: s.ai.Enabled(),
		AITagger:  s.ai.TaggerName(),
		ImageGen:  cur.ImageGenURL != "",
		ChatModel: cur.ChatModel,
		Kinds:     []db.KindStat{},
		Recent:    []libbyRecentItem{},
	}

	if kinds, tags, err := s.db.Stats(ctx); err == nil {
		if kinds != nil {
			out.Kinds = kinds
		}
		out.Tags = tags
		for _, k := range kinds {
			out.Items += k.Count
			out.Bytes += k.Bytes
		}
	}

	rows, err := s.db.ListMedia(ctx, "", libbyRecentCount, 0)
	if err != nil {
		return out
	}
	ids := make([]int64, 0, len(rows))
	for _, row := range rows {
		ids = append(ids, row.ID)
	}
	// One batch query rather than one per row: this runs on the chat path, where a
	// dozen extra round trips would be paid on every single message.
	tagsByID, _ := s.db.TagsForMediaBatch(ctx, ids)
	for _, row := range rows {
		item := libbyRecentItem{
			ID:    row.ID,
			Title: s.decrypt(row.TitleEnc, "title"),
			Kind:  row.Kind,
			At:    row.CreatedAt,
		}
		if item.Title == "" {
			item.Title = "Untitled"
		}
		for _, tag := range tagsByID[row.ID] {
			if len(item.Tags) >= libbyRecentTags {
				break
			}
			item.Tags = append(item.Tags, tag.Name)
		}
		out.Recent = append(out.Recent, item)
	}
	return out
}

func humanBytes(n int64) string {
	const unit = 1024
	if n < unit {
		return fmt.Sprintf("%d B", n)
	}
	div, exp := int64(unit), 0
	for v := n / unit; v >= unit && exp < 4; v /= unit {
		div *= unit
		exp++
	}
	return fmt.Sprintf("%.1f %ciB", float64(n)/float64(div), "KMGTP"[exp])
}

func humanDuration(seconds int64) string {
	switch d := time.Duration(seconds) * time.Second; {
	case d < time.Minute:
		return "less than a minute"
	case d < time.Hour:
		return fmt.Sprintf("%d minutes", int(d.Minutes()))
	case d < 48*time.Hour:
		return fmt.Sprintf("%.1f hours", d.Hours())
	default:
		return fmt.Sprintf("%d days", int(d.Hours()/24))
	}
}

// promptBlock renders the snapshot as instructions for the model.
//
// It is written as facts plus a rule about how to use them, because a model handed
// a bare table will recite it. Libby should know this the way a librarian knows her
// own shelves — available when asked, not announced unprompted.
func (c libbyContext) promptBlock() string {
	var b strings.Builder
	b.WriteString("\n\nWhat you know about this library and the server it runs on. " +
		"This is real, current information about the user's own collection. " +
		"Use it when they ask about their library, their recent additions, or how the server is doing. " +
		"Answer in your own voice and never dump it as a list or recite it unprompted.\n")

	fmt.Fprintf(&b, "- The library holds %d items totalling %s, across %d distinct tags.\n",
		c.Items, humanBytes(c.Bytes), c.Tags)
	if len(c.Kinds) > 0 {
		parts := make([]string, 0, len(c.Kinds))
		for _, k := range c.Kinds {
			parts = append(parts, fmt.Sprintf("%d %s", k.Count, k.Kind))
		}
		fmt.Fprintf(&b, "- By kind: %s.\n", strings.Join(parts, ", "))
	}
	fmt.Fprintf(&b, "- The server is running OppaiLib %s and has been up for %s.\n",
		c.Version, humanDuration(c.UptimeSec))
	if c.AIEnabled {
		fmt.Fprintf(&b, "- Automatic tagging is on, using %s.\n", c.AITagger)
	} else {
		b.WriteString("- Automatic tagging is switched off.\n")
	}
	if c.ImageGen {
		b.WriteString("- Image generation is connected, so you can suggest making something.\n")
	}

	if len(c.Recent) == 0 {
		b.WriteString("- Nothing has been added yet. The shelves are empty.\n")
		return b.String()
	}
	b.WriteString("- Most recently added, newest first:\n")
	for _, item := range c.Recent {
		fmt.Fprintf(&b, "  - %q (%s, added %s)", item.Title, item.Kind, humanDuration(
			int64(time.Since(time.Unix(item.At, 0)).Seconds()))+" ago")
		if len(item.Tags) > 0 {
			fmt.Fprintf(&b, " tagged %s", strings.Join(item.Tags, ", "))
		}
		b.WriteString("\n")
	}
	return b.String()
}

// handleLibbyContext serves the same snapshot to the client, so Libby's built-in
// replies can answer library questions when no model is loaded.
func (s *Server) handleLibbyContext(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, s.buildLibbyContext(r.Context()))
}
