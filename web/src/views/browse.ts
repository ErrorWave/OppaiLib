import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { iconStyles, motionStyles } from "../theme.js";
import {
  api,
  type RemoteSource,
  type SourceFeed,
  type SourceItem,
} from "../api.js";

/**
 * Browses a remote catalogue — a 4chan board, a doujin listing — without importing
 * anything.
 *
 * Nothing here touches the library: tiles stream from the origin through the
 * server's proxy, and only Save copies an item across. That's also why every remote
 * URL goes through `api.sourceStreamURL` rather than straight into a `src` — the
 * origin never sees the browser's IP, and hotlink-guarded hosts still render.
 *
 * Some items are *containers*: a 4chan board lists threads, and a thread is a set you
 * browse into rather than a file you view (see `SourceItem.feedId`). `container` holds
 * the one we're inside; clearing it goes back to the board.
 *
 * The visual language is the library's, deliberately — the same chips, the same tiles,
 * the same empty states. This view sits inside the same shell, and a browse grid that
 * invents its own greys reads as a different application.
 */
@customElement("oppai-browse")
export class OppaiBrowse extends LitElement {
  @state() private sources: RemoteSource[] = [];
  @state() private sourceId = "";

  /** The feed chosen from the chips. `container` is the thread opened from it, if any. */
  @state() private feedId = "";
  @state() private container: SourceItem | null = null;
  @state() private sort = "";

  /** The committed search term — what was actually fetched. The box holds a draft. */
  @state() private query = "";
  @state() private draft = "";

  @state() private items: SourceItem[] = [];
  @state() private cursor = "";
  @state() private loading = false;
  @state() private loadingSources = true;
  @state() private error = "";

  /** The item open in the preview overlay, if any. */
  @state() private active: SourceItem | null = null;
  @state() private pages: string[] = [];
  @state() private pageAt = 0;
  @state() private saving = false;
  @state() private toast = "";

