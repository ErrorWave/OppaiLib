# ── OppaiLib single-image build ─────────────────────────────────────────
# Multi-stage: build the web UI, build the Go binary (with the web assets
# embedded), then ship a slim runtime image with the ONNX runtime library.

# --- Stage 1: web UI ----------------------------------------------------
FROM node:22-alpine AS web
WORKDIR /web
COPY web/package.json web/package-lock.json* ./
RUN npm install --no-audit --no-fund
COPY web/ ./
ENV OPPAI_WEB_OUTDIR=/web/dist
RUN npm run build          # emits /web/dist

# --- Stage 2: Go backend ------------------------------------------------
FROM golang:1.25-bookworm AS backend
WORKDIR /src
COPY backend/go.mod backend/go.sum* ./
RUN go mod download
COPY backend/ ./
# Web assets are embedded via go:embed from this path:
COPY --from=web /web/dist ./internal/web/dist
# CGO off → pure-Go sqlite; static-ish binary.
ENV CGO_ENABLED=0
RUN go build -ldflags="-s -w" -o /out/oppailib ./cmd/oppailib

# --- Stage 3: runtime ---------------------------------------------------
FROM debian:bookworm-slim AS runtime
# ONNX Runtime shared library for the AI tagger (CPU build). GPU users mount a
# CUDA-enabled runtime and set OPPAI_AI_DEVICE=cuda.
RUN apt-get update && apt-get install -y --no-install-recommends \
        ca-certificates libgomp1 ffmpeg \
    && rm -rf /var/lib/apt/lists/*
# onnxruntime .so is fetched here in the real build; see docs/AI.md
COPY --from=backend /out/oppailib /usr/local/bin/oppailib

ENV OPPAI_HTTP_ADDR=:8080 \
    OPPAI_MEDIA_DIR=/media \
    OPPAI_CONFIG_DIR=/config \
    OPPAI_DB_PATH=/db/oppailib.sqlite \
    OPPAI_AI_MODEL_DIR=/config/models

VOLUME ["/media", "/config", "/db"]
EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/oppailib"]
