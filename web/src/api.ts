// Typed client for the OppaiLib API. The session token is stored in
// localStorage and sent as a Bearer header (the backend also accepts a cookie).

export interface MediaTag {
  id: number;
  name: string;
  category: string;
  source?: string;
  score?: number;
  /**
   * Timestamps (seconds, ascending) where the AI saw this tag in a video.
   * Only present on single-item fetches; list responses omit them.
   */
  moments?: number[];
}

export interface Media {
  id: number;
  kind: "video" | "gif" | "image" | "comic" | "game";
  sha256: string;
  size: number;
  title: string;
  notes?: string;
  source?: string;
  rating: number;
  favorite: boolean;
  duration?: number;
  width?: number;
  height?: number;
  pageCount?: number;
  hasThumb?: boolean;
  download?: string; // external download URL (games)
  gallery?: string[]; // screenshot URLs (games)
  tags?: MediaTag[];
  createdAt: number;
  updatedAt: number;
}

// Editable subset of a media item. Omitted fields are left unchanged; tags are
// add/remove lists.
export interface MediaPatch {
  title?: string;
  notes?: string;
  kind?: Media["kind"];
  rating?: number;
  addTags?: string[];
  removeTags?: string[];
}

export interface User {
  id: number;
  username: string;
  isAdmin: boolean;
}

// A tag the parser could attribute to a taxonomy (artist, character, parody, …).
export interface ScrapedTag {
  name: string;
  category: string;
}

export interface ScrapeResult {
  title: string;
  description: string;
  tags: string[];
  performers: string[];
  mediaUrls: string[];
  sourceUrl: string;
  kind: string;
  // Present only when the site's parser categorizes its tags. `tags` still holds
  // the flat union of everything, so rendering can ignore this; the import must
  // echo it back, or the categories are lost on the round-trip.
  categorizedTags?: ScrapedTag[];
  cover?: string;
  screenshots: string[];
  downloadUrl?: string;
}

export interface BulkScrapeItem {
  url: string;
  result?: ScrapeResult;
  error?: string;
}

// Server-side settings, editable from the Settings screen (admins only).
export interface Settings {
  aiEnabled: boolean;
  aiAutoTag: boolean;
  aiMinScore: number;
  aiMaxTags: number;
  scrapeDelayMs: number;
  scrapeUserAgent: string;
  scrapeRespectRobots: boolean;
}

// Environment/build facts the Settings screen shows but can't change — these come
// from env vars and only take effect at startup.
export interface ReadOnlyInfo {
  version: string;
  aiTagger: string;
  aiModelDir: string;
  aiDevice: string;
  mediaDir: string;
  dbPath: string;
  ffmpeg: boolean;
  sessionHours: number;
}

export interface SettingsResponse {
  settings: Settings;
  readOnly: ReadOnlyInfo;
}

export interface KindStat {
  kind: string;
  count: number;
  bytes: number;
}

export interface Stats {
  kinds: KindStat[];
  items: number;
  bytes: number;
  tags: number;
}

// Whether a comic can be paged through in-app, and how many pages it has.
// readable=false means the archive isn't a zip container (.cbr/.pdf) — the
// viewer then offers the file as a download rather than a broken reader.
export interface ComicInfo {
  readable: boolean;
  pages: number;
  reason?: string;
}

// ── remote sources ───────────────────────────────────────────────────────────
// Browsing a source streams from the origin and stores nothing; only save() copies
// an item into the library.

/** One ordering a feed offers. The first is the default. */
export interface SourceSort {
  id: string;
  label: string;
}

/**
 * One browsable listing inside a source: a board, a category, a search.
 *
 * `query` marks a feed that needs a search term — the UI shows a search box for it
 * rather than browsing it blindly, since a term-less search is an error upstream,
 * not an empty page.
 */
export interface SourceFeed {
  id: string;
  label: string;
  query?: boolean;
  sorts?: SourceSort[];
}

export interface RemoteSource {
  id: string;
  name: string;
  feeds: SourceFeed[];
}

/**
 * An item that lives on the remote source and is *not* in the library. Every URL on
 * it is remote — the browser never fetches them directly, it asks the server to
 * proxy them (see `api.sourceStreamURL`).
 */
