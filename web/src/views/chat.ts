import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { api, type ChatMessage, type ChatStatus } from "../api.js";
import { iconStyles, motionStyles } from "../theme.js";
import { LIBBY_EMOTIONS, applyImageFallback, libbyAssetCandidates,
  normalizeEmotion, normalizeIntensity, type LibbyEmotion } from "../libby.js";

const MODES = [
  { id: "sweet", label: "Sweet", reaction: "/mascot-happy.png" },
  { id: "playful", label: "Playful", reaction: "/mascot-mischievous.png" },
  { id: "bold", label: "Bold", reaction: "/mascot-surprised.png" },
  { id: "roleplay", label: "Roleplay", reaction: "/mascot-thinking.png" },
] as const;

@customElement("oppai-chat")
export class OppaiChat extends LitElement {
  @state() private status: ChatStatus | null = null;
  @state() private mode = "sweet";
  @state() private emotion: LibbyEmotion = "happy";
  @state() private intensity = 1;
  @state() private outfit = "default";
  @state() private messages: ChatMessage[] = [];
  @state() private draft = "";
  @state() private busy = false;
  @state() private error = "";

  static styles = [iconStyles, motionStyles, css`
    :host { display:block; height:100%; }
    .layout { max-width:920px; height:calc(100vh - 120px); margin:auto; display:grid;
      grid-template-columns:230px 1fr; gap:18px; }
    .libby, .chat { background:var(--oppai-surface); border:1px solid var(--oppai-border);
      border-radius:20px; overflow:hidden; }
    .libby { display:flex; flex-direction:column; padding:18px; }
    .libby img { width:100%; min-height:0; flex:1; object-fit:contain; object-position:bottom; }
    .name { font-size:20px; font-weight:650; }
    .model { font-size:12px; color:var(--oppai-text-muted); margin-top:3px; overflow:hidden; text-overflow:ellipsis; }
    .emotion-row { display:grid; gap:5px; margin-top:12px; }
    select, input[type="range"] { width:100%; box-sizing:border-box; accent-color:var(--oppai-primary); }
    .modes { display:grid; grid-template-columns:1fr 1fr; gap:7px; margin-top:14px; }
    button { font:inherit; cursor:pointer; }
    .mode { border:1px solid var(--oppai-border-strong); border-radius:999px; padding:7px;
      background:transparent; color:var(--oppai-text-dim); }
    .mode.on { color:var(--oppai-primary-bright); background:var(--oppai-primary-container); border-color:var(--oppai-primary); }
    .chat { display:flex; flex-direction:column; }
    .messages { flex:1; overflow:auto; padding:20px; display:flex; flex-direction:column; gap:12px; }
    .bubble { max-width:78%; padding:11px 14px; border-radius:16px; white-space:pre-wrap; line-height:1.45; }
    .assistant { align-self:flex-start; background:var(--oppai-surface-2); border-bottom-left-radius:4px; }
    .user { align-self:flex-end; background:var(--oppai-primary-container); color:var(--oppai-primary-bright); border-bottom-right-radius:4px; }
    .empty { margin:auto; text-align:center; color:var(--oppai-text-muted); max-width:360px; }
    form { display:flex; gap:10px; padding:14px; border-top:1px solid var(--oppai-border); }
    textarea { flex:1; resize:none; min-height:44px; max-height:130px; box-sizing:border-box;
      border:1px solid var(--oppai-border-strong); border-radius:14px; padding:11px 13px;
      background:var(--oppai-surface-2); color:var(--oppai-text); font:inherit; outline:none; }
    textarea:focus { border-color:var(--oppai-primary); }
    .send { width:46px; border:0; border-radius:14px; background:var(--oppai-primary); color:var(--oppai-on-primary); }
    .send:disabled { opacity:.5; cursor:default; }
    .error { color:var(--md-sys-color-error); font-size:13px; padding:0 16px 10px; }
    @media(max-width:700px) { .layout { grid-template-columns:1fr; height:auto; }
      .libby { min-height:190px; flex-direction:row; gap:12px; } .libby img { width:130px; order:-1; }
      .chat { min-height:55vh; } }
  `];