  static styles = [
    iconStyles,
    motionStyles,
    css`
      :host {
        display: block;
        color: var(--oppai-text);
      }

      /* Header — mirrors the library's grid head. */
      .head {
        display: flex;
        align-items: baseline;
        gap: 12px;
        margin-bottom: 6px;
      }
      .title {
        font-size: 26px;
        font-weight: 400;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .count {
        font-size: 13px;
        color: var(--oppai-text-muted);
        white-space: nowrap;
      }
      .head-actions {
        margin-left: auto;
        display: flex;
        gap: 8px;
      }

      /* Chips — same shape as the library's filter chips. */
      .chips {
        display: flex;
        gap: 8px;
        margin: 18px 0 24px;
        flex-wrap: wrap;
      }
      .chips.tight {
        margin: 0 0 18px;
      }
      .chip {
        height: 36px;
        padding: 0 16px;
        border-radius: 18px;
        font-size: 13px;
        font-weight: 500;
        font-family: inherit;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        background: transparent;
        color: var(--oppai-text-dim);
        border: 1px solid var(--oppai-border-strong);
        transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
      }
      .chip:hover {
        background: var(--oppai-nav-hover);
      }
      .chip[aria-pressed="true"] {
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
        border-color: var(--oppai-accent);
      }
      .chip:disabled {
        opacity: 0.5;
        cursor: default;
      }
      .chip.ghost {
        color: var(--oppai-primary-bright);
        border-color: var(--oppai-border-strong);
      }

      /* Search */
      .searchbar {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-bottom: 20px;
      }
      .searchbox {
        flex: 1;
        max-width: 520px;
        height: 44px;
        background: var(--oppai-surface-2);
        border-radius: 22px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 16px;
      }
      .searchbox input {
        flex: 1;
        background: none;
        border: none;
        outline: none;
        color: var(--oppai-text);
        font: inherit;
        font-size: 14px;
      }
      .searchbox input::placeholder {
        color: var(--oppai-text-muted);
      }

      /* Grid + tiles — the library's tile, with the remote item's badges. */
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 22px;
      }
      .tile {
        cursor: pointer;
        border: none;
        padding: 0;
        background: none;
        text-align: left;
        font: inherit;
        color: inherit;
      }
      .tile-media {
        position: relative;
        width: 100%;
        aspect-ratio: 3 / 4;
        border-radius: 16px;
        overflow: hidden;
        background: var(--oppai-surface-2);
        transition: transform 0.28s var(--oppai-ease-emphasized),
          box-shadow 0.28s var(--oppai-ease-emphasized);
      }
      .tile:hover .tile-media {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
      }
      .tile:active .tile-media {
        transform: translateY(-1px) scale(0.99);
      }
      .tile-media img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s var(--oppai-ease-emphasized);
      }
      .tile:hover .tile-media img {
        transform: scale(1.06);
      }
      .tile-blank {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        color: var(--oppai-text-muted);
      }
      .tile-stat {
        position: absolute;
        bottom: 6px;
        right: 8px;
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        font-weight: 600;
        color: #fff;
        background: rgba(0, 0, 0, 0.5);
        padding: 2px 6px;
        border-radius: 6px;
      }
      .play {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        color: #fff;
        text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
        opacity: 0.85;
      }
      .tile-meta {
        padding: 10px 2px 0;
      }
      .tile-title {
        font-size: 13px;
        font-weight: 500;
        color: var(--oppai-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tile-tag {
        font-size: 12px;
        color: var(--oppai-text-muted);
        margin-top: 2px;
      }

      .empty {
        text-align: center;
        padding: 80px 0;
        color: var(--oppai-text-muted);
      }
      .more {
        display: grid;
        place-items: center;
        padding: 28px;
      }

      /* Preview overlay */
      .overlay {
        position: fixed;
        inset: 0;
        z-index: 50;
        background: rgba(0, 0, 0, 0.92);
        display: flex;
        flex-direction: column;
        animation: oppai-fade-in 0.2s var(--oppai-ease-standard) both;
      }
      .obar {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        color: #fff;
      }
      .obar .t {
        flex: 1;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .obtn {
        background: rgba(255, 255, 255, 0.12);
        color: #fff;
        border: none;
        border-radius: 20px;
        height: 36px;
        padding: 0 16px;
        font: inherit;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .obtn:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      .obtn:disabled {
        opacity: 0.5;
        cursor: default;
      }
      .ostage {
        flex: 1;
        display: grid;
        place-items: center;
        overflow: auto;
        padding: 8px;
        min-height: 0;
      }
      .ostage img,
      .ostage video {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
      .pager {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        color: #fff;
        padding: 12px;
        font-size: 13px;
      }

      .toast {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--oppai-surface-2);
        color: var(--oppai-text);
        padding: 12px 20px;
        border-radius: 12px;
        z-index: 60;
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
        animation: oppai-fade-in-up 0.28s var(--oppai-ease-emphasized) both;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.loadSources();
  }

  private get source(): RemoteSource | undefined {
    return this.sources.find((s) => s.id === this.sourceId);
  }
  private get feed(): SourceFeed | undefined {
    return this.source?.feeds.find((f) => f.id === this.feedId);
  }
  /** Inside a thread there is no chip selected, so search and sort don't apply. */
  private get isSearch(): boolean {
    return !this.container && this.feed?.query === true;
  }
  /** The feed actually being fetched: the thread if we're in one, else the chip. */
  private get activeFeed(): string {
    return this.container?.feedId ?? this.feedId;
  }

  private async loadSources() {
    try {
      const { sources } = await api.sources();
      this.sources = sources;
      const first = sources[0];
      if (first) {
        this.sourceId = first.id;
        this.feedId = first.feeds[0]?.id ?? "";
      }
    } catch (e) {
      this.error = e instanceof Error ? e.message : "Couldn't reach the server";
    } finally {
      this.loadingSources = false;
    }
    if (this.sourceId) void this.load(true);
  }

  private async load(reset: boolean) {
    if (!this.sourceId || this.loading) return;
    if (!reset && !this.cursor) return; // at the end
    // A search feed with no term would 400 upstream; wait for one instead.
    if (this.isSearch && !this.query) return;

    this.loading = true;
    try {
      const page = await api.browseSource(this.sourceId, {
        feed: this.activeFeed,
        cursor: reset ? undefined : this.cursor,
        // A thread is its own feed; the board's search term means nothing inside it.
        q: this.container ? undefined : this.query || undefined,
        sort: this.container ? undefined : this.sort || undefined,
      });
      this.items = reset ? page.items : [...this.items, ...page.items];
      this.cursor = page.cursor ?? "";
      this.error = "";
    } catch (e) {
      this.error = e instanceof Error ? e.message : "Couldn't load that feed";
    } finally {
      this.loading = false;
    }
  }

  /** Restarts the feed from page one. */
  private reset() {
    this.items = [];
    this.cursor = "";
    this.error = "";
    void this.load(true);
  }

  private pickSource(id: string) {
    if (id === this.sourceId) return;
    this.sourceId = id;
    this.feedId = this.sources.find((s) => s.id === id)?.feeds[0]?.id ?? "";
    this.container = null;
    this.sort = "";
    this.query = "";
    this.draft = "";
    this.reset();
  }

  private pickFeed(id: string) {
    if (id === this.feedId && !this.container) return;
    this.feedId = id;
    this.container = null;
    // Each feed carries its own orderings; the previous feed's sort is meaningless
    // here, so fall back to the new feed's default.
    this.sort = "";
    if (this.source?.feeds.find((f) => f.id === id)?.query !== true) {
      this.query = "";
      this.draft = "";
    }
    this.reset();
  }

  private pickSort(id: string) {
    if (id === this.sort) return;
    this.sort = id;
    this.reset();
  }

  /** Opens a container — a thread — as a feed of its own. */
  private openContainer(item: SourceItem) {
    this.container = item;
    this.reset();
  }

  private leaveContainer = () => {
    this.container = null;
    this.reset();
  };

  // Committing on submit, not on every keystroke: each commit is a request to
  // someone else's site.
  private submitSearch(e: Event) {
    e.preventDefault();
    this.query = this.draft.trim();
    this.container = null;
    this.reset();
  }

  private async open(item: SourceItem) {
    this.active = item;
    this.pages = [];
    this.pageAt = 0;
    if (item.kind !== "comic") return;
    try {
      const { pages } = await api.sourcePages(this.sourceId, item.id);
      this.pages = pages;
    } catch (e) {
      this.error = e instanceof Error ? e.message : "Couldn't open that comic";
      this.active = null;
    }
  }

  private close = () => {
    this.active = null;
    this.pages = [];
  };

  /** Saves one item, or — from the thread header — the whole thread as a comic. */
  private async save(item: SourceItem | null) {
    if (!item || this.saving) return;
    // A thread's payload is its run of images, which only the server can resolve; it
    // lands in the library as a comic. So does a gallery. Everything else is one file.
    const multiPage = item.kind === "comic" || item.kind === "thread";
    this.saving = true;
    try {
      await api.saveFromSource(this.sourceId, {
        itemId: multiPage ? item.id : undefined,
        mediaUrl: multiPage ? undefined : item.mediaUrl,
        pageUrl: item.pageUrl,
        title: item.title,
        kind: multiPage ? "comic" : item.kind,
      });
      this.showToast(item.kind === "thread" ? "Saved the thread to your library" : "Saved to library");
      // The library behind this view is now stale.
      this.dispatchEvent(new CustomEvent("imported", { bubbles: true, composed: true }));
    } catch (e) {
      this.showToast(e instanceof Error ? e.message : "Save failed");
    } finally {
      this.saving = false;
    }
  }

  private showToast(msg: string) {
    this.toast = msg;
    setTimeout(() => {
      this.toast = "";
    }, 2600);
  }

  private renderTile(item: SourceItem, index: number) {
    const isThread = item.kind === "thread";
    const stat = isThread
      ? `${item.count ?? 0}`
      : item.width && item.height
        ? `${item.width}×${item.height}`
        : "";
    return html`
      <button
        class="tile anim-rise"
        style="animation-delay:${Math.min(index, 12) * 45}ms;"
        @click=${() => (isThread ? this.openContainer(item) : this.open(item))}
        title=${item.title}
      >
        <div class="tile-media">
          ${item.thumbUrl
            ? html`<img src=${api.sourceStreamURL(item.thumbUrl)} loading="lazy" alt=${item.title} />`
            : html`<div class="tile-blank">
                <span class="material-symbols-rounded" style="font-size:36px;">forum</span>
              </div>`}
          ${item.kind === "video"
            ? html`<span class="play material-symbols-rounded" style="font-size:44px;">play_circle</span>`
            : nothing}
          ${stat
            ? html`<span class="tile-stat">
                ${isThread
                  ? html`<span class="material-symbols-rounded" style="font-size:13px;">image</span>`
                  : nothing}
                ${stat}
              </span>`
            : nothing}
        </div>
        <div class="tile-meta">
          <div class="tile-title">${item.title}</div>
          <div class="tile-tag">
            ${isThread ? "Thread" : item.kind === "comic" ? "Gallery" : item.kind}
          </div>
        </div>
      </button>
    `;
  }

  private renderOverlay(item: SourceItem) {
    const isComic = item.kind === "comic";
    const page = this.pages[this.pageAt];
    return html`
      <div class="overlay" @click=${(e: Event) => { if (e.target === e.currentTarget) this.close(); }}>
        <div class="obar">
          <button class="obtn" @click=${this.close}>
            <span class="material-symbols-rounded" style="font-size:18px;">arrow_back</span>Back
          </button>
          <span class="t">${item.title}</span>
          ${item.pageUrl
            ? html`<a href=${item.pageUrl} target="_blank" rel="noopener noreferrer">
                <button class="obtn">
                  <span class="material-symbols-rounded" style="font-size:18px;">open_in_new</span>Source
                </button>
              </a>`
            : nothing}
          <button class="obtn" ?disabled=${this.saving} @click=${() => this.save(item)}>
            <span class="material-symbols-rounded" style="font-size:18px;">download</span>
            ${this.saving ? "Saving…" : "Save to library"}
          </button>
        </div>

        <div class="ostage">
          ${isComic
            ? page
              ? html`<img src=${api.sourceStreamURL(page)} alt="Page ${this.pageAt + 1}" />`
              : html`<md-circular-progress indeterminate></md-circular-progress>`
            : item.kind === "video"
              ? html`<video src=${api.sourceStreamURL(item.mediaUrl ?? "")} controls autoplay loop></video>`
              : html`<img src=${api.sourceStreamURL(item.mediaUrl ?? item.thumbUrl)} alt=${item.title} />`}
        </div>

        ${isComic && this.pages.length
          ? html`
              <div class="pager">
                <button
                  class="obtn"
                  ?disabled=${this.pageAt === 0}
                  @click=${() => { this.pageAt = Math.max(0, this.pageAt - 1); }}
                >
                  <span class="material-symbols-rounded" style="font-size:18px;">chevron_left</span>
                </button>
                <span>${this.pageAt + 1} / ${this.pages.length}</span>
                <button
                  class="obtn"
                  ?disabled=${this.pageAt >= this.pages.length - 1}
                  @click=${() => { this.pageAt = Math.min(this.pages.length - 1, this.pageAt + 1); }}
                >
                  <span class="material-symbols-rounded" style="font-size:18px;">chevron_right</span>
                </button>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  /** The thread header: what we're inside, how to get out, and how to keep it. */
  private renderContainerHead(thread: SourceItem) {
    return html`
      <div class="head">
        <h2 class="title">${thread.title}</h2>
        <span class="count">
          ${this.items.length} ${this.items.length === 1 ? "file" : "files"}
        </span>
        <div class="head-actions">
          <button class="chip ghost" @click=${this.leaveContainer}>
            <span class="material-symbols-rounded" style="font-size:16px;">arrow_back</span>
            Back to ${this.feed?.label ?? "the board"}
          </button>
          <button class="chip ghost" ?disabled=${this.saving} @click=${() => this.save(thread)}>
            <span class="material-symbols-rounded" style="font-size:16px;">download</span>
            ${this.saving ? "Saving…" : "Save whole thread"}
          </button>
        </div>
      </div>
    `;
  }

  render() {
    if (this.loadingSources) {
      return html`<div class="empty"><md-circular-progress indeterminate></md-circular-progress></div>`;
    }
    if (!this.sources.length) {
      return html`<div class="empty">No remote sources are configured.</div>`;
    }

    const sorts = this.feed?.sorts ?? [];
    const thread = this.container;

    return html`
      ${thread
        ? this.renderContainerHead(thread)
        : html`
            <div class="head">
              <h2 class="title">${this.source?.name ?? "Browse"}</h2>
              <span class="count">${this.items.length ? `${this.items.length} shown` : ""}</span>
            </div>

            ${this.sources.length > 1
              ? html`<div class="chips tight">
                  ${this.sources.map(
                    (s) => html`<button
                      class="chip"
                      aria-pressed=${s.id === this.sourceId}
                      @click=${() => this.pickSource(s.id)}
                    >${s.name}</button>`,
                  )}
                </div>`
              : nothing}

            <div class="chips ${this.isSearch ? "tight" : ""}">
              ${(this.source?.feeds ?? []).map(
                (f) => html`<button
                  class="chip"
                  aria-pressed=${f.id === this.feedId}
                  @click=${() => this.pickFeed(f.id)}
                >${f.label}</button>`,
              )}
            </div>

            ${this.isSearch
              ? html`
                  <form class="searchbar" @submit=${this.submitSearch}>
                    <label class="searchbox">
                      <span class="material-symbols-rounded" style="font-size:20px; color:var(--oppai-text-dim);"
                        >search</span
                      >
                      <input
                        type="search"
                        placeholder="Search ${this.source?.name ?? ""}…"
                        .value=${this.draft}
                        @input=${(e: Event) => { this.draft = (e.target as HTMLInputElement).value; }}
                      />
                    </label>
                    <button class="chip" type="submit">Search</button>
                  </form>
                  ${sorts.length
                    ? html`<div class="chips tight">
                        ${sorts.map(
                          (s) => html`<button
                            class="chip"
                            aria-pressed=${s.id === (this.sort || sorts[0].id)}
                            @click=${() => this.pickSort(s.id)}
                          >${s.label}</button>`,
                        )}
                      </div>`
                    : nothing}
                `
              : nothing}
          `}

      ${this.error && !this.items.length
        ? html`<div class="empty">
            <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
              >cloud_off</span
            >
            <div style="font-size:14px;">${this.error}</div>
          </div>`
        : this.isSearch && !this.query
          ? html`<div class="empty">
              <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
                >search</span
              >
              <div style="font-size:14px;">Search ${this.source?.name ?? ""} to see results.</div>
            </div>`
          : this.loading && !this.items.length
            ? html`<div class="empty"><md-circular-progress indeterminate></md-circular-progress></div>`
            : !this.items.length
              ? html`<div class="empty">
                  <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
                    >search_off</span
                  >
                  <div style="font-size:14px;">
                    ${thread
                      ? "Nothing left in this thread — it may have 404'd."
                      : this.query
                        ? html`Nothing matched “${this.query}”.`
                        : "Nothing on this feed."}
                  </div>
                </div>`
              : html`
                  <div class="grid">${this.items.map((i, n) => this.renderTile(i, n))}</div>
                  ${this.cursor
                    ? html`<div class="more">
                        <button class="chip" ?disabled=${this.loading} @click=${() => this.load(false)}>
                          ${this.loading ? "Loading…" : "Load more"}
                        </button>
                      </div>`
                    : nothing}
                `}

      ${this.active ? this.renderOverlay(this.active) : nothing}
      ${this.toast ? html`<div class="toast">${this.toast}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "oppai-browse": OppaiBrowse;
  }
}
