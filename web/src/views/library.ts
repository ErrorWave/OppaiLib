import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { api, type Media, type User } from "../api.js";
import "./viewer.js";
import "./scrape-dialog.js";

const KINDS = ["", "video", "gif", "image", "comic", "game"] as const;
const KIND_LABELS: Record<string, string> = {
  "": "All", video: "Videos", gif: "GIFs", image: "Images", comic: "Comics", game: "Games",
};

@customElement("oppai-library")
export class OppaiLibrary extends LitElement {
  @property({ attribute: false }) user!: User;
  @state() private items: Media[] = [];
  @state() private kind = "";
  @state() private loading = false;
  @state() private selected: Media | null = null;
  @state() private aiTagger = "";

  static styles = css`
    :host { display: block; }
    header {
      position: sticky; top: 0; z-index: 5;
      display: flex; align-items: center; gap: .5rem;
      padding: .5rem 1rem;
      background: var(--md-sys-color-surface-container);
    }
    header .title { font-size: 1.25rem; font-weight: 500; color: var(--md-sys-color-primary); }
    header .spacer { flex: 1; }
    .tabs { padding: 0 .5rem; background: var(--md-sys-color-surface-container); }
    main { padding: 1rem; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px;
    }
    .tile {
      position: relative;
      aspect-ratio: 3 / 4;
      border-radius: var(--oppai-radius);
      overflow: hidden;
      background: var(--md-sys-color-surface-container-high);
      cursor: pointer;
      transition: transform .12s ease;
    }
    .tile:hover { transform: translateY(-2px); }
    .tile img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .tile .label {
      position: absolute; left: 0; right: 0; bottom: 0;
      padding: .5rem; font-size: .8rem;
      background: linear-gradient(transparent, rgba(0,0,0,.75));
      color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .tile .kind {
      position: absolute; top: 6px; left: 6px;
      background: rgba(0,0,0,.55); color: #fff;
      border-radius: 8px; padding: 1px 7px; font-size: .7rem; text-transform: uppercase;
    }
    .empty { text-align: center; opacity: .7; margin-top: 4rem; }
    .fabs { position: fixed; right: 20px; bottom: 20px; display: flex; flex-direction: column; gap: 12px; }
    input[type=file] { display: none; }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.refresh();
    api.health().then((h) => (this.aiTagger = h.aiEnabled ? h.aiTagger : "off")).catch(() => {});
  }

  private async refresh() {
    this.loading = true;
    try {
      const res = await api.listMedia(this.kind);
      this.items = res.items ?? [];
    } finally {
      this.loading = false;
    }
  }

  private selectKind(k: string) {
    if (this.kind === k) return;
    this.kind = k;
    this.refresh();
  }

  private async onFile(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) return;
    for (const f of Array.from(input.files)) {
      try { await api.upload(f); } catch (err) { console.error("upload", err); }
    }
    input.value = "";
    this.refresh();
  }

  private thumb(m: Media) {
    // Images/gifs stream directly as their own thumbnail for now.
    if (m.kind === "image" || m.kind === "gif") {
      return html`<img loading="lazy" src=${api.streamURL(m.id)} alt=${m.title} />`;
    }
    return html`<div style="display:grid;place-items:center;height:100%;opacity:.6">
      <md-icon>${m.kind === "video" ? "movie" : m.kind === "comic" ? "menu_book" : "sports_esports"}</md-icon>
    </div>`;
  }

  render() {
    return html`
      <header>
        <span class="title">OppaiLib</span>
        <span class="spacer"></span>
        <span style="font-size:.75rem;opacity:.6" title="active AI tagger">AI: ${this.aiTagger}</span>
        <md-icon-button @click=${() => this.dispatchEvent(new CustomEvent("logout", { bubbles: true, composed: true }))} title="Sign out">
          <md-icon>logout</md-icon>
        </md-icon-button>
      </header>

      <md-tabs class="tabs" .activeTabIndex=${KINDS.indexOf(this.kind as any)}
               @change=${(e: Event) => this.selectKind(KINDS[(e.target as any).activeTabIndex])}>
        ${KINDS.map((k) => html`<md-primary-tab>${KIND_LABELS[k]}</md-primary-tab>`)}
      </md-tabs>

      <main>
        ${this.loading
          ? html`<div class="empty"><md-circular-progress indeterminate></md-circular-progress></div>`
          : this.items.length === 0
          ? html`<div class="empty">Nothing here yet. Upload or scrape something.</div>`
          : html`<div class="grid">
              ${this.items.map(
                (m) => html`<div class="tile" @click=${() => (this.selected = m)}>
                  <span class="kind">${m.kind}</span>
                  ${this.thumb(m)}
                  <div class="label">${m.title}</div>
                </div>`,
              )}
            </div>`}
      </main>

      <div class="fabs">
        <md-fab size="small" label="Scrape" @click=${() => (this.renderRoot.querySelector("oppai-scrape-dialog") as any)?.open()}>
          <md-icon slot="icon">link</md-icon>
        </md-fab>
        <md-fab label="Upload" @click=${() => (this.renderRoot.querySelector("#file") as HTMLInputElement).click()}>
          <md-icon slot="icon">upload</md-icon>
        </md-fab>
      </div>
      <input id="file" type="file" multiple @change=${this.onFile} />

      <oppai-scrape-dialog @imported=${() => this.refresh()}></oppai-scrape-dialog>
      ${this.selected
        ? html`<oppai-viewer .media=${this.selected} @close=${() => (this.selected = null)}
                             @changed=${() => this.refresh()}></oppai-viewer>`
        : ""}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { "oppai-library": OppaiLibrary; }
}
