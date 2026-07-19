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
  // F95 login for members-only game threads. The password is write-only: a GET
  // returns it blank and reports f95PasswordSet instead; sending a new value sets
  // it, sending blank leaves it unchanged.
  f95Username: string;
  f95Password: string;
  f95PasswordSet: boolean;
  // Image generation: the base URL of a local Automatic1111 / SD.Next WebUI. Empty
  // disables the feature; imageGenEnabled is a derived, read-only mirror of "URL set".
  imageGenUrl: string;
  imageGenEnabled: boolean;
  chatUrl: string;
  chatModel: string;
  chatEnabled: boolean;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatStatus {
  enabled: boolean;
  model?: string;
  modes: string[];
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
  /**
   * The discussion this item belongs to, for sources that have one. A file posted in
   * a 4chan thread carries its thread's id, which is what the viewer asks for
   * comments on — so showing the conversation around an image needs nothing else.
   */
  threadId?: string;
  /** This item's own post in that thread, so its comment can be marked. */
  postNo?: number;
  /** How many files a container holds. */
  count?: number;
  width?: number;
  height?: number;
}

/**
 * One post in a source's discussion thread.
 *
 * Flat, not a tree: a 4chan post quotes by number and can quote several posts, so the
 * conversation is a graph. `quotes` carries those numbers and the list renders in post
 * order, which is how the site itself shows a thread.
 */
