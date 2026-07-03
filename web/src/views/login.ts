import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { api, setToken, type User } from "../api.js";

@customElement("oppai-login")
export class OppaiLogin extends LitElement {
  @state() private error = "";
  @state() private busy = false;

  static styles = css`
    :host { display: grid; place-items: center; height: 100vh; padding: 1rem; }
    .card {
      background: var(--md-sys-color-surface-container);
      border-radius: 28px;
      padding: 2rem;
      width: min(380px, 100%);
      display: flex;
      flex-direction: column;
      gap: 1rem;
      box-shadow: 0 4px 24px rgba(0,0,0,.4);
    }
    h1 { margin: 0 0 .5rem; text-align: center; letter-spacing: .5px; }
    .brand { text-align: center; color: var(--md-sys-color-primary); }
    md-filled-text-field { width: 100%; }
    .err { color: var(--md-sys-color-error); font-size: .85rem; min-height: 1.2em; }
  `;

  private async submit(e: Event) {
    e.preventDefault();
    this.error = "";
    this.busy = true;
    const form = e.target as HTMLFormElement;
    const u = (form.elements.namedItem("username") as HTMLInputElement).value;
    const p = (form.elements.namedItem("password") as HTMLInputElement).value;
    try {
      const res = await api.login(u, p);
      setToken(res.token);
      this.dispatchEvent(
        new CustomEvent<User>("logged-in", { detail: res.user, bubbles: true, composed: true }),
      );
    } catch (err) {
      this.error = (err as Error).message || "login failed";
    } finally {
      this.busy = false;
    }
  }

  render() {
    return html`
      <form class="card" @submit=${this.submit}>
        <h1 class="brand">OppaiLib</h1>
        <md-filled-text-field label="Username" name="username" required></md-filled-text-field>
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
