package scraper

import (
	"net/url"
	"path"
	"regexp"
	"strconv"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

// Comic detection. A comic page is structurally unlike every other page the
// scraper handles: the payload is an *ordered run of page images*, not a single
// hero asset. Nothing in the OpenGraph vocabulary says "this is a comic", so we
// score a handful of independent signals and require agreement between them.
//
// The bar is deliberately high. A false negative costs the user one click on the
// import dialog's type chip; a false positive silently zips somebody's photo
// album into a CBZ.

// minComicPages is the fewest page images a comic can plausibly have. Below
// this, a run of images is a gallery or a set of thumbnails.
const minComicPages = 4

// comicScoreThreshold is the score at which the signals below are taken to
// agree. Calibrated so no single weak signal can decide on its own: a "gallery"
// in the URL (+1) needs sequential page numbering (+2) to carry.
const comicScoreThreshold = 3

// strongPathWords name the format outright — a URL carrying one of these is
// about a comic and very little else.
var strongPathWords = []string{"comic", "manga", "doujin", "webtoon", "manhwa", "manhua", "chapter"}

// weakPathWords are suggestive but common on ordinary image pages.
var weakPathWords = []string{"gallery", "read", "album", "issue"}

var comicTitleWords = []string{"comic", "manga", "doujin", "chapter", "volume", " vol.", " ch."}

// readerWords appear in the class/id of the element wrapping a comic reader's
// page images.
var readerWords = []string{"page", "reader", "comic", "manga", "chapter", "gallery"}

// detectComic reports whether the document is a multi-page comic, returning its
// page images in reading (document) order.
func detectComic(doc *goquery.Document, u *url.URL) ([]string, bool) {
	pages := collectComicPages(doc)
	if len(pages) < minComicPages {
		return nil, false
	}

	score := pathWordScore(u)
	if isComicSchema(doc) {
		// An explicit machine-readable declaration outranks anything we can infer,
		// so it clears the threshold alone (given enough pages to be a comic).
		score += comicScoreThreshold
	}
	if looksSequential(pages) {
		score += 2
	}
	if hasReaderContainer(doc) {
		score++
	}
	title := strings.ToLower(strings.TrimSpace(doc.Find("title").First().Text()))
	if containsAny(title, comicTitleWords) {
		score++
	}
	return pages, score >= comicScoreThreshold
}

// pathWordScore weighs comic vocabulary in the host and path.
func pathWordScore(u *url.URL) int {
	hay := strings.ToLower(u.Hostname() + u.Path)
	if containsAny(hay, strongPathWords) {
		return 2
	}
	if containsAny(hay, weakPathWords) {
		return 1
	}
	return 0
}

// isComicSchema looks for an explicit machine-readable declaration: OpenGraph's
// og:type=book, or a schema.org Book/ComicStory/ComicIssue microdata itemtype.
func isComicSchema(doc *goquery.Document) bool {
	if strings.EqualFold(metaProp(doc, "og:type"), "book") {
		return true
	}
	found := false
	doc.Find("[itemtype]").EachWithBreak(func(_ int, s *goquery.Selection) bool {
		t, _ := s.Attr("itemtype")
		t = strings.ToLower(t)
		if strings.Contains(t, "schema.org/book") ||
			strings.Contains(t, "schema.org/comicstory") ||
			strings.Contains(t, "schema.org/comicissue") {
			found = true
			return false
		}
		return true
	})
	return found
}

// hasReaderContainer looks for the wrapper a comic reader puts its pages in.
func hasReaderContainer(doc *goquery.Document) bool {
	found := false
	doc.Find(`[class*="page"], [class*="reader"], [id*="reader"], [class*="chapter"], [id*="gallery"]`).
		EachWithBreak(func(_ int, s *goquery.Selection) bool {
			if s.Find("img").Length() >= minComicPages {
				found = true
				return false
			}
			return true
		})
	return found
}

// collectComicPages returns candidate page images in document order. Comic
// readers lazy-load aggressively, so the real source often hides in a data-*
// attribute while src holds a spinner.
func collectComicPages(doc *goquery.Document) []string {
	seen := map[string]bool{}
	var out []string
	doc.Find("img").Each(func(_ int, s *goquery.Selection) {
		if !looksLikeContentImage(s) {
			return
		}
		for _, attr := range []string{"data-src", "data-original", "data-lazy-src", "src"} {
			v, ok := s.Attr(attr)
			if !ok {
				continue
			}
			v = strings.TrimSpace(v)
			if v == "" || strings.HasPrefix(v, "data:") || seen[v] {
				return
			}
			seen[v] = true
			out = append(out, v)
			return
		}
	})
	return out
}

var lastDigitsRe = regexp.MustCompile(`^(.*?)(\d+)(\D*)$`)

// pageTemplate splits a URL's filename around its last run of digits, returning
// the surrounding text with the number replaced by "#" plus the number itself.
// "p012.jpg" → ("p#", 12); "003.webp" → ("#", 3).
//
// The template is what separates a numbered page from a coincidence. A content
// hash like "a3f9c2b1d4e5.jpg" also ends in digits, and across two such names
// those trailing digits may well ascend — but their templates ("a3f9c2b1d4e#"
// and "b7e1a0c3f2d#") differ, whereas real pages from one comic share theirs.
func pageTemplate(raw string) (template string, n int, ok bool) {
	p := raw
	if u, err := url.Parse(raw); err == nil {
		p = u.Path
	}
	name := path.Base(p)
	name = strings.TrimSuffix(name, path.Ext(name))

	m := lastDigitsRe.FindStringSubmatch(name)
	if m == nil {
		return "", 0, false
	}
	n, err := strconv.Atoi(m[2])
	if err != nil {
		return "", 0, false // overflow: an id, not a page number
	}
	return m[1] + "#" + m[3], n, true
}

// looksSequential reports whether the images' filenames read like the numbered
// pages of one comic: most of them sharing a filename template, and their
// numbers mostly ascending in document order.
//
// Both halves matter. A shared template alone would accept a grid of thumbnails
// named for nine different comics; ascending numbers alone would accept content
// hashes that happen to sort that way.
func looksSequential(urls []string) bool {
	byTemplate := make(map[string][]int)
	var order []string // first-seen template order, so ties break deterministically
	for _, u := range urls {
		tpl, n, ok := pageTemplate(u)
		if !ok {
			continue
		}
		if _, seen := byTemplate[tpl]; !seen {
			order = append(order, tpl)
		}
		byTemplate[tpl] = append(byTemplate[tpl], n)
	}

	// The comic is whichever template most of the images agree on.
	var nums []int
	for _, tpl := range order {
		if ns := byTemplate[tpl]; len(ns) > len(nums) {
			nums = ns
		}
	}
	if len(nums) < 2 || len(nums)*10 < len(urls)*6 { // fewer than 60% agree
		return false
	}

	ascending := 0
	for i := 1; i < len(nums); i++ {
		if nums[i] > nums[i-1] {
			ascending++
		}
	}
	return ascending*10 >= (len(nums)-1)*7 // at least 70% of steps go forward
}

func containsAny(haystack string, needles []string) bool {
	for _, n := range needles {
		if strings.Contains(haystack, n) {
			return true
		}
	}
	return false
}
