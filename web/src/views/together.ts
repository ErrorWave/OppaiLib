import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { keyed } from "lit/directives/keyed.js";
import {
  api, type ChatCharacter, type ChatMessage, type ChatStatus, type LibbyLink, type Media,
} from "../api.js";
import { iconStyles, motionStyles } from "../theme.js";
import {
  applyImageFallback, libbyAssetCandidates, loadHideLibby, loadLibbyOutfit,
  normalizeEmotion, normalizeIntensity, type LibbyEmotion,
} from "../libby.js";
import { applyProgression, getIntensity, setIntensity } from "../libby-meter.js";
import { libbyHeatDelta, libbyOnBrowse, libbyReply } from "../libby-voice.js";
import { linkChipStyles, renderLinkChips, requestOpenMedia } from "../chat-links.js";
import { libbyMotion } from "../libby-motion.js";
import { KIND_META, KIND_ORDER, hasThumbnail, primaryTag, statFor, swatchFor, type Kind } from "../media-meta.js";

/**
 * Going through the library with her, rather than about it.
 *
 * The Chat screen is a conversation that can mention the collection; this is the
 * collection with a conversation running alongside it. The difference that matters
 * is who brings up what: here she is told what is on screen and reacts to it, so
 * opening something *is* the message. You can still type, and she still answers,
 * but the browsing is the thing driving the exchange.
 *
 * Nothing said here is written to the chat workspace. That is deliberate on two
 * counts. A running commentary on a browsing session is not correspondence anyone
 * wants filed, and the Chat screen owns the workspace file — two views autosaving
 * the same document from different states is how one of them loses a character
 * card. The mood meter is shared, though: it is per-session, not per-screen, so
 * getting her going in here carries straight over.
 */

/** One line of the running commentary. */
interface Remark {
  id: string;
  role: "user" | "assistant";
  content: string;
  at: number;
  links?: LibbyLink[];
}

const newID = () => {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID().replaceAll("-", "");
  return [...crypto.getRandomValues(new Uint8Array(16))].map((b) => b.toString(16).padStart(2, "0")).join("");
};

/** How many on-screen items travel with a turn. The server caps this too; keeping
    the client's number lower than the wall keeps the request small on a big grid. */
const VIEWING_WINDOW = 16;

/** Modes offered here. The full set lives in Chat — this screen is about looking
    at things together, so it offers the range of *how* rather than all five. */
const MODES = [
  { id: "sweet", label: "sweet" },
  { id: "playful", label: "playful" },
  { id: "bold", label: "bold" },
  { id: "horny", label: "horny" },
] as const;

@customElement("oppai-together")
export class OppaiTogether extends LitElement {
  /** The library, handed down rather than refetched: the shell already has it. */
  @property({ attribute: false }) items: Media[] = [];

  @state() private characters: ChatCharacter[] = [];
  @state() private characterID = "libby";
  @state() private status: ChatStatus | null = null;
  @state() private remarks: Remark[] = [];
  @state() private focusID: number | null = null;
  @state() private kind: Kind | "all" = "all";
  @state() private draft = "";
  @state() private busy = false;
  @state() private notice = "";
  @state() private noticeError = false;
  @state() private mode = "playful";
  @state() private emotion: LibbyEmotion = "happy";
  @state() private intensity = getIntensity();
  /** Fractional heat behind the displayed tier; see applyProgression. */
  private progress = getIntensity();

