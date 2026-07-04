package scraper

import (
	"net/url"
	"path"
	"strings"

	"github.com/youruser/oppailib/internal/models"
)

// mediaExt maps a lowercase file extension to the media kind it represents.
// Used to short-circuit direct-media links (e.g. Discord CDN, direct image
// hotlinks) that point straight at a file rather than an HTML page.
var mediaExt = map[string]models.MediaKind{
	".jpg":  models.KindImage,
	".jpeg": models.KindImage,
	".png":  models.KindImage,
	".webp": models.KindImage,
	".avif": models.KindImage,
	".bmp":  models.KindImage,
	".jfif": models.KindImage,
	".gif":  models.KindGIF,
	".apng": models.KindGIF,
	".mp4":  models.KindVideo,
	".m4v":  models.KindVideo,
	".webm": models.KindVideo,
	".mov":  models.KindVideo,
	".mkv":  models.KindVideo,
}

// mediaKindFromPath returns the media kind implied by a URL path's extension,
// or "" if the path doesn't look like a direct media file.
func mediaKindFromPath(p string) models.MediaKind {
	return mediaExt[strings.ToLower(path.Ext(p))]
}

// mediaKindFromContentType classifies an HTTP Content-Type into a media kind,
// or "" when the response is (probably) an HTML page to be parsed.
func mediaKindFromContentType(ct string) models.MediaKind {
	ct = strings.ToLower(strings.TrimSpace(ct))
	if i := strings.IndexByte(ct, ';'); i >= 0 {
		ct = strings.TrimSpace(ct[:i])
	}
	switch {
	case ct == "image/gif":
		return models.KindGIF
	case strings.HasPrefix(ct, "image/"):
		return models.KindImage
	case strings.HasPrefix(ct, "video/"):
		return models.KindVideo
	}
	return ""
}

// titleFromURL derives a human-ish title from a direct media URL (the file name
// without its extension), falling back to the host.
func titleFromURL(u *url.URL) string {
	name := path.Base(u.Path)
	name = strings.TrimSuffix(name, path.Ext(name))
	name = strings.TrimSpace(name)
	if name == "" || name == "/" || name == "." {
		return u.Hostname()
	}
	return name
}
