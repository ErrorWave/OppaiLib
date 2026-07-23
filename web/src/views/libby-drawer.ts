import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { keyed } from "lit/directives/keyed.js";
import {
  api, type ChatCharacter, type ChatMessage, type ChatStatus, type LibbyAction, type LibbyLink, type Media,
} from "../api.js";
import { iconStyles, motionStyles } from "../theme.js";
import {
  applyImageFallback, libbyAssetCandidates, loadHideLibby, loadLibbyOutfit,
  normalizeEmotion, normalizeIntensity, type LibbyEmotion,
} from "../libby.js";
import { applyProgression, getIntensity, setIntensity } from "../libby-meter.js";
import { libbyHeatDelta, libbyOnBrowse, libbyReply } from "../libby-voice.js";
import {
  ActionApprovals, actionCardStyles, linkChipStyles, renderActionCards, renderLinkChips, requestOpenMedia,
} from "../chat-links.js";
import { libbyMotion } from "../libby-motion.js";
import { KIND_META, type Kind } from "../media-meta.js";

/**
 * Browsing together, everywhere.
 *
 * The Together screen is a place you go: a shelf with her beside it. This is the same
 * conversation as a drawer that pulls out over whatever you are already doing — the
 * grid, a video, the image studio — so "look at this with me" stops being a section
 * you navigate to and becomes something available wherever you happen to be.
 *
 * The shell tells it what is on screen (`items`, `focused`, `where`), and it tells the
 * shell when she points at something (the shared OPEN_MEDIA_EVENT). It reacts on its
 * own when the focused item changes while the drawer is open — that is the whole
 * premise, that opening something *is* the message — and stays quiet when it is shut,
 * because a mascot narrating a closed drawer is a mascot talking to nobody.
 *
 * Nothing said here is written to the chat workspace, for the same two reasons as the
 * Together screen: a running commentary is not correspondence anyone wants filed, and
 * the Chat screen owns that document. The mood meter *is* shared — it is per-session,
 * not per-screen.
 */

interface Remark {
  id: string;
  role: "user" | "assistant";
  content: string;
  at: number;
  links?: LibbyLink[];
  actions?: LibbyAction[];
}

const newID = () => {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID().replaceAll("-", "");
  return [...crypto.getRandomValues(new Uint8Array(16))].map((b) => b.toString(16).padStart(2, "0")).join("");
};

/** How many on-screen items travel with a turn. The server caps this too. */
const VIEWING_WINDOW = 16;

/** Whether the drawer starts open, per-device like the rest of Libby's presentation. */
const OPEN_KEY = "oppai_libby_drawer";

const MODES = [
  { id: "sweet", label: "sweet" },
  { id: "playful", label: "playful" },
  { id: "bold", label: "bold" },
  { id: "horny", label: "horny" },
] as const;

@customElement("oppai-libby-drawer")
export class OppaiLibbyDrawer extends LitElement {
  /** What is on screen right now, most relevant first. The shell decides what that
      means for the section the user is in. */
  @property({ attribute: false }) items: Media[] = [];
  /** The one item the user is actually looking at, when there is one. */
  @property({ attribute: false }) focused: Media | null = null;
  /** Where they are, in words she can use — "their videos", "the image studio". */
  @property() where = "their library";
  /** Set while a screen owns the conversation itself (the Chat and Together views),
      so she is not running two conversations at the user in parallel. */
  @property({ type: Boolean }) suppressed = false;

  @state() private open = localStorage.getItem(OPEN_KEY) === "1";
  @state() private characters: ChatCharacter[] = [];
  @state() private characterID = "libby";
  @state() private status: ChatStatus | null = null;
  @state() private remarks: Remark[] = [];
  @state() private draft = "";
  @state() private busy = false;
  @state() private notice = "";
  @state() private noticeError = false;
  @state() private mode = "playful";
  @state() private emotion: LibbyEmotion = "happy";
  @state() private intensity = getIntensity();
  /** Set once the character list has been fetched, so the first open does it once. */
  private loaded = false;
  /** Fractional heat behind the displayed tier; see applyProgression. */
  private progress = getIntensity();
  /** The last item she was told about, so a re-render with the same focus does not
      make her say something twice. */
  private remarkedOn: number | null = null;

