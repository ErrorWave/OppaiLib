import { LitElement, html, css } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { api, mascotSay, setToken, type User } from "../api.js";
import { motionStyles } from "../theme.js";
import { logoSVG } from "../logo.js";

@customElement("oppai-login")
export class OppaiLogin extends LitElement {
  @state() private error = "";
  @state() private busy = false;

  static styles = [
    motionStyles,
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
      .mascot {
        position: absolute;
        right: 0;
        bottom: 0;
        height: min(78vh, 620px);
        width: auto;
        pointer-events: none;
        user-select: none;
        animation: oppai-fade-in-up 0.7s var(--oppai-ease-emphasized) both;
        animation-delay: 0.15s;
      }
      @media (max-width: 900px) {
        .mascot {
          right: 50%;
          transform: translateX(50%);
          height: min(42vh, 360px);
          opacity: 0.5;
        }
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
      mascotSay(`Welcome back, ${res.user.username}!`, "success");
      this.dispatchEvent(
        new CustomEvent<User>("logged-in", { detail: res.user, bubbles: true, composed: true }),
      );
    } catch (err) {
      this.error = (err as Error).message || "login failed";
      mascotSay(this.error === "unauthorized" ? "That login didn't work. Check your username and password." : this.error);
    } finally {
      this.busy = false;
    }
  }

  render() {
    return html`
      <img class="mascot" src="/mascot-lg.png" alt="" />
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
