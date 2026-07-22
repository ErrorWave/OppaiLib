import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import {
  api, type ChatCharacter, type ChatConversation, type ChatImage, type ChatMessage, type ChatModels,
  type ChatOptions, type ChatStatus, type ChatWorkspace, type StoredChatMessage, type User,
} from "../api.js";
import { iconStyles, motionStyles } from "../theme.js";
import {
  applyImageFallback, libbyAssetCandidates, loadHideLibby, loadLibbyOutfit,
  normalizeEmotion, normalizeIntensity, type LibbyEmotion,
} from "../libby.js";
import { applyProgression, getIntensity, setIntensity } from "../libby-meter.js";
import { libbyHeatDelta, libbyOpener, libbyReact, libbyReply } from "../libby-voice.js";

const MODES = [
  { id: "sweet", label: "sweet", emotion: "happy", topic: "Soft, warm, and unhurried." },
  { id: "playful", label: "playful", emotion: "mischievous", topic: "Teasing and quick on their feet." },
  { id: "bold", label: "bold", emotion: "surprised", topic: "Blunt, uninhibited, and direct." },
  { id: "roleplay", label: "roleplay", emotion: "thinking", topic: "In character, in scene, in detail." },
] as const;

type EditorTab = "character" | "generation" | "images" | "profile";

const newID = () => crypto.randomUUID().replaceAll("-", "");
const timeOf = (ms: number) => new Date(ms).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
const defaultOptions = (): ChatOptions => ({ temperature: 0.8, top_p: 0.95, repetition_penalty: 1.1, max_tokens: 400 });

function emptyWorkspace(): ChatWorkspace {
  return { profile: { displayName: "", persona: "" }, characters: [], conversations: [], images: [] };
}

