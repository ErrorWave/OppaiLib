import { LitElement, html, css } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { keyed } from "lit/directives/keyed.js";
import { api, mascotSay, setToken, type User } from "../api.js";
import { motionStyles } from "../theme.js";
import { logoSVG } from "../logo.js";
import { ambientIntensity, applyImageFallback, inferErrorEmotion, libbyAssetCandidates,
  loadHideLibby, normalizeEmotion, type LibbyEmotion } from "../libby.js";
import { libbyReact } from "../libby-voice.js";
import { libbyMotion } from "../libby-motion.js";
import { getIntensity } from "../libby-meter.js";

/**
 * The sign-in page is the one screen shown before anyone has consented to
 * anything, and the one most likely to be seen over a shoulder — so it takes the
 * shared ambient cap rather than the meter. See AMBIENT_MAX_INTENSITY, which the
 * pop-up she speaks through applies for the same reason.
 */
const loginIntensity = ambientIntensity;

const loginGreeting = libbyReact("greeting", { intensity: loginIntensity(getIntensity()) });
const loginEmotions: LibbyEmotion[] = ["happy", "neutral", "thinking", "mischievous", "surprised"];

@customElement("oppai-login")
export class OppaiLogin extends LitElement {
  @state() private error = "";
  @state() private busy = false;
  @state() private libbyMessage = loginGreeting.message;
  @state() private libbyTone: "success" | "error" = "success";
  @state() private libbyEmotion: LibbyEmotion = loginEmotions[Math.floor(Math.random() * loginEmotions.length)];
  @state() private libbyIntensity = loginIntensity(getIntensity());
  private libbyTimer?: number;

  static styles = [
    motionStyles,
    libbyMotion,
    css`
      :host {
        display: grid;
        place-items: center;
        min-height: 100vh;
        padding: 1rem;
        position: relative;
        overflow: hidden;
        background:
          radial-gradient(1200px 600px at 50% -10%, color-mix(in srgb, var(--md-sys-color-primary) 14%, transparent), transparent 70%),
          var(--md-sys-color-background);
      }

      /* The mascot is anchored to the bottom edge and bleeds off it — she has no legs,
         so any gap under her reads as a cut-off. She sits behind the card and must
         never swallow a click meant for the form. */
      .libby {
        position: absolute;
        right: 0;
        bottom: 0;
        width: min(48vw, 540px);
        height: min(82vh, 720px);
        pointer-events: none;
        user-select: none;
      }
      /* Three layers, and they have to stay three. The outer .libby owns the
         positioning — including the translateX that centres her on narrow screens —
         so no animation may touch its transform. The figure breathes, the image
         inside it reacts to a line; splitting them is also what keeps a reaction
         from cancelling the idle loop, since one element runs one animation. */
      .libby-figure {
        display: block;
        height: 100%;
        width: 100%;
        transform-origin: 50% 100%;
      }
      .libby img {
        display: block;
        height: 100%;
        width: 100%;
        object-fit: contain;
        object-position: right bottom;
        /* Motion pivots at her feet: she is anchored to the bottom edge, so scaling
           or rocking about the centre would lift her off it. */
        transform-origin: 50% 100%;
      }
      .libby.error img { filter: saturate(.82); }
      /* Clear of the sign-in card, not behind it. At 72%/12% the bubble's left half
         sat under the card — the card is position:relative and therefore paints
         over her — so most of what she said was invisible. Above and to the right
         of the card is empty space at every width this breakpoint covers, and the
         z-index makes the overlap harmless if a longer line does reach the card. */
      .libby-speech {
        position: absolute;
        right: 30%;
        top: -2%;
        z-index: 2;
        width: min(260px, 42vw);
        padding: 11px 14px;
        border-radius: 18px 18px 4px 18px;
        background: var(--md-sys-color-surface-container-high);
        color: var(--md-sys-color-on-surface);
        border: 1px solid var(--md-sys-color-primary);
        box-shadow: 0 8px 28px rgba(0,0,0,.3);
        font: 500 14px/1.4 Roboto, system-ui, sans-serif;
      }
      .libby.error .libby-speech { border-color: var(--md-sys-color-error); }
      .libby-name { display: block; color: var(--md-sys-color-primary); font-size: 11px; font-weight: 700; }
      @media (max-width: 900px) {
        .libby {
          right: 50%;
          transform: translateX(50%);
          width: min(88vw, 390px);
          height: min(42vh, 360px);
          opacity: 0.78;
        }
        .libby-speech { right: 58%; top: -8%; }
      }

      .card {
        position: relative;
        background: var(--md-sys-color-surface-container);
        border: 1px solid var(--md-sys-color-outline-variant);
        border-radius: 28px;
        padding: 2.25rem 2rem;
        width: min(380px, 100%);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
        animation: oppai-scale-in 0.42s var(--oppai-ease-spring) both;
      }
      /* Above the mascot, and pulled up off the bottom edge she occupies. */
      @media (max-width: 900px) {
        .card { margin-bottom: 22vh; }
      }
      h1 {
        margin: 0 0 0.25rem;
        text-align: center;
        letter-spacing: 0.5px;
        font-weight: 600;
      }
      .brand { text-align: center; color: var(--md-sys-color-primary); }
      /* The mark takes its colour from here, which is what makes it themeable. */
      .logo {
        display: block;
        width: 84px;
        height: 84px;
        margin: 0 auto;
        color: var(--md-sys-color-primary);
      }
      .logo svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      .tagline {
        text-align: center;
        margin: 0 0 0.5rem;
        font-size: 0.85rem;
        color: var(--md-sys-color-on-surface-variant);
      }
      md-filled-text-field { width: 100%; }
      md-filled-button { --md-filled-button-container-shape: 14px; }
      .err {
        color: var(--md-sys-color-error);
        font-size: 0.85rem;
        min-height: 1.2em;
        text-align: center;
      }
    `,
  ];

