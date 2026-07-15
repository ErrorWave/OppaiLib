# Local AI auto-tagging

OppaiLib tags media **entirely on your hardware**. Nothing is sent anywhere.

## Libby chat

The Chat tab talks to an OpenAI-compatible LLM on your own network. Configure it
from **Settings → Libby chat**, or set both startup defaults:

```env
OPPAI_CHAT_URL=http://192.168.1.10:1234
OPPAI_CHAT_MODEL=your-local-model-name
```

The URL is the server root; OppaiLib appends `/v1/chat/completions`. LM Studio,
llama.cpp server, and Ollama's OpenAI-compatible bridge can all expose this shape.
Conversation history stays in the current web/Android screen and is sent only to
that configured endpoint. Libby's Sweet, Playful, Bold, and Roleplay modes change
the local system prompt; the latter modes permit consensual adult NSFW chat.

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

### 1. ONNX + JoyTag (default image)
The default image (`--target runtime-onnx`) bakes in
[ONNX Runtime](https://onnxruntime.ai/) and
[JoyTag](https://huggingface.co/fancyfeast/joytag), so real content tagging works
with no setup. It emits ~5000 Danbooru-vocabulary `general` tags, each scored
independently, at `threshold` (0.4) or above.

**Why JoyTag.** This library holds photographs *and* drawn art, and it needs NSFW
tags on both. A wd14 tagger is trained on Danbooru alone — point it at a photo and
it has nothing true to say, so it either goes quiet or invents anime tags for a
real person. JoyTag is a ViT over the same tag vocabulary but deliberately trained
past that domain onto photographic content, with NSFW concepts as an explicit goal
rather than an embarrassment. One model covers both halves of the library, and —
because it is one vocabulary — a tag search spans them. It is also fully open and
self-hostable (no API, no licence phone-home), runs on CPU and accelerates on GPU,
and ships as a plain `model.onnx` + `top_tags.txt`, so it stays swappable.

**What you give up.** JoyTag has no `rating` label, so items get no
`general`/`sensitive`/`questionable`/`explicit` verdict — the explicit *content*
tags carry that instead. It is also a little weaker than wd14 v3 on pure anime,
which is the trade for it working on photographs at all. If your library is
anime-only and you want the rating back, wd14 is still fully supported — see
[Swapping the model](#swapping-the-model).

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
├── top_tags.txt               # or a wd14 selected_tags.csv — see below
└── model.json                 # tells OppaiLib how to feed the model
```

> `/config` is a bind mount on most setups (including the Unraid template), which
> would **hide** anything baked underneath it. That is why the model lives at
> `/opt/oppailib/models` rather than `/config/models`. If you would rather manage
> the model from the host, put it in `/config/models` and set
> `OPPAI_AI_MODEL_DIR=/config/models`.

**Back to a wd14 tagger** (anime-only, but it restores the `rating` verdict and is
a little sharper on illustrated content):

```
--build-arg MODEL_REPO=SmilingWolf/wd-vit-tagger-v3 \
--build-arg MODEL_LABELS=selected_tags.csv
```

and edit the generated `model.json` to wd14's contract — it wants raw 0–255 **BGR**
pixels in **NHWC** and already ends in its own activation, i.e. `"layout": "nhwc"`,
`"bgr": true`, `"scale": 1.0`, no `mean`/`std`, `"activation": "none"`,
`"threshold": 0.35`, `"character_threshold": 0.85`. The other v3 variants
(`wd-swinv2-tagger-v3`, `wd-convnext-tagger-v3`) use the same contract.

Anything else that is a single-input image classifier emitting a 1×N score vector
works too — describe it in `model.json`.

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

This is the baked-in default (JoyTag): CLIP-normalized RGB in NCHW.

```json
{
  "model": "model.onnx",
  "labels": "top_tags.txt",
  "layout": "nchw",
  "scale": 0.00392156862745098,
  "mean": [0.48145466, 0.4578275, 0.40821073],
  "std":  [0.26862954, 0.26130258, 0.27577711],
  "activation": "sigmoid",
  "threshold": 0.4,
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
| `bgr` | `false` | swap RGB→BGR (wd14 wants BGR; JoyTag does not) |
| `scale` | `1/255` | pixel multiplier (`1.0` keeps 0–255, as wd14 wants) |
| `mean`/`std` | none | optional per-channel normalization (ImageNet-style) |
| `activation` | `none` | `none` or `sigmoid` — see below |
| `threshold` | `0.35` | minimum confidence to emit a general tag |
| `character_threshold` | `threshold` | minimum confidence for `character` tags |
| `category` | `general` | category for labels without one of their own |

**`activation` is the one that bites.** Exports disagree on whether the final
activation is part of the graph. A wd14 tagger bakes it in and returns
probabilities, so it wants `none`. JoyTag's graph stops at the tag **logits**, so it
wants `sigmoid` — set it to `none` and nothing errors, but every threshold is now
being compared against an unbounded number and the confidence stored on each tag
escapes `[0,1]`, which is the range `min_score` and the tag list assume. An
unrecognised value is rejected at startup rather than treated as `none`.

### Preprocessing
Frames are composited onto **white**, padded to a square, then resized — never
stretched. Both JoyTag and wd14 were trained on white-padded squares, so stretching
a portrait to 448×448 distorts every aspect-sensitive tag. Compositing is what stops
a transparent PNG arriving as a black rectangle (Go's RGBA is alpha-premultiplied,
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
