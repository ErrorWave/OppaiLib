// Package settings holds the runtime-tunable knobs the Settings screen edits.
//
// Precedence is: env var (config.Config) supplies the default, a row in the
// settings table overrides it. Anything that can't be changed without a restart
// (model directory, inference device, listen address) stays env-only and is
// reported read-only to the UI.
package settings

import (
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/youruser/oppailib/internal/config"
)

// Settings is the live, editable configuration. Field tags double as the JSON
// shape the web UI reads and writes.
type Settings struct {
	// AI auto-tagging.
	AIEnabled  bool    `json:"aiEnabled"`
	AIAutoTag  bool    `json:"aiAutoTag"`  // tag automatically on upload/import
	AIMinScore float64 `json:"aiMinScore"` // drop suggestions below this confidence
	AIMaxTags  int     `json:"aiMaxTags"`  // keep at most this many per item

	// Scraper / import.
	ScrapeDelayMs       int    `json:"scrapeDelayMs"` // politeness delay per host
	ScrapeUserAgent     string `json:"scrapeUserAgent"`
	ScrapeRespectRobots bool   `json:"scrapeRespectRobots"`

	// F95 login, used to fetch members-only f95zone.to game threads. The password
	// is write-only over the API: it is stored and used, but never sent back in a
	// GET (see Redacted). F95PasswordSet lets the UI show whether one is on file.
	F95Username    string `json:"f95Username"`
	F95Password    string `json:"f95Password"`
	F95PasswordSet bool   `json:"f95PasswordSet"`

	// Image generation. ImageGenURL points at a local Automatic1111 / SD.Next WebUI;
	// empty disables the feature. ImageGenEnabled is a derived, read-only convenience
	// for the UI (true when a URL is set) — it isn't stored separately.
	ImageGenURL     string `json:"imageGenUrl"`
	ImageGenEnabled bool   `json:"imageGenEnabled"`

	// Local OpenAI-compatible chat backend. No cloud service is contacted by
	// OppaiLib; the operator explicitly chooses this URL and model.
	ChatURL     string `json:"chatUrl"`
	ChatModel   string `json:"chatModel"`
	ChatEnabled bool   `json:"chatEnabled"`
}

// Setting keys as stored in the settings table.
const (
	keyAIEnabled           = "ai.enabled"
	keyAIAutoTag           = "ai.auto_tag"
	keyAIMinScore          = "ai.min_score"
	keyAIMaxTags           = "ai.max_tags"
	keyScrapeDelayMs       = "scrape.delay_ms"
	keyScrapeUserAgent     = "scrape.user_agent"
	keyScrapeRespectRobots = "scrape.respect_robots"
	keyF95Username         = "f95.username"
	keyF95Password         = "f95.password"
	keyImageGenURL         = "imagegen.url"
	keyChatURL             = "chat.url"
	keyChatModel           = "chat.model"
)

// Defaults derives the baseline from environment config.
func Defaults(cfg *config.Config) Settings {
	return Settings{
		AIEnabled:           cfg.AIEnabled,
		AIAutoTag:           true,
		AIMinScore:          0.35,
		AIMaxTags:           20,
		ScrapeDelayMs:       int(cfg.ScrapeDelay / time.Millisecond),
		ScrapeUserAgent:     cfg.ScrapeUserAgent,
		ScrapeRespectRobots: cfg.ScrapeRespectRobots,
		F95Username:         cfg.F95Username,
		F95Password:         cfg.F95Password,
		ImageGenURL:         cfg.ImageGenURL,
		ChatURL:             cfg.ChatURL,
		ChatModel:           cfg.ChatModel,
	}
}

// Merge layers stored overrides on top of a baseline. Unparseable or absent
// values leave the baseline field untouched, so a corrupt row can never wedge
// the server into a bad config.
func Merge(base Settings, stored map[string]string) Settings {
	s := base
	if v, ok := parseBool(stored[keyAIEnabled]); ok {
		s.AIEnabled = v
	}
	if v, ok := parseBool(stored[keyAIAutoTag]); ok {
		s.AIAutoTag = v
	}
	if v, err := strconv.ParseFloat(stored[keyAIMinScore], 64); err == nil {
		s.AIMinScore = v
	}
	if v, err := strconv.Atoi(stored[keyAIMaxTags]); err == nil {
		s.AIMaxTags = v
	}
	if v, err := strconv.Atoi(stored[keyScrapeDelayMs]); err == nil {
		s.ScrapeDelayMs = v
	}
	if v := stored[keyScrapeUserAgent]; v != "" {
		s.ScrapeUserAgent = v
	}
	if v, ok := parseBool(stored[keyScrapeRespectRobots]); ok {
		s.ScrapeRespectRobots = v
	}
	// Presence, not emptiness, decides these: an empty stored value is a real choice
	// ("no F95 login"), so a saved row always wins over the config default.
	if v, ok := stored[keyF95Username]; ok {
		s.F95Username = v
	}
	if v, ok := stored[keyF95Password]; ok {
		s.F95Password = v
	}
	// Presence wins here too: clearing the URL from the Settings screen is a real
	// choice (disable image generation), not a fall-back to the env default.
	if v, ok := stored[keyImageGenURL]; ok {
		s.ImageGenURL = v
	}
	if v, ok := stored[keyChatURL]; ok {
		s.ChatURL = v
	}
	if v, ok := stored[keyChatModel]; ok {
		s.ChatModel = v
	}
	s.Clamp()
	return s
}

