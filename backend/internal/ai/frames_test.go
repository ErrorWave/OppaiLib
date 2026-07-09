package ai

import (
	"bytes"
	"image"
	"image/color"
	"image/gif"
	"testing"
)

var (
	red  = color.RGBA{255, 0, 0, 255}
	blue = color.RGBA{0, 0, 255, 255}
)

// buildGIF encodes a 10x10 two-frame GIF: a full red canvas, then a 4x4 blue
// square in the top-left corner as a partial delta frame. disposal0 is the
// disposal method declared on the first frame.
func buildGIF(t *testing.T, disposal0 byte) []byte {
	t.Helper()
	const w, h = 10, 10
	pal := color.Palette{red, blue, color.RGBA{0, 0, 0, 0}}

	full := image.NewPaletted(image.Rect(0, 0, w, h), pal)
	for i := range full.Pix {
		full.Pix[i] = 0 // red
	}
	delta := image.NewPaletted(image.Rect(0, 0, 4, 4), pal)
	for i := range delta.Pix {
		delta.Pix[i] = 1 // blue
	}

	var buf bytes.Buffer
	err := gif.EncodeAll(&buf, &gif.GIF{
		Image:    []*image.Paletted{full, delta},
		Delay:    []int{10, 10},
		Disposal: []byte{disposal0, 0},
		Config:   image.Config{ColorModel: pal, Width: w, Height: h},
	})
	if err != nil {
		t.Fatalf("encode gif: %v", err)
	}
	return buf.Bytes()
}

func assertColor(t *testing.T, img image.Image, x, y int, want color.RGBA, ctx string) {
	t.Helper()
	r, g, b, a := img.At(x, y).RGBA()
	wr, wg, wb, wa := want.RGBA()
	if r != wr || g != wg || b != wb || a != wa {
		t.Errorf("%s: pixel (%d,%d) = rgba(%d,%d,%d,%d), want rgba(%d,%d,%d,%d)",
			ctx, x, y, r>>8, g>>8, b>>8, a>>8, wr>>8, wg>>8, wb>>8, wa>>8)
	}
}

// The regression this guards: a naive implementation hands g.Image[1] straight
// to the tagger. That frame is a 4x4 delta, not the 10x10 picture a viewer sees.
func TestGIFFramesCompositesPartialDeltaOntoCanvas(t *testing.T) {
	frames, err := gifFrames(bytes.NewReader(buildGIF(t, gif.DisposalNone)), 2)
	if err != nil {
		t.Fatalf("gifFrames: %v", err)
	}
	if len(frames) != 2 {
		t.Fatalf("got %d frames, want 2", len(frames))
	}

	second := frames[1]
	if got, want := second.Bounds(), image.Rect(0, 0, 10, 10); got != want {
		t.Fatalf("delta frame not composited to full canvas: bounds %v, want %v", got, want)
	}
	assertColor(t, second, 1, 1, blue, "delta region")
	// The pixel the delta never touched must still show frame 0 (DisposalNone).
	assertColor(t, second, 8, 8, red, "retained background")
}

func TestGIFFramesHonoursDisposalBackground(t *testing.T) {
	frames, err := gifFrames(bytes.NewReader(buildGIF(t, gif.DisposalBackground)), 2)
	if err != nil {
		t.Fatalf("gifFrames: %v", err)
	}
	second := frames[1]
	assertColor(t, second, 1, 1, blue, "delta region")
	// Frame 0 declared DisposalBackground over the whole canvas, so everything it
	// painted is cleared to transparent before frame 1 draws.
	if _, _, _, a := second.At(8, 8).RGBA(); a != 0 {
		t.Errorf("DisposalBackground: pixel (8,8) alpha = %d, want 0 (cleared)", a>>8)
	}
}

func TestGIFFramesSamplesAtMostN(t *testing.T) {
	frames, err := gifFrames(bytes.NewReader(buildGIF(t, gif.DisposalNone)), 1)
	if err != nil {
		t.Fatalf("gifFrames: %v", err)
	}
	if len(frames) != 1 {
		t.Fatalf("got %d frames, want 1", len(frames))
	}
}

func TestSampleOffsets(t *testing.T) {
	if got := sampleOffsets(0, 5); len(got) != 1 || got[0] != 0 {
		t.Errorf("unknown duration: got %v, want [0]", got)
	}
	if got := sampleOffsets(100, 1); len(got) != 1 || got[0] != 50 {
		t.Errorf("single frame: got %v, want [50] (midpoint)", got)
	}

	got := sampleOffsets(100, 4)
	if len(got) != 4 {
		t.Fatalf("got %d offsets, want 4", len(got))
	}
	for i, at := range got {
		if at < 5 || at > 95 {
			t.Errorf("offset %d = %v, outside the middle 90%% [5,95]", i, at)
		}
		if i > 0 && at <= got[i-1] {
			t.Errorf("offsets not strictly increasing: %v", got)
		}
	}
}

func TestSampleIndices(t *testing.T) {
	if got := sampleIndices(3, 10); len(got) != 3 {
		t.Errorf("n > total: got %v, want all 3 indices", got)
	}
	for _, idx := range sampleIndices(10, 3) {
		if idx < 0 || idx >= 10 {
			t.Errorf("index %d out of range [0,10)", idx)
		}
	}
	if got := sampleIndices(0, 3); got != nil {
		t.Errorf("empty input: got %v, want nil", got)
	}
}