function optionNumber(options: ChatOptions | undefined, key: string, fallback: number): number {
  const value = options?.[key];
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function characterFromCard(parsed: Record<string, unknown>, fallbackName: string): ChatCharacter {
  const data = ((parsed.data && typeof parsed.data === "object") ? parsed.data : parsed) as Record<string, unknown>;
  const text = (key: string, fallback = "") => typeof data[key] === "string" ? data[key] as string : fallback;
  return {
    id:newID(), name:text("name", fallbackName), description:text("description"), personality:text("personality"),
    scenario:text("scenario"), firstMessage:text("first_mes", text("firstMessage")), exampleDialogue:text("mes_example", text("exampleDialogue")),
    systemPrompt:text("system_prompt", text("systemPrompt")), creatorNotes:text("creator_notes", text("creatorNotes")), promptWeight:1, defaultMode:"roleplay",
  };
}

/** SillyTavern PNG cards store base64 JSON in a PNG tEXt chunk named `chara`. */
async function characterFromPNG(file: File): Promise<ChatCharacter | null> {
  if (!file.name.toLowerCase().endsWith(".png")) return null;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const view = new DataView(bytes.buffer); let offset = 8;
  while (offset + 12 <= bytes.length) {
    const length = view.getUint32(offset); const type = new TextDecoder().decode(bytes.subarray(offset + 4, offset + 8));
    if (offset + 12 + length > bytes.length) break;
    if (type === "tEXt") {
      const raw = new TextDecoder().decode(bytes.subarray(offset + 8, offset + 8 + length));
      const split = raw.indexOf("\0");
      if (split > 0 && raw.slice(0, split) === "chara") {
        const json = new TextDecoder().decode(Uint8Array.from(atob(raw.slice(split + 1)), (char) => char.charCodeAt(0)));
        return characterFromCard(JSON.parse(json) as Record<string, unknown>, file.name.replace(/\.png$/i, ""));
      }
    }
    offset += length + 12;
  }
  return null;
}

/** Safe, tiny chat formatter: quotes are speech, **double stars** are actions. */
function formatted(text: string): TemplateResult {
  const token = /(\*\*[^*\n]+\*\*|\*[^*\n]+\*|~~[^~\n]+~~|`[^`\n]+`|"[^"\n]+")/g;
  const chunks = text.split(token);
  return html`${chunks.map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) return html`<strong class="action">${part.slice(2, -2)}</strong>`;
    if (part.startsWith("*") && part.endsWith("*")) return html`<em>${part.slice(1, -1)}</em>`;
    if (part.startsWith("~~") && part.endsWith("~~")) return html`<s>${part.slice(2, -2)}</s>`;
    if (part.startsWith("`") && part.endsWith("`")) return html`<code>${part.slice(1, -1)}</code>`;
    if (part.startsWith('"') && part.endsWith('"')) return html`<span class="speech">${part}</span>`;
    return part;
  })}`;
}

@customElement("oppai-chat")
export class OppaiChat extends LitElement {
  @property({ attribute: false }) user?: User;

  @state() private status: ChatStatus | null = null;
  @state() private workspace: ChatWorkspace = emptyWorkspace();
  @state() private characterID = "libby";
  @state() private conversationID = "";
  @state() private draft = "";
  @state() private busy = false;
  @state() private loading = true;
  @state() private settingsOpen = false;
  @state() private editorTab: EditorTab = "character";
  @state() private notice = "";
  @state() private noticeError = false;
  @state() private imageTags = "";
  @state() private models: ChatModels | null = null;
  @state() private mobileNavOpen = false;
  @query(".log") private log?: HTMLElement;
  private saveTimer = 0;
  private idleTimer = 0;
  private noticeTimer = 0;
  private resize?: ResizeObserver;

  static styles = [iconStyles, motionStyles, css`
    :host { display:block; height:100%; color:var(--md-sys-color-on-surface); font:400 15px/1.375 "gg sans","Noto Sans",Roboto,system-ui,sans-serif;
      --rail:var(--md-sys-color-surface-container-lowest); --side:var(--md-sys-color-surface-container-low);
      --main:var(--md-sys-color-surface); --hover:var(--md-sys-color-surface-container-high);
      --input:var(--md-sys-color-surface-container-highest); --muted:var(--md-sys-color-on-surface-variant);
      --line:var(--md-sys-color-outline-variant); --accent:var(--md-sys-color-primary); --on-accent:var(--md-sys-color-on-primary); }
    button,input,textarea,select { font:inherit; }
    button { color:inherit; }
    .client { position:relative; display:grid; grid-template-columns:64px 272px minmax(0,1fr); height:calc(100dvh - 112px); min-height:580px;
      border:1px solid var(--line); border-radius:18px; overflow:hidden; background:var(--main); box-shadow:0 18px 52px rgba(0,0,0,.12); }
    .rail { background:var(--rail); padding:12px 0; display:flex; flex-direction:column; align-items:center; gap:8px; overflow-y:auto; border-right:1px solid var(--line); }
    .guild { position:relative; width:44px; height:44px; flex:0 0 44px; border:0; border-radius:50%; background:var(--input); display:grid;
      place-items:center; overflow:hidden; cursor:pointer; transition:.15s; }
    .guild:hover,.guild.on { border-radius:14px; background:var(--accent); }
    .guild.on::before { content:""; position:absolute; left:0; width:4px; height:30px; border-radius:0 4px 4px 0; background:var(--md-sys-color-on-surface); }
    .guild img,.avatar img,.member-avatar img { width:100%; height:100%; object-fit:cover; object-position:top center; }
    .initial { font-weight:700; color:var(--on-accent); background:var(--accent); }
    .rail-sep { width:32px; height:2px; background:var(--line); }
    .side { min-width:0; display:flex; flex-direction:column; background:var(--side); }
    .side-head,.top { min-height:56px; flex:0 0 56px; display:flex; align-items:center; border-bottom:1px solid var(--line); }
    .side-head { padding:0 12px 0 16px; gap:8px; }
    .side-title { min-width:0; flex:1; }.side-title strong,.side-title span { display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .side-title span { color:var(--muted); font-size:11px; margin-top:1px; }
    .side-head button,.icon-btn { border:0; background:transparent; border-radius:5px; padding:5px; display:grid; place-items:center; cursor:pointer; color:var(--muted); }
    .side-head button:hover,.icon-btn:hover,.icon-btn.on { background:var(--hover); color:var(--md-sys-color-on-surface); }
    .cat { padding:17px 12px 7px 16px; color:var(--muted); font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; display:flex; }
    .cat button { margin-left:auto; border:0; background:transparent; cursor:pointer; color:var(--muted); }
    .convos { overflow-y:auto; min-height:0; }
    .convo-wrap { display:flex; align-items:center; margin:2px 8px; border-radius:9px; color:var(--muted); }
    .convo-wrap:hover,.convo-wrap.on { color:var(--md-sys-color-on-surface); background:var(--hover); }
    .convo { min-width:0; flex:1; padding:9px 8px; border:0; background:transparent; color:inherit; display:grid; grid-template-columns:22px minmax(0,1fr);
      gap:1px 7px; cursor:pointer; text-align:left; }
    .convo-icon { grid-row:1/3; align-self:center; }.convo-title { font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .convo-meta { color:var(--muted); font-size:10px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .convo-delete { opacity:0; margin-right:4px; border:0; border-radius:6px; padding:5px; background:transparent; color:var(--muted); cursor:pointer; }
    .convo-wrap:hover .convo-delete,.convo-wrap:focus-within .convo-delete { opacity:1; }.convo-delete:hover { color:var(--md-sys-color-error); background:var(--main); }
    .side-foot { margin-top:auto; background:var(--rail); padding:8px; display:flex; align-items:center; gap:8px; }
    .me-avatar { width:32px; height:32px; border-radius:50%; display:grid; place-items:center; }
    .me-copy { min-width:0; flex:1; } .me-name { font-size:13px; font-weight:650; overflow:hidden; text-overflow:ellipsis; }
    .me-sub { font-size:11px; color:var(--muted); display:flex; align-items:center; gap:5px; }.status-dot { width:7px; height:7px; border-radius:50%; background:#8a8f98; }.status-dot.online { background:#35c46a; }
    .main { display:flex; min-width:0; min-height:0; flex-direction:column; background:var(--main); position:relative; }
    .top { padding:0 10px 0 14px; gap:10px; }.mobile-nav { display:none!important; }
    .top-avatar { width:34px; height:34px; flex:0 0 34px; border-radius:50%; overflow:hidden; display:grid; place-items:center; }
    .top-title { min-width:0; }.top .name { display:block; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }.topic { display:block; color:var(--muted); font-size:11px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .quick-mode { width:auto; max-width:124px; margin-left:auto; border-radius:999px; padding:6px 28px 6px 10px; font-size:12px; font-weight:650; background-color:var(--input); }
    .top-actions { display:flex; }
    .log { min-height:0; flex:1 1 0; overflow-y:auto; overflow-anchor:auto; padding:12px 0 20px; scroll-behavior:smooth; }
    .intro { margin:8px 16px 16px; padding:18px; border:1px solid var(--line); border-radius:14px; background:linear-gradient(135deg,var(--side),transparent); display:grid; grid-template-columns:56px minmax(0,1fr); gap:0 13px; align-items:center; }
    .intro .round { grid-row:1/3; width:56px; height:56px; border-radius:50%; background:var(--input); display:grid; place-items:center; overflow:hidden; }
    .intro .round img { width:100%; height:100%; object-fit:cover; }.intro h2 { font-size:20px; margin:0 0 3px; }.intro p { color:var(--muted); margin:0; font-size:13px; }
    .row { display:grid; grid-template-columns:56px minmax(0,1fr); padding:2px 44px 2px 0; position:relative; }
    .row.first { margin-top:15px; }.row:hover { background:color-mix(in srgb,var(--md-sys-color-on-surface) 5%,transparent); }
    .avatar { grid-column:1; justify-self:center; width:40px; height:40px; border-radius:50%; overflow:hidden; display:grid; place-items:center; margin-top:2px; }
    .stamp { grid-column:1; justify-self:end; opacity:0; color:var(--muted); font-size:10px; padding-right:4px; line-height:22px; }.row:hover .stamp { opacity:1; }
    .message { grid-column:2; min-width:0; }.who { display:flex; align-items:baseline; gap:7px; }.author { font-weight:550; }.author.friend { color:var(--accent); }
    .bot { color:var(--on-accent); background:var(--accent); padding:1px 4px; border-radius:3px; font-size:9px; font-weight:700; }.when { color:var(--muted); font-size:11px; }
    .text { white-space:pre-wrap; overflow-wrap:anywhere; }.text .action { font-style:italic; font-weight:700; color:color-mix(in srgb,var(--accent) 72%,var(--md-sys-color-on-surface)); }
    .text .speech { color:var(--md-sys-color-on-surface); }.text code { background:var(--input); padding:1px 4px; border-radius:3px; }.text s { opacity:.7; }
    .sent-image { display:block; max-width:min(460px,100%); max-height:420px; border-radius:8px; margin-top:7px; object-fit:contain; background:var(--input); }
    .message-actions { opacity:0; position:absolute; right:8px; top:-8px; display:flex; border:1px solid var(--line); border-radius:5px; overflow:hidden; background:var(--side); }
    .row:hover .message-actions { opacity:1; }.message-actions button { border:0; background:transparent; padding:4px; cursor:pointer; color:var(--muted); }.message-actions button:hover { color:inherit; background:var(--hover); }
    .typing { padding:6px 16px 0 56px; color:var(--muted); font-size:13px; }.typing b { color:var(--md-sys-color-on-surface); }
    .notice { margin:4px 16px 8px; padding:9px 12px; border-left:3px solid var(--accent); background:var(--side); border-radius:7px; font-size:13px; }
    .notice.error { border-color:var(--md-sys-color-error); color:var(--md-sys-color-error); }
    .backend-state { padding:9px 16px; border-bottom:1px solid var(--line); background:var(--side); color:var(--muted); font-size:12px; }
    .backend-state strong { color:var(--md-sys-color-error); }
    form.composer-form { padding:0 16px 14px; }.composer { display:flex; align-items:flex-end; gap:9px; background:var(--input); border:1px solid transparent; border-radius:14px; padding:10px 12px; }
    .composer:focus-within { border-color:var(--accent); box-shadow:0 0 0 2px color-mix(in srgb,var(--accent) 18%,transparent); }
    .composer textarea { resize:none; border:0; outline:0; background:transparent; color:inherit; max-height:140px; min-height:22px; line-height:22px; flex:1; padding:0; }
    .composer button { align-self:flex-end; }.format-help { color:var(--muted); font-size:10px; padding:5px 4px 0; display:flex; justify-content:space-between; }.send-help::after { content:"Enter to send · Shift+Enter for a new line"; }
    .members { min-width:0; background:var(--side); padding:12px 8px; overflow-y:auto; }.member { display:flex; align-items:center; gap:9px; padding:6px 8px; border-radius:5px; }
    .member:hover { background:var(--hover); }.member-avatar { width:34px; height:34px; border-radius:50%; overflow:hidden; display:grid; place-items:center; }
    .member-name { font-size:13px; font-weight:650; color:var(--accent); }.member-status { font-size:11px; color:var(--muted); }
    .settings { position:absolute; inset:56px 0 0 0; z-index:5; overflow:auto; background:var(--side); box-shadow:0 10px 28px rgba(0,0,0,.28); }
    .settings-head { position:sticky; top:0; z-index:2; display:flex; align-items:center; gap:8px; padding:12px 16px 8px; background:var(--side); }.settings-head strong { flex:1; font-size:17px; }.settings-head span { display:block; color:var(--muted); font-size:11px; font-weight:400; }
    .tabs { position:sticky; top:55px; z-index:2; display:flex; gap:3px; padding:0 12px; border-bottom:1px solid var(--line); background:var(--side); overflow-x:auto; }.tab { border:0; background:transparent; color:var(--muted); padding:9px 10px; cursor:pointer; border-bottom:2px solid transparent; text-transform:capitalize; }
    .tab.on { color:inherit; border-color:var(--accent); }.panel { padding:14px 16px 18px; display:grid; gap:11px; }.grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    label { display:grid; gap:4px; color:var(--muted); font-size:11px; font-weight:650; text-transform:uppercase; }.field,select { box-sizing:border-box; width:100%; color:var(--md-sys-color-on-surface);
      background:var(--input); border:1px solid var(--line); border-radius:5px; padding:8px; outline:0; text-transform:none; font-weight:400; }
    textarea.field { min-height:66px; resize:vertical; }.range { display:grid; grid-template-columns:1fr 48px; gap:8px; align-items:center; }.range input { accent-color:var(--accent); }.range output { text-align:right; color:inherit; }
    .panel-actions { display:flex; flex-wrap:wrap; gap:7px; }.primary,.secondary,.danger { border:1px solid var(--line); border-radius:5px; padding:7px 11px; cursor:pointer; background:transparent; }
    .primary { background:var(--accent); border-color:var(--accent); color:var(--on-accent); }.danger { color:var(--md-sys-color-error); }.file { position:relative; overflow:hidden; }.file input { position:absolute; inset:0; opacity:0; cursor:pointer; }
    .image-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(120px,1fr)); gap:9px; }.image-card { background:var(--input); border-radius:7px; overflow:hidden; position:relative; }
    .image-card img { width:100%; height:110px; object-fit:cover; }.image-card div { padding:6px; font-size:11px; overflow-wrap:anywhere; }.image-card button { position:absolute; right:4px; top:4px; border:0; border-radius:50%; background:rgba(0,0,0,.7); color:white; cursor:pointer; }
    .empty { color:var(--muted); font-size:13px; }.nav-scrim { display:none; }
    @media(max-width:900px){.client{grid-template-columns:60px 236px minmax(0,1fr)}.side-head{padding-left:12px}}
    @media(max-width:700px){
      :host{height:auto}.client{display:block;height:calc(100dvh - 72px);min-height:520px;border:0;border-radius:0;box-shadow:none}.main{height:100%}
      .rail,.side{display:none;position:absolute;top:0;bottom:0;z-index:12}.client.nav-open .rail{display:flex;left:0;width:60px}.client.nav-open .side{display:flex;left:60px;width:min(286px,calc(100% - 60px))}
      .client.nav-open .nav-scrim{display:block;position:absolute;inset:0;z-index:11;border:0;background:rgba(0,0,0,.55)}
      .mobile-nav{display:grid!important}.top{padding-left:4px;gap:7px}.quick-mode{max-width:96px;padding-left:8px}.topic{max-width:130px}.grid{grid-template-columns:1fr}
      .row{grid-template-columns:48px minmax(0,1fr);padding-right:12px}.avatar{width:34px;height:34px}.typing{padding-left:48px}.destructive-action{display:none}.format-help{display:none}
      .intro{margin:6px 10px 12px;padding:13px}.settings{inset:56px 0 0}.panel{padding-left:12px;padding-right:12px}.message-actions{opacity:1;position:static;grid-column:2;justify-self:end;margin-top:3px;border:0;background:transparent}
    }
  `];

  connectedCallback() {
    super.connectedCallback();
    void this.load();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this.saveTimer); window.clearTimeout(this.idleTimer); window.clearTimeout(this.noticeTimer);
    this.resize?.disconnect();
  }

  protected firstUpdated() {
    this.resize = new ResizeObserver(() => void this.scrollToEnd(false));
    if (this.log) this.resize.observe(this.log);
  }

  private get activeCharacter(): ChatCharacter | undefined {
    return this.workspace.characters.find((character) => character.id === this.characterID) ?? this.workspace.characters[0];
  }

  private get activeConversation(): ChatConversation | undefined {
    return this.workspace.conversations.find((conversation) => conversation.id === this.conversationID);
  }

  private conversationsFor(characterID = this.characterID): ChatConversation[] {
    return this.workspace.conversations.filter((conversation) => conversation.characterId === characterID)
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }

  private async load() {
    try {
      const [status, workspace] = await Promise.all([api.chatStatus(), api.chatWorkspace()]);
      this.status = status; this.workspace = workspace;
      this.characterID = workspace.characters[0]?.id ?? "libby";
      const existing = this.conversationsFor(this.characterID)[0];
      if (existing) this.activateConversation(existing.id);
      else this.newConversation(false);
      if (status.modelBackend) void this.refreshModels(true);
    } catch (error) { this.say((error as Error).message, true); }
    finally { this.loading = false; }
  }

  private say(message: string, error = false) {
    this.notice = message; this.noticeError = error;
    window.clearTimeout(this.noticeTimer); this.noticeTimer = window.setTimeout(() => (this.notice = ""), 4200);
  }

  private async refreshModels(quiet = false) {
    try {
      const [models, status] = await Promise.all([api.chatModels(), api.chatStatus()]);
      this.models = models;
      this.status = status;
      if (!quiet) this.say(status.enabled ? `Connected to ${status.model || "the loaded model"}.` : status.message || "No model is loaded.", !status.enabled);
    } catch (error) { if (!quiet) this.say((error as Error).message, true); }
  }

  private touchWorkspace() {
    this.workspace = { ...this.workspace, characters: [...this.workspace.characters], conversations: [...this.workspace.conversations], images: [...this.workspace.images] };
    window.clearTimeout(this.saveTimer); this.saveTimer = window.setTimeout(() => void this.saveWorkspace(), 450);
  }

  private async saveWorkspace() {
    window.clearTimeout(this.saveTimer);
    try { this.workspace = await api.saveChatWorkspace(this.workspace); }
    catch (error) { this.say(`Couldn't save chat: ${(error as Error).message}`, true); }
  }

  private async scrollToEnd(smooth = true) {
    await this.updateComplete;
    requestAnimationFrame(() => {
      if (!this.log) return;
      this.log.scrollTo({ top: this.log.scrollHeight, behavior: smooth ? "smooth" : "auto" });
    });
  }

  private armIdle = () => {
    window.clearTimeout(this.idleTimer);
    if (this.characterID !== "libby") return;
    this.idleTimer = window.setTimeout(() => {
      if (this.busy || document.visibilityState !== "visible") return this.armIdle();
      const conversation = this.activeConversation; if (!conversation) return;
      const line = libbyReact("idle", { intensity: conversation.intensity });
      conversation.emotion = line.emotion;
      conversation.messages.push({ id:newID(), role:"assistant", content:line.message, at:Date.now() });
      conversation.updatedAt = Date.now(); this.touchWorkspace(); void this.scrollToEnd(); this.armIdle();
    }, 60_000);
  };

  private activateCharacter(id: string) {
    this.characterID = id;
    this.mobileNavOpen = false;
    const conversation = this.conversationsFor(id)[0];
    if (conversation) this.activateConversation(conversation.id); else this.newConversation();
  }

  private activateConversation(id: string) {
    const conversation = this.workspace.conversations.find((item) => item.id === id); if (!conversation) return;
    this.conversationID = id; this.characterID = conversation.characterId;
    this.mobileNavOpen = false;
    setIntensity(conversation.intensity); this.armIdle(); void this.scrollToEnd(false);
  }

  private newConversation(save = true) {
    const character = this.activeCharacter; if (!character) return;
    const now = Date.now();
    let opener = character.firstMessage?.trim() ?? "";
    let emotion: LibbyEmotion = normalizeEmotion(MODES.find((mode) => mode.id === character.defaultMode)?.emotion);
    if (character.id === "libby" && !opener) { const line = libbyOpener(character.defaultMode, getIntensity()); opener = line.message; emotion = line.emotion; }
    const conversation: ChatConversation = {
      id:newID(), characterId:character.id, title:"New conversation", mode:character.defaultMode || "sweet",
      emotion, intensity:character.id === "libby" ? getIntensity() : 1, progress:character.id === "libby" ? getIntensity() : 1, options:defaultOptions(),
      messages:opener ? [{ id:newID(), role:"assistant", content:opener, at:now }] : [], createdAt:now, updatedAt:now,
    };
    this.workspace.conversations.push(conversation); this.conversationID = conversation.id;
    this.mobileNavOpen = false;
    this.touchWorkspace(); if (save) this.say(`Started a new chat with ${character.name}.`); this.armIdle(); void this.scrollToEnd(false);
  }

  private clearConversation() {
    const conversation = this.activeConversation; if (!conversation || !confirm("Clear every message in this conversation?")) return;
    conversation.messages = []; conversation.title = "New conversation"; conversation.updatedAt = Date.now(); this.touchWorkspace(); this.say("Conversation cleared.");
  }

  private deleteConversation(id: string) {
    if (!confirm("Delete this conversation?")) return;
    this.workspace.conversations = this.workspace.conversations.filter((conversation) => conversation.id !== id);
    const next = this.conversationsFor()[0]; if (next) this.conversationID = next.id; else this.newConversation(false);
    this.touchWorkspace();
  }

  private updateConversation(patch: Partial<ChatConversation>) {
    const conversation = this.activeConversation; if (!conversation) return;
    Object.assign(conversation, patch, { updatedAt:Date.now() });
    if (patch.intensity != null) { conversation.progress = patch.intensity; setIntensity(patch.intensity); }
    this.touchWorkspace();
  }

  private updateOption(key: string, value: number) {
    const conversation = this.activeConversation; if (!conversation) return;
    conversation.options = { ...(conversation.options ?? {}), [key]:value }; conversation.updatedAt = Date.now(); this.touchWorkspace();
  }

  private onKey(event: KeyboardEvent) { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void this.send(); } }

  private async send() {
    const content = this.draft.trim(), conversation = this.activeConversation, character = this.activeCharacter;
    if (!content || !conversation || !character || this.busy) return;
    const userMessage: StoredChatMessage = { id:newID(), role:"user", content, at:Date.now() };
    conversation.messages.push(userMessage); conversation.updatedAt = Date.now();
    if (conversation.title === "New conversation") conversation.title = content.slice(0, 42);
    this.draft = ""; this.busy = true; this.notice = ""; this.touchWorkspace(); this.armIdle(); void this.scrollToEnd();
    if (!this.status?.enabled && (this.status?.configured || this.status?.modelBackend)) {
      try { this.status = await api.chatStatus(); } catch { /* The chat request or local fallback below provides the user-facing result. */ }
    }
    if (!this.status?.enabled) {
      if (character.id !== "libby") { this.busy = false; this.say(this.status?.message || "Load a model in text-generation-webui, then refresh backend status.", true); return; }
      const progression = applyProgression(conversation.progress ?? conversation.intensity, libbyHeatDelta(content, conversation.mode));
      const line = libbyReply(content, conversation.mode, normalizeEmotion(conversation.emotion), progression.intensity, false);
      await new Promise((resolve) => setTimeout(resolve, 350 + Math.random() * 450));
      conversation.emotion = line.emotion; conversation.progress = progression.progress; conversation.intensity = setIntensity(progression.intensity);
      conversation.messages.push({ id:newID(), role:"assistant", content:line.message, at:Date.now() });
      conversation.updatedAt = Date.now(); this.busy = false; this.touchWorkspace(); void this.scrollToEnd(); return;
    }
    try {
      const history: ChatMessage[] = conversation.messages.map(({ role, content:text }) => ({ role, content:text }));
      const result = await api.chat(conversation.mode, history, conversation.emotion, conversation.intensity, conversation.options, character.id);
      conversation.emotion = normalizeEmotion(result.emotion ?? conversation.emotion);
      const requested = normalizeIntensity(result.intensity ?? conversation.intensity);
      const progression = applyProgression(conversation.progress ?? conversation.intensity, requested - conversation.intensity);
      conversation.progress = progression.progress; conversation.intensity = setIntensity(progression.intensity);
      conversation.messages.push({ id:newID(), role:"assistant", content:result.message, at:Date.now(), imageId:result.imageId || undefined });
      conversation.updatedAt = Date.now(); this.touchWorkspace(); void this.scrollToEnd();
    } catch (error) {
      if (this.status?.configured || this.status?.modelBackend) {
        try { this.status = await api.chatStatus(); } catch { /* Keep the generation error when the readiness check also fails. */ }
      }
      this.say(!this.status?.enabled && this.status?.message ? this.status.message : (error as Error).message, true);
    }
    finally { this.busy = false; }
  }

  private editMessage(message: StoredChatMessage) {
    const changed = prompt("Edit message", message.content)?.trim(); if (!changed || changed === message.content) return;
    message.content = changed; const conversation = this.activeConversation; if (conversation) conversation.updatedAt = Date.now(); this.touchWorkspace();
  }

  private deleteMessage(id: string) {
    const conversation = this.activeConversation; if (!conversation) return;
    conversation.messages = conversation.messages.filter((message) => message.id !== id); conversation.updatedAt = Date.now(); this.touchWorkspace();
  }

  private updateCharacter(field: keyof ChatCharacter, value: string | number) {
    const character = this.activeCharacter; if (!character) return;
    (character as unknown as Record<string, string | number>)[field] = value; this.touchWorkspace();
  }

  private addCharacter() {
    const character: ChatCharacter = { id:newID(), name:"New friend", promptWeight:1, defaultMode:"sweet", firstMessage:"Hey! It's nice to meet you." };
    this.workspace.characters.push(character); this.characterID = character.id; this.touchWorkspace(); this.newConversation(false); this.settingsOpen = true; this.editorTab = "character";
  }

  private deleteCharacter() {
    const character = this.activeCharacter; if (!character || character.builtIn || !confirm(`Remove ${character.name} and all of their conversations?`)) return;
    this.workspace.characters = this.workspace.characters.filter((item) => item.id !== character.id);
    this.workspace.conversations = this.workspace.conversations.filter((item) => item.characterId !== character.id);
    this.characterID = this.workspace.characters[0]?.id ?? "libby"; const next = this.conversationsFor()[0]; if (next) this.conversationID = next.id; else this.newConversation(false); this.touchWorkspace();
  }

  private async importCard(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]; if (!file) return;
    try {
      if (file.type.startsWith("image/")) {
        const character = await characterFromPNG(file) ?? { id:newID(), name:file.name.replace(/\.[^.]+$/, "") || "New friend", promptWeight:1, defaultMode:"sweet" };
        this.workspace.characters.push(character); this.characterID = character.id; await this.saveWorkspace();
        const image = await api.uploadChatImage({ characterId:character.id, name:`${character.name} avatar`, imageData:await this.readDataURL(file), tags:["portrait"] });
        this.workspace.images.push(image); character.avatarImageId = image.id; this.touchWorkspace(); this.newConversation(false); this.say("Friend added and image scanned."); return;
      }
      const character = characterFromCard(JSON.parse(await file.text()) as Record<string, unknown>, file.name.replace(/\.json$/i, ""));
      this.workspace.characters.push(character); this.characterID = character.id; this.touchWorkspace(); this.newConversation(false); this.say(`${character.name} joined your friends.`);
    } catch (error) { this.say(`Couldn't import card: ${(error as Error).message}`, true); }
    finally { (event.target as HTMLInputElement).value = ""; }
  }

  private readDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = () => reject(reader.error); reader.readAsDataURL(file); });
  }

  private async uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0], character = this.activeCharacter; if (!file || !character) return;
    try {
      this.say("Scanning image locally…");
      const tags = this.imageTags.split(",").map((tag) => tag.trim()).filter(Boolean);
      const image = await api.uploadChatImage({ characterId:character.id, name:file.name, imageData:await this.readDataURL(file), tags });
      this.workspace.images.push(image); if (!character.avatarImageId) character.avatarImageId = image.id;
      this.imageTags = ""; this.touchWorkspace(); this.say(`Image scanned: ${image.tags.join(", ") || "no content tags found"}.`);
    } catch (error) { this.say((error as Error).message, true); }
    finally { (event.target as HTMLInputElement).value = ""; }
  }

  private async deleteImage(image: ChatImage) {
    if (!confirm(`Delete ${image.name}?`)) return;
    try { await api.deleteChatImage(image.id); this.workspace.images = this.workspace.images.filter((item) => item.id !== image.id); const c = this.activeCharacter; if (c?.avatarImageId === image.id) c.avatarImageId = ""; this.touchWorkspace(); }
    catch (error) { this.say((error as Error).message, true); }
  }

  private avatar(character: ChatCharacter, className: string) {
    if (character.avatarImageId) return html`<span class=${className}><img src=${api.chatImageURL(character.avatarImageId)} alt="" /></span>`;
    if (character.id === "libby" && !loadHideLibby()) {
      const conversation = this.activeConversation; const assets = libbyAssetCandidates(normalizeEmotion(conversation?.emotion), conversation?.intensity ?? 1, loadLibbyOutfit());
      return html`<span class=${className}><img src=${assets[0]} data-fallback-index="0" alt="Libby" @error=${(event:Event) => applyImageFallback(event.target as HTMLImageElement, assets)} /></span>`;
    }
    return html`<span class="${className} initial">${character.name.slice(0,2).toUpperCase()}</span>`;
  }

  private renderRail() {
    return html`<nav class="rail" aria-label="Friends">
      ${this.workspace.characters.map((character, index) => html`
        ${index === 1 ? html`<span class="rail-sep"></span>` : nothing}
        <button class="guild ${character.id === this.characterID ? "on" : ""}" title=${character.name} @click=${() => this.activateCharacter(character.id)}>
          ${this.avatar(character, "member-avatar")}
        </button>`)}
      <button class="guild" title="Add a friend" @click=${this.addCharacter}><span class="material-symbols-rounded">add</span></button>
    </nav>`;
  }

  private renderSidebar() {
    const character = this.activeCharacter, me = this.workspace.profile.displayName || this.user?.username || "You";
    return html`<aside class="side">
      <div class="side-head"><div class="side-title"><strong>${character?.name ?? "Chat"}</strong><span>Choose a conversation</span></div><button title="Start a new conversation" aria-label="Start a new conversation" @click=${() => this.newConversation()}><span class="material-symbols-rounded">add_comment</span></button></div>
      <div class="cat"><span>Conversations · ${this.conversationsFor().length}</span><button title="New conversation" @click=${() => this.newConversation()}>+</button></div>
      <div class="convos">${this.conversationsFor().map((conversation) => html`
        <div class="convo-wrap ${conversation.id === this.conversationID ? "on" : ""}">
          <button class="convo" @click=${() => this.activateConversation(conversation.id)} aria-current=${conversation.id === this.conversationID ? "page" : "false"}>
            <span class="convo-icon material-symbols-rounded" style="font-size:18px">forum</span><span class="convo-title">${conversation.title}</span>
            <span class="convo-meta">${conversation.messages.length} messages · ${timeOf(conversation.updatedAt)}</span>
          </button>
          <button class="convo-delete" title="Delete conversation" aria-label="Delete ${conversation.title}" @click=${() => this.deleteConversation(conversation.id)}><span class="material-symbols-rounded" style="font-size:16px">delete</span></button>
        </div>`)}
      </div>
      <div class="side-foot">${this.workspace.profile.avatarImageId
        ? html`<span class="me-avatar"><img src=${api.chatImageURL(this.workspace.profile.avatarImageId)} alt="" /></span>`
        : html`<span class="me-avatar initial">${me.slice(0,2).toUpperCase()}</span>`}
        <div class="me-copy"><div class="me-name">${me}</div><div class="me-sub"><span class="status-dot ${this.status?.enabled ? "online" : ""}"></span>${this.status?.enabled ? `Model: ${this.status.model}` : character?.id === "libby" ? "Libby local replies" : "Model offline"}</div></div>
        <button class="icon-btn" title="Profile" @click=${() => { this.settingsOpen = true; this.editorTab = "profile"; }}><span class="material-symbols-rounded">manage_accounts</span></button>
      </div>
    </aside>`;
  }

  private renderSettings() {
    const character = this.activeCharacter, conversation = this.activeConversation; if (!character || !conversation) return nothing;
    return html`<section class="settings">
      <div class="settings-head"><strong>Chat settings<span>Changes sync between WebUI and Android</span></strong><button class="icon-btn" title="Close settings" aria-label="Close settings" @click=${() => (this.settingsOpen=false)}><span class="material-symbols-rounded">close</span></button></div>
      <div class="tabs">${(["character","generation","images","profile"] as EditorTab[]).map((tab) => html`
        <button class="tab ${this.editorTab === tab ? "on" : ""}" @click=${() => (this.editorTab = tab)}>${tab}</button>`)}</div>
      ${this.editorTab === "character" ? this.renderCharacterPanel(character) : nothing}
      ${this.editorTab === "generation" ? this.renderGenerationPanel(conversation) : nothing}
      ${this.editorTab === "images" ? this.renderImagesPanel(character) : nothing}
      ${this.editorTab === "profile" ? this.renderProfilePanel() : nothing}
    </section>`;
  }

  private field(label: string, key: keyof ChatCharacter, value: string, rows = 1) {
    return html`<label>${label}${rows > 1
      ? html`<textarea class="field" rows=${rows} .value=${value} @change=${(event:Event) => this.updateCharacter(key, (event.target as HTMLTextAreaElement).value)}></textarea>`
      : html`<input class="field" .value=${value} @change=${(event:Event) => this.updateCharacter(key, (event.target as HTMLInputElement).value)} />`}</label>`;
  }

  private renderCharacterPanel(character: ChatCharacter) {
    return html`<div class="panel">
      <div class="grid">${this.field("Name", "name", character.name)}<label>Default mode<select .value=${character.defaultMode} @change=${(event:Event) => this.updateCharacter("defaultMode", (event.target as HTMLSelectElement).value)}>${MODES.map((mode) => html`<option value=${mode.id}>${mode.label}</option>`)}</select></label></div>
      ${this.field("Description", "description", character.description ?? "", 2)}
      <div class="grid">${this.field("Personality", "personality", character.personality ?? "", 3)}${this.field("Scenario", "scenario", character.scenario ?? "", 3)}</div>
      ${this.field("First message", "firstMessage", character.firstMessage ?? "", 2)}
      ${this.field("System prompt / card instructions", "systemPrompt", character.systemPrompt ?? "", 3)}
      ${this.field("Example dialogue", "exampleDialogue", character.exampleDialogue ?? "", 3)}
      ${this.field("Creator notes (not sent to model)", "creatorNotes", character.creatorNotes ?? "", 2)}
      <label>Character-card weight <span class="range"><input type="range" min="0.1" max="2" step="0.05" .value=${String(character.promptWeight || 1)} @input=${(event:Event) => this.updateCharacter("promptWeight", Number((event.target as HTMLInputElement).value))}/><output>${(character.promptWeight || 1).toFixed(2)}</output></span></label>
      <div class="panel-actions"><button class="primary" @click=${() => void this.saveWorkspace()}>Save card</button><label class="secondary file">Import SillyTavern JSON or portrait<input type="file" accept="application/json,.json,image/*" @change=${this.importCard}/></label>${character.builtIn ? html`<span class="empty">Libby's built-in card is editable.</span>` : html`<button class="danger" @click=${this.deleteCharacter}>Remove friend</button>`}</div>
    </div>`;
  }

  private renderGenerationPanel(conversation: ChatConversation) {
    const range = (label:string,key:string,min:number,max:number,step:number,fallback:number) => html`<label>${label}<span class="range"><input type="range" min=${min} max=${max} step=${step} .value=${String(optionNumber(conversation.options,key,fallback))} @input=${(event:Event) => this.updateOption(key,Number((event.target as HTMLInputElement).value))}/><output>${optionNumber(conversation.options,key,fallback)}</output></span></label>`;
    return html`<div class="panel">
      <label>Text-generation backend<div class="panel-actions"><strong>${this.models?.loaded || this.status?.model || "No model loaded"}</strong><button class="secondary" @click=${()=>void this.refreshModels()}>Refresh status</button></div></label>
      <div class="empty">Load or unload models in text-generation-webui’s own WebUI. OppaiLib deliberately keeps model management read-only so it cannot destabilize the Docker container.</div>
      ${this.models?.models.length ? html`<label>Models visible to the backend<select disabled><option>${this.models.models.join(" · ")}</option></select></label>` : nothing}
      <div class="grid">
      <label>Conversation mode<select .value=${conversation.mode} @change=${(event:Event) => this.updateConversation({mode:(event.target as HTMLSelectElement).value})}>${MODES.map((mode) => html`<option value=${mode.id}>${mode.label}</option>`)}</select></label>
      <label>Displayed emotion<select .value=${conversation.emotion} @change=${(event:Event) => this.updateConversation({emotion:(event.target as HTMLSelectElement).value})}>${["neutral","happy","mischievous","surprised","thinking"].map((emotion) => html`<option>${emotion}</option>`)}</select></label>
      ${range("Temperature","temperature",0,2,.05,.8)}${range("Top P","top_p",.05,1,.05,.95)}
      ${range("Repetition penalty","repetition_penalty",1,2,.05,1.1)}${range("Max reply tokens","max_tokens",64,2048,32,400)}
      <label>Horniness / intensity <span class="range"><input type="range" min="1" max="5" step="1" .value=${String(conversation.intensity)} @input=${(event:Event) => this.updateConversation({intensity:Number((event.target as HTMLInputElement).value)})}/><output>${conversation.intensity}/5</output></span></label>
    </div>
    <label>Advanced API options<textarea class="field" rows="5" .value=${JSON.stringify(conversation.options ?? {}, null, 2)} @change=${(event:Event) => { try { const parsed=JSON.parse((event.target as HTMLTextAreaElement).value) as ChatOptions; this.updateConversation({options:parsed}); } catch { this.say("Advanced options must be valid JSON.",true); } }}></textarea></label>
    <div class="panel-actions"><button class="primary" @click=${() => void this.saveWorkspace()}>Save for this conversation</button><button class="secondary" @click=${() => { conversation.options=defaultOptions(); this.touchWorkspace(); }}>Reset controls</button></div></div>`;
  }

  private renderImagesPanel(character: ChatCharacter) {
    const images = this.workspace.images.filter((image) => image.characterId === character.id);
    return html`<div class="panel"><p class="empty">Images are scanned locally. A character may attach one when its tags match the current exchange.</p>
      <div class="grid"><label>Extra matching tags<input class="field" placeholder="beach, happy, bedroom" .value=${this.imageTags} @input=${(event:Event) => (this.imageTags=(event.target as HTMLInputElement).value)}/></label>
      <label class="secondary file" style="align-self:end;text-align:center">Upload and scan image<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" @change=${this.uploadImage}/></label></div>
      <div class="image-grid">${images.map((image) => html`<article class="image-card"><img src=${api.chatImageURL(image.id)} alt=${image.name}/><button title="Delete" @click=${() => void this.deleteImage(image)}>×</button><div><b>${image.name}</b><br/>${image.tags.join(", ") || "No tags"}${character.avatarImageId === image.id ? html`<br/><b>Avatar</b>` : nothing}<br/><button class="secondary" @click=${() => this.updateCharacter("avatarImageId",image.id)}>Use avatar</button></div></article>`)}</div>
      ${images.length ? nothing : html`<div class="empty">No images for ${character.name} yet.</div>`}
    </div>`;
  }

  private renderProfilePanel() {
    const profile = this.workspace.profile;
    return html`<div class="panel"><p class="empty">This profile is shared by WebUI and APK and is included in character context.</p>
      <label>Display name<input class="field" .value=${profile.displayName} @change=${(event:Event) => { profile.displayName=(event.target as HTMLInputElement).value; this.touchWorkspace(); }}/></label>
      <label>Your persona<textarea class="field" rows="5" placeholder="How friends should know and address you…" .value=${profile.persona} @change=${(event:Event) => { profile.persona=(event.target as HTMLTextAreaElement).value; this.touchWorkspace(); }}></textarea></label>
      <div class="panel-actions"><button class="primary" @click=${() => void this.saveWorkspace()}>Save profile</button></div></div>`;
  }

  private renderEntry(message: StoredChatMessage, previous?: StoredChatMessage) {
    const character = this.activeCharacter; if (!character) return nothing;
    const grouped = previous?.role === message.role && message.at - previous.at < 5*60_000;
    const friend = message.role === "assistant", name = friend ? character.name : (this.workspace.profile.displayName || this.user?.username || "You");
    return html`<article class="row ${grouped ? "" : "first"} ${friend ? "from-friend" : "from-user"}">${grouped ? html`<span class="stamp">${timeOf(message.at)}</span>` : (friend ? this.avatar(character,"avatar") : html`<span class="avatar initial">${name.slice(0,2).toUpperCase()}</span>`)}
      <div class="message">${grouped ? nothing : html`<div class="who"><span class="author ${friend ? "friend" : ""}">${name}</span>${friend ? html`<span class="bot">BOT</span>` : nothing}<span class="when">Today at ${timeOf(message.at)}</span></div>`}<div class="text">${formatted(message.content)}</div>${message.imageId ? html`<img class="sent-image" src=${api.chatImageURL(message.imageId)} alt="Image sent by ${name}"/>` : nothing}</div>
      <span class="message-actions"><button title="Copy" @click=${() => void navigator.clipboard.writeText(message.content)}><span class="material-symbols-rounded" style="font-size:16px">content_copy</span></button><button title="Edit" @click=${() => this.editMessage(message)}><span class="material-symbols-rounded" style="font-size:16px">edit</span></button><button title="Delete" @click=${() => this.deleteMessage(message.id)}><span class="material-symbols-rounded" style="font-size:16px">delete</span></button></span>
    </article>`;
  }

  render() {
    const character=this.activeCharacter, conversation=this.activeConversation;
    if (this.loading) return html`<div class="client"><section class="main" style="grid-column:1/-1;place-items:center;display:grid"><md-circular-progress indeterminate></md-circular-progress></section></div>`;
    if (!character || !conversation) return html`<div class="client"><section class="main" style="grid-column:1/-1;padding:24px">Chat workspace is unavailable.</section></div>`;
    const channel=MODES.find((mode)=>mode.id===conversation.mode)??MODES[0];
    return html`<div class="client ${this.mobileNavOpen ? "nav-open" : ""}" @pointerdown=${this.armIdle}><button class="nav-scrim" aria-label="Close chat navigation" @click=${() => (this.mobileNavOpen=false)}></button>${this.renderRail()}${this.renderSidebar()}
      <main class="main"><header class="top"><button class="icon-btn mobile-nav" title="Friends and conversations" aria-label="Open friends and conversations" @click=${() => (this.mobileNavOpen=true)}><span class="material-symbols-rounded">menu</span></button>${this.avatar(character,"top-avatar")}<span class="top-title"><span class="name">${character.name}</span><span class="topic">${this.status?.enabled ? this.status.model : character.id === "libby" ? "Local replies" : "Model offline"} · ${channel.topic}</span></span><select class="quick-mode" aria-label="Conversation mode" title="Conversation mode" .value=${conversation.mode} @change=${(event:Event) => this.updateConversation({mode:(event.target as HTMLSelectElement).value})}>${MODES.map((mode)=>html`<option value=${mode.id}>${mode.label}</option>`)}</select><span class="top-actions"><button class="icon-btn" title="New conversation" aria-label="New conversation" @click=${() => this.newConversation()}><span class="material-symbols-rounded">add_comment</span></button><button class="icon-btn destructive-action" title="Clear messages" aria-label="Clear messages" @click=${this.clearConversation}><span class="material-symbols-rounded">delete_sweep</span></button><button class="icon-btn ${this.settingsOpen?"on":""}" title="Chat settings" aria-label="Chat settings" @click=${()=>(this.settingsOpen=!this.settingsOpen)}><span class="material-symbols-rounded">tune</span></button></span></header>
        ${this.settingsOpen?this.renderSettings():nothing}
        ${this.status?.modelBackend && !this.status.enabled ? html`<div class="backend-state" role="status"><strong>Text generation offline.</strong> ${this.status.message || "Load a model in text-generation-webui, then refresh status."}</div>` : nothing}
        <section class="log"><div class="intro">${this.avatar(character,"round")}<h2>${character.name}</h2><p>${character.description || `This is the beginning of your conversation with ${character.name}.`}${this.status?.enabled?` Running on ${this.status.model}.`:character.id === "libby" ? " Libby is using built-in local replies." : " Connect a local model to start chatting."}</p></div>
          ${conversation.messages.map((message,index)=>this.renderEntry(message,conversation.messages[index-1]))}${this.busy?html`<div class="typing"><b>${character.name}</b> is typing…</div>`:nothing}
        </section>${this.notice?html`<div class="notice ${this.noticeError?"error":""}" role=${this.noticeError?"alert":"status"}>${this.notice}</div>`:nothing}
        <form class="composer-form" @submit=${(event:Event)=>{event.preventDefault();void this.send();}}><div class="composer"><textarea rows="1" aria-label=${`Message ${character.name}`} placeholder=${`Message ${character.name}…`} .value=${this.draft} @input=${(event:Event)=>(this.draft=(event.target as HTMLTextAreaElement).value)} @keydown=${this.onKey} ?disabled=${this.busy}></textarea><button class="icon-btn" type="submit" title="Send message" aria-label="Send message" ?disabled=${!this.draft.trim()||this.busy}><span class="material-symbols-rounded">send</span></button></div><div class="format-help"><span>"speech" · **action** · *emphasis* · ~~strike~~ · &#96;code&#96;</span><span class="send-help"></span></div></form>
      </main>
    </div>`;
  }
}

declare global { interface HTMLElementTagNameMap { "oppai-chat": OppaiChat; } }
