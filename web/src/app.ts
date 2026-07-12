import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { api, getToken, setToken, type User } from "./api.js";
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

  private probeTimer?: number;

  static styles = css`
    :host { display: block; min-height: 100vh; }
    .center { display: grid; place-items: center; height: 100vh; }
  `;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("oppai-logout", this.onLogout);
    // A tab that was in the background while the session died should find out the
    // moment it's looked at again, rather than on the next tick.
    document.addEventListener("visibilitychange", this.onVisible);
    this.bootstrap();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("oppai-logout", this.onLogout);
    document.removeEventListener("visibilitychange", this.onVisible);
    this.stopProbe();
  }

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
