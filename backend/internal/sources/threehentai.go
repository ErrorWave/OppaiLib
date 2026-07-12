package sources

import (
	"context"
	"fmt"
	"regexp"
	"strconv"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

// ThreeHentai browses 3hentai's gallery listings.
//
// Unlike 4chan there is no API, so this reads the listing HTML. The site follows the
// familiar gallery layout — a grid of covers, each an anchor to /d/{id} wrapping a
// (lazy-loaded) thumbnail — so the parse keys off *that shape* rather than off any
// particular class name: match the anchors that point at a gallery and take whatever
// image and caption each one contains. A restyle that renames classes leaves this
// working; only a change to the underlying link structure would break it.
//
// Reading a gallery's pages is delegated to the scraper, which already knows how to
// find a comic's page images (and how to prefer the full-res source over the
// thumbnail), so the two can't disagree about what a page is.
type ThreeHentai struct {
	pages   PageFetcher
	baseURL string // overridable in tests
}

func NewThreeHentai(pages PageFetcher) *ThreeHentai {
	return &ThreeHentai{pages: pages, baseURL: "https://3hentai.net"}
}

func (t *ThreeHentai) ID() string   { return "3hentai" }
func (t *ThreeHentai) Name() string { return "3hentai" }

func (t *ThreeHentai) Feeds() []Feed {
	return []Feed{
		{ID: "recent", Label: "Recent"},
		{ID: "popular", Label: "Popular"},
	}
}

func (t *ThreeHentai) Hosts() []string {
	// The covers and pages are served from CDN subdomains, so the whole domain is
	// allowed rather than just the www host.
	return []string{"3hentai.net", "*.3hentai.net"}
}

// galleryPath matches the canonical link to one gallery: /d/12345.
var galleryPath = regexp.MustCompile(`^/d/(\d+)`)

func (t *ThreeHentai) Browse(ctx context.Context, feed, cursor string) (*Listing, error) {
	page := 1
	if cursor != "" {
		n, err := strconv.Atoi(cursor)
		if err != nil || n < 1 {
			return nil, fmt.Errorf("bad cursor %q", cursor)
		}
		page = n
	}

	var url string
	switch feed {
	case "recent", "":
		url = fmt.Sprintf("%s/?page=%d", t.baseURL, page)
	case "popular":
		url = fmt.Sprintf("%s/popular?page=%d", t.baseURL, page)
	default:
		return nil, fmt.Errorf("unknown feed %q", feed)
	}

	body, err := t.pages.Document(ctx, url)
	if err != nil {
		return nil, err
	}
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(body))
	if err != nil {
		return nil, fmt.Errorf("parse 3hentai listing: %w", err)
	}

	out := &Listing{}
	seen := map[string]bool{}
	doc.Find(`a[href^="/d/"]`).Each(func(_ int, a *goquery.Selection) {
		href, _ := a.Attr("href")
		m := galleryPath.FindStringSubmatch(href)
		if m == nil {
			return
		}
		id := m[1]
		// A listing links each gallery more than once (cover and caption are separate
		// anchors on some layouts). First one that carries a thumbnail wins.
		if seen[id] {
			return
		}
		img := a.Find("img").First()
		if img.Length() == 0 {
			return
		}
		thumb := firstAttr(img, "data-src", "data-original", "data-lazy-src", "src")
		if thumb == "" {
			return
		}
		seen[id] = true

		title := strings.TrimSpace(a.Find(".caption").First().Text())
		if title == "" {
			title, _ = img.Attr("alt")
		}
		if title = strings.TrimSpace(title); title == "" {
			title = "Gallery " + id
		}

		out.Items = append(out.Items, Item{
			ID:       id,
			Title:    truncate(title, 120),
			Kind:     "comic",
			ThumbURL: t.absolute(thumb),
			PageURL:  t.galleryURL(id),
		})
	})

	// No items means we've run off the end of the listing; an empty cursor stops the
	// client paging into nothing.
	if len(out.Items) > 0 {
		out.Cursor = strconv.Itoa(page + 1)
	}
	return out, nil
}

// Pages resolves a gallery's page images by scraping its detail page.
func (t *ThreeHentai) Pages(ctx context.Context, itemID string) ([]string, error) {
	if !isDigits(itemID) {
		return nil, fmt.Errorf("bad gallery id %q", itemID)
	}
	return t.pages.ComicPages(ctx, t.galleryURL(itemID))
}

func (t *ThreeHentai) galleryURL(id string) string { return t.baseURL + "/d/" + id }

// absolute resolves a protocol-relative or root-relative URL against the site.
func (t *ThreeHentai) absolute(u string) string {
	switch {
	case strings.HasPrefix(u, "//"):
		return "https:" + u
	case strings.HasPrefix(u, "/"):
		return t.baseURL + u
	default:
		return u
	}
}

func firstAttr(s *goquery.Selection, attrs ...string) string {
	for _, a := range attrs {
		if v, ok := s.Attr(a); ok {
			if v = strings.TrimSpace(v); v != "" && !strings.HasPrefix(v, "data:") {
				return v
			}
		}
	}
	return ""
}

func isDigits(s string) bool {
	if s == "" {
		return false
	}
	for _, r := range s {
		if r < '0' || r > '9' {
			return false
		}
	}
	return true
}
