package api

import (
	"encoding/json"
	"net/http"

	"github.com/youruser/oppailib/internal/crypto"
	"github.com/youruser/oppailib/internal/db"
	"github.com/youruser/oppailib/internal/models"
)

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
	res, err := s.scraper.Scrape(r.Context(), req.URL)
	if err != nil {
		s.log.Warn("scrape failed", "url", req.URL, "err", err)
		writeErr(w, http.StatusBadGateway, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, res)
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

	id, _, err := s.db.InsertMedia(r.Context(), &db.MediaRow{
		Kind:      kindOrDefault(result.Kind, kindFromFilename(dl.Filename)),
		SHA256:    put.SHA256,
		Size:      put.Size,
		BlobPath:  put.RelPath,
		TitleEnc:  titleEnc,
		SourceEnc: sourceEnc,
	})
	if err != nil {
		return 0, err
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
