package api

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/url"
	"strings"
	"sync"
	"time"

	"github.com/youruser/oppailib/internal/crypto"
	"github.com/youruser/oppailib/internal/db"
	"github.com/youruser/oppailib/internal/models"
)

const maxBulkURLs = 50

// scrapeTimeout bounds a single preview fetch (robots + page, including the
// polite per-host wait). Because every URL in a bulk request is capped here and
// they run concurrently, the whole batch can't outlast this — a slow or dead
// host can't leave the UI stuck on "Fetching…". Large same-host batches at a
// high OPPAI_SCRAPE_DELAY_MS may hit this on the tail; lower the delay if so.
const scrapeTimeout = 30 * time.Second

type scrapeReq struct {
	URL string `json:"url"`
}

// handleScrape fetches a URL and returns extracted metadata + candidate media
// URLs without importing anything (a "preview" for the user to confirm).
func (s *Server) handleScrape(w http.ResponseWriter, r *http.Request) {
	var req scrapeReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.URL == "" {
		writeErr(w, http.StatusBadRequest, "missing url")
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), scrapeTimeout)
	defer cancel()
	res, err := s.scraper.Scrape(ctx, req.URL)
	if err != nil {
		s.log.Warn("scrape failed", "url", req.URL, "err", err)
		writeErr(w, http.StatusBadGateway, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, res)
}

type scrapeBulkReq struct {
	URLs []string `json:"urls"`
}

type scrapeBulkItem struct {
	URL    string               `json:"url"`
	Result *models.ScrapeResult `json:"result,omitempty"`
	Error  string               `json:"error,omitempty"`
}

// handleScrapeBulk previews several page URLs in one request. Each URL is
// fetched independently; a failure on one doesn't sink the others. The scraper
// engine still throttles per host, so this stays polite.
func (s *Server) handleScrapeBulk(w http.ResponseWriter, r *http.Request) {
	var req scrapeBulkReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeErr(w, http.StatusBadRequest, "invalid body")
		return
	}
	urls := dedupeNonEmpty(req.URLs)
	if len(urls) == 0 {
		writeErr(w, http.StatusBadRequest, "no urls")
		return
	}
	if len(urls) > maxBulkURLs {
		writeErr(w, http.StatusBadRequest, "too many urls")
		return
	}

	items := make([]scrapeBulkItem, len(urls))
	var wg sync.WaitGroup
	for i, u := range urls {
		wg.Add(1)
		go func(i int, u string) {
			defer wg.Done()
			items[i].URL = u
			ctx, cancel := context.WithTimeout(r.Context(), scrapeTimeout)
			defer cancel()
			res, err := s.scraper.Scrape(ctx, u)
			if err != nil {
				items[i].Error = err.Error()
				s.log.Warn("bulk scrape failed", "url", u, "err", err)
				return
			}
			items[i].Result = res
		}(i, u)
	}
	wg.Wait()
	writeJSON(w, http.StatusOK, map[string]any{"items": items})
}

// proxyMaxBytes caps a single proxied asset so a huge/hostile file can't exhaust
// server memory or bandwidth while previewing.
const proxyMaxBytes = 64 << 20

// handleScrapeProxy streams a remote asset through the polite scraper client so
// the import dialog can preview candidate media the browser can't load directly
// — most image hosts block hotlinking (they reject requests with no/foreign
// Referer). Routing previews through here means what the user sees is exactly
// what import will fetch. Auth-gated; http(s) only.
func (s *Server) handleScrapeProxy(w http.ResponseWriter, r *http.Request) {
	raw := strings.TrimSpace(r.URL.Query().Get("url"))
	u, err := url.Parse(raw)
	if err != nil || (u.Scheme != "http" && u.Scheme != "https") {
		writeErr(w, http.StatusBadRequest, "bad url")
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), scrapeTimeout)
	defer cancel()
	dl, err := s.scraper.Download(ctx, u.String())
	if err != nil {
		writeErr(w, http.StatusBadGateway, err.Error())
		return
	}
	defer dl.Body.Close()
	ct := dl.ContentType
	if ct == "" {
		ct = "application/octet-stream"
	}
	w.Header().Set("Content-Type", ct)
	w.Header().Set("Cache-Control", "private, max-age=300")
	_, _ = io.Copy(w, io.LimitReader(dl.Body, proxyMaxBytes))
}

