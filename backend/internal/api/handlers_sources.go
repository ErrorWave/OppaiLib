package api

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"

	"github.com/youruser/oppailib/internal/models"
	"github.com/youruser/oppailib/internal/scraper"
	"github.com/youruser/oppailib/internal/sources"
)

// scraperFetcher lends the scraper's HTTP discipline (User-Agent, per-host throttle,
// robots policy) to the sources package, so browsing a catalogue doesn't quietly
// become a second, unpoliced HTTP client.
type scraperFetcher struct{ e *scraper.Engine }

func (f scraperFetcher) Client() *http.Client { return f.e.HTTPClient() }

func (f scraperFetcher) Document(ctx context.Context, pageURL string) (string, error) {
	return f.e.Fetch(ctx, pageURL)
}

func (f scraperFetcher) ComicPages(ctx context.Context, pageURL string) ([]string, error) {
	return f.e.ComicPages(ctx, pageURL)
}

// sourceInfo is the catalogue description the client picks from.
type sourceInfo struct {
	ID    string         `json:"id"`
	Name  string         `json:"name"`
	Feeds []sources.Feed `json:"feeds"`
}

func (s *Server) handleListSources(w http.ResponseWriter, r *http.Request) {
	all := s.sources.All()
	out := make([]sourceInfo, 0, len(all))
	for _, src := range all {
		out = append(out, sourceInfo{ID: src.ID(), Name: src.Name(), Feeds: src.Feeds()})
	}
	writeJSON(w, http.StatusOK, map[string]any{"sources": out})
}

func (s *Server) handleBrowseSource(w http.ResponseWriter, r *http.Request) {
	src, ok := s.sources.Get(r.PathValue("id"))
	if !ok {
		writeErr(w, http.StatusNotFound, "unknown source")
		return
	}
	q := r.URL.Query()
	ctx, cancel := context.WithTimeout(r.Context(), scrapeTimeout)
	defer cancel()

	listing, err := src.Browse(ctx, sources.BrowseParams{
		Feed:   q.Get("feed"),
		Cursor: q.Get("cursor"),
		Query:  q.Get("q"),
		Sort:   q.Get("sort"),
	})
	if err != nil {
		s.log.Warn("source browse", "source", src.ID(), "feed", q.Get("feed"), "err", err)
		writeErr(w, http.StatusBadGateway, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, listing)
}

// handleSourcePages resolves a multi-page item (a comic) into its page images, so
// the reader can page through it without importing anything.
func (s *Server) handleSourcePages(w http.ResponseWriter, r *http.Request) {
	src, ok := s.sources.Get(r.PathValue("id"))
	if !ok {
		writeErr(w, http.StatusNotFound, "unknown source")
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), scrapeTimeout)
	defer cancel()

	pages, err := src.Pages(ctx, r.PathValue("item"))
	if err != nil {
		writeErr(w, http.StatusBadGateway, err.Error())
		return
	}
	if len(pages) == 0 {
		writeErr(w, http.StatusNotFound, "no pages for that item")
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"pages": pages, "count": len(pages)})
}

