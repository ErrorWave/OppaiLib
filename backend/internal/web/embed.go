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
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Embedded files report a zero modtime, so http.FileServer emits no
		// Last-Modified/ETag/Cache-Control at all — which lets browsers *heuristically*
		// cache index.html and pin themselves to a stale, content-hashed JS bundle long
		// after the server was updated (the "import fetches forever" report: an old
		// bundle without the client-side fetch timeout). Set caching explicitly:
		//   - /assets/* are content-hash-named by Vite, so they're safe to cache forever.
		//   - everything else (index.html and the SPA fallback) must revalidate so a new
		//     deploy's bundle reference is picked up immediately.
		if strings.HasPrefix(r.URL.Path, "/assets/") {
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		} else {
			w.Header().Set("Cache-Control", "no-cache")
		}
		// If the requested file exists, serve it; else fall back to index.html.
		if _, err := fs.Stat(sub, trimLeadingSlash(r.URL.Path)); err != nil {
			r2 := r.Clone(r.Context())
			r2.URL.Path = "/"
			fileServer.ServeHTTP(w, r2)
			return
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