export interface SourceComment {
  no: number;
  time: number;
  name?: string;
  subject?: string;
  text: string;
  thumbUrl?: string;
  mediaUrl?: string;
  /**
   * The post's upload, described the way a `SourceItem` is. Both are set only when
   * the post has a file.
   *
   * A 4chan thumbnail is a JPEG whatever it stands for, so `thumbUrl` alone can't
   * tell a webm apart from a photo — `kind` is what lets the panel put a play badge
   * on a video, and `itemId` is what lets clicking it land on that exact item.
   */
  kind?: SourceItem["kind"];
  itemId?: string;
  quotes?: number[];
  op?: boolean;
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

// ── image generation ───────────────────────────────────────────────────────────

/** One checkpoint the generator can load. `title` is the selector value the API wants. */
export interface GenModel {
  title: string;
  model_name: string;
  hash?: string;
  /** Model family — "sd-1", "sd-2", "sdxl" — when the generator reports one. */
  base?: string;
  /** The generator's recommended settings for this model, applied on selection. */
  defaults?: GenModelDefaults;
}

export interface GenModelDefaults {
  steps?: number;
  cfgScale?: number;
  cfgRescale?: number;
  scheduler?: string;
  width?: number;
  height?: number;
  vae?: string;
  vaePrecision?: "fp32" | "fp16";
}

export interface GenLora {
  name: string;
  alias?: string;
  path?: string;
  base?: string;
  weight?: number;
  triggerPhrases?: string[];
}

/** A standalone VAE. `key` is the selector value the generate call wants. */
export interface GenVae {
  key: string;
  name: string;
  base?: string;
}

/** A prompt template (InvokeAI style preset). `prompt` may contain "{prompt}". */
export interface GenTemplate {
  id: string;
  name: string;
  prompt: string;
  negativePrompt: string;
}

/** A character from the library: a reusable prompt fragment with a thumbnail. */
export interface GenCharacter {
  id: string;
  name: string;
  prompt: string;
  negativePrompt?: string;
  hasThumb: boolean;
}

/**
 * Whether image generation is configured and, if so, reachable. `enabled` is false when
 * no generator URL is set; `reachable` is false when a URL is set but the box didn't
 * answer (then `error` says why). `models` is the checkpoint list on success.
 */
export interface ImageGenStatus {
  enabled: boolean;
  reachable?: boolean;
  /** Which API the generator speaks — "a1111" or "invokeai" — detected server-side. */
  backend?: string;
  error?: string;
  models?: GenModel[];
  loras?: GenLora[];
  loraError?: string;
  vaes?: GenVae[];
  templates?: GenTemplate[];
  boards?: GalleryBoard[];
}

/** A just-generated image, held server-side in memory until saved. `id` streams it. */
export interface GenPreview {
  id: string;
  seed: number;
}

/** One txt2img job. Only `prompt` is required; the server clamps the rest to sane ranges. */
export interface GenerateParams {
  prompt: string;
  negativePrompt?: string;
  checkpoint?: string;
  vae?: string;
  sampler?: string;
  steps?: number;
  width?: number;
  height?: number;
  cfgScale?: number;
  cfgRescale?: number;
  clipSkip?: number;
  seamlessX?: boolean;
  seamlessY?: boolean;
  vaePrecision?: "fp32" | "fp16";
  cpuNoise?: boolean;
  board?: string;
  seed?: number;
  count?: number;
  loras?: { name: string; weight: number }[];
}

/** The full editable record of a model or LoRA, mirrored from InvokeAI. */
export interface GenModelMeta {
  key: string;
  name: string;
  base?: string;
  type: string;
  description?: string;
  triggerPhrases: string[];
  defaults?: GenModelDefaults & { weight?: number };
}

/** One InvokeAI gallery board. Board id "none" is the uncategorized pile. */
export interface GalleryBoard {
  id: string;
  name: string;
  count: number;
}

export interface GalleryImage {
  name: string;
  width?: number;
  height?: number;
  created?: string;
}

export interface GalleryPage {
  items: GalleryImage[];
  total: number;
}

/** One model from the Civitai catalogue (via civitai.red). */
export interface CivitaiModel {
  id: number;
  name: string;
  type: string;
  creator?: string;
  downloads: number;
  likes: number;
  versions: CivitaiVersion[];
}

export interface CivitaiVersion {
  id: number;
  name: string;
  base: string;
  trainedWords: string[];
  downloadUrl: string;
  sizeMB?: number;
  images: string[];
}

/** One model download InvokeAI is running (or has finished). */
export interface InstallJob {
  id: number;
  status: string;
  source: string;
  error?: string;
  bytes?: number;
  totalBytes?: number;
}

/** A Libby outfit: a name plus which emotions have art uploaded. */
export interface LibbyOutfit {
  id: string;
  name: string;
  emotions: string[];
}

const TOKEN_KEY = "oppai_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(t: string | null) {
  if (t) localStorage.setItem(TOKEN_KEY, t);
  else localStorage.removeItem(TOKEN_KEY);
}

