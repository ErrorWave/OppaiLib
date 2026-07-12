package sources

import (
	"context"
	"encoding/json"
	"fmt"
	"html"
	"net/http"
	"regexp"
	"strconv"
	"strings"
)

// FourChan browses 4chan's boards through its read-only JSON API.
//
// The API is the whole reason this source is cheap: a.4cdn.org serves each board's
// index as JSON, so there is no HTML to parse and nothing to break when the site is
// restyled. Media lives on i.4cdn.org under the post's upload timestamp.
//
// A board is browsed as *threads*, not as a flat run of files. That's how the site
// works and it's how people read it: an /h/ thread is a set — one dump, one artist,
// one theme — and shredding it into 400 unlabelled tiles throws away the only
// structure the board has. So a board listing yields one tile per thread (the OP's
// image, the subject, the file count), and opening a thread browses *into* it. See
// Item.FeedID: a thread is a container, and the client drills into containers rather
// than opening them in the viewer.
type FourChan struct {
	hc      *http.Client
	apiHost string // overridable in tests
	cdnHost string
}

// fourChanBoards are the media-heavy boards worth browsing. 4chan has scores of
// boards; a picker listing all of them would be noise, so this is the subset whose
// content is actually images and video.
var fourChanBoards = []Feed{
	{ID: "gif", Label: "/gif/ — Adult GIF"},
	{ID: "wsg", Label: "/wsg/ — Worksafe GIF"},
	{ID: "hr", Label: "/hr/ — High Resolution"},
	{ID: "w", Label: "/w/ — Anime Wallpapers"},
	{ID: "wg", Label: "/wg/ — Wallpapers/General"},
	{ID: "aco", Label: "/aco/ — Adult Cartoon"},
	{ID: "h", Label: "/h/ — Hentai"},
	{ID: "e", Label: "/e/ — Ecchi"},
	{ID: "u", Label: "/u/ — Yuri"},
	{ID: "d", Label: "/d/ — Hentai/Alternative"},
	{ID: "s", Label: "/s/ — Sexy Beautiful Women"},
	{ID: "hc", Label: "/hc/ — Hardcore"},
	{ID: "p", Label: "/p/ — Photography"},
}

// fourChanLastPage is the last index page a board serves. The API exposes 1–10 and
// 404s past that, so paging stops there rather than probing.
const fourChanLastPage = 10

func NewFourChan(hc *http.Client) *FourChan {
	return &FourChan{hc: hc, apiHost: "https://a.4cdn.org", cdnHost: "https://i.4cdn.org"}
}

func (f *FourChan) ID() string    { return "4chan" }
func (f *FourChan) Name() string  { return "4chan" }
func (f *FourChan) Feeds() []Feed { return fourChanBoards }
func (f *FourChan) Hosts() []string {
	return []string{"a.4cdn.org", "i.4cdn.org", "is2.4chan.org"}
}

// fourChanIndex is the shape of /{board}/{page}.json, narrowed to what we read. The
// first post of each thread is its OP.
type fourChanIndex struct {
	Threads []struct {
		Posts []fourChanPost `json:"posts"`
	} `json:"threads"`
}

// fourChanThread is the shape of /{board}/thread/{no}.json — every post, in order.
type fourChanThread struct {
	Posts []fourChanPost `json:"posts"`
}

type fourChanPost struct {
	No       int64  `json:"no"`
	Tim      int64  `json:"tim"`      // upload timestamp; names the file on the CDN
	Ext      string `json:"ext"`      // ".webm", ".jpg", …
	Filename string `json:"filename"` // the uploader's original name, without extension
	Width    int    `json:"w"`
	Height   int    `json:"h"`
	Sub      string `json:"sub"` // thread subject
	Com      string `json:"com"` // comment, as HTML
	// Replies and Images are only on an OP, and count the *replies* — the OP's own
	// upload is not among them.
	Replies int `json:"replies"`
	Images  int `json:"images"`
}

// threadFeed reads a feed id of the form "<board>:t<no>" — a single thread, browsed
// as if it were a feed of its own. Ids avoid "/" so they survive a round trip through
// a path segment without depending on how a client escapes a slash.
func threadFeed(feed string) (board string, no int64, ok bool) {
	board, rest, found := strings.Cut(feed, ":")
	if !found || !validBoard(board) || !strings.HasPrefix(rest, "t") {
		return "", 0, false
	}
	n, err := strconv.ParseInt(strings.TrimPrefix(rest, "t"), 10, 64)
	if err != nil || n <= 0 {
		return "", 0, false
	}
	return board, n, true
}

func (f *FourChan) Browse(ctx context.Context, p BrowseParams) (*Listing, error) {
	// A thread is addressed as a feed, so opening one is the same request as browsing
	// a board — the client doesn't need a second endpoint to drill into a container.
	if board, no, ok := threadFeed(p.Feed); ok {
		return f.browseThread(ctx, board, no)
	}
	return f.browseBoard(ctx, p)
}

