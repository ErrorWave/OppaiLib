// Package db wraps the SQLite metadata store.
package db

import (
	"context"
	"database/sql"
	_ "embed"
	"errors"
	"fmt"
	"time"

	_ "modernc.org/sqlite" // pure-Go driver, registered as "sqlite"
)

//go:embed schema.sql
var schemaSQL string

type DB struct {
	sql *sql.DB
}

// Open connects to (creating if needed) the SQLite file and applies the schema.
func Open(path string) (*DB, error) {
	dsn := fmt.Sprintf("file:%s?_pragma=busy_timeout(5000)&_pragma=foreign_keys(1)", path)
	sqldb, err := sql.Open("sqlite", dsn)
	if err != nil {
		return nil, err
	}
	sqldb.SetMaxOpenConns(1) // SQLite: serialize writes; simplest correct default
	if err := sqldb.Ping(); err != nil {
		return nil, err
	}
	if _, err := sqldb.Exec(schemaSQL); err != nil {
		return nil, fmt.Errorf("apply schema: %w", err)
	}
	// CREATE TABLE IF NOT EXISTS won't add columns to a table that predates them,
	// so bring older databases forward explicitly.
	if err := ensureColumn(sqldb, "media", "thumb_path", "TEXT"); err != nil {
		return nil, err
	}
	if err := ensureColumn(sqldb, "media", "download_enc", "BLOB"); err != nil {
		return nil, err
	}
	if err := ensureColumn(sqldb, "media", "gallery_enc", "BLOB"); err != nil {
		return nil, err
	}
	// Sessions predating the idle timeout carry neither column. They default to the
	// browser rules, so the first restart after this upgrade signs the web UI out —
	// which is the intended behaviour anyway.
	if err := ensureColumn(sqldb, "sessions", "client", "TEXT NOT NULL DEFAULT ''"); err != nil {
		return nil, err
	}
	if err := ensureColumn(sqldb, "sessions", "last_seen", "INTEGER NOT NULL DEFAULT 0"); err != nil {
		return nil, err
	}
	return &DB{sql: sqldb}, nil
}

// ensureColumn adds a column to an existing table if it isn't already present.
// SQLite has no "ADD COLUMN IF NOT EXISTS", so we probe table_info first.
func ensureColumn(db *sql.DB, table, column, decl string) error {
	rows, err := db.Query(fmt.Sprintf("PRAGMA table_info(%s)", table))
	if err != nil {
		return err
	}
	defer rows.Close()
	for rows.Next() {
		var cid int
		var name, ctype string
		var notnull, pk int
		var dflt sql.NullString
		if err := rows.Scan(&cid, &name, &ctype, &notnull, &dflt, &pk); err != nil {
			return err
		}
		if name == column {
			return rows.Close() // already present
		}
	}
	if err := rows.Err(); err != nil {
		return err
	}
	_, err = db.Exec(fmt.Sprintf("ALTER TABLE %s ADD COLUMN %s %s", table, column, decl))
	return err
}

func (d *DB) Close() error { return d.sql.Close() }

// SQL exposes the underlying handle for packages that need custom queries.
func (d *DB) SQL() *sql.DB { return d.sql }

func now() int64 { return time.Now().Unix() }

// ── Users ──────────────────────────────────────────────────────────────

func (d *DB) CountUsers(ctx context.Context) (int, error) {
	var n int
	err := d.sql.QueryRowContext(ctx, `SELECT COUNT(*) FROM users`).Scan(&n)
	return n, err
}

func (d *DB) CreateUser(ctx context.Context, username, pwHash string, isAdmin bool) (int64, error) {
	res, err := d.sql.ExecContext(ctx,
		`INSERT INTO users(username, pw_hash, is_admin, created_at) VALUES(?,?,?,?)`,
		username, pwHash, boolToInt(isAdmin), now())
	if err != nil {
		return 0, err
	}
	return res.LastInsertId()
}

type UserRow struct {
	ID       int64
	Username string
	PwHash   string
	IsAdmin  bool
}

func (d *DB) UserByName(ctx context.Context, username string) (*UserRow, error) {
	var u UserRow
	var admin int
	err := d.sql.QueryRowContext(ctx,
		`SELECT id, username, pw_hash, is_admin FROM users WHERE username = ?`, username).
		Scan(&u.ID, &u.Username, &u.PwHash, &admin)
	if err != nil {
		return nil, err
	}
	u.IsAdmin = admin != 0
	return &u, nil
}

// ── Sessions ───────────────────────────────────────────────────────────