  connectedCallback() { super.connectedCallback(); void this.load(); }
  private async load() {
    try { this.status = await api.chatStatus(); }
    catch (e) { this.error = (e as Error).message; }
  }
  private setMode(mode: string) { this.mode = mode; }
  private onKey(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void this.send(); }
  }
  private async send() {
    const content = this.draft.trim();
    if (!content || this.busy || !this.status?.enabled) return;
    const next: ChatMessage[] = [...this.messages, { role: "user", content }];
    this.messages = next; this.draft = ""; this.busy = true; this.error = "";
    try {
      const result = await api.chat(this.mode, next, this.emotion, this.intensity);
      this.emotion = normalizeEmotion(result.emotion ?? this.emotion);
      this.intensity = normalizeIntensity(result.intensity ?? this.intensity);
      this.messages = [...next, { role: "assistant", content: result.message }];
      await this.updateComplete;
      this.renderRoot.querySelector(".messages")?.scrollTo({ top: 1e9, behavior: "smooth" });
    } catch (e) { this.error = (e as Error).message; }
    finally { this.busy = false; }
  }
  render() {
    const assets = libbyAssetCandidates(this.emotion, this.intensity, this.outfit);
    return html`<div class="layout">
      <aside class="libby"><div><div class="name">Libby</div>
        <div class="model">${this.status?.enabled ? this.status.model : "Local LLM not configured"}</div>
        <div class="modes">${MODES.map((m) => html`<button class="mode ${m.id === this.mode ? "on" : ""}"
          @click=${() => this.setMode(m.id)}>${m.label}</button>`)}</div></div>
        <div class="emotion-row">
          <label>Emotion</label>
          <select .value=${this.emotion} @change=${(e: Event) => (this.emotion = normalizeEmotion((e.target as HTMLSelectElement).value))}>
            ${LIBBY_EMOTIONS.map((m) => html`<option value=${m}>${m === "horniness" ? "Horniness" : m[0].toUpperCase() + m.slice(1)}</option>`)}
          </select>
          <label>Intensity ${this.intensity}/5</label>
          <input type="range" min="1" max="5" .value=${String(this.intensity)}
            @input=${(e: Event) => (this.intensity = normalizeIntensity(Number((e.target as HTMLInputElement).value)))} />
          <label>Outfit</label>
          <select .value=${this.outfit} @change=${(e: Event) => (this.outfit = (e.target as HTMLSelectElement).value)}>
            ${["default", "casual", "sleepwear", "beach"].map((name) => html`<option value=${name}>${name[0].toUpperCase() + name.slice(1)}</option>`)}
          </select>
        </div>
        <img src=${assets[0]} data-fallback-index="0" alt=${`Libby feeling ${this.emotion}`}
          @error=${(e: Event) => applyImageFallback(e.target as HTMLImageElement, assets)} />
      </aside>
      <section class="chat"><div class="messages">
        ${!this.status?.enabled ? html`<div class="empty">Configure a local OpenAI-compatible URL and model in Settings to chat with Libby.</div>` : nothing}
        ${this.status?.enabled && !this.messages.length ? html`<div class="empty">Libby is ready. Pick a mode and say what’s on your mind.</div>` : nothing}
        ${this.messages.map((m) => html`<div class="bubble ${m.role}">${m.content}</div>`)}
        ${this.busy ? html`<div class="bubble assistant">Libby is thinking…</div>` : nothing}
      </div>${this.error ? html`<div class="error">${this.error}</div>` : nothing}
      <form @submit=${(e: Event) => { e.preventDefault(); void this.send(); }}>
        <textarea placeholder="Message Libby…" .value=${this.draft} ?disabled=${!this.status?.enabled || this.busy}
          @input=${(e: Event) => (this.draft = (e.target as HTMLTextAreaElement).value)} @keydown=${this.onKey}></textarea>
        <button class="send" title="Send" ?disabled=${!this.draft.trim() || this.busy || !this.status?.enabled}>
          <span class="material-symbols-rounded">send</span></button>
      </form></section>
    </div>`;
  }
}

declare global { interface HTMLElementTagNameMap { "oppai-chat": OppaiChat; } }
