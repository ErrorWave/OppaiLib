# OppaiLib API

REST/JSON over HTTP. All routes are under `/api`. Auth is a Bearer session
token (also accepted as the `oppai_session` cookie for the browser SPA).

## Auth

| Method | Path | Body | Notes |
|--------|------|------|-------|
| POST | `/api/auth/login` | `{username, password}` | → `{token, user}`; also sets `oppai_session` cookie |
| POST | `/api/auth/logout` | — | invalidates the session |
| GET | `/api/auth/me` | — | → current `user` |
| POST | `/api/auth/password` | `{current, new}` | re-verifies `current` before setting `new` (8+ chars) |

`Authorization: Bearer <token>` is required on all routes below.

## Health

| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/health` | → `{status, aiEnabled, aiTagger}` (public) |

## Media

| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/media?kind=&limit=&offset=` | list, newest first. `kind ∈ video\|gif\|image\|comic\|game` |
| POST | `/api/media` | multipart: `file` (required), `title`, `source`, `kind`. → `{id, sha256, deduped}` |
| GET | `/api/media/{id}` | full media incl. `tags` |
| GET | `/api/media/{id}/stream` | decrypts + streams the blob (browser uses cookie auth) |
| GET | `/api/media/{id}/thumb` | poster frame (video), comic cover, or the item's own bytes |
| POST | `/api/media/{id}/autotag` | runs the AI tagger synchronously → `{tags}`. Videos and GIFs are sampled across several frames, so this can take a while. |

## Comics

Comics are read page-by-page out of the archive server-side — the client never
downloads the file. Only zip containers (`.cbz`, `.zip`) can be opened in-app;
`.cbr`/`.pdf` report `readable: false` and the UI offers a download instead.

| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/media/{id}/comic` | → `{readable, pages, reason?}`; also refreshes the stored `pageCount` |
| GET | `/api/media/{id}/page/{n}` | streams page `n` (1-based) as an image |

## Settings

| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/settings` | → `{settings, readOnly}` — editable values plus env/build facts |
| PUT | `/api/settings` | **admin only.** Partial body merges over current; applied live, no restart |
| GET | `/api/stats` | → `{kinds:[{kind,count,bytes}], items, bytes, tags}` |

Env vars supply the defaults; a saved setting overrides one for the install.
Anything that can't change without a restart (model dir, inference device,
paths) is reported under `readOnly`.

```jsonc
{
  "settings": {
    "aiEnabled": true, "aiAutoTag": true, "aiMinScore": 0.35, "aiMaxTags": 20,
    "scrapeDelayMs": 1500, "scrapeUserAgent": "…", "scrapeRespectRobots": true
  },
  "readOnly": {
    "version": "…", "aiTagger": "heuristic", "aiModelDir": "/config/models",
    "aiDevice": "cpu", "mediaDir": "/media", "dbPath": "/db/oppailib.sqlite",
    "ffmpeg": true, "sessionHours": 720
  }
}
```

### Media object
```jsonc
{
  "id": 1, "kind": "image", "sha256": "…", "size": 77,
  "title": "…", "notes": "…", "source": "…",
  "rating": 0, "favorite": false,
  "width": 10, "height": 14, "duration": 0, "pageCount": 0,
  "tags": [{ "id": 1, "name": "portrait", "category": "meta", "source": "ai", "score": 1 }],
  "createdAt": 1700000000, "updatedAt": 1700000000
}
```
`title`, `notes`, and `source` are stored AES-256-GCM-encrypted at rest and
decrypted for the response.

## Scraping

| Method | Path | Body | Notes |
|--------|------|------|-------|
| POST | `/api/scrape` | `{url}` | fetch + parse; → `ScrapeResult` (preview, imports nothing) |
| POST | `/api/scrape/import` | `{url?, mediaUrls?, title?, tags?}` | downloads chosen assets into the encrypted store; → `{imported, count}` |

### ScrapeResult
```jsonc
{
  "title": "…", "description": "…",
  "tags": ["…"], "performers": ["…"],
  "mediaUrls": ["https://…"], "sourceUrl": "https://…",
  "kind": "image"
}
```

## Errors
Non-2xx responses are `{"error": "message"}`. `401` clears the client session.
