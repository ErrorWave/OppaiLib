package ai

import (
	"errors"
	"image"
	"image/draw"
	"image/gif"
	"io"
)

// sampleOffsets returns n evenly spaced timestamps (seconds) across a clip of
// the given duration, kept inside the middle 90% so we never sample the black
// lead-in or the trailing credits. An unknown duration yields a single offset at
// 0 — without a probe there is nothing better to aim at.
func sampleOffsets(dur float64, n int) []float64 {
	if n < 1 {
		n = 1
	}
	if dur <= 0 {
		return []float64{0}
	}
	const lead, span = 0.05, 0.90
	out := make([]float64, 0, n)
	for i := range n {
		// Midpoint of the i-th of n equal buckets inside [lead, lead+span].
		frac := lead + span*(float64(i)+0.5)/float64(n)
		out = append(out, dur*frac)
	}
	return out
}

// sampleIndices picks n evenly spaced indices from [0,total). If n >= total it
// returns every index.
func sampleIndices(total, n int) []int {
	if total <= 0 {
		return nil
	}
	if n < 1 {
		n = 1
	}
	if n >= total {
		out := make([]int, total)
		for i := range out {
			out[i] = i
		}
		return out
	}
	out := make([]int, 0, n)
	for i := range n {
		idx := int((float64(i) + 0.5) * float64(total) / float64(n))
		if idx >= total {
			idx = total - 1
		}
		out = append(out, idx)
	}
	return out
}

// gifFrames decodes an animated GIF and returns up to n fully composited frames,
// evenly sampled across the animation.
//
// Compositing is not optional. Every frame after the first is typically a
// partial delta — a sub-rectangle of the canvas with everything else
// transparent — whose meaning depends on the disposal method of the frame
// before it. Handing a raw delta to a tagger would classify a transparent
// sliver rather than the picture a viewer sees. So we replay the animation onto
// a persistent canvas and snapshot only the frames we intend to tag.
func gifFrames(r io.Reader, n int) ([]image.Image, error) {
	g, err := gif.DecodeAll(r)
	if err != nil {
		return nil, err
	}
	if len(g.Image) == 0 {
		return nil, errors.New("gif: no frames")
	}

	// g.Config is normally populated by DecodeAll; fall back to the first frame's
	// extent for GIFs with a malformed logical-screen descriptor.
	w, h := g.Config.Width, g.Config.Height
	if w <= 0 || h <= 0 {
		b := g.Image[0].Bounds()
		w, h = b.Dx(), b.Dy()
	}

	keep := make(map[int]bool, n)
	for _, idx := range sampleIndices(len(g.Image), n) {
		keep[idx] = true
	}

	canvas := image.NewRGBA(image.Rect(0, 0, w, h))
	var prev *image.RGBA // canvas snapshot, for DisposalPrevious

	out := make([]image.Image, 0, len(keep))
	for i, frame := range g.Image {
		// Apply the *previous* frame's disposal before drawing this one.
		if i > 0 && i-1 < len(g.Disposal) {
			switch g.Disposal[i-1] {
			case gif.DisposalBackground:
				draw.Draw(canvas, g.Image[i-1].Bounds(), image.Transparent, image.Point{}, draw.Src)
			case gif.DisposalPrevious:
				if prev != nil {
					draw.Draw(canvas, canvas.Bounds(), prev, canvas.Bounds().Min, draw.Src)
				}
			}
		}
		// If this frame wants "restore to previous", capture the canvas as it looks
		// before the frame is drawn — that is the state its successor restores.
		if i < len(g.Disposal) && g.Disposal[i] == gif.DisposalPrevious {
			prev = image.NewRGBA(canvas.Bounds())
			draw.Draw(prev, canvas.Bounds(), canvas, canvas.Bounds().Min, draw.Src)
		}

		// draw.Over honours the palette's transparent index, leaving the canvas
		// showing through wherever this frame is transparent.
		draw.Draw(canvas, frame.Bounds(), frame, frame.Bounds().Min, draw.Over)

		if keep[i] {
			snap := image.NewRGBA(canvas.Bounds())
			draw.Draw(snap, canvas.Bounds(), canvas, canvas.Bounds().Min, draw.Src)
			out = append(out, snap)
		}
	}
	return out, nil
}

// aggregate collapses per-frame suggestions into one set for the whole item,
// keeping the highest confidence seen for each (name, category). Max rather than
// mean: a tag that is only true for part of a clip — a costume that appears in
// one scene — is still true of the clip, and averaging would bury it under the
// frames where it is legitimately absent.
//
// Ratings are the exception. They are mutually exclusive, so the frames are
// reduced to the single most severe rating any of them reported rather than to
// one tag per distinct rating seen. See ratingSeverity.
func aggregate(frames [][]Suggestion) []Suggestion {
	type key struct{ name, category string }
	best := make(map[key]Suggestion)
	var order []key

	for _, fs := range frames {
		for _, s := range fs {
			k := key{s.Name, s.Category}
			cur, seen := best[k]
			if !seen {
				order = append(order, k)
				best[k] = s
				continue
			}
			if s.Score > cur.Score {
				best[k] = s
			}
		}
	}

	// Pick the winning rating before emitting, so the losers can be skipped.
	winner, hasRating := key{}, false
	for _, k := range order {
		if k.category != catRating {
			continue
		}
		if !hasRating || moreSevere(k.name, winner.name) {
			winner, hasRating = k, true
		}
	}

	// Stable, first-seen order so repeated runs write tags deterministically.
	out := make([]Suggestion, 0, len(order))
	for _, k := range order {
		if k.category == catRating && k != winner {
			continue
		}
		out = append(out, best[k])
	}
	return out
}

// moreSevere reports whether rating a outranks rating b. Unknown ratings — a
// model whose rating labels are not wd14's four — sort below every known one, so
// a recognised rating always wins over a name we cannot place.
func moreSevere(a, b string) bool {
	sa, oka := ratingSeverity[a]
	sb, okb := ratingSeverity[b]
	if oka != okb {
		return oka
	}
	return sa > sb
}
