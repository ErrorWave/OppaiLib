import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { api, type Media } from "../api.js";
import { iconStyles, motionStyles } from "../theme.js";
import { KIND_META, KIND_ORDER, swatchFor, statFor, isTypingTarget } from "../media-meta.js";

// Inline single-item viewer, rendered inside the library content column (the
// app bar's back button closes it). Renders a kind-specific stage — video/GIF
// player, photo, comic reader, or game detail — plus shared metadata, the tag
// list, and the auto-tag action.
@customElement("oppai-viewer")
export class OppaiViewer extends LitElement {
  @property({ attribute: false }) media!: Media;
  @property({ type: Boolean }) favorite = false;

  @state() private full: Media | null = null;
  @state() private tagging = false;
  @state() private editing = false;
  @state() private saving = false;
  @state() private editTitle = "";
  @state() private editNotes = "";
  @state() private editKind: Media["kind"] = "image";
  @state() private editTags: string[] = [];
  @state() private newTag = "";

  static styles = [
    iconStyles,
    motionStyles,
    css`
      :host {
        display: block;
      }
      .wrap {
        max-width: 1100px;
        margin: 0 auto;
        animation: oppai-fade-in-up 0.4s var(--oppai-ease-emphasized) both;
      }
      .round-btn,
      .icon-round,
      .btn-primary,
      .btn-outline {
        transition: transform 0.18s var(--oppai-ease-spring), filter 0.15s ease,
          background 0.2s ease;
      }
      .round-btn:hover:not([disabled]),
      .icon-round:hover,
      .btn-outline:hover {
        transform: translateY(-1px);
        filter: brightness(1.08);
      }
      .btn-primary:hover {
        transform: translateY(-1px);
        filter: brightness(1.05);
      }
      .btn-primary:active,
      .btn-outline:active,
      .icon-round:active {
        transform: scale(0.96);
      }
      .stage {
        border-radius: 20px;
        overflow: hidden;
        position: relative;
      }
      .stage video,
      .stage img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        background: #000;
      }
      .placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 8px;
        color: #fff;
      }
      .mono {
        font: 600 12px ui-monospace, monospace;
        color: #fff;
        letter-spacing: 1px;
      }
      .reader {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
      }
      .reader-page {
        width: 340px;
        max-width: 60vw;
        aspect-ratio: 2 / 3;
        border-radius: 16px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 8px;
      }
      .round-btn {
        width: 44px;
        height: 44px;
        border-radius: 22px;
        background: var(--oppai-surface-2);
        border: none;
        color: var(--oppai-text);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;
      }
      .game {
        display: flex;
        gap: 32px;
        flex-wrap: wrap;
      }
      .game-cover {
        width: 260px;
        aspect-ratio: 3 / 4;
        border-radius: 20px;
        overflow: hidden;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .game h2 {
        font-size: 26px;
        font-weight: 500;
        margin: 0 0 8px;
      }
      .sub {
        font-size: 13px;
        color: var(--oppai-text-muted);
        margin-bottom: 18px;
      }
      .actions {
        display: flex;
        gap: 12px;
        margin-bottom: 20px;
        flex-wrap: wrap;
      }
      .btn-primary {
        height: 44px;
        padding: 0 24px;
        border-radius: 22px;
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
        border: none;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
      }
      .btn-outline {
        height: 44px;
        padding: 0 20px;
        border-radius: 22px;
        background: none;
        color: var(--oppai-text);
        border: 1px solid var(--oppai-border-strong);
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .desc {
        font-size: 14px;
        line-height: 1.6;
        color: var(--oppai-text-dim);
        max-width: 640px;
      }
      .meta {
        margin-top: 24px;
      }
      .meta-head {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .meta-title {
        font-size: 24px;
        font-weight: 500;
        margin: 0;
        flex: 1;
      }
      .icon-round {
        width: 44px;
        height: 44px;
        border-radius: 22px;
        background: var(--oppai-surface-2);
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .chips {
        display: flex;
        gap: 8px;
        margin-top: 14px;
        flex-wrap: wrap;
      }
      .chip {
        font-size: 12px;
        font-weight: 500;
        padding: 6px 14px;
        border-radius: 14px;
      }
      .chip-accent {
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
      }
      .chip-muted {
        background: var(--oppai-surface-2);
        color: var(--oppai-text-dim);
      }
      .meta-note {
        font-size: 12px;
        color: var(--oppai-text-muted);
        margin-top: 12px;
      }

      /* Edit form */
      .edit {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        max-width: 560px;
      }
      .edit label {
        font-size: 12px;
        font-weight: 600;
        color: var(--oppai-text-dim);
        display: block;
        margin-bottom: 6px;
      }
      .edit input,
      .edit textarea,
      .edit select {
        width: 100%;
        box-sizing: border-box;
        background: var(--oppai-surface-2);
        border: 1px solid var(--oppai-border-strong);
        border-radius: 12px;
        color: var(--oppai-text);
        font: inherit;
        font-size: 14px;
        padding: 10px 12px;
        outline: none;
      }
      .edit input:focus,
      .edit textarea:focus,
      .edit select:focus {
        border-color: var(--oppai-primary);
      }
      .edit textarea {
        resize: vertical;
        min-height: 72px;
      }
      .tag-edit {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      .tag-pill {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: var(--oppai-surface-2);
        color: var(--oppai-text-dim);
        border-radius: 14px;
        padding: 6px 8px 6px 12px;
        font-size: 12px;
        font-weight: 500;
      }
      .tag-pill button {
        background: none;
        border: none;
        color: var(--oppai-text-muted);
        cursor: pointer;
        display: flex;
        padding: 0;
      }
      .tag-add {
        flex: 1;
        min-width: 120px;
      }
      .edit-actions {
        display: flex;
        gap: 10px;
        margin-top: 4px;
      }
      /* Game gallery */
      .shots {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 10px;
        margin-top: 18px;
        max-width: 640px;
      }
      .shots img {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: 10px;
        background: var(--oppai-surface-2);
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.full = this.media;
    api
      .getMedia(this.media.id)
      .then((m) => (this.full = m))
      .catch(() => (this.full = this.media));
    window.addEventListener("keydown", this.onKey);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this.onKey);
    this.clearMediaSession();
  }

  // Re-fetch when the shell swaps in a different item without remounting.
  updated(changed: Map<string, unknown>) {
    if (changed.has("media")) {
      const prev = changed.get("media") as Media | undefined;
      if (prev && prev.id !== this.media.id) {
        this.editing = false;
        this.full = this.media;
        api
          .getMedia(this.media.id)
          .then((m) => (this.full = m))
          .catch(() => (this.full = this.media));
      }
    }
    // (Re)bind OS/hardware media controls to whatever video is now on stage.
    this.setupMediaSession();
  }

  private videoEl(): HTMLVideoElement | null {
    return this.renderRoot?.querySelector("video") ?? null;
  }

  // Keyboard shortcuts for the video stage. Arrow keys are intentionally left to
  // the library shell (they page between items — see library.ts); seeking here
  // uses j/l plus the on-screen scrubber, which now works thanks to server-side
  // HTTP Range support.
  private onKey = (e: KeyboardEvent) => {
    const m = this.full ?? this.media;
    if (m.kind !== "video") return;
    if (isTypingTarget(e)) return;
    const v = this.videoEl();
    if (!v) return;
    switch (e.key) {
      case " ":
      case "k":
        e.preventDefault();
        v.paused ? void v.play() : v.pause();
        break;
      case "j":
        v.currentTime = Math.max(0, v.currentTime - 10);
        break;
      case "l":
        v.currentTime = Math.min(v.duration || Infinity, v.currentTime + 10);
        break;
      case "m":
        v.muted = !v.muted;
        break;
      case "f":
        e.preventDefault();
        if (document.fullscreenElement) void document.exitFullscreen();
        else void v.requestFullscreen?.();
        break;
    }
  };

  private emitNavigate(dir: number) {
    this.dispatchEvent(
      new CustomEvent("navigate", { detail: { dir }, bubbles: true, composed: true }),
    );
  }

  // Wire the current video to the OS media-session (lock screen / hardware media
  // keys / notification transport). Prev/next-track page through the library.
  private setupMediaSession() {
    const m = this.full ?? this.media;
    if (m.kind !== "video" || !("mediaSession" in navigator)) return;
    const v = this.videoEl();
    if (!v) return;
    const ms = navigator.mediaSession;
    try {
      ms.metadata = new MediaMetadata({ title: m.title, artist: "OppaiLib" });
    } catch {
      /* MediaMetadata unavailable */
    }
    const set = (a: MediaSessionAction, h: MediaSessionActionHandler | null) => {
      try {
        ms.setActionHandler(a, h);
      } catch {
        /* unsupported action on this platform */
      }
    };
    set("play", () => void v.play());
    set("pause", () => v.pause());
    set("seekbackward", (d) => {
      v.currentTime = Math.max(0, v.currentTime - (d.seekOffset ?? 10));
    });
    set("seekforward", (d) => {
      v.currentTime = Math.min(v.duration || Infinity, v.currentTime + (d.seekOffset ?? 10));
    });
    set("seekto", (d) => {
      if (d.seekTime != null) v.currentTime = d.seekTime;
    });
    set("previoustrack", () => this.emitNavigate(-1));
    set("nexttrack", () => this.emitNavigate(1));
  }

  private clearMediaSession() {
    if (!("mediaSession" in navigator)) return;
    const ms = navigator.mediaSession;
    const actions: MediaSessionAction[] = [
      "play",
      "pause",
      "seekbackward",
      "seekforward",
      "seekto",
      "previoustrack",
      "nexttrack",
    ];
    for (const a of actions) {
      try {
        ms.setActionHandler(a, null);
      } catch {
        /* ignore */
      }
    }
    ms.metadata = null;
  }

  private toggleFav() {
    this.dispatchEvent(new CustomEvent("toggle-favorite", { bubbles: true, composed: true }));
  }

  private async retag() {
    this.tagging = true;
    try {
      const res = await api.autotag(this.media.id);
      if (this.full) this.full = { ...this.full, tags: res.tags };
      this.dispatchEvent(new CustomEvent("changed", { bubbles: true, composed: true }));
    } catch (e) {
      console.error("autotag", e);
    } finally {
      this.tagging = false;
    }
  }

  // --- Edit / delete ------------------------------------------------------
  private startEdit() {
    const m = this.full ?? this.media;
    this.editTitle = m.title;
    this.editNotes = m.notes ?? "";
    this.editKind = m.kind;
    this.editTags = (m.tags ?? []).map((t) => t.name);
    this.newTag = "";
    this.editing = true;
  }
  private cancelEdit = () => {
    this.editing = false;
  };
  private removeEditTag(name: string) {
    this.editTags = this.editTags.filter((t) => t !== name);
  }
  private commitNewTag() {
    const t = this.newTag.trim();
    if (t && !this.editTags.includes(t)) this.editTags = [...this.editTags, t];
    this.newTag = "";
  }
  private onTagKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      this.commitNewTag();
    }
  }
  private async saveEdit() {
    const m = this.full ?? this.media;
    this.commitNewTag();
    const orig = (m.tags ?? []).map((t) => t.name);
    const addTags = this.editTags.filter((t) => !orig.includes(t));
    const removeTags = orig.filter((t) => !this.editTags.includes(t));
    this.saving = true;
    try {
      const updated = await api.updateMedia(m.id, {
        title: this.editTitle,
        notes: this.editNotes,
        kind: this.editKind,
        addTags,
        removeTags,
      });
      this.full = updated;
      this.editing = false;
      this.dispatchEvent(new CustomEvent("changed", { bubbles: true, composed: true }));
    } catch (e) {
      console.error("save edit", e);
    } finally {
      this.saving = false;
    }
  }
  private async doDelete() {
    const m = this.full ?? this.media;
    if (!confirm(`Delete "${m.title}"? This cannot be undone.`)) return;
    try {
      await api.deleteMedia(m.id);
      this.dispatchEvent(new CustomEvent("deleted", { detail: { id: m.id }, bubbles: true, composed: true }));
    } catch (e) {
      console.error("delete", e);
    }
  }

  private renderEdit() {
    return html`
      <div class="edit">
        <div>
          <label>Title</label>
          <input
            .value=${this.editTitle}
            @input=${(e: Event) => (this.editTitle = (e.target as HTMLInputElement).value)}
          />
        </div>
        <div>
          <label>Type</label>
          <select
            .value=${this.editKind}
            @change=${(e: Event) => (this.editKind = (e.target as HTMLSelectElement).value as Media["kind"])}
          >
            ${KIND_ORDER.map(
              (k) => html`<option value=${k} ?selected=${k === this.editKind}>${KIND_META[k].label}</option>`,
            )}
          </select>
        </div>
        <div>
          <label>Notes</label>
          <textarea
            .value=${this.editNotes}
            @input=${(e: Event) => (this.editNotes = (e.target as HTMLTextAreaElement).value)}
          ></textarea>
        </div>
        <div>
          <label>Tags</label>
          <div class="tag-edit">
            ${this.editTags.map(
              (t) => html`<span class="tag-pill"
                >${t}
                <button title="Remove" @click=${() => this.removeEditTag(t)}>
                  <span class="material-symbols-rounded" style="font-size:16px;">close</span>
                </button></span
              >`,
            )}
            <input
              class="tag-add"
              placeholder="Add tag…"
              .value=${this.newTag}
              @input=${(e: Event) => (this.newTag = (e.target as HTMLInputElement).value)}
              @keydown=${this.onTagKeydown}
              @blur=${() => this.commitNewTag()}
            />
          </div>
        </div>
        <div class="edit-actions">
          <button class="btn-primary" @click=${this.saveEdit} ?disabled=${this.saving}>
            <span class="material-symbols-rounded" style="font-size:20px;">save</span>
            ${this.saving ? "Saving…" : "Save"}
          </button>
          <button class="btn-outline" @click=${this.cancelEdit} ?disabled=${this.saving}>Cancel</button>
        </div>
      </div>
    `;
  }

  private favIcon() {
    return html`<span
      class="material-symbols-rounded fill-icon"
      style="font-size:22px; color:${this.favorite ? "var(--oppai-fav)" : "var(--oppai-text)"};"
      >${this.favorite ? "favorite" : "favorite_border"}</span
    >`;
  }

  render() {
    const m = this.full ?? this.media;
    const url = api.streamURL(m.id);
    return html`
      <div class="wrap">
        ${this.renderStage(m, url)}
        ${m.kind === "game" ? nothing : this.renderMeta(m)}
      </div>
    `;
  }

  private renderStage(m: Media, url: string) {
    switch (m.kind) {
      case "video":
        return html`<div class="stage" style="aspect-ratio:16/9; background:${swatchFor(m)};">
          <video
            src=${url}
            poster=${m.hasThumb ? api.thumbURL(m.id) : nothing}
            controls
            autoplay
            playsinline
            preload="metadata"
          ></video>
        </div>`;
      case "gif":
        return html`<div class="stage" style="aspect-ratio:16/9; background:${swatchFor(m)};">
          <img src=${url} alt=${m.title} />
        </div>`;
      case "image":
        return html`<div
          class="stage"
          style="max-height:64vh; background:${swatchFor(m)}; display:flex; align-items:center; justify-content:center;"
        >
          <img src=${url} alt=${m.title} style="max-height:64vh;" />
        </div>`;
      case "comic":
        return this.renderComic(m);
      case "game":
        return this.renderGame(m, url);
      default:
        return nothing;
    }
  }

  private renderComic(m: Media) {
    const pages = m.pageCount ?? "?";
    return html`
      <div class="reader">
        <button class="round-btn" disabled title="Previous page">
          <span class="material-symbols-rounded" style="font-size:22px;">chevron_left</span>
        </button>
        <div class="reader-page" style="background:${swatchFor(m)};">
          <span class="material-symbols-rounded" style="font-size:40px; color:#fff;">auto_stories</span>
          <span class="mono">PAGE 1 OF ${pages}</span>
          <a href=${api.streamURL(m.id)} download style="color:var(--oppai-primary-bright); font-size:12px; margin-top:6px;"
            >Download to read</a
          >
        </div>
        <button class="round-btn" disabled title="Next page">
          <span class="material-symbols-rounded" style="font-size:22px;">chevron_right</span>
        </button>
      </div>
      ${this.renderMeta(m)}
    `;
  }

  private renderGame(m: Media, url: string) {
    const host = m.download ? this.hostOf(m.download) : "";
    return html`
      <div class="game">
        <div class="game-cover" style="background:${swatchFor(m)};">
          ${m.hasThumb
            ? html`<img
                src=${api.thumbURL(m.id)}
                alt=${m.title}
                style="width:100%; height:100%; object-fit:cover;"
              />`
            : html`<span class="material-symbols-rounded" style="font-size:48px; color:#fff;">sports_esports</span>`}
        </div>
        <div style="flex:1; min-width:260px; padding-top:8px;">
          <div class="meta-head">
            <h2 class="meta-title">${m.title}</h2>
            ${this.renderActions(false)}
          </div>
          ${this.editing
            ? this.renderEdit()
            : html`
                <div class="sub">${KIND_META.game.label.replace(/s$/, "")}</div>
                <div class="actions">
                  ${m.download
                    ? html`<a class="btn-primary" href=${m.download} target="_blank" rel="noreferrer">
                        <span class="material-symbols-rounded fill-icon" style="font-size:20px;">open_in_new</span>
                        ${host ? `Get it on ${host}` : "Get it"}
                      </a>`
                    : html`<a class="btn-primary" href=${url} download>
                        <span class="material-symbols-rounded fill-icon" style="font-size:20px;">download</span>
                        Download
                      </a>`}
                  <button class="btn-outline" @click=${this.toggleFav}>
                    <span
                      class="material-symbols-rounded"
                      style="font-size:20px; color:${this.favorite ? "var(--oppai-fav)" : "var(--oppai-text)"};"
                      >${this.favorite ? "favorite" : "favorite_border"}</span
                    >
                    Favorite
                  </button>
                </div>
                ${m.notes
                  ? html`<p class="desc">${m.notes}</p>`
                  : html`<p class="desc">A title from your library.</p>`}
                ${this.renderTags(m)}
                ${m.gallery && m.gallery.length
                  ? html`<div class="shots">
                      ${m.gallery.map((u) => html`<img loading="lazy" src=${api.proxyURL(u)} alt="screenshot" />`)}
                    </div>`
                  : nothing}
                ${m.source
                  ? html`<div class="meta-note">
                      Source:
                      <a href=${m.source} target="_blank" rel="noreferrer" style="color:var(--oppai-primary-bright);">link</a>
                    </div>`
                  : nothing}
              `}
        </div>
      </div>
    `;
  }

  private hostOf(u: string): string {
    try {
      return new URL(u).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  }

  // Shared icon-button cluster (auto-tag, edit, delete, favorite) used by the
  // generic meta panel and the game detail view.
  private renderActions(showAutotag = true) {
    return html`
      ${showAutotag
        ? html`<button class="icon-round" title="Auto-tag" @click=${this.retag} ?disabled=${this.tagging}>
            <span class="material-symbols-rounded" style="font-size:22px; color:var(--oppai-text-dim);"
              >${this.tagging ? "hourglass_empty" : "auto_awesome"}</span
            >
          </button>`
        : nothing}
      <button class="icon-round" title="Edit" @click=${() => this.startEdit()}>
        <span class="material-symbols-rounded" style="font-size:22px; color:var(--oppai-text-dim);">edit</span>
      </button>
      <button class="icon-round" title="Delete" @click=${this.doDelete}>
        <span class="material-symbols-rounded" style="font-size:22px; color:var(--oppai-error, #f2b8b5);">delete</span>
      </button>
      <button class="icon-round" title="Favorite" @click=${this.toggleFav}>${this.favIcon()}</button>
    `;
  }

  private renderMeta(m: Media) {
    const meta = KIND_META[m.kind];
    return html`
      <div class="meta">
        <div class="meta-head">
          <h2 class="meta-title">${m.title}</h2>
          ${this.renderActions()}
        </div>
        ${this.editing
          ? this.renderEdit()
          : html`
              <div class="chips">
                <span class="chip chip-accent">${statFor(m) || meta.label}</span>
                <span class="chip chip-muted">${meta.typeLabel}</span>
              </div>
              ${this.renderTags(m)}
              ${m.notes
                ? html`<p class="desc" style="margin-top:16px;">${m.notes}</p>`
                : nothing}
              ${m.source
                ? html`<div class="meta-note">
                    Source:
                    <a href=${m.source} target="_blank" rel="noreferrer" style="color:var(--oppai-primary-bright);">link</a>
                  </div>`
                : nothing}
            `}
      </div>
    `;
  }

  private renderTags(m: Media) {
    const tags = m.tags ?? [];
    if (tags.length === 0) {
      return html`<div class="meta-note" style="margin-top:14px;">
        No tags yet — use the ✨ auto-tag button.
      </div>`;
    }
    return html`<div class="chips">
      ${tags.map(
        (t) => html`<span
          class="chip chip-muted"
          title="${t.category}${t.source ? " · " + t.source : ""}"
          >${t.name}</span
        >`,
      )}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "oppai-viewer": OppaiViewer;
  }
}