  static styles = [iconStyles, motionStyles, linkChipStyles, libbyMotion, css`
    :host { display:grid; grid-template-columns:minmax(0,1fr) 360px; gap:16px; height:100%; min-height:0; padding:4px 4px 12px; box-sizing:border-box; }
    /* Narrow: she goes under the shelf rather than away. Hiding the panel would
       remove the entire point of the screen on a phone. */
    @media (max-width:1100px) {
      :host { grid-template-columns:minmax(0,1fr); grid-template-rows:minmax(0,1fr) auto; }
      .panel { max-height:46vh; }
      .portrait { display:none; }
    }

    .shelf { min-width:0; display:flex; flex-direction:column; gap:12px; min-height:0; }
    .filters { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
    .chip { border:1px solid var(--oppai-surface-2); background:var(--oppai-surface); color:inherit;
      border-radius:999px; padding:6px 14px; font:inherit; font-size:13px; cursor:pointer; }
    .chip.on { background:var(--oppai-primary-container); border-color:var(--oppai-primary); color:var(--oppai-primary-bright); }
    .filters .spacer { flex:1; }

    .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(170px,1fr)); gap:14px; overflow:auto; padding:2px 2px 20px; min-height:0; }
    .tile { cursor:pointer; border-radius:14px; overflow:hidden; background:var(--oppai-surface); border:2px solid transparent; transition:border-color .12s, transform .12s; }
    .tile:hover { transform:translateY(-2px); }
    .tile.focused { border-color:var(--oppai-primary); }
    .tile-media { position:relative; display:grid; place-items:center; }
    .tile-media img { width:100%; height:100%; object-fit:cover; display:block; }
    .tile-stat { position:absolute; right:6px; bottom:6px; background:rgba(0,0,0,.62); color:#fff; font-size:11px; padding:2px 6px; border-radius:6px; }
    .tile-open { position:absolute; left:6px; bottom:6px; border:0; border-radius:8px; padding:3px 8px; font:inherit; font-size:11px;
      background:rgba(0,0,0,.62); color:#fff; cursor:pointer; opacity:0; transition:opacity .12s; }
    .tile:hover .tile-open, .tile.focused .tile-open { opacity:1; }
    .tile-meta { padding:8px 10px 10px; }
    .tile-title { font-size:13px; font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .tile-tag { font-size:11px; opacity:.6; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .empty { opacity:.65; padding:40px 8px; text-align:center; }

    .panel { display:flex; flex-direction:column; min-height:0; gap:10px; background:var(--oppai-surface); border-radius:18px; padding:14px; box-sizing:border-box; }
    .panel-head { display:flex; align-items:center; gap:10px; }
    .panel-head select { background:var(--oppai-surface-2); color:inherit; border:0; border-radius:10px; padding:6px 8px; font:inherit; font-size:13px; }
    .panel-head .who { font-weight:700; flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .portrait { height:190px; display:grid; place-items:center; flex:0 0 auto; }
    .portrait img { max-height:190px; max-width:100%; object-fit:contain; transform-origin:50% 100%; filter:drop-shadow(0 10px 24px rgba(0,0,0,.45)); }
    .portrait .initial { width:96px; height:96px; border-radius:50%; display:grid; place-items:center;
      background:var(--oppai-primary-container); color:var(--oppai-primary-bright); font-size:30px; font-weight:700; }

    .log { flex:1; min-height:0; overflow:auto; display:flex; flex-direction:column; gap:10px; padding-right:2px; }
    .remark { font-size:14px; line-height:1.4; }
    .remark.from-user { align-self:flex-end; max-width:88%; background:var(--oppai-surface-2); border-radius:12px; padding:7px 11px; }
    .remark .said { white-space:pre-wrap; }
    .remark em { opacity:.72; font-style:italic; }
    .thinking { opacity:.6; font-size:13px; font-style:italic; }
    .notice { font-size:12px; opacity:.75; }
    .notice.error { color:var(--oppai-danger, #ff6b6b); opacity:1; }

    .say { display:flex; gap:8px; align-items:flex-end; }
    .say textarea { flex:1; resize:none; background:var(--oppai-surface-2); color:inherit; border:0; border-radius:12px;
      padding:10px 12px; font:inherit; font-size:14px; max-height:110px; }
    .icon-btn { border:0; background:var(--oppai-surface-2); color:inherit; border-radius:12px; padding:9px; cursor:pointer; display:grid; place-items:center; }
    .icon-btn:hover { background:var(--oppai-primary-container); color:var(--oppai-primary-bright); }
    .icon-btn:disabled { opacity:.4; cursor:default; }
    .panel-actions { display:flex; gap:8px; flex-wrap:wrap; }
    .panel-actions button { flex:1; min-width:120px; border:1px solid var(--oppai-surface-2); background:none; color:inherit;
      border-radius:12px; padding:8px 10px; font:inherit; font-size:12px; cursor:pointer; }
    .panel-actions button:hover:not(:disabled) { border-color:var(--oppai-primary); color:var(--oppai-primary-bright); }
    .panel-actions button:disabled { opacity:.4; cursor:default; }
  `];

