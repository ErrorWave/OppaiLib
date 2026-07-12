import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
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
 */
@customElement("oppai-browse")
export class OppaiBrowse extends LitElement {
  @state() private sources: RemoteSource[] = [];
  @state() private sourceId = "";
  @state() private feedId = "";
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

  static styles = css`
    :host { display: block; }

    .chips {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      padding: 4px 0 12px;
    }
    .chip {
      border: 1px solid var(--oppai-outline, #444);
      background: transparent;
      color: var(--oppai-text-muted, #bbb);
      border-radius: 8px;
      padding: 6px 14px;
      font: inherit;
      font-size: 13px;
      cursor: pointer;
      white-space: nowrap;
    }
    .chip:hover { background: var(--oppai-surface-2, #222); }
    .chip[aria-pressed="true"] {
      background: var(--oppai-primary-container, #333);
      color: var(--oppai-primary-bright, #fff);
      border-color: transparent;
    }
    .chip.sort { border-radius: 16px; font-size: 12px; padding: 4px 12px; }

    .searchbar { display: flex; gap: 8px; padding-bottom: 12px; }
    .searchbar input {
      flex: 1;
      background: var(--oppai-surface-2, #1e1e1e);
      border: 1px solid var(--oppai-outline, #444);
      border-radius: 24px;
      padding: 10px 16px;
      color: var(--oppai-text, #eee);
      font: inherit;
    }
    .searchbar input:focus {
      outline: none;
      border-color: var(--oppai-primary-bright, #8ab4f8);
    }
    .searchbar button {
      background: var(--oppai-primary-container, #333);
      color: var(--oppai-primary-bright, #fff);
      border: none;
      border-radius: 24px;
      padding: 0 20px;
      font: inherit;
      cursor: pointer;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px;
    }
    .tile {
      position: relative;
      aspect-ratio: 3 / 4;
      border-radius: 16px;
      overflow: hidden;
      background: var(--oppai-surface-2, #222);
      cursor: pointer;
      border: none;
      padding: 0;
    }
    .tile img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .tile .cap {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      font-size: 12px;
      text-align: left;
      padding: 6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .badge {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 28px;
      height: 28px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      display: grid;
      place-items: center;
    }
    .play {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      color: #fff;
      text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
    }

    .state {
      display: grid;
      place-items: center;
      padding: 64px 24px;
      color: var(--oppai-text-muted, #999);
      text-align: center;
    }
    .more { display: grid; place-items: center; padding: 24px; }

    /* Preview overlay */
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 50;
      background: rgba(0, 0, 0, 0.92);
      display: flex;
      flex-direction: column;
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
    .obar button {
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
      border: none;
      border-radius: 20px;
      padding: 8px 16px;
      font: inherit;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .obar button:disabled { opacity: 0.5; cursor: default; }
    .ostage {
      flex: 1;
      display: grid;
      place-items: center;
      overflow: auto;
      padding: 8px;
    }
    .ostage img,
    .ostage video { max-width: 100%; max-height: 100%; object-fit: contain; }
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
      background: var(--oppai-surface-2, #333);
      color: var(--oppai-text, #eee);
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 60;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    }
  `;

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
  private get isSearch(): boolean {
    return this.feed?.query === true;
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
        feed: this.feedId,
        cursor: reset ? undefined : this.cursor,
        q: this.query || undefined,
        sort: this.sort || undefined,
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
    this.sort = "";
    this.query = "";
    this.draft = "";
    this.reset();
  }