// Map renders settings as storable strings.
func (s Settings) Map() map[string]string {
	return map[string]string{
		keyAIEnabled:           strconv.FormatBool(s.AIEnabled),
		keyAIAutoTag:           strconv.FormatBool(s.AIAutoTag),
		keyAIMinScore:          strconv.FormatFloat(s.AIMinScore, 'f', -1, 64),
		keyAIMaxTags:           strconv.Itoa(s.AIMaxTags),
		keyScrapeDelayMs:       strconv.Itoa(s.ScrapeDelayMs),
		keyScrapeUserAgent:     s.ScrapeUserAgent,
		keyScrapeRespectRobots: strconv.FormatBool(s.ScrapeRespectRobots),
		keyF95Username:         s.F95Username,
		keyF95Password:         s.F95Password,
		keyImageGenURL:         s.ImageGenURL,
		keyChatURL:             s.ChatURL,
		keyChatModel:           s.ChatModel,
	}
}

// Redacted returns a copy safe to hand back over the API: the F95 password is
// stripped and reduced to the F95PasswordSet flag, so a GET never echoes the
// stored credential.
func (s Settings) Redacted() Settings {
	s.F95PasswordSet = s.F95Password != ""
	s.F95Password = ""
	return s
}

// Clamp forces every field into a sane range. Called on load and before every
// save, so neither a hand-edited DB row nor a malformed PUT can e.g. set a
// zero-delay scraper loose on a host.
func (s *Settings) Clamp() {
	if s.AIMinScore < 0 {
		s.AIMinScore = 0
	}
	if s.AIMinScore > 1 {
		s.AIMinScore = 1
	}
	if s.AIMaxTags < 1 {
		s.AIMaxTags = 1
	}
	if s.AIMaxTags > 100 {
		s.AIMaxTags = 100
	}
	if s.ScrapeDelayMs < 250 {
		s.ScrapeDelayMs = 250
	}
	if s.ScrapeDelayMs > 60_000 {
		s.ScrapeDelayMs = 60_000
	}
	if s.ScrapeUserAgent == "" {
		s.ScrapeUserAgent = config.DefaultScrapeUserAgent
	}
	// Normalize the image-gen base URL to "scheme://host[:port]" without a trailing
	// slash, so handlers can append "/sdapi/..." without doubling slashes. The derived
	// enabled flag simply tracks whether a URL is configured.
	s.ImageGenURL = strings.TrimRight(strings.TrimSpace(s.ImageGenURL), "/")
	s.ImageGenEnabled = s.ImageGenURL != ""
	s.ChatURL = strings.TrimRight(strings.TrimSpace(s.ChatURL), "/")
	s.ChatModel = strings.TrimSpace(s.ChatModel)
	s.ChatEnabled = s.ChatURL != "" && s.ChatModel != ""
}

// ScrapeDelay is the politeness delay as a Duration.
func (s Settings) ScrapeDelay() time.Duration {
	return time.Duration(s.ScrapeDelayMs) * time.Millisecond
}

// Store holds the live settings for concurrent readers (request handlers) and
// the occasional writer (a save from the Settings screen).
type Store struct {
	mu  sync.RWMutex
	cur Settings
}

func NewStore(s Settings) *Store {
	s.Clamp()
	return &Store{cur: s}
}

func (st *Store) Get() Settings {
	st.mu.RLock()
	defer st.mu.RUnlock()
	return st.cur
}

func (st *Store) Set(s Settings) {
	s.Clamp()
	st.mu.Lock()
	st.cur = s
	st.mu.Unlock()
}

// parseBool reports ok=false for an absent/garbage value so Merge can skip it.
func parseBool(v string) (bool, bool) {
	if v == "" {
		return false, false
	}
	b, err := strconv.ParseBool(v)
	if err != nil {
		return false, false
	}
	return b, true
}
