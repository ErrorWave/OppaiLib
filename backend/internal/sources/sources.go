// Package sources exposes remote catalogues — a 4chan board, a doujin site — as
// browsable feeds the client can page through and stream from *without importing*.
//
// This is deliberately not the scraper. The scraper's job is "here is one URL, pull
// it into the library"; a source's job is "here is a place, show me what's on it".
// Nothing here downloads to the blob store: items carry the remote URLs, the client
// streams them through the server's proxy, and only an explicit save crosses over
// into the library (where the scrape/import machinery takes back over).
package sources

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	"sync"
	"time"
)

// Feed is one browsable listing inside a source: a board, a category, a sort order.
type Feed struct {
	ID    string `json:"id"`
	Label string `json:"label"`
}

// Item is one piece of media that lives on the remote source. Every URL on it is
// remote; none of them is ours.
type Item struct {
	ID       string `json:"id"`
	Title    string `json:"title"`
	Kind     string `json:"kind"` // video | gif | image | comic
	ThumbURL string `json:"thumbUrl"`
	// MediaURL is the thing itself, for streaming and for saving. Empty on a comic,
	// whose payload is a run of pages rather than one file — see PageURL and Pages.
	MediaURL string `json:"mediaUrl,omitempty"`
	// PageURL is the human page the item came from: what a save is pointed at, and
	// what gets recorded as its source.
	PageURL string `json:"pageUrl,omitempty"`
	Width   int    `json:"width,omitempty"`
	Height  int    `json:"height,omitempty"`
}

// Listing is one page of a feed. Cursor is opaque to the client; an empty cursor
// means there is nothing after this.
type Listing struct {
	Items  []Item `json:"items"`
	Cursor string `json:"cursor,omitempty"`
}

// Source is a remote catalogue.
type Source interface {
	ID() string
	Name() string
	Feeds() []Feed

	// Hosts are the hostnames this source's media may be fetched from. The proxy
	// checks incoming URLs against the union of these: without it, an endpoint that
	// takes a URL and fetches it is an open proxy pointed at everything behind the
	// firewall.
	Hosts() []string

	// Browse returns one page of a feed.
	Browse(ctx context.Context, feed, cursor string) (*Listing, error)

	// Pages returns the ordered page images of a multi-page item, for reading a
	// comic in place. Sources with no multi-page items return nil.
	Pages(ctx context.Context, itemID string) ([]string, error)
}

// Registry holds the configured sources and answers host questions for the proxy.
type Registry struct {
	mu   sync.RWMutex
	srcs []Source
}

// NewRegistry builds the standard set.
func NewRegistry(pages PageFetcher) *Registry {
	return &Registry{srcs: []Source{
		NewFourChan(pages.Client()),
		NewThreeHentai(pages),
	}}
}

func (r *Registry) All() []Source {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return append([]Source(nil), r.srcs...)
}

func (r *Registry) Get(id string) (Source, bool) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	for _, s := range r.srcs {
		if s.ID() == id {
			return s, true
		}
	}
	return nil, false
}

// AllowsHost reports whether host belongs to some registered source.
//
// This is the guard on the streaming proxy. The proxy exists to fetch remote media
// on the client's behalf, and a proxy that will fetch *any* URL is an SSRF hole —
// it would happily GET the metadata service or anything else on the server's
// network. Restricting it to the hosts our sources actually serve from keeps the
// feature and closes the hole.
func (r *Registry) AllowsHost(host string) bool {
	host = strings.ToLower(strings.TrimSpace(host))
	if host == "" {
		return false
	}
	for _, s := range r.All() {
		for _, pat := range s.Hosts() {
			if hostMatches(strings.ToLower(pat), host) {
				return true
			}
		}
	}
	return false
}

// hostMatches supports a leading "*." wildcard, which must match a *subdomain* —
// "*.example.com" covers "cdn.example.com" and "example.com", but must never be
// tricked by "example.com.evil.net".
func hostMatches(pattern, host string) bool {
	if suffix, ok := strings.CutPrefix(pattern, "*."); ok {
		return host == suffix || strings.HasSuffix(host, "."+suffix)
	}
	return host == pattern
}

// PageFetcher fetches remote HTML and resolves a comic's page images. It's the
// scraper, narrowed to what sources need — passed in rather than imported so the
// sources can be tested against a stub instead of the network.
type PageFetcher interface {
	// Client is the HTTP client to use for a source's own API calls.
	Client() *http.Client
	// ComicPages returns the ordered page images of a comic at pageURL.
	ComicPages(ctx context.Context, pageURL string) ([]string, error)
	// Document fetches pageURL and returns its HTML body.
	Document(ctx context.Context, pageURL string) (string, error)
}

// kindForExt maps a media file extension to a library kind.
func kindForExt(ext string) string {
	switch strings.ToLower(strings.TrimPrefix(ext, ".")) {
	case "webm", "mp4", "m4v", "mov":
		return "video"
	case "gif":
		return "gif"
	default:
		return "image"
	}
}

// httpGet is the shared request shape: a real User-Agent (4chan's JSON API and most
// gallery sites refuse Go's default) and a bounded deadline.
func httpGet(ctx context.Context, hc *http.Client, url, userAgent string) (*http.Response, error) {
	ctx, cancel := context.WithTimeout(ctx, 20*time.Second)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", userAgent)
	resp, err := hc.Do(req)
	if err != nil {
		return nil, err
	}
	if resp.StatusCode != http.StatusOK {
		resp.Body.Close()
		return nil, fmt.Errorf("%s: %s", url, resp.Status)
	}
	return resp, nil
}

const defaultUserAgent = "OppaiLib/1.0 (+https://github.com/youruser/oppailib)"
