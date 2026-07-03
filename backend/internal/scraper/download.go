package scraper

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"path"
)

// Media is a downloaded remote asset ready to be handed to the blob store.
type Media struct {
	Body        io.ReadCloser
	ContentType string
	Filename    string
}

// Download fetches a (usually media) URL with the polite client + throttling.
// The caller must Close the returned Body.
func (e *Engine) Download(ctx context.Context, rawURL string) (*Media, error) {
	u, err := url.Parse(rawURL)
	if err != nil {
		return nil, err
	}
	e.throttle(u.Host)
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, rawURL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", e.userAgent)
	resp, err := e.client.Do(req)
	if err != nil {
		return nil, err
	}
	if resp.StatusCode != http.StatusOK {
		resp.Body.Close()
		return nil, fmt.Errorf("download: %s returned %d", rawURL, resp.StatusCode)
	}
	name := path.Base(u.Path)
	if name == "" || name == "/" || name == "." {
		name = "download"
	}
	return &Media{Body: resp.Body, ContentType: resp.Header.Get("Content-Type"), Filename: name}, nil
}
