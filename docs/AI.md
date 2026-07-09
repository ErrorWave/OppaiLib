# Local AI auto-tagging

OppaiLib tags media **entirely on your hardware**. Nothing is sent anywhere.

## What gets tagged

| kind | frames tagged | needs ffmpeg |
|------|---------------|--------------|
| image | the image | no |
| gif | up to N frames, evenly sampled across the animation | no |
| video | up to N frames, evenly sampled across the middle 90% of the clip | **yes** |
| comic, game | not yet — see Roadmap | — |

`N` defaults to 5 and is set by `OPPAI_AI_VIDEO_FRAMES`.

Each sampled frame is tagged independently and the results are merged, keeping
the **highest** confidence seen for each tag. A tag that is only true of one
scene is still true of the clip, so max wins over mean.

Video frames are extracted at the source's native resolution, so
resolution-sensitive tags describe the video rather than a downscaled poster.
Animated GIF frames are composited onto a running canvas (honouring each frame's
disposal method) before tagging — the raw frames stored in a GIF are usually
partial deltas, not whole pictures.

If `ffmpeg` is not installed, video auto-tagging is skipped with a warning and
everything else keeps working, exactly like video poster generation.

## Two modes

### 1. ONNX + wd14 (default image)
The default image (`--target runtime-onnx`) bakes in
[ONNX Runtime](https://onnxruntime.ai/) and the
[wd-vit-tagger-v3](https://huggingface.co/SmilingWolf/wd-vit-tagger-v3) model, so
real content tagging works with no setup. It emits:

| category | what | how it's picked |
|----------|------|-----------------|
| `rating` | exactly one of `general`, `sensitive`, `questionable`, `explicit` | highest-scoring of the four (argmax), always emitted |
| `general` | content tags — hundreds of them | score ≥ `threshold` (0.35) |
| `character` | recognised characters | score ≥ `character_threshold` (0.85) |

The `rating` tag is your NSFW signal, and it leads the suggestion list. It is a
tag category — unrelated to the numeric star `rating` field on a media item.

Character tags get their own, much higher threshold because the model is far more
confident about them than about general tags; 0.35 would flood every item with
lookalike characters.

**Why wd14.** It is fully open and self-hostable (no API, no licence
phone-home), outputs hundreds of human-meaningful tags with confidence scores,
runs comfortably on CPU (~0.3–1s/frame) and accelerates on GPU, and is a plain
`model.onnx` + `selected_tags.csv`, so it is trivially swappable.

### 2. Heuristic (lean image, always available)
The `:lean` tag (`--target runtime`) is a **cgo-free** image with no model and no ONNX Runtime.
It emits structural `meta` tags (`portrait`/`landscape`/`square`, `high-res`) and
records image dimensions. It is also the automatic fallback whenever the ONNX
tagger cannot load — a missing model, a bad `model.json` — so tagging degrades
rather than breaks. Check the startup log for the reason.

## Swapping the model

Any single-input image classifier that emits a 1×N score vector works. Drop the
files in a directory and point `OPPAI_AI_MODEL_DIR` at it:

```
/opt/oppailib/models/          # baked-in default; override the env var to move it
├── model.onnx
├── selected_tags.csv          # or labels.txt — see below
└── model.json                 # tells OppaiLib how to feed the model
```

> `/config` is a bind mount on most setups (including the Unraid template), which
> would **hide** anything baked underneath it. That is why the model lives at
> `/opt/oppailib/models` rather than `/config/models`. If you would rather manage
> the model from the host, put it in `/config/models` and set
> `OPPAI_AI_MODEL_DIR=/config/models`.

To use a different wd14 variant, rebuild with
`--build-arg MODEL_REPO=SmilingWolf/wd-swinv2-tagger-v3` (or `wd-convnext-tagger-v3`).
For real-photo NSFW detection rather than illustrated content, an open
NudeNet-style ONNX classifier works too — describe it in `model.json`.

### Label files
Two formats are accepted, both index-aligned to the model's output vector:

- **`*.csv`** — a wd14 `selected_tags.csv` (`tag_id,name,category,count`). The
  numeric category column maps to `0 → general`, `4 → character`, `9 → rating`;
  anything else falls back to `category` from `model.json`. Underscores in tag
  names become spaces. A header row is detected and skipped.
- **anything else** — one tag per line, all assigned `category`.

An off-by-one row in this file silently shifts *every* tag, so it must match the
model exactly.

### `model.json`
Every field is optional — `{}` is valid. Tensor names, input size and layout are
read from the ONNX graph itself, because tagger exports disagree wildly on names
(`input_1:0`, `input`, `pixel_values`).

```json
{
  "model": "model.onnx",
  "labels": "selected_tags.csv",
  "layout": "nhwc",
  "bgr": true,
  "scale": 1.0,
  "threshold": 0.35,
  "character_threshold": 0.85,
  "category": "general"
}
```
| field | default | meaning |
|-------|---------|---------|
| `model` | `model.onnx` | onnx file name |
| `labels` | `labels.txt` | label file (see above) |
| `input_name` / `output_name` | from the graph | graph tensor names |
| `input_size` | from the graph | square side the model expects (e.g. 448) |
| `layout` | from the graph | `nchw` or `nhwc` tensor layout |
| `bgr` | `false` | swap RGB→BGR (many taggers want BGR) |
| `scale` | `1/255` | pixel multiplier (`1.0` keeps 0–255, as wd14 wants) |
| `mean`/`std` | none | optional per-channel normalization (ImageNet-style) |
| `threshold` | `0.35` | minimum confidence to emit a general tag |
| `character_threshold` | `threshold` | minimum confidence for `character` tags |
| `category` | `general` | category for labels without one of their own |

### Preprocessing
Frames are composited onto **white**, padded to a square, then resized — never
stretched. wd14 was trained on white-padded squares, so stretching a portrait to
448×448 distorts every aspect-sensitive tag. Compositing is what stops a
transparent PNG arriving as a black rectangle (Go's RGBA is alpha-premultiplied,
so an untouched transparent pixel reads as zero).

## Building it yourself
```sh
cd backend
CGO_ENABLED=1 go build -tags onnx -o oppailib ./cmd/oppailib
export ONNXRUNTIME_LIB_PATH=/usr/local/lib/libonnxruntime.so
```
`onnxruntime_go` binds the C API, so the ONNX build needs cgo. sqlite stays
pure-Go either way — `CGO_ENABLED=1` only *permits* cgo, it does not switch
drivers. The lean build is the only fully cgo-free one.

The ONNX Runtime `.so` is `dlopen`'d at runtime, so it is not needed to compile.

### Testing against a real model
The unit tests cover preprocessing and score collection. To check that the
graph-introspected tensor names and the label count agree with the real
artifacts:
```sh
export ONNXRUNTIME_LIB_PATH=/usr/local/lib/libonnxruntime.so
export OPPAI_TEST_MODEL_DIR=/opt/oppailib/models
go test -tags onnx -run TestRealModel ./internal/ai/
```
Without `OPPAI_TEST_MODEL_DIR` those tests skip.

## Tuning

| env var | default | meaning |
|---------|---------|---------|
| `OPPAI_AI_ENABLED` | `true` | master switch for auto-tagging |
| `OPPAI_AI_MODEL_DIR` | `/config/models` | where `model.onnx` + `labels.txt` live |
| `OPPAI_AI_DEVICE` | `cpu` | `cpu` or `cuda` |
| `OPPAI_AI_VIDEO_FRAMES` | `5` | frames sampled per video/GIF (capped at 32) |

Each frame costs one ffmpeg seek-and-decode plus one model inference, so raising
`OPPAI_AI_VIDEO_FRAMES` trades import throughput for tag coverage. Background tag
jobs are bounded by a worker pool (half the core count, max 4), shared shape with
the thumbnail pool, so a bulk import queues instead of spawning one ffmpeg per
video at once.

## Roadmap
- Comics: tag the cover + sampled pages.
- Background job queue with retry, so tagging survives a restart. (Note: there is
  no `jobs` table yet — it needs to be added.)
