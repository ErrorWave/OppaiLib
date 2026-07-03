import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { api, getToken, setToken, type User } from "./api.js";
import "./views/login.js";
import "./views/library.js";

@customElement("oppai-app")
export class OppaiApp extends LitElement {
  @state() private user: User | null = null;
  @state() private ready = false;

  static styles = css`
    :host { display: block; min-height: 100vh; }
    .center { display: grid; place-items: center; height: 100vh; }
  `;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("oppai-logout", this.onLogout);
    this.bootstrap();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("oppai-logout", this.onLogout);
  }

  private onLogout = () => {
    this.user = null;
  };

  private async bootstrap() {
    if (getToken()) {
      try {
        this.user = await api.me();
      } catch {
        setToken(null);
      }
    }
    this.ready = true;
  }

  private onLoggedIn(e: CustomEvent<User>) {
    this.user = e.detail;
  }

  private async logout() {
    try { await api.logout(); } catch { /* ignore */ }
    setToken(null);
    this.user = null;
  }

  render() {
    if (!this.ready) {
      return html`<div class="center"><md-circular-progress indeterminate></md-circular-progress></div>`;
    }
    if (!this.user) {
      return html`<oppai-login @logged-in=${this.onLoggedIn}></oppai-login>`;
    }
    return html`<oppai-library
      .user=${this.user}
      @logout=${this.logout}
    ></oppai-library>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "oppai-app": OppaiApp;
  }
}
