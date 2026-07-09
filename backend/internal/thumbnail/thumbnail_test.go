package thumbnail

import (
	"bytes"
	"context"
	"image"
	_ "image/jpeg"
	"os/exec"
	"path/filepath"
	"testing"
	"time"
)

// testVideo renders a 320x240, 2-second clip with ffmpeg's synthetic source.
func testVideo(t *testing.T) string {
	t.Helper()
	if !Available() {
		t.Skip("ffmpeg/ffprobe not on PATH")
	}
	path := filepath.Join(t.TempDir(), "test.mp4")
	cmd := exec.Command("ffmpeg", "-nostdin", "-y",
		"-f", "lavfi", "-i", "testsrc=size=320x240:rate=10:duration=2",
		"-pix_fmt", "yuv420p", path)
	var stderr bytes.Buffer
	cmd.Stderr = &stderr
	if err := cmd.Run(); err != nil {
		t.Fatalf("ffmpeg fixture: %v: %s", err, stderr.String())
	}
	return path
}

func frameWidth(t *testing.T, jpg []byte) int {
	t.Helper()
	cfg, _, err := image.DecodeConfig(bytes.NewReader(jpg))
	if err != nil {
		t.Fatalf("decode frame: %v", err)
	}
	return cfg.Width
}

// The AI tagger calls FrameAt with maxWidth=0 and relies on getting native
// pixels back — a silently downscaled frame would make resolution-sensitive
// tags ("high-res") report on the thumbnail rather than the source.
func TestFrameAtNativeResolutionWhenMaxWidthUnset(t *testing.T) {
	path := testVideo(t)
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	jpg, err := FrameAt(ctx, path, 1.0, 0)
	if err != nil {
		t.Fatalf("FrameAt: %v", err)
	}
	if got := frameWidth(t, jpg); got != 320 {
		t.Errorf("native frame width = %d, want 320", got)
	}
}

func TestFrameAtScalesDownButNeverUp(t *testing.T) {
	path := testVideo(t)
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	jpg, err := FrameAt(ctx, path, 1.0, 160)
	if err != nil {
		t.Fatalf("FrameAt scaled: %v", err)
	}
	if got := frameWidth(t, jpg); got != 160 {
		t.Errorf("scaled frame width = %d, want 160", got)
	}

	// maxWidth above the source width must not upscale.
	jpg, err = FrameAt(ctx, path, 1.0, 640)
	if err != nil {
		t.Fatalf("FrameAt oversized: %v", err)
	}
	if got := frameWidth(t, jpg); got != 320 {
		t.Errorf("oversized maxWidth upscaled to %d, want 320", got)
	}
}

// Frame is now a thin wrapper over FrameAt; keep its poster contract covered.
func TestFrameStillProducesAPoster(t *testing.T) {
	path := testVideo(t)
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	jpg, err := Frame(ctx, path, 2.0, 640)
	if err != nil {
		t.Fatalf("Frame: %v", err)
	}
	if got := frameWidth(t, jpg); got != 320 {
		t.Errorf("poster width = %d, want 320 (no upscale)", got)
	}
}

func TestProbeReadsDurationAndDimensions(t *testing.T) {
	path := testVideo(t)
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	meta, err := Probe(ctx, path)
	if err != nil {
		t.Fatalf("Probe: %v", err)
	}
	if meta.Width != 320 || meta.Height != 240 {
		t.Errorf("dimensions = %dx%d, want 320x240", meta.Width, meta.Height)
	}
	if meta.Duration < 1.5 || meta.Duration > 2.5 {
		t.Errorf("duration = %v, want ~2s", meta.Duration)
	}
}
