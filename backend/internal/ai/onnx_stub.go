//go:build !onnx

package ai

import "errors"

// newOnnxTagger is a no-op in the default (cgo-free) build. Build with
// `-tags onnx` and mount the ONNX Runtime shared library to enable real
// inference. See docs/AI.md.
func newOnnxTagger(_ /*modelDir*/, _ /*device*/ string) (Tagger, error) {
	return nil, errors.New("built without onnx support (rebuild with -tags onnx)")
}
