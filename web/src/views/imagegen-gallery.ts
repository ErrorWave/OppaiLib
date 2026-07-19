import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { iconStyles, motionStyles } from "../theme.js";
import { api, type GalleryBoard, type GalleryImage } from "../api.js";

const PAGE = 40;

/**
 * The InvokeAI gallery panel: every image the generator itself has kept, sorted
 * into its boards. InvokeAI stores each finished generation in its own gallery
 * regardless of what we do, so this surfaces that pile — browse it, expand an
 * image, copy one into the library, or delete it from the generator.
 *
 * The host view calls refresh() after a generation so new images appear without
 * a manual reload.
 */
@customElement("oppai-invoke-gallery")
export class OppaiInvokeGallery extends LitElement {
  @state() private boards: GalleryBoard[] = [];
  @state() private board = "none";
  @state() private items: GalleryImage[] = [];
  @state() private total = 0;
  @state() private loading = false;
  @state() private error = "";
  @state() private expanded: GalleryImage | null = null;
  @state() private busy = false;
  @state() private newBoard = "";
  /** Names saved to the library this session, so the button can say "Saved". */
  @state() private savedNames = new Set<string>();

  static styles = [
    iconStyles,
    motionStyles,
    css`
      :host {
        display: block;
        color: var(--oppai-text);
      }
      .panel {
        background: var(--oppai-surface-2);
        border-radius: 14px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.3px;
      }
      .head .count {
        margin-left: auto;
        font-weight: 400;
        font-size: 12px;
        color: var(--oppai-text-muted);
      }
      .boards {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }
      .board-select {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid var(--oppai-border-strong);
        border-radius: 10px;
        background: var(--oppai-surface);
        color: var(--oppai-text);
        font: inherit;
        font-size: 12px;
        padding: 8px 10px;
      }
      .new-board {
        display: flex;
        gap: 6px;
      }
      .new-board input {
        min-width: 0;
        flex: 1;
        border: 1px solid var(--oppai-border-strong);
        border-radius: 9px;
        background: var(--oppai-surface);
        color: var(--oppai-text);
        font: inherit;
        font-size: 12px;
        padding: 7px 9px;
      }
      .new-board button {
        border: none;
        border-radius: 9px;
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
        font: inherit;
        padding: 7px 10px;
        cursor: pointer;
      }
      .board {
        border: 1px solid var(--oppai-border-strong);
        background: transparent;
        color: var(--oppai-text-dim);
        border-radius: 999px;
        font: inherit;
        font-size: 12px;
        padding: 4px 10px;
        cursor: pointer;
      }
      .board.on {
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
        border-color: var(--oppai-accent);
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
        gap: 8px;
      }
      .tile {
        position: relative;
        border: none;
        padding: 0;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        background: var(--oppai-surface);
        aspect-ratio: 1;
      }
      .tile img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .tile .del {
        position: absolute;
        top: 3px;
        right: 3px;
        width: 22px;
        height: 22px;
        border: none;
        border-radius: 11px;
        background: rgba(0, 0, 0, 0.55);
        color: #fff;
        display: none;
        place-items: center;
        cursor: pointer;
      }
      .tile:hover .del {
        display: grid;
      }
      .note {
        font-size: 12px;
        color: var(--oppai-text-muted);
      }
      .more {
        border: 1px dashed var(--oppai-border-strong);
        background: none;
        color: var(--oppai-text-dim);
        border-radius: 10px;
        font: inherit;
        font-size: 13px;
        padding: 8px;
        cursor: pointer;
      }
      .err {
        font-size: 12px;
        color: var(--oppai-error, #f2b8b5);
      }

      /* Expanded (lightbox) overlay. */
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.82);
        z-index: 70;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 14px;
        padding: 20px;
      }
      .overlay img {
        max-width: min(96vw, 1400px);
        max-height: 82vh;
        object-fit: contain;
        border-radius: 10px;
      }
      .overlay-actions {
        display: flex;
        gap: 10px;
      }
      .obtn {
        border: none;
        border-radius: 10px;
        background: var(--oppai-surface-2);
        color: var(--oppai-text);
        font: inherit;
        font-size: 13px;
        font-weight: 600;
        padding: 10px 16px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .obtn.primary {
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
      }
      .obtn.danger {
        color: var(--oppai-error, #f2b8b5);
      }
      .obtn:disabled {
        opacity: 0.55;
        cursor: default;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    void this.refresh();
  }

  /** Reloads boards and the current board's first page. */
  async refresh() {
    this.error = "";
    try {
      const res = await api.galleryBoards();
      this.boards = res.boards;
      if (!this.boards.some((b) => b.id === this.board) && this.boards.length) {
        this.board = this.boards[0].id;
      }
    } catch (e) {
      this.error = (e as Error).message;
      return;
    }
    await this.loadPage(true);
  }

  private async loadPage(reset: boolean) {
    if (this.loading) return;
    this.loading = true;
    try {
      const offset = reset ? 0 : this.items.length;
      const page = await api.galleryImages(this.board, offset, PAGE);
      this.items = reset ? page.items : [...this.items, ...page.items];
      this.total = page.total;
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.loading = false;
    }
  }

  private pickBoard(id: string) {
    if (this.board === id) return;
    this.board = id;
    this.items = [];
    void this.loadPage(true);
  }

  private async createBoard() {
    const name = this.newBoard.trim();
    if (!name || this.busy) return;
    this.busy = true;
    this.error = "";
    try {
      const created = await api.createGalleryBoard(name);
      this.newBoard = "";
      await this.refresh();
      this.pickBoard(created.id);
      this.dispatchEvent(new CustomEvent("boards-changed", { bubbles: true, composed: true }));
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.busy = false;
    }
  }

  private async deleteImage(img: GalleryImage) {
    if (this.busy) return;
    if (!confirm("Delete this image from InvokeAI's gallery?")) return;
    this.busy = true;
    try {
      await api.deleteGalleryImage(img.name);
      this.items = this.items.filter((i) => i.name !== img.name);
      this.total = Math.max(0, this.total - 1);
      this.boards = this.boards.map((b) =>
        b.id === this.board ? { ...b, count: Math.max(0, b.count - 1) } : b,
      );
      if (this.expanded?.name === img.name) this.expanded = null;
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.busy = false;
    }
  }

  private async saveToLibrary(img: GalleryImage) {
    if (this.busy || this.savedNames.has(img.name)) return;
    this.busy = true;
    try {
      await api.saveGalleryImage({ name: img.name });
      this.savedNames = new Set(this.savedNames).add(img.name);
      this.dispatchEvent(new CustomEvent("imported", { bubbles: true, composed: true }));
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.busy = false;
    }
  }

  render() {
    const current = this.boards.find((b) => b.id === this.board);
    return html`
      <div class="panel">
        <div class="head">
          <span class="material-symbols-rounded" style="font-size:18px;">photo_library</span>
          Invoke gallery
          <span class="count">${current ? `${this.total || current.count} images` : ""}</span>
        </div>
        ${this.boards.length
          ? html`
              <select class="board-select" aria-label="Gallery" .value=${this.board}
                @change=${(e: Event) => this.pickBoard((e.target as HTMLSelectElement).value)}>
                ${this.boards.map((b) => html`<option value=${b.id}>${b.name}${b.count ? ` · ${b.count}` : ""}</option>`)}
              </select>
              ${this.boards.length <= 6 ? html`<div class="boards">
                ${this.boards.map(
                  (b) => html`<button class="board ${b.id === this.board ? "on" : ""}"
                    @click=${() => this.pickBoard(b.id)}>${b.name}${b.count ? ` · ${b.count}` : ""}</button>`,
                )}
              </div>` : nothing}
            `
          : nothing}
        <div class="new-board">
          <input maxlength="300" placeholder="New Invoke gallery" .value=${this.newBoard}
            @input=${(e: Event) => (this.newBoard = (e.target as HTMLInputElement).value)}
            @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") void this.createBoard(); }} />
          <button ?disabled=${this.busy || !this.newBoard.trim()} @click=${() => this.createBoard()}>Create</button>
        </div>
        ${this.error ? html`<div class="err">${this.error}</div>` : nothing}
        ${this.items.length
          ? html`<div class="grid">
              ${this.items.map(
                (img) => html`
                  <button class="tile" title=${img.name} @click=${() => (this.expanded = img)}>
                    <img src=${api.galleryThumbURL(img.name)} alt="Generated image" loading="lazy" />
                    <span
                      class="del"
                      role="button"
                      title="Delete from InvokeAI"
                      @click=${(e: Event) => {
                        e.stopPropagation();
                        void this.deleteImage(img);
                      }}
                    >
                      <span class="material-symbols-rounded" style="font-size:14px;">delete</span>
                    </span>
                  </button>
                `,
              )}
            </div>`
          : this.loading
            ? nothing
            : html`<div class="note">Nothing here yet — generated images land in this gallery.</div>`}
        ${this.loading ? html`<div class="note">Loading…</div>` : nothing}
        ${!this.loading && this.items.length < this.total
          ? html`<button class="more" @click=${() => this.loadPage(false)}>
              Load more (${this.total - this.items.length} left)
            </button>`
          : nothing}
      </div>
      ${this.expanded ? this.renderExpanded(this.expanded) : nothing}
    `;
  }

  private renderExpanded(img: GalleryImage) {
    const saved = this.savedNames.has(img.name);
    return html`
      <div class="overlay" @click=${(e: Event) => { if (e.target === e.currentTarget) this.expanded = null; }}>
        <img src=${api.galleryFullURL(img.name)} alt="Generated image" />
        <div class="overlay-actions">
          <button class="obtn primary" ?disabled=${this.busy || saved} @click=${() => this.saveToLibrary(img)}>
            <span class="material-symbols-rounded" style="font-size:17px;">${saved ? "check" : "save"}</span>
            ${saved ? "In library" : "Save to library"}
          </button>
          <button class="obtn danger" ?disabled=${this.busy} @click=${() => this.deleteImage(img)}>
            <span class="material-symbols-rounded" style="font-size:17px;">delete</span> Delete
          </button>
          <button class="obtn" @click=${() => (this.expanded = null)}>
            <span class="material-symbols-rounded" style="font-size:17px;">close</span> Close
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "oppai-invoke-gallery": OppaiInvokeGallery;
  }
}
