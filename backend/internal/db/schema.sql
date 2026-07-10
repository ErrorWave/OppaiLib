-- OppaiLib schema (SQLite). Applied idempotently on startup.
-- Sensitive free-text lives in *_enc BLOB columns (AES-256-GCM, see crypto pkg).

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS schema_meta (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    username   TEXT NOT NULL UNIQUE,
    pw_hash    TEXT NOT NULL,                -- Argon2id encoded string
    is_admin   INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
    token      TEXT PRIMARY KEY,             -- opaque random
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);

CREATE TABLE IF NOT EXISTS media (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    kind          TEXT NOT NULL,             -- video|gif|image|comic|game
    sha256        TEXT NOT NULL UNIQUE,      -- content hash (dedup)
    size          INTEGER NOT NULL,
    blob_path     TEXT NOT NULL,             -- relative path in /media
    title_enc     BLOB,                      -- encrypted display title
    notes_enc     BLOB,                      -- encrypted freeform notes
    source_enc    BLOB,                      -- encrypted origin URL
    rating        INTEGER NOT NULL DEFAULT 0,-- 0..5
    favorite      INTEGER NOT NULL DEFAULT 0,
    duration      REAL,                      -- seconds (video/gif)
    width         INTEGER,
    height        INTEGER,
    page_count    INTEGER,                   -- comics
    thumb_path    TEXT,                      -- encrypted thumbnail blob
    download_enc  BLOB,                      -- encrypted external download URL (games)
    gallery_enc   BLOB,                      -- encrypted JSON array of screenshot URLs (games)
    created_at    INTEGER NOT NULL,
    updated_at    INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_media_kind    ON media(kind);
CREATE INDEX IF NOT EXISTS idx_media_created ON media(created_at);

CREATE TABLE IF NOT EXISTS tags (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'general', -- general|performer|artist|studio|meta
    UNIQUE(name, category)
);

CREATE TABLE IF NOT EXISTS media_tags (
    media_id INTEGER NOT NULL REFERENCES media(id) ON DELETE CASCADE,
    tag_id   INTEGER NOT NULL REFERENCES tags(id)  ON DELETE CASCADE,
    source   TEXT NOT NULL DEFAULT 'manual',       -- manual|ai|scrape
    score    REAL,                                  -- ai confidence
    PRIMARY KEY (media_id, tag_id)
);
CREATE INDEX IF NOT EXISTS idx_media_tags_tag ON media_tags(tag_id);

-- Where on a clip's timeline the AI saw each tag. One row per (tag, sampled
-- frame); media_tags still holds the item-level summary. Rebuilt from scratch on
-- every re-tag, so it always describes the run that produced the current tags.
CREATE TABLE IF NOT EXISTS media_tag_frames (
    media_id INTEGER NOT NULL REFERENCES media(id) ON DELETE CASCADE,
    tag_id   INTEGER NOT NULL REFERENCES tags(id)  ON DELETE CASCADE,
    t        REAL NOT NULL,                        -- seconds from start
    score    REAL,                                 -- ai confidence at that frame
    PRIMARY KEY (media_id, tag_id, t)
);
CREATE INDEX IF NOT EXISTS idx_tag_frames_media ON media_tag_frames(media_id);

CREATE TABLE IF NOT EXISTS collections (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL UNIQUE,
    created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS collection_items (
    collection_id INTEGER NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
    media_id      INTEGER NOT NULL REFERENCES media(id)       ON DELETE CASCADE,
    position      INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (collection_id, media_id)
);

CREATE TABLE IF NOT EXISTS progress (
    user_id    INTEGER NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
    media_id   INTEGER NOT NULL REFERENCES media(id)  ON DELETE CASCADE,
    position   REAL NOT NULL DEFAULT 0,   -- seconds or page index
    updated_at INTEGER NOT NULL,
    PRIMARY KEY (user_id, media_id)
);

-- Background job queue (scrape + ai). Simple polled table.
CREATE TABLE IF NOT EXISTS jobs (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    kind       TEXT NOT NULL,             -- scrape|ai_tag|thumbnail
    status     TEXT NOT NULL DEFAULT 'pending', -- pending|running|done|error
    payload    TEXT NOT NULL,             -- JSON
    error      TEXT,
    attempts   INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status, kind);

-- Full-text search over decrypted-at-write searchable text (title + tags).
-- Note: content is only indexed if the user opts into plaintext search index.
CREATE VIRTUAL TABLE IF NOT EXISTS media_fts USING fts5(
    title, tags, notes,
    content=''                            -- external-content contentless index
);
