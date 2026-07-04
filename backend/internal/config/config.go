// Package config loads OppaiLib configuration from environment variables.
package config

import (
	"os"
	"strconv"
	"time"
)

type Config struct {
	HTTPAddr   string
	MediaDir   string
	ConfigDir  string
	DBPath     string
	Passphrase string

	AdminUser     string
	AdminPassword string

	AIEnabled  bool
	AIModelDir string
	AIDevice   string // cpu|cuda

	ScrapeDelay         time.Duration
	ScrapeUserAgent     string
	ScrapeRespectRobots bool

	SessionTTL time.Duration
	Debug      bool
}

func Load() *Config {
	return &Config{
		HTTPAddr:        env("OPPAI_HTTP_ADDR", ":8080"),
		MediaDir:        env("OPPAI_MEDIA_DIR", "/media"),
		ConfigDir:       env("OPPAI_CONFIG_DIR", "/config"),
		DBPath:          env("OPPAI_DB_PATH", "/db/oppailib.sqlite"),
		Passphrase:      env("OPPAI_PASSPHRASE", ""),
		AdminUser:       env("OPPAI_ADMIN_USER", "admin"),
		AdminPassword:   env("OPPAI_ADMIN_PASSWORD", ""),
		AIEnabled:       envBool("OPPAI_AI_ENABLED", true),
		AIModelDir:      env("OPPAI_AI_MODEL_DIR", "/config/models"),
		AIDevice:        env("OPPAI_AI_DEVICE", "cpu"),
		ScrapeDelay:         time.Duration(envInt("OPPAI_SCRAPE_DELAY_MS", 1500)) * time.Millisecond,
		ScrapeUserAgent:     env("OPPAI_SCRAPE_USER_AGENT", "OppaiLib/0.1 (+self-hosted)"),
		ScrapeRespectRobots: envBool("OPPAI_SCRAPE_RESPECT_ROBOTS", true),
		SessionTTL:      time.Duration(envInt("OPPAI_SESSION_TTL_HOURS", 720)) * time.Hour,
		Debug:           envBool("OPPAI_DEBUG", false),
	}
}

func env(key, def string) string {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		return v
	}
	return def
}

func envInt(key string, def int) int {
	if v, ok := os.LookupEnv(key); ok {
		if n, err := strconv.Atoi(v); err == nil {
			return n
		}
	}
	return def
}

func envBool(key string, def bool) bool {
	if v, ok := os.LookupEnv(key); ok {
		if b, err := strconv.ParseBool(v); err == nil {
			return b
		}
	}
	return def
}
