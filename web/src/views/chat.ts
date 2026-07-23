import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { keyed } from "lit/directives/keyed.js";
import {
  api, PROFILE_IMAGE_OWNER, type ChatCharacter, type ChatConversation, type ChatImage, type ChatMessage,
  type ChatModels, type ChatOptions, type ChatStatus, type ChatWorkspace, type LibbyContext,
  type StoredChatMessage, type User,
} from "../api.js";
import { iconStyles, motionStyles } from "../theme.js";
import {
  applyImageFallback, libbyAssetCandidates, loadHideLibby, loadLibbyOutfit,
  normalizeEmotion, normalizeIntensity, type LibbyEmotion,
} from "../libby.js";
import { applyProgression, getIntensity, setIntensity } from "../libby-meter.js";
import { libbyHeatDelta, libbyLibraryAnswer, libbyOpener, libbyReact, libbyReply, type LibbyLine } from "../libby-voice.js";
import { menuDivider, nativeMenuWanted, openMenu, type MenuItem } from "../context-menu.js";
import { SHARE_EVENT, takePendingShare } from "../chat-share.js";

const MODES = [
  { id: "sweet", label: "sweet", emotion: "happy", topic: "Soft, warm, and unhurried." },
  { id: "playful", label: "playful", emotion: "mischievous", topic: "Teasing and quick on their feet." },
  { id: "bold", label: "bold", emotion: "surprised", topic: "Blunt, uninhibited, and direct." },
  { id: "roleplay", label: "roleplay", emotion: "thinking", topic: "In character, in scene, in detail." },
  { id: "horny", label: "horny", emotion: "mischievous", topic: "Explicit, leading, and sending pictures." },
] as const;

type EditorTab = "character" | "model" | "images" | "profile";

/**
 * A picture attached to the composer but not yet sent. It is already uploaded and
 * tagged by the time it lands here — the upload is what produces the tags, and the
 * tags are what a text-only model needs in order to react to it.
 */
interface PendingPhoto {
  imageId: string;
  tags: string[];
  name: string;
}

/** Chat settings categories, laid out as a Discord-style left rail. */
const EDITOR_TABS: { id: EditorTab; label: string; icon: string; group: string }[] = [
  { id: "character", label: "Character card", icon: "badge", group: "Friend" },
  { id: "images", label: "Images", icon: "image", group: "Friend" },
  { id: "model", label: "Model & generation", icon: "memory", group: "Chat" },
  { id: "profile", label: "Your profile", icon: "person", group: "Chat" },
];

/** How long the AI waits before speaking again unprompted, and how many turns it
    may take before it stops and waits for the user. Both are deliberately modest:
    a self-driving conversation is a party trick until it fills the log unattended. */
const AUTO_DELAY_MS = 14_000;
const AUTO_MAX_TURNS = 8;
const AUTO_KEY = "oppai_chat_autopilot";

/** Reserved image owner for a character's avatar, so a picture set as the face
    never joins that character's gallery nor gets attached to a reply. Mirrors
    PROFILE_IMAGE_OWNER, which does the same for the user's own picture. */
const avatarOwner = (characterID: string) => `avatar:${characterID}`;

/**
 * A 32-hex id, the shape the server validates conversation and message ids against.
 *
 * crypto.randomUUID only exists in a secure context, so it is missing when the server
 * is reached over plain HTTP on a LAN — a supported way to run this. Falling back to
 * getRandomValues keeps ids working there instead of throwing on the first render.
 */
const newID = () => {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID().replaceAll("-", "");
  return [...crypto.getRandomValues(new Uint8Array(16))]
    .map((byte) => byte.toString(16).padStart(2, "0")).join("");
};
const timeOf = (ms: number) => new Date(ms).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
const defaultOptions = (): ChatOptions => ({ temperature: 0.8, top_p: 0.95, repetition_penalty: 1.1, max_tokens: 400 });

function emptyWorkspace(): ChatWorkspace {
  return { profile: { displayName: "", persona: "" }, characters: [], conversations: [], images: [] };
}

/**
 * The stand-in workspace used when the stored one cannot be read.
 *
 * Libby answers locally with no server round trip, so a failed load leaves the screen
 * usable rather than dead. It is deliberately never persisted — see workspaceLoaded,
 * which blocks saving while this is what is on screen, so a transient read failure
 * cannot overwrite the real workspace with this shell.
 */
function fallbackWorkspace(): ChatWorkspace {
  return {
    ...emptyWorkspace(),
    characters: [{
      id: "libby", name: "Libby", builtIn: true, promptWeight: 1, defaultMode: "sweet",
      description: "OppaiLib's librarian and resident mascot.",
    }],
  };
}

/**
 * Repairs a workspace that arrived with holes in it.
 *
 * The server normalizes these too, and that is the real fix — but this component
 * indexes the arrays directly all through its render pass, so it should not be one
 * malformed field away from drawing nothing at all. An older server, a cached
 * response, or a future client that omits a key all land here instead of throwing.
 */
