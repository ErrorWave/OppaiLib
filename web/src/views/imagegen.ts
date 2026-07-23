import { LitElement, html, css, nothing } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { iconStyles, motionStyles } from "../theme.js";
import {
  api,
  mascotSay,
  type GenCharacter,
  type GenLora,
  type GenModel,
  type GenModelMeta,
  type GenPreview,
  type GenTemplate,
  type GenVae,
  type GalleryBoard,
  type ImageGenStatus,
} from "../api.js";
import { libbyReact } from "../libby-voice.js";
import { canvasToBlob, cutOutBackground, loadImage } from "../cutout.js";
import type { LibbyEmotion } from "../libby.js";
import "./imagegen-gallery.js";
import "./civitai.js";
import type { OppaiInvokeGallery } from "./imagegen-gallery.js";

// ── Web Speech typings ─────────────────────────────────────────────────────────
// The Speech Recognition API isn't in the standard DOM lib, and it's still vendor-
// prefixed in most browsers (webkitSpeechRecognition). These are the minimal shapes
// this view uses; the runtime feature-detects before touching any of it.
interface SpeechRecognitionResultLike {
  0: { transcript: string };
  isFinal: boolean;
}
interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResultLike>;
}
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}
type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function speechRecognitionCtor(): SpeechRecognitionCtor | null {
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

// A generated image, plus the local state that hangs off it (saved yet?).
interface Shot extends GenPreview {
  saved: boolean;
}

// Resolution presets under the prompt's Options menu. SD 1.x models train at ~512,
// SDXL at ~1024 — offering both families beats making people type pixel counts.
const RESOLUTIONS: { label: string; hint: string; w: number; h: number }[] = [
  { label: "Portrait", hint: "512×768", w: 512, h: 768 },
  { label: "Square", hint: "512×512", w: 512, h: 512 },
  { label: "Landscape", hint: "768×512", w: 768, h: 512 },
  { label: "Tall", hint: "640×960", w: 640, h: 960 },
  { label: "XL Portrait", hint: "832×1216", w: 832, h: 1216 },
  { label: "XL Square", hint: "1024×1024", w: 1024, h: 1024 },
  { label: "XL Landscape", hint: "1216×832", w: 1216, h: 832 },
];

// Schedulers offered under Model settings. The server maps A1111-style names onto
// InvokeAI ids, so the same values work against either backend.
const SCHEDULERS: { id: string; label: string }[] = [
  { id: "", label: "Default (Euler a)" },
  ...[
    ["ddim", "DDIM"], ["ddpm", "DDPM"], ["deis", "DEIS"], ["deis_k", "DEIS Karras"],
    ["dpmpp_2s", "DPM++ 2S"], ["dpmpp_2s_k", "DPM++ 2S Karras"],
    ["dpmpp_2m", "DPM++ 2M"], ["dpmpp_2m_k", "DPM++ 2M Karras"],
    ["dpmpp_2m_sde", "DPM++ 2M SDE"], ["dpmpp_2m_sde_k", "DPM++ 2M SDE Karras"],
    ["dpmpp_3m", "DPM++ 3M"], ["dpmpp_3m_k", "DPM++ 3M Karras"],
    ["dpmpp_sde", "DPM++ SDE"], ["dpmpp_sde_k", "DPM++ SDE Karras"],
    ["er_sde", "ER-SDE"], ["euler", "Euler"], ["euler_k", "Euler Karras"],
    ["euler_a", "Euler Ancestral"], ["heun", "Heun"], ["heun_k", "Heun Karras"],
    ["kdpm_2", "KDPM 2"], ["kdpm_2_k", "KDPM 2 Karras"],
    ["kdpm_2_a", "KDPM 2 Ancestral"], ["kdpm_2_a_k", "KDPM 2 Ancestral Karras"],
    ["lcm", "LCM"], ["lms", "LMS"], ["lms_k", "LMS Karras"],
    ["pndm", "PNDM"], ["tcd", "TCD"], ["unipc", "UniPC"], ["unipc_k", "UniPC Karras"],
  ].map(([id, label]) => ({ id, label })),
];

// ── outfit helper ──────────────────────────────────────────────────────────────
//
// Libby's wardrobe wants one image per expression per heat tier — twenty-five of
// them for a complete outfit, all of the same character in the same clothes. Typing
// that by hand is where consistency goes to die, so the helper owns the parts that
// have to stay identical across the set and varies only the face and the mood.
//
// It composes a prompt *fragment* rather than writing into the prompt box, so it
// stays live as the pose is stepped through and can be switched off without having
// to unpick text someone has since edited.

/** The five poses the wardrobe has slots for, and the face each one wants. */
const OUTFIT_FACES: { id: LibbyEmotion; label: string; face: string }[] = [
  { id: "neutral", label: "Neutral", face: "calm neutral expression, relaxed face, looking at viewer" },
  { id: "happy", label: "Happy", face: "warm genuine smile, bright eyes, cheerful expression" },
  { id: "mischievous", label: "Mischievous", face: "smirk, half-lidded eyes, teasing knowing expression" },
  { id: "surprised", label: "Surprised", face: "surprised expression, wide eyes, slightly open mouth" },
  { id: "thinking", label: "Thinking", face: "thoughtful expression, looking to the side, hand near chin" },
];

/** The five heat tiers, matching libby-meter's 1–5. Posture and flush, not clothing. */
const OUTFIT_TIERS: { label: string; mood: string }[] = [
  { label: "Calm", mood: "composed posture, arms relaxed" },
  { label: "Warm", mood: "soft light blush, inviting posture, slight lean forward" },
  { label: "Flirty", mood: "flirty pose, hand on hip, confident stance, blush" },
  { label: "Heated", mood: "heavy blush, sultry pose, parted lips, heavy-lidded eyes" },
  { label: "Peak", mood: "deep blush, flushed skin, breathless needy expression" },
];

/** Terms that push the model toward something a flat cut-out can actually work on. */
const CUTOUT_PROMPT = "solid flat white background, plain background, no scenery, full body, " +
  "standing, centered, even lighting, no cast shadow";
const CUTOUT_NEGATIVE = "detailed background, scenery, room, furniture, gradient background, " +
  "shadow on background, floor, horizon, text, watermark, signature, border, frame";

// A character being edited (or created — id undefined until saved).
interface CharDraft {
  id?: string;
  name: string;
  prompt: string;
  negativePrompt: string;
  /** A newly-chosen thumbnail as a data URL; undefined keeps the existing one. */
  imageData?: string;
}

/**
 * The image-generation studio: pick a checkpoint (and LoRAs, VAE, templates,
 * characters) in the sidebar, speak or type a prompt, generate, and — only on an
 * explicit Save — keep one in the library.
 *
 * The *library* gains nothing until Save: the server holds generated previews in
 * memory and streams them from there, so an unsaved batch never touches the library.
 * InvokeAI, meanwhile, keeps every finished image in its own gallery on the
 * generator box — the right-hand panel browses that gallery, saves picks into the
 * library, and deletes the rest.
 *
 * It talks to a local InvokeAI or Automatic1111 / SD.Next backend through the server
 * (the browser never reaches the generator directly), so it works the same on a phone
 * as on a desktop; speech uses the browser's own recognition where available.
 */
@customElement("oppai-imagegen")
export class OppaiImageGen extends LitElement {
  @state() private status: ImageGenStatus | null = null;
  @state() private checkpoint = "";
  @state() private vae = "";
  @state() private templateId = "";
  /** Built-in style presets are hidden by default; the picker shows the user's own. */
  @state() private showBuiltInTemplates = false;
  @state() private selectedLoras: Record<string, number> = {};
  @state() private selectedTriggers: string[] = [];
  @state() private loraPage = 0;
  // Outfit helper. `outfitOn` gates the whole fragment so it can be switched off
  // without losing the wardrobe being worked on.
  @state() private outfitOn = false;
  @state() private outfitText = "";
  @state() private outfitFace = 0;
  @state() private outfitTier = 0;
  @state() private outfitCutout = true;

  /** The cut-out being previewed, if any. */
  @state() private cutout: { url: string; name: string } | null = null;
  @state() private cutoutTolerance = 42;
  @state() private cutoutBusy = false;
  @state() private cutoutError = "";
  @query(".cutout-canvas") private cutoutHost?: HTMLElement;
  /** Held so it can be encoded on demand without redoing the fill. */
  private cutoutCanvas: HTMLCanvasElement | null = null;

  @state() private characters: GenCharacter[] = [];
  @state() private selectedChars: string[] = [];
  @state() private charDraft: CharDraft | null = null;
  @state() private charBusy = false;
  @state() private scanBusy = false;

  // Which sidebar sections are unfolded. Models start open — it's the choice that
  // shapes everything else; the rest unfold on demand.
  @state() private open: Record<string, boolean> = { models: true };

  @state() private speech = "";
  @state() private listening = false;
  @state() private optimizing = false;

  @state() private prompt = "";
  @state() private tagSuggestions: string[] = [];
  @state() private tagCorrection = "";
  @state() private negative = "";
  @state() private showOptions = false;

  @state() private width = 512;
  @state() private height = 768;
  @state() private steps = 25;
  @state() private cfg = 7;
  @state() private cfgRescale = 0;
  @state() private clipSkip = 0;
  @state() private seamlessX = false;
  @state() private seamlessY = false;
  @state() private vaePrecision: "fp32" | "fp16" = "fp32";
  @state() private cpuNoise = true;
  @state() private board = "none";
  @state() private scheduler = "";
  @state() private count = 1;
  @state() private seed = -1;
  @state() private detailerEnabled = false;
  @state() private detailerModel = "face_yolov8n.pt";
  @state() private detailerPrompt = "";
  @state() private detailerNegative = "";
  @state() private detailerConfidence = 0.3;
  @state() private detailerDenoise = 0.4;
  @state() private detailerMaskBlur = 4;

  @state() private generating = false;
  @state() private shots: Shot[] = [];
  @state() private error = "";
  @state() private toast = "";

  // Bumps thumbnail query strings so a freshly-set preview repaints without a full
  // reload fighting the browser cache.
  @state() private thumbVersion = 0;

  // Thumbnail URLs that 404'd, so their tiles render a proper placeholder instead
  // of a black box. Tracked as state (not by mutating the <img> in its error
  // handler) because Lit reuses DOM nodes across renders — a style hack stuck to
  // one <img> used to bleed onto other cards and survive a successful reload,
  // which is why freshly-set previews appeared to "stay black".
  @state() private failedThumbs = new Set<string>();

  /** A result shot expanded to full size, by preview id. */
  @state() private expandedShot: Shot | null = null;

  /** The model/LoRA record being edited, or null. */
  @state() private metaDraft: GenModelMeta | null = null;
  @state() private metaBusy = false;
  @state() private metaTriggerText = "";

  /** Whether the Civitai browser is on screen. */
  @state() private civitaiOpen = false;

  @query("oppai-invoke-gallery") private galleryPanel?: OppaiInvokeGallery;

  private recognition: SpeechRecognitionLike | null = null;

  static styles = [
    iconStyles,
    motionStyles,
    css`
      :host {
        display: block;
        color: var(--oppai-text);
      }
      .wrap {
        max-width: 1240px;
        margin: 0 auto;
        padding-bottom: 40px;
      }
      .layout {
        display: grid;
        grid-template-columns: 300px minmax(0, 1fr) 300px;
        gap: 20px;
        align-items: start;
      }
      @media (max-width: 1220px) {
        .layout {
          grid-template-columns: 300px minmax(0, 1fr);
        }
        /* The gallery drops under the main column rather than vanishing. */
        .layout > .right {
          grid-column: 2;
        }
      }
      @media (max-width: 940px) {
        .layout {
          grid-template-columns: minmax(0, 1fr);
        }
        .layout > .right {
          grid-column: 1;
        }
      }
      .empty {
        text-align: center;
        padding: 70px 20px;
        color: var(--oppai-text-muted);
      }
      .empty .material-symbols-rounded {
        font-size: 44px;
        display: block;
        margin-bottom: 12px;
      }

      /* Sidebar: stacked, collapsible sections. */
      .side {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .sec {
        background: var(--oppai-surface-2);
        border-radius: 14px;
        overflow: hidden;
      }
      .sec-head {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 8px;
        border: none;
        background: none;
        color: var(--oppai-text);
        font: inherit;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.3px;
        padding: 12px 14px;
        cursor: pointer;
        text-align: left;
      }
      .sec-head .count {
        margin-left: auto;
        font-weight: 400;
        font-size: 12px;
        color: var(--oppai-text-muted);
      }
      .sec-body {
        padding: 0 12px 12px;
      }
      .sec-note {
        font-size: 12px;
        color: var(--oppai-text-muted);
        padding: 0 2px 4px;
      }
      /* A quiet text-button used for reveal toggles (e.g. showing built-in presets). */
      .link-toggle {
        align-self: flex-start;
        margin-top: 6px;
        border: none;
        background: none;
        padding: 2px;
        font: inherit;
        font-size: 12px;
        color: var(--oppai-primary-bright);
        cursor: pointer;
      }
      .link-toggle:hover {
        text-decoration: underline;
      }

      /* Picker cards (models, LoRAs, characters) — a 2-up grid in the sidebar. */
      .cards {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }
      .card-wrap {
        position: relative;
        min-width: 0;
        max-width: 100%;
      }
      .card {
        width: 100%;
        border: 2px solid transparent;
        border-radius: 12px;
        overflow: hidden;
        background: var(--oppai-surface);
        cursor: pointer;
        padding: 0;
        text-align: left;
        transition: transform 0.18s var(--oppai-ease-spring), border-color 0.18s ease;
        min-width: 0;
        max-width: 100%;
      }
      .card:hover {
        transform: translateY(-2px);
      }
      .card.on {
        border-color: var(--oppai-accent);
      }
      .card-art {
        width: 100%;
        aspect-ratio: 3 / 4;
        object-fit: cover;
        display: block;
        background: var(--oppai-surface-3, var(--oppai-surface-2));
      }
      .card-blank {
        width: 100%;
        aspect-ratio: 3 / 4;
        display: grid;
        place-items: center;
        color: var(--oppai-text-muted);
        background: var(--oppai-surface-3, var(--oppai-surface-2));
      }
      .card-name {
        font-size: 11px;
        padding: 6px 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .card-edit {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 26px;
        height: 26px;
        border-radius: 13px;
        border: none;
        background: rgba(0, 0, 0, 0.55);
        color: #fff;
        display: grid;
        place-items: center;
        cursor: pointer;
      }
      .card-edit.left {
        right: auto;
        left: 4px;
      }
      .lora-weight {
        width: 100%;
        box-sizing: border-box;
        margin-top: 5px;
        padding: 5px 7px;
        border: 1px solid var(--oppai-border-strong);
        border-radius: 8px;
        background: var(--oppai-surface);
        color: var(--oppai-text);
      }
      .pager {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-top: 10px;
        font-size: 12px;
        color: var(--oppai-text-muted);
      }
      .pager button {
        border: 1px solid var(--oppai-border-strong);
        border-radius: 8px;
        background: var(--oppai-surface);
        color: var(--oppai-text);
        padding: 6px 9px;
        cursor: pointer;
      }
      .pager button:disabled { opacity: 0.4; cursor: default; }
      .switch-row {
        display: flex;
        align-items: center;
        gap: 8px;
        min-height: 34px;
        font-size: 12px;
        color: var(--oppai-text-dim);
      }

      /* Compact settings rows in the sidebar. */
      .settings {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }
      .settings .full {
        grid-column: 1 / -1;
      }
      label.field {
        font-size: 12px;
        font-weight: 600;
        color: var(--oppai-text-dim);
        display: block;
        margin-bottom: 6px;
      }
      .num,
      select.num {
        width: 100%;
        box-sizing: border-box;
        background: var(--oppai-surface);
        border: 1px solid var(--oppai-border-strong);
        border-radius: 10px;
        color: var(--oppai-text);
        font: inherit;
        font-size: 13px;
        padding: 8px 10px;
        outline: none;
      }

      /* Template / VAE rows. */
      .rows {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .row-pick {
        border: 1px solid var(--oppai-border-strong);
        background: var(--oppai-surface);
        color: var(--oppai-text);
        border-radius: 10px;
        font: inherit;
        font-size: 13px;
        text-align: left;
        padding: 8px 10px;
        cursor: pointer;
      }
      .row-pick.on {
        border-color: var(--oppai-accent);
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
      }
      .row-sub {
        display: block;
        font-size: 11px;
        opacity: 0.75;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .side-add {
        margin-top: 10px;
        width: 100%;
        height: 36px;
        border: 1px dashed var(--oppai-border-strong);
        border-radius: 10px;
        background: none;
        color: var(--oppai-text-dim);
        font: inherit;
        font-size: 13px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }

      /* Prompt block. */
      .prompt-card {
        background: var(--oppai-surface-2);
        border-radius: 18px;
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .speech-row {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .mic {
        flex: 0 0 auto;
        width: 46px;
        height: 46px;
        border-radius: 23px;
        border: none;
        cursor: pointer;
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
        display: grid;
        place-items: center;
        transition: transform 0.15s var(--oppai-ease-spring), filter 0.15s ease;
      }
      .mic.live {
        background: var(--oppai-error, #f2b8b5);
        color: #000;
        animation: oppai-pulse 1.1s ease-in-out infinite;
      }
      @keyframes oppai-pulse {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.35); }
      }
      .speech-hint {
        font-size: 13px;
        color: var(--oppai-text-muted);
        flex: 1;
      }
      textarea {
        width: 100%;
        box-sizing: border-box;
        background: var(--oppai-surface);
        border: 1px solid var(--oppai-border-strong);
        border-radius: 12px;
        color: var(--oppai-text);
        font: inherit;
        font-size: 14px;
        padding: 10px 12px;
        resize: vertical;
        min-height: 64px;
        outline: none;
      }
      textarea:focus {
        border-color: var(--oppai-primary);
      }
      .adv-toggle {
        background: none;
        border: none;
        color: var(--oppai-primary-bright);
        font: inherit;
        font-size: 13px;
        cursor: pointer;
        padding: 0;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .chips {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .chip {
        min-height: 34px;
        padding: 4px 14px;
        border-radius: 17px;
        font-size: 13px;
        font-family: inherit;
        cursor: pointer;
        background: transparent;
        color: var(--oppai-text-dim);
        border: 1px solid var(--oppai-border-strong);
        text-align: center;
      }
      .chip.on {
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
        border-color: var(--oppai-accent);
      }
      .chip .hint {
        display: block;
        font-size: 10px;
        opacity: 0.75;
      }
      .custom-size {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .custom-size .num {
        width: 90px;
      }
      .generate {
        margin-top: 16px;
        height: 50px;
        width: 100%;
        border: none;
        border-radius: 25px;
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      .generate:disabled {
        opacity: 0.6;
        cursor: default;
      }

      /* Results. */
      .results {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
        margin-top: 14px;
      }
      .shot {
        border-radius: 16px;
        overflow: hidden;
        background: var(--oppai-surface-2);
        position: relative;
      }
      .shot img {
        width: 100%;
        display: block;
        aspect-ratio: 3 / 4;
        object-fit: cover;
        background: #000;
      }
      .shot-actions {
        display: flex;
        gap: 6px;
        padding: 8px;
      }
      .act {
        flex: 1;
        height: 36px;
        border: none;
        border-radius: 10px;
        background: var(--oppai-surface-3, var(--oppai-surface));
        color: var(--oppai-text);
        font: inherit;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
      }
      .act.primary {
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
      }
      .act:disabled {
        opacity: 0.55;
        cursor: default;
      }
      .banner {
        background: var(--oppai-surface-2);
        border: 1px solid var(--oppai-border-strong);
        border-radius: 12px;
        padding: 12px 14px;
        font-size: 13px;
        color: var(--oppai-text-dim);
        margin-top: 12px;
      }
      .section-label {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        color: var(--oppai-text-muted);
        margin: 22px 0 10px;
      }
      .toast {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--oppai-surface-2);
        color: var(--oppai-text);
        padding: 12px 20px;
        border-radius: 12px;
        z-index: 60;
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
        animation: oppai-fade-in-up 0.28s var(--oppai-ease-emphasized) both;
      }
      .hidden-file {
        display: none;
      }

      /* Character editor dialog. */
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        display: grid;
        place-items: center;
        z-index: 50;
        padding: 20px;
      }
      .dialog {
        background: var(--oppai-surface-2);
        border-radius: 18px;
        padding: 18px;
        width: min(440px, 100%);
        max-height: 90vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .dialog h3 {
        margin: 0;
        font-size: 16px;
      }
      .dialog input[type="text"] {
        width: 100%;
        box-sizing: border-box;
        background: var(--oppai-surface);
        border: 1px solid var(--oppai-border-strong);
        border-radius: 10px;
        color: var(--oppai-text);
        font: inherit;
        font-size: 14px;
        padding: 9px 11px;
        outline: none;
      }
      .dialog-thumb {
        display: flex;
        gap: 12px;
        align-items: center;
      }
      .dialog-thumb img {
        width: 72px;
        height: 96px;
        object-fit: cover;
        border-radius: 10px;
        background: var(--oppai-surface);
      }
      .dialog-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
      }
      .dialog-actions .danger {
        margin-right: auto;
        color: var(--oppai-error, #f2b8b5);
      }
      /* Outfit helper: plain checkbox rows, wide enough to hit on a phone. */
      .switch {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: var(--oppai-text-dim);
        cursor: pointer;
      }
      .switch input {
        accent-color: var(--oppai-primary);
        width: 16px;
        height: 16px;
      }
      .cutout-dialog {
        width: min(560px, 100%);
      }
      /* The checkerboard is the point: transparency has to be visible to be judged. */
      .cutout-canvas {
        display: grid;
        place-items: center;
        min-height: 180px;
        max-height: 46vh;
        overflow: auto;
        border-radius: 12px;
        background-color: #6b6b6b;
        background-image:
          linear-gradient(45deg, #4a4a4a 25%, transparent 25%, transparent 75%, #4a4a4a 75%),
          linear-gradient(45deg, #4a4a4a 25%, transparent 25%, transparent 75%, #4a4a4a 75%);
        background-size: 20px 20px;
        background-position: 0 0, 10px 10px;
      }
      .cutout-canvas canvas {
        max-width: 100%;
        max-height: 42vh;
        object-fit: contain;
      }
      .cutout-dialog input[type="range"] {
        width: 100%;
        accent-color: var(--oppai-primary);
      }
      .btn {
        border: none;
        border-radius: 10px;
        background: var(--oppai-surface-3, var(--oppai-surface));
        color: var(--oppai-text);
        font: inherit;
        font-size: 13px;
        font-weight: 600;
        padding: 9px 14px;
        cursor: pointer;
      }
      .btn.primary {
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
      }
      .btn:disabled {
        opacity: 0.55;
        cursor: default;
      }

      /* Result lightbox. */
      .lightbox {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.85);
        z-index: 60;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 14px;
        padding: 20px;
      }
      .lightbox img {
        max-width: min(96vw, 1400px);
        max-height: 82vh;
        object-fit: contain;
        border-radius: 10px;
      }
      .lightbox .row {
        display: flex;
        gap: 10px;
      }

      /* Model/LoRA edit dialog fields. */
      .meta-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      .meta-grid .full {
        grid-column: 1 / -1;
      }
      .topline {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 14px;
      }
      .topline .spacer {
        flex: 1;
      }
      .ghost {
        border: 1px solid var(--oppai-border-strong);
        background: transparent;
        color: var(--oppai-text-dim);
        border-radius: 12px;
        font: inherit;
        font-size: 13px;
        padding: 8px 14px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    void this.loadStatus();
    void this.loadCharacters();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopListening();
  }

  private async loadStatus() {
    this.status = null;
    this.error = "";
    try {
      const st = await api.imageGenStatus();
      this.status = st;
      // Default to the generator's first checkpoint so a first-time user can generate
      // without picking one.
      if (!this.checkpoint && st.models && st.models.length) {
        this.pickModel(st.models[0]);
      }
      // The destination board is not chosen here — the Invoke gallery panel owns it
      // and announces it (board-changed), so generations land in the gallery on screen.
    } catch (e) {
      this.status = { enabled: true, reachable: false, error: (e as Error).message };
    }
  }

  private async loadCharacters() {
    try {
      const res = await api.characters();
      this.characters = res.characters;
      // A deleted character must not linger in the selection.
      const ids = new Set(res.characters.map((c) => c.id));
      this.selectedChars = this.selectedChars.filter((id) => ids.has(id));
    } catch {
      /* the section just stays empty */
    }
  }

  // Selecting a model applies the generator's per-model defaults (InvokeAI keeps
  // steps/CFG/size/VAE per model) — everything stays editable afterwards.
  private pickModel(m: GenModel) {
    this.checkpoint = m.title;
    const d = m.defaults;
    if (!d) return;
    if (d.steps) this.steps = d.steps;
    if (d.cfgScale) this.cfg = d.cfgScale;
    if (d.cfgRescale !== undefined) this.cfgRescale = d.cfgRescale;
    if (d.scheduler) this.scheduler = d.scheduler;
    if (d.width) this.width = d.width;
    if (d.height) this.height = d.height;
    if (d.vae) this.vae = d.vae;
    // fp16 VAE decoding can yield valid but all-black PNGs. The server now always
    // uses fp32, even when an older InvokeAI model default recommends fp16.
    this.vaePrecision = "fp32";
  }

  // ── speech ────────────────────────────────────────────────────────────────
  private get speechSupported(): boolean {
    return speechRecognitionCtor() != null;
  }

  private toggleListening() {
    if (this.listening) {
      this.stopListening();
      return;
    }
    const Ctor = speechRecognitionCtor();
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = navigator.language || "en-US";
    rec.continuous = false;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
      this.speech = text;
    };
    rec.onerror = (e) => {
      this.error = e.error === "not-allowed" ? "Microphone permission was denied." : `Speech error: ${e.error}`;
      this.stopListening();
    };
    // When the recogniser stops on its own (a pause in speech), turn what it heard into
    // a prompt — that's the "convert speech to an optimised prompt" step.
    rec.onend = () => {
      this.listening = false;
      if (this.speech.trim()) void this.optimize(this.speech);
    };
    this.recognition = rec;
    this.listening = true;
    this.error = "";
    try {
      rec.start();
    } catch {
      this.listening = false;
    }
  }

  private stopListening() {
    this.listening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        /* already stopped */
      }
      this.recognition = null;
    }
  }

  // Rule-based prompt building lives on the server so the same logic is available
  // everywhere; here we just hand over the transcript and drop the result into the
  // editable boxes.
  private async optimize(text: string) {
    this.optimizing = true;
    try {
      const { prompt, negativePrompt } = await api.optimizePrompt(text);
      this.prompt = prompt;
      if (!this.negative) this.negative = negativePrompt;
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.optimizing = false;
    }
  }

  // ── prompt assembly ─────────────────────────────────────────────────────────

  /**
   * The final prompt pair sent to the generator: the typed prompt, plus the selected
   * characters' fragments, threaded through the selected template's "{prompt}" slot.
   */
  /**
   * The outfit helper's contribution: the clothes, then this pose's face and mood,
   * then the flat-backdrop terms when the set is meant to be cut out.
   *
   * Order matters — the outfit leads because it is the constant across the whole
   * wardrobe, and the per-image variation follows it.
   */
  private outfitFragment(): { prompt: string; negative: string } {
    if (!this.outfitOn) return { prompt: "", negative: "" };
    const parts = [this.outfitText.trim(), OUTFIT_FACES[this.outfitFace].face, OUTFIT_TIERS[this.outfitTier].mood];
    if (this.outfitCutout) parts.push(CUTOUT_PROMPT);
    return {
      prompt: parts.filter(Boolean).join(", "),
      negative: this.outfitCutout ? CUTOUT_NEGATIVE : "",
    };
  }

  /**
   * Steps to the next slot in the wardrobe: through the five faces, then on to the
   * next heat tier. Generate, Next pose, generate — that loop is the helper.
   */
  private nextOutfitPose() {
    const face = this.outfitFace + 1;
    if (face < OUTFIT_FACES.length) { this.outfitFace = face; return; }
    this.outfitFace = 0;
    this.outfitTier = (this.outfitTier + 1) % OUTFIT_TIERS.length;
  }

  private assemblePrompts(): { prompt: string; negative: string } {
    const outfit = this.outfitFragment();
    const parts = [this.prompt.trim(), ...this.selectedTriggers, outfit.prompt];
    const negParts = [this.negative.trim(), outfit.negative];
    for (const id of this.selectedChars) {
      const c = this.characters.find((ch) => ch.id === id);
      if (!c) continue;
      if (c.prompt.trim()) parts.push(c.prompt.trim());
      if (c.negativePrompt?.trim()) negParts.push(c.negativePrompt.trim());
    }
    let prompt = parts.filter(Boolean).join(", ");
    let negative = negParts.filter(Boolean).join(", ");

    const tpl = (this.status?.templates ?? []).find((t) => t.id === this.templateId);
    if (tpl) {
      if (tpl.prompt.includes("{prompt}")) prompt = tpl.prompt.replaceAll("{prompt}", prompt);
      else if (tpl.prompt.trim()) prompt = `${prompt}, ${tpl.prompt.trim()}`;
      if (tpl.negativePrompt.includes("{prompt}")) {
        negative = tpl.negativePrompt.replaceAll("{prompt}", negative);
      } else if (tpl.negativePrompt.trim()) {
        negative = negative ? `${negative}, ${tpl.negativePrompt.trim()}` : tpl.negativePrompt.trim();
      }
    }
    return { prompt, negative };
  }

  // ── generate / save ─────────────────────────────────────────────────────────
  private async generate() {
    // The outfit helper can carry the whole prompt on its own, so what matters is
    // whether anything assembles — not whether the box itself has text in it.
    if (this.generating || !this.assemblePrompts().prompt.trim()) return;
    const { prompt, negative } = this.assemblePrompts();
    this.generating = true;
    this.error = "";
    try {
      const res = await api.generate({
        prompt,
        negativePrompt: negative || undefined,
        checkpoint: this.checkpoint || undefined,
        vae: this.vae || undefined,
        sampler: this.scheduler || undefined,
        steps: this.steps,
        width: this.width,
        height: this.height,
        cfgScale: this.cfg,
        cfgRescale: this.cfgRescale,
        clipSkip: this.clipSkip,
        seamlessX: this.seamlessX,
        seamlessY: this.seamlessY,
        vaePrecision: this.vaePrecision,
        cpuNoise: this.cpuNoise,
        board: this.board,
        count: this.count,
        seed: this.seed,
        loras: Object.entries(this.selectedLoras).map(([name, weight]) => ({ name, weight })),
        detailer: this.status?.detailerAvailable && this.detailerEnabled
          ? {
              enabled: true,
              model: this.detailerModel,
              prompt: this.detailerPrompt || undefined,
              negativePrompt: this.detailerNegative || undefined,
              confidence: this.detailerConfidence,
              denoise: this.detailerDenoise,
              maskBlur: this.detailerMaskBlur,
            }
          : undefined,
      });
      // Only the newest run stays on screen. Earlier ones are not lost — InvokeAI
      // keeps every finished image in its gallery, which is what the right-hand
      // panel browses, so the creator itself shows just what you last made.
      this.shots = res.images.map((g: GenPreview) => ({ ...g, saved: false }));
      // InvokeAI keeps its own gallery copy of everything that just finished.
      void this.galleryPanel?.refresh();
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.generating = false;
    }
  }

  private async save(shot: Shot) {
    if (shot.saved) return;
    try {
      const title = (this.prompt.trim() || this.outfitText.trim()).slice(0, 80) || "Generated image";
      await api.saveGenerated({ id: shot.id, title });
      this.shots = this.shots.map((s) => (s.id === shot.id ? { ...s, saved: true } : s));
      this.showToast("Saved to library");
      // The library grid behind this view is now stale.
      this.dispatchEvent(new CustomEvent("imported", { bubbles: true, composed: true }));
    } catch (e) {
      this.showToast((e as Error).message);
    }
  }

  /** Repaint every picker thumbnail and retry the ones that had failed. */
  private bumpThumbs() {
    this.thumbVersion++;
    this.failedThumbs = new Set();
  }

  /**
   * A picker card's artwork: the image when it loads, a proper placeholder when it
   * can't. The failure is tracked per-URL in state so a miss can't leak hidden
   * styles onto reused <img> nodes (the old approach left cards black).
   */
  private renderArt(url: string, alt: string, icon: string) {
    if (this.failedThumbs.has(url)) {
      return html`<div class="card-blank">
        <span class="material-symbols-rounded" style="font-size:34px;">${icon}</span>
      </div>`;
    }
    return html`<img
      class="card-art"
      src=${url}
      alt=${alt}
      loading="lazy"
      @error=${() => {
        this.failedThumbs = new Set(this.failedThumbs).add(url);
      }}
    />`;
  }

  private async useAsModelThumb(shot: Shot) {
    if (!this.checkpoint) {
      this.showToast("Pick a model first");
      return;
    }
    try {
      await api.setModelThumb({ model: this.checkpoint, previewId: shot.id });
      this.bumpThumbs();
      this.showToast("Model preview synced to InvokeAI");
    } catch (e) {
      this.showToast((e as Error).message);
    }
  }

  // ── model / LoRA metadata editor ────────────────────────────────────────────
  // Edits the generator's own record (via the server), so name, description,
  // trigger phrases and recommended settings match InvokeAI's model manager.

  private async openMetaEditor(name: string) {
    this.metaBusy = true;
    try {
      const meta = await api.modelMeta(name);
      this.metaDraft = meta;
      this.metaTriggerText = meta.triggerPhrases.join(", ");
    } catch (e) {
      this.showToast((e as Error).message);
    } finally {
      this.metaBusy = false;
    }
  }

  private setMetaDefaults(patch: Partial<NonNullable<GenModelMeta["defaults"]>>) {
    const d = this.metaDraft;
    if (!d) return;
    this.metaDraft = { ...d, defaults: { ...(d.defaults ?? {}), ...patch } };
  }

  private async saveMeta() {
    const d = this.metaDraft;
    if (!d || this.metaBusy) return;
    this.metaBusy = true;
    try {
      await api.patchModelMeta({
        key: d.key,
        name: d.name,
        description: d.description ?? "",
        triggerPhrases: this.metaTriggerText
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        defaults: d.defaults,
      });
      this.metaDraft = null;
      this.showToast("Model updated");
      // Names and defaults may have changed; the status payload carries both.
      await this.loadStatus();
    } catch (e) {
      this.showToast((e as Error).message);
    } finally {
      this.metaBusy = false;
    }
  }

  private toggleLora(name: string) {
    const next = { ...this.selectedLoras };
    if (name in next) {
      delete next[name];
      const phrases = new Set(
        (this.status?.loras ?? []).find((l) => l.name === name)?.triggerPhrases ?? [],
      );
      const remaining = new Set(
        (this.status?.loras ?? [])
          .filter((l) => l.name in next)
          .flatMap((l) => l.triggerPhrases ?? []),
      );
      this.selectedTriggers = this.selectedTriggers.filter((p) => !phrases.has(p) || remaining.has(p));
    } else {
      const preferred = (this.status?.loras ?? []).find((l) => l.name === name)?.weight;
      next[name] = preferred && Number.isFinite(preferred) ? preferred : 1;
    }
    this.selectedLoras = next;
  }

  private toggleTrigger(phrase: string) {
    this.selectedTriggers = this.selectedTriggers.includes(phrase)
      ? this.selectedTriggers.filter((p) => p !== phrase)
      : [...this.selectedTriggers, phrase];
  }

  private toggleCharacter(id: string) {
    this.selectedChars = this.selectedChars.includes(id)
      ? this.selectedChars.filter((c) => c !== id)
      : [...this.selectedChars, id];
  }

  private toggleSection(id: string) {
    this.open = { ...this.open, [id]: !this.open[id] };
  }

  // ── character editor ────────────────────────────────────────────────────────

  private onCharThumbFile(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file || !this.charDraft) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (this.charDraft) this.charDraft = { ...this.charDraft, imageData: String(reader.result) };
    };
    reader.readAsDataURL(file);
  }

  /** Scans a chosen image with the AI tagger and folds the booru tags it finds
      into the character's prompt fragment (skipping ones already present). */
  private onCharScanFile(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file || !this.charDraft || this.scanBusy) return;
    const reader = new FileReader();
    reader.onload = () => void this.scanCharImage(String(reader.result));
    reader.readAsDataURL(file);
  }

  private async scanCharImage(dataUrl: string) {
    if (!this.charDraft || this.scanBusy) return;
    this.scanBusy = true;
    try {
      const res = await api.scanImage(dataUrl);
      // Booru tags carry underscores and a rating we don't want in a prompt; turn
      // them into prompt-style phrases and drop the content rating.
      const tags = res.tags
        .filter((t) => t.category !== "rating")
        .map((t) => t.tag.replace(/_/g, " ").trim())
        .filter(Boolean);
      const d = this.charDraft;
      if (!d) return;
      const existing = d.prompt.trim();
      const have = new Set(
        existing
          .split(",")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean),
      );
      const additions = tags.filter((t) => !have.has(t.toLowerCase()));
      if (!additions.length) {
        this.showToast("No new tags found");
        return;
      }
      const merged = existing ? `${existing}, ${additions.join(", ")}` : additions.join(", ");
      this.charDraft = { ...d, prompt: merged };
      this.showToast(`Added ${additions.length} tag${additions.length === 1 ? "" : "s"}`);
    } catch (e) {
      this.showToast((e as Error).message);
    } finally {
      this.scanBusy = false;
    }
  }

  private async saveCharacter() {
    const d = this.charDraft;
    if (!d || !d.name.trim() || this.charBusy) return;
    this.charBusy = true;
    try {
      await api.saveCharacter({
        id: d.id,
        name: d.name.trim(),
        prompt: d.prompt,
        negativePrompt: d.negativePrompt,
        imageData: d.imageData,
      });
      this.charDraft = null;
      this.bumpThumbs();
      await this.loadCharacters();
      this.showToast("Character saved");
    } catch (e) {
      this.showToast((e as Error).message);
    } finally {
      this.charBusy = false;
    }
  }

  private async deleteCharacter() {
    const d = this.charDraft;
    if (!d?.id || this.charBusy) return;
    if (!confirm(`Delete “${d.name}” from the character library?`)) return;
    this.charBusy = true;
    try {
      await api.deleteCharacter(d.id);
      const line = libbyReact("libraryDelete");
      mascotSay(line.message, "success", { emotion: line.emotion, intensity: line.intensity });
      this.charDraft = null;
      await this.loadCharacters();
      this.showToast("Character deleted");
    } catch (e) {
      this.showToast((e as Error).message);
    } finally {
      this.charBusy = false;
    }
  }

  private showToast(msg: string) {
    this.toast = msg;
    setTimeout(() => (this.toast = ""), 2600);
  }

  // ── render ────────────────────────────────────────────────────────────────
  render() {
    return html`<div class="wrap">${this.renderBody()}</div>
      ${this.charDraft ? this.renderCharEditor(this.charDraft) : nothing}
      ${this.metaDraft ? this.renderMetaEditor(this.metaDraft) : nothing}
      ${this.expandedShot ? this.renderLightbox(this.expandedShot) : nothing}
      ${this.renderCutoutDialog()}
      ${this.toast ? html`<div class="toast">${this.toast}</div>` : nothing}`;
  }

  /** Item 4: a generated result expanded to full size, with its actions to hand. */
  private renderLightbox(shot: Shot) {
    const current = this.shots.find((s) => s.id === shot.id) ?? shot;
    return html`
      <div class="lightbox" @click=${(e: Event) => { if (e.target === e.currentTarget) this.expandedShot = null; }}>
        <img src=${api.genPreviewURL(current.id)} alt="Generated image" />
        <div class="row">
          <button class="btn primary" ?disabled=${current.saved} @click=${() => this.save(current)}>
            <span class="material-symbols-rounded" style="font-size:17px;">${current.saved ? "check" : "save"}</span>
            ${current.saved ? "Saved" : "Save to library"}
          </button>
          ${this.status?.backend === "invokeai" ? html`<button class="btn" @click=${() => this.useAsModelThumb(current)}>
            <span class="material-symbols-rounded" style="font-size:17px;">photo_camera</span> Sync model preview
          </button>` : nothing}
          <button class="btn" @click=${() => (this.expandedShot = null)}>
            <span class="material-symbols-rounded" style="font-size:17px;">close</span> Close
          </button>
        </div>
      </div>
    `;
  }

  private renderMetaEditor(d: GenModelMeta) {
    const defaults = d.defaults ?? {};
    const isLora = d.type === "lora";
    return html`
      <div class="overlay" @click=${(e: Event) => { if (e.target === e.currentTarget) this.metaDraft = null; }}>
        <div class="dialog">
          <h3>Edit ${isLora ? "LoRA" : "model"} — synced with InvokeAI</h3>
          <div>
            <label class="field">Name</label>
            <input type="text" .value=${d.name}
              @input=${(e: Event) => (this.metaDraft = { ...d, name: (e.target as HTMLInputElement).value })} />
          </div>
          <div>
            <label class="field">Description</label>
            <textarea .value=${d.description ?? ""}
              @input=${(e: Event) => (this.metaDraft = { ...d, description: (e.target as HTMLTextAreaElement).value })}></textarea>
          </div>
          <div>
            <label class="field">Trigger phrases (comma-separated)</label>
            <input type="text" .value=${this.metaTriggerText} placeholder="my-style, detailed face"
              @input=${(e: Event) => (this.metaTriggerText = (e.target as HTMLInputElement).value)} />
          </div>
          ${isLora
            ? html`<div>
                <label class="field">Recommended weight</label>
                <input class="num" type="number" min="-2" max="2" step="0.05"
                  .value=${String(defaults.weight ?? "")} placeholder="1"
                  @input=${(e: Event) =>
                    this.setMetaDefaults({ weight: Number((e.target as HTMLInputElement).value) || 0 })} />
              </div>`
            : html`
                <div class="meta-grid">
                  <div>
                    <label class="field">Steps</label>
                    <input class="num" type="number" min="1" max="80" .value=${String(defaults.steps ?? "")}
                      @input=${(e: Event) =>
                        this.setMetaDefaults({ steps: Number((e.target as HTMLInputElement).value) || 0 })} />
                  </div>
                  <div>
                    <label class="field">CFG scale</label>
                    <input class="num" type="number" min="1" max="30" step="0.5" .value=${String(defaults.cfgScale ?? "")}
                      @input=${(e: Event) =>
                        this.setMetaDefaults({ cfgScale: Number((e.target as HTMLInputElement).value) || 0 })} />
                  </div>
                  <div>
                    <label class="field">CFG rescale</label>
                    <input class="num" type="number" min="0" max="0.99" step="0.05"
                      .value=${String(defaults.cfgRescale ?? "")}
                      @input=${(e: Event) =>
                        this.setMetaDefaults({ cfgRescale: Number((e.target as HTMLInputElement).value) || 0 })} />
                  </div>
                  <div>
                    <label class="field">Width</label>
                    <input class="num" type="number" min="64" max="2048" step="8" .value=${String(defaults.width ?? "")}
                      @input=${(e: Event) =>
                        this.setMetaDefaults({ width: Number((e.target as HTMLInputElement).value) || 0 })} />
                  </div>
                  <div>
                    <label class="field">Height</label>
                    <input class="num" type="number" min="64" max="2048" step="8" .value=${String(defaults.height ?? "")}
                      @input=${(e: Event) =>
                        this.setMetaDefaults({ height: Number((e.target as HTMLInputElement).value) || 0 })} />
                  </div>
                  <div class="full">
                    <label class="field">Scheduler</label>
                    <select class="num" .value=${defaults.scheduler ?? ""}
                      @change=${(e: Event) =>
                        this.setMetaDefaults({ scheduler: (e.target as HTMLSelectElement).value })}>
                      <option value="">No preference</option>
                      ${["euler_a", "euler", "dpmpp_2m", "dpmpp_2m_k", "dpmpp_2m_sde_k", "dpmpp_sde_k", "unipc"].map(
                        (s) => html`<option value=${s} ?selected=${s === defaults.scheduler}>${s}</option>`,
                      )}
                    </select>
                  </div>
                  <div class="full">
                    <label class="field">Default VAE</label>
                    <select class="num" .value=${defaults.vae ?? ""}
                      @change=${(e: Event) => this.setMetaDefaults({ vae: (e.target as HTMLSelectElement).value })}>
                      <option value="">Model's own</option>
                      ${(this.status?.vaes ?? []).map(
                        (v) => html`<option value=${v.key} ?selected=${v.key === defaults.vae}>${v.name}</option>`,
                      )}
                    </select>
                  </div>
                  <div class="full">
                    <label class="field">VAE precision</label>
                    <select class="num" .value=${defaults.vaePrecision ?? ""}
                      @change=${(e: Event) => this.setMetaDefaults({
                        vaePrecision: (e.target as HTMLSelectElement).value as "fp32" | "fp16",
                      })}>
                      <option value="">No preference</option>
                      <option value="fp32">fp32</option>
                      <option value="fp16">fp16</option>
                    </select>
                  </div>
                </div>
              `}
          <div class="dialog-actions">
            <button class="btn" @click=${() => (this.metaDraft = null)}>Cancel</button>
            <button class="btn primary" ?disabled=${this.metaBusy || !d.name.trim()} @click=${() => this.saveMeta()}>
              Save
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private renderBody() {
    const st = this.status;
    if (st === null) {
      return html`<div class="empty"><md-circular-progress indeterminate></md-circular-progress></div>`;
    }
    if (!st.enabled) {
      return html`<div class="empty">
        <span class="material-symbols-rounded">auto_awesome</span>
        <div style="font-size:15px; margin-bottom:6px;">Image generation isn't set up yet.</div>
        <div style="font-size:13px;">
          Add the URL of your local InvokeAI or Automatic1111 / SD.Next server under
          <strong>Settings → Image generation</strong>, then come back here.
        </div>
      </div>`;
    }
    if (!st.reachable) {
      return html`<div class="empty">
        <span class="material-symbols-rounded">cloud_off</span>
        <div style="font-size:15px; margin-bottom:6px;">Can't reach the image generator.</div>
        <div style="font-size:13px; margin-bottom:14px;">${st.error ?? "It didn't answer."}</div>
        <button class="chip" @click=${() => this.loadStatus()}>Retry</button>
      </div>`;
    }

    const invoke = st.backend === "invokeai";
    return html`
      <div class="layout">
        <aside class="side">
          ${this.renderModelSection(st.models ?? [])}
          ${this.renderLoraSection(st.loras ?? [], st.loraError)}
          ${this.renderVaeSection(st.vaes ?? [])}
          ${this.renderSettingsSection(invoke, st.boards ?? [])}
          ${this.renderTemplateSection(st.templates ?? [])}
          ${this.renderCharacterSection()}
          ${this.renderOutfitSection()}
        </aside>
        <div>
          ${invoke
            ? html`<div class="topline">
                <div class="spacer"></div>
                <button class="ghost" @click=${() => (this.civitaiOpen = true)}>
                  <span class="material-symbols-rounded" style="font-size:17px;">travel_explore</span>
                  Browse Civitai
                </button>
              </div>`
            : nothing}
          ${this.renderResults()}
          ${this.error ? html`<div class="banner">${this.error}</div>` : nothing}
          ${this.renderPrompt()}
        </div>
        ${invoke
          ? html`<aside class="right">
              <oppai-invoke-gallery
                @boards-changed=${() => this.loadStatus()}
                @board-changed=${(e: CustomEvent<{ board: string }>) => (this.board = e.detail.board)}
                @cut-out=${(e: CustomEvent<{ url: string; name: string }>) =>
                  void this.openCutout(e.detail.url, e.detail.name)}
              ></oppai-invoke-gallery>
            </aside>`
          : nothing}
      </div>
      ${this.civitaiOpen ? html`<oppai-civitai @close=${() => this.onCivitaiClose()}></oppai-civitai>` : nothing}
    `;
  }

  // Closing the Civitai browser refreshes the model list: an install may have
  // finished while it was open, and a new checkpoint should appear right away.
  private onCivitaiClose() {
    this.civitaiOpen = false;
    void this.loadStatus();
  }

  private section(id: string, label: string, count: string, body: unknown) {
    const open = !!this.open[id];
    return html`
      <div class="sec">
        <button class="sec-head" @click=${() => this.toggleSection(id)}>
          <span class="material-symbols-rounded" style="font-size:18px;"
            >${open ? "expand_more" : "chevron_right"}</span
          >
          ${label}
          <span class="count">${count}</span>
        </button>
        ${open ? html`<div class="sec-body">${body}</div>` : nothing}
      </div>
    `;
  }

  private renderModelSection(models: GenModel[]) {
    if (!models.length) {
      return this.section(
        "models",
        "Models",
        "0",
        html`<div class="sec-note">
          Connected, but the generator lists no checkpoints. Add a model to it and reload.
        </div>`,
      );
    }
    const body = html`
      <div class="cards">
        ${models.map((m) => {
          const on = m.title === this.checkpoint;
          const thumb = `${api.modelThumbURL(m.title)}&v=${this.thumbVersion}`;
          return html`
            <div class="card-wrap">
              <button class="card ${on ? "on" : ""}" title=${m.title} @click=${() => this.pickModel(m)}>
                ${this.renderArt(thumb, m.model_name, "texture")}
                <div class="card-name">${m.model_name}${m.base ? html`<span class="row-sub">${m.base}</span>` : nothing}</div>
              </button>
              <button class="card-edit left" title="Edit model settings" @click=${() => this.openMetaEditor(m.title)}>
                <span class="material-symbols-rounded" style="font-size:15px;">edit</span>
              </button>
            </div>
          `;
        })}
      </div>
    `;
    return this.section("models", "Models", String(models.length), body);
  }

  private renderLoraSection(loras: GenLora[], loraError?: string) {
    if (!loras.length) {
      return this.section(
        "loras",
        "LoRAs",
        "0",
        html`<div class="sec-note">
          ${loraError ? `LoRAs aren't available from this generator: ${loraError}` : "No LoRAs installed."}
        </div>`,
      );
    }
    const pages = Math.ceil(loras.length / 6);
    const page = Math.min(this.loraPage, pages - 1);
    const visible = loras.slice(page * 6, page * 6 + 6);
    const body = html`
      <div class="cards">
        ${visible.map((lora) => {
          const on = lora.name in this.selectedLoras;
          const thumb = `${api.loraThumbURL(lora.name)}&v=${this.thumbVersion}`;
          return html`
            <div class="card-wrap">
              <button class="card ${on ? "on" : ""}" title=${lora.name} @click=${() => this.toggleLora(lora.name)}>
                ${this.renderArt(thumb, lora.alias || lora.name, "style")}
                <div class="card-name">${lora.alias || lora.name}</div>
              </button>
              <button class="card-edit left" title="Edit LoRA settings" @click=${() => this.openMetaEditor(lora.name)}>
                <span class="material-symbols-rounded" style="font-size:15px;">edit</span>
              </button>
              ${on ? html`<input class="lora-weight" type="number" min="-2" max="2" step="0.05"
                aria-label=${`${lora.alias || lora.name} weight`}
                .value=${String(this.selectedLoras[lora.name])}
                @input=${(e: Event) => {
                  const value = Number((e.target as HTMLInputElement).value);
                  this.selectedLoras = { ...this.selectedLoras,
                    [lora.name]: Number.isFinite(value) ? Math.max(-2, Math.min(2, value)) : 1 };
                }} />` : nothing}
            </div>
          `;
        })}
      </div>
      ${pages > 1 ? html`<div class="pager">
        <button ?disabled=${page === 0} @click=${() => (this.loraPage = page - 1)}>Previous</button>
        <span>${page + 1} / ${pages}</span>
        <button ?disabled=${page >= pages - 1} @click=${() => (this.loraPage = page + 1)}>Next</button>
      </div>` : nothing}
    `;
    return this.section("loras", "LoRAs", String(Object.keys(this.selectedLoras).length || loras.length), body);
  }

  private renderVaeSection(vaes: GenVae[]) {
    const body = !vaes.length
      ? html`<div class="sec-note">The generator lists no standalone VAEs; the model's own is used.</div>`
      : html`
          <div class="rows">
            <button class="row-pick ${this.vae === "" ? "on" : ""}" @click=${() => (this.vae = "")}>
              Model default
            </button>
            ${vaes.map(
              (v) => html`<button
                class="row-pick ${this.vae === v.key ? "on" : ""}"
                @click=${() => (this.vae = this.vae === v.key ? "" : v.key)}
              >
                ${v.name}
                ${v.base ? html`<span class="row-sub">${v.base}</span>` : nothing}
              </button>`,
            )}
          </div>
        `;
    return this.section("vaes", "VAEs", this.vae ? "1 picked" : "default", body);
  }

  private renderSettingsSection(invoke: boolean, boards: GalleryBoard[]) {
    const body = html`
      <div class="settings">
        <div class="full">
          <label class="field">Scheduler</label>
          <select
            class="num"
            .value=${this.scheduler}
            @change=${(e: Event) => (this.scheduler = (e.target as HTMLSelectElement).value)}
          >
            ${SCHEDULERS.map((s) => html`<option value=${s.id} ?selected=${s.id === this.scheduler}>${s.label}</option>`)}
          </select>
        </div>
        <div>
          <label class="field">Steps</label>
          <input class="num" type="number" min="1" max="80" .value=${String(this.steps)}
            @input=${(e: Event) => (this.steps = clampNum((e.target as HTMLInputElement).value, 1, 80, 25))} />
        </div>
        <div>
          <label class="field">CFG scale</label>
          <input class="num" type="number" min="1" max="30" step="0.5" .value=${String(this.cfg)}
            @input=${(e: Event) => (this.cfg = clampFloat((e.target as HTMLInputElement).value, 1, 30, 7))} />
        </div>
        ${invoke ? html`
          <div>
            <label class="field">CFG rescale</label>
            <input class="num" type="number" min="0" max="0.99" step="0.05" .value=${String(this.cfgRescale)}
              @input=${(e: Event) => (this.cfgRescale = clampFloat((e.target as HTMLInputElement).value, 0, 0.99, 0))} />
          </div>
          <div>
            <label class="field">CLIP skip</label>
            <input class="num" type="number" min="0" max="12" .value=${String(this.clipSkip)}
              @input=${(e: Event) => (this.clipSkip = clampNum((e.target as HTMLInputElement).value, 0, 12, 0))} />
          </div>
        ` : nothing}
        <div>
          <label class="field">Count</label>
          <input class="num" type="number" min="1" max="8" .value=${String(this.count)}
            @input=${(e: Event) => (this.count = clampNum((e.target as HTMLInputElement).value, 1, 8, 1))} />
        </div>
        <div>
          <label class="field">Seed (-1 random)</label>
          <input class="num" type="number" .value=${String(this.seed)}
            @input=${(e: Event) => (this.seed = clampNum((e.target as HTMLInputElement).value, -1, 2 ** 31, -1))} />
        </div>
        ${invoke ? html`
          <!-- Which gallery a generation lands in is no longer a second setting here:
               it follows whichever gallery the Invoke gallery panel has open, so the
               place you're looking at is the place new images appear. -->
          <div class="full" style="font-size:12px; color:var(--oppai-text-muted);">
            Generations are added to <b>${boards.find((b) => b.id === this.board)?.name ?? "the open gallery"}</b> —
            switch galleries in the Invoke gallery panel.
          </div>
          <label class="switch-row"><input type="checkbox" .checked=${this.cpuNoise}
            @change=${(e: Event) => (this.cpuNoise = (e.target as HTMLInputElement).checked)} /> CPU noise</label>
          <label class="switch-row"><input type="checkbox" .checked=${this.seamlessX}
            @change=${(e: Event) => (this.seamlessX = (e.target as HTMLInputElement).checked)} /> Seamless X</label>
          <label class="switch-row"><input type="checkbox" .checked=${this.seamlessY}
            @change=${(e: Event) => (this.seamlessY = (e.target as HTMLInputElement).checked)} /> Seamless Y</label>
        ` : nothing}
        ${this.status?.detailerAvailable ? html`
          <label class="switch-row full"><input type="checkbox" .checked=${this.detailerEnabled}
            @change=${(e: Event) => (this.detailerEnabled = (e.target as HTMLInputElement).checked)} />
            ADetailer face/hand pass</label>
          ${this.detailerEnabled ? html`
            <div class="full">
              <label class="field">ADetailer detector</label>
              <select class="num" .value=${this.detailerModel}
                @change=${(e: Event) => (this.detailerModel = (e.target as HTMLSelectElement).value)}>
                <option value="face_yolov8n.pt">Face (fast)</option>
                <option value="face_yolov8s.pt">Face (accurate)</option>
                <option value="hand_yolov8n.pt">Hands</option>
                <option value="person_yolov8n-seg.pt">Person</option>
                <option value="mediapipe_face_full">MediaPipe face</option>
              </select>
            </div>
            <div class="full">
              <label class="field">Detail prompt (blank reuses prompt)</label>
              <input class="num" .value=${this.detailerPrompt}
                @input=${(e: Event) => (this.detailerPrompt = (e.target as HTMLInputElement).value)} />
            </div>
            <div class="full">
              <label class="field">Detail negative prompt</label>
              <input class="num" .value=${this.detailerNegative}
                @input=${(e: Event) => (this.detailerNegative = (e.target as HTMLInputElement).value)} />
            </div>
            <div>
              <label class="field">Confidence</label>
              <input class="num" type="number" min="0.05" max="1" step="0.05" .value=${String(this.detailerConfidence)}
                @input=${(e: Event) => (this.detailerConfidence = clampFloat((e.target as HTMLInputElement).value, 0.05, 1, 0.3))} />
            </div>
            <div>
              <label class="field">Denoise</label>
              <input class="num" type="number" min="0.05" max="1" step="0.05" .value=${String(this.detailerDenoise)}
                @input=${(e: Event) => (this.detailerDenoise = clampFloat((e.target as HTMLInputElement).value, 0.05, 1, 0.4))} />
            </div>
            <div>
              <label class="field">Mask blur</label>
              <input class="num" type="number" min="0" max="64" .value=${String(this.detailerMaskBlur)}
                @input=${(e: Event) => (this.detailerMaskBlur = clampNum((e.target as HTMLInputElement).value, 0, 64, 4))} />
            </div>
          ` : nothing}
        ` : nothing}
      </div>
    `;
    return this.section("settings", "Model settings", `${this.steps} steps`, body);
  }

  private renderTemplateSection(templates: GenTemplate[]) {
    // The user's own presets come first; the generator's built-ins are hidden
    // behind a toggle so the list isn't buried under InvokeAI's shipped defaults.
    const builtInCount = templates.filter((t) => t.builtIn).length;
    const visible = this.showBuiltInTemplates
      ? templates
      : templates.filter((t) => !t.builtIn);
    const list = !visible.length
      ? html`<div class="sec-note">
          ${templates.length
            ? "No templates you created. Built-in presets are hidden — turn them on below."
            : "No templates on the generator. In InvokeAI they're called style presets; add some there and reload."}
        </div>`
      : html`
          <div class="rows">
            ${visible.map(
              (t) => html`<button
                class="row-pick ${this.templateId === t.id ? "on" : ""}"
                title=${t.prompt}
                @click=${() => (this.templateId = this.templateId === t.id ? "" : t.id)}
              >
                ${t.name}
                <span class="row-sub">${t.prompt}</span>
              </button>`,
            )}
          </div>
        `;
    const body = html`
      ${list}
      ${builtInCount
        ? html`<button
            class="link-toggle"
            @click=${() => (this.showBuiltInTemplates = !this.showBuiltInTemplates)}
          >
            ${this.showBuiltInTemplates
              ? "Hide built-in presets"
              : `Show built-in presets (${builtInCount})`}
          </button>`
        : nothing}
    `;
    const current = templates.find((t) => t.id === this.templateId);
    return this.section("templates", "Invoke templates", current ? current.name : "none", body);
  }

  private renderCharacterSection() {
    const body = html`
      ${this.characters.length
        ? html`<div class="cards">
            ${this.characters.map((c) => {
              const on = this.selectedChars.includes(c.id);
              const thumb = `${api.characterThumbURL(c.id)}?v=${this.thumbVersion}`;
              return html`
                <div class="card-wrap">
                  <button class="card ${on ? "on" : ""}" title=${c.prompt} @click=${() => this.toggleCharacter(c.id)}>
                    ${c.hasThumb
                      ? this.renderArt(thumb, c.name, "person")
                      : html`<div class="card-blank">
                          <span class="material-symbols-rounded" style="font-size:34px;">person</span>
                        </div>`}
                    <div class="card-name">${c.name}</div>
                  </button>
                  <button
                    class="card-edit"
                    title="Edit ${c.name}"
                    @click=${() =>
                      (this.charDraft = {
                        id: c.id,
                        name: c.name,
                        prompt: c.prompt,
                        negativePrompt: c.negativePrompt ?? "",
                      })}
                  >
                    <span class="material-symbols-rounded" style="font-size:15px;">edit</span>
                  </button>
                </div>
              `;
            })}
          </div>`
        : html`<div class="sec-note">
            Save the people you keep drawing: a character bundles a prompt fragment and a
            portrait, and clicking one adds them to the next generation.
          </div>`}
      <button
        class="side-add"
        @click=${() => (this.charDraft = { name: "", prompt: "", negativePrompt: "" })}
      >
        <span class="material-symbols-rounded" style="font-size:17px;">person_add</span> New character
      </button>
    `;
    const picked = this.selectedChars.length;
    return this.section("characters", "Characters", picked ? `${picked} picked` : String(this.characters.length), body);
  }

  private renderOutfitSection() {
    const face = OUTFIT_FACES[this.outfitFace], tier = OUTFIT_TIERS[this.outfitTier];
    const slot = this.outfitFace + 1 + this.outfitTier * OUTFIT_FACES.length;
    const body = html`
      <div class="sec-note">
        Builds one wardrobe: the same character in the same clothes, once per expression
        and heat tier. Describe the outfit once, then step the pose between generations —
        the twenty-five images that come out are what a Libby outfit is made of.
      </div>
      <label class="switch">
        <input type="checkbox" .checked=${this.outfitOn}
          @change=${(e: Event) => (this.outfitOn = (e.target as HTMLInputElement).checked)} />
        Add outfit terms to the prompt
      </label>
      <div>
        <label class="field">Outfit</label>
        <textarea rows="2" .value=${this.outfitText} placeholder="black lace lingerie, thigh highs, choker"
          @input=${(e: Event) => (this.outfitText = (e.target as HTMLTextAreaElement).value)}></textarea>
      </div>
      <div>
        <label class="field">Expression</label>
        <select class="num" .value=${String(this.outfitFace)}
          @change=${(e: Event) => (this.outfitFace = Number((e.target as HTMLSelectElement).value))}>
          ${OUTFIT_FACES.map((item, index) => html`<option value=${index}>${item.label}</option>`)}
        </select>
      </div>
      <div>
        <label class="field">Heat tier</label>
        <select class="num" .value=${String(this.outfitTier)}
          @change=${(e: Event) => (this.outfitTier = Number((e.target as HTMLSelectElement).value))}>
          ${OUTFIT_TIERS.map((item, index) => html`<option value=${index}>${index + 1} · ${item.label}</option>`)}
        </select>
      </div>
      <label class="switch">
        <input type="checkbox" .checked=${this.outfitCutout}
          @change=${(e: Event) => (this.outfitCutout = (e.target as HTMLInputElement).checked)} />
        Flat backdrop, for cutting out
      </label>
      <button class="side-add" @click=${() => this.nextOutfitPose()}>
        <span class="material-symbols-rounded" style="font-size:17px;">skip_next</span>
        Next pose (${slot} of ${OUTFIT_FACES.length * OUTFIT_TIERS.length})
      </button>
      <div class="sec-note">Now generating: <strong>${tier.label} · ${face.label}</strong>.</div>
    `;
    return this.section("outfit", "Outfit helper", this.outfitOn ? `${tier.label} · ${face.label}` : "off", body);
  }

  // ── background cut-out ──────────────────────────────────────────────────────

  private async openCutout(url: string, name: string) {
    this.cutout = { url, name };
    this.cutoutError = "";
    await this.renderCutout();
  }

  /**
   * Runs the fill and puts the result on screen.
   *
   * The canvas is kept rather than a data URL so the tolerance slider can re-run
   * cheaply and so saving does not have to re-decode anything.
   */
  private async renderCutout() {
    const target = this.cutout;
    if (!target) return;
    this.cutoutBusy = true;
    this.cutoutError = "";
    try {
      const image = await loadImage(target.url);
      this.cutoutCanvas = cutOutBackground(image, { tolerance: this.cutoutTolerance });
      await this.updateComplete;
      const host = this.cutoutHost;
      if (host) { host.replaceChildren(this.cutoutCanvas); }
    } catch (e) {
      this.cutoutError = (e as Error).message;
    } finally {
      this.cutoutBusy = false;
    }
  }

  private closeCutout() {
    this.cutout = null;
    this.cutoutCanvas = null;
    this.cutoutError = "";
  }

  private cutoutName(): string {
    const base = (this.cutout?.name ?? "cutout").replace(/\.[a-z0-9]+$/i, "").slice(0, 60);
    return `${base || "cutout"}-cutout.png`;
  }

  private async downloadCutout() {
    if (!this.cutoutCanvas) return;
    try {
      const blob = await canvasToBlob(this.cutoutCanvas);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url; link.download = this.cutoutName();
      link.click();
      // Revoked on the next tick: revoking synchronously can beat the download in
      // some browsers, and the object is small enough that a tick costs nothing.
      setTimeout(() => URL.revokeObjectURL(url), 0);
    } catch (e) {
      this.cutoutError = (e as Error).message;
    }
  }

  private async saveCutout() {
    if (!this.cutoutCanvas || this.cutoutBusy) return;
    this.cutoutBusy = true;
    try {
      const blob = await canvasToBlob(this.cutoutCanvas);
      const name = this.cutoutName();
      await api.upload(new File([blob], name, { type: "image/png" }), name);
      this.dispatchEvent(new CustomEvent("imported", {
        detail: { count: 1, kind: "image", title: name },
        bubbles: true, composed: true,
      }));
      this.showToast("Cut-out saved to your library.");
      this.closeCutout();
    } catch (e) {
      this.cutoutError = (e as Error).message;
    } finally {
      this.cutoutBusy = false;
    }
  }

  private renderCutoutDialog() {
    if (!this.cutout) return nothing;
    return html`
      <div class="overlay" @click=${(e: Event) => { if (e.target === e.currentTarget) this.closeCutout(); }}>
        <div class="dialog cutout-dialog">
          <h3>Cut out the background</h3>
          <div class="sec-note">
            Fills inward from the edges and stops at the subject, so anything the fill
            never reaches stays opaque. Raise the tolerance if a rim of backdrop is left;
            lower it if it starts eating into the picture.
          </div>
          <div class="cutout-canvas"></div>
          ${this.cutoutError ? html`<div class="banner">${this.cutoutError}</div>` : nothing}
          <div>
            <label class="field">Tolerance · ${this.cutoutTolerance}</label>
            <input type="range" min="4" max="140" step="2" .value=${String(this.cutoutTolerance)}
              @change=${(e: Event) => {
                this.cutoutTolerance = Number((e.target as HTMLInputElement).value);
                void this.renderCutout();
              }} />
          </div>
          <div class="dialog-actions">
            <button class="btn" @click=${() => this.closeCutout()}>Close</button>
            <button class="btn" ?disabled=${this.cutoutBusy || !this.cutoutCanvas}
              @click=${() => void this.downloadCutout()}>
              <span class="material-symbols-rounded" style="font-size:17px;">download</span> Download PNG
            </button>
            <button class="btn primary" ?disabled=${this.cutoutBusy || !this.cutoutCanvas}
              @click=${() => void this.saveCutout()}>
              <span class="material-symbols-rounded" style="font-size:17px;">save</span>
              ${this.cutoutBusy ? "Working…" : "Save to library"}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private renderCharEditor(d: CharDraft) {
    const existingThumb =
      d.imageData ?? (d.id && this.characters.find((c) => c.id === d.id)?.hasThumb
        ? `${api.characterThumbURL(d.id)}?v=${this.thumbVersion}`
        : undefined);
    return html`
      <div class="overlay" @click=${(e: Event) => { if (e.target === e.currentTarget) this.charDraft = null; }}>
        <div class="dialog">
          <h3>${d.id ? "Edit character" : "New character"}</h3>
          <div>
            <label class="field">Name</label>
            <input type="text" .value=${d.name} placeholder="Rin"
              @input=${(e: Event) => (this.charDraft = { ...d, name: (e.target as HTMLInputElement).value })} />
          </div>
          <div>
            <label class="field">Prompt fragment</label>
            <textarea .value=${d.prompt} placeholder="1girl, red hair, green eyes, …"
              @input=${(e: Event) => (this.charDraft = { ...d, prompt: (e.target as HTMLTextAreaElement).value })}></textarea>
          </div>
          <div>
            <label class="field">Negative fragment (optional)</label>
            <textarea .value=${d.negativePrompt} placeholder="blonde, …"
              @input=${(e: Event) => (this.charDraft = { ...d, negativePrompt: (e.target as HTMLTextAreaElement).value })}></textarea>
          </div>
          <div class="dialog-thumb">
            ${existingThumb
              ? html`<img src=${existingThumb} alt="Thumbnail" />`
              : html`<div class="card-blank" style="width:72px; height:96px; aspect-ratio:auto; border-radius:10px;">
                  <span class="material-symbols-rounded">person</span>
                </div>`}
            <label class="btn">
              Choose thumbnail…
              <input class="hidden-file" type="file" accept="image/*" @change=${(e: Event) => this.onCharThumbFile(e)} />
            </label>
            <label class="btn ${this.scanBusy ? "disabled" : ""}"
              title="Read booru tags off an image and add them to the prompt">
              <span class="material-symbols-rounded" style="font-size:16px; vertical-align:-3px;">
                ${this.scanBusy ? "hourglass_top" : "auto_awesome"}
              </span>
              ${this.scanBusy ? "Scanning…" : "Scan image for tags"}
              <input class="hidden-file" type="file" accept="image/*"
                ?disabled=${this.scanBusy}
                @change=${(e: Event) => this.onCharScanFile(e)} />
            </label>
          </div>
          <div class="dialog-actions">
            ${d.id
              ? html`<button class="btn danger" ?disabled=${this.charBusy} @click=${() => this.deleteCharacter()}>
                  Delete
                </button>`
              : nothing}
            <button class="btn" @click=${() => (this.charDraft = null)}>Cancel</button>
            <button class="btn primary" ?disabled=${!d.name.trim() || this.charBusy} @click=${() => this.saveCharacter()}>
              Save
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private renderPrompt() {
    const triggerPhrases = [...new Set(
      (this.status?.loras ?? [])
        .filter((lora) => lora.name in this.selectedLoras)
        .flatMap((lora) => lora.triggerPhrases ?? []),
    )];
    return html`
      <div class="prompt-card">
        <div class="speech-row">
          ${this.speechSupported
            ? html`<button
                class="mic ${this.listening ? "live" : ""}"
                title=${this.listening ? "Stop" : "Speak your idea"}
                @click=${() => this.toggleListening()}
              >
                <span class="material-symbols-rounded">${this.listening ? "stop" : "mic"}</span>
              </button>`
            : nothing}
          <div class="speech-hint">
            ${this.listening
              ? this.speech || "Listening…"
              : this.optimizing
                ? "Turning that into a prompt…"
                : this.speechSupported
                  ? "Tap the mic and describe the image, or type below."
                  : "Type a prompt below. (Speech isn't supported in this browser.)"}
          </div>
        </div>

        <div>
          <label class="field">Prompt</label>
          <textarea
            .value=${this.prompt}
            placeholder="masterpiece, best quality, …"
            @input=${(e: Event) => {
              this.prompt = (e.target as HTMLTextAreaElement).value;
              void this.updateTagSuggestions();
            }}
          ></textarea>
          ${this.tagCorrection ? html`<div class="sec-note">Did you mean
            <button class="chip" @click=${() => this.applySuggestedTag(this.tagCorrection)}>${this.tagCorrection}</button>?
          </div>` : nothing}
          ${this.tagSuggestions.length ? html`<div class="chips">
            ${this.tagSuggestions.map((tag) => html`<button class="chip" @click=${() => this.applySuggestedTag(tag)}>${tag}</button>`)}
          </div>` : nothing}
          ${triggerPhrases.length ? html`
            <div class="sec-note" style="margin-top:8px;">LoRA trigger phrases</div>
            <div class="chips">
              ${triggerPhrases.map((phrase) => html`<button
                class="chip ${this.selectedTriggers.includes(phrase) ? "on" : ""}"
                title="Add or remove this trigger from the generated prompt"
                @click=${() => this.toggleTrigger(phrase)}>${phrase}</button>`)}
            </div>
          ` : nothing}
        </div>

        <button class="adv-toggle" @click=${() => (this.showOptions = !this.showOptions)}>
          <span class="material-symbols-rounded" style="font-size:18px;"
            >${this.showOptions ? "expand_less" : "tune"}</span
          >
          ${this.showOptions ? "Hide options" : "Options"}
        </button>

        ${this.showOptions ? this.renderPromptOptions() : nothing}
      </div>

      <button class="generate" ?disabled=${this.generating || !this.assemblePrompts().prompt.trim()} @click=${() => this.generate()}>
        ${this.generating
          ? html`<md-circular-progress indeterminate style="--md-circular-progress-size:22px;"></md-circular-progress> Generating…`
          : html`<span class="material-symbols-rounded">auto_awesome</span> Generate`}
      </button>
    `;
  }

  private async updateTagSuggestions() {
    const query = this.prompt.split(",").at(-1)?.trim() ?? "";
    if (query.length < 2) { this.tagSuggestions = []; this.tagCorrection = ""; return; }
    try {
      const result = await api.booruTags(query);
      this.tagSuggestions = result.suggestions;
      this.tagCorrection = result.correction ?? "";
    } catch { this.tagSuggestions = []; this.tagCorrection = ""; }
  }

  private applySuggestedTag(tag: string) {
    const parts = this.prompt.split(",");
    parts[parts.length - 1] = ` ${tag}`;
    this.prompt = parts.join(",").trimStart() + ", ";
    this.tagSuggestions = [];
    this.tagCorrection = "";
  }

  private renderPromptOptions() {
    return html`
      <div>
        <label class="field">Negative prompt</label>
        <textarea
          .value=${this.negative}
          placeholder="lowres, bad anatomy, …"
          @input=${(e: Event) => (this.negative = (e.target as HTMLTextAreaElement).value)}
        ></textarea>
      </div>
      <div>
        <label class="field">Resolution</label>
        <div class="chips">
          ${RESOLUTIONS.map((r) => {
            const on = r.w === this.width && r.h === this.height;
            return html`<button
              class="chip ${on ? "on" : ""}"
              @click=${() => {
                this.width = r.w;
                this.height = r.h;
              }}
            >${r.label}<span class="hint">${r.hint}</span></button>`;
          })}
        </div>
      </div>
      <div class="custom-size">
        <div>
          <label class="field">Width</label>
          <input class="num" type="number" min="64" max="2048" step="8" .value=${String(this.width)}
            @input=${(e: Event) => (this.width = clampNum((e.target as HTMLInputElement).value, 64, 2048, 512))} />
        </div>
        <span class="material-symbols-rounded" style="margin-top:22px; color:var(--oppai-text-muted);">close</span>
        <div>
          <label class="field">Height</label>
          <input class="num" type="number" min="64" max="2048" step="8" .value=${String(this.height)}
            @input=${(e: Event) => (this.height = clampNum((e.target as HTMLInputElement).value, 64, 2048, 768))} />
        </div>
      </div>
    `;
  }

  private renderResults() {
    if (!this.shots.length) return nothing;
    return html`
      <div class="section-label">Latest creation</div>
      <div class="results">
        ${this.shots.map(
          (shot) => html`
            <div class="shot">
              <img
                src=${api.genPreviewURL(shot.id)}
                alt="Generated image"
                loading="lazy"
                style="cursor: zoom-in;"
                title="Expand"
                @click=${() => (this.expandedShot = shot)}
              />
              <div class="shot-actions">
                <button class="act primary" ?disabled=${shot.saved} @click=${() => this.save(shot)}>
                  <span class="material-symbols-rounded" style="font-size:16px;"
                    >${shot.saved ? "check" : "save"}</span
                  >
                  ${shot.saved ? "Saved" : "Save"}
                </button>
                <button class="act" title="Cut the background out"
                  @click=${() => void this.openCutout(api.genPreviewURL(shot.id), `seed-${shot.seed}`)}>
                  <span class="material-symbols-rounded" style="font-size:16px;">background_replace</span>
                </button>
                ${this.status?.backend === "invokeai" ? html`<button class="act"
                  title="Set as this model's preview in InvokeAI" @click=${() => this.useAsModelThumb(shot)}>
                  <span class="material-symbols-rounded" style="font-size:16px;">photo_camera</span>
                </button>` : nothing}
              </div>
            </div>
          `,
        )}
      </div>
      <div class="banner">
        Only your latest creation shows here. Everything you generate is kept in the Invoke
        gallery panel — browse, save, or delete earlier ones there. Save copies an image
        into the library.
      </div>
    `;
  }
}

/** Clamp a numeric input's string value to an integer range, falling back to a default. */
function clampNum(v: string, lo: number, hi: number, def: number): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return def;
  return Math.min(hi, Math.max(lo, Math.round(n)));
}

/** Like clampNum but keeps fractional values (CFG scale moves in halves). */
function clampFloat(v: string, lo: number, hi: number, def: number): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return def;
  return Math.min(hi, Math.max(lo, n));
}

declare global {
  interface HTMLElementTagNameMap {
    "oppai-imagegen": OppaiImageGen;
  }
}
