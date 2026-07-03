import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { api, type Media } from "../api.js";

// Full-screen media viewer with tag list + AI re-tag action.
@customElement("oppai-viewer")
export class OppaiViewer extends LitElement {
  @property({ attribute: false }) media!: Media;
  @state() private full: Media | null = null;
  @state() private tagging = false;

  static styles = css`
    :host {
      position: fixed; inset: 0; z-index: 20;
      background: rgba(0,0,0,.85);
      display: grid; grid-template-rows: auto 1fr auto;
    }
    .bar { display: flex; align-items: center; gap: .5rem; padding: .5rem 1rem; color: #fff; }
    .bar .title { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .stage { display: grid; place-items: center; overflow: auto; padding: 1rem; }
    .stage img, .stage video { max-width: 100%; max-height: 78vh; border-radius: 8px; }
    .panel {
      background: var(--md-sys-color-surface-container);
      padding: 1rem; display: flex; flex-direction: column; gap: .75rem;
      max-height: 40vh; overflow: auto;
    }
    .meta { font-size: .8rem; opacity: .7; }
    md-chip-set { flex-wrap: wrap; }
  `;

  connectedCallback() {
    super.connectedCallback();
    api.getMedia(this.media.id).then((m) => (this.full = m)).catch(() => (this.full = this.media));
  }

  private close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
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

  private stage() {
    const url = api.streamURL(this.media.id);
    switch (this.media.kind) {
      case "video":
        return html`<video src=${url} controls autoplay></video>`;
      case "gif":
      case "image":
        return html`<img src=${url} alt=${this.media.title} />`;
      default:
        return html`<a href=${url} download style="color:#fff">Download ${this.media.title}</a>`;
    }
  }

  render() {
    const m = this.full ?? this.media;
    return html`
      <div class="bar">
        <span class="title">${m.title}</span>
        <md-icon-button @click=${this.retag} ?disabled=${this.tagging} title="Auto-tag">
          <md-icon>${this.tagging ? "hourglass_empty" : "auto_awesome"}</md-icon>
        </md-icon-button>
        <md-icon-button @click=${this.close} title="Close">
          <md-icon>close</md-icon>
        </md-icon-button>
      </div>
      <div class="stage">${this.stage()}</div>
      <div class="panel">
        <div class="meta">
          ${m.kind} · ${(m.size / 1_000_000).toFixed(1)} MB
          ${m.width ? html`· ${m.width}×${m.height}` : ""}
          ${m.source ? html`· <a href=${m.source} target="_blank" style="color:var(--md-sys-color-primary)">source</a>` : ""}
        </div>
        <md-chip-set>
          ${(m.tags ?? []).map(
            (t) => html`<md-assist-chip label=${t.name} title=${`${t.category}${t.source ? " · " + t.source : ""}`}></md-assist-chip>`,
          )}
          ${(m.tags ?? []).length === 0 ? html`<span class="meta">No tags yet</span>` : ""}
        </md-chip-set>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { "oppai-viewer": OppaiViewer; }
}
