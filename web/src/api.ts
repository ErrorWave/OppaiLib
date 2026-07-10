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

export interface ScrapeResult {
  title: string;
  description: string;
  tags: string[];
  performers: string[];
  mediaUrls: string[];
  sourceUrl: string;
  kind: string;
  cover?: string;
  screenshots: string[];
  downloadUrl?: string;
}

export interface BulkScrapeItem {
  url: string;
  result?: ScrapeResult;
  error?: string;
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
    kind?: string;
  }) =>
    request<{ imported: number[]; count: number }>("/api/scrape/import", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
