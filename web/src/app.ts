import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { api, getToken, setToken, mascotSay, type User } from "./api.js";
import { applyImageFallback, inferErrorEmotion, libbyAssetCandidates, loadHideLibby } from "./libby.js";
import { bumpIntensity } from "./libby-meter.js";
import { libbyReact } from "./libby-voice.js";
import "./views/login.js";
import "./views/library.js";

/**
 * How often to ask the server whether our session is still good.
 *
 * A browser session dies of inactivity, and it dies when the server restarts — but
 * without a probe we would only find that out on the next request the user happened
 * to make, leaving a signed-out UI sitting there looking signed in. The probe
 * (`/api/auth/me`) does not count as activity server-side, so polling it cannot itself
 * keep an idle tab alive: an untouched tab still idles out, it just notices promptly.
 */
const SESSION_PROBE_MS = 60_000;

@customElement("oppai-app")
export class OppaiApp extends LitElement {
  @state() private user: User | null = null;
  @state() private ready = false;
  @state() private mascotMessage = "";
  @state() private mascotTone: "success" | "error" = "success";
  // When an event tells us Libby's pose (a happy library-add reaction, say) we honor
  // it; errors that arrive without one still infer their mood from the message text.
  @state() private mascotEmotion = "";
  @state() private mascotIntensity = 0;

  private probeTimer?: number;
  private mascotTimer?: number;

