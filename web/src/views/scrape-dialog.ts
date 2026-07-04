import { LitElement, html, css } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { api, type ScrapeResult } from "../api.js";
import { motionStyles } from "../theme.js";

// Paste a URL → preview extracted metadata + media → import selected assets.
@customElement("oppai-scrape-dialog")
export class OppaiScrapeDialog extends LitElement {
  @query("md-dialog") private dialog!: HTMLDialogElement & { show(): void; close(): void };
  @state() private url = "";
  @state() private result: ScrapeResult | null = null;
  @state() private chosen = new Set<string>();
  @state() private busy = false;
  @state() private error = "";

  static styles = [
    motionStyles,
    css`
      md-dialog { max-width: 560px; }
      .row { display: flex; gap: .5rem; align-items: end; }
      md-outlined-text-field { flex: 1; }
      .previews {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
        gap: 8px;
        margin-top: 1rem;
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
      .meta {
        font-size: .85rem;
        opacity: .8;
        margin-top: .5rem;
        animation: oppai-fade-in 0.3s var(--oppai-ease-standard) both;
      }
      .err { color: var(--md-sys-color-error); font-size: .85rem; margin-top: .5rem; }
      .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: .5rem; }
    `,
  ];

  open() {
    this.result = null;
    this.chosen = new Set();
    this.error = "";
    this.dialog.show();
  }

  private onUrlKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.preview();
    }
  };

  private async preview() {
    if (!this.url.trim() || this.busy) return;
    this.busy = true;
    this.error = "";
    try {
      this.result = await api.scrape(this.url);
      this.chosen = new Set(this.result.mediaUrls);
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
    if (!this.result) return;
    this.busy = true;
    try {
      await api.scrapeImport({
        url: this.url,
        mediaUrls: [...this.chosen],
        title: this.result.title,
        tags: this.result.tags,
      });
      this.dispatchEvent(new CustomEvent("imported", { bubbles: true, composed: true }));
      this.dialog.close();
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.busy = false;
    }
  }

  render() {
    return html`
      <md-dialog>
        <div slot="headline">Import from URL</div>
        <form slot="content" method="dialog" @submit=${(e: Event) => e.preventDefault()}>
          <div class="row">
            <md-outlined-text-field label="Page URL" type="url" .value=${this.url}
              @input=${(e: Event) => (this.url = (e.target as HTMLInputElement).value)}
              @keydown=${this.onUrlKeydown}></md-outlined-text-field>
            <md-filled-button type="button" @click=${this.preview}
              ?disabled=${this.busy || !this.url.trim()}>
              ${this.busy ? "Fetching…" : "Fetch"}
            </md-filled-button>
          </div>
          ${this.error ? html`<div class="err">${this.error}</div>` : ""}
          ${this.result
            ? html`
                <div class="meta"><strong>${this.result.title || "(untitled)"}</strong></div>
                <div class="meta">${this.result.description}</div>
                <div class="tags">
                  ${this.result.tags.map((t) => html`<md-filter-chip label=${t} selected></md-filter-chip>`)}
                </div>
                <div class="previews">
                  ${this.result.mediaUrls.map(
                    (u) => html`<div class="pv ${this.chosen.has(u) ? "sel" : ""}" @click=${() => this.toggle(u)}>
                      <img src=${u} loading="lazy" referrerpolicy="no-referrer" />
                    </div>`,
                  )}
                </div>
                ${this.result.mediaUrls.length === 0 ? html`<div class="meta">No media found on that page.</div>` : ""}
              `
            : ""}
        </form>
        <div slot="actions">
          <md-text-button type="button" @click=${() => this.dialog.close()}>Cancel</md-text-button>
          <md-filled-button type="button" @click=${this.import}
            ?disabled=${this.busy || !this.result || this.chosen.size === 0}>
            ${this.busy && this.result ? "Importing…" : html`Import ${this.chosen.size || ""}`}
          </md-filled-button>
        </div>
      </md-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { "oppai-scrape-dialog": OppaiScrapeDialog; }
}
