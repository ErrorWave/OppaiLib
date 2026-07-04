// Package thumbnail extracts a poster frame and probes basic metadata from a
// video file using ffmpeg/ffprobe (both shipped in the runtime image via the
// `ffmpeg` apt package). It operates on a plaintext temp file the caller has
// already decrypted — nothing here touches the encrypted store directly.
package thumbnail

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os/exec"
	"strconv"
	"time"
)

// Available reports whether the ffmpeg/ffprobe binaries are on PATH. Callers use
// this to skip thumbnailing gracefully (heuristic-fallback style) rather than
// erroring on a lean image without ffmpeg.
func Available() bool {
	_, e1 := exec.LookPath("ffmpeg")
	_, e2 := exec.LookPath("ffprobe")
	return e1 == nil && e2 == nil
}

// Meta is the subset of probed video metadata OppaiLib stores.
type Meta struct {
	Duration float64 // seconds; 0 if unknown
	Width    int
	Height   int
}

type ffprobeOut struct {
	Format struct {
		Duration string `json:"duration"`
	} `json:"format"`
	Streams []struct {
		CodecType string `json:"codec_type"`
		Width     int    `json:"width"`
		Height    int    `json:"height"`
		Duration  string `json:"duration"`
	} `json:"streams"`
}

// Probe returns duration + dimensions for the video at path. A best-effort call:
// on any failure it returns a zero Meta and the error, and callers treat missing
// metadata as non-fatal.
func Probe(ctx context.Context, path string) (Meta, error) {
	cmd := exec.CommandContext(ctx, "ffprobe",
		"-v", "error",
		"-print_format", "json",
		"-show_format",
		"-show_streams",
		path,
	)
	var out, stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	if err := cmd.Run(); err != nil {
		return Meta{}, fmt.Errorf("ffprobe: %w: %s", err, stderr.String())
	}
	var parsed ffprobeOut
	if err := json.Unmarshal(out.Bytes(), &parsed); err != nil {
		return Meta{}, fmt.Errorf("ffprobe: parse: %w", err)
	}
	m := Meta{}
	if d, err := strconv.ParseFloat(parsed.Format.Duration, 64); err == nil {
		m.Duration = d
	}
	for _, s := range parsed.Streams {
		if s.CodecType == "video" && s.Width > 0 && s.Height > 0 {
			m.Width, m.Height = s.Width, s.Height
			if m.Duration == 0 {
				if d, err := strconv.ParseFloat(s.Duration, 64); err == nil {
					m.Duration = d
				}
			}
			break
		}
	}
	return m, nil
}

// Frame renders a single JPEG poster frame from the video at path and returns
// the encoded bytes. It seeks to a representative point (a fraction of the
// duration, capped) so the poster isn't a black lead-in frame, scales down to
// maxWidth preserving aspect, and never upscales.
func Frame(ctx context.Context, path string, dur float64, maxWidth int) ([]byte, error) {
	if maxWidth <= 0 {
		maxWidth = 640
	}
	// Seek to 10% in, capped to 10s, but stay before the end of very short clips.
	seek := dur * 0.1
	if seek > 10 {
		seek = 10
	}
	if dur > 0 && seek > dur-0.1 {
		seek = dur / 2
	}
	if seek < 0 {
		seek = 0
	}

	// -ss before -i is input seeking (fast, keyframe-accurate enough for a poster).
	// scale=min(iw,MAX):-2 caps width without upscaling; -2 keeps height even.
	vf := fmt.Sprintf("scale='min(%d,iw)':-2", maxWidth)
	cmd := exec.CommandContext(ctx, "ffmpeg",
		"-nostdin",
		"-ss", strconv.FormatFloat(seek, 'f', 3, 64),
		"-i", path,
		"-frames:v", "1",
		"-vf", vf,
		"-q:v", "3",
		"-f", "image2",
		"-c:v", "mjpeg",
		"pipe:1",
	)
	var out, stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	if err := cmd.Run(); err != nil {
		return nil, fmt.Errorf("ffmpeg: %w: %s", err, stderr.String())
	}
	if out.Len() == 0 {
		return nil, errors.New("ffmpeg: produced no frame")
	}
	return out.Bytes(), nil
}

// DefaultTimeout bounds a single probe+frame job so a pathological file can't
// wedge a worker forever.
const DefaultTimeout = 90 * time.Second
