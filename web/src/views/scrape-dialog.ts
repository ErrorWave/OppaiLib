import { LitElement, html, css } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { api, type ScrapeResult } from "../api.js";
import { motionStyles } from "../theme.js";

// Paste one or more URLs (one per line) → preview extracted metadata + media →
// import selected assets. A single URL and a bulk paste share the same flow.
@customElement("oppai-scrape-dialog")
export class OppaiScrapeDialog extends LitElement {
  @query("md-dialog") private dialog!: HTMLDialogElement & { show(): void; close(): void };
  @state() private urls = "";
  @state() private results: ScrapeResult[] = [];
  @state() private failures: { url: string; error: string }[] = [];
  @state() private chosen = new Set<string>();
  @state() private busy = false;
  @state() private error = "";

  static styles = [
    motionStyles,
    css`
      md-dialog { max-width: 620px; }
      .row { display: flex; gap: .5rem; align-items: end; }
      md-outlined-text-field { flex: 1; }
      .hint { font-size: .78rem; opacity: .7; margin: .35rem 0 0; }
      .group { margin-top: 1rem; }
      .group + .group { border-top: 1px solid var(--md-sys-color-outline-variant); padding-top: 1rem; }
      .previews {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
        gap: 8px;
        margin-top: .5rem;
        animation: oppai-fade-in-up 0.32s var(--oppai-ease-emphasized) both;
      }
      .pv {
        position: relative;
        aspect-ratio: 1;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        border: 2px solid transparent;
        transition: transform 0.18s var(--oppai-ease-spring), border-color 0.18s ease;
      }
      .pv:hover { transform: translateY(-2px) scale(1.03); }
      .pv.sel { border-color: var(--md-sys-color-primary); }
      .pv.sel::after {
        content: "check";
        font-family: "Material Symbols Rounded";
        font-feature-settings: "liga" 1;
        line-height: 1;
        position: absolute;
        top: 4px;
        right: 4px;
        font-size: 16px;
        color: var(--md-sys-color-on-primary);
        background: var(--md-sys-color-primary);
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: grid;
        place-items: center;
      }
      .pv img { width: 100%; height: 100%; object-fit: cover; }
      .src { font-size: .78rem; opacity: .6; word-break: break-all; }
      .meta {
        font-size: .85rem;
        opacity: .8;
        margin-top: .35rem;
        animation: oppai-fade-in 0.3s var(--oppai-ease-standard) both;
      }
      .err { color: var(--md-sys-color-error); font-size: .85rem; margin-top: .5rem; }
      .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: .5rem; }
    `,
  ];

  open() {
    this.results = [];
    this.failures = [];
    this.chosen = new Set();
    this.error = "";
    this.urls = "";
    this.dialog.show();
  }

  private get urlList(): string[] {
    const seen = new Set<string>();
    return this.urls
      .split(/[\n,]/)
      .map((u) => u.trim())
      .filter((u) => u && !seen.has(u) && (seen.add(u), true));
  }

  private get totalMedia(): number {
    return this.results.reduce((n, r) => n + r.mediaUrls.length, 0);
  }

  private onUrlKeydown = (e: KeyboardEvent) => {
    // Enter inserts a newline (multi-URL); Ctrl/Cmd+Enter fetches.
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      this.fetch();
    }
  };

  private async fetch() {
    const urls = this.urlList;
    if (urls.length === 0 || this.busy) return;
    this.busy = true;
    this.error = "";
    this.results = [];
    this.failures = [];
    try {
      const { items } = await api.scrapeBulk(urls);
      const chosen = new Set<string>();
      for (const it of items) {
        if (it.result) {
          this.results = [...this.results, it.result];
          it.result.mediaUrls.forEach((u) => chosen.add(u));
        } else {
          this.failures = [...this.failures, { url: it.url, error: it.error || "failed" }];
        }
      }
      this.chosen = chosen;
      if (this.results.length === 0 && this.failures.length > 0) {
        this.error = "Nothing could be fetched from those links.";
      }
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.busy = false;
    }
  }

  private toggle(u: string) {
    const next = new Set(this.chosen);
    next.has(u) ? next.delete(u) : next.add(u);
    this.chosen = next;
  }

  private async import() {
    if (this.chosen.size === 0 || this.busy) return;
    this.busy = true;
    this.error = "";
    let imported = 0;
    try {
      for (const r of this.results) {
        const picked = r.mediaUrls.filter((u) => this.chosen.has(u));
        if (picked.length === 0) continue;
        const res = await api.scrapeImport({
          url: r.sourceUrl,
          mediaUrls: picked,
          title: r.title,
          tags: r.tags,
        });
        imported += res.count;
      }
      this.dispatchEvent(
        new CustomEvent("imported", { detail: { count: imported }, bubbles: true, composed: true }),
      );
      this.dialog.close();
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.busy = false;
    }
  }

  private renderGroup(r: ScrapeResult) {
    return html`
      <div class="group">
        <div class="meta"><strong>${r.title || "(untitled)"}</strong></div>
        ${r.description ? html`<div class="meta">${r.description}</div>` : ""}
        ${r.tags.length
          ? html`<div class="tags">
              ${r.tags.map((t) => html`<md-filter-chip label=${t} selected></md-filter-chip>`)}
            </div>`
          : ""}
        ${r.mediaUrls.length
          ? html`<div class="previews">
              ${r.mediaUrls.map(
                (u) => html`<div class="pv ${this.chosen.has(u) ? "sel" : ""}" @click=${() => this.toggle(u)}>
                  <img src=${u} loading="lazy" referrerpolicy="no-referrer" />
                </div>`,
              )}
            </div>`
          : html`<div class="meta">No media found on that page.</div>`}
      </div>
    `;
  }

  render() {
    return html`
      <md-dialog>
        <div slot="headline">Import from URL</div>
        <form slot="content" method="dialog" @submit=${(e: Event) => e.preventDefault()}>
          <div class="row">
            <md-outlined-text-field label="Page or media URL(s)" type="textarea" rows="3"
              .value=${this.urls}
              @input=${(e: Event) => (this.urls = (e.target as HTMLInputElement).value)}
              @keydown=${this.onUrlKeydown}></md-outlined-text-field>
            <md-filled-button type="button" @click=${this.fetch}
              ?disabled=${this.busy || this.urlList.length === 0}>
              ${this.busy ? "Fetching…" : "Fetch"}
            </md-filled-button>
          </div>
          <p class="hint">
            One URL per line for bulk import. Direct image/video links (e.g. Discord CDN) work too.
            Press ${navigator.platform.startsWith("Mac") ? "⌘" : "Ctrl"}+Enter to fetch.
          </p>
          ${this.error ? html`<div class="err">${this.error}</div>` : ""}
          ${this.results.map((r) => this.renderGroup(r))}
          ${this.failures.length
            ? html`<div class="err">
                ${this.failures.length} link(s) failed:
                ${this.failures.map((f) => html`<div class="src">${f.url} — ${f.error}</div>`)}
              </div>`
            : ""}
        </form>
        <div slot="actions">
          <md-text-button type="button" @click=${() => this.dialog.close()}>Cancel</md-text-button>
          <md-filled-button type="button" @click=${this.import}
            ?disabled=${this.busy || this.chosen.size === 0}>
            ${this.busy && this.results.length
              ? "Importing…"
              : html`Import ${this.chosen.size || ""}${this.totalMedia ? ` / ${this.totalMedia}` : ""}`}
          </md-filled-button>
        </div>
      </md-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { "oppai-scrape-dialog": OppaiScrapeDialog; }
}
