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

// fourChanIndex is the shape of /{board}/{page}.json, narrowed to what we read.
type fourChanIndex struct {
	Threads []struct {
		Posts []fourChanPost `json:"posts"`
	} `json:"threads"`
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
}

func (f *FourChan) Browse(ctx context.Context, feed, cursor string) (*Listing, error) {
	if !validBoard(feed) {
		return nil, fmt.Errorf("unknown board %q", feed)
	}
	page := 1
	if cursor != "" {
		n, err := strconv.Atoi(cursor)
		if err != nil || n < 1 || n > fourChanLastPage {
			return nil, fmt.Errorf("bad cursor %q", cursor)
		}
		page = n
	}

	url := fmt.Sprintf("%s/%s/%d.json", f.apiHost, feed, page)
	resp, err := httpGet(ctx, f.hc, url, defaultUserAgent)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var idx fourChanIndex
	if err := json.NewDecoder(resp.Body).Decode(&idx); err != nil {
		return nil, fmt.Errorf("decode 4chan index: %w", err)
	}

	out := &Listing{}
	for _, thread := range idx.Threads {
		// The OP's subject titles the whole thread; replies rarely have one, so it's
		// the most useful label to hang on every file in it.
		subject := ""
		if len(thread.Posts) > 0 {
			subject = cleanPostText(thread.Posts[0].Sub)
		}
		for _, p := range thread.Posts {
			// A post without an upload is just text — nothing to browse.
			if p.Tim == 0 || p.Ext == "" {
				continue
			}
			out.Items = append(out.Items, f.itemOf(feed, p, subject))
		}
	}

	if page < fourChanLastPage {
		out.Cursor = strconv.Itoa(page + 1)
	}
	return out, nil
}

func (f *FourChan) itemOf(board string, p fourChanPost, subject string) Item {
	title := strings.TrimSpace(p.Filename + p.Ext)
	if subject != "" {
		title = subject
	}
	if title == "" {
		title = cleanPostText(p.Com)
	}
	if title == "" {
		title = fmt.Sprintf("/%s/%d", board, p.No)
	}

	return Item{
		ID:    fmt.Sprintf("%s/%d", board, p.Tim),
		Title: truncate(title, 120),
		Kind:  kindForExt(p.Ext),
		// 4chan always renders a JPEG thumbnail, whatever the original was — a .webm's
		// thumb is "{tim}s.jpg", not "{tim}s.webm".
		ThumbURL: fmt.Sprintf("%s/%s/%ds.jpg", f.cdnHost, board, p.Tim),
		MediaURL: fmt.Sprintf("%s/%s/%d%s", f.cdnHost, board, p.Tim, p.Ext),
		PageURL:  fmt.Sprintf("https://boards.4chan.org/%s/thread/%d", board, p.No),
		Width:    p.Width,
		Height:   p.Height,
	}
}

// Pages: 4chan has no multi-page items — every post is one file.
func (f *FourChan) Pages(context.Context, string) ([]string, error) { return nil, nil }

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
