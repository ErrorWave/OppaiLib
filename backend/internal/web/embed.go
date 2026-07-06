// Package web embeds the built Material 3 SPA and serves it with SPA fallback
// (unknown non-API paths return index.html so client-side routing works).
package web

import (
	"embed"
	"io/fs"
	"net/http"
	"strings"
)

//go:embed all:dist
var dist embed.FS

// Handler returns an http.Handler serving the embedded web UI.
func Handler() http.Handler {
	sub, err := fs.Sub(dist, "dist")
	if err != nil {
		panic(err)
	}
	fileServer := http.FileServer(http.FS(sub))
	isAsset := func(p string) bool { return strings.HasPrefix(p, "/assets/") }
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, statErr := fs.Stat(sub, trimLeadingSlash(r.URL.Path))

		// A missing /assets/* file must 404 — never fall back to index.html.
		// Assets are served "immutable" (below), so answering a missing bundle
		// with the HTML shell makes the browser pin that text/html under the JS
		// URL for a year; the app then white-screens on "Expected a JavaScript
		// module script but the server responded with a MIME type of text/html"
		// until the cache is manually cleared. Crucially, the cache header is set
		// only AFTER this check, so a miss is never cached as immutable.
		if statErr != nil && isAsset(r.URL.Path) {
			http.NotFound(w, r)
			return
		}

		// SPA fallback: unknown non-asset routes serve index.html so client-side
		// routing works. index.html must revalidate (no-cache) so a new deploy's
		// bundle reference is picked up immediately.
		if statErr != nil {
			w.Header().Set("Cache-Control", "no-cache")
			r2 := r.Clone(r.Context())
			r2.URL.Path = "/"
			fileServer.ServeHTTP(w, r2)
			return
		}

		// A real file exists here. Content-hash-named /assets/* are safe to cache
		// forever; everything else (index.html, icons, manifest) must revalidate.
		if isAsset(r.URL.Path) {
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		} else {
			w.Header().Set("Cache-Control", "no-cache")
		}
		fileServer.ServeHTTP(w, r)
	})
}

func trimLeadingSlash(p string) string {
	if len(p) > 0 && p[0] == '/' {
		p = p[1:]
	}
	if p == "" {
		return "index.html"
	}
	return p
}
