# ── OppaiLib single-image build ─────────────────────────────────────────
# Multi-stage: build the web UI, build the Go binary (with the web assets
# embedded), then ship a runtime image.
#
# Two runtime targets:
#   --target runtime        lean, cgo-free, heuristic tagging only
#   --target runtime-onnx   default; bakes in ONNX Runtime + the wd14 tagger
#                           model for real NSFW content tagging (~540MB, of
#                           which the model is 379MB and the runtime .so 23MB)

# --- Stage 1: web UI ----------------------------------------------------
FROM node:22-alpine AS web
WORKDIR /web
COPY web/package.json web/package-lock.json* ./
RUN npm install --no-audit --no-fund
COPY web/ ./
ENV OPPAI_WEB_OUTDIR=/web/dist
RUN npm run build          # emits /web/dist

# --- Stage 2: Go backend (lean, cgo-free) -------------------------------
FROM golang:1.25-bookworm AS backend
WORKDIR /src
COPY backend/go.mod backend/go.sum* ./
RUN go mod download
COPY backend/ ./
# Web assets are embedded via go:embed from this path:
COPY --from=web /web/dist ./internal/web/dist
# Build version stamp — pass with `--build-arg OPPAI_VERSION=$(git describe --tags --always)`
# so the running container can be matched to a source revision (GET /api/health).
ARG OPPAI_VERSION=docker
ENV LDFLAGS="-s -w -X github.com/youruser/oppailib/internal/buildinfo.Version=${OPPAI_VERSION}"
# CGO off → pure-Go sqlite; static-ish binary.
RUN CGO_ENABLED=0 go build -ldflags="${LDFLAGS}" -o /out/oppailib ./cmd/oppailib

# --- Stage 2b: Go backend (onnx) ----------------------------------------
# onnxruntime_go binds the C API, so this build needs cgo. sqlite stays pure-Go
# either way — CGO_ENABLED=1 only permits cgo, it does not switch drivers.
# The ONNX Runtime headers are vendored by onnxruntime_go and the .so is
# dlopen'd at runtime, so nothing extra is needed to *compile*.
FROM backend AS backend-onnx
ARG OPPAI_VERSION=docker
RUN CGO_ENABLED=1 go build -tags onnx -ldflags="${LDFLAGS}" -o /out/oppailib-onnx ./cmd/oppailib

# --- Stage 2c: ONNX Runtime + tagger model ------------------------------
# Pinned so a rebuild is reproducible. onnxruntime_go 1.31 requests ORT C API
# version 26, so this must be >= 1.26.0 — an older runtime aborts at startup with
# "Error setting ORT API base". Verified against 1.26.0.
FROM debian:bookworm-slim AS onnxdeps
ARG ORT_VERSION=1.26.0
# Any wd14-family repo works: wd-vit-tagger-v3 (fast), wd-swinv2-tagger-v3
# (slightly better), wd-convnext-tagger-v3. All expose model.onnx +
# selected_tags.csv with the same 448px NHWC/BGR contract.
ARG MODEL_REPO=SmilingWolf/wd-vit-tagger-v3
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /out/lib /out/models \
    && curl -fsSL -o /tmp/ort.tgz \
        "https://github.com/microsoft/onnxruntime/releases/download/v${ORT_VERSION}/onnxruntime-linux-x64-${ORT_VERSION}.tgz" \
    && tar -xzf /tmp/ort.tgz -C /tmp \
    && cp -a /tmp/onnxruntime-linux-x64-${ORT_VERSION}/lib/libonnxruntime.so* /out/lib/ \
    && rm -rf /tmp/ort.tgz /tmp/onnxruntime-linux-x64-${ORT_VERSION}
# Hugging Face drops long transfers. A truncated model.onnx would bake a corrupt
# model into the image that only fails at the first inference, so resume on
# failure and sanity-check the sizes before the layer is committed. (These are
# floors, not checksums — MODEL_REPO is a build arg, so exact digests would go
# stale the moment anyone points it at a different wd14 variant.)
RUN curl -fL --retry 8 --retry-all-errors --retry-delay 3 -C - \
        -o /out/models/model.onnx "https://huggingface.co/${MODEL_REPO}/resolve/main/model.onnx" \
    && curl -fL --retry 8 --retry-all-errors --retry-delay 3 \
        -o /out/models/selected_tags.csv "https://huggingface.co/${MODEL_REPO}/resolve/main/selected_tags.csv" \
    && [ "$(wc -c < /out/models/model.onnx)" -gt 100000000 ] \
    && [ "$(wc -l < /out/models/selected_tags.csv)" -gt 1000 ]
# wd14 wants raw 0–255 BGR pixels in NHWC. input_name/output_name/input_size are
# read from the graph, so they stay unset here.
RUN printf '%s\n' \
    '{' \
    '  "model": "model.onnx",' \
    '  "labels": "selected_tags.csv",' \
    '  "layout": "nhwc",' \
    '  "bgr": true,' \
    '  "scale": 1.0,' \
    '  "threshold": 0.35,' \
    '  "character_threshold": 0.85,' \
    '  "category": "general"' \
    '}' > /out/models/model.json

# --- Stage 3: lean runtime (no AI model) --------------------------------
FROM debian:bookworm-slim AS runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
        ca-certificates ffmpeg \
    && rm -rf /var/lib/apt/lists/*
COPY --from=backend /out/oppailib /usr/local/bin/oppailib

ENV OPPAI_HTTP_ADDR=:8080 \
    OPPAI_MEDIA_DIR=/media \
    OPPAI_CONFIG_DIR=/config \
    OPPAI_DB_PATH=/db/oppailib.sqlite \
    OPPAI_AI_MODEL_DIR=/config/models

VOLUME ["/media", "/config", "/db"]
EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/oppailib"]

# --- Stage 4: onnx runtime (default) ------------------------------------
FROM debian:bookworm-slim AS runtime-onnx
# libgomp1 is required by the ONNX Runtime CPU build.
RUN apt-get update && apt-get install -y --no-install-recommends \
        ca-certificates libgomp1 ffmpeg \
    && rm -rf /var/lib/apt/lists/*
COPY --from=backend-onnx /out/oppailib-onnx /usr/local/bin/oppailib
COPY --from=onnxdeps /out/lib/ /usr/local/lib/
# The model lives outside /config on purpose. /config is a VOLUME, and a bind
# mount over it (what the Unraid template does) would hide anything baked
# underneath — the model would silently vanish and tagging would fall back to
# the heuristic tagger. Point OPPAI_AI_MODEL_DIR at /config/models yourself if
# you would rather manage the model from the host.
COPY --from=onnxdeps /out/models/ /opt/oppailib/models/
RUN ldconfig

ENV OPPAI_HTTP_ADDR=:8080 \
    OPPAI_MEDIA_DIR=/media \
    OPPAI_CONFIG_DIR=/config \
    OPPAI_DB_PATH=/db/oppailib.sqlite \
    OPPAI_AI_MODEL_DIR=/opt/oppailib/models \
    ONNXRUNTIME_LIB_PATH=/usr/local/lib/libonnxruntime.so

VOLUME ["/media", "/config", "/db"]
EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/oppailib"]