  connectedCallback() {
    super.connectedCallback();
    void this.load();
  }

  private async load() {
    try {
      const workspace = await api.chatWorkspace();
      this.characters = (workspace.characters ?? []).filter((character) => character?.id);
      if (!this.characters.some((character) => character.id === this.characterID)) {
        this.characterID = this.characters[0]?.id ?? "libby";
      }
      const character = this.character;
      if (character?.defaultMode && MODES.some((mode) => mode.id === character.defaultMode)) {
        this.mode = character.defaultMode;
      }
    } catch (error) {
      this.say((error as Error).message || "Couldn't load your characters.", true);
    }
    try { this.status = await api.chatStatus(); } catch { /* The first turn reports it. */ }
    if (!this.remarks.length) {
      this.push({ role: "assistant", content: libbyOnBrowse({}, { intensity: this.intensity }).message });
    }
  }

  private get character(): ChatCharacter | undefined {
    return this.characters.find((character) => character.id === this.characterID);
  }

  private get shelf(): Media[] {
    return this.kind === "all" ? this.items : this.items.filter((item) => item.kind === this.kind);
  }

  private get focused(): Media | undefined {
    return this.focusID == null ? undefined : this.items.find((item) => item.id === this.focusID);
  }

  private say(message: string, error = false) {
    this.notice = message;
    this.noticeError = error;
    if (!error) window.setTimeout(() => { if (this.notice === message) this.notice = ""; }, 4000);
  }

  private push(remark: Omit<Remark, "id" | "at">) {
    this.remarks = [...this.remarks, { ...remark, id: newID(), at: Date.now() }].slice(-60);
    void this.scrollLog();
  }

  private async scrollLog() {
    await this.updateComplete;
    const log = this.renderRoot.querySelector(".log");
    if (log) log.scrollTop = log.scrollHeight;
  }

  /**
   * What is on screen, as ids.
   *
   * The focused item leads and the rest of the visible shelf follows, so what she
   * is handed matches what the user is actually looking at rather than the whole
   * library. Titles and tags are read server-side from these ids — see chatViewing.
   */
  private viewing() {
    const shelf = this.shelf.slice(0, VIEWING_WINDOW).map((item) => item.id);
    const section = this.kind === "all" ? "their whole library" : `their ${KIND_META[this.kind as Kind].label.toLowerCase()}`;
    return { focusId: this.focusID ?? undefined, ids: shelf, section };
  }

  /**
   * Asks for one turn and appends it.
   *
   * `spoken` is what the user said, when they said anything. A turn with none is
   * the screen itself talking — they opened something, and she is reacting to it —
   * so the model is given a short instruction in the user role rather than a
   * fabricated line of dialogue for the user, which would end up in the transcript
   * as words they never wrote.
   */
  private async ask(spoken: string, prompt?: string) {
    const character = this.character;
    if (!character || this.busy) return;
    this.busy = true;
    const heat = applyProgression(this.progress, libbyHeatDelta(spoken || prompt || "", this.mode));
    try {
      // Re-probe before giving up on the model: readiness was last checked when
      // this screen mounted, and a backend that has finished loading since then
      // should not leave the rest of the session talking to the offline voice.
      if (!this.status?.enabled && (this.status?.configured || this.status?.modelBackend)) {
        try { this.status = await api.chatStatus(); } catch { /* The branch below still answers. */ }
      }
      if (!this.status?.enabled) {
        // No model: her own voice. She is still looking at the same thing, so the
        // line is about the focused item rather than a generic shrug.
        const item = this.focused;
        const line = spoken
          ? libbyReply(spoken, this.mode, this.emotion, heat.intensity, false)
          : libbyOnBrowse({ kind: item?.kind, tags: (item?.tags ?? []).map((tag) => tag.name) }, { intensity: heat.intensity });
        this.applyMood(line.emotion, heat.progress, line.intensity);
        this.push({ role: "assistant", content: line.message });
        return;
      }
      const history: ChatMessage[] = this.remarks.map(({ role, content }) => ({ role, content }));
      if (prompt) history.push({ role: "user", content: prompt });
      const result = await api.chat({
        mode: this.mode, messages: history, emotion: this.emotion, intensity: this.intensity,
        characterId: character.id, viewing: this.viewing(),
        outfit: character.id === "libby" ? loadLibbyOutfit() : "",
      });
      const requested = normalizeIntensity(result.intensity ?? this.intensity);
      if (result.declared) this.applyMood(normalizeEmotion(result.emotion), requested, requested);
      else {
        const drift = applyProgression(this.progress, requested - this.intensity);
        this.applyMood(normalizeEmotion(result.emotion), drift.progress, drift.intensity);
      }
      this.push({ role: "assistant", content: result.message, links: result.links });
    } catch (error) {
      this.say((error as Error).message || "She didn't answer.", true);
    } finally {
      this.busy = false;
    }
  }