  /** Which of her offers have been decided this session; see ActionApprovals. */
  private approvals = new ActionApprovals(() => this.requestUpdate());

  static styles = [iconStyles, motionStyles, linkChipStyles, actionCardStyles, libbyMotion, css`
    :host { position: fixed; inset: 0 0 0 auto; z-index: 60; pointer-events: none; display: block; }

    /* The handle: a tab on the right edge, the drawer's only permanent footprint. It
       is deliberately small and vertical — this sits over every screen in the app, so
       anything larger is a thing in the way rather than a thing available. */
    .handle {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 6px;
      writing-mode: vertical-rl;
      border: 0;
      border-radius: 12px 0 0 12px;
      padding: 14px 7px;
      background: var(--oppai-primary-container, #3b2411);
      color: var(--oppai-primary-bright, #ffb877);
      font: inherit;
      font-size: 12px;
      letter-spacing: .06em;
      cursor: pointer;
      box-shadow: -2px 0 12px rgba(0, 0, 0, .35);
    }
    .handle:hover { filter: brightness(1.12); }
    .handle .material-symbols-rounded { font-size: 18px; writing-mode: horizontal-tb; }

    .panel {
      position: absolute;
      right: 0; top: 0; bottom: 0;
      width: min(370px, 92vw);
      pointer-events: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 12px;
      box-sizing: border-box;
      background: var(--oppai-surface, #17120e);
      border-left: 1px solid var(--oppai-surface-2, rgba(255,255,255,.08));
      box-shadow: -8px 0 28px rgba(0, 0, 0, .45);
    }
    @media (prefers-reduced-motion: no-preference) {
      .panel { animation: drawer-in .18s ease-out; }
    }
    @keyframes drawer-in { from { transform: translateX(16px); opacity: 0; } }

    .head { display: flex; align-items: center; gap: 8px; }
    .head .who { font-weight: 700; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .head select, .head button {
      background: var(--oppai-surface-2, rgba(255,255,255,.06)); color: inherit; border: 0;
      border-radius: 10px; padding: 6px 8px; font: inherit; font-size: 13px; cursor: pointer;
    }

    .portrait { height: 168px; display: grid; place-items: center; flex: 0 0 auto; }
    .portrait img { max-height: 168px; max-width: 100%; object-fit: contain; transform-origin: 50% 100%;
      filter: drop-shadow(0 10px 24px rgba(0,0,0,.45)); }

    .watching { font-size: 12px; opacity: .6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .log { flex: 1; min-height: 0; overflow: auto; display: flex; flex-direction: column; gap: 10px; }
    .remark { font-size: 14px; line-height: 1.4; }
    .remark.from-user { align-self: flex-end; max-width: 88%; background: var(--oppai-surface-2, rgba(255,255,255,.06));
      border-radius: 12px; padding: 7px 11px; }
    .remark .said { white-space: pre-wrap; }
    .thinking { opacity: .6; font-size: 13px; font-style: italic; }
    .notice { font-size: 12px; opacity: .75; }
    .notice.error { color: var(--oppai-danger, #ff6b6b); opacity: 1; }

    .actions { display: flex; gap: 8px; flex-wrap: wrap; }
    .actions button { flex: 1; min-width: 110px; border: 1px solid var(--oppai-surface-2, rgba(255,255,255,.08));
      background: none; color: inherit; border-radius: 12px; padding: 8px 10px; font: inherit; font-size: 12px; cursor: pointer; }
    .actions button:hover:not(:disabled) { border-color: var(--oppai-primary, #f97316); color: var(--oppai-primary-bright, #ffb877); }
    .actions button:disabled { opacity: .4; cursor: default; }

    .say { display: flex; gap: 8px; align-items: flex-end; }
    .say textarea { flex: 1; resize: none; background: var(--oppai-surface-2, rgba(255,255,255,.06)); color: inherit;
      border: 0; border-radius: 12px; padding: 10px 12px; font: inherit; font-size: 14px; max-height: 110px; }
    .icon-btn { border: 0; background: var(--oppai-surface-2, rgba(255,255,255,.06)); color: inherit; border-radius: 12px;
      padding: 9px; cursor: pointer; display: grid; place-items: center; }
    .icon-btn:hover { background: var(--oppai-primary-container, #3b2411); color: var(--oppai-primary-bright, #ffb877); }
    .icon-btn:disabled { opacity: .4; cursor: default; }
  `];

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("oppai-libby-pref", this.onPref);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("oppai-libby-pref", this.onPref);
  }

  private onPref = () => this.requestUpdate();

  updated(changed: Map<string, unknown>) {
    if (!changed.has("focused")) return;
    // She reacts to what you opened, but only while she is out and only when the model
    // can actually answer. A closed drawer that quietly racks up commentary would spend
    // the user's GPU on text nobody asked for and nobody will read.
    // The same three conditions render() draws nothing under. A hidden drawer that
    // still asked for turns would spend the user's GPU on commentary they have said
    // they do not want to see.
    if (!this.open || this.suppressed || loadHideLibby() || !this.focused) return;
    if (this.focused.id === this.remarkedOn) return;
    this.remarkedOn = this.focused.id;
    void this.ask("", `(I have just opened "${this.focused.title}". Say what you think of it.)`);
  }

  private async load() {
    if (this.loaded) return;
    this.loaded = true;
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

  private toggle() {
    this.open = !this.open;
    try { localStorage.setItem(OPEN_KEY, this.open ? "1" : "0"); } catch { /* private mode */ }
    if (this.open) void this.load();
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

  /** What is on screen, as ids: the focused item first, then the rest of what the
      shell handed down. Titles and tags are read server-side from these. */
  private viewing() {
    const ids = this.items.slice(0, VIEWING_WINDOW).map((item) => item.id);
    return { focusId: this.focused?.id, ids, section: this.where };
  }

  /** Asks for one turn and appends it. Mirrors the Together screen's `ask`, including
      the local-voice fallback when no model is loaded. */
  private async ask(spoken: string, prompt?: string) {
    const character = this.character;
    if (!character || this.busy) return;
    this.busy = true;
    const heat = applyProgression(this.progress, libbyHeatDelta(spoken || prompt || "", this.mode));
    try {
      if (!this.status?.enabled && (this.status?.configured || this.status?.modelBackend)) {
        try { this.status = await api.chatStatus(); } catch { /* The branch below still answers. */ }
      }
      if (!this.status?.enabled) {
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
      this.push({ role: "assistant", content: result.message, links: result.links, actions: result.actions });
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

  private send() {
    const spoken = this.draft.trim();
    if (!spoken || this.busy) return;
    this.draft = "";
    this.push({ role: "user", content: spoken });
    void this.ask(spoken);
  }

  private onKey(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); this.send(); }
  }

  render() {
    // Hiding Libby hides her everywhere, and this is the most ambient surface she has.
    // The Chat and Together screens own the conversation where they run, so the drawer
    // stands down rather than competing with them.
    if (loadHideLibby() || this.suppressed) return nothing;
    return this.open ? this.renderPanel() : this.renderHandle();
  }

  private renderHandle() {
    const name = this.character?.name ?? "Libby";
    return html`<button class="handle" title=${`Browse with ${name}`} aria-label=${`Open ${name}'s drawer`}
      @click=${() => this.toggle()}>
      <span class="material-symbols-rounded">interests</span>
      Together
    </button>`;
  }

  private renderPanel() {
    const character = this.character;
    const name = character?.name ?? "Libby";
    return html`<aside class="panel" aria-label=${`Browsing with ${name}`}>
      <div class="head">
        ${this.characters.length > 1
          ? html`<select aria-label="Who you are browsing with" .value=${this.characterID}
              @change=${(event: Event) => { this.characterID = (event.target as HTMLSelectElement).value; }}>
              ${this.characters.map((entry) => html`<option value=${entry.id}>${entry.name}</option>`)}
            </select>`
          : html`<span class="who">${name}</span>`}
        <select aria-label="Mood" .value=${this.mode}
          @change=${(event: Event) => (this.mode = (event.target as HTMLSelectElement).value)}>
          ${MODES.map((mode) => html`<option value=${mode.id}>${mode.label}</option>`)}
        </select>
        <button title="Close" aria-label="Close the drawer" @click=${() => this.toggle()}>
          <span class="material-symbols-rounded" style="font-size:18px; display:block;">right_panel_close</span>
        </button>
      </div>
      ${this.renderPortrait(character)}
      <div class="watching">
        ${this.focused
          ? `Looking at “${this.focused.title}”`
          : `Watching ${this.where}${this.items.length ? ` · ${this.items.length} items` : ""}`}
      </div>
      <div class="log">
        ${this.remarks.map((remark) => html`<div class="remark ${remark.role === "user" ? "from-user" : ""}">
          <span class="said">${remark.content}</span>
          ${renderLinkChips(remark.links, (id) => requestOpenMedia(this, id))}
          ${renderActionCards(remark.actions, this.approvals.stateOf, this.approvals.decide)}
        </div>`)}
        ${this.busy ? html`<div class="thinking">${name} is looking…</div>` : nothing}
      </div>
      ${this.notice
        ? html`<div class="notice ${this.noticeError ? "error" : ""}" role=${this.noticeError ? "alert" : "status"}>${this.notice}</div>`
        : nothing}
      <div class="actions">
        <button ?disabled=${this.busy || !this.focused} @click=${() => {
          const item = this.focused;
          if (item) void this.ask("", `(Tell me what you think of "${item.title}" — be specific about it.)`);
        }}>What do you think?</button>
        <button ?disabled=${this.busy || !this.items.length} @click=${() => {
          this.push({ role: "user", content: "Pick something for me." });
          void this.ask("Pick something for me.");
        }}>Pick one for me</button>
      </div>
      <div class="say">
        <textarea rows="1" aria-label=${`Say something to ${name}`} placeholder=${`Say something to ${name}…`}
          .value=${this.draft} @input=${(event: Event) => (this.draft = (event.target as HTMLTextAreaElement).value)}
          @keydown=${(event: KeyboardEvent) => this.onKey(event)}></textarea>
        <button class="icon-btn" title="Send" aria-label="Send" ?disabled=${!this.draft.trim() || this.busy}
          @click=${() => this.send()}>
          <span class="material-symbols-rounded">send</span>
        </button>
      </div>
    </aside>`;
  }

  private renderPortrait(character?: ChatCharacter) {
    if (character?.avatarImageId) {
      return html`<div class="portrait"><img src=${api.chatImageURL(character.avatarImageId)} alt=${character.name}/></div>`;
    }
    if (character && character.id !== "libby") return nothing;
    const assets = libbyAssetCandidates(this.emotion, this.intensity, loadLibbyOutfit());
    // Keyed on the pose and the remark count, so a mood change swaps the element
    // (restarting the artwork fallback chain) and every new remark rocks her into it.
    return html`<div class="portrait libby-breathe">${keyed(`${this.emotion}-${this.intensity}-${this.remarks.length}`,
      html`<img class=${this.busy ? "" : "libby-speak"} src=${assets[0]}
        data-fallback-index="0" alt=${`Libby looking ${this.emotion}`}
        @error=${(event: Event) => applyImageFallback(event.target as HTMLImageElement, assets)}/>`)}</div>`;
  }
}

/** A phrase for where the user is, for the `where` property. Kept here so the shell
    does not have to know how she talks about the app. */
export function libbyWhere(section: string): string {
  if (section === "home" || section === "search") return "their whole library";
  if (section === "favorites") return "their favorites";
  if (section === "browse") return "an outside site they are browsing";
  if (section === "imagegen") return "the image studio, making pictures";
  if (section === "settings") return "the settings screen";
  const label = KIND_META[section as Kind]?.label;
  return label ? `their ${label.toLowerCase()}` : "their library";
}

declare global { interface HTMLElementTagNameMap { "oppai-libby-drawer": OppaiLibbyDrawer; } }
