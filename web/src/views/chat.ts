import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { api, type ChatMessage, type ChatStatus, type User } from "../api.js";
import { iconStyles, motionStyles } from "../theme.js";
import { LIBBY_EMOTIONS, applyImageFallback, libbyAssetCandidates, loadHideLibby,
  loadLibbyOutfit, normalizeEmotion, normalizeIntensity, type LibbyEmotion } from "../libby.js";
import { getIntensity, setIntensity } from "../libby-meter.js";
import { libbyOpener, libbyReact, libbyReply } from "../libby-voice.js";

// Each mode is a channel in Libby's "server", and maps to one of her emotions; the
// artwork for an emotion comes from the worn outfit when one is selected (see
// libby.ts), falling back to the bundled art via the image's error handler.
const MODES = [
  { id: "sweet", label: "sweet", emotion: "happy", topic: "Soft, warm, and unhurried." },
  { id: "playful", label: "playful", emotion: "mischievous", topic: "Teasing and quick on her feet." },
  { id: "bold", label: "bold", emotion: "surprised", topic: "Blunt, uninhibited, no coyness." },
  { id: "roleplay", label: "roleplay", emotion: "thinking", topic: "In character, in scene, in detail." },
] as const;

/** A message plus who said it and when — the chat log renders Discord-style rows. */
interface Entry extends ChatMessage {
  at: number;
  /** Assistant lines she wrote herself, with no model behind her. */
  local?: boolean;
}

const timeOf = (ms: number) =>
  new Date(ms).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

@customElement("oppai-chat")
export class OppaiChat extends LitElement {
  /** The signed-in user, for the message author line. */
  @property({ attribute: false }) user?: User;

  @state() private status: ChatStatus | null = null;
  @state() private mode = "sweet";
  @state() private emotion: LibbyEmotion = "happy";
  // Intensity is Libby's session horniness meter (see libby-meter.ts): persistent
  // across the app, nudged by library adds, and set by hand in the settings panel.
  @state() private intensity = getIntensity();
  /** The settings panel is folded away until asked for — the chat is the point. */
  @state() private settingsOpen = false;
  @state() private advancedOptions = "{}";

  private onMeter = (e: Event) =>
    (this.intensity = (e as CustomEvent<{ intensity: number }>).detail.intensity);
  @state() private entries: Entry[] = [];
  @state() private draft = "";
  @state() private busy = false;
  @state() private error = "";
  private idleTimer = 0;

  private armIdle = () => {
    window.clearTimeout(this.idleTimer);
    this.idleTimer = window.setTimeout(() => {
      if (this.busy || document.visibilityState !== "visible") { this.armIdle(); return; }
      const line = libbyReact("idle", { intensity: this.intensity });
      this.emotion = line.emotion;
      this.entries = [...this.entries, { role: "assistant", content: line.message, at: Date.now(), local: true }];
      void this.scrollToEnd();
      this.armIdle();
    }, 60_000);
  };

