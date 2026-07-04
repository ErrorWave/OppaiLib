// Package scraper fetches a URL and extracts media + metadata using pluggable
// parsers. Site-specific parsers are defined declaratively in YAML (see
// yamlparser.go) so new sites can be added without recompiling. A generic
// OpenGraph/<meta> parser (generic.go) is the always-available fallback and the
// reference implementation for how a parser behaves.
//
// This is the user's own tool for their own use: it rate-limits per host and
// honors robots.txt at a technical level. It ships no hardcoded commercial site
// parsers.
package scraper

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"sync"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/youruser/oppailib/internal/models"
)

// Parser turns a parsed HTML document into a ScrapeResult.
type Parser interface {
	Name() string
	// Match reports whether this parser handles the given URL.
	Match(u *url.URL) bool
	Parse(doc *goquery.Document, u *url.URL) (*models.ScrapeResult, error)
}

// Engine orchestrates fetch → parse. It holds registered parsers (site-specific
// first, generic last), a polite rate limiter, and an optional robots checker.
type Engine struct {
	client    *http.Client
	userAgent string
	delay     time.Duration
	site      []Parser // ordered, site-specific
	generic   Parser
	robots    *robotsCache

	mu       sync.Mutex
	lastHost map[string]time.Time
}

type Options struct {
	UserAgent      string
	Delay          time.Duration
	RespectRobots  bool
	SiteParsers    []Parser
}

func New(opts Options) *Engine {
	client := &http.Client{Timeout: 30 * time.Second}
	e := &Engine{
		client:    client,
		userAgent: opts.UserAgent,
		delay:     opts.Delay,
		site:      opts.SiteParsers,
		generic:   &GenericParser{},
		lastHost:  make(map[string]time.Time),
	}
	if opts.RespectRobots {
		e.robots = newRobotsCache(client, opts.UserAgent)
	}
	return e
}

// Register appends a site-specific parser (takes priority over the generic one).
func (e *Engine) Register(p Parser) { e.site = append(e.site, p) }

// pick returns the first matching site parser, else the generic parser.
func (e *Engine) pick(u *url.URL) Parser {
	for _, p := range e.site {
		if p.Match(u) {
			return p
		}
	}
	return e.generic
}

// Scrape fetches rawURL and returns extracted metadata + media links.
func (e *Engine) Scrape(ctx context.Context, rawURL string) (*models.ScrapeResult, error) {
	u, err := url.Parse(strings.TrimSpace(rawURL))
	if err != nil {
		return nil, fmt.Errorf("bad url: %w", err)
	}
	if u.Scheme != "http" && u.Scheme != "https" {
		return nil, fmt.Errorf("unsupported scheme %q", u.Scheme)
	}
	// Fast path: the URL points straight at a media file (Discord CDN links,
	// direct image/video hotlinks, …). No HTML to parse — use it as-is.
	if kind := mediaKindFromPath(u.Path); kind != "" {
		return &models.ScrapeResult{
			Kind:      string(kind),
			Title:     titleFromURL(u),
			MediaURLs: []string{u.String()},
			SourceURL: u.String(),
		}, nil
	}
	if e.robots != nil {
		allowed, err := e.robots.allowed(ctx, u)
		if err == nil && !allowed {
			return nil, fmt.Errorf("scrape: blocked by robots.txt for %s", u.Path)
		}
	}
	e.throttle(u.Host)

	resp, err := e.get(ctx, u)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("scrape: %s returned %d", u, resp.StatusCode)
	}

	// The server may hand back media directly (extensionless CDN links that only
	// reveal their type via Content-Type). Treat that as a direct-media result.
	final := resp.Request.URL // follow any redirects the client took
	if kind := mediaKindFromContentType(resp.Header.Get("Content-Type")); kind != "" {
		return &models.ScrapeResult{
			Kind:      string(kind),
			Title:     titleFromURL(final),
			MediaURLs: []string{final.String()},
			SourceURL: final.String(),
		}, nil
	}

	doc, err := goquery.NewDocumentFromReader(io.LimitReader(resp.Body, 16<<20))
	if err != nil {
		return nil, err
	}
	res, err := e.pick(u).Parse(doc, u)
	if err != nil {
		return nil, err
	}
	res.SourceURL = u.String()
	res.MediaURLs = resolveAll(final, res.MediaURLs)
	return res, nil
}

// get issues a browser-like GET so sites that gate OpenGraph tags (or block
// unknown agents outright) still serve us the real page.
func (e *Engine) get(ctx context.Context, u *url.URL) (*http.Response, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, u.String(), nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", e.userAgent)
	req.Header.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")
	req.Header.Set("Accept-Language", "en-US,en;q=0.9")
	return e.client.Do(req)
}

// throttle enforces a per-host minimum delay between requests.
func (e *Engine) throttle(host string) {
	e.mu.Lock()
	last, ok := e.lastHost[host]
	wait := time.Duration(0)
	if ok {
		if elapsed := time.Since(last); elapsed < e.delay {
			wait = e.delay - elapsed
		}
	}
	e.lastHost[host] = time.Now().Add(wait)
	e.mu.Unlock()
	if wait > 0 {
		time.Sleep(wait)
	}
}

// resolveAll turns possibly-relative media URLs into absolute ones.
func resolveAll(base *url.URL, links []string) []string {
	out := make([]string, 0, len(links))
	seen := map[string]bool{}
	for _, l := range links {
		ref, err := url.Parse(l)
		if err != nil {
			continue
		}
		abs := base.ResolveReference(ref).String()
		if !seen[abs] {
			seen[abs] = true
			out = append(out, abs)
		}
	}
	return out
}
