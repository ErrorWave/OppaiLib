package sources

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"
)

// ── 4chan ───────────────────────────────────────────────────────────────────

// One board index with: a video post, an image post, and a text-only post that must
// be skipped because it has no upload.
const fourChanIndexJSON = `{"threads":[{"posts":[
  {"no":1001,"tim":1600000000001,"ext":".webm","filename":"clip","w":1280,"h":720,"sub":"Cool thread"},
  {"no":1002,"tim":1600000000002,"ext":".jpg","filename":"pic","w":800,"h":600},
  {"no":1003,"com":"just a reply, no file"}
]}]}`

func newFourChanStub(t *testing.T) (*FourChan, *httptest.Server) {
	t.Helper()
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/gif/1.json" {
			http.NotFound(w, r)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(fourChanIndexJSON))
	}))
	f := NewFourChan(srv.Client())
	f.apiHost = srv.URL
	f.cdnHost = "https://i.4cdn.org"
	return f, srv
}

func TestFourChanBrowse(t *testing.T) {
	f, srv := newFourChanStub(t)
	defer srv.Close()

	got, err := f.Browse(context.Background(), "gif", "")
	if err != nil {
		t.Fatalf("Browse: %v", err)
	}
	if len(got.Items) != 2 {
		t.Fatalf("items = %d, want 2 (the text-only post has no file)", len(got.Items))
	}

	v := got.Items[0]
	if v.Kind != "video" {
		t.Errorf("webm kind = %q, want video", v.Kind)
	}
	if v.MediaURL != "https://i.4cdn.org/gif/1600000000001.webm" {
		t.Errorf("media url = %q", v.MediaURL)
	}
	// 4chan thumbnails are always JPEG, even for a webm.
	if v.ThumbURL != "https://i.4cdn.org/gif/1600000000001s.jpg" {
		t.Errorf("thumb url = %q, want the s.jpg form", v.ThumbURL)
	}
	// The OP's subject titles every file in the thread.
	if v.Title != "Cool thread" {
		t.Errorf("title = %q, want the thread subject", v.Title)
	}
	if got.Items[1].Kind != "image" {
		t.Errorf("jpg kind = %q, want image", got.Items[1].Kind)
	}
}

func TestFourChanPaginates(t *testing.T) {
	f, srv := newFourChanStub(t)
	defer srv.Close()

	got, err := f.Browse(context.Background(), "gif", "")
	if err != nil {
		t.Fatalf("Browse: %v", err)
	}
	if got.Cursor != "2" {
		t.Errorf("cursor = %q, want 2", got.Cursor)
	}
}

// The API only serves pages 1–10, so the cursor must stop rather than walk off.
func TestFourChanStopsAtLastPage(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte(`{"threads":[]}`))
	}))
	defer srv.Close()
	f := NewFourChan(srv.Client())
	f.apiHost = srv.URL

	got, err := f.Browse(context.Background(), "gif", "10")
	if err != nil {
		t.Fatalf("Browse: %v", err)
	}
	if got.Cursor != "" {
		t.Errorf("cursor at last page = %q, want empty", got.Cursor)
	}
}

func TestFourChanRejectsUnknownBoard(t *testing.T) {
	f, srv := newFourChanStub(t)
	defer srv.Close()
	if _, err := f.Browse(context.Background(), "not-a-board", ""); err == nil {
		t.Fatal("browsing an unknown board should fail")
	}
}

// ── 3hentai ─────────────────────────────────────────────────────────────────

// stubFetcher stands in for the scraper.
type stubFetcher struct {
	html  string
	pages []string
}

func (s *stubFetcher) Client() *http.Client { return http.DefaultClient }
func (s *stubFetcher) Document(context.Context, string) (string, error) {
	return s.html, nil
}
func (s *stubFetcher) ComicPages(context.Context, string) ([]string, error) {
	return s.pages, nil
}

