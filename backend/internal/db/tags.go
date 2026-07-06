package db

import (
	"context"

	"github.com/youruser/oppailib/internal/models"
)

// AddTag ensures the (name, category) tag exists and links it to a media row.
// source is manual|ai|scrape; score is optional AI confidence.
func (d *DB) AddTag(ctx context.Context, mediaID int64, name, category, source string, score float64) error {
	if category == "" {
		category = "general"
	}
	var tagID int64
	err := d.sql.QueryRowContext(ctx,
		`SELECT id FROM tags WHERE name = ? AND category = ?`, name, category).Scan(&tagID)
	if err != nil {
		res, err := d.sql.ExecContext(ctx,
			`INSERT INTO tags(name, category) VALUES(?,?)`, name, category)
		if err != nil {
			return err
		}
		if tagID, err = res.LastInsertId(); err != nil {
			return err
		}
	}
	_, err = d.sql.ExecContext(ctx, `
		INSERT INTO media_tags(media_id, tag_id, source, score) VALUES(?,?,?,?)
		ON CONFLICT(media_id, tag_id) DO UPDATE SET source=excluded.source, score=excluded.score`,
		mediaID, tagID, source, nullFloat(score))
	return err
}

// RemoveTag unlinks a tag (by name, any category) from a media row. The tags
// row itself is left in place — it may still be referenced by other media.
func (d *DB) RemoveTag(ctx context.Context, mediaID int64, name string) error {
	_, err := d.sql.ExecContext(ctx, `
		DELETE FROM media_tags
		WHERE media_id = ? AND tag_id IN (SELECT id FROM tags WHERE name = ?)`,
		mediaID, name)
	return err
}

// TagsForMedia returns all tags attached to a media row.
func (d *DB) TagsForMedia(ctx context.Context, mediaID int64) ([]models.Tag, error) {
	rows, err := d.sql.QueryContext(ctx, `
		SELECT t.id, t.name, t.category, mt.source, COALESCE(mt.score, 0)
		FROM media_tags mt JOIN tags t ON t.id = mt.tag_id
		WHERE mt.media_id = ? ORDER BY t.category, t.name`, mediaID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []models.Tag
	for rows.Next() {
		var t models.Tag
		if err := rows.Scan(&t.ID, &t.Name, &t.Category, &t.Source, &t.Score); err != nil {
			return nil, err
		}
		out = append(out, t)
	}
	return out, rows.Err()
}

func nullFloat(f float64) any {
	if f == 0 {
		return nil
	}
	return f
}
