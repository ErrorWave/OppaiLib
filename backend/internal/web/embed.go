// Package web embeds the built Material 3 SPA and serves it with SPA fallback
// (unknown non-API paths return index.html so client-side routing works).
package web

import (
	"embed"
	"io/fs"
	"net/http"
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
