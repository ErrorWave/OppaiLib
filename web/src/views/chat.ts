import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { api, type ChatMessage, type ChatStatus } from "../api.js";
import { iconStyles, motionStyles } from "../theme.js";
import { loadHideLibby } from "../libby.js";
import { getMeter, setMeter, bumpMeter } from "../libby-meter.js";
import "./libby-portrait.js";

// Each chat mode maps to one of Libby's emotions; the artwork for an emotion
// comes from the worn outfit when one is selected (see libby.ts). Bolder modes
// push the horniness meter harder per message (`heat`).
const MODES = [
  { id: "sweet", label: "Sweet", emotion: "happy", heat: 3 },
  { id: "playful", label: "Playful", emotion: "mischievous", heat: 7 },
  { id: "bold", label: "Bold", emotion: "surprised", heat: 10 },
  { id: "roleplay", label: "Roleplay", emotion: "thinking", heat: 6 },
] as const;

@customElement("oppai-chat")
export class OppaiChat extends LitElement {
  @state() private status: ChatStatus | null = null;
  @state() private mode = "sweet";
  @state() private messages: ChatMessage[] = [];
  @state() private draft = "";
  @state() private busy = false;
  @state() private error = "";
  @state() private meter = getMeter();

  private onMeter = () => (this.meter = getMeter());

  static styles = [iconStyles, motionStyles, css`
    :host { display:block; height:100%; }
    .layout { max-width:920px; height:calc(100vh - 120px); margin:auto; display:grid;
      grid-template-columns:230px 1fr; gap:18px; }
    .libby, .chat { background:var(--oppai-surface); border:1px solid var(--oppai-border);
      border-radius:20px; overflow:hidden; }
    .libby { display:flex; flex-direction:column; padding:18px; }
    .libby .portrait { width:100%; min-height:0; flex:1; }
    .name { font-size:20px; font-weight:650; }
    .meter { margin-top:14px; }
    .meter-head { display:flex; justify-content:space-between; font-size:12px; color:var(--oppai-text-dim); margin-bottom:4px; }
    .meter-val { font-weight:650; color:var(--oppai-primary-bright); }
    .meter-range { width:100%; accent-color:var(--oppai-primary); }
    .meter-btns { display:flex; gap:6px; margin-top:6px; }
    .meter-btn { flex:1; border:1px solid var(--oppai-border-strong); border-radius:8px; background:transparent;
      color:var(--oppai-text-dim); font:inherit; font-size:15px; line-height:1; padding:5px; cursor:pointer; }
    .meter-btn:hover { color:var(--oppai-primary-bright); border-color:var(--oppai-primary); }
    .model { font-size:12px; color:var(--oppai-text-muted); margin-top:3px; overflow:hidden; text-overflow:ellipsis; }
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
      .libby { min-height:190px; flex-direction:row; gap:12px; } .libby .portrait { width:130px; order:-1; }
      .chat { min-height:55vh; } }
  `];

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("oppai-libby-meter", this.onMeter);
    void this.load();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("oppai-libby-meter", this.onMeter);
  }
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
    // Talking to Libby warms her up — bolder modes push harder (see MODES.heat).
    bumpMeter(MODES.find((m) => m.id === this.mode)?.heat ?? 4);
    try {
      const result = await api.chat(this.mode, next);
      this.messages = [...next, { role: "assistant", content: result.message }];
      await this.updateComplete;
      this.renderRoot.querySelector(".messages")?.scrollTo({ top: 1e9, behavior: "smooth" });
    } catch (e) { this.error = (e as Error).message; }
    finally { this.busy = false; }
  }
  private renderMeter() {
    // Libby's horniness for this session: rises as you chat and as you add to the
    // library, and you can set it by hand here. It picks which outfit tier she wears.
    return html`<div class="meter">
      <div class="meter-head"><span>Horniness</span><span class="meter-val">${this.meter}</span></div>
      <input class="meter-range" type="range" min="0" max="100" step="1" .value=${String(this.meter)}
        @input=${(e: Event) => setMeter(Number((e.target as HTMLInputElement).value))} />
      <div class="meter-btns">
        <button class="meter-btn" title="Cool down" @click=${() => bumpMeter(-10)}>−</button>
        <button class="meter-btn" title="Warm up" @click=${() => bumpMeter(10)}>+</button>
      </div>
    </div>`;
  }
  render() {
    const emotion = MODES.find((m) => m.id === this.mode)?.emotion ?? "neutral";
    // Hiding Libby drops her portrait; the mode picker stays, since modes change how
    // the assistant answers, not how it looks.
    const hideLibby = loadHideLibby();
    return html`<div class="layout">
      <aside class="libby"><div><div class="name">Libby</div>
        <div class="model">${this.status?.enabled ? this.status.model : "Local LLM not configured"}</div>
        <div class="modes">${MODES.map((m) => html`<button class="mode ${m.id === this.mode ? "on" : ""}"
          @click=${() => this.setMode(m.id)}>${m.label}</button>`)}</div>
        ${this.renderMeter()}</div>
        ${hideLibby ? nothing : html`<libby-portrait class="portrait" .emotion=${emotion}
          ?talking=${this.busy}></libby-portrait>`}
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