  private applyMood(emotion: LibbyEmotion, progress: number, intensity: number) {
    this.emotion = emotion;
    this.progress = progress;
    this.intensity = setIntensity(intensity);
  }

  /**
   * Shows her what you have just clicked.
   *
   * One click focuses and asks; it does not open the viewer. That is the whole
   * interaction on this screen — you point at something, she says what she thinks —
   * and having a click also leave the screen would make the commentary unreadable.
   * The tile's own Open button, and double-click, are what actually open it.
   */
  private show(item: Media) {
    if (this.focusID === item.id || this.busy) { this.focusID = item.id; return; }
    this.focusID = item.id;
    void this.ask("", `(I have just opened "${item.title}". Say what you think of it.)`);
  }

  private open(item: Media, event?: Event) {
    event?.stopPropagation();
    requestOpenMedia(this, item.id);
  }

  private send() {
    const spoken = this.draft.trim();
    if (!spoken || this.busy) return;
    this.draft = "";
    this.push({ role: "user", content: spoken });
    void this.ask(spoken);
  }

  /** Asks her to choose. The nudge is phrased as a request so a model that can link
      answers with one, and the shelf it may choose from is already in the prompt. */
  private pickForMe() {
    if (this.busy) return;
    this.push({ role: "user", content: "Pick something for me." });
    void this.ask("Pick something for me.");
  }