// handleSourceStream proxies one remote media file, forwarding Range so a video can
// actually be seeked rather than only played from the start.
//
// The URL is checked against the registered sources' hosts first. An endpoint that
// takes a URL and fetches it is an SSRF hole by default — without the check this
// would happily GET the cloud metadata service, or anything else reachable from the
// server but not from the client.
func (s *Server) handleSourceStream(w http.ResponseWriter, r *http.Request) {
	raw := strings.TrimSpace(r.URL.Query().Get("url"))
	u, err := url.Parse(raw)
	if err != nil || (u.Scheme != "http" && u.Scheme != "https") {
		writeErr(w, http.StatusBadRequest, "bad url")
		return
	}
	if !s.sources.AllowsHost(u.Hostname()) {
		writeErr(w, http.StatusForbidden, "host is not a known source")
		return
	}

	req, err := http.NewRequestWithContext(r.Context(), http.MethodGet, u.String(), nil)
	if err != nil {
		writeErr(w, http.StatusBadRequest, "bad url")
		return
	}
	req.Header.Set("User-Agent", s.settings.Get().ScrapeUserAgent)
	// Range is what makes seeking work: without forwarding it the client can only
	// ever stream a video from byte zero.
	if rng := r.Header.Get("Range"); rng != "" {
		req.Header.Set("Range", rng)
	}

	resp, err := s.scraper.HTTPClient().Do(req)
	if err != nil {
		writeErr(w, http.StatusBadGateway, "upstream fetch failed")
		return
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusPartialContent {
		writeErr(w, http.StatusBadGateway, fmt.Sprintf("upstream returned %d", resp.StatusCode))
		return
	}

	for _, h := range []string{"Content-Type", "Content-Length", "Content-Range", "Accept-Ranges", "Last-Modified"} {
		if v := resp.Header.Get(h); v != "" {
			w.Header().Set(h, v)
		}
	}
	// Remote media is immutable at its URL (4chan names files by upload timestamp),
	// so let the client cache it and stop re-fetching a thumbnail per scroll.
	w.Header().Set("Cache-Control", "private, max-age=3600")
	w.WriteHeader(resp.StatusCode)
	if _, err := io.Copy(w, resp.Body); err != nil {
		s.log.Debug("source stream interrupted", "url", u.Redacted(), "err", err)
	}
}

type sourceSaveReq struct {
	// Exactly one of these. MediaURL saves a single file; ItemID saves a multi-page
	// item (a comic), whose pages are resolved server-side.
	MediaURL string   `json:"mediaUrl"`
	ItemID   string   `json:"itemId"`
	PageURL  string   `json:"pageUrl"`
	Title    string   `json:"title"`
	Kind     string   `json:"kind"`
	Tags     []string `json:"tags"`
}

// handleSourceSave copies an item out of a remote source and into the library.
//
// Browsing streams from the origin and stores nothing; this is the one crossing
// point. It reuses the scrape importer rather than a second ingest path, so a saved
// item is indistinguishable from an imported one — same dedupe, same thumbnailing,
// same tagging, same kind recognition.
func (s *Server) handleSourceSave(w http.ResponseWriter, r *http.Request) {
	src, ok := s.sources.Get(r.PathValue("id"))
	if !ok {
		writeErr(w, http.StatusNotFound, "unknown source")
		return
	}
	var req sourceSaveReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeErr(w, http.StatusBadRequest, "invalid body")
		return
	}

	result := &models.ScrapeResult{
		Title:     req.Title,
		Tags:      req.Tags,
		SourceURL: req.PageURL,
		Kind:      req.Kind,
	}

	// Downloading is minutes of work behind a politeness delay; it must not be
	// abandoned just because the client stopped waiting for the answer.
	r, cancel := detachImport(r)
	defer cancel()

	// A comic's payload is its run of pages, which only the source can resolve.
	if req.Kind == string(models.KindComic) {
		if req.ItemID == "" {
			writeErr(w, http.StatusBadRequest, "saving a comic needs an itemId")
			return
		}
		ctx, cancel := context.WithTimeout(r.Context(), scrapeTimeout)
		pages, err := src.Pages(ctx, req.ItemID)
		cancel()
		if err != nil {
			writeErr(w, http.StatusBadGateway, err.Error())
			return
		}
		result.MediaURLs = pages
		id, err := s.importComic(r, result)
		if err != nil {
			s.log.Warn("source save comic failed", "source", src.ID(), "item", req.ItemID, "err", err)
			writeErr(w, http.StatusBadGateway, err.Error())
			return
		}
		writeJSON(w, http.StatusOK, map[string]any{"imported": []int64{id}, "count": 1})
		return
	}

	if req.MediaURL == "" {
		writeErr(w, http.StatusBadRequest, "need a mediaUrl")
		return
	}
	if u, err := url.Parse(req.MediaURL); err != nil || !s.sources.AllowsHost(u.Hostname()) {
		writeErr(w, http.StatusForbidden, "media is not on a known source")
		return
	}

	// Kind is left to recognition: the source's guess came from a file extension, and
	// the bytes we're about to store are better evidence than that.
	id, err := s.importOne(r, req.MediaURL, result, "")
	if err != nil {
		s.log.Warn("source save failed", "source", src.ID(), "url", req.MediaURL, "err", err)
		writeErr(w, http.StatusBadGateway, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"imported": []int64{id}, "count": 1})
}