// ClientAndroid marks a session held by the Android app.
//
// It is the one client that is *not* a browser, and the difference is not cosmetic:
// a phone app is signed into a server it owns and is expected to stay signed in, so
// it is exempt from both the idle timeout and the restart purge that a browser
// session gets. Every other client (and any session predating this column) is
// treated as a browser, which is the safe direction to be wrong in.
const ClientAndroid = "android"

// ClientWeb marks a session held by a browser: idle-expiring, and dropped when the
// server restarts.
const ClientWeb = "web"

// ErrSessionIdle is returned when a browser session is still within its TTL but has
// gone untouched for longer than the idle window.
var ErrSessionIdle = errors.New("db: session idle")

func (d *DB) CreateSession(ctx context.Context, token string, userID int64, ttl time.Duration, client string) error {
	_, err := d.sql.ExecContext(ctx,
		`INSERT INTO sessions(token, user_id, created_at, expires_at, client, last_seen)
		 VALUES(?,?,?,?,?,?)`,
		token, userID, now(), time.Now().Add(ttl).Unix(), client, now())
	return err
}

// SessionUser returns the user for a valid session token.
//
// A session is valid when it exists, hasn't passed its absolute expiry, and — for a
// browser session — has been used within idle. The idle check is deliberately not
// applied to the Android client: the app is a long-lived signed-in device, not a tab
// someone walked away from.
func (d *DB) SessionUser(ctx context.Context, token string, idle time.Duration) (*UserRow, error) {
	var u UserRow
	var admin int
	var client string
	var lastSeen int64
	err := d.sql.QueryRowContext(ctx, `
		SELECT u.id, u.username, u.pw_hash, u.is_admin, s.client, s.last_seen
		FROM sessions s JOIN users u ON u.id = s.user_id
		WHERE s.token = ? AND s.expires_at > ?`,
		token, now()).Scan(&u.ID, &u.Username, &u.PwHash, &admin, &client, &lastSeen)
	if err != nil {
		return nil, err
	}
	if client != ClientAndroid && idle > 0 && lastSeen > 0 && now()-lastSeen > int64(idle.Seconds()) {
		// Drop it rather than leave a corpse that has to be re-judged on every request.
		_ = d.DeleteSession(ctx, token)
		return nil, ErrSessionIdle
	}
	u.IsAdmin = admin != 0
	return &u, nil
}

// maxSessionTouchInterval is how stale last_seen may be allowed to get before a
// request bothers to rewrite it.
//
// Every authenticated request is activity, and SQLite here serializes writes on a
// single connection — so touching the row on literally every request would put a
// write in front of every thumbnail in a grid scroll. A minute's resolution is far
// finer than the idle window it feeds.
const maxSessionTouchInterval = 60

// TouchSession records that a session is being used, cheaply.
//
// The write is throttled (see maxSessionTouchInterval), but the throttle must stay
// comfortably inside the idle window it is feeding — otherwise a *short* window would
// expire a session that was being used the whole time, because the last write to
// last_seen was skipped as "recent enough" right up until the moment it wasn't. So the
// interval is a quarter of the window, capped at a minute: with the default hour it is
// the usual 60s, and an operator who sets a two-minute window still gets a session that
// survives being used.
func (d *DB) TouchSession(ctx context.Context, token string, idle time.Duration) error {
	interval := int64(maxSessionTouchInterval)
	if idle > 0 {
		if quarter := int64(idle.Seconds()) / 4; quarter < interval {
			interval = quarter
		}
	}
	_, err := d.sql.ExecContext(ctx,
		`UPDATE sessions SET last_seen = ? WHERE token = ? AND last_seen < ?`,
		now(), token, now()-interval)
	return err
}

func (d *DB) DeleteSession(ctx context.Context, token string) error {
	_, err := d.sql.ExecContext(ctx, `DELETE FROM sessions WHERE token = ?`, token)
	return err
}

// PurgeBrowserSessions drops every session that isn't the Android app's. Called once
// at startup: a server restart should log the web UI out (that is what makes a
// restart a real security boundary rather than a cosmetic one), while the phone —
// which cannot be told to re-authenticate and has no keyboard handy — stays signed in.
//
// It returns how many it dropped, for the startup log.
func (d *DB) PurgeBrowserSessions(ctx context.Context) (int64, error) {
	res, err := d.sql.ExecContext(ctx, `DELETE FROM sessions WHERE client <> ?`, ClientAndroid)
	if err != nil {
		return 0, err
	}
	return res.RowsAffected()
}

func boolToInt(b bool) int {
	if b {
		return 1
	}
	return 0
}