// A tag true of only one scene is true of the clip, so the highest score across
// frames wins rather than the mean.
func TestAggregateKeepsMaxScorePerTagInFirstSeenOrder(t *testing.T) {
	got := aggregate([][]Suggestion{
		{{Name: "a", Category: "general", Score: 0.2}, {Name: "b", Category: "general", Score: 0.9}},
		{{Name: "a", Category: "general", Score: 0.7}},
	})
	if len(got) != 2 {
		t.Fatalf("got %d suggestions, want 2: %+v", len(got), got)
	}
	if got[0].Name != "a" || got[0].Score != 0.7 {
		t.Errorf("got[0] = %+v, want a@0.7 (max across frames)", got[0])
	}
	if got[1].Name != "b" || got[1].Score != 0.9 {
		t.Errorf("got[1] = %+v, want b@0.9", got[1])
	}
}

// Same name in different categories must not collapse into one tag.
func TestAggregateSeparatesCategories(t *testing.T) {
	got := aggregate([][]Suggestion{
		{{Name: "x", Category: "meta", Score: 0.5}, {Name: "x", Category: "general", Score: 0.4}},
	})
	if len(got) != 2 {
		t.Fatalf("got %d suggestions, want 2: %+v", len(got), got)
	}
}

func ratingsOf(sugs []Suggestion) []string {
	var out []string
	for _, s := range sugs {
		if s.Category == catRating {
			out = append(out, s.Name)
		}
	}
	return out
}

// Ratings are mutually exclusive: a clip gets exactly one, even though its
// frames each contributed their own.
func TestAggregateCollapsesRatingsToMostSevere(t *testing.T) {
	// Four tame frames and one explicit one. "general" scores higher and is seen
	// more often, but a clip containing an explicit scene is explicit.
	got := aggregate([][]Suggestion{
		{{Name: "general", Category: catRating, Score: 0.99}},
		{{Name: "general", Category: catRating, Score: 0.98}},
		{{Name: "sensitive", Category: catRating, Score: 0.60}},
		{{Name: "explicit", Category: catRating, Score: 0.55}},
		{{Name: "general", Category: catRating, Score: 0.97}},
	})
	if names := ratingsOf(got); len(names) != 1 || names[0] != "explicit" {
		t.Fatalf("ratings = %v, want exactly [explicit]", names)
	}
	if got[0].Score != 0.55 {
		t.Errorf("score = %v, want the explicit frame's 0.55", got[0].Score)
	}
}

// The winning rating still reports the best score it achieved on any frame.
func TestAggregateRatingKeepsMaxScoreOfWinner(t *testing.T) {
	got := aggregate([][]Suggestion{
		{{Name: "explicit", Category: catRating, Score: 0.40}},
		{{Name: "explicit", Category: catRating, Score: 0.80}},
	})
	if len(got) != 1 || got[0].Score != 0.80 {
		t.Fatalf("got %+v, want one explicit@0.8", got)
	}
}

// Collapsing ratings must not disturb the other categories.
func TestAggregateRatingCollapseLeavesOtherTags(t *testing.T) {
	got := aggregate([][]Suggestion{
		{{Name: "general", Category: catRating, Score: 0.9}, {Name: "1girl", Category: catGeneral, Score: 0.9}},
		{{Name: "explicit", Category: catRating, Score: 0.7}, {Name: "nude", Category: catGeneral, Score: 0.8}},
	})
	if names := ratingsOf(got); len(names) != 1 || names[0] != "explicit" {
		t.Fatalf("ratings = %v, want exactly [explicit]", names)
	}
	if len(got) != 3 {
		t.Fatalf("got %d suggestions, want 3 (1 rating + 2 general): %+v", len(got), got)
	}
}

// A model whose rating labels are not wd14's four must still yield one rating,
// and a recognised rating outranks an unrecognised one.
func TestAggregateUnknownRatings(t *testing.T) {
	got := aggregate([][]Suggestion{
		{{Name: "spicy", Category: catRating, Score: 0.9}},
		{{Name: "sensitive", Category: catRating, Score: 0.1}},
	})
	if names := ratingsOf(got); len(names) != 1 || names[0] != "sensitive" {
		t.Fatalf("ratings = %v, want exactly [sensitive] (known beats unknown)", names)
	}

	got = aggregate([][]Suggestion{
		{{Name: "spicy", Category: catRating, Score: 0.9}},
		{{Name: "mild", Category: catRating, Score: 0.1}},
	})
	if names := ratingsOf(got); len(names) != 1 || names[0] != "spicy" {
		t.Fatalf("ratings = %v, want exactly [spicy] (first seen wins among unknowns)", names)
	}
}

// A tagger that emits no ratings at all (the heuristic one) is unaffected.
func TestAggregateNoRatings(t *testing.T) {
	got := aggregate([][]Suggestion{
		{{Name: "portrait", Category: "meta", Score: 1}},
		{{Name: "high-res", Category: "meta", Score: 1}},
	})
	if len(got) != 2 {
		t.Fatalf("got %d suggestions, want 2: %+v", len(got), got)
	}
}
