// Package models holds shared domain types serialized over the API.
package models

type MediaKind string

const (
	KindVideo MediaKind = "video"
	KindGIF   MediaKind = "gif"
	KindImage MediaKind = "image"
	KindComic MediaKind = "comic"
	KindGame  MediaKind = "game"
)

// Media is the API-facing view. Encrypted DB fields (title, notes, source) are
// decrypted before serialization by the handler layer.
type Media struct {
	ID        int64     `json:"id"`
	Kind      MediaKind `json:"kind"`
	SHA256    string    `json:"sha256"`
	Size      int64     `json:"size"`
	Title     string    `json:"title"`
	Notes     string    `json:"notes,omitempty"`
	Source    string    `json:"source,omitempty"`
	Rating    int       `json:"rating"`
	Favorite  bool      `json:"favorite"`
	Duration  float64   `json:"duration,omitempty"`
	Width     int       `json:"width,omitempty"`
	Height    int       `json:"height,omitempty"`
	PageCount int       `json:"pageCount,omitempty"`
	Tags      []Tag     `json:"tags,omitempty"`
	CreatedAt int64     `json:"createdAt"`
	UpdatedAt int64     `json:"updatedAt"`
}

type Tag struct {
	ID       int64   `json:"id"`
	Name     string  `json:"name"`
	Category string  `json:"category"`
	Source   string  `json:"source,omitempty"`
	Score    float64 `json:"score,omitempty"`
}

type User struct {
	ID       int64  `json:"id"`
	Username string `json:"username"`
	IsAdmin  bool   `json:"isAdmin"`
}

type Collection struct {
	ID    int64   `json:"id"`
	Name  string  `json:"name"`
	Items []int64 `json:"items,omitempty"`
}

// ScrapeResult is what a site parser returns for a fetched URL.
type ScrapeResult struct {
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Tags        []string `json:"tags"`
	Performers  []string `json:"performers"`
	MediaURLs   []string `json:"mediaUrls"`
	SourceURL   string   `json:"sourceUrl"`
	Kind        string   `json:"kind"`
}