  static styles = [iconStyles, motionStyles, css`
    /* Discord's information architecture, expressed with OppaiLib's live theme. */
    :host {
      display: block;
      height: 100%;
      --dc-rail: var(--md-sys-color-surface-container-lowest);
      --dc-side: var(--md-sys-color-surface-container-low);
      --dc-main: var(--md-sys-color-surface);
      --dc-hover: var(--md-sys-color-surface-container-high);
      --dc-input: var(--md-sys-color-surface-container-highest);
      --dc-text: var(--md-sys-color-on-surface);
      --dc-bright: var(--md-sys-color-on-surface);
      --dc-muted: var(--md-sys-color-on-surface-variant);
      --dc-accent: var(--md-sys-color-primary);
      --dc-on-accent: var(--md-sys-color-on-primary);
      --dc-line: var(--md-sys-color-outline-variant);
      --dc-online: var(--md-sys-color-tertiary);
      color: var(--dc-text);
      font: 400 15px/1.375 "gg sans", "Noto Sans", Roboto, system-ui, sans-serif;
    }
    .client {
      display: grid;
      grid-template-columns: 72px 240px 1fr 232px;
      height: calc(100vh - 120px);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--dc-line);
      background: var(--dc-main);
    }

    /* ── server rail ─────────────────────────────────────────────────────── */
    .rail { background: var(--dc-rail); display: flex; flex-direction: column;
      align-items: center; gap: 8px; padding: 12px 0; }
    .guild { width: 48px; height: 48px; border-radius: 16px; background: var(--dc-side);
      display: grid; place-items: center; overflow: hidden; cursor: pointer;
      transition: border-radius .15s, background .15s; }
    .guild.on { border-radius: 14px; background: var(--dc-accent); }
    .guild img { width: 100%; height: 100%; object-fit: cover; }
    .guild .material-symbols-rounded { color: var(--dc-bright); font-size: 22px; }
    .rail-sep { width: 32px; height: 2px; background: var(--dc-line); border-radius: 1px; }

    /* ── channel sidebar ─────────────────────────────────────────────────── */
    .side { background: var(--dc-side); display: flex; flex-direction: column; min-width: 0; }
    .guild-head { height: 48px; padding: 0 16px; display: flex; align-items: center;
      font-weight: 600; color: var(--dc-bright); border-bottom: 1px solid var(--dc-line);
      box-shadow: 0 1px 0 rgba(0,0,0,.2); font-size: 15px; }
    .cat { padding: 16px 8px 4px 16px; font-size: 12px; font-weight: 600;
      letter-spacing: .02em; text-transform: uppercase; color: var(--dc-muted); }
    .chan { display: flex; align-items: center; gap: 6px; margin: 1px 8px; padding: 6px 8px;
      border: 0; border-radius: 4px; background: transparent; color: var(--dc-muted);
      font: inherit; font-size: 15px; font-weight: 500; width: calc(100% - 16px);
      text-align: left; cursor: pointer; }
    .chan:hover { background: var(--dc-hover); color: var(--dc-text); }
    .chan.on { background: var(--dc-hover); color: var(--dc-bright); }
    .chan .hash { font-size: 19px; color: var(--dc-muted); font-weight: 400; }
    .side-foot { margin-top: auto; background: var(--dc-rail); padding: 8px; display: flex;
      align-items: center; gap: 8px; }
    .me-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--dc-accent);
      color: var(--dc-on-accent); display: grid; place-items: center; font-size: 12px; font-weight: 700; }
    .me-name { font-size: 14px; font-weight: 600; color: var(--dc-bright);
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .me-sub { font-size: 12px; color: var(--dc-muted); }

    /* ── main column ─────────────────────────────────────────────────────── */
    .main { display: flex; flex-direction: column; min-width: 0; background: var(--dc-main); }
    .top { height: 48px; display: flex; align-items: center; gap: 8px; padding: 0 16px;
      border-bottom: 1px solid var(--dc-line); box-shadow: 0 1px 0 rgba(0,0,0,.2); }
    .top .hash { font-size: 22px; color: var(--dc-muted); }
    .top .name { font-weight: 600; color: var(--dc-bright); }
    .top .topic { font-size: 13px; color: var(--dc-muted); border-left: 1px solid var(--dc-line);
      margin-left: 8px; padding-left: 12px; overflow: hidden; text-overflow: ellipsis;
      white-space: nowrap; }
    .top .gear { margin-left: auto; border: 0; background: transparent; color: var(--dc-muted);
      cursor: pointer; border-radius: 4px; padding: 4px; display: grid; place-items: center; }
    .top .gear:hover, .top .gear.on { color: var(--dc-bright); background: var(--dc-hover); }

    .log { flex: 1; overflow-y: auto; padding: 16px 0 24px; display: flex;
      flex-direction: column; }
    .row { display: grid; grid-template-columns: 56px 1fr; padding: 2px 16px 2px 0;
      align-items: start; }
    .row:hover { background: rgba(2,2,2,.06); }
    .row.grouped { margin-top: 0; }
    .row.first { margin-top: 17px; }
    .avatar { grid-column: 1; justify-self: center; width: 40px; height: 40px;
      border-radius: 50%; overflow: hidden; background: var(--dc-input); margin-top: 2px; }
    .avatar img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
    .avatar.initials { display: grid; place-items: center; background: var(--dc-accent);
      color: var(--dc-on-accent); font-size: 15px; font-weight: 700; }
    .stamp { grid-column: 1; justify-self: end; padding-right: 4px; font-size: 11px;
      color: var(--dc-muted); opacity: 0; line-height: 22px; }
    .row:hover .stamp { opacity: 1; }
    .body { grid-column: 2; min-width: 0; }
    .who { display: flex; align-items: baseline; gap: 8px; }
    .who .author { font-size: 15px; font-weight: 500; color: var(--dc-bright); }
    .who .author.libby { color: var(--dc-accent); }
    .tag { background: var(--dc-accent); color: var(--dc-on-accent); font-size: 10px; font-weight: 600;
      border-radius: 3px; padding: 1px 4px; text-transform: uppercase; letter-spacing: .02em; }
    .tag.offline { background: var(--dc-line); color: var(--dc-bright); }
    .when { font-size: 12px; color: var(--dc-muted); }
    .text { white-space: pre-wrap; overflow-wrap: anywhere; color: var(--dc-text); }
    .typing { display: flex; align-items: center; gap: 6px; padding: 4px 16px 0 56px;
      font-size: 13px; color: var(--dc-muted); }
    .dot { width: 5px; height: 5px; border-radius: 50%; background: var(--dc-muted);
      animation: blink 1.2s infinite; }
    .dot:nth-child(2) { animation-delay: .2s; }
    .dot:nth-child(3) { animation-delay: .4s; }
    @keyframes blink { 0%, 60%, 100% { opacity: .3; } 30% { opacity: 1; } }

    /* Channel intro, Discord's "Welcome to #channel" block. */
    .intro { padding: 16px 16px 8px; }
    .intro .badge { width: 68px; height: 68px; border-radius: 50%; background: var(--dc-input);
      display: grid; place-items: center; margin-bottom: 8px; }
    .intro .badge .material-symbols-rounded { font-size: 40px; color: var(--dc-bright); }
    .intro h2 { margin: 0 0 4px; font-size: 28px; font-weight: 700; color: var(--dc-bright); }
    .intro p { margin: 0; color: var(--dc-muted); font-size: 15px; }

    /* ── composer ────────────────────────────────────────────────────────── */
    form { padding: 0 16px 22px; }
    .composer { display: flex; align-items: flex-end; gap: 10px; background: var(--dc-input);
      border-radius: 8px; padding: 10px 14px; }
    textarea { flex: 1; resize: none; border: 0; outline: 0; background: transparent;
      color: var(--dc-text); font: inherit; max-height: 140px; min-height: 22px;
      line-height: 22px; padding: 0; }
    textarea::placeholder { color: var(--dc-muted); }
    .send { border: 0; background: transparent; color: var(--dc-muted); cursor: pointer;
      display: grid; place-items: center; padding: 0; }
    .send:hover:not(:disabled) { color: var(--dc-bright); }
    .send:disabled { opacity: .4; cursor: default; }
    .error { color: var(--md-sys-color-error); font-size: 13px; padding: 0 16px 8px; }

    /* ── members sidebar (Libby) ─────────────────────────────────────────── */
    .members { background: var(--dc-side); display: flex; flex-direction: column;
      padding: 12px 8px; gap: 8px; overflow: hidden; }
    .members .cat { padding: 4px 8px; }
    .member { display: flex; align-items: center; gap: 10px; padding: 4px 8px;
      border-radius: 4px; }
    .member .pip { width: 32px; height: 32px; border-radius: 50%; overflow: hidden;
      background: var(--dc-input); position: relative; }
    .member .pip img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
    .member .who2 { min-width: 0; }
    .member .n { font-size: 14px; font-weight: 600; color: var(--dc-accent); }
    .member .s { font-size: 12px; color: var(--dc-muted); overflow: hidden;
      text-overflow: ellipsis; white-space: nowrap; }
    .portrait { flex: 1; min-height: 0; display: grid; place-items: end center; }
    .portrait img { max-width: 100%; max-height: 100%; object-fit: contain;
      object-position: bottom; }

    /* ── settings panel (folded away by default) ─────────────────────────── */
    .settings { background: var(--dc-side); border-bottom: 1px solid var(--dc-line); padding: 14px 16px;
      display: grid; gap: 12px; }
    .settings h3 { margin: 0; font-size: 12px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .02em; color: var(--dc-muted); }
    .chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .chip { border: 1px solid var(--dc-line); background: transparent; color: var(--dc-text);
      border-radius: 4px; font: inherit; font-size: 13px; padding: 4px 10px; cursor: pointer; }
    .chip:hover { background: var(--dc-hover); }
    .chip.on { background: var(--dc-accent); border-color: var(--dc-accent); color: var(--dc-on-accent); }
    .heat { display: flex; align-items: center; gap: 8px; }
    .heat input { flex: 1; accent-color: var(--dc-accent); }
    .heat .val { font-size: 13px; color: var(--dc-muted); min-width: 78px; }
    textarea.advanced { width: 100%; min-height: 92px; max-height: 220px; box-sizing: border-box;
      border: 1px solid var(--dc-line); border-radius: 6px; padding: 8px; margin-top: 6px;
      background: var(--dc-input); color: var(--dc-text); font: 12px/1.45 ui-monospace, monospace; }
    .advanced-help { margin-top: 5px; color: var(--dc-muted); font-size: 12px; }

    @media (max-width: 1100px) { .client { grid-template-columns: 72px 220px 1fr; }
      .members { display: none; } }
    @media (max-width: 780px) { .client { grid-template-columns: 1fr; height: auto; }
      .rail, .side { display: none; }
      .main { min-height: 70vh; } }
  `];

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("oppai-libby-meter", this.onMeter);
    void this.load();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("oppai-libby-meter", this.onMeter);
    window.clearTimeout(this.idleTimer);
  }

  private async load() {
    try { this.status = await api.chatStatus(); }
    catch (e) { this.error = (e as Error).message; }
  }

  private setMode(mode: string) {
    if (mode === this.mode) return;
    this.mode = mode;
    // Switching channel puts her in that channel's pose, the way the mode picker
    // used to. The log carries over — it's one conversation, not four.
    this.emotion = normalizeEmotion(MODES.find((m) => m.id === mode)?.emotion);
  }

  private onKey(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void this.send(); }
  }

  private async scrollToEnd() {
    await this.updateComplete;
    this.renderRoot.querySelector(".log")?.scrollTo({ top: 1e9, behavior: "smooth" });
  }

  private async send() {
    const content = this.draft.trim();
    if (!content || this.busy) return;
    let options: Record<string, unknown> = {};
    if (this.status?.enabled) {
      try {
        const parsed: unknown = JSON.parse(this.advancedOptions || "{}");
        if (!parsed || Array.isArray(parsed) || typeof parsed !== "object") throw new Error("not an object");
        options = parsed as Record<string, unknown>;
      } catch {
        this.error = "Advanced text-generation options must be a JSON object.";
        this.settingsOpen = true;
        return;
      }
    }
    this.armIdle();
    const next: Entry[] = [...this.entries, { role: "user", content, at: Date.now() }];
    this.entries = next; this.draft = ""; this.busy = true; this.error = "";
    void this.scrollToEnd();

    // No local LLM configured? Libby answers for herself rather than going quiet —
    // her own voice reads the message and replies from the emotion/heat she's in.
    if (!this.status?.enabled) {
      const line = libbyReply(content, this.mode, this.emotion, this.intensity);
      // A beat of "typing", so she doesn't answer faster than thought.
      await new Promise((r) => setTimeout(r, 350 + Math.random() * 450));
      this.emotion = line.emotion;
      this.intensity = setIntensity(line.intensity);
      this.entries = [...next, { role: "assistant", content: line.message, at: Date.now(), local: true }];
      this.busy = false;
      void this.scrollToEnd();
      return;
    }

    try {
      // Lines Libby wrote herself (the opener, offline replies) are hers, not the
      // model's — they stay out of the history we hand it.
      const history: ChatMessage[] = next
        .filter((e) => !e.local)
        .map(({ role, content: text }) => ({ role, content: text }));
      const result = await api.chat(this.mode, history, this.emotion, this.intensity, options);
      this.emotion = normalizeEmotion(result.emotion ?? this.emotion);
      // Persist the reply's intensity into the session meter so it carries across
      // the app (the outfit tier Libby wears, the next screen she pops up on).
      this.intensity = setIntensity(normalizeIntensity(result.intensity ?? this.intensity));
      this.entries = [...next, { role: "assistant", content: result.message, at: Date.now() }];
      void this.scrollToEnd();
    } catch (e) { this.error = (e as Error).message; }
    finally { this.busy = false; }
  }

  render() {
    const assets = libbyAssetCandidates(this.emotion, this.intensity, loadLibbyOutfit());
    // Hiding Libby drops her artwork; the client, the channels and her replies stay.
    const hideLibby = loadHideLibby();
    const channel = MODES.find((m) => m.id === this.mode) ?? MODES[0];
    const me = this.user?.username ?? "You";
    return html`
      <div class="client" @pointerdown=${this.armIdle}>
        ${this.renderRail(assets, hideLibby)}
        ${this.renderSidebar(me)}
        <section class="main">
          <div class="top">
            <span class="hash">#</span><span class="name">${channel.label}</span>
            <span class="topic">${channel.topic}</span>
            <button class="gear ${this.settingsOpen ? "on" : ""}" title="Libby settings"
              aria-expanded=${this.settingsOpen} @click=${() => (this.settingsOpen = !this.settingsOpen)}>
              <span class="material-symbols-rounded" style="font-size:20px;">settings</span>
            </button>
          </div>
          ${this.settingsOpen ? this.renderSettings() : nothing}
          <div class="log">
            ${this.renderIntro(channel)}
            ${this.entries.map((entry, i) => this.renderEntry(entry, this.entries[i - 1], assets, hideLibby, me))}
            ${this.busy ? html`<div class="typing">
              <span class="dot"></span><span class="dot"></span><span class="dot"></span>
              <b>Libby</b> is typing…
            </div>` : nothing}
          </div>
          ${this.error ? html`<div class="error">${this.error}</div>` : nothing}
          <form @submit=${(e: Event) => { e.preventDefault(); void this.send(); }}>
            <div class="composer">
              <textarea rows="1" placeholder=${`Message #${channel.label}`} .value=${this.draft}
                ?disabled=${this.busy}
                @input=${(e: Event) => { this.draft = (e.target as HTMLTextAreaElement).value; this.armIdle(); }}
                @keydown=${this.onKey}></textarea>
              <button class="send" title="Send" ?disabled=${!this.draft.trim() || this.busy}>
                <span class="material-symbols-rounded">send</span>
              </button>
            </div>
          </form>
        </section>
        ${this.renderMembers(assets, hideLibby)}
      </div>`;
  }

  private renderRail(assets: string[], hideLibby: boolean) {
    return html`<nav class="rail">
      <div class="guild on" title="Libby">
        ${hideLibby
          ? html`<span class="material-symbols-rounded">forum</span>`
          : html`<img src=${assets[0]} data-fallback-index="0" alt="Libby"
              @error=${(e: Event) => applyImageFallback(e.target as HTMLImageElement, assets)} />`}
      </div>
      <div class="rail-sep"></div>
    </nav>`;
  }

  private renderSidebar(me: string) {
    return html`<nav class="side">
      <div class="guild-head">Libby</div>
      <div class="cat">Channels</div>
      ${MODES.map((m) => html`<button class="chan ${m.id === this.mode ? "on" : ""}"
        @click=${() => this.setMode(m.id)}><span class="hash">#</span>${m.label}</button>`)}
      <div class="side-foot">
        <div class="me-avatar">${me.slice(0, 2).toUpperCase()}</div>
        <div style="min-width:0;">
          <div class="me-name">${me}</div>
          <div class="me-sub">${this.status?.enabled ? "Online" : "Offline mode"}</div>
        </div>
      </div>
    </nav>`;
  }

  /**
   * The settings panel: hidden until the gear is pressed, and built from the
   * emotion model the rest of the app uses now — the named emotions from
   * LIBBY_EMOTIONS plus the 1–5 horniness meter that picks her art tier.
   */
  private renderSettings() {
    return html`<div class="settings">
      <div>
        <h3>Emotion</h3>
        <div class="chips">
          ${LIBBY_EMOTIONS.map((m) => html`<button class="chip ${m === this.emotion ? "on" : ""}"
            @click=${() => (this.emotion = m)}>
            ${m[0].toUpperCase() + m.slice(1)}
          </button>`)}
        </div>
      </div>
      <div>
        <h3>Horniness</h3>
        <div class="heat">
          <input type="range" min="1" max="5" .value=${String(this.intensity)}
            @input=${(e: Event) => (this.intensity = setIntensity(Number((e.target as HTMLInputElement).value)))} />
          <span class="val">${this.intensity} / 5</span>
        </div>
      </div>
      ${this.status?.advancedOptions ? html`<div>
        <h3>text-generation-webui API</h3>
        <textarea class="advanced" spellcheck="false" .value=${this.advancedOptions}
          @input=${(e: Event) => (this.advancedOptions = (e.target as HTMLTextAreaElement).value)}
          placeholder='{"temperature":0.7,"top_p":0.9,"top_k":20,"preset":"Libby"}'></textarea>
        <div class="advanced-help">Any chat-completions field is passed through: presets, samplers,
          character/template fields, grammar, stop strings, thinking controls, and future options.
          OppaiLib keeps model, messages, and streaming under its control.</div>
      </div>` : nothing}
    </div>`;
  }

  private renderIntro(channel: (typeof MODES)[number]) {
    return html`<div class="intro">
      <div class="badge"><span class="material-symbols-rounded">tag</span></div>
      <h2>Welcome to #${channel.label}!</h2>
      <p>
        ${channel.topic}
        ${this.status?.enabled
          ? html` Running on <b>${this.status.model}</b>.`
          : html` No local LLM configured — Libby is answering on her own.`}
      </p>
    </div>`;
  }

  private renderEntry(entry: Entry, previous: Entry | undefined, assets: string[], hideLibby: boolean, me: string) {
    // Discord groups consecutive messages from the same author within a few minutes:
    // the follow-ups drop the avatar and header and just show a hover timestamp.
    const grouped = !!previous && previous.role === entry.role && entry.at - previous.at < 5 * 60_000;
    const libby = entry.role === "assistant";
    const author = libby ? "Libby" : me;
    return html`<div class="row ${grouped ? "grouped" : "first"}">
      ${grouped
        ? html`<span class="stamp">${timeOf(entry.at)}</span>`
        : libby
          ? html`<div class="avatar">
              ${hideLibby
                ? nothing
                : html`<img src=${assets[0]} data-fallback-index="0" alt="Libby"
                    @error=${(e: Event) => applyImageFallback(e.target as HTMLImageElement, assets)} />`}
            </div>`
          : html`<div class="avatar initials">${me.slice(0, 2).toUpperCase()}</div>`}
      <div class="body">
        ${grouped ? nothing : html`<div class="who">
          <span class="author ${libby ? "libby" : ""}">${author}</span>
          ${libby ? html`<span class="tag ${entry.local ? "offline" : ""}">
            ${entry.local ? "Local" : "Bot"}</span>` : nothing}
          <span class="when">${timeOf(entry.at)}</span>
        </div>`}
        <div class="text">${entry.content}</div>
      </div>
    </div>`;
  }

  private renderMembers(assets: string[], hideLibby: boolean) {
    return html`<aside class="members">
      <div class="cat">Online — 1</div>
      <div class="member">
        <div class="pip">
          ${hideLibby
            ? nothing
            : html`<img src=${assets[0]} data-fallback-index="0" alt="Libby"
                @error=${(e: Event) => applyImageFallback(e.target as HTMLImageElement, assets)} />`}
        </div>
        <div class="who2">
          <div class="n">Libby</div>
          <div class="s">${this.status?.enabled ? this.status.model : "Answering on her own"}</div>
        </div>
      </div>
      ${hideLibby
        ? nothing
        : html`<div class="portrait">
            <img src=${assets[0]} data-fallback-index="0" alt="Libby"
              @error=${(e: Event) => applyImageFallback(e.target as HTMLImageElement, assets)} />
          </div>`}
    </aside>`;
  }

  /** Her opening line, written locally so a fresh channel is never empty. */
  protected firstUpdated() {
    const opener = libbyOpener(this.mode, this.intensity);
    this.emotion = opener.emotion;
    this.entries = [{ role: "assistant", content: opener.message, at: Date.now(), local: true }];
    this.armIdle();
  }
}

declare global { interface HTMLElementTagNameMap { "oppai-chat": OppaiChat; } }