  static styles = css`
    :host { display: block; min-height: 100vh; }
    .center { display: grid; place-items: center; height: 100vh; }
    .mascot-talk {
      position: fixed;
      right: 18px;
      bottom: 0;
      z-index: 200;
      display: flex;
      align-items: flex-end;
      pointer-events: none;
      animation: pop-in 0.3s ease-out both;
    }
    .mascot-talk img {
      width: min(210px, 34vw);
      max-height: 38vh;
      object-fit: contain;
      object-position: bottom;
      transform-origin: 55% 100%;
    }
    .speech {
      max-width: min(300px, 58vw);
      margin: 0 -18px 120px 0;
      padding: 12px 16px;
      border-radius: 18px 18px 4px 18px;
      background: var(--md-sys-color-surface-container-high);
      color: var(--md-sys-color-on-surface);
      border: 1px solid var(--md-sys-color-outline-variant);
      box-shadow: 0 8px 28px rgba(0,0,0,.35);
      font: 500 14px/1.4 Roboto, system-ui, sans-serif;
    }
    .mascot-talk.error .speech { border-color: var(--md-sys-color-error); }
    /* Libby hidden: the bubble alone, tucked to the corner without the mascot's footprint. */
    .mascot-talk.plain .speech { margin: 0 0 18px 0; }
    .libby-name { display: block; color: var(--md-sys-color-error); font-size: 11px; font-weight: 700; }
    @keyframes pop-in { from { opacity: 0; transform: translateY(24px) scale(.94); } }
    @media (max-width: 600px) {
      .mascot-talk img { width: 150px; }
      .speech { margin-bottom: 100px; }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("oppai-logout", this.onLogout);
    window.addEventListener("oppai-mascot", this.onMascot as EventListener);
    window.addEventListener("oppai-libby-pref", this.onLibbyPref);
    window.addEventListener("imported", this.onImported as EventListener);
    // A tab that was in the background while the session died should find out the
    // moment it's looked at again, rather than on the next tick.
    document.addEventListener("visibilitychange", this.onVisible);
    this.bootstrap();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("oppai-logout", this.onLogout);
    window.removeEventListener("oppai-mascot", this.onMascot as EventListener);
    window.removeEventListener("oppai-libby-pref", this.onLibbyPref);
    window.removeEventListener("imported", this.onImported as EventListener);
    document.removeEventListener("visibilitychange", this.onVisible);
    this.stopProbe();
    if (this.mascotTimer) clearTimeout(this.mascotTimer);
  }

  private onMascot = (event: CustomEvent<{ message: string; tone: "success" | "error"; emotion?: string; intensity?: number }>) => {
    // Libby reacts in character to things happening around the app — errors and
    // successes alike. An event that names her pose (a happy library-add, say) is
    // shown as-is; a bare error still infers its mood from the message text at render.
    // (The login screen owns its own always-on Libby; this popup only shows once
    // you're inside, see render().)
    const d = event.detail;
    this.mascotMessage = d.message;
    this.mascotTone = d.tone;
    this.mascotEmotion = d.emotion ?? "";
    this.mascotIntensity = d.intensity ?? 0;
    if (this.mascotTimer) clearTimeout(this.mascotTimer);
    this.mascotTimer = window.setTimeout(() => (this.mascotMessage = ""), 5000);
  };

  // Adding to the library warms Libby up (her session horniness) and gets a reaction.
  // The event bubbles composed from whichever view did the import. Her wording comes
  // from the local voice (libby-voice.ts), so it shifts with the meter she just moved.
  private onImported = (event: CustomEvent<{ count?: number }>) => {
    const count = Math.max(1, event.detail?.count ?? 1);
    const intensity = bumpIntensity(count > 1 ? 2 : 1);
    const line = libbyReact("import", { intensity, count });
    mascotSay(line.message, "success", { emotion: line.emotion, intensity: line.intensity });
  };

  // The Settings toggle fires this; re-render so a popup that's on screen right now
  // sheds (or regains) the mascot immediately.
  private onLibbyPref = () => this.requestUpdate();

  private onLogout = () => {
    this.user = null;
    this.stopProbe();
  };

  private onVisible = () => {
    if (document.visibilityState === "visible" && this.user) void this.probe();
  };

  private async bootstrap() {
    if (getToken()) {
      try {
        this.user = await api.me();
        this.startProbe();
      } catch {
        setToken(null);
      }
    }
    this.ready = true;
  }

  // The session probe. `api.me()` already routes a 401 through the shared logout
  // event, so a rejected session lands us back on the login screen on its own; a
  // network blip is not a logout, and is ignored.
  private async probe() {
    if (!getToken()) return;
    try {
      await api.me();
    } catch {
      /* 401 has already logged us out; anything else is transient */
    }
  }

  private startProbe() {
    this.stopProbe();
    this.probeTimer = window.setInterval(() => void this.probe(), SESSION_PROBE_MS);
  }

  private stopProbe() {
    if (this.probeTimer) {
      clearInterval(this.probeTimer);
      this.probeTimer = undefined;
    }
  }

  private onLoggedIn(e: CustomEvent<User>) {
    this.mascotMessage = "";
    this.user = e.detail;
    this.startProbe();
  }

  private async logout() {
    try { await api.logout(); } catch { /* ignore */ }
    setToken(null);
    this.user = null;
    this.stopProbe();
  }

  render() {
    // This popup is the app's error surface, so hiding Libby can't hide the message —
    // it just drops the character: same bubble, no artwork, no name.
    const hideLibby = loadHideLibby();
    // Prefer the pose the event carried; fall back to inferring one from an error's text.
    const cue = this.mascotEmotion
      ? { emotion: this.mascotEmotion, intensity: this.mascotIntensity || 1 }
      : inferErrorEmotion(this.mascotMessage);
    const assets = libbyAssetCandidates(cue.emotion, cue.intensity);
    const mascot = this.mascotMessage
      ? html`<div class="mascot-talk ${this.mascotTone} ${hideLibby ? "plain" : ""}">
          <div class="speech" role=${this.mascotTone === "error" ? "alert" : "status"}>
            ${hideLibby ? null : html`<span class="libby-name">LIBBY</span>`}${this.mascotMessage}
          </div>
          ${hideLibby
            ? null
            : html`<img src=${assets[0]} data-fallback-index="0" alt=${`Libby feeling ${cue.emotion}`}
              @error=${(e: Event) => applyImageFallback(e.target as HTMLImageElement, assets)} />`}
        </div>`
      : null;
    if (!this.ready) {
      return html`<div class="center"><md-circular-progress indeterminate></md-circular-progress></div>${mascot}`;
    }
    if (!this.user) {
      return html`<oppai-login @logged-in=${this.onLoggedIn}></oppai-login>`;
    }
    return html`<oppai-library
      .user=${this.user}
      @logout=${this.logout}
    ></oppai-library>${mascot}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "oppai-app": OppaiApp;
  }
}
