package scraper

import (
	"net/url"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/youruser/oppailib/internal/models"
)

// GenericParser extracts metadata from OpenGraph and standard <meta> tags. It
// matches any URL and serves as the fallback + the reference for custom parsers.
type GenericParser struct{}

func (GenericParser) Name() string          { return "generic-opengraph" }
func (GenericParser) Match(*url.URL) bool    { return true }

func (GenericParser) Parse(doc *goquery.Document, u *url.URL) (*models.ScrapeResult, error) {
	res := &models.ScrapeResult{Kind: string(models.KindImage)}

	res.Title = firstNonEmpty(
		metaProp(doc, "og:title"),
		metaName(doc, "twitter:title"),
		strings.TrimSpace(doc.Find("title").First().Text()),
	)
	res.Description = firstNonEmpty(
		metaProp(doc, "og:description"),
		metaName(doc, "description"),
	)

	// Media: prefer og:video, then og:image, then twitter:image.
	if v := metaProp(doc, "og:video"); v != "" {
		res.MediaURLs = append(res.MediaURLs, v)
		res.Kind = string(models.KindVideo)
	}
	if v := metaProp(doc, "og:video:secure_url"); v != "" {
		res.MediaURLs = append(res.MediaURLs, v)
		res.Kind = string(models.KindVideo)
	}
	doc.Find(`meta[property="og:image"]`).Each(func(_ int, s *goquery.Selection) {
		if c, ok := s.Attr("content"); ok && c != "" {
			res.MediaURLs = append(res.MediaURLs, c)
		}
	})
	if len(res.MediaURLs) == 0 {
		if v := metaName(doc, "twitter:image"); v != "" {
			res.MediaURLs = append(res.MediaURLs, v)
		}
	}

	// Tags from meta keywords / article:tag.
	if kw := metaName(doc, "keywords"); kw != "" {
		for _, t := range strings.Split(kw, ",") {
			if t = strings.TrimSpace(t); t != "" {
				res.Tags = append(res.Tags, t)
			}
		}
	}
	doc.Find(`meta[property="article:tag"]`).Each(func(_ int, s *goquery.Selection) {
		if c, ok := s.Attr("content"); ok && c != "" {
			res.Tags = append(res.Tags, strings.TrimSpace(c))
		}
	})

	return res, nil
}

func metaProp(doc *goquery.Document, prop string) string {
	c, _ := doc.Find(`meta[property="` + prop + `"]`).First().Attr("content")
	return strings.TrimSpace(c)
}

func metaName(doc *goquery.Document, name string) string {
	c, _ := doc.Find(`meta[name="` + name + `"]`).First().Attr("content")
	return strings.TrimSpace(c)
}

func firstNonEmpty(vals ...string) string {
	for _, v := range vals {
		if strings.TrimSpace(v) != "" {
			return v
		}
	}
	return ""
}
