import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { libbyArtChain } from "../libby.js";
import { tierForMeter } from "../libby-meter.js";

/**
 * Libby's portrait, in one place. Give it an emotion and it renders the worn
 * outfit's art for the current horniness tier, walking libbyArtChain() on each
 * image error so a missing tier (or a stale outfit) falls back cleanly rather than
 * showing a broken image. It re-renders when the meter or the outfit changes.
 *
 * This is the single source of Libby's face — the chat panel, the app-wide speech
 * popup, and anywhere else she appears use this instead of hand-rolling an <img>
 * with its own fallback.
 */
@customElement("libby-portrait")
export class LibbyPortrait extends LitElement {
  /** One of the five emotions: neutral | happy | mischievous | surprised | thinking. */
  @property() emotion = "neutral";
  /** Adds the gentle talking wobble (used while a reply streams / an event fires). */
  @property({ type: Boolean }) talking = false;

  @state() private tier = tierForMeter();
  /** How far down the fallback chain the current <img> has walked. */
  private attempt = 0;

  static styles = css`
    :host {
      display: block;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: bottom;
      transform-origin: 55% 100%;
    }
    img.talking {
      animation: libby-talk 0.34s ease-in-out infinite alternate;
    }
    @keyframes libby-talk {
      from {
        transform: rotate(-0.5deg);
      }
      to {
        transform: translateY(-5px) rotate(0.65deg);
      }
    }
  `;

  private onMeter = () => {
    this.tier = tierForMeter();
  };
  private onPref = () => {
    // The worn outfit changed: start the fallback walk over so we try the new
    // outfit's art from the top rather than wherever the old one bailed out.
    this.attempt = 0;
    this.requestUpdate();
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("oppai-libby-meter", this.onMeter);
    window.addEventListener("oppai-libby-pref", this.onPref as EventListener);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("oppai-libby-meter", this.onMeter);
    window.removeEventListener("oppai-libby-pref", this.onPref as EventListener);
  }

  // Reset the fallback walk whenever what we're showing changes.
  protected willUpdate(changed: Map<string, unknown>) {
    if (changed.has("emotion") || changed.has("tier")) this.attempt = 0;
  }

  render() {
    const chain = libbyArtChain(this.emotion, this.tier);
    const src = chain[Math.min(this.attempt, chain.length - 1)];
    return html`<img
      class=${this.talking ? "talking" : ""}
      src=${src}
      alt="Libby"
      @error=${this.onError}
    />`;
  }

  private onError = (e: Event) => {
    const chain = libbyArtChain(this.emotion, this.tier);
    if (this.attempt < chain.length - 1) {
      this.attempt++;
      (e.target as HTMLImageElement).src = chain[this.attempt];
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "libby-portrait": LibbyPortrait;
  }
}