func dedupeNonEmpty(in []string) []string {
	seen := map[string]bool{}
	out := make([]string, 0, len(in))
	for _, v := range in {
		v = strings.TrimSpace(v)
		if v == "" || seen[v] {
			continue
		}
		seen[v] = true
		out = append(out, v)
	}
	return out
}

type scrapeImportReq struct {
	URL        string   `json:"url"`
	MediaURLs  []string `json:"mediaUrls"`  // optional subset chosen by the user
	Title      string   `json:"title"`
	Tags       []string `json:"tags"`
}

// handleScrapeImport scrapes (or takes provided media URLs), downloads each
// asset into the encrypted store, and creates media rows + tags.
func (s *Server) handleScrapeImport(w http.ResponseWriter, r *http.Request) {
	var req scrapeImportReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeErr(w, http.StatusBadRequest, "invalid body")
		return
	}

	result := &models.ScrapeResult{Title: req.Title, Tags: req.Tags, MediaURLs: req.MediaURLs, SourceURL: req.URL}
	if len(result.MediaURLs) == 0 && req.URL != "" {
		scraped, err := s.scraper.Scrape(r.Context(), req.URL)
		if err != nil {
			writeErr(w, http.StatusBadGateway, err.Error())
			return
		}
		result = scraped
		if req.Title != "" {
			result.Title = req.Title
		}
		result.Tags = append(result.Tags, req.Tags...)
	}

	imported := make([]int64, 0, len(result.MediaURLs))
	for _, mu := range result.MediaURLs {
		id, err := s.importOne(r, mu, result)
		if err != nil {
			s.log.Warn("import media failed", "url", mu, "err", err)
			continue
		}
		imported = append(imported, id)
	}
	writeJSON(w, http.StatusOK, map[string]any{"imported": imported, "count": len(imported)})
}

func (s *Server) importOne(r *http.Request, mediaURL string, result *models.ScrapeResult) (int64, error) {
	dl, err := s.scraper.Download(r.Context(), mediaURL)
	if err != nil {
		return 0, err
	}
	defer dl.Body.Close()

	put, err := s.store.Put(dl.Body)
	if err != nil {
		return 0, err
	}

	title := result.Title
	if title == "" {
		title = dl.Filename
	}
	titleEnc, _ := crypto.SealBytes(s.kek, []byte(title), []byte("title"))
	var sourceEnc []byte
	if result.SourceURL != "" {
		sourceEnc, _ = crypto.SealBytes(s.kek, []byte(result.SourceURL), []byte("source"))
	}

	kind := kindOrDefault(result.Kind, kindFromFilename(dl.Filename))
	id, existed, err := s.db.InsertMedia(r.Context(), &db.MediaRow{
		Kind:      kind,
		SHA256:    put.SHA256,
		Size:      put.Size,
		BlobPath:  put.RelPath,
		TitleEnc:  titleEnc,
		SourceEnc: sourceEnc,
	})
	if err != nil {
		return 0, err
	}
	if !existed {
		s.generateThumbAsync(id, put.RelPath, kind, 0)
	}
	// Attach scraped tags.
	for _, t := range result.Tags {
		if err := s.db.AddTag(r.Context(), id, t, "general", "scrape", 0); err != nil {
			s.log.Warn("add scraped tag", "tag", t, "err", err)
		}
	}
	return id, nil
}

func kindOrDefault(kind string, def models.MediaKind) string {
	if kind != "" {
		return kind
	}
	return string(def)
}
