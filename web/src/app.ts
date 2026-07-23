import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { api, getToken, setToken, mascotSay, type User } from "./api.js";
import { applyImageFallback, inferErrorEmotion, libbyAssetCandidates, loadHideLibby } from "./libby.js";
import { bumpIntensity } from "./libby-meter.js";
import { libbyOnUpload, type LibbyItemFacts } from "./libby-voice.js";
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
    /* Libby's pop-up is a retro dialogue box: a chunky pixel sprite with a hard-edged
       text frame, the way a game announces something to you. It is styled as pixel art
       rather than Material on purpose — this is the mascot speaking, not the app, and
       the visual break is what stops it reading as another system toast. */
    .mascot-talk {
      position: fixed;
      right: 18px;
      top: 72px;
      z-index: 200;
      display: flex;
      align-items: flex-end;
      gap: 10px;
      pointer-events: none;
      /* steps(): the box snaps in rather than easing, which is the whole point. */
      animation: pixel-pop 0.18s steps(3, end) both;
      --pixel-ink: var(--md-sys-color-on-surface);
      --pixel-bg: var(--md-sys-color-surface-container-highest);
    }
    .mascot-talk.error { --pixel-ink: var(--md-sys-color-error); }

    /* A high-resolution portrait downsampled to a tiny box and scaled back up with
       nearest-neighbour. Without the round trip through a small size, image-rendering
       has nothing to do — the source art is far larger than it is ever drawn. */
    .pixel-sprite {
      order: -1;
      flex: 0 0 auto;
      width: 96px;
      height: 96px;
      overflow: hidden;
      image-rendering: pixelated;
    }
    .pixel-sprite img {
      width: 24px;
      height: 24px;
      object-fit: cover;
      object-position: top center;
      image-rendering: pixelated;
      transform: scale(4);
      transform-origin: top left;
    }

    /* The classic stepped pixel frame: the box is grown outward twice with box-shadow,
       once in the fill colour and once in the ink, which leaves notched corners no
       border-radius can imitate. */
    .speech {
      position: relative;
      max-width: min(300px, 52vw);
      margin: 0 8px 8px 0;
      padding: 10px 12px;
      background: var(--pixel-bg);
      color: var(--md-sys-color-on-surface);
      border-radius: 0;
      box-shadow:
        0 -4px 0 0 var(--pixel-bg), 0 4px 0 0 var(--pixel-bg),
        -4px 0 0 0 var(--pixel-bg), 4px 0 0 0 var(--pixel-bg),
        0 -8px 0 0 var(--pixel-ink), 0 8px 0 0 var(--pixel-ink),
        -8px 0 0 0 var(--pixel-ink), 8px 0 0 0 var(--pixel-ink);
      font: 500 13px/1.5 ui-monospace, "Cascadia Mono", Consolas, "DejaVu Sans Mono", monospace;
      letter-spacing: .02em;
    }
    /* The tail, drawn as two stacked blocks so it steps like the frame does. */
    .speech::before,
    .speech::after {
      content: "";
      position: absolute;
      left: -12px;
      width: 4px;
      background: var(--pixel-ink);
    }
    .speech::before { bottom: 14px; height: 8px; }
    .speech::after { left: -8px; bottom: 10px; height: 16px; }
    /* Libby hidden: the frame alone, without the sprite's footprint. */
    .mascot-talk.plain .speech::before,
    .mascot-talk.plain .speech::after { display: none; }
    .libby-name {
      display: block;
      color: var(--pixel-ink);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: .14em;
      text-transform: uppercase;
    }
    @keyframes pixel-pop { from { opacity: 0; transform: translateY(12px); } }
    @media (prefers-reduced-motion: reduce) { .mascot-talk { animation: none; } }
    @media (max-width: 600px) {
      .mascot-talk { top: 64px; right: 14px; gap: 6px; }
      .pixel-sprite { width: 64px; height: 64px; }
      .pixel-sprite img { width: 16px; height: 16px; transform: scale(4); }
      .speech { max-width: 62vw; font-size: 12px; }
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
  //
  // A view that knows what it just added says so in the detail, and she remarks on
  // the thing itself rather than on the act of saving. Views that only know a count
  // still get the generic line, so nothing has to be updated in lockstep.
  private onImported = (event: CustomEvent<LibbyItemFacts>) => {
    const facts = event.detail ?? {};
    const count = Math.max(1, facts.count ?? 1);
    const intensity = bumpIntensity(count > 1 ? 2 : 1);
    const line = libbyOnUpload({ ...facts, count }, { intensity });
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
            ${hideLibby ? null : html`<span class="libby-name">Libby</span>`}${this.mascotMessage}
          </div>
          ${hideLibby
            ? null
            : html`<span class="pixel-sprite"><img src=${assets[0]} data-fallback-index="0"
                alt=${`Libby feeling ${cue.emotion}`}
                @error=${(e: Event) => applyImageFallback(e.target as HTMLImageElement, assets)} /></span>`}
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