  private pickFeed(id: string) {
    if (id === this.feedId) return;
    this.feedId = id;
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

  // Committing on submit, not on every keystroke: each commit is a request to
  // someone else's site.
  private submitSearch(e: Event) {
    e.preventDefault();
    this.query = this.draft.trim();
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

  private async save() {
    const item = this.active;
    if (!item || this.saving) return;
    this.saving = true;
    try {
      await api.saveFromSource(this.sourceId, {
        // A comic's payload is its run of pages, which only the server can resolve;
        // everything else is a single file at a URL.
        itemId: item.kind === "comic" ? item.id : undefined,
        mediaUrl: item.kind === "comic" ? undefined : item.mediaUrl,
        pageUrl: item.pageUrl,
        title: item.title,
        kind: item.kind,
      });
      this.showToast("Saved to library");
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
    setTimeout(() => { this.toast = ""; }, 2600);
  }

  private renderTile(item: SourceItem) {
    return html`
      <button class="tile" @click=${() => this.open(item)} title=${item.title}>
        <img src=${api.sourceStreamURL(item.thumbUrl)} loading="lazy" alt=${item.title} />
        ${item.kind === "video"
          ? html`<span class="play material-symbols-rounded" style="font-size:44px;">play_circle</span>`
          : nothing}
        ${item.kind === "comic"
          ? html`<span class="badge material-symbols-rounded" style="font-size:16px;">menu_book</span>`
          : nothing}
        <span class="cap">${item.title}</span>
      </button>
    `;
  }

  private renderOverlay(item: SourceItem) {
    const isComic = item.kind === "comic";
    const page = this.pages[this.pageAt];
    return html`
      <div class="overlay" @click=${(e: Event) => { if (e.target === e.currentTarget) this.close(); }}>
        <div class="obar">
          <button @click=${this.close}>
            <span class="material-symbols-rounded" style="font-size:18px;">arrow_back</span>Back
          </button>
          <span class="t">${item.title}</span>
          ${item.pageUrl
            ? html`<a href=${item.pageUrl} target="_blank" rel="noopener noreferrer">
                <button>
                  <span class="material-symbols-rounded" style="font-size:18px;">open_in_new</span>Source
                </button>
              </a>`
            : nothing}
          <button ?disabled=${this.saving} @click=${this.save}>
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
                  ?disabled=${this.pageAt === 0}
                  @click=${() => { this.pageAt = Math.max(0, this.pageAt - 1); }}
                >
                  <span class="material-symbols-rounded" style="font-size:18px;">chevron_left</span>
                </button>
                <span>${this.pageAt + 1} / ${this.pages.length}</span>
                <button
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

  render() {
    if (this.loadingSources) {
      return html`<div class="state"><md-circular-progress indeterminate></md-circular-progress></div>`;
    }
    if (!this.sources.length) {
      return html`<div class="state">No remote sources are configured.</div>`;
    }

    const sorts = this.feed?.sorts ?? [];

    return html`
      ${this.sources.length > 1
        ? html`<div class="chips">
            ${this.sources.map(
              (s) => html`<button
                class="chip"
                aria-pressed=${s.id === this.sourceId}
                @click=${() => this.pickSource(s.id)}
              >${s.name}</button>`,
            )}
          </div>`
        : nothing}

      <div class="chips">
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
              <input
                type="search"
                placeholder="Search ${this.source?.name ?? ""}…"
                .value=${this.draft}
                @input=${(e: Event) => { this.draft = (e.target as HTMLInputElement).value; }}
              />
              <button type="submit">Search</button>
            </form>
            ${sorts.length
              ? html`<div class="chips">
                  ${sorts.map(
                    (s) => html`<button
                      class="chip sort"
                      aria-pressed=${s.id === (this.sort || sorts[0].id)}
                      @click=${() => this.pickSort(s.id)}
                    >${s.label}</button>`,
                  )}
                </div>`
              : nothing}
          `
        : nothing}

      ${this.error && !this.items.length
        ? html`<div class="state">${this.error}</div>`
        : this.isSearch && !this.query
          ? html`<div class="state">Search ${this.source?.name ?? ""} to see results.</div>`
          : this.loading && !this.items.length
            ? html`<div class="state"><md-circular-progress indeterminate></md-circular-progress></div>`
            : !this.items.length
              ? html`<div class="state">
                  ${this.query ? html`Nothing matched “${this.query}”.` : "Nothing on this feed."}
                </div>`
              : html`
                  <div class="grid">${this.items.map((i) => this.renderTile(i))}</div>
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