export interface SourceItem {
  id: string;
  title: string;
  /**
   * "thread" is a *container* — an item you browse into rather than view. A 4chan
   * board lists threads, and a thread stands for a set of files, so opening it must
   * list the set rather than put the OP's image in the viewer. Containers carry
   * `feedId`; nothing else does.
   */
  kind: "video" | "gif" | "image" | "comic" | "thread";
  thumbUrl: string;
  mediaUrl?: string;
  pageUrl?: string;
  /** The feed to browse when this item is opened. Set only on a container. */
  feedId?: string;
  /** How many files a container holds. */
  count?: number;
  width?: number;
  height?: number;
}

/** `cursor` is opaque; empty means there is nothing after this page. */
export interface SourceListing {
  items: SourceItem[];
  cursor?: string;
}

/**
 * The Android APK this server offers for download. `available` is false when the
 * image was built without one — a normal state, not an error.
 */
export interface APKInfo {
  available: boolean;
  size?: number;
  sha256?: string;
  modified?: number; // unix seconds
  filename?: string;
}

const TOKEN_KEY = "oppai_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(t: string | null) {
  if (t) localStorage.setItem(TOKEN_KEY, t);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, opts: RequestInit = {}, timeoutMs = 0): Promise<T> {
  const headers = new Headers(opts.headers);
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (opts.body && !(opts.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  // A client-side deadline covering the WHOLE exchange — response headers *and*
  // body. The timer is cleared only after the response is fully read, so a
  // server that sends 200 headers then stalls the body (or trickles it) can't
  // leave the UI hung forever. Previously the timer was cleared as soon as the
  // headers arrived, leaving res.json() unbounded.
  const ctl = timeoutMs > 0 ? new AbortController() : null;
  const timer = ctl ? setTimeout(() => ctl.abort(), timeoutMs) : null;
  try {
    const res = await fetch(path, { ...opts, headers, signal: ctl?.signal });
    if (res.status === 401) {
      setToken(null);
      window.dispatchEvent(new CustomEvent("oppai-logout"));
      throw new Error("unauthorized");
    }
    if (!res.ok) {
      let msg = res.statusText;
      try {
        const body = await res.json();
        if (body?.error) msg = body.error;
      } catch { /* ignore */ }
      throw new Error(msg);
    }
    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  } catch (e) {
    if (ctl?.signal.aborted) {
      throw new Error("Timed out — the site was too slow or unreachable.");
    }
    throw e;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export const api = {
  health: () => request<{ status: string; aiEnabled: boolean; aiTagger: string }>("/api/health"),

  login: (username: string, password: string) =>
    request<{ token: string; user: User }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  me: () => request<User>("/api/auth/me"),
  logout: () => request<void>("/api/auth/logout", { method: "POST" }),

  listMedia: (kind = "", limit = 60, offset = 0) => {
    const q = new URLSearchParams();
    if (kind) q.set("kind", kind);
    q.set("limit", String(limit));
    q.set("offset", String(offset));
    return request<{ items: Media[] }>(`/api/media?${q}`);
  },
  getMedia: (id: number) => request<Media>(`/api/media/${id}`),
  // <img>/<video> can't set headers; auth rides on the HttpOnly session cookie
  // set at login (same-origin request).
  streamURL: (id: number) => `/api/media/${id}/stream`,
  // Poster/thumbnail: a generated video frame, or the item's own bytes for
  // image/gif. Cheap enough to use for every grid tile.
  thumbURL: (id: number) => `/api/media/${id}/thumb`,
  // Route a remote asset through the server so hotlink/referer-guarded hosts
  // still preview (and so a preview matches what import will actually fetch).
  proxyURL: (u: string) => `/api/scrape/proxy?url=${encodeURIComponent(u)}`,
  upload: (file: File, title?: string) => {
    const fd = new FormData();
    fd.append("file", file);
    if (title) fd.append("title", title);
    return request<{ id: number; sha256: string; deduped: boolean }>("/api/media", {
      method: "POST",
      body: fd,
    });
  },
  autotag: (id: number) =>
    request<{ tags: MediaTag[] }>(`/api/media/${id}/autotag`, { method: "POST" }),

  // Comics are read page-by-page from the server-side archive; the client never
  // downloads the whole file.
  comicInfo: (id: number) => request<ComicInfo>(`/api/media/${id}/comic`),
  pageURL: (id: number, page: number) => `/api/media/${id}/page/${page}`,

  getSettings: () => request<SettingsResponse>("/api/settings"),
  saveSettings: (patch: Partial<Settings>) =>
    request<SettingsResponse>("/api/settings", { method: "PUT", body: JSON.stringify(patch) }),
  stats: () => request<Stats>("/api/stats"),
  changePassword: (current: string, next: string) =>
    request<{ status: string }>("/api/auth/password", {
      method: "POST",
      body: JSON.stringify({ current, new: next }),
    }),
  updateMedia: (id: number, patch: MediaPatch) =>
    request<Media>(`/api/media/${id}`, { method: "PATCH", body: JSON.stringify(patch) }),
  deleteMedia: (id: number) =>
    request<void>(`/api/media/${id}`, { method: "DELETE" }),
  bulkMedia: (action: "delete" | "update", ids: number[], patch?: MediaPatch) =>
    request<{ ok: number[]; failed: number[] }>("/api/media/bulk", {
      method: "POST",
      body: JSON.stringify({ action, ids, patch: patch ?? {} }),
    }),

  scrape: (url: string) =>
    request<ScrapeResult>(
      "/api/scrape",
      { method: "POST", body: JSON.stringify({ url }) },
      45_000,
    ),
  scrapeBulk: (urls: string[]) =>
    request<{ items: BulkScrapeItem[] }>(
      "/api/scrape/bulk",
      { method: "POST", body: JSON.stringify({ urls }) },
      // Server caps each URL at ~30s and fetches them concurrently, so the whole
      // batch resolves within that; give generous headroom before giving up.
      75_000,
    ),
  scrapeImport: (payload: {
    url?: string;
    mediaUrls?: string[];
    title?: string;
    tags?: string[];
    categorizedTags?: ScrapedTag[];
    kind?: string;
  }) =>
    request<{ imported: number[]; count: number }>("/api/scrape/import", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  // The companion Android app, served from the box that holds the library.
  apkInfo: () => request<APKInfo>("/api/apk/info"),

  // ── remote sources ─────────────────────────────────────────────────────
  sources: () => request<{ sources: RemoteSource[] }>("/api/sources"),

  browseSource: (
    id: string,
    opts: { feed?: string; cursor?: string; q?: string; sort?: string } = {},
  ) => {
    const p = new URLSearchParams();
    if (opts.feed) p.set("feed", opts.feed);
    if (opts.cursor) p.set("cursor", opts.cursor);
    if (opts.q) p.set("q", opts.q);
    if (opts.sort) p.set("sort", opts.sort);
    // Someone else's site is on the other end of this; give it room to answer.
    return request<SourceListing>(`/api/sources/${id}/browse?${p}`, {}, 45_000);
  },

  sourcePages: (id: string, item: string) =>
    request<{ pages: string[]; count: number }>(
      `/api/sources/${encodeURIComponent(id)}/item/${encodeURIComponent(item)}/pages`,
      {},
      45_000,
    ),

  // Remote media is proxied so the origin never sees the browser's IP, and so
  // hotlink-guarded hosts render. The server refuses any host that isn't a
  // registered source, which is what keeps this from being an open proxy.
  sourceStreamURL: (u: string) => `/api/sources/stream?url=${encodeURIComponent(u)}`,

  saveFromSource: (
    id: string,
    body: { mediaUrl?: string; itemId?: string; pageUrl?: string; title?: string; kind?: string; tags?: string[] },
  ) =>
    request<{ imported: number[]; count: number }>(
      `/api/sources/${encodeURIComponent(id)}/save`,
      { method: "POST", body: JSON.stringify(body) },
      // A comic save downloads every page with a politeness delay between them, so a
      // long gallery is minutes, not seconds. The server finishes the import even if
      // this gives up (it detaches from the connection) — this deadline only decides
      // how long we wait to report it.
      15 * 60_000,
    ),
};
