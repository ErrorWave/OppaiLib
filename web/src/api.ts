// Typed client for the OppaiLib API. The session token is stored in
// localStorage and sent as a Bearer header (the backend also accepts a cookie).

export interface MediaTag {
  id: number;
  name: string;
  category: string;
  source?: string;
  score?: number;
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
  tags?: MediaTag[];
  createdAt: number;
  updatedAt: number;
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
}

const TOKEN_KEY = "oppai_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(t: string | null) {
  if (t) localStorage.setItem(TOKEN_KEY, t);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const headers = new Headers(opts.headers);
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (opts.body && !(opts.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  const res = await fetch(path, { ...opts, headers });
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
  return res.json() as Promise<T>;
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

  scrape: (url: string) =>
    request<ScrapeResult>("/api/scrape", { method: "POST", body: JSON.stringify({ url }) }),
  scrapeImport: (payload: { url?: string; mediaUrls?: string[]; title?: string; tags?: string[] }) =>
    request<{ imported: number[]; count: number }>("/api/scrape/import", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
