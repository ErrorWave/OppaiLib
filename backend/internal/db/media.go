package db

import (
	"context"
	"database/sql"
)

// MediaRow mirrors the media table; *_enc fields hold ciphertext.
type MediaRow struct {
	ID        int64
	Kind      string
	SHA256    string
	Size      int64
	BlobPath  string
	TitleEnc  []byte
	NotesEnc  []byte
	SourceEnc []byte
	Rating    int
	Favorite  bool
	Duration  sql.NullFloat64
	Width     sql.NullInt64
	Height    sql.NullInt64
	PageCount sql.NullInt64
	ThumbPath sql.NullString
	CreatedAt int64
	UpdatedAt int64
}

// InsertMedia stores a new row and returns its id. Returns the existing id and
// existed=true if a row with the same sha256 already exists (dedup).
func (d *DB) InsertMedia(ctx context.Context, m *MediaRow) (id int64, existed bool, err error) {
	err = d.sql.QueryRowContext(ctx, `SELECT id FROM media WHERE sha256 = ?`, m.SHA256).Scan(&id)
	if err == nil {
		return id, true, nil
	}
	if err != sql.ErrNoRows {
		return 0, false, err
	}
	ts := now()
	res, err := d.sql.ExecContext(ctx, `
		INSERT INTO media(kind, sha256, size, blob_path, title_enc, notes_enc, source_enc,
		                  rating, favorite, duration, width, height, page_count, created_at, updated_at)
		VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
		m.Kind, m.SHA256, m.Size, m.BlobPath, m.TitleEnc, m.NotesEnc, m.SourceEnc,
		m.Rating, boolToInt(m.Favorite), m.Duration, m.Width, m.Height, m.PageCount, ts, ts)
	if err != nil {
		return 0, false, err
	}
	id, err = res.LastInsertId()
	return id, false, err
}

func (d *DB) GetMedia(ctx context.Context, id int64) (*MediaRow, error) {
	m := &MediaRow{}
	var fav int
	err := d.sql.QueryRowContext(ctx, `
		SELECT id, kind, sha256, size, blob_path, title_enc, notes_enc, source_enc,
		       rating, favorite, duration, width, height, page_count, thumb_path, created_at, updated_at
		FROM media WHERE id = ?`, id).Scan(
		&m.ID, &m.Kind, &m.SHA256, &m.Size, &m.BlobPath, &m.TitleEnc, &m.NotesEnc, &m.SourceEnc,
		&m.Rating, &fav, &m.Duration, &m.Width, &m.Height, &m.PageCount, &m.ThumbPath, &m.CreatedAt, &m.UpdatedAt)
	if err != nil {
		return nil, err
	}
	m.Favorite = fav != 0
	return m, nil
}

// UpdateMediaDimensions sets width/height (e.g. after AI decode).
func (d *DB) UpdateMediaDimensions(ctx context.Context, id int64, w, h int) error {
	_, err := d.sql.ExecContext(ctx,
		`UPDATE media SET width = ?, height = ?, updated_at = ? WHERE id = ?`,
		w, h, now(), id)
	return err
}

// SetThumbPath records the relative store path of a generated thumbnail blob.
func (d *DB) SetThumbPath(ctx context.Context, id int64, rel string) error {
	_, err := d.sql.ExecContext(ctx,
		`UPDATE media SET thumb_path = ?, updated_at = ? WHERE id = ?`, rel, now(), id)
	return err
}

// UpdateVideoMeta fills in probed video metadata. Zero values are left untouched
// so a partial probe (e.g. dimensions but no duration) never clobbers good data.
func (d *DB) UpdateVideoMeta(ctx context.Context, id int64, dur float64, w, h int) error {
	_, err := d.sql.ExecContext(ctx, `
		UPDATE media SET
		    duration = CASE WHEN ? > 0 THEN ? ELSE duration END,
		    width    = CASE WHEN ? > 0 THEN ? ELSE width END,
		    height   = CASE WHEN ? > 0 THEN ? ELSE height END,
		    updated_at = ?
		WHERE id = ?`,
		dur, dur, w, w, h, h, now(), id)
	return err
}

// VideosMissingThumbs returns id/blob_path for videos that have no thumbnail yet,
// used to backfill posters for items imported before thumbnailing existed.
func (d *DB) VideosMissingThumbs(ctx context.Context, limit int) ([]*MediaRow, error) {
	if limit <= 0 || limit > 1000 {
		limit = 500
	}
	rows, err := d.sql.QueryContext(ctx, `
		SELECT id, kind, blob_path, size, duration
		FROM media
		WHERE kind = 'video' AND (thumb_path IS NULL OR thumb_path = '')
		ORDER BY created_at DESC LIMIT ?`, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []*MediaRow
	for rows.Next() {
		m := &MediaRow{}
		if err := rows.Scan(&m.ID, &m.Kind, &m.BlobPath, &m.Size, &m.Duration); err != nil {
			return nil, err
		}
		out = append(out, m)
	}
	return out, rows.Err()
}

// ListMedia returns rows filtered by kind (empty = all), newest first.
func (d *DB) ListMedia(ctx context.Context, kind string, limit, offset int) ([]*MediaRow, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	q := `SELECT id, kind, sha256, size, blob_path, title_enc, notes_enc, source_enc,
	             rating, favorite, duration, width, height, page_count, thumb_path, created_at, updated_at
	      FROM media`
	args := []any{}
	if kind != "" {
		q += ` WHERE kind = ?`
		args = append(args, kind)
	}
	q += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`
	args = append(args, limit, offset)

	rows, err := d.sql.QueryContext(ctx, q, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var out []*MediaRow
	for rows.Next() {
		m := &MediaRow{}
		var fav int
		if err := rows.Scan(&m.ID, &m.Kind, &m.SHA256, &m.Size, &m.BlobPath,
			&m.TitleEnc, &m.NotesEnc, &m.SourceEnc, &m.Rating, &fav,
			&m.Duration, &m.Width, &m.Height, &m.PageCount, &m.ThumbPath, &m.CreatedAt, &m.UpdatedAt); err != nil {
			return nil, err
		}
		m.Favorite = fav != 0
		out = append(out, m)
	}
	return out, rows.Err()
}
