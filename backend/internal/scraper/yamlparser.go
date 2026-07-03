package scraper

import (
	"fmt"
	"net/url"
	"os"
	"path/filepath"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/youruser/oppailib/internal/models"
	"gopkg.in/yaml.v3"
)

// Selector describes how to pull a value out of the document.
//
//	selector: "h1.title"     CSS selector
//	attr:     "text"         "text" | "html" | an attribute name (e.g. "src")
type Selector struct {
	Selector string `yaml:"selector"`
	Attr     string `yaml:"attr"`
}

// yamlSpec is the on-disk parser definition (one .yaml file per site).
type yamlSpec struct {
	Name       string   `yaml:"name"`
	MatchHosts []string `yaml:"match_hosts"`
	Kind       string   `yaml:"kind"`
	Selectors  struct {
		Title       Selector `yaml:"title"`
		Description Selector `yaml:"description"`
		Tags        Selector `yaml:"tags"`
		Performers  Selector `yaml:"performers"`
		Media       Selector `yaml:"media"`
	} `yaml:"selectors"`
}

// YAMLParser is a Parser driven entirely by a yamlSpec.
type YAMLParser struct{ spec yamlSpec }

func (p *YAMLParser) Name() string { return p.spec.Name }

func (p *YAMLParser) Match(u *url.URL) bool {
	host := strings.ToLower(u.Hostname())
	for _, pat := range p.spec.MatchHosts {
		if hostGlob(strings.ToLower(pat), host) {
			return true
		}
	}
	return false
}

func (p *YAMLParser) Parse(doc *goquery.Document, _ *url.URL) (*models.ScrapeResult, error) {
	s := p.spec.Selectors
	kind := p.spec.Kind
	if kind == "" {
		kind = string(models.KindImage)
	}
	res := &models.ScrapeResult{
		Kind:        kind,
		Title:       extractOne(doc, s.Title),
		Description: extractOne(doc, s.Description),
		Tags:        extractMany(doc, s.Tags),
		Performers:  extractMany(doc, s.Performers),
		MediaURLs:   extractMany(doc, s.Media),
	}
	return res, nil
}

func extractOne(doc *goquery.Document, sel Selector) string {
	if sel.Selector == "" {
		return ""
	}
	return valueOf(doc.Find(sel.Selector).First(), sel.Attr)
}

func extractMany(doc *goquery.Document, sel Selector) []string {
	if sel.Selector == "" {
		return nil
	}
	var out []string
	doc.Find(sel.Selector).Each(func(_ int, s *goquery.Selection) {
		if v := strings.TrimSpace(valueOf(s, sel.Attr)); v != "" {
			out = append(out, v)
		}
	})
	return out
}

func valueOf(s *goquery.Selection, attr string) string {
	switch attr {
	case "", "text":
		return strings.TrimSpace(s.Text())
	case "html":
		h, _ := s.Html()
		return strings.TrimSpace(h)
	default:
		v, _ := s.Attr(attr)
		return strings.TrimSpace(v)
	}
}

// hostGlob supports exact hosts and a single leading "*." wildcard.
func hostGlob(pat, host string) bool {
	if pat == host {
		return true
	}
	if suffix, ok := strings.CutPrefix(pat, "*."); ok {
		return host == suffix || strings.HasSuffix(host, "."+suffix)
	}
	return false
}

// LoadDir reads every *.yaml/*.yml parser definition from dir. A missing dir is
// not an error (the generic parser still works).
func LoadDir(dir string) ([]Parser, error) {
	entries, err := os.ReadDir(dir)
	if os.IsNotExist(err) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	var parsers []Parser
	for _, e := range entries {
		if e.IsDir() {
			continue
		}
		ext := strings.ToLower(filepath.Ext(e.Name()))
		if ext != ".yaml" && ext != ".yml" {
			continue
		}
		data, err := os.ReadFile(filepath.Join(dir, e.Name()))
		if err != nil {
			return nil, err
		}
		var spec yamlSpec
		if err := yaml.Unmarshal(data, &spec); err != nil {
			return nil, fmt.Errorf("parser %s: %w", e.Name(), err)
		}
		if spec.Name == "" {
			spec.Name = strings.TrimSuffix(e.Name(), ext)
		}
		parsers = append(parsers, &YAMLParser{spec: spec})
	}
	return parsers, nil
}