// browseBoard lists a board's threads, one tile per thread.
func (f *FourChan) browseBoard(ctx context.Context, p BrowseParams) (*Listing, error) {
	feed := p.Feed
	// An empty board means "whatever this source leads with", so a client that hasn't
	// picked yet still gets a listing rather than an error.
	if feed == "" && len(fourChanBoards) > 0 {
		feed = fourChanBoards[0].ID
	}
	if !validBoard(feed) {
		return nil, fmt.Errorf("unknown board %q", feed)
	}
	page := 1
	if p.Cursor != "" {
		n, err := strconv.Atoi(p.Cursor)
		if err != nil || n < 1 || n > fourChanLastPage {
			return nil, fmt.Errorf("bad cursor %q", p.Cursor)
		}
		page = n
	}

	url := fmt.Sprintf("%s/%s/%d.json", f.apiHost, feed, page)
	body, err := httpGet(ctx, f.hc, url, defaultUserAgent)
	if err != nil {
		return nil, err
	}

	var idx fourChanIndex
	if err := json.Unmarshal(body, &idx); err != nil {
		return nil, fmt.Errorf("decode 4chan index: %w", err)
	}

	out := &Listing{}
	for _, thread := range idx.Threads {
		if len(thread.Posts) == 0 {
			continue
		}
		// The index gives the OP plus a few preview replies. The OP is the thread: its
		// image is the cover, its subject is the title, and its counters say how much
		// is inside.
		out.Items = append(out.Items, f.threadItem(feed, thread.Posts[0]))
	}

	if page < fourChanLastPage {
		out.Cursor = strconv.Itoa(page + 1)
	}
	return out, nil
}

// browseThread lists the media inside one thread. There is no paging: a thread is
// served whole.
func (f *FourChan) browseThread(ctx context.Context, board string, no int64) (*Listing, error) {
	url := fmt.Sprintf("%s/%s/thread/%d.json", f.apiHost, board, no)
	body, err := httpGet(ctx, f.hc, url, defaultUserAgent)
	if err != nil {
		return nil, err
	}

	var thread fourChanThread
	if err := json.Unmarshal(body, &thread); err != nil {
		return nil, fmt.Errorf("decode 4chan thread: %w", err)
	}

	subject := ""
	if len(thread.Posts) > 0 {
		subject = cleanPostText(thread.Posts[0].Sub)
	}

	out := &Listing{}
	for _, p := range thread.Posts {
		// A post without an upload is just text — nothing to browse.
		if p.Tim == 0 || p.Ext == "" {
			continue
		}
		out.Items = append(out.Items, f.fileItem(board, no, p, subject))
	}
	return out, nil
}

// threadItem turns an OP into the tile that stands for its whole thread.
func (f *FourChan) threadItem(board string, op fourChanPost) Item {
	title := cleanPostText(op.Sub)
	if title == "" {
		title = cleanPostText(op.Com)
	}
	if title == "" {
		title = fmt.Sprintf("/%s/%d", board, op.No)
	}

	// Images counts the replies' uploads; the OP's own file is separate.
	files := op.Images
	if op.Tim != 0 {
		files++
	}

	item := Item{
		ID:      fmt.Sprintf("%s:t%d", board, op.No),
		Title:   truncate(title, 120),
		Kind:    kindThread,
		FeedID:  fmt.Sprintf("%s:t%d", board, op.No),
		PageURL: fmt.Sprintf("https://boards.4chan.org/%s/thread/%d", board, op.No),
		Count:   files,
		Width:   op.Width,
		Height:  op.Height,
	}
	// A thread whose OP posted no image (rare on these boards) still lists; the client
	// draws a placeholder rather than a broken tile.
	if op.Tim != 0 {
		item.ThumbURL = fmt.Sprintf("%s/%s/%ds.jpg", f.cdnHost, board, op.Tim)
	}
	return item
}

// fileItem turns one post's upload into a viewable item.
func (f *FourChan) fileItem(board string, thread int64, p fourChanPost, subject string) Item {
	title := strings.TrimSpace(p.Filename + p.Ext)
	if title == "" {
		title = cleanPostText(p.Com)
	}
	if title == "" {
		title = subject
	}
	if title == "" {
		title = fmt.Sprintf("/%s/%d", board, p.No)
	}

	return Item{
		ID:    fmt.Sprintf("%s:f%d", board, p.Tim),
		Title: truncate(title, 120),
		Kind:  kindForExt(p.Ext),
		// 4chan always renders a JPEG thumbnail, whatever the original was — a .webm's
		// thumb is "{tim}s.jpg", not "{tim}s.webm".
		ThumbURL: fmt.Sprintf("%s/%s/%ds.jpg", f.cdnHost, board, p.Tim),
		MediaURL: fmt.Sprintf("%s/%s/%d%s", f.cdnHost, board, p.Tim, p.Ext),
		// The post, not just the thread: #p{no} lands on the actual reply.
		PageURL: fmt.Sprintf("https://boards.4chan.org/%s/thread/%d#p%d", board, thread, p.No),
		Width:   p.Width,
		Height:  p.Height,
	}
}

// Pages returns a thread's images, in post order — what a thread saved to the library
// becomes. Videos are left out: a comic is a run of pages, and a .webm is not a page.
//
// Only a thread has pages. Asking for the pages of a single file gets nothing, which
// is the right answer rather than an error: the caller has the file's own URL already.
func (f *FourChan) Pages(ctx context.Context, itemID string) ([]string, error) {
	board, no, ok := threadFeed(itemID)
	if !ok {
		return nil, nil
	}
	listing, err := f.browseThread(ctx, board, no)
	if err != nil {
		return nil, err
	}
	var out []string
	for _, item := range listing.Items {
		if item.Kind == "video" || item.MediaURL == "" {
			continue
		}
		out = append(out, item.MediaURL)
	}
	return out, nil
}

func validBoard(id string) bool {
	for _, b := range fourChanBoards {
		if b.ID == id {
			return true
		}
	}
	return false
}

var tagRe = regexp.MustCompile(`<[^>]*>`)

// cleanPostText turns a post's HTML comment into a one-line plain-text label.
func cleanPostText(s string) string {
	s = strings.ReplaceAll(s, "<br>", " ")
	s = tagRe.ReplaceAllString(s, "")
	s = html.UnescapeString(s)
	return strings.TrimSpace(strings.Join(strings.Fields(s), " "))
}

func truncate(s string, n int) string {
	r := []rune(s)
	if len(r) <= n {
		return s
	}
	return strings.TrimSpace(string(r[:n])) + "…"
}