const threeHentaiListing = `<html><body>
  <div class="gallery">
    <a href="/d/12345" class="cover">
      <img class="lazyload" data-src="//cdn.3hentai.net/t/12345/cover.jpg" alt="First Book">
    </a>
  </div>
  <div class="gallery">
    <a href="/d/67890" class="cover">
      <img src="/t/67890/cover.jpg">
      <div class="caption">Second Book</div>
    </a>
  </div>
</body></html>`

func TestThreeHentaiBrowse(t *testing.T) {
	th := NewThreeHentai(&stubFetcher{html: threeHentaiListing})

	got, err := th.Browse(context.Background(), "recent", "")
	if err != nil {
		t.Fatalf("Browse: %v", err)
	}
	if len(got.Items) != 2 {
		t.Fatalf("items = %d, want 2", len(got.Items))
	}

	first := got.Items[0]
	if first.ID != "12345" || first.Kind != "comic" {
		t.Errorf("first = %+v", first)
	}
	// The title falls back to the img's alt when there's no caption.
	if first.Title != "First Book" {
		t.Errorf("title = %q, want First Book", first.Title)
	}
	// A protocol-relative thumbnail has to be made absolute or the client can't fetch it.
	if first.ThumbURL != "https://cdn.3hentai.net/t/12345/cover.jpg" {
		t.Errorf("thumb = %q", first.ThumbURL)
	}
	if first.PageURL != "https://3hentai.net/d/12345" {
		t.Errorf("page url = %q", first.PageURL)
	}

	second := got.Items[1]
	if second.Title != "Second Book" {
		t.Errorf("caption title = %q", second.Title)
	}
	// A root-relative thumbnail resolves against the site.
	if second.ThumbURL != "https://3hentai.net/t/67890/cover.jpg" {
		t.Errorf("thumb = %q", second.ThumbURL)
	}
}

// An empty listing means the end; paging past it would loop forever.
func TestThreeHentaiEmptyListingEndsPagination(t *testing.T) {
	th := NewThreeHentai(&stubFetcher{html: `<html><body>nothing here</body></html>`})
	got, err := th.Browse(context.Background(), "recent", "9")
	if err != nil {
		t.Fatalf("Browse: %v", err)
	}
	if len(got.Items) != 0 || got.Cursor != "" {
		t.Errorf("empty listing = %+v, want no items and no cursor", got)
	}
}

func TestThreeHentaiPagesDelegatesToScraper(t *testing.T) {
	want := []string{"https://cdn/1.jpg", "https://cdn/2.jpg"}
	th := NewThreeHentai(&stubFetcher{pages: want})

	got, err := th.Pages(context.Background(), "12345")
	if err != nil {
		t.Fatalf("Pages: %v", err)
	}
	if len(got) != 2 || got[0] != want[0] {
		t.Errorf("pages = %v, want %v", got, want)
	}
	if _, err := th.Pages(context.Background(), "../etc/passwd"); err == nil {
		t.Error("a non-numeric gallery id should be rejected")
	}
}

// ── registry / proxy guard ──────────────────────────────────────────────────

func TestAllowsHost(t *testing.T) {
	r := &Registry{srcs: []Source{
		NewFourChan(http.DefaultClient),
		NewThreeHentai(&stubFetcher{}),
	}}

	for _, host := range []string{"i.4cdn.org", "a.4cdn.org", "3hentai.net", "cdn.3hentai.net"} {
		if !r.AllowsHost(host) {
			t.Errorf("AllowsHost(%q) = false, want true", host)
		}
	}
	// The whole point of the guard: the proxy must not be usable against anything else.
	for _, host := range []string{"", "evil.net", "169.254.169.254", "localhost", "3hentai.net.evil.net"} {
		if r.AllowsHost(host) {
			t.Errorf("AllowsHost(%q) = true, want false — the proxy would be an SSRF hole", host)
		}
	}
}
