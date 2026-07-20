-- OppaiLib schema (SQLite). Applied idempotently on startup.
-- Sensitive free-text lives in *_enc BLOB columns (AES-256-GCM, see crypto pkg).

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS schema_meta (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- Runtime settings edited from the Settings screen. Env vars provide the
-- defaults; a row here overrides one for this install.
CREATE TABLE IF NOT EXISTS settings (
    key        TEXT PRIMARY KEY,
    value      TEXT NOT NULL,
    updated_at INTEGER NOT NULL
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
    expires_at INTEGER NOT NULL,
    -- Which client holds this session: 'android' or 'web'. Only the Android app is
    -- exempt from the idle timeout and the restart purge (see db.ClientAndroid), so
    -- an unset value defaults to browser rules — the safe direction.
    client     TEXT NOT NULL DEFAULT '',
    -- Unix seconds of the last request that counted as user activity. Feeds the
    -- browser idle timeout; the phone's session ignores it.
    last_seen  INTEGER NOT NULL DEFAULT 0
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

CREATE TABLE IF NOT EXISTS game_gallery (
    game_id  INTEGER NOT NULL REFERENCES media(id) ON DELETE CASCADE,
    media_id INTEGER NOT NULL REFERENCES media(id) ON DELETE CASCADE,
    position INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (game_id, media_id)
);
CREATE INDEX IF NOT EXISTS idx_game_gallery_game ON game_gallery(game_id, position);

-- Reusable image-generation character references. The original reference and the
-- derived appearance-only prompt tags are encrypted at rest like media metadata.
CREATE TABLE IF NOT EXISTS characters (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name_enc   BLOB NOT NULL,
    tags_enc   BLOB NOT NULL,
    image_enc  BLOB NOT NULL,
    mime       TEXT NOT NULL DEFAULT 'image/jpeg',
    created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS tags (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     TEXT NOT NULL,
    -- Open-ended. general|performer|artist|studio|meta are the built-ins, but a
    -- YAML site parser's tag_groups names its own (parody, character, language,
    -- …) and they're created on demand — hence no CHECK constraint here.
    category TEXT NOT NULL DEFAULT 'general',
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
