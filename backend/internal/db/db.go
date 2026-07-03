// Package db wraps the SQLite metadata store.
package db

import (
	"context"
	"database/sql"
	_ "embed"
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
	return &DB{sql: sqldb}, nil
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

func (d *DB) CreateSession(ctx context.Context, token string, userID int64, ttl time.Duration) error {
	_, err := d.sql.ExecContext(ctx,
		`INSERT INTO sessions(token, user_id, created_at, expires_at) VALUES(?,?,?,?)`,
		token, userID, now(), time.Now().Add(ttl).Unix())
	return err
}

// SessionUser returns the user for a valid, unexpired session token.
func (d *DB) SessionUser(ctx context.Context, token string) (*UserRow, error) {
	var u UserRow
	var admin int
	err := d.sql.QueryRowContext(ctx, `
		SELECT u.id, u.username, u.pw_hash, u.is_admin
		FROM sessions s JOIN users u ON u.id = s.user_id
		WHERE s.token = ? AND s.expires_at > ?`,
		token, now()).Scan(&u.ID, &u.Username, &u.PwHash, &admin)
	if err != nil {
		return nil, err
	}
	u.IsAdmin = admin != 0
	return &u, nil
}

func (d *DB) DeleteSession(ctx context.Context, token string) error {
	_, err := d.sql.ExecContext(ctx, `DELETE FROM sessions WHERE token = ?`, token)
	return err
}

func boolToInt(b bool) int {
	if b {
		return 1
	}
	return 0
}
