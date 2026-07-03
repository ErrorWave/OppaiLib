//go:build onnx

// This file is only compiled with `-tags onnx`. It depends on
// github.com/yalue/onnxruntime_go and the ONNX Runtime shared library at
// runtime. Before building, run:
//
//	go get github.com/yalue/onnxruntime_go
//	go build -tags onnx ./...
//
// and set ONNXRUNTIME_LIB_PATH (or place libonnxruntime.so where the loader
// looks). See docs/AI.md for model + label file setup.
package ai

import (
	"context"
	"encoding/json"
	"fmt"
	"image"
	"os"
	"path/filepath"
	"sort"
	"strings"

	ort "github.com/yalue/onnxruntime_go"
	"golang.org/x/image/draw"
)

// modelConfig is /config/models/model.json — describes how to feed the model.
type modelConfig struct {
	Model      string    `json:"model"`       // onnx file name
	Labels     string    `json:"labels"`      // one label per line
	InputName  string    `json:"input_name"`  // graph input tensor name
	OutputName string    `json:"output_name"` // graph output tensor name
	InputSize  int       `json:"input_size"`  // square side, e.g. 448
	Layout     string    `json:"layout"`      // "nchw" | "nhwc"
	BGR        bool      `json:"bgr"`         // swap channels to BGR
	Scale      float32   `json:"scale"`       // multiply pixels by this (e.g. 1/255)
	Mean       []float32 `json:"mean"`        // per-channel mean (optional)
	Std        []float32 `json:"std"`         // per-channel std  (optional)
	Threshold  float32   `json:"threshold"`   // min score to emit a tag
	Category   string    `json:"category"`    // tag category to assign
}

type onnxTagger struct {
	cfg     modelConfig
	labels  []string
	session *ort.AdvancedSession
	input   *ort.Tensor[float32]
	output  *ort.Tensor[float32]
}

func newOnnxTagger(modelDir, device string) (Tagger, error) {
	cfgPath := filepath.Join(modelDir, "model.json")
	raw, err := os.ReadFile(cfgPath)
	if err != nil {
		return nil, fmt.Errorf("read %s: %w", cfgPath, err)
	}
	var cfg modelConfig
	if err := json.Unmarshal(raw, &cfg); err != nil {
		return nil, err
	}
	applyDefaults(&cfg)

	labels, err := readLabels(filepath.Join(modelDir, cfg.Labels))
	if err != nil {
		return nil, err
	}
	if libPath := os.Getenv("ONNXRUNTIME_LIB_PATH"); libPath != "" {
		ort.SetSharedLibraryPath(libPath)
	}
	if err := ort.InitializeEnvironment(); err != nil {
		return nil, err
	}

	s := cfg.InputSize
	inShape := ort.NewShape(1, 3, int64(s), int64(s))
	if cfg.Layout == "nhwc" {
		inShape = ort.NewShape(1, int64(s), int64(s), 3)
	}
	inTensor, err := ort.NewEmptyTensor[float32](inShape)
	if err != nil {
		return nil, err
	}
	outTensor, err := ort.NewEmptyTensor[float32](ort.NewShape(1, int64(len(labels))))
	if err != nil {
		return nil, err
	}
	sess, err := ort.NewAdvancedSession(
		filepath.Join(modelDir, cfg.Model),
		[]string{cfg.InputName}, []string{cfg.OutputName},
		[]ort.ArbitraryTensor{inTensor}, []ort.ArbitraryTensor{outTensor}, nil)
	if err != nil {
		return nil, err
	}
	return &onnxTagger{cfg: cfg, labels: labels, session: sess, input: inTensor, output: outTensor}, nil
}

func (t *onnxTagger) Name() string { return "onnx:" + filepath.Base(t.cfg.Model) }

func (t *onnxTagger) Tag(_ context.Context, img image.Image) ([]Suggestion, error) {
	t.preprocess(img, t.input.GetData())
	if err := t.session.Run(); err != nil {
		return nil, err
	}
	scores := t.output.GetData()
	var out []Suggestion
	for i, sc := range scores {
		if i >= len(t.labels) {
			break
		}
		if sc >= t.cfg.Threshold {
			out = append(out, Suggestion{Name: t.labels[i], Category: t.cfg.Category, Score: float64(sc)})
		}
	}
	sort.Slice(out, func(a, b int) bool { return out[a].Score > out[b].Score })
	return out, nil
}

// preprocess resizes img to the model input and writes normalized pixels into
// dst according to the configured layout/order/normalization.
func (t *onnxTagger) preprocess(src image.Image, dst []float32) {
	s := t.cfg.InputSize
	resized := image.NewRGBA(image.Rect(0, 0, s, s))
	draw.CatmullRom.Scale(resized, resized.Bounds(), src, src.Bounds(), draw.Over, nil)

	norm := func(v float32, ch int) float32 {
		v *= t.cfg.Scale
		if len(t.cfg.Mean) == 3 {
			v -= t.cfg.Mean[ch]
		}
		if len(t.cfg.Std) == 3 {
			v /= t.cfg.Std[ch]
		}
		return v
	}
	plane := s * s
	for y := 0; y < s; y++ {
		for x := 0; x < s; x++ {
			r, g, b, _ := resized.At(x, y).RGBA()
			ch := [3]float32{float32(r >> 8), float32(g >> 8), float32(b >> 8)}
			if t.cfg.BGR {
				ch[0], ch[2] = ch[2], ch[0]
			}
			idx := y*s + x
			for c := 0; c < 3; c++ {
				val := norm(ch[c], c)
				if t.cfg.Layout == "nhwc" {
					dst[idx*3+c] = val
				} else { // nchw
					dst[c*plane+idx] = val
				}
			}
		}
	}
}

func applyDefaults(c *modelConfig) {
	if c.InputName == "" {
		c.InputName = "input"
	}
	if c.OutputName == "" {
		c.OutputName = "output"
	}
	if c.InputSize == 0 {
		c.InputSize = 448
	}
	if c.Layout == "" {
		c.Layout = "nchw"
	}
	if c.Scale == 0 {
		c.Scale = 1.0 / 255.0
	}
	if c.Threshold == 0 {
		c.Threshold = 0.35
	}
	if c.Category == "" {
		c.Category = "general"
	}
	if c.Model == "" {
		c.Model = "model.onnx"
	}
	if c.Labels == "" {
		c.Labels = "labels.txt"
	}
}

func readLabels(path string) ([]string, error) {
	raw, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	var labels []string
	for _, line := range strings.Split(string(raw), "\n") {
		if l := strings.TrimSpace(line); l != "" {
			labels = append(labels, l)
		}
	}
	return labels, nil
}
