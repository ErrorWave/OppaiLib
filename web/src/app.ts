import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { keyed } from "lit/directives/keyed.js";
import { api, getToken, setToken, mascotSay, type User } from "./api.js";
import { ambientIntensity, applyImageFallback, inferErrorEmotion, libbyAssetCandidates, loadHideLibby } from "./libby.js";
import { libbyMotion, typeDuration } from "./libby-motion.js";
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

  /**
   * How much of the current line has been revealed.
   *
   * A dialogue box types its line out; that is most of what makes one feel like a
   * dialogue box rather than a toast. The full text is in the DOM's aria-label from
   * the first frame, so a screen reader is never made to wait for the flourish.
   */
  @state() private typed = "";
  /** Bumped per line so the sprite's reaction animation restarts on each one. */
  @state() private beat = 0;

  private probeTimer?: number;
  private mascotTimer?: number;
  private typeTimer?: number;

  static styles = [libbyMotion, css`
    :host { display: block; min-height: 100vh; }
    .center { display: grid; place-items: center; height: 100vh; }

    /* Libby's pop-up is a retro dialogue box: her sprite standing in a framed
       portrait window, with a hard-edged text frame beside it and a nameplate over
       the top — the way a game announces something to you. It is styled as pixel art
       rather than Material on purpose: this is the mascot speaking, not the app, and
       the visual break is what stops it reading as another system toast.
       Her artwork is genuine pixel art now, so it is scaled with nearest-neighbour
       and left alone. The old box downsampled a hi-res portrait to 24px and blew it
       back up to fake the look, which against the real sprites only ever produced a
       crop of the top of her head. */
    .mascot-talk {
      position: fixed;
      right: 18px;
      top: 72px;
      z-index: 200;
      display: flex;
      align-items: flex-end;
      gap: 0;
      pointer-events: none;
      --pixel-ink: var(--md-sys-color-on-surface);
      --pixel-bg: var(--md-sys-color-surface-container-highest);
      --pixel-accent: var(--md-sys-color-primary);
    }
    .mascot-talk.error { --pixel-ink: var(--md-sys-color-error); --pixel-accent: var(--md-sys-color-error); }

    /* The portrait window: a framed plate she stands in, bottom-aligned with the
       speech box so the two read as one unit. */
    .pixel-sprite {
      order: -1;
      flex: 0 0 auto;
      position: relative;
      width: 108px;
      height: 132px;
      margin-right: 14px;
      overflow: hidden;
      background: var(--pixel-bg);
      box-shadow:
        0 -4px 0 0 var(--pixel-bg), 0 4px 0 0 var(--pixel-bg),
        -4px 0 0 0 var(--pixel-bg), 4px 0 0 0 var(--pixel-bg),
        0 -8px 0 0 var(--pixel-ink), 0 8px 0 0 var(--pixel-ink),
        -8px 0 0 0 var(--pixel-ink), 8px 0 0 0 var(--pixel-ink);
    }
    /* Head and shoulders, by construction rather than by cropping guesswork: the
       sprite is scaled so its *width* fills the window and pinned to the top, and
       the window is shorter than the result. Every sprite in the wardrobe is a
       standing pose with her head at the top, and every one of them is taller than
       108:132 once width-fitted, so this frames her face and torso whichever pose
       and tier is showing — which the old fixed 24px crop could not.
       Left to scale smoothly on purpose: these are ~500px wide and this window is a
       fifth of that, and nearest-neighbour on a non-integer *downscale* eats exactly
       the thin details pixel art is made of. */
    .pixel-sprite img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
      /* No centring transform: the image is exactly the window's width, so it is
         already centred — and leaving transform free is what lets the reaction
         animations own it outright. */
      transform-origin: 50% 0;
    }

    /* The classic stepped pixel frame: the box is grown outward twice with box-shadow,
       once in the fill colour and once in the ink, which leaves notched corners no
       border-radius can imitate. */
    .speech {
      position: relative;
      max-width: min(300px, 52vw);
      margin: 0 8px 8px 0;
      padding: 8px 12px 10px;
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
    /* The tail, drawn as two stacked blocks so it steps like the frame does. It
       points back at the portrait window, which is what ties her to the words. */
    .speech::before,
    .speech::after {
      content: "";
      position: absolute;
      left: -12px;
      width: 4px;
      background: var(--pixel-ink);
    }
    .speech::before { bottom: 22px; height: 8px; }
    .speech::after { left: -8px; bottom: 18px; height: 16px; }
    /* Libby hidden: the frame alone, without the sprite's footprint. */
    .mascot-talk.plain .speech::before,
    .mascot-talk.plain .speech::after { display: none; }

    .libby-name {
      display: block;
      margin-bottom: 3px;
      color: var(--pixel-accent);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: .14em;
      text-transform: uppercase;
    }
    /* The box is sized by the *whole* line from the first frame, with the typed
       portion laid over the top. Without this it grows a character at a time — and
       since the pop-up is anchored to the right edge, a growing box drags itself and
       her portrait leftwards across the screen for the length of the animation. The
       ghost is what a dialogue box's fixed frame is, done in flow layout. */
    .line { position: relative; display: block; }
    .ghost { visibility: hidden; }
    .shown { position: absolute; inset: 0; }
    /* The "there is more" marker every dialogue box has. It appears only once the
       line has finished typing, so it means what it looks like it means — and the
       ghost reserves its width so its arrival cannot reflow the last word. */
    .caret {
      display: inline-block;
      margin-left: 4px;
      color: var(--pixel-accent);
      font-size: 11px;
    }

    @media (max-width: 600px) {
      .mascot-talk { top: 64px; right: 14px; }
      .pixel-sprite { width: 72px; height: 92px; margin-right: 12px; }
      .speech { max-width: 62vw; font-size: 12px; }
      .speech::before { bottom: 16px; }
      .speech::after { bottom: 12px; }
    }
  `];

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
    if (this.typeTimer) cancelAnimationFrame(this.typeTimer);
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
    this.beat++;
    this.typeLine(d.message);
    if (this.mascotTimer) clearTimeout(this.mascotTimer);
    // The line stays up long enough to read *after* it has finished typing, rather
    // than spending part of its five seconds still arriving.
    this.mascotTimer = window.setTimeout(() => (this.mascotMessage = ""), 5000 + typeDuration(d.message));
  };

  /**
   * Reveals a line character by character.
   *
   * Driven off rAF rather than a per-character timer: the reveal is time-based, so
   * it lands in the same place regardless of frame rate, and a line that arrives
   * while another is still typing simply takes over. Honours the OS
   * reduced-motion setting by showing the whole line at once.
   */
  private typeLine(text: string) {
    if (this.typeTimer) cancelAnimationFrame(this.typeTimer);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.typed = text;
      return;
    }
    const total = typeDuration(text), startedAt = performance.now();
    this.typed = "";
    const step = () => {
      const progress = Math.min(1, (performance.now() - startedAt) / Math.max(1, total));
      this.typed = text.slice(0, Math.ceil(text.length * progress));
      if (progress < 1) this.typeTimer = requestAnimationFrame(step);
      else this.typeTimer = undefined;
    };
    this.typeTimer = requestAnimationFrame(step);
  }

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
    // Capped like the sign-in screen: this pop-up appears over whatever the user was
    // doing, on any screen, unasked. See AMBIENT_MAX_INTENSITY.
    const assets = libbyAssetCandidates(cue.emotion, ambientIntensity(cue.intensity));
    const done = this.typed.length >= this.mascotMessage.length;
    // She rocks into a line she is pleased with and jolts on an error. Keyed on the
    // beat so the animation replays per line rather than only on the first one, and
    // on the pose so a mood change swaps the sprite instead of mutating src — which
    // is what restarts the fallback chain for the new artwork.
    const reaction = this.mascotTone === "error" ? "libby-startle" : "libby-speak";
    const mascot = this.mascotMessage
      ? html`<div class="mascot-talk libby-enter ${this.mascotTone} ${hideLibby ? "plain" : ""}">
          <div class="speech" role=${this.mascotTone === "error" ? "alert" : "status"}
            aria-label=${this.mascotMessage}>
            ${hideLibby ? null : html`<span class="libby-name">Libby</span>`}
            <span class="line" aria-hidden="true"
              ><span class="ghost">${this.mascotMessage}<span class="caret">▼</span></span
              ><span class="shown">${this.typed}${done
                ? html`<span class="caret libby-caret">▼</span>`
                : null}</span
            ></span>
          </div>
          ${hideLibby
            ? null
            : html`<span class="pixel-sprite libby-breathe">${keyed(`${this.beat}-${cue.emotion}-${cue.intensity}`,
                html`<img class=${reaction} src=${assets[0]} data-fallback-index="0"
                  alt=${`Libby feeling ${cue.emotion}`}
                  @error=${(e: Event) => applyImageFallback(e.target as HTMLImageElement, assets)} />`)}</span>`}
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