  private onKey(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); this.send(); }
  }

  render() {
    return html`
      <section class="shelf">
        <div class="filters">
          <button class="chip ${this.kind === "all" ? "on" : ""}" @click=${() => (this.kind = "all")}>Everything</button>
          ${KIND_ORDER.map((kind) => html`<button class="chip ${this.kind === kind ? "on" : ""}"
            @click=${() => (this.kind = kind)}>${KIND_META[kind].label}</button>`)}
          <span class="spacer"></span>
          <button class="chip" ?disabled=${this.busy} @click=${() => this.pickForMe()}>Pick something for me</button>
        </div>
        ${this.shelf.length
          ? html`<div class="grid">${this.shelf.map((item) => this.renderTile(item))}</div>`
          : html`<div class="empty">Nothing here yet. Add something and come back — she'll have opinions.</div>`}
      </section>
      ${this.renderPanel()}
    `;
  }

  private renderTile(item: Media) {
    const meta = KIND_META[item.kind];
    const stat = statFor(item);
    return html`<div class="tile ${this.focusID === item.id ? "focused" : ""}" data-id=${item.id}
      @click=${() => this.show(item)} @dblclick=${(event: Event) => this.open(item, event)}>
      <div class="tile-media" style="aspect-ratio:${meta.aspect}; background:${swatchFor(item)};">
        ${hasThumbnail(item)
          ? html`<img loading="lazy" src=${api.thumbURL(item.id)} alt=${item.title}/>`
          : html`<span class="material-symbols-rounded" style="font-size:30px;color:#fff">${meta.icon}</span>`}
        ${stat ? html`<span class="tile-stat">${stat}</span>` : nothing}
        <button class="tile-open" @click=${(event: Event) => this.open(item, event)}>Open</button>
      </div>
      <div class="tile-meta">
        <div class="tile-title">${item.title}</div>
        <div class="tile-tag">${primaryTag(item)}</div>
      </div>
    </div>`;
  }

  private renderPanel() {
    const character = this.character;
    const name = character?.name ?? "Libby";
    return html`<aside class="panel">
      <div class="panel-head">
        ${this.characters.length > 1
          ? html`<select aria-label="Who you are browsing with" .value=${this.characterID}
              @change=${(event: Event) => { this.characterID = (event.target as HTMLSelectElement).value; }}>
              ${this.characters.map((entry) => html`<option value=${entry.id}>${entry.name}</option>`)}
            </select>`
          : html`<span class="who">${name}</span>`}
        <select aria-label="Mood" .value=${this.mode} @change=${(event: Event) => (this.mode = (event.target as HTMLSelectElement).value)}>
          ${MODES.map((mode) => html`<option value=${mode.id}>${mode.label}</option>`)}
        </select>
      </div>
      ${this.renderPortrait(character)}
      <div class="log">
        ${this.remarks.map((remark) => html`<div class="remark ${remark.role === "user" ? "from-user" : ""}">
          <span class="said">${remark.content}</span>
          ${renderLinkChips(remark.links, (id) => requestOpenMedia(this, id))}
        </div>`)}
        ${this.busy ? html`<div class="thinking">${name} is looking…</div>` : nothing}
      </div>
      ${this.notice ? html`<div class="notice ${this.noticeError ? "error" : ""}" role=${this.noticeError ? "alert" : "status"}>${this.notice}</div>` : nothing}
      <div class="panel-actions">
        <button ?disabled=${this.busy || this.focusID == null} @click=${() => {
          const item = this.focused;
          if (item) void this.ask("", `(Tell me what you think of "${item.title}" — be specific about it.)`);
        }}>What do you think?</button>
        <button ?disabled=${this.busy} @click=${() => this.pickForMe()}>Pick one for me</button>
      </div>
      <div class="say">
        <textarea rows="1" aria-label=${`Say something to ${name}`} placeholder=${`Say something to ${name}…`}
          .value=${this.draft} @input=${(event: Event) => (this.draft = (event.target as HTMLTextAreaElement).value)}
          @keydown=${(event: KeyboardEvent) => this.onKey(event)}></textarea>
        <button class="icon-btn" title="Send" aria-label="Send" ?disabled=${!this.draft.trim() || this.busy} @click=${() => this.send()}>
          <span class="material-symbols-rounded">send</span>
        </button>
      </div>
    </aside>`;
  }

  private renderPortrait(character?: ChatCharacter) {
    if (character?.avatarImageId) {
      return html`<div class="portrait"><img src=${api.chatImageURL(character.avatarImageId)} alt=${character.name}/></div>`;
    }
    if (character && character.id !== "libby") {
      return html`<div class="portrait"><span class="initial">${character.name.slice(0, 2).toUpperCase()}</span></div>`;
    }
    if (loadHideLibby()) return nothing;
    const assets = libbyAssetCandidates(this.emotion, this.intensity, loadLibbyOutfit());
    // Keyed on the pose and on how many remarks she has made, so a mood change swaps
    // the element (restarting the artwork fallback chain) and every new remark rocks
    // her into it. The wrapper breathes so the reaction does not cancel the idle.
    return html`<div class="portrait libby-breathe">${keyed(`${this.emotion}-${this.intensity}-${this.remarks.length}`,
      html`<img class=${this.busy ? "" : "libby-speak"} src=${assets[0]}
        data-fallback-index="0" alt=${`Libby looking ${this.emotion}`}
        @error=${(event: Event) => applyImageFallback(event.target as HTMLImageElement, assets)}/>`)}</div>`;
  }
}

declare global { interface HTMLElementTagNameMap { "oppai-together": OppaiTogether; } }