function normalizeWorkspace(workspace: ChatWorkspace): ChatWorkspace {
  return {
    ...workspace,
    profile: workspace.profile ?? { displayName: "", persona: "" },
    characters: (workspace.characters ?? []).filter((character) => character && character.id),
    images: (workspace.images ?? []).map((image) => ({ ...image, tags: image.tags ?? [] })),
    conversations: (workspace.conversations ?? []).map((conversation) => ({
      ...conversation,
      messages: (conversation.messages ?? []).filter((message) => message && typeof message.content === "string"),
    })),
  };
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
  /**
   * Whether the workspace on screen is the stored one.
   *
   * False means the fetch failed and fallbackWorkspace() is standing in. Saving is
   * blocked while it is false, so a server that was briefly unreachable cannot have
   * the user's characters and conversations overwritten by the empty stand-in the
   * moment they type anything.
   */
  @state() private workspaceLoaded = true;
  /** Why the initial load failed, shown as a banner with a retry. */
  @state() private loadError = "";
  @state() private settingsOpen = false;
  @state() private editorTab: EditorTab = "character";
  @state() private notice = "";
  @state() private noticeError = false;
  @state() private imageTags = "";
  @state() private models: ChatModels | null = null;
  @state() private modelChoice = "";
  @state() private modelBusy = false;
  @state() private mobileNavOpen = false;
  /** The AI is driving the conversation on its own. */
  @state() private autopilot = localStorage.getItem(AUTO_KEY) === "1";
  @state() private autoPaused = false;
  /** Counts down the auto turns left before it waits for the user again. */
  @state() private autoTurns = 0;
  @state() private stageOpen = true;
  /** A picture the user has attached but not yet sent. */
  @state() private pendingPhoto: PendingPhoto | null = null;
  /**
   * What the typing indicator is doing right now.
   *
   * "typing" shows the dots; "thinking" clears them while leaving the turn in
   * progress — which is what a pause mid-message looks like from the other side of a
   * chat window. The reply is already in hand by then; this is purely about when the
   * user gets to see it.
   */
  @state() private typingPhase: "idle" | "typing" | "thinking" = "idle";
  /** The full-screen sprite view. Text chat keeps running underneath it. */
  @state() private callOpen = false;
  @state() private callSeconds = 0;
  @query(".log") private log?: HTMLElement;
  @query(".composer textarea") private composer?: HTMLTextAreaElement;
  private callTimer = 0;
  private autoTimer = 0;
  /** Cached library snapshot for her no-model answers; see libraryFacts(). */
  private facts: LibbyContext | null = null;
  private factsAt = 0;
  private saveTimer = 0;
  /** Bumped on every local mutation so an in-flight save can tell it went stale. */
  private editSeq = 0;
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
    /* Full-bleed: no border, radius, or shadow. The chat fills its pane and reads
       as the application itself rather than a framed client embedded in one. */
    .client { position:relative; display:grid; grid-template-columns:64px 272px minmax(0,1fr); height:100%; min-height:0;
      overflow:hidden; background:var(--main); }
    /* The portrait column only exists when there is art to show, so the log keeps
       the full width for a character with no picture. */
    .client.with-stage { grid-template-columns:64px 272px minmax(0,1fr) 268px; }
    .rail { background:var(--rail); padding:12px 0; display:flex; flex-direction:column; align-items:center; gap:8px; overflow-y:auto; }
    .guild { position:relative; width:44px; height:44px; flex:0 0 44px; border:0; border-radius:50%; background:var(--input); display:grid;
      place-items:center; overflow:hidden; cursor:pointer; transition:.15s; }
    .guild:hover,.guild.on { border-radius:14px; background:var(--accent); }
    .guild.on::before { content:""; position:absolute; left:0; width:4px; height:30px; border-radius:0 4px 4px 0; background:var(--md-sys-color-on-surface); }
    /* Every avatar frame, not just some. .top-avatar and .me-avatar were missing
       here, so their images rendered at natural size and showed a clipped crop
       instead of filling the circle. Portraits are anchored to the top so a tall
       character image keeps the face rather than centring on the torso. */
    .guild img,.avatar img,.member-avatar img,.top-avatar img,.me-avatar img,.call-avatar img {
      width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }
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
    .me-avatar { width:32px; height:32px; flex:0 0 32px; border-radius:50%; overflow:hidden; display:grid; place-items:center; }
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
    .when { color:var(--muted); font-size:11px; }
    /* Roleplay prose is read by scanning for its parts — who spoke, what they did,
       what was stressed. The old palette blended actions 72% into the body colour
       and left speech identical to it, so those parts only separated by weight.
       Each role now carries its own hue at full strength: speech is the accent,
       action is the tertiary italic, emphasis is secondary, and code keeps a chip. */
    .text { white-space:pre-wrap; overflow-wrap:anywhere; color:var(--md-sys-color-on-surface); }
    .text .speech { color:var(--accent); font-weight:500; }
    .text .action { font-style:italic; font-weight:700;
      color:var(--md-sys-color-tertiary,color-mix(in srgb,var(--accent) 45%,var(--md-sys-color-on-surface))); }
    .text em { color:var(--md-sys-color-secondary,var(--muted)); font-style:italic; }
    .text code { background:var(--input); color:var(--md-sys-color-tertiary,var(--accent));
      padding:1px 4px; border-radius:3px; font-family:ui-monospace,"Cascadia Code",Consolas,monospace; font-size:.92em; }
    .text s { opacity:.55; }
    /* Attached photo, held in the composer until the message is sent. */
    .attachment { display:flex; align-items:center; gap:10px; margin:0 16px 8px; padding:8px; border:1px solid var(--line);
      border-radius:10px; background:var(--input); }
    .attachment img { width:44px; height:44px; flex:0 0 44px; border-radius:7px; object-fit:cover; }
    .attachment-copy { min-width:0; flex:1; display:grid; }
    .attachment-copy strong { font-size:13px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .attachment-copy span { color:var(--muted); font-size:11px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .attach-btn { position:relative; display:grid; place-items:center; padding:0 4px; color:var(--muted); cursor:pointer; }
    .attach-btn:hover { color:var(--md-sys-color-on-surface); }
    .attach-btn.off { opacity:.4; pointer-events:none; }
    .attach-btn input { position:absolute; inset:0; opacity:0; cursor:pointer; }
    .attach-btn.off input { cursor:default; }
    .sent-image { display:block; max-width:min(460px,100%); max-height:420px; border-radius:8px; margin-top:7px; object-fit:contain; background:var(--input); }
    .message-actions { opacity:0; position:absolute; right:8px; top:-8px; display:flex; border:1px solid var(--line); border-radius:5px; overflow:hidden; background:var(--side); }
    .row:hover .message-actions { opacity:1; }.message-actions button { border:0; background:transparent; padding:4px; cursor:pointer; color:var(--muted); }.message-actions button:hover { color:inherit; background:var(--hover); }
    .typing { padding:6px 16px 0 56px; color:var(--muted); font-size:13px; display:flex; align-items:center; gap:8px;
      animation:chat-rise .22s var(--oppai-ease-standard,cubic-bezier(.2,0,0,1)) both; }
    .typing b { color:var(--md-sys-color-on-surface); }
    .dots { display:inline-flex; gap:3px; }
    .dots i { width:5px; height:5px; border-radius:50%; background:var(--muted); animation:chat-bounce 1.1s infinite ease-in-out; }
    .dots i:nth-child(2) { animation-delay:.16s; } .dots i:nth-child(3) { animation-delay:.32s; }
    @keyframes chat-bounce { 0%,60%,100% { transform:translateY(0); opacity:.55; } 30% { transform:translateY(-4px); opacity:1; } }
    @keyframes chat-rise { from { opacity:0; transform:translateY(8px); } }
    @keyframes chat-fade { from { opacity:0; } }
    @keyframes chat-sprite-in { from { opacity:0; transform:translateY(10px) scale(.985); } }
    /* Only the run-opening row animates. Lit reuses a row's DOM across renders, so
       this fires when a message is appended and not on every state change. */
    .row.first { animation:chat-rise .3s var(--oppai-ease-standard,cubic-bezier(.2,0,0,1)) both; }
    .row .message-actions,.row .stamp { transition:opacity .12s ease; }
    .row:hover { transition:background .12s ease; }
    .sent-image { animation:chat-fade .35s ease both; }
    .intro { animation:chat-rise .34s var(--oppai-ease-standard,cubic-bezier(.2,0,0,1)) both; }
    .composer button[type=submit]:not(:disabled):active { transform:scale(.9); }
    .composer button[type=submit] { transition:transform .12s var(--oppai-ease-spring,cubic-bezier(.34,1.4,.64,1)); }

    /* ── autopilot ───────────────────────────────────────────────────────── */
    .autobar { display:flex; align-items:center; gap:9px; padding:8px 16px; font-size:12px;
      border-bottom:1px solid var(--line); background:color-mix(in srgb,var(--accent) 12%,var(--side));
      animation:chat-rise .24s var(--oppai-ease-standard,cubic-bezier(.2,0,0,1)) both; }
    .autobar.idle { background:var(--side); color:var(--muted); }
    .autobar .material-symbols-rounded { font-size:18px; color:var(--accent); }
    .autobar.idle .material-symbols-rounded { color:var(--muted); animation:none; }
    .autobar:not(.idle) .material-symbols-rounded { animation:chat-bounce 2.4s infinite ease-in-out; }
    .autobar-copy { flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .autobar-btn { border:1px solid var(--line); border-radius:999px; padding:3px 11px; background:transparent;
      color:inherit; font-size:11px; font-weight:650; cursor:pointer; }
    .autobar-btn:hover { background:var(--hover); }

    /* ── portrait stage ──────────────────────────────────────────────────── */
    .stage { min-width:0; display:flex; flex-direction:column; gap:8px; padding:12px 10px 0;
      background:var(--side); border-left:1px solid var(--line); overflow:hidden; }
    .stage-head { display:grid; gap:1px; padding:0 4px; }
    .stage-name { font-weight:700; font-size:14px; color:var(--accent); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .stage-status { color:var(--muted); font-size:11px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .stage-art { flex:1; min-height:0; display:grid; place-items:end center; }
    .stage-art .sprite { max-width:100%; max-height:100%; object-fit:contain; object-position:bottom;
      filter:drop-shadow(0 10px 26px rgba(0,0,0,.42)); animation:chat-sprite-in .34s var(--oppai-ease-standard,cubic-bezier(.2,0,0,1)) both; }
    .stage-art.empty-art { place-items:center; gap:8px; align-content:center; padding:16px; text-align:center;
      color:var(--muted); font-size:12px; }
    .stage-art.empty-art .material-symbols-rounded { font-size:44px; opacity:.5; }
    .stage-meter { display:flex; gap:4px; justify-content:center; padding:8px 0 12px; }
    .stage-meter .pip { width:20px; height:4px; border-radius:2px; background:var(--input); transition:background .28s ease; }
    .stage-meter .pip.on { background:var(--accent); }
    @media(max-width:1200px){ .client.with-stage { grid-template-columns:64px 272px minmax(0,1fr); } .stage,.stage-toggle { display:none; } }
    .notice { margin:4px 16px 8px; padding:9px 12px; border-left:3px solid var(--accent); background:var(--side); border-radius:7px; font-size:13px; }
    .notice.error { border-color:var(--md-sys-color-error); color:var(--md-sys-color-error); }
    .backend-state { padding:9px 16px; border-bottom:1px solid var(--line); background:var(--side); color:var(--muted); font-size:12px; }
    .backend-state strong { color:var(--md-sys-color-error); }
    .backend-state.load-error { display:flex; align-items:center; flex-wrap:wrap; gap:8px;
      border-left:3px solid var(--md-sys-color-error); }
    .backend-state.load-error .autobar-btn { margin-left:auto; }
    .load-failed { grid-column:1/-1; padding:24px; display:grid; gap:10px; justify-items:start; align-content:start; }
    .load-failed h2 { margin:0; font-size:18px; }
    .load-failed p { margin:0; color:var(--muted); overflow-wrap:anywhere; }
    .load-failed .hint { font-size:12px; }
    form.composer-form { padding:0 16px 14px; }.composer { display:flex; align-items:flex-end; gap:9px; background:var(--input); border:1px solid transparent; border-radius:14px; padding:10px 12px; }
    .composer:focus-within { border-color:var(--accent); box-shadow:0 0 0 2px color-mix(in srgb,var(--accent) 18%,transparent); }
    .composer textarea { resize:none; border:0; outline:0; background:transparent; color:inherit; max-height:140px; min-height:22px; line-height:22px; flex:1; padding:0; }
    .composer button { align-self:flex-end; }.format-help { color:var(--muted); font-size:10px; padding:5px 4px 0; display:flex; justify-content:space-between; }.send-help::after { content:"Enter to send · Shift+Enter for a new line"; }
    .members { min-width:0; background:var(--side); padding:12px 8px; overflow-y:auto; }.member { display:flex; align-items:center; gap:9px; padding:6px 8px; border-radius:5px; }
    .member:hover { background:var(--hover); }.member-avatar { width:34px; height:34px; border-radius:50%; overflow:hidden; display:grid; place-items:center; }
    .member-name { font-size:13px; font-weight:650; color:var(--accent); }.member-status { font-size:11px; color:var(--muted); }
    /* Settings read as their own room, the way Discord's do: a category rail on the
       left, one panel on the right, and no tab strip competing with the header. */
    .settings { position:absolute; inset:56px 0 0 0; z-index:5; display:grid; grid-template-columns:212px minmax(0,1fr);
      overflow:hidden; background:var(--main); box-shadow:0 10px 28px rgba(0,0,0,.28);
      animation:chat-fade .16s ease both; }
    .settings-nav { display:flex; flex-direction:column; gap:2px; padding:14px 8px; overflow-y:auto; background:var(--side); }
    .nav-cat { padding:12px 10px 4px; color:var(--muted); font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; }
    .nav-row { display:flex; align-items:center; gap:10px; border:0; border-radius:5px; padding:8px 10px; background:transparent;
      color:var(--muted); font-size:14px; font-weight:550; text-align:left; cursor:pointer; transition:background .12s ease,color .12s ease; }
    .nav-row span:last-child { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .nav-row .material-symbols-rounded { font-size:18px; }
    .nav-row:hover { background:var(--hover); color:var(--md-sys-color-on-surface); }
    .nav-row.on { background:var(--hover); color:var(--md-sys-color-on-surface); }
    .nav-sep { height:1px; margin:8px 10px; background:var(--line); }
    .settings-body { min-width:0; overflow-y:auto; background:var(--main); }
    .settings-head { position:sticky; top:0; z-index:2; display:flex; align-items:center; gap:8px; padding:16px 16px 10px; background:var(--main); }
    .settings-head strong { flex:1; font-size:19px; }.settings-head span { display:block; color:var(--muted); font-size:11px; font-weight:400; }
    /* Capped rather than full-bleed: settings are a reading column, and stretched
       across a wide desktop the label/control pairs drift far apart. */
    .panel { padding:14px 16px 22px; display:grid; gap:16px; max-width:760px; }
    .grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    .group { display:grid; gap:11px; padding:14px; border:1px solid var(--line); border-radius:10px; background:var(--main); }
    .group h3 { margin:0; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:var(--muted); display:grid; gap:3px; }
    .group h3 span { font-size:11px; font-weight:400; text-transform:none; letter-spacing:0; }
    details summary { cursor:pointer; color:var(--muted); font-size:12px; padding:2px 0; }
    details[open] summary { margin-bottom:6px; }
    label { display:grid; gap:4px; color:var(--muted); font-size:11px; font-weight:650; text-transform:uppercase; }.field,select { box-sizing:border-box; width:100%; color:var(--md-sys-color-on-surface);
      background:var(--input); border:1px solid var(--line); border-radius:5px; padding:8px; outline:0; text-transform:none; font-weight:400; }
    textarea.field { min-height:66px; resize:vertical; }.range { display:grid; grid-template-columns:1fr 48px; gap:8px; align-items:center; }.range input { accent-color:var(--accent); }.range output { text-align:right; color:inherit; }
    .panel-actions { display:flex; flex-wrap:wrap; gap:7px; }.primary,.secondary,.danger { border:1px solid var(--line); border-radius:5px; padding:7px 11px; cursor:pointer; background:transparent; }
    .primary { background:var(--accent); border-color:var(--accent); color:var(--on-accent); }.danger { color:var(--md-sys-color-error); }    /* A span, not a label: the generic label rule sets display:grid and an
       uppercase caption, which fought the button styling and misaligned the old
       upload control. The transparent input covers the span, so a click on the
       chip is a click on the input. */
    .pfp-row { display:grid; grid-template-columns:80px minmax(0,1fr); gap:14px; align-items:center; }
    .pfp { width:80px; height:80px; border-radius:50%; overflow:hidden; background:var(--input); display:grid; place-items:center; }
    .pfp img { width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }
    .pfp-initial { font-size:24px; font-weight:700; color:var(--on-accent); background:var(--accent); width:100%; height:100%; display:grid; place-items:center; }
    /* The character card reuses avatar() for its preview, which brings its own
       .initial fallback rather than the .pfp-initial span the profile panel uses. */
    .pfp.initial { font-size:24px; }
    .pfp-actions { display:grid; gap:5px; justify-items:start; }.pfp-actions strong { font-size:14px; }
    .upload-row { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:10px; align-items:end; }
    .file-btn { position:relative; overflow:hidden; display:inline-grid; place-items:center; white-space:nowrap;
      border:1px solid var(--line); border-radius:5px; padding:9px 12px; cursor:pointer; font-size:13px; }
    .file-btn:hover { background:var(--hover); }
    .file-btn input { position:absolute; inset:0; opacity:0; cursor:pointer; font-size:0; }
    @media(max-width:700px){ .upload-row { grid-template-columns:1fr; } }
    .image-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(120px,1fr)); gap:9px; }.image-card { background:var(--input); border-radius:7px; overflow:hidden; position:relative; }
    .image-card img { width:100%; height:110px; object-fit:cover; display:block; }
    .image-card .card-body { padding:6px; font-size:11px; overflow-wrap:anywhere; display:grid; gap:5px; justify-items:start; }
    .image-card .card-name { font-weight:600; overflow-wrap:anywhere; }.image-card .card-tags { color:var(--muted); }
    /* Scoped to the remove control. This used to select .image-card button, which
       also caught the "Use avatar" button in the card body and stacked it on top
       of the delete control in the same absolute corner. */
    .image-card .remove { position:absolute; right:4px; top:4px; width:22px; height:22px; display:grid; place-items:center;
      border:0; border-radius:50%; background:rgba(0,0,0,.7); color:white; cursor:pointer; line-height:1; }
    .image-card .remove:hover { background:var(--md-sys-color-error); }
    .image-card .card-body button { border:1px solid var(--line); border-radius:5px; padding:4px 8px; background:transparent; cursor:pointer; }
    .badge { background:var(--accent); color:var(--on-accent); border-radius:3px; padding:1px 5px; font-size:10px; font-weight:700; }
    .empty { color:var(--muted); font-size:13px; }.nav-scrim { display:none; }
    .model-row { display:flex; align-items:center; gap:9px; }.model-row strong { min-width:0; flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-weight:600; text-transform:none; }
    @media(max-width:900px){.client{grid-template-columns:60px 236px minmax(0,1fr)}.side-head{padding-left:12px}}
    @media(max-width:700px){
      .client{display:block;height:100%;min-height:0}.main{height:100%}
      .rail,.side{display:none;position:absolute;top:0;bottom:0;z-index:12}.client.nav-open .rail{display:flex;left:0;width:60px}.client.nav-open .side{display:flex;left:60px;width:min(286px,calc(100% - 60px))}
      .client.nav-open .nav-scrim{display:block;position:absolute;inset:0;z-index:11;border:0;background:rgba(0,0,0,.55)}
      .mobile-nav{display:grid!important}.top{padding-left:4px;gap:7px}.quick-mode{max-width:96px;padding-left:8px}.topic{max-width:130px}.grid{grid-template-columns:1fr}
      .row{grid-template-columns:48px minmax(0,1fr);padding-right:12px}.avatar{width:34px;height:34px}.typing{padding-left:48px}.destructive-action{display:none}.format-help{display:none}
      .intro{margin:6px 10px 12px;padding:13px}.panel{padding-left:12px;padding-right:12px}.message-actions{opacity:1;position:static;grid-column:2;justify-self:end;margin-top:3px;border:0;background:transparent}
      /* No room for a rail: the categories become a scrolling strip above the panel. */
      .settings{inset:56px 0 0;grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr)}
      .settings-nav{flex-direction:row;align-items:center;gap:4px;padding:8px;overflow-x:auto;overflow-y:hidden;border-bottom:1px solid var(--line)}
      .nav-cat,.nav-sep,.nav-row.close{display:none}
      .nav-row{flex:0 0 auto;padding:7px 12px;border-radius:999px}
      .pfp-row{grid-template-columns:64px minmax(0,1fr)}.pfp{width:64px;height:64px}
      .call-caption{max-width:100%}.call-top{flex-direction:column;align-items:flex-start;gap:6px}
    }
    /* Video call. Covers the whole client rather than sitting in the portrait
       column: the point is to look at the character, so the chrome gets out of
       the way and the sprite is given the full height. */
    .call { position:absolute; inset:0; z-index:60; display:flex; flex-direction:column; background:var(--md-sys-color-scrim,#000);
      animation:chat-rise .18s var(--oppai-ease-standard,cubic-bezier(.2,0,0,1)) both; }
    .call-stage { position:relative; flex:1 1 0; min-height:0; display:grid; place-items:end center; overflow:hidden;
      background:radial-gradient(120% 90% at 50% 12%,color-mix(in srgb,var(--accent) 26%,transparent),transparent 68%),var(--rail); }
    .call-sprite { max-height:100%; max-width:100%; object-fit:contain; object-position:bottom center;
      animation:call-pose .32s var(--oppai-ease-standard,cubic-bezier(.2,0,0,1)) both; }
    @keyframes call-pose { from { opacity:0; transform:translateY(10px) scale(.99); } }
    .call-top { position:absolute; top:0; left:0; right:0; display:flex; align-items:center; gap:12px; padding:14px 18px;
      background:linear-gradient(to bottom,rgba(0,0,0,.55),transparent); color:#fff; }
    .call-who { display:grid; }.call-who strong { font-size:16px; }.call-who span { font-size:12px; opacity:.8; }
    .call-mood { margin-left:auto; display:flex; align-items:center; gap:7px; padding:5px 11px; border-radius:999px;
      background:rgba(0,0,0,.42); font-size:12px; font-weight:650; text-transform:capitalize; }
    .call-mood .material-symbols-rounded { font-size:16px; }
    .call-pips { display:inline-flex; gap:3px; }
    .call-pips i { width:5px; height:5px; border-radius:50%; background:rgba(255,255,255,.32); }
    .call-pips i.on { background:var(--accent); }
    .call-caption { position:absolute; bottom:16px; max-width:min(680px,88%); margin:0; padding:11px 15px; border-radius:12px;
      background:rgba(0,0,0,.58); color:#fff; font-size:14px; line-height:1.45; white-space:pre-wrap; backdrop-filter:blur(3px); }
    /* The caption sits on a dark plate rather than the theme surface, so the
       formatting colours are re-stated here against it. */
    .call-caption .speech { color:color-mix(in srgb,var(--accent) 70%,#fff); }
    .call-caption .action { color:rgba(255,255,255,.82); }
    .call-bar { flex:0 0 auto; display:flex; align-items:center; gap:9px; padding:12px 16px; background:var(--rail); }
    .call-input { flex:1; min-width:0; border:0; border-radius:999px; padding:11px 16px; background:var(--input);
      color:var(--md-sys-color-on-surface); }
    .call-input:focus { outline:2px solid var(--accent); outline-offset:-2px; }
    .call-btn { width:44px; height:44px; flex:0 0 44px; border:0; border-radius:50%; background:var(--input); color:inherit;
      display:grid; place-items:center; cursor:pointer; }
    .call-btn:hover:not(:disabled) { background:var(--hover); }
    .call-btn:disabled { opacity:.45; cursor:default; }
    .call-btn.end { background:var(--md-sys-color-error); color:var(--md-sys-color-on-error,#fff); }
    @media (prefers-reduced-motion:reduce) { .call,.call-sprite { animation:none; } }
  `];

  connectedCallback() {
    super.connectedCallback();
    // Library may have queued a picture before this element existed, so the share
    // is claimed after the workspace loads as well as on the event.
    void this.load().then(() => void this.claimShare());
    window.addEventListener("keydown", this.onGlobalKey);
    window.addEventListener(SHARE_EVENT, this.onShared);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this.saveTimer); window.clearTimeout(this.idleTimer); window.clearTimeout(this.noticeTimer);
    window.clearTimeout(this.autoTimer); window.clearInterval(this.callTimer);
    window.removeEventListener("keydown", this.onGlobalKey);
    window.removeEventListener(SHARE_EVENT, this.onShared);
    this.resize?.disconnect();
  }

  private onShared = () => { void this.claimShare(); };

  /**
   * Takes a picture handed over from Library and attaches it to the composer for
   * the character it was shared with.
   *
   * It is left as a draft attachment rather than sent: sharing chose the picture,
   * not the words to go with it, and the message is still the user's to write.
   */
  private async claimShare() {
    const share = takePendingShare();
    if (!share) return;
    const target = this.workspace.characters.find((character) => character.id === share.characterId);
    if (!target) { this.say("That character no longer exists.", true); return; }
    if (this.characterID !== target.id) this.activateCharacter(target.id);
    try {
      this.say(`Scanning ${share.name} locally…`);
      const image = await api.uploadChatImage({
        characterId:target.id, name:share.name, imageData:share.imageData, tags:[],
      });
      this.workspace.images.push(image);
      this.pendingPhoto = { imageId:image.id, tags:image.tags ?? [], name:image.name };
      this.touchWorkspace();
      this.say(`Ready to show ${target.name} — add a message and send.`);
      this.focusComposer();
    } catch (error) { this.say((error as Error).message, true); }
  }

  /** Escape hangs up, the way it dismisses every other overlay in the app. */
  private onGlobalKey = (event: KeyboardEvent) => {
    if (event.key === "Escape" && this.callOpen) { event.stopPropagation(); this.endCall(); }
  };

  protected firstUpdated() {
    this.resize = new ResizeObserver(() => void this.scrollToEnd(false));
    if (this.log) this.resize.observe(this.log);
    this.focusComposer();
  }

  /**
   * Returns the caret to the message box after anything that could have taken it.
   *
   * Chat is a typing surface: every button here is something you press between
   * sentences, so leaving focus on the button you just clicked means reaching for
   * the mouse again to carry on. Focus is not stolen while a dialog is open —
   * settings and the call overlay own the caret for as long as they are up.
   */
  private focusComposer() {
    if (this.settingsOpen) return;
    void this.updateComplete.then(() => {
      // During a call the call's own field is the message box; focusing the one
      // buried under the overlay would put the caret somewhere invisible.
      const box = (this.callOpen
        ? this.renderRoot.querySelector(".call-input")
        : this.composer) as HTMLInputElement | HTMLTextAreaElement | null;
      if (!box || box.disabled) return;
      // preventScroll: the composer sits below a scrolling log, and focusing it
      // otherwise yanks the log to the bottom mid-read.
      box.focus({ preventScroll: true });
      box.setSelectionRange(box.value.length, box.value.length);
    });
  }

  // Unparameterised PropertyValues: these are private fields, and PropertyValues<this>
  // only admits public keys.
  protected updated(changed: PropertyValues) {
    // Generating a reply is the common case where focus would otherwise be lost:
    // the send button goes disabled under the cursor and the browser drops it.
    if (changed.has("busy") && !this.busy) this.focusComposer();
    if (changed.has("conversationID") || changed.has("characterID")) this.focusComposer();
    if (changed.has("settingsOpen") && !this.settingsOpen) this.focusComposer();
    if (changed.has("callOpen")) this.focusComposer();
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

  /**
   * Brings the chat screen up.
   *
   * The two fetches are settled independently. Only one of them talks to the text
   * generation box, and whether that box is up has nothing to do with whether the
   * user's own conversations can be shown — joining them with Promise.all meant a
   * slow or unreachable generator decided if the screen loaded at all. Whichever
   * answers is used, and a workspace that cannot be read falls back to a local
   * Libby rather than an empty view, so the screen always ends up interactive.
   */
  private async load() {
    const [status, workspace] = await Promise.allSettled([api.chatStatus(), api.chatWorkspace()]);
    try {
      if (status.status === "fulfilled") this.status = status.value;
      if (workspace.status === "fulfilled") {
        this.workspace = normalizeWorkspace(workspace.value);
        this.workspaceLoaded = true;
      } else {
        this.workspace = fallbackWorkspace();
        this.workspaceLoaded = false;
        this.loadError = (workspace.reason as Error)?.message || "Couldn't load your chat workspace.";
      }
      this.characterID = this.workspace.characters[0]?.id ?? "libby";
      const existing = this.conversationsFor(this.characterID)[0];
      if (existing) this.activateConversation(existing.id);
      else this.newConversation(false);
      if (this.status?.modelBackend) void this.refreshModels(true);
    } catch (error) {
      // Anything thrown while building the opening conversation would otherwise
      // leave the spinner up forever, since a render that throws leaves the last
      // DOM in place. Report it and let the finally clause hand over a usable view.
      this.loadError = (error as Error).message || "Chat failed to start.";
    } finally { this.loading = false; }
  }

  /** Re-runs the initial load after a failure, from the banner's Retry button. */
  private async retryLoad() {
    if (this.loading) return;
    this.loadError = ""; this.loading = true;
    await this.load();
  }

  private say(message: string, error = false) {
    this.notice = message; this.noticeError = error;
    window.clearTimeout(this.noticeTimer); this.noticeTimer = window.setTimeout(() => (this.notice = ""), 4200);
  }

  /**
   * The library snapshot Libby answers from when no model is loaded.
   *
   * Cached for a minute: it is fetched on the reply path, so asking her three things
   * in a row should not mean three round trips, and the numbers do not move fast
   * enough for a fresher copy to read any differently. A failure is swallowed —
   * she loses the facts, not the reply.
   */
  private async libraryFacts(): Promise<LibbyContext | null> {
    if (this.facts && Date.now() - this.factsAt < 60_000) return this.facts;
    try {
      this.facts = await api.libbyContext();
      this.factsAt = Date.now();
    } catch { /* The ordinary reply engine still answers. */ }
    return this.facts;
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
    this.editSeq++;
    window.clearTimeout(this.saveTimer); this.saveTimer = window.setTimeout(() => void this.saveWorkspace(), 450);
  }

  private async saveWorkspace() {
    window.clearTimeout(this.saveTimer);
    // The stand-in workspace is not the user's: writing it back would replace real
    // characters and conversations with an empty shell. Retry is the way out.
    if (!this.workspaceLoaded) return;
    const seq = this.editSeq;
    try {
      const saved = await api.saveChatWorkspace(this.workspace);
      // Only adopt the server's copy when nothing changed locally while the PUT
      // was in flight. A reply that arrives mid-request was never in the payload,
      // so overwriting with the response would silently discard it — and
      // touchWorkspace has already scheduled the save that will persist it.
      if (seq === this.editSeq) this.workspace = normalizeWorkspace(saved);
    }
    catch (error) { this.say(`Couldn't save chat: ${(error as Error).message}`, true); }
  }

  /**
   * Re-resolves a conversation by id, and must be used after every await.
   *
   * saveWorkspace() replaces this.workspace wholesale with the server's parsed
   * response, so every conversation becomes a new object. A reference captured
   * before an await is orphaned the moment the 450ms autosave fires, and
   * mutating it still "succeeds" while writing into something nothing renders.
   * That is silent: a reply generated in more than 450ms simply vanishes.
   */
  private liveConversation(id: string): ChatConversation | undefined {
    return this.workspace.conversations.find((conversation) => conversation.id === id);
  }

  /** Characters are replaced by the same autosave; see liveConversation. */
  private liveCharacter(id: string): ChatCharacter | undefined {
    return this.workspace.characters.find((character) => character.id === id);
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
    // Libby's canned idle line is what fills a silence when she is answering
    // locally. With a model connected the autopilot does that job in her own
    // voice, so the two must not both speak into the same lull.
    if (this.characterID !== "libby" || this.status?.enabled) return;
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
    this.autoTurns = AUTO_MAX_TURNS;
    setIntensity(conversation.intensity); this.armIdle(); this.scheduleAuto(); void this.scrollToEnd(false);
  }

  private newConversation(save = true) {
    const character = this.activeCharacter; if (!character) return;
    const now = Date.now();
    let opener = character.firstMessage?.trim() ?? "";
    let emotion: LibbyEmotion = normalizeEmotion(MODES.find((mode) => mode.id === character.defaultMode)?.emotion);
    if (character.id === "libby" && !opener) { const line = libbyOpener(character.defaultMode, getIntensity()); opener = line.message; emotion = line.emotion; }
    const conversation: ChatConversation = {
      id:newID(), characterId:character.id, title:"New conversation", mode:character.defaultMode || "sweet",
      emotion, intensity:character.id === "libby" ? getIntensity() : 1, progress:character.id === "libby" ? getIntensity() : 1,
      options:{ ...(this.workspace.defaults ?? defaultOptions()) },
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
    const photo = this.pendingPhoto, conversation = this.activeConversation;
    // A photo is a message on its own, so an empty box is only empty without one.
    const content = this.draft.trim() || (photo ? `*shares a photo with you*` : "");
    if (!content || !conversation || this.busy) return;
    // Everything after an await must go through liveConversation(id): this object
    // is replaced by the autosave that fires 450ms from now.
    const conversationID = conversation.id;
    const userMessage: StoredChatMessage = { id:newID(), role:"user", content, at:Date.now(), imageId:photo?.imageId };
    conversation.messages.push(userMessage); conversation.updatedAt = Date.now();
    if (conversation.title === "New conversation") conversation.title = content.slice(0, 42);
    this.draft = ""; this.pendingPhoto = null; this.notice = ""; this.touchWorkspace(); this.armIdle(); void this.scrollToEnd();
    // Speaking re-arms the autopilot's budget: it exists to fill your silence, so a
    // run that stopped after its last turn should start again once you rejoin.
    this.autoTurns = AUTO_MAX_TURNS;
    await this.generateReply(conversationID, content, false, photo?.tags ?? [], photo?.imageId ?? "");
    this.scheduleAuto();
  }

  /**
   * Uploads a picture for the composer and holds it until the message is sent.
   *
   * It is filed under the active character, so a shared photo also joins the pool
   * they can send back to you later — sharing and receiving draw on one gallery
   * rather than two. Tagging happens server-side during the upload; those tags are
   * what let a text-only model respond to what is in the picture.
   */
  private async attachPhoto(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0], character = this.activeCharacter;
    if (!file || !character) return;
    try {
      this.say("Scanning photo locally…");
      const image = await api.uploadChatImage({
        characterId:character.id, name:file.name, imageData:await this.readDataURL(file), tags:[],
      });
      this.workspace.images.push(image);
      this.pendingPhoto = { imageId:image.id, tags:image.tags ?? [], name:image.name };
      this.touchWorkspace();
      this.say(image.tags?.length ? `Photo ready: ${image.tags.slice(0, 6).join(", ")}.` : "Photo ready to send.");
      this.focusComposer();
    } catch (error) { this.say((error as Error).message, true); }
    finally { input.value = ""; }
  }

  /** Opens the file picker from somewhere other than the composer button. */
  private pickPhoto() {
    (this.renderRoot.querySelector(".attach-btn input") as HTMLInputElement | null)?.click();
  }

  /** Drops the attachment and the copy that was uploaded for it. */
  private async discardPhoto() {
    const photo = this.pendingPhoto;
    if (!photo) return;
    this.pendingPhoto = null;
    this.workspace.images = this.workspace.images.filter((image) => image.id !== photo.imageId);
    this.touchWorkspace();
    this.focusComposer();
    try { await api.deleteChatImage(photo.imageId); } catch { /* The gallery entry is already gone locally. */ }
  }

  private pause(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Holds a finished reply back for as long as it would plausibly have taken to
   * write, so the character reads as someone typing rather than a service responding.
   *
   * Three things are being imitated. Reading what you said before starting. Typing
   * time that scales with what she actually wrote. And second thoughts: sometimes the
   * dots stop partway, sit quiet for a beat, and start again — the shape a message
   * that got half-typed, deleted, and rewritten leaves in a chat window.
   *
   * The generation time already spent counts against all of it, so a slow model does
   * not pay twice; on a slow backend this adds nothing at all. The total is capped
   * because charm wears off fast when you are waiting for it.
   */
  private async typeLikeAPerson(text: string, spentMs: number) {
    const jitter = (base: number) => base * (0.7 + Math.random() * 0.6);
    // ~22 characters a second, which reads as a quick but human phone typist.
    const budget = Math.min(7000, jitter(420 + text.length * 45));
    let remaining = Math.max(0, budget - spentMs);
    if (remaining < 120) return;

    this.typingPhase = "thinking";
    const reading = Math.min(remaining, jitter(500));
    await this.pause(reading);
    remaining -= reading;

    // Longer messages are likelier to get rewritten, and never on a one-liner: an
    // eight-word reply that visibly took three attempts is a tell, not a texture.
    if (text.length > 90 && remaining > 900 && Math.random() < 0.35) {
      const firstAttempt = remaining * (0.3 + Math.random() * 0.3);
      this.typingPhase = "typing";
      await this.pause(firstAttempt);
      this.typingPhase = "thinking";
      const reconsider = jitter(650);
      await this.pause(reconsider);
      remaining -= firstAttempt + reconsider;
    }
    if (remaining > 0) {
      this.typingPhase = "typing";
      await this.pause(remaining);
    }
    this.typingPhase = "idle";
  }

  /**
   * Produces one assistant turn from the conversation's own history and appends it.
   *
   * Sending, re-responding, and the autopilot all end here; they differ only in what
   * they do to the log first. `seed` is the line being reacted to, which is what
   * Libby's offline voice writes from. `continuation` asks for an unprompted turn —
   * the character speaks again with no new user message to answer.
   */
  private async generateReply(conversationID: string, seed: string, continuation = false, photoTags: string[] = [], photoImageID = ""): Promise<boolean> {
    const conversation = this.liveConversation(conversationID);
    const character = conversation && this.liveCharacter(conversation.characterId);
    if (!conversation || !character || this.busy) return false;
    this.busy = true;
    if (!this.status?.enabled && (this.status?.configured || this.status?.modelBackend)) {
      try { this.status = await api.chatStatus(); } catch { /* The chat request or local fallback below provides the user-facing result. */ }
    }
    if (!this.status?.enabled) {
      if (character.id !== "libby") { this.busy = false; this.say(this.status?.message || "Load a model in text-generation-webui, then refresh backend status.", true); return false; }
      const progression = applyProgression(conversation.progress ?? conversation.intensity, continuation ? 0 : libbyHeatDelta(seed, conversation.mode));
      // Read before any await: the autosave replaces this object, and everything past
      // that point has to go through liveConversation.
      const mode = conversation.mode, mood = normalizeEmotion(conversation.emotion);
      let line: LibbyLine;
      if (continuation) {
        line = libbyReact("idle", { intensity: progression.intensity });
      } else {
        // Library and server questions get a real answer even with no model loaded —
        // she is the librarian of this collection, and "what did I add lately?" has a
        // factual answer that does not need one. Anything else falls through.
        const facts = await this.libraryFacts();
        line = (facts && libbyLibraryAnswer(seed, facts, { intensity: progression.intensity }))
          ?? libbyReply(seed, mode, mood, progression.intensity, false);
      }
      await this.typeLikeAPerson(line.message, 0);
      const live = this.liveConversation(conversationID);
      if (!live) { this.busy = false; this.typingPhase = "idle"; return false; }
      live.emotion = line.emotion; live.progress = progression.progress; live.intensity = setIntensity(progression.intensity);
      live.messages.push({ id:newID(), role:"assistant", content:line.message, at:Date.now() });
      live.updatedAt = Date.now(); this.busy = false; this.touchWorkspace(); void this.scrollToEnd(); return true;
    }
    try {
      const history: ChatMessage[] = conversation.messages.map(({ role, content:text }) => ({ role, content:text }));
      // A nudge, not a message: it steers this one request and is never stored, so
      // the log stays a record of what was actually said.
      if (continuation) history.push({ role:"user", content:"(Continue the scene on your own. Speak or act again without waiting for a reply, and do not answer for me.)" });
      const startedAt = Date.now();
      this.typingPhase = "typing";
      const result = await api.chat(conversation.mode, history, conversation.emotion, conversation.intensity, conversation.options, character.id, photoTags, photoImageID);
      // Whatever the model already spent counts as time she was "writing", so this
      // only ever tops the wait up to something human — never adds a full delay on
      // top of a slow generation.
      await this.typeLikeAPerson(result.message, Date.now() - startedAt);
      // Deleting the conversation mid-generation is the one case with nowhere to
      // put the reply; dropping it is correct, and the user asked for that.
      const live = this.liveConversation(conversationID);
      if (!live) return false;
      live.emotion = normalizeEmotion(result.emotion ?? live.emotion);
      const requested = normalizeIntensity(result.intensity ?? live.intensity);
      if (result.declared) {
        // The character named this mood, so it lands where it asked. Running it
        // through the drift multiplier is what used to halve every deliberate swing:
        // a jump from 1 to 5 arrived as a 3, and the scene never caught up.
        live.progress = requested; live.intensity = setIntensity(requested);
      } else {
        const progression = applyProgression(live.progress ?? live.intensity, requested - live.intensity);
        live.progress = progression.progress; live.intensity = setIntensity(progression.intensity);
      }
      live.messages.push({ id:newID(), role:"assistant", content:result.message, at:Date.now(), imageId:result.imageId || undefined });
      live.updatedAt = Date.now(); this.touchWorkspace(); void this.scrollToEnd();
      return true;
    } catch (error) {
      if (this.status?.configured || this.status?.modelBackend) {
        try { this.status = await api.chatStatus(); } catch { /* Keep the generation error when the readiness check also fails. */ }
      }
      this.typingPhase = "idle";
      this.say(!this.status?.enabled && this.status?.message ? this.status.message : (error as Error).message, true);
      return false;
    }
    finally { this.busy = false; this.typingPhase = "idle"; }
  }

  /**
   * Re-rolls the character's last turn: drops the trailing assistant messages and
   * asks again from the same history, so the reply you keep is the one you liked.
   *
   * The discarded text is not recoverable, which matches how every other chat client
   * behaves — and unlike deleting a message, the exchange it belonged to survives.
   */
  private async regenerate() {
    const conversation = this.activeConversation;
    if (!conversation || this.busy) return;
    const messages = conversation.messages;
    let cut = messages.length;
    while (cut > 0 && messages[cut - 1].role === "assistant") cut--;
    if (cut === messages.length) { this.say("There is no reply to redo yet.", true); return; }
    const conversationID = conversation.id;
    // The last thing the user said is what the offline voice answers; an opener that
    // was never prompted has no seed and simply gets rewritten.
    const seed = cut > 0 ? messages[cut - 1].content : "";
    conversation.messages = messages.slice(0, cut);
    conversation.updatedAt = Date.now();
    this.touchWorkspace(); void this.scrollToEnd();
    await this.generateReply(conversationID, seed, cut === 0);
  }

  // --- Autopilot ------------------------------------------------------------
  // With a model connected the character can keep the conversation going on its
  // own. It is budgeted (AUTO_MAX_TURNS) and pausable, and any turn you take
  // refills the budget: it fills silence rather than talking over you.

  private toggleAutopilot() {
    this.autopilot = !this.autopilot;
    this.autoPaused = false;
    this.autoTurns = AUTO_MAX_TURNS;
    try { localStorage.setItem(AUTO_KEY, this.autopilot ? "1" : "0"); } catch { /* private mode */ }
    if (this.autopilot && !this.status?.enabled) this.say("Autopilot needs a connected model — it stays off until one is loaded.", true);
    this.scheduleAuto();
  }

  private pauseAutopilot(paused: boolean) {
    this.autoPaused = paused;
    if (paused) window.clearTimeout(this.autoTimer); else { this.autoTurns = Math.max(this.autoTurns, 1); this.scheduleAuto(); }
  }

  /** Hands the run a fresh budget after it stopped and waited for you. */
  private refillAutopilot() {
    this.autoTurns = AUTO_MAX_TURNS;
    this.pauseAutopilot(false);
  }

  private get autoRunning(): boolean {
    return this.autopilot && !this.autoPaused && !!this.status?.enabled && this.autoTurns > 0;
  }

  private scheduleAuto() {
    window.clearTimeout(this.autoTimer);
    if (!this.autoRunning) return;
    this.autoTimer = window.setTimeout(() => void this.autoTick(), AUTO_DELAY_MS);
  }

  private async autoTick() {
    // A backgrounded tab shouldn't quietly burn tokens; wait for it to be looked at.
    if (this.busy || document.visibilityState !== "visible") { this.scheduleAuto(); return; }
    const conversation = this.activeConversation;
    if (!conversation || !this.autoRunning) return;
    this.autoTurns--;
    const ok = await this.generateReply(conversation.id, "", true);
    if (ok) this.scheduleAuto();
    else this.autoPaused = true;
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
        this.workspace.images.push(image);
        // saveWorkspace() above always replaces the workspace, so the portrait has
        // to be attached to the stored character rather than the local one.
        const stored = this.liveCharacter(character.id);
        if (stored) stored.avatarImageId = image.id;
        this.touchWorkspace(); this.newConversation(false); this.say("Friend added and image scanned."); return;
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
      this.workspace.images.push(image);
      const stored = this.liveCharacter(character.id);
      if (stored && !stored.avatarImageId) stored.avatarImageId = image.id;
      this.imageTags = ""; this.touchWorkspace(); this.say(`Image scanned: ${image.tags.join(", ") || "no content tags found"}.`);
    } catch (error) { this.say((error as Error).message, true); }
    finally { (event.target as HTMLInputElement).value = ""; }
  }

  /**
   * Uploads the user's own avatar under the reserved profile owner, so it never
   * lands in a character's gallery or gets picked as a reply attachment. The old
   * picture is deleted afterwards: it has no other referent once replaced.
   */
  private async uploadProfilePicture(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]; if (!file) return;
    const previous = this.workspace.profile.avatarImageId;
    try {
      this.say("Uploading profile picture…");
      const image = await api.uploadChatImage({ characterId:PROFILE_IMAGE_OWNER, name:file.name, imageData:await this.readDataURL(file), tags:[] });
      this.workspace.images.push(image);
      this.workspace.profile.avatarImageId = image.id;
      this.touchWorkspace();
      await this.saveWorkspace();
      if (previous) await this.discardProfileImage(previous);
      this.say("Profile picture updated.");
    } catch (error) { this.say((error as Error).message, true); }
    finally { (event.target as HTMLInputElement).value = ""; }
  }

  private async removeProfilePicture() {
    const current = this.workspace.profile.avatarImageId; if (!current) return;
    this.workspace.profile.avatarImageId = "";
    this.touchWorkspace();
    await this.saveWorkspace();
    await this.discardProfileImage(current);
    this.say("Profile picture removed.");
  }

  /**
   * Sets the character's face from the character card, not from their gallery.
   *
   * The picture is filed under a reserved owner (`avatar:<id>`), so it is not one of
   * the character's images: it never appears in the Images tab and is never picked as
   * an attachment for a reply. That is the distinction the two upload paths exist to
   * keep — a face is not a photo the character might send you.
   */
  private async uploadCharacterPicture(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0], character = this.activeCharacter;
    if (!file || !character) return;
    const characterID = character.id;
    const previous = character.avatarImageId;
    try {
      this.say("Uploading picture…");
      const image = await api.uploadChatImage({ characterId:avatarOwner(characterID), name:`${character.name} avatar`, imageData:await this.readDataURL(file), tags:[] });
      this.workspace.images.push(image);
      const stored = this.liveCharacter(characterID);
      if (stored) stored.avatarImageId = image.id;
      this.touchWorkspace();
      await this.saveWorkspace();
      // Only a picture that was itself an avatar upload is ours to delete: an avatar
      // chosen from the gallery is still one of the character's images.
      if (previous && this.isAvatarUpload(previous, characterID)) await this.discardProfileImage(previous);
      this.say("Picture updated.");
    } catch (error) { this.say((error as Error).message, true); }
    finally { (event.target as HTMLInputElement).value = ""; }
  }

  private async removeCharacterPicture() {
    const character = this.activeCharacter; const current = character?.avatarImageId;
    if (!character || !current) return;
    const characterID = character.id;
    character.avatarImageId = "";
    this.touchWorkspace();
    await this.saveWorkspace();
    if (this.isAvatarUpload(current, characterID)) await this.discardProfileImage(current);
    this.say("Picture removed.");
  }

  private isAvatarUpload(imageID: string, characterID: string): boolean {
    return this.workspace.images.find((image) => image.id === imageID)?.characterId === avatarOwner(characterID);
  }

  /** A stale picture failing to delete is not worth surfacing: the reference is already gone. */
  private async discardProfileImage(id: string) {
    try {
      await api.deleteChatImage(id);
      this.workspace.images = this.workspace.images.filter((image) => image.id !== id);
      this.touchWorkspace();
    } catch { /* The record is unreferenced either way. */ }
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

  /**
   * The character's full artwork beside the log — Libby's sprite for her tier and
   * mood, a character's own picture for anyone else.
   *
   * The pose is keyed on emotion and intensity so switching moods crossfades rather
   * than cutting, and the whole column collapses on narrow screens where the log
   * needs the room.
   */
  /**
   * The artwork to show for a character at a given mood.
   *
   * Sprites only — deliberately not the character's pfp. A pfp is a face for the
   * message log, and blowing it up to fill the stage and the call screen meant
   * setting one changed the character everywhere at once. Somewhere that is supposed
   * to react to mood is the wrong place for a picture that cannot.
   *
   * So this is the emotion-reactive wardrobe or nothing: today only Libby has one,
   * which is why other characters currently have no stage art and cannot be called.
   */
  private spriteFor(character: ChatCharacter, emotion: LibbyEmotion, intensity: number): string[] {
    return character.id === "libby" ? libbyAssetCandidates(emotion, intensity, loadLibbyOutfit()) : [];
  }

  // --- Video call -----------------------------------------------------------
  // A face-to-face framing of the same conversation: the sprite fills the screen
  // and changes pose as the character's mood moves, with a caption of what they
  // just said. It is a presentation of the existing chat, not a second channel —
  // messages sent here land in the same log.

  private startCall() {
    const character = this.activeCharacter;
    if (!character) return;
    if (!this.spriteFor(character, "neutral", 1).length) {
      this.say(`${character.name} has no picture to show — set one on their character card first.`, true);
      return;
    }
    this.callOpen = true; this.callSeconds = 0; this.settingsOpen = false;
    window.clearInterval(this.callTimer);
    this.callTimer = window.setInterval(() => (this.callSeconds += 1), 1000);
    this.focusComposer();
  }

  private endCall() {
    this.callOpen = false;
    window.clearInterval(this.callTimer);
    this.focusComposer();
  }

  private renderCall(character: ChatCharacter, conversation: ChatConversation) {
    if (!this.callOpen) return nothing;
    const emotion = normalizeEmotion(conversation.emotion), intensity = normalizeIntensity(conversation.intensity);
    const assets = this.spriteFor(character, emotion, intensity);
    const spoken = [...conversation.messages].reverse().find((message) => message.role === "assistant");
    const clock = `${Math.floor(this.callSeconds / 60)}:${String(this.callSeconds % 60).padStart(2, "0")}`;
    return html`<div class="call" role="dialog" aria-modal="true" aria-label=${`Video call with ${character.name}`}>
      <div class="call-stage">
        <!-- Keyed on the pose: a mood change replaces the element instead of
             mutating src, so the fade-in replays and the fallback chain restarts
             from the top for the new emotion's art. -->
        ${keyed(`${emotion}-${intensity}`, html`<img class="call-sprite" src=${assets[0]} data-fallback-index="0"
          alt=${`${character.name} looking ${emotion}`}
          @error=${(event:Event) => applyImageFallback(event.target as HTMLImageElement, assets)} />`)}
        <div class="call-top">
          <span class="call-who"><strong>${character.name}</strong><span>${this.busy ? "Speaking…" : clock}</span></span>
          <span class="call-mood" title=${`Feeling ${emotion}, intensity ${intensity} of 5`}>
            <span class="material-symbols-rounded">mood</span>${emotion}
            <span class="call-pips">${[1,2,3,4,5].map((step) => html`<i class=${step <= intensity ? "on" : ""}></i>`)}</span>
          </span>
        </div>
        ${spoken ? html`<p class="call-caption">${formatted(spoken.content)}</p>` : nothing}
      </div>
      <div class="call-bar">
        <input class="call-input" placeholder=${`Say something to ${character.name}…`} aria-label=${`Message ${character.name}`}
          .value=${this.draft} @input=${(event:Event)=>(this.draft=(event.target as HTMLTextAreaElement).value)}
          @keydown=${(event:KeyboardEvent)=>{ if (event.key === "Enter") { event.preventDefault(); void this.send(); } }} />
        <button class="call-btn" title="Re-respond" aria-label="Ask for a different reply" ?disabled=${this.busy} @click=${()=>void this.regenerate()}><span class="material-symbols-rounded">refresh</span></button>
        <button class="call-btn end" title="End call" aria-label="End call" @click=${()=>this.endCall()}><span class="material-symbols-rounded">call_end</span></button>
      </div>
    </div>`;
  }

  private renderStage(character: ChatCharacter, conversation: ChatConversation) {
    const hidden = character.id === "libby" && loadHideLibby();
    if (hidden) return nothing;
    const emotion = normalizeEmotion(conversation.emotion), intensity = normalizeIntensity(conversation.intensity);
    const assets = this.spriteFor(character, emotion, intensity);
    // Nothing to stand on the stage: a character with no art gets no column at all
    // rather than an empty one. Their picture is set from the character card.
    if (!assets.length) return nothing;
    const status = this.busy ? "Typing…" : this.autoRunning ? "Talking on their own" : this.status?.enabled ? this.status.model : "Local replies";
    return html`<aside class="stage" aria-label="${character.name} portrait">
      <div class="stage-head"><span class="stage-name">${character.name}</span><span class="stage-status">${status}</span></div>
      <div class="stage-art">
        <img class="sprite" src=${assets[0]} data-fallback-index="0" alt=${`${character.name} looking ${emotion}`}
          @error=${(event:Event) => applyImageFallback(event.target as HTMLImageElement, assets)} />
      </div>
      ${character.id === "libby" ? html`<div class="stage-meter" title=${`Intensity ${intensity} of 5`} aria-label=${`Intensity ${intensity} of 5`}>
        ${[1,2,3,4,5].map((step) => html`<span class="pip ${step <= intensity ? "on" : ""}"></span>`)}
      </div>` : nothing}
    </aside>`;
  }

  private renderAutopilotBar(character: ChatCharacter) {
    if (!this.autopilot) return nothing;
    const stalled = this.autoTurns <= 0;
    const state = !this.status?.enabled ? `Autopilot is waiting for a model.`
      : this.autoPaused ? `Autopilot paused.`
      : stalled ? `${character.name} is waiting for you to say something.`
      : `${character.name} keeps the conversation going · ${this.autoTurns} turn${this.autoTurns === 1 ? "" : "s"} left`;
    return html`<div class="autobar ${this.autoPaused || stalled || !this.status?.enabled ? "idle" : ""}" role="status">
      <span class="material-symbols-rounded">${this.autoPaused ? "pause_circle" : "smart_toy"}</span>
      <span class="autobar-copy">${state}</span>
      ${this.status?.enabled ? html`<button class="autobar-btn" @click=${() => stalled ? this.refillAutopilot() : this.pauseAutopilot(!this.autoPaused)}>
        ${stalled ? "Continue" : this.autoPaused ? "Resume" : "Pause"}
      </button>` : nothing}
      <button class="autobar-btn" @click=${() => this.toggleAutopilot()}>Turn off</button>
    </div>`;
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
        <div class="convo-wrap ${conversation.id === this.conversationID ? "on" : ""}" data-id=${conversation.id}>
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
    const active = EDITOR_TABS.find((tab) => tab.id === this.editorTab) ?? EDITOR_TABS[0];
    let group = "";
    return html`<section class="settings">
      <nav class="settings-nav" aria-label="Chat settings">
        ${EDITOR_TABS.map((tab) => {
          const heading = tab.group === group ? nothing : html`<div class="nav-cat">${tab.group}</div>`;
          group = tab.group;
          return html`${heading}
            <button class="nav-row ${tab.id === this.editorTab ? "on" : ""}" aria-current=${tab.id === this.editorTab ? "page" : "false"} @click=${() => (this.editorTab = tab.id)}>
              <span class="material-symbols-rounded">${tab.icon}</span>
              <span>${tab.id === "character" ? character.name : tab.label}</span>
            </button>`;
        })}
        <div class="nav-sep"></div>
        <button class="nav-row close" @click=${() => (this.settingsOpen=false)}>
          <span class="material-symbols-rounded">arrow_back</span><span>Back to chat</span>
        </button>
      </nav>
      <div class="settings-body">
        <div class="settings-head">
          <strong>${active.id === "character" ? character.name : active.label}<span>Changes sync between WebUI and Android</span></strong>
          <button class="icon-btn" title="Close settings" aria-label="Close settings" @click=${() => (this.settingsOpen=false)}><span class="material-symbols-rounded">close</span></button>
        </div>
        ${this.editorTab === "character" ? this.renderCharacterPanel(character) : nothing}
        ${this.editorTab === "model" ? this.renderModelPanel(conversation) : nothing}
        ${this.editorTab === "images" ? this.renderImagesPanel(character) : nothing}
        ${this.editorTab === "profile" ? this.renderProfilePanel() : nothing}
      </div>
    </section>`;
  }

  private field(label: string, key: keyof ChatCharacter, value: string, rows = 1) {
    return html`<label>${label}${rows > 1
      ? html`<textarea class="field" rows=${rows} .value=${value} @change=${(event:Event) => this.updateCharacter(key, (event.target as HTMLTextAreaElement).value)}></textarea>`
      : html`<input class="field" .value=${value} @change=${(event:Event) => this.updateCharacter(key, (event.target as HTMLInputElement).value)} />`}</label>`;
  }

  private renderCharacterPanel(character: ChatCharacter) {
    const libby = character.id === "libby" && !loadHideLibby();
    return html`<div class="panel">
      <section class="group">
        <h3>Picture<span>Their face in the friend rail, the header, and every message.</span></h3>
        <div class="pfp-row">
          ${this.avatar(character, "pfp")}
          <div class="pfp-actions">
            <strong>${character.name}</strong>
            <span class="empty">${libby
              ? "Libby wears her artwork by default. A picture set here replaces it everywhere."
              : "Kept apart from this character's images — a face is never offered as a photo to send."}</span>
            <div class="panel-actions">
              <span class="file-btn">${character.avatarImageId ? "Replace picture" : "Upload picture"}<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" @change=${this.uploadCharacterPicture}/></span>
              ${character.avatarImageId ? html`<button class="secondary" @click=${() => void this.removeCharacterPicture()}>Remove</button>` : nothing}
            </div>
          </div>
        </div>
      </section>
      <div class="grid">${this.field("Name", "name", character.name)}<label>Default mode<select .value=${character.defaultMode} @change=${(event:Event) => this.updateCharacter("defaultMode", (event.target as HTMLSelectElement).value)}>${MODES.map((mode) => html`<option value=${mode.id}>${mode.label}</option>`)}</select></label></div>
      ${this.field("Description", "description", character.description ?? "", 2)}
      <div class="grid">${this.field("Personality", "personality", character.personality ?? "", 3)}${this.field("Scenario", "scenario", character.scenario ?? "", 3)}</div>
      ${this.field("First message", "firstMessage", character.firstMessage ?? "", 2)}
      ${this.field("System prompt / card instructions", "systemPrompt", character.systemPrompt ?? "", 3)}
      ${this.field("Example dialogue", "exampleDialogue", character.exampleDialogue ?? "", 3)}
      ${this.field("Creator notes (not sent to model)", "creatorNotes", character.creatorNotes ?? "", 2)}
      <label>Character-card weight <span class="range"><input type="range" min="0.1" max="2" step="0.05" .value=${String(character.promptWeight || 1)} @input=${(event:Event) => this.updateCharacter("promptWeight", Number((event.target as HTMLInputElement).value))}/><output>${(character.promptWeight || 1).toFixed(2)}</output></span></label>
      <div class="panel-actions"><button class="primary" @click=${() => void this.saveWorkspace()}>Save card</button><span class="file-btn">Import SillyTavern card<input type="file" accept="application/json,.json,image/*" @change=${this.importCard}/></span>${character.builtIn ? html`<span class="empty">Libby's built-in card is editable.</span>` : html`<button class="danger" @click=${this.deleteCharacter}>Remove friend</button>`}</div>
    </div>`;
  }

  /** Loads a model, then re-probes. Long-running: the backend caps it at 10 minutes. */
  private async loadModel() {
    const target = this.modelChoice || this.models?.models[0];
    if (!target || this.modelBusy) return;
    this.modelBusy = true; this.say(`Loading ${target}… this can take a few minutes.`);
    try {
      await api.loadChatModel(target);
      await this.refreshModels(true);
      this.say(`Loaded ${this.models?.loaded || target}.`);
    } catch (error) { this.say((error as Error).message, true); }
    finally { this.modelBusy = false; }
  }

  /** Unloading frees VRAM but leaves the backend with no model, so it is confirmed. */
  private async unloadModel() {
    if (this.modelBusy || !confirm("Unload the current model? Chat stops working until a model is loaded again.")) return;
    this.modelBusy = true; this.say("Unloading…");
    try {
      await api.unloadChatModel();
      await this.refreshModels(true);
      this.say("Model unloaded.");
    } catch (error) { this.say((error as Error).message, true); }
    finally { this.modelBusy = false; }
  }

  private renderModelControls() {
    const models = this.models?.models ?? [], loaded = this.models?.loaded || this.status?.model || "";
    return html`<label>Text-generation backend
      <div class="model-row">
        <strong>${loaded || "No model loaded"}</strong>
        <button class="secondary" ?disabled=${this.modelBusy} @click=${() => void this.refreshModels()}>Refresh</button>
      </div>
    </label>
    ${this.models?.supported === false
      ? html`<div class="empty">This backend serves an OpenAI-compatible API but does not expose model load/unload. Manage the model where it runs.</div>`
      : html`
        <label>Model
          <select class="field" ?disabled=${this.modelBusy || !models.length}
            .value=${this.modelChoice || loaded}
            @change=${(event: Event) => (this.modelChoice = (event.target as HTMLSelectElement).value)}>
            ${models.length ? nothing : html`<option value="">No models found</option>`}
            ${models.map((model) => html`<option value=${model} ?selected=${model === (this.modelChoice || loaded)}>${model}</option>`)}
          </select>
        </label>
        <div class="panel-actions">
          <button class="primary" ?disabled=${this.modelBusy || !models.length} @click=${() => void this.loadModel()}>
            ${this.modelBusy ? "Working…" : "Load model"}
          </button>
          <button class="danger" ?disabled=${this.modelBusy || !loaded} @click=${() => void this.unloadModel()}>Unload</button>
        </div>
        ${this.modelBusy ? html`<div class="empty">Loading a large model can take several minutes. Leaving this page will not cancel it.</div>` : nothing}`}`;
  }

  /** Copies this conversation's sampler settings to the workspace seed for new chats. */
  private saveOptionsGlobally(conversation: ChatConversation) {
    this.workspace.defaults = { ...(conversation.options ?? defaultOptions()) };
    this.touchWorkspace();
    void this.saveWorkspace();
    this.say("Saved as the default for new conversations.");
  }

  private renderModelPanel(conversation: ChatConversation) {
    const range = (label:string,key:string,min:number,max:number,step:number,fallback:number) => html`<label>${label}<span class="range"><input type="range" min=${min} max=${max} step=${step} .value=${String(optionNumber(conversation.options,key,fallback))} @input=${(event:Event) => this.updateOption(key,Number((event.target as HTMLInputElement).value))}/><output>${optionNumber(conversation.options,key,fallback)}</output></span></label>`;
    const hasGlobal = !!this.workspace.defaults;
    return html`<div class="panel">
      <section class="group">
        <h3>Backend</h3>
        ${this.renderModelControls()}
      </section>

      <section class="group">
        <h3>Generation<span>Applies to this conversation unless you save it as the default.</span></h3>
        <div class="grid">
          ${range("Temperature","temperature",0,2,.05,.8)}${range("Top P","top_p",.05,1,.05,.95)}
          ${range("Repetition penalty","repetition_penalty",1,2,.05,1.1)}${range("Max reply tokens","max_tokens",64,2048,32,400)}
        </div>
        <details>
          <summary>Advanced API options</summary>
          <textarea class="field" rows="5" .value=${JSON.stringify(conversation.options ?? {}, null, 2)} @change=${(event:Event) => { try { const parsed=JSON.parse((event.target as HTMLTextAreaElement).value) as ChatOptions; this.updateConversation({options:parsed}); } catch { this.say("Advanced options must be valid JSON.",true); } }}></textarea>
        </details>
        <div class="panel-actions">
          <button class="primary" @click=${() => void this.saveWorkspace()}>Save for this chat</button>
          <button class="secondary" @click=${() => this.saveOptionsGlobally(conversation)}>Save as global default</button>
          <button class="secondary" @click=${() => { conversation.options = { ...(this.workspace.defaults ?? defaultOptions()) }; this.touchWorkspace(); }}>Reset${hasGlobal ? " to global" : ""}</button>
        </div>
      </section>

      <section class="group">
        <h3>This conversation<span>Mood and pacing for the current chat only.</span></h3>
        <div class="grid">
          <label>Conversation mode<select .value=${conversation.mode} @change=${(event:Event) => this.updateConversation({mode:(event.target as HTMLSelectElement).value})}>${MODES.map((mode) => html`<option value=${mode.id}>${mode.label}</option>`)}</select></label>
          <label>Displayed emotion<select .value=${conversation.emotion} @change=${(event:Event) => this.updateConversation({emotion:(event.target as HTMLSelectElement).value})}>${["neutral","happy","mischievous","surprised","thinking"].map((emotion) => html`<option>${emotion}</option>`)}</select></label>
        </div>
        <label>Intensity <span class="range"><input type="range" min="1" max="5" step="1" .value=${String(conversation.intensity)} @input=${(event:Event) => this.updateConversation({intensity:Number((event.target as HTMLInputElement).value)})}/><output>${conversation.intensity}/5</output></span></label>
      </section>
    </div>`;
  }

  private renderImagesPanel(character: ChatCharacter) {
    const images = this.workspace.images.filter((image) => image.characterId === character.id);
    return html`<div class="panel">
      <p class="empty">Images are scanned locally. ${character.name} may attach one when its tags match the current exchange. Your own profile picture is set under Profile and is kept separate from these.</p>
      <div class="upload-row">
        <label>Extra matching tags<input class="field" placeholder="beach, happy, bedroom" .value=${this.imageTags} @input=${(event:Event) => (this.imageTags=(event.target as HTMLInputElement).value)}/></label>
        <span class="file-btn">Upload and scan<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" @change=${this.uploadImage}/></span>
      </div>
      <div class="image-grid">${images.map((image) => html`
        <article class="image-card">
          <img src=${api.chatImageURL(image.id)} alt=${image.name}/>
          <button class="remove" title="Delete ${image.name}" aria-label="Delete ${image.name}" @click=${() => void this.deleteImage(image)}>×</button>
          <div class="card-body">
            <span class="card-name">${image.name}</span>
            <span class="card-tags">${image.tags.join(", ") || "No tags"}</span>
            ${character.avatarImageId === image.id
              ? html`<span class="badge">Avatar</span>`
              : html`<button @click=${() => this.updateCharacter("avatarImageId", image.id)}>Use as avatar</button>`}
          </div>
        </article>`)}</div>
      ${images.length ? nothing : html`<div class="empty">No images for ${character.name} yet.</div>`}
    </div>`;
  }

  private renderProfilePanel() {
    const profile = this.workspace.profile, me = profile.displayName || this.user?.username || "You";
    return html`<div class="panel"><p class="empty">This profile is shared by WebUI and APK and is included in character context.</p>
      <div class="pfp-row">
        <span class="pfp">${profile.avatarImageId
          ? html`<img src=${api.chatImageURL(profile.avatarImageId)} alt="Your profile picture"/>`
          : html`<span class="pfp-initial">${me.slice(0,2).toUpperCase()}</span>`}</span>
        <div class="pfp-actions">
          <strong>Profile picture</strong>
          <span class="empty">Yours alone — it is never offered as a character image or attached to a reply.</span>
          <div class="panel-actions">
            <span class="file-btn">${profile.avatarImageId ? "Replace picture" : "Upload picture"}<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" @change=${this.uploadProfilePicture}/></span>
            ${profile.avatarImageId ? html`<button class="danger" @click=${() => void this.removeProfilePicture()}>Remove</button>` : nothing}
          </div>
        </div>
      </div>
      <label>Display name<input class="field" .value=${profile.displayName} @change=${(event:Event) => { profile.displayName=(event.target as HTMLInputElement).value; this.touchWorkspace(); }}/></label>
      <label>Your persona<textarea class="field" rows="5" placeholder="How friends should know and address you…" .value=${profile.persona} @change=${(event:Event) => { profile.persona=(event.target as HTMLTextAreaElement).value; this.touchWorkspace(); }}></textarea></label>
      <div class="panel-actions"><button class="primary" @click=${() => void this.saveWorkspace()}>Save profile</button></div></div>`;
  }

  /** Whether re-responding would redo this message: only the last assistant run can be. */
  private canRedo(message: StoredChatMessage): boolean {
    const messages = this.activeConversation?.messages ?? [];
    if (message.role !== "assistant") return false;
    const at = messages.indexOf(message);
    return at >= 0 && messages.slice(at + 1).every((later) => later.role === "assistant");
  }

  /**
   * The chat pane's own menu, for right-clicks that miss a message. Message rows
   * stop the event before it reaches here, so the two never both fire.
   */
  private chatMenu = (event: MouseEvent) => {
    if (nativeMenuWanted(event)) return;
    event.preventDefault();
    const character = this.activeCharacter, conversation = this.activeConversation;
    const path = event.composedPath();
    // A right-click on a conversation row acts on that conversation, not the open one.
    const row = path.find((node) => (node as HTMLElement)?.classList?.contains?.("convo-wrap")) as HTMLElement | undefined;
    const rowID = row?.dataset.id;
    const items: MenuItem[] = rowID
      ? [
          { label:"Open", icon:"forum", run:() => this.activateConversation(rowID) },
          { label:"New conversation", icon:"add_comment", run:() => this.newConversation() },
          menuDivider,
          { label:"Delete conversation", icon:"delete", danger:true, run:() => this.deleteConversation(rowID) },
        ]
      : [
          { label:"Re-respond", icon:"refresh", disabled:this.busy || !conversation?.messages.some((m) => m.role === "assistant"), run:() => void this.regenerate() },
          { label:this.callOpen ? "End video call" : "Video call", icon:this.callOpen ? "call_end" : "videocam", run:() => this.callOpen ? this.endCall() : this.startCall() },
          { label:"Share a photo", icon:"add_photo_alternate", disabled:this.busy, run:() => this.pickPhoto() },
          { label:this.autopilot ? "Turn off autopilot" : "Let the AI continue on its own", icon:"smart_toy", run:() => this.toggleAutopilot() },
          { label:this.stageOpen ? "Hide portrait" : "Show portrait", icon:"wallpaper", run:() => (this.stageOpen = !this.stageOpen) },
          menuDivider,
          { label:"New conversation", icon:"add_comment", run:() => this.newConversation() },
          { label:"Chat settings", icon:"tune", run:() => { this.settingsOpen = true; this.editorTab = "character"; } },
          { label:"Refresh model status", icon:"sync", run:() => void this.refreshModels() },
          menuDivider,
          { label:"Clear messages", icon:"delete_sweep", danger:true, run:() => this.clearConversation() },
        ];
    openMenu({ x:event.clientX, y:event.clientY, title:character?.name, items });
  };

  private messageMenu(message: StoredChatMessage, event: MouseEvent) {
    if (nativeMenuWanted(event)) return;
    // The pane-level menu is the fallback for clicks that miss a message; without
    // this it would open on top of the one built here.
    event.preventDefault(); event.stopPropagation();
    const redo = this.canRedo(message);
    const items: MenuItem[] = [
      { label:"Copy text", icon:"content_copy", run:() => void navigator.clipboard.writeText(message.content) },
      { label:"Edit message", icon:"edit", run:() => this.editMessage(message) },
      ...(redo ? [{ label:"Re-respond", icon:"refresh", disabled:this.busy, run:() => void this.regenerate() }] : []),
      menuDivider,
      { label:"Delete message", icon:"delete", danger:true, run:() => this.deleteMessage(message.id) },
    ];
    openMenu({ x:event.clientX, y:event.clientY, title:message.role === "assistant" ? "Message" : "Your message", items });
  }

  private renderEntry(message: StoredChatMessage, previous?: StoredChatMessage) {
    const character = this.activeCharacter; if (!character) return nothing;
    const grouped = previous?.role === message.role && message.at - previous.at < 5*60_000;
    const friend = message.role === "assistant", name = friend ? character.name : (this.workspace.profile.displayName || this.user?.username || "You");
    return html`<article class="row ${grouped ? "" : "first"} ${friend ? "from-friend" : "from-user"}" @contextmenu=${(event:MouseEvent) => this.messageMenu(message, event)}>${grouped ? html`<span class="stamp">${timeOf(message.at)}</span>` : (friend ? this.avatar(character,"avatar") : html`<span class="avatar initial">${name.slice(0,2).toUpperCase()}</span>`)}
      <div class="message">${grouped ? nothing : html`<div class="who"><span class="author ${friend ? "friend" : ""}">${name}</span><span class="when">Today at ${timeOf(message.at)}</span></div>`}<div class="text">${formatted(message.content)}</div>${message.imageId ? html`<img class="sent-image" src=${api.chatImageURL(message.imageId)} alt="Image sent by ${name}"/>` : nothing}</div>
      <span class="message-actions">${this.canRedo(message) ? html`<button title="Re-respond" aria-label="Ask for a different reply" ?disabled=${this.busy} @click=${() => void this.regenerate()}><span class="material-symbols-rounded" style="font-size:16px">refresh</span></button>` : nothing}<button title="Copy" @click=${() => void navigator.clipboard.writeText(message.content)}><span class="material-symbols-rounded" style="font-size:16px">content_copy</span></button><button title="Edit" @click=${() => this.editMessage(message)}><span class="material-symbols-rounded" style="font-size:16px">edit</span></button><button title="Delete" @click=${() => this.deleteMessage(message.id)}><span class="material-symbols-rounded" style="font-size:16px">delete</span></button></span>
    </article>`;
  }

  /**
   * Draws the screen, or says why it couldn't.
   *
   * Lit has no error boundary: a throw during an update aborts the pass and leaves
   * the previously drawn DOM in place, with the cause only in the console. Since the
   * first thing this component ever draws is its loading spinner, *any* render bug
   * presents identically — as a chat screen that spins forever in every browser,
   * including a fresh incognito window. That is precisely how a single
   * "messages": null in the stored workspace hid, so the failure is now caught and
   * shown rather than left to look like a hang.
   */
  render() {
    try {
      return this.renderClient();
    } catch (error) {
      console.error("chat render failed", error);
      return html`<div class="client"><section class="main load-failed">
        <h2>Chat couldn't be drawn.</h2>
        <p>${(error as Error)?.message || String(error)}</p>
        <p class="hint">This is a bug — the detail above and the browser console say which part of the workspace is malformed.</p>
        <button class="autobar-btn" @click=${() => void this.retryLoad()}>Reload chat</button>
      </section></div>`;
    }
  }

  private renderClient() {
    const character=this.activeCharacter, conversation=this.activeConversation;
    if (this.loading) return html`<div class="client"><section class="main" style="grid-column:1/-1;place-items:center;display:grid"><md-circular-progress indeterminate></md-circular-progress></section></div>`;
    if (!character || !conversation) return html`<div class="client"><section class="main" style="grid-column:1/-1;padding:24px">Chat workspace is unavailable.</section></div>`;
    const channel=MODES.find((mode)=>mode.id===conversation.mode)??MODES[0];
    const stage=this.stageOpen?this.renderStage(character,conversation):nothing;
    return html`<div class="client ${this.mobileNavOpen ? "nav-open" : ""} ${stage!==nothing ? "with-stage" : ""}" @pointerdown=${this.armIdle} @contextmenu=${this.chatMenu}><button class="nav-scrim" aria-label="Close chat navigation" @click=${() => (this.mobileNavOpen=false)}></button>${this.renderRail()}${this.renderSidebar()}
      <main class="main"><header class="top"><button class="icon-btn mobile-nav" title="Friends and conversations" aria-label="Open friends and conversations" @click=${() => (this.mobileNavOpen=true)}><span class="material-symbols-rounded">menu</span></button>${this.avatar(character,"top-avatar")}<span class="top-title"><span class="name">${character.name}</span><span class="topic">${this.status?.enabled ? this.status.model : character.id === "libby" ? "Local replies" : "Model offline"} · ${channel.topic}</span></span><select class="quick-mode" aria-label="Conversation mode" title="Conversation mode" .value=${conversation.mode} @change=${(event:Event) => this.updateConversation({mode:(event.target as HTMLSelectElement).value})}>${MODES.map((mode)=>html`<option value=${mode.id}>${mode.label}</option>`)}</select><span class="top-actions"><button class="icon-btn ${this.callOpen?"on":""}" title="Video call" aria-label="Video call" @click=${()=>this.startCall()}><span class="material-symbols-rounded">videocam</span></button><button class="icon-btn ${this.autopilot?"on":""}" title=${this.autopilot?"Turn off autopilot":"Let the AI continue on its own"} aria-label="Autopilot" aria-pressed=${this.autopilot?"true":"false"} @click=${()=>this.toggleAutopilot()}><span class="material-symbols-rounded">smart_toy</span></button><button class="icon-btn stage-toggle ${this.stageOpen?"on":""}" title=${this.stageOpen?"Hide portrait":"Show portrait"} aria-label="Portrait" aria-pressed=${this.stageOpen?"true":"false"} @click=${()=>(this.stageOpen=!this.stageOpen)}><span class="material-symbols-rounded">wallpaper</span></button><button class="icon-btn" title="New conversation" aria-label="New conversation" @click=${() => this.newConversation()}><span class="material-symbols-rounded">add_comment</span></button><button class="icon-btn destructive-action" title="Clear messages" aria-label="Clear messages" @click=${this.clearConversation}><span class="material-symbols-rounded">delete_sweep</span></button><button class="icon-btn ${this.settingsOpen?"on":""}" title="Chat settings" aria-label="Chat settings" @click=${()=>(this.settingsOpen=!this.settingsOpen)}><span class="material-symbols-rounded">tune</span></button></span></header>
        ${this.settingsOpen?this.renderSettings():nothing}
        ${this.loadError ? html`<div class="backend-state load-error" role="alert"><strong>Chat didn't load.</strong> ${this.loadError}
          ${this.workspaceLoaded ? nothing : html` Your saved characters and conversations aren't shown, and nothing is being saved until this succeeds.`}
          <button class="autobar-btn" @click=${() => void this.retryLoad()}>Retry</button></div>` : nothing}
        ${this.status?.modelBackend && !this.status.enabled ? html`<div class="backend-state" role="status"><strong>Text generation offline.</strong> ${this.status.message || "Load a model in text-generation-webui, then refresh status."}</div>` : nothing}
        ${this.renderAutopilotBar(character)}
        <section class="log">${conversation.messages.length ? nothing : html`<div class="intro">${this.avatar(character,"round")}<h2>${character.name}</h2><p>${character.description || `This is the beginning of your conversation with ${character.name}.`}${this.status?.enabled?` Running on ${this.status.model}.`:character.id === "libby" ? " Libby is using built-in local replies." : " Connect a local model to start chatting."}</p></div>`}
          ${conversation.messages.map((message,index)=>this.renderEntry(message,conversation.messages[index-1]))}${this.busy&&this.typingPhase==="typing"?html`<div class="typing"><span class="dots"><i></i><i></i><i></i></span><b>${character.name}</b> is typing…</div>`:nothing}
        </section>${this.notice?html`<div class="notice ${this.noticeError?"error":""}" role=${this.noticeError?"alert":"status"}>${this.notice}</div>`:nothing}
        <form class="composer-form" @submit=${(event:Event)=>{event.preventDefault();void this.send();}}>
          ${this.pendingPhoto ? html`<div class="attachment"><img src=${api.chatImageURL(this.pendingPhoto.imageId)} alt=${`Attached photo: ${this.pendingPhoto.name}`}/>
            <span class="attachment-copy"><strong>${this.pendingPhoto.name}</strong><span>${this.pendingPhoto.tags.length ? this.pendingPhoto.tags.slice(0,8).join(", ") : "No content tags found"}</span></span>
            <button type="button" class="icon-btn" title="Remove photo" aria-label="Remove photo" @click=${()=>void this.discardPhoto()}><span class="material-symbols-rounded">close</span></button></div>` : nothing}
          <div class="composer">
            <span class="attach-btn ${this.busy?"off":""}" title="Share a photo"><span class="material-symbols-rounded">add_photo_alternate</span><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" aria-label="Share a photo" ?disabled=${this.busy} @change=${(event:Event)=>void this.attachPhoto(event)}/></span>
            <textarea rows="1" aria-label=${`Message ${character.name}`} placeholder=${this.busy?`${character.name} is replying — keep typing…`:`Message ${character.name}…`} .value=${this.draft} @input=${(event:Event)=>(this.draft=(event.target as HTMLTextAreaElement).value)} @keydown=${this.onKey}></textarea>
            <button class="icon-btn" type="submit" title="Send message" aria-label="Send message" ?disabled=${(!this.draft.trim()&&!this.pendingPhoto)||this.busy}><span class="material-symbols-rounded">send</span></button>
          </div><div class="format-help"><span>"speech" · **action** · *emphasis* · ~~strike~~ · &#96;code&#96;</span><span class="send-help"></span></div></form>
      </main>${stage}${this.renderCall(character,conversation)}
    </div>`;
  }
}

declare global { interface HTMLElementTagNameMap { "oppai-chat": OppaiChat; } }