export function mascotSay(message: string, tone: "success" | "error" = "error") {
  window.dispatchEvent(new CustomEvent("oppai-mascot", { detail: { message, tone } }));
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
      if (path !== "/api/auth/login") {
        setToken(null);
        window.dispatchEvent(new CustomEvent("oppai-logout"));
        mascotSay("Your session ended. Please sign in again.");
      }
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
      const error = new Error("Timed out — the site was too slow or unreachable.");
      if (path !== "/api/auth/login") mascotSay(error.message);
      throw error;
    }
    if (path !== "/api/auth/login" && e instanceof Error && e.message !== "unauthorized") {
      mascotSay(e.message || "Something went wrong.");
    }
    throw e;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export const api = {
  health: () => request<{ status: string; aiEnabled: boolean; aiTagger: string }>("/api/health"),

  // `client: "web"` is what opts this session into the browser rules: it idles out
  // after an hour of inactivity and it does not survive a server restart. The Android
  // app says "android" instead and is exempt from both.
  login: (username: string, password: string) =>
    request<{ token: string; user: User }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password, client: "web" }),
    }),
  // The session probe. Deliberately does NOT count as activity server-side, so polling
  // it to check whether we're still signed in can't itself keep an idle tab alive.
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

  // The conversation an item was posted in. `item` is a SourceItem.threadId; sources
  // without discussions answer 404, which the caller shows as "no comments here".
  sourceComments: (id: string, item: string) =>
    request<{ comments: SourceComment[]; count: number }>(
      `/api/sources/${encodeURIComponent(id)}/item/${encodeURIComponent(item)}/comments`,
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

  // ── image generation ───────────────────────────────────────────────────────
  // Generated images live only in memory on the server until saveGenerated copies one
  // into the library. Everything here talks to a local generator on the user's network.

  imageGenStatus: () => request<ImageGenStatus>("/api/imagegen/status", {}, 12_000),

  // Turn a scrap of (spoken) natural language into a fuller prompt + negative prompt.
  optimizePrompt: (text: string) =>
    request<{ prompt: string; negativePrompt: string }>("/api/imagegen/prompt", {
      method: "POST",
      body: JSON.stringify({ text }),
    }),

  // Generation is slow (tens of seconds on CPU, longer for a batch); give it room.
  generate: (params: GenerateParams) =>
    request<{ images: GenPreview[]; prompt: string }>(
      "/api/imagegen/generate",
      { method: "POST", body: JSON.stringify(params) },
      10 * 60_000,
    ),

  // Streams an in-memory preview as an image; auth rides the session cookie like
  // every other <img> src.
  genPreviewURL: (id: string) => `/api/imagegen/preview/${encodeURIComponent(id)}`,

  saveGenerated: (body: { id: string; title?: string; tags?: string[] }) =>
    request<{ id: number; existed: boolean }>("/api/imagegen/save", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  // Cover art is read from and written to InvokeAI's model manager.
  modelThumbURL: (model: string) => `/api/imagegen/model-thumb?model=${encodeURIComponent(model)}`,
  setModelThumb: (body: { model: string; previewId: string }) =>
    request<{ status: string }>("/api/imagegen/model-thumb", {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  chatStatus: () => request<ChatStatus>("/api/chat/status", {}, 12_000),
  chat: (mode: string, messages: ChatMessage[]) =>
    request<{ message: string }>("/api/chat", {
      method: "POST",
      body: JSON.stringify({ mode, messages }),
    }, 125_000),
  loraThumbURL: (name: string) => `/api/imagegen/lora-thumb?name=${encodeURIComponent(name)}`,

  // ── character library ──────────────────────────────────────────────────────
  // Reusable prompt fragments with a name and a face; stored encrypted server-side.

  characters: () => request<{ characters: GenCharacter[] }>("/api/imagegen/characters"),
  saveCharacter: (body: {
    id?: string;
    name: string;
    prompt: string;
    negativePrompt?: string;
    previewId?: string;
    imageData?: string;
  }) =>
    request<GenCharacter>("/api/imagegen/characters", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  deleteCharacter: (id: string) =>
    request<{ status: string }>(`/api/imagegen/characters/${encodeURIComponent(id)}`, {
      method: "DELETE",
    }),
  characterThumbURL: (id: string) => `/api/imagegen/characters/${encodeURIComponent(id)}/thumb`,

  // ── model metadata (InvokeAI model manager) ────────────────────────────────
  // Reads and writes the generator's own model records, so edits here are the
  // same edits InvokeAI's model manager would make.

  modelMeta: (name: string) =>
    request<GenModelMeta>(`/api/imagegen/model?name=${encodeURIComponent(name)}`, {}, 20_000),
  patchModelMeta: (body: {
    key: string;
    name?: string;
    description?: string;
    triggerPhrases?: string[];
    defaults?: GenModelMeta["defaults"];
  }) =>
    request<GenModelMeta>("/api/imagegen/model", {
      method: "PATCH",
      body: JSON.stringify(body),
    }, 25_000),

  // ── InvokeAI gallery ───────────────────────────────────────────────────────
  // The generator's own gallery (it keeps every finished image), browsed and
  // pruned from here. Save copies one image into the library.

  galleryBoards: () => request<{ boards: GalleryBoard[] }>("/api/imagegen/gallery/boards", {}, 20_000),
  createGalleryBoard: (name: string) =>
    request<GalleryBoard>("/api/imagegen/gallery/boards", {
      method: "POST",
      body: JSON.stringify({ name }),
    }, 20_000),
  galleryImages: (board: string, offset = 0, limit = 60) =>
    request<GalleryPage>(
      `/api/imagegen/gallery/images?board=${encodeURIComponent(board)}&offset=${offset}&limit=${limit}`,
      {},
      20_000,
    ),
  galleryThumbURL: (name: string) => `/api/imagegen/gallery/image/${encodeURIComponent(name)}/thumb`,
  galleryFullURL: (name: string) => `/api/imagegen/gallery/image/${encodeURIComponent(name)}`,
  deleteGalleryImage: (name: string) =>
    request<{ status: string }>(`/api/imagegen/gallery/image/${encodeURIComponent(name)}`, {
      method: "DELETE",
    }),
  saveGalleryImage: (body: { name: string; title?: string; tags?: string[] }) =>
    request<{ id: number; existed: boolean }>("/api/imagegen/gallery/save", {
      method: "POST",
      body: JSON.stringify(body),
    }, 90_000),

  // ── Civitai browser ────────────────────────────────────────────────────────
  // The public catalogue via civitai.red, proxied through the server. Install
  // hands a download URL to InvokeAI, which fetches the file itself.

  civitaiSearch: (opts: { q?: string; type?: string; sort?: string; cursor?: string } = {}) => {
    const p = new URLSearchParams();
    if (opts.q) p.set("q", opts.q);
    if (opts.type) p.set("type", opts.type);
    if (opts.sort) p.set("sort", opts.sort);
    if (opts.cursor) p.set("cursor", opts.cursor);
    return request<{ items: CivitaiModel[]; nextCursor?: string }>(
      `/api/imagegen/civitai/search?${p}`,
      {},
      45_000,
    );
  },
  civitaiImageURL: (u: string) => `/api/imagegen/civitai/image?url=${encodeURIComponent(u)}`,
  civitaiInstall: (url: string) =>
    request<InstallJob>("/api/imagegen/civitai/install", {
      method: "POST",
      body: JSON.stringify({ url }),
    }, 30_000),
  civitaiInstalls: () => request<{ jobs: InstallJob[] }>("/api/imagegen/civitai/installs", {}, 20_000),

  // ── Libby outfits ──────────────────────────────────────────────────────────
  // User-made wardrobes for the mascot: one image per emotion, stored encrypted
  // server-side. Which outfit is worn is a per-device choice (see libby.ts).

  libbyOutfits: () => request<{ outfits: LibbyOutfit[] }>("/api/libby/outfits"),
  saveLibbyOutfit: (body: { id?: string; name: string }) =>
    request<LibbyOutfit>("/api/libby/outfits", { method: "POST", body: JSON.stringify(body) }),
  deleteLibbyOutfit: (id: string) =>
    request<{ status: string }>(`/api/libby/outfits/${encodeURIComponent(id)}`, { method: "DELETE" }),
  setLibbyEmotion: (id: string, emotion: string, imageData: string) =>
    request<{ status: string }>(
      `/api/libby/outfits/${encodeURIComponent(id)}/emotions/${encodeURIComponent(emotion)}`,
      { method: "PUT", body: JSON.stringify({ imageData }) },
    ),
  deleteLibbyEmotion: (id: string, emotion: string) =>
    request<{ status: string }>(
      `/api/libby/outfits/${encodeURIComponent(id)}/emotions/${encodeURIComponent(emotion)}`,
      { method: "DELETE" },
    ),
  libbyEmotionURL: (id: string, emotion: string) =>
    `/api/libby/outfits/${encodeURIComponent(id)}/emotions/${encodeURIComponent(emotion)}`,
};