  @query("form") private form!: HTMLFormElement;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("oppai-mascot", this.onLibby as EventListener);
    this.libbyTimer = window.setTimeout(() => (this.libbyMessage = ""), 5000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("oppai-mascot", this.onLibby as EventListener);
    if (this.libbyTimer) clearTimeout(this.libbyTimer);
  }

  private onLibby = (event: CustomEvent<{ message: string; tone: "success" | "error"; emotion?: string; intensity?: number }>) => {
    this.libbyMessage = event.detail.message;
    this.libbyTone = event.detail.tone;
    const inferred = event.detail.tone === "error" ? inferErrorEmotion(event.detail.message) : { emotion: "happy" as const, intensity: 1 };
    this.libbyEmotion = normalizeEmotion(event.detail.emotion ?? inferred.emotion);
    this.libbyIntensity = loginIntensity(event.detail.intensity ?? inferred.intensity);
    if (this.libbyTimer) clearTimeout(this.libbyTimer);
    this.libbyTimer = window.setTimeout(() => {
      this.libbyMessage = "";
    }, 5000);
  };

  // Material web text fields live in shadow DOM, so Enter doesn't trigger the
  // form's native implicit submission. Wire it up explicitly.
  private onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !this.busy) {
      e.preventDefault();
      this.form.requestSubmit();
    }
  };

  private async submit(e: Event) {
    e.preventDefault();
    if (this.busy) return;
    this.error = "";
    this.busy = true;
    const form = e.target as HTMLFormElement;
    const u = (form.elements.namedItem("username") as HTMLInputElement).value;
    const p = (form.elements.namedItem("password") as HTMLInputElement).value;
    try {
      const res = await api.login(u, p);
      setToken(res.token);
      const welcome = libbyReact("login");
      mascotSay(`${welcome.message.replace(/\.$/, "")}, ${res.user.username}.`, "success",
        { emotion: welcome.emotion, intensity: welcome.intensity });
      this.dispatchEvent(
        new CustomEvent<User>("logged-in", { detail: res.user, bubbles: true, composed: true }),
      );
    } catch (err) {
      this.error = (err as Error).message || "login failed";
      if (this.error === "unauthorized") {
        const nope = libbyReact("loginFail");
        mascotSay(nope.message, "error", { emotion: nope.emotion, intensity: nope.intensity });
      } else {
        mascotSay(this.error);
      }
    } finally {
      this.busy = false;
    }
  }

  render() {
    // With Libby hidden the mascot (and her speech) stays off the login screen
    // entirely; errors still land in the form's own error line below.
    const assets = libbyAssetCandidates(this.libbyEmotion, this.libbyIntensity);
    const libby = loadHideLibby()
      ? null
      : html`<div class="libby ${this.libbyMessage ? "talking" : ""} ${this.libbyTone}">
          ${this.libbyMessage ? html`<div class="libby-speech libby-enter" role=${this.libbyTone === "error" ? "alert" : "status"}>
            <span class="libby-name">LIBBY</span>${this.libbyMessage}
          </div>` : null}
          <!-- Keyed on the pose and on the line she is saying, so she rocks into a
               new one and a mood change replaces the element — which is what
               restarts the artwork fallback chain for the new pose. -->
          <span class="libby-figure libby-breathe">${keyed(`${this.libbyEmotion}-${this.libbyIntensity}-${this.libbyMessage}`, html`<img
            class=${this.libbyTone === "error" ? "libby-startle" : "libby-speak"}
            src=${assets[0]} data-fallback-index="0" alt=${`Libby feeling ${this.libbyEmotion}`}
            @error=${(e: Event) => applyImageFallback(e.target as HTMLImageElement, assets)} />`)}</span>
        </div>`;
    return html`
      ${libby}
      <form class="card" @submit=${this.submit} @keydown=${this.onKeydown}>
        <span class="logo">${logoSVG}</span>
        <h1 class="brand">OppaiLib</h1>
        <p class="tagline">Your private media library</p>
        <md-filled-text-field label="Username" name="username" autofocus required></md-filled-text-field>
        <md-filled-text-field label="Password" name="password" type="password" required>
        </md-filled-text-field>
        <div class="err">${this.error}</div>
        <md-filled-button type="submit" ?disabled=${this.busy}>
          ${this.busy ? "Signing in…" : "Sign in"}
        </md-filled-button>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap { "oppai-login": OppaiLogin; }
}
