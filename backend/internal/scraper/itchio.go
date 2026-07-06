package scraper

import (
	"net/url"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/youruser/oppailib/internal/models"
)

// ItchParser extracts game metadata from an itch.io project page: cover art,
// description, screenshots, and tags. It sets Kind=game and points DownloadURL at
// the itch page (itch gates the actual file behind an expiring, CSRF-protected
// AJAX call, so we surface the page as the place to get it rather than fetching
// the binary). Generic game sites fall back to the OpenGraph parser.
type ItchParser struct{}

func (ItchParser) Name() string { return "itch.io" }

func (ItchParser) Match(u *url.URL) bool {
	host := strings.ToLower(u.Hostname())
	return host == "itch.io" || strings.HasSuffix(host, ".itch.io")
}

func (ItchParser) Parse(doc *goquery.Document, u *url.URL) (*models.ScrapeResult, error) {
	res := &models.ScrapeResult{Kind: string(models.KindGame)}

	res.Title = firstNonEmpty(
		metaProp(doc, "og:title"),
		strings.TrimSpace(doc.Find("h1.game_title").First().Text()),
		strings.TrimSpace(doc.Find("title").First().Text()),
	)
	res.Description = firstNonEmpty(
		metaProp(doc, "og:description"),
		metaName(doc, "description"),
	)

	// Cover art: the OpenGraph image is itch's game thumbnail/banner.
	res.Cover = firstNonEmpty(
		metaProp(doc, "og:image"),
		metaName(doc, "twitter:image"),
	)
	if res.Cover != "" {
		res.MediaURLs = append(res.MediaURLs, res.Cover)
	}

	// Screenshots: the lightbox anchors hold full-res images; fall back to the
	// <img> sources when the markup differs.
	seen := map[string]bool{}
	addShot := func(v string) {
		v = strings.TrimSpace(v)
		if v == "" || strings.HasPrefix(v, "data:") || seen[v] {
			return
		}
		seen[v] = true
		res.Screenshots = append(res.Screenshots, v)
	}
	doc.Find(".screenshot_list a[href]").Each(func(_ int, s *goquery.Selection) {
		if href, ok := s.Attr("href"); ok {
			addShot(href)
		}
	})
	if len(res.Screenshots) == 0 {
		doc.Find(".screenshot_list img, .game_screenshots img").Each(func(_ int, s *goquery.Selection) {
			for _, attr := range []string{"data-lightbox_src", "src"} {
				if v, ok := s.Attr(attr); ok && v != "" {
					addShot(v)
					break
				}
			}
		})
	}

	// Tags / genre live in the info panel as links to itch tag pages.
	tagSeen := map[string]bool{}
	doc.Find(`.game_info_panel_widget a[href*="/tag-"], .game_info_panel_widget a[href*="/games/tag-"]`).
		Each(func(_ int, s *goquery.Selection) {
			t := strings.TrimSpace(s.Text())
			if t != "" && !tagSeen[strings.ToLower(t)] {
				tagSeen[strings.ToLower(t)] = true
				res.Tags = append(res.Tags, t)
			}
		})

	// itch hosts the download itself; the page is the place to get it. If the
	// project links out to an external host, prefer that.
	res.DownloadURL = u.String()
	if href, ok := doc.Find(`.buy_row a.button[href], a.external_download[href]`).First().Attr("href"); ok {
		if h := strings.TrimSpace(href); strings.HasPrefix(h, "http") {
			res.DownloadURL = h
		}
	}

	return res, nil
}
