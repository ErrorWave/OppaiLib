import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { iconStyles, motionStyles } from "../theme.js";
import { api, type GenLora, type GenModel, type GenPreview, type ImageGenStatus } from "../api.js";

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

// Aspect presets — the three shapes people actually ask for, so nobody has to type
// pixel dimensions to get a portrait.
const SIZES: { id: string; label: string; w: number; h: number }[] = [
  { id: "portrait", label: "Portrait", w: 512, h: 768 },
  { id: "square", label: "Square", w: 640, h: 640 },
  { id: "landscape", label: "Landscape", w: 768, h: 512 },
];

/**
 * The image-generation studio: pick a checkpoint, speak or type a prompt, generate,
 * and — only on an explicit Save — keep one in the library.
 *
 * Nothing here is persisted until Save: the server holds generated images in memory and
 * streams them as previews, so an unsaved batch simply evaporates. That's the whole
 * point of the feature as asked for — "generated images don't save unless manually
 * saved" — made true by where the bytes live, not by a checkbox.
 *
 * It talks to a local Automatic1111 / SD.Next backend through the server (the browser
 * never reaches the generator directly), so it works the same on a phone as on a
 * desktop; speech uses the browser's own recognition where available.
 */
@customElement("oppai-imagegen")
export class OppaiImageGen extends LitElement {
  @state() private status: ImageGenStatus | null = null;
  @state() private checkpoint = "";
  @state() private selectedLoras: Record<string, number> = {};

  @state() private speech = "";
  @state() private listening = false;
  @state() private optimizing = false;

  @state() private prompt = "";
  @state() private negative = "";
  @state() private showAdvanced = false;

  @state() private sizeId = "portrait";
  @state() private steps = 25;
  @state() private cfg = 7;
  @state() private count = 1;
  @state() private seed = -1;

  @state() private generating = false;
  @state() private shots: Shot[] = [];
  @state() private error = "";
  @state() private toast = "";

  // Bumps a model card's thumbnail query so a freshly-set preview repaints without a
  // full reload fighting the browser cache.
  @state() private thumbVersion = 0;

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
        max-width: 1000px;
        margin: 0 auto;
        padding-bottom: 40px;
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
      .section-label {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        color: var(--oppai-text-muted);
        margin: 22px 0 10px;
      }

