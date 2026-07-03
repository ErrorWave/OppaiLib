# Local AI auto-tagging

OppaiLib tags images **entirely on your hardware**. Nothing is sent anywhere.

## Two modes

### 1. Heuristic (default, always on)
The default image is built **cgo-free** and ships with a zero-dependency
heuristic tagger. It emits structural `meta` tags (`portrait`/`landscape`/
`square`, `high-res`) and records image dimensions. No model, no GPU, works on
any Unraid box. This guarantees the "CPU fallback always works" requirement.

### 2. ONNX (opt-in, real classification)
For real content tagging, OppaiLib runs a local multi-label image classifier via
[ONNX Runtime](https://onnxruntime.ai/). This is compiled in with a build tag and
uses a model you supply.

**Model choice / justification.** The recommended default is an open
Danbooru-style multi-label tagger exported to ONNX (the "wd14"/"wd-tagger"
family), because it:
- is fully open and self-hostable (no API, no licence phone-home),
- outputs hundreds of human-meaningful tags per image with confidence scores,
- runs comfortably on CPU (~0.2–1s/image) and accelerates on GPU,
- is a plain `model.onnx` + `labels.txt`, so it is trivially swappable.

For real-photo NSFW category detection you can instead drop in an open
NSFW/NudeNet-style ONNX classifier. Any single-input image classifier that emits
a 1×N score vector works — you just describe it in `model.json`.

## Enabling ONNX

1. **Build with the tag** (adds the ONNX Runtime Go binding):
   ```sh
   cd backend
   go get github.com/yalue/onnxruntime_go
   CGO_ENABLED=0 go build -tags onnx -o oppailib ./cmd/oppailib
   ```
   (The prebuilt `-onnx` Docker image variant does this for you.)

2. **Provide the ONNX Runtime shared library** and point to it:
   ```sh
   export ONNXRUNTIME_LIB_PATH=/usr/local/lib/libonnxruntime.so
   # GPU: use the CUDA build of libonnxruntime and set OPPAI_AI_DEVICE=cuda
   ```

3. **Drop your model into `/config/models/`:**
   ```
   /config/models/
   ├── model.onnx
   ├── labels.txt        # one tag per line, index-aligned to the output vector
   └── model.json        # tells OppaiLib how to feed the model
   ```

### `model.json`
```json
{
  "model": "model.onnx",
  "labels": "labels.txt",
  "input_name": "input",
  "output_name": "output",
  "input_size": 448,
  "layout": "nhwc",
  "bgr": true,
  "scale": 1.0,
  "mean": null,
  "std": null,
  "threshold": 0.35,
  "category": "general"
}
```
| field | meaning |
|-------|---------|
| `input_size` | square side the model expects (e.g. 448) |
| `layout` | `nchw` or `nhwc` tensor layout |
| `bgr` | swap RGB→BGR (many taggers want BGR) |
| `scale` | pixel multiplier (`1/255` to normalize to 0–1, `1.0` for 0–255) |
| `mean`/`std` | optional per-channel normalization (ImageNet-style) |
| `threshold` | minimum confidence to emit a tag |
| `category` | tag category assigned to all emitted tags |

## Updating the model
Replace the files in `/config/models/` and restart the container. No rebuild is
needed unless you switch between the heuristic and ONNX builds.

## Roadmap
- Video/GIF: extract representative frames (ffmpeg) and tag those.
- Comics: tag the cover + sampled pages.
- Background job queue with retry (the `jobs` table already exists).