      /* Model picker — a strip of checkpoint cards with their previews. */
      .models {
        display: flex;
        gap: 12px;
        overflow-x: auto;
        padding-bottom: 8px;
        scrollbar-width: thin;
      }
      .model-wrap {
        position: relative;
        flex: 0 0 auto;
        width: 116px;
      }
      .model {
        width: 100%;
        border: 2px solid transparent;
        border-radius: 14px;
        overflow: hidden;
        background: var(--oppai-surface-2);
        cursor: pointer;
        padding: 0;
        text-align: left;
        transition: transform 0.18s var(--oppai-ease-spring), border-color 0.18s ease;
      }
      .model:hover {
        transform: translateY(-2px);
      }
      .model.on {
        border-color: var(--oppai-accent);
      }
      .model-art {
        width: 100%;
        aspect-ratio: 3 / 4;
        object-fit: cover;
        display: block;
        background: var(--oppai-surface-3, var(--oppai-surface-2));
      }
      .model-blank {
        width: 100%;
        aspect-ratio: 3 / 4;
        display: grid;
        place-items: center;
        color: var(--oppai-text-muted);
      }
      .model-name {
        font-size: 11px;
        padding: 6px 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .model-edit {
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
      label.field {
        font-size: 12px;
        font-weight: 600;
        color: var(--oppai-text-dim);
        display: block;
        margin-bottom: 6px;
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
      .adv {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 12px;
      }
      .chips {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .chip {
        height: 34px;
        padding: 0 14px;
        border-radius: 17px;
        font-size: 13px;
        font-family: inherit;
        cursor: pointer;
        background: transparent;
        color: var(--oppai-text-dim);
        border: 1px solid var(--oppai-border-strong);
      }
      .chip.on {
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
        border-color: var(--oppai-accent);
      }
      .num {
        width: 100%;
        box-sizing: border-box;
        background: var(--oppai-surface);
        border: 1px solid var(--oppai-border-strong);
        border-radius: 10px;
        color: var(--oppai-text);
        font: inherit;
        padding: 8px 10px;
        outline: none;
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
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    void this.loadStatus();
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
        this.checkpoint = st.models[0].title;
      }
    } catch (e) {
      this.status = { enabled: true, reachable: false, error: (e as Error).message };
    }
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

  // ── generate / save ─────────────────────────────────────────────────────────
  private async generate() {
    if (this.generating || !this.prompt.trim()) return;
    const size = SIZES.find((s) => s.id === this.sizeId) ?? SIZES[0];
    this.generating = true;
    this.error = "";
    try {
      const res = await api.generate({
        prompt: this.prompt.trim(),
        negativePrompt: this.negative.trim() || undefined,
        checkpoint: this.checkpoint || undefined,
        steps: this.steps,
        width: size.w,
        height: size.h,
        cfgScale: this.cfg,
        count: this.count,
        seed: this.seed,
        loras: Object.entries(this.selectedLoras).map(([name, weight]) => ({ name, weight })),
      });
      // Newest batch first, kept above earlier ones so a session builds a roll.
      this.shots = [...res.images.map((g: GenPreview) => ({ ...g, saved: false })), ...this.shots];
    } catch (e) {
      this.error = (e as Error).message;
    } finally {
      this.generating = false;
    }
  }

  private async save(shot: Shot) {
    if (shot.saved) return;
    try {
      const title = this.prompt.trim().slice(0, 80) || "Generated image";
      await api.saveGenerated({ id: shot.id, title });
      this.shots = this.shots.map((s) => (s.id === shot.id ? { ...s, saved: true } : s));
      this.showToast("Saved to library");
      // The library grid behind this view is now stale.
      this.dispatchEvent(new CustomEvent("imported", { bubbles: true, composed: true }));
    } catch (e) {
      this.showToast((e as Error).message);
    }
  }

  private async useAsModelThumb(shot: Shot) {
    if (!this.checkpoint) {
      this.showToast("Pick a model first");
      return;
    }
    try {
      await api.setModelThumb({ model: this.checkpoint, previewId: shot.id });
      this.thumbVersion++;
      this.showToast("Set as model preview");
    } catch (e) {
      this.showToast((e as Error).message);
    }
  }

  private onUploadThumb(model: string, e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = ""; // let the same file be chosen again later
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        await api.setModelThumb({ model, imageData: String(reader.result) });
        this.thumbVersion++;
        this.showToast("Model preview updated");
      } catch (err) {
        this.showToast((err as Error).message);
      }
    };
    reader.readAsDataURL(file);
  }

  private onUploadLoraThumb(name: string, e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        await api.setLoraThumb({ model: name, imageData: String(reader.result) });
        this.thumbVersion++;
        this.showToast("LoRA preview updated");
      } catch (err) {
        this.showToast((err as Error).message);
      }
    };
    reader.readAsDataURL(file);
  }

  private toggleLora(name: string) {
    const next = { ...this.selectedLoras };
    if (name in next) delete next[name];
    else next[name] = 1;
    this.selectedLoras = next;
  }

  private showToast(msg: string) {
    this.toast = msg;
    setTimeout(() => (this.toast = ""), 2600);
  }

  // ── render ────────────────────────────────────────────────────────────────
  render() {
    return html`<div class="wrap">${this.renderBody()}</div>
      ${this.toast ? html`<div class="toast">${this.toast}</div>` : nothing}`;
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
          Add the URL of your local Automatic1111 / SD.Next server under
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

    return html`
      ${this.renderModels(st.models ?? [])}
      ${this.renderLoras(st.loras ?? [], st.loraError)}
      ${this.renderPrompt()}
      ${this.error ? html`<div class="banner">${this.error}</div>` : nothing}
      ${this.renderResults()}
    `;
  }

  private renderModels(models: GenModel[]) {
    if (!models.length) {
      return html`<div class="banner">
        Connected, but the generator lists no checkpoints. Add a model to it and hit Retry.
      </div>`;
    }
    return html`
      <div class="section-label">Model</div>
      <div class="models">
        ${models.map((m) => {
          const on = m.title === this.checkpoint;
          const thumb = `${api.modelThumbURL(m.title)}&v=${this.thumbVersion}`;
          return html`
            <div class="model-wrap">
              <button
                class="model ${on ? "on" : ""}"
                title=${m.title}
                @click=${() => (this.checkpoint = m.title)}
              >
                <img
                  class="model-art"
                  src=${thumb}
                  alt=${m.model_name}
                  @error=${(e: Event) => ((e.target as HTMLImageElement).style.visibility = "hidden")}
                />
                <div class="model-name">${m.model_name}</div>
              </button>
              <label class="model-edit" title="Upload a preview for this model">
                <span class="material-symbols-rounded" style="font-size:15px;">photo_camera</span>
                <input
                  class="hidden-file"
                  type="file"
                  accept="image/*"
                  @change=${(e: Event) => this.onUploadThumb(m.title, e)}
                />
              </label>
            </div>
          `;
        })}
      </div>
    `;
  }

  private renderLoras(loras: GenLora[], loraError?: string) {
    if (!loras.length) {
      return loraError
        ? html`<div class="banner">LoRAs aren't available from this generator: ${loraError}</div>`
        : nothing;
    }
    return html`
      <div class="section-label">LoRAs</div>
      <div class="models">
        ${loras.map((lora) => {
          const on = lora.name in this.selectedLoras;
          const thumb = `${api.loraThumbURL(lora.name)}&v=${this.thumbVersion}`;
          return html`
            <div class="model-wrap">
              <button class="model ${on ? "on" : ""}" title=${lora.name} @click=${() => this.toggleLora(lora.name)}>
                <img class="model-art" src=${thumb} alt=${lora.alias || lora.name}
                  @error=${(e: Event) => ((e.target as HTMLImageElement).style.visibility = "hidden")} />
                <div class="model-name">${lora.alias || lora.name}</div>
              </button>
              <label class="model-edit" title="Upload a preview for this LoRA">
                <span class="material-symbols-rounded" style="font-size:15px;">photo_camera</span>
                <input class="hidden-file" type="file" accept="image/*"
                  @change=${(e: Event) => this.onUploadLoraThumb(lora.name, e)} />
              </label>
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
    `;
  }

  private renderPrompt() {
    return html`
      <div class="section-label">Prompt</div>
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
            @input=${(e: Event) => (this.prompt = (e.target as HTMLTextAreaElement).value)}
          ></textarea>
        </div>

        <button class="adv-toggle" @click=${() => (this.showAdvanced = !this.showAdvanced)}>
          <span class="material-symbols-rounded" style="font-size:18px;"
            >${this.showAdvanced ? "expand_less" : "tune"}</span
          >
          ${this.showAdvanced ? "Hide options" : "Options"}
        </button>

        ${this.showAdvanced ? this.renderAdvanced() : nothing}
      </div>

      <button class="generate" ?disabled=${this.generating || !this.prompt.trim()} @click=${() => this.generate()}>
        ${this.generating
          ? html`<md-circular-progress indeterminate style="--md-circular-progress-size:22px;"></md-circular-progress> Generating…`
          : html`<span class="material-symbols-rounded">auto_awesome</span> Generate`}
      </button>
    `;
  }

  private renderAdvanced() {
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
        <label class="field">Shape</label>
        <div class="chips">
          ${SIZES.map(
            (s) => html`<button
              class="chip ${s.id === this.sizeId ? "on" : ""}"
              @click=${() => (this.sizeId = s.id)}
            >${s.label}</button>`,
          )}
        </div>
      </div>
      <div class="adv">
        <div>
          <label class="field">Steps</label>
          <input
            class="num"
            type="number"
            min="1"
            max="80"
            .value=${String(this.steps)}
            @input=${(e: Event) => (this.steps = clampNum((e.target as HTMLInputElement).value, 1, 80, 25))}
          />
        </div>
        <div>
          <label class="field">CFG scale</label>
          <input
            class="num"
            type="number"
            min="1"
            max="30"
            step="0.5"
            .value=${String(this.cfg)}
            @input=${(e: Event) => (this.cfg = clampNum((e.target as HTMLInputElement).value, 1, 30, 7))}
          />
        </div>
        <div>
          <label class="field">Count</label>
          <input
            class="num"
            type="number"
            min="1"
            max="8"
            .value=${String(this.count)}
            @input=${(e: Event) => (this.count = clampNum((e.target as HTMLInputElement).value, 1, 8, 1))}
          />
        </div>
        <div>
          <label class="field">Seed (-1 random)</label>
          <input
            class="num"
            type="number"
            .value=${String(this.seed)}
            @input=${(e: Event) => (this.seed = clampNum((e.target as HTMLInputElement).value, -1, 2 ** 31, -1))}
          />
        </div>
      </div>
    `;
  }

  private renderResults() {
    if (!this.shots.length) return nothing;
    return html`
      <div class="section-label">Results</div>
      <div class="results">
        ${this.shots.map(
          (shot) => html`
            <div class="shot">
              <img src=${api.genPreviewURL(shot.id)} alt="Generated image" loading="lazy" />
              <div class="shot-actions">
                <button class="act primary" ?disabled=${shot.saved} @click=${() => this.save(shot)}>
                  <span class="material-symbols-rounded" style="font-size:16px;"
                    >${shot.saved ? "check" : "save"}</span
                  >
                  ${shot.saved ? "Saved" : "Save"}
                </button>
                <button class="act" title="Use as this model's preview" @click=${() => this.useAsModelThumb(shot)}>
                  <span class="material-symbols-rounded" style="font-size:16px;">photo_camera</span>
                </button>
              </div>
            </div>
          `,
        )}
      </div>
      <div class="banner">
        Generated images live only here until you Save one — leaving this page drops the rest.
      </div>
    `;
  }
}

/** Clamp a numeric input's string value to a range, falling back to a default. */
function clampNum(v: string, lo: number, hi: number, def: number): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return def;
  return Math.min(hi, Math.max(lo, Math.round(n)));
}

declare global {
  interface HTMLElementTagNameMap {
    "oppai-imagegen": OppaiImageGen;
  }
}
