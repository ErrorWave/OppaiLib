import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { api, type APKInfo, type Settings, type ReadOnlyInfo, type Stats, type User } from "../api.js";
import {
  iconStyles,
  motionStyles,
  type ThemePref,
  loadTheme,
  saveTheme,
  applyTheme,
} from "../theme.js";
import { KIND_META, type Kind, type ComicFit, loadComicFit, saveComicFit } from "../media-meta.js";

// The Settings screen. Server-side settings (AI tagging, scraping) are loaded
// from and saved back to /api/settings and only an admin may write them —
// non-admins see the same values, read-only. Appearance and reader preferences
// are per-device and live in localStorage, so they apply the moment you pick
// them, with no save step.
@customElement("oppai-settings")
export class OppaiSettings extends LitElement {
  @property({ attribute: false }) user!: User;

  @state() private settings: Settings | null = null;
  @state() private info: ReadOnlyInfo | null = null;
  @state() private stats: Stats | null = null;
  // null while we're still asking; {available:false} when this image has no APK.
  @state() private apk: APKInfo | null = null;
  @state() private loadError = "";

  @state() private dirty = false;
  @state() private saving = false;
  @state() private saved = false;

  @state() private theme: ThemePref = loadTheme();
  @state() private fit: ComicFit = loadComicFit();

  @state() private pwCurrent = "";
  @state() private pwNew = "";
  @state() private pwConfirm = "";
  @state() private pwBusy = false;
  @state() private pwMsg = "";
  @state() private pwErr = "";

  static styles = [
    iconStyles,
    motionStyles,
    css`
      :host {
        display: block;
      }
      .wrap {
        max-width: 780px;
        margin: 0 auto;
        padding-bottom: 40px;
      }
      .card {
        background: var(--oppai-surface);
        border: 1px solid var(--oppai-border);
        border-radius: 20px;
        padding: 22px 24px;
        margin-bottom: 20px;
        animation: oppai-fade-in-up 0.4s var(--oppai-ease-emphasized) both;
      }
      .card h3 {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 17px;
        font-weight: 500;
        margin: 0 0 4px;
      }
      .card h3 .material-symbols-rounded {
        font-size: 22px;
        color: var(--oppai-primary-bright);
      }
      .card-sub {
        font-size: 13px;
        color: var(--oppai-text-muted);
        margin: 0 0 18px;
      }
      .field {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 12px 0;
        border-top: 1px solid var(--oppai-border);
      }
      .field:first-of-type {
        border-top: none;
      }
      .field-text {
        flex: 1;
        min-width: 0;
      }
      .field-label {
        font-size: 14px;
        font-weight: 500;
      }
      .field-help {
        font-size: 12px;
        color: var(--oppai-text-muted);
        margin-top: 2px;
      }
      .field-control {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      /* Stacked variant for controls too wide to sit beside their label. */
      .field.stack {
        display: block;
      }
      .field.stack .field-control {
        margin-top: 10px;
      }

      input[type="text"],
      input[type="number"],
      input[type="password"] {
        background: var(--oppai-surface-2);
        border: 1px solid var(--oppai-border-strong);
        border-radius: 12px;
        color: var(--oppai-text);
        font: inherit;
        font-size: 14px;
        padding: 10px 12px;
        outline: none;
        width: 100%;
        box-sizing: border-box;
      }
      input:focus {
        border-color: var(--oppai-primary);
      }
      input[disabled] {
        opacity: 0.55;
      }
      input[type="number"] {
        width: 110px;
      }
      input[type="range"] {
        width: 160px;
        accent-color: var(--oppai-primary);
      }

      /* Switch */
      .switch {
        width: 52px;
        height: 30px;
        border-radius: 15px;
        border: none;
        background: var(--oppai-surface-2);
        position: relative;
        cursor: pointer;
        transition: background 0.2s ease;
        flex-shrink: 0;
      }
      .switch.on {
        background: var(--oppai-primary);
      }
      .switch[disabled] {
        opacity: 0.5;
        cursor: default;
      }
      .switch::after {
        content: "";
        position: absolute;
        top: 4px;
        left: 4px;
        width: 22px;
        height: 22px;
        border-radius: 11px;
        background: var(--oppai-text-muted);
        transition: transform 0.22s var(--oppai-ease-spring), background 0.2s ease;
      }
      .switch.on::after {
        transform: translateX(22px);
        background: var(--oppai-on-primary);
      }

      /* Segmented choice */
      .seg {
        display: flex;
        gap: 6px;
      }
      .seg button {
        height: 36px;
        padding: 0 14px;
        border-radius: 18px;
        border: 1px solid var(--oppai-border-strong);
        background: none;
        color: var(--oppai-text-dim);
        font: inherit;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .seg button.on {
        background: var(--oppai-accent);
        border-color: var(--oppai-accent);
        color: var(--oppai-on-accent);
      }

      .value {
        font: 600 13px ui-monospace, monospace;
        color: var(--oppai-text-dim);
        min-width: 40px;
        text-align: right;
      }
      .ro {
        font: 500 12px ui-monospace, monospace;
        color: var(--oppai-text-muted);
        word-break: break-all;
        text-align: right;
      }

      .btn-primary {
        height: 44px;
        padding: 0 24px;
        border-radius: 22px;
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
        border: none;
        font: inherit;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .btn-primary[disabled] {
        opacity: 0.5;
        cursor: default;
      }

      .banner {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        border-radius: 12px;
        padding: 10px 14px;
        margin-bottom: 20px;
      }
      .banner.info {
        background: var(--oppai-surface-2);
        color: var(--oppai-text-dim);
      }
      .banner.error {
        background: color-mix(in srgb, var(--oppai-fav) 18%, transparent);
        color: var(--oppai-fav);
      }
      .banner.ok {
        background: var(--oppai-primary-container);
        color: var(--oppai-primary-bright);
      }

      /* Sticky save bar for the server-side settings. */
      .savebar {
        position: sticky;
        bottom: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-radius: 22px;
        background: var(--oppai-surface-2);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
        animation: oppai-scale-in 0.28s var(--oppai-ease-spring) both;
      }
      .savebar .grow {
        flex: 1;
        font-size: 13px;
        color: var(--oppai-text-dim);
      }

      .stat-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 12px;
      }
      .stat {
        background: var(--oppai-surface-2);
        border-radius: 14px;
        padding: 12px 14px;
      }
      .stat-num {
        font-size: 20px;
        font-weight: 500;
      }
      .stat-label {
        font-size: 12px;
        color: var(--oppai-text-muted);
        margin-top: 2px;
      }
      .pw {
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 360px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.load();
  }

  private async load() {
    try {
      const [s, st] = await Promise.all([api.getSettings(), api.stats()]);
      this.settings = s.settings;
      this.info = s.readOnly;
      this.stats = st;
    } catch (e) {
      this.loadError = (e as Error).message;
    }
    // Separate from the load above: an image built without an APK is a normal state,
    // not a settings failure, and it must not surface as "couldn't load settings".
    try {
      this.apk = await api.apkInfo();
    } catch {
      this.apk = { available: false };
    }
  }

  private get canEdit(): boolean {
    return !!this.user?.isAdmin;
  }

  // Edit server-side settings locally; nothing is sent until Save.
  private edit(patch: Partial<Settings>) {
    if (!this.settings || !this.canEdit) return;
    this.settings = { ...this.settings, ...patch };
    this.dirty = true;
    this.saved = false;
  }

  private async save() {
    if (!this.settings) return;
    this.saving = true;
    try {
      const res = await api.saveSettings(this.settings);
      this.settings = res.settings; // the server clamps; show what it actually stored
      this.info = res.readOnly;
      this.dirty = false;
      this.saved = true;
    } catch (e) {
      this.loadError = (e as Error).message;
    } finally {
      this.saving = false;
    }
  }

  private pickTheme(pref: ThemePref) {
    this.theme = pref;
    saveTheme(pref);
    applyTheme(pref);
  }

  private pickFit(fit: ComicFit) {
    this.fit = fit;
    saveComicFit(fit);
  }

  private async changePassword() {
    this.pwMsg = "";
    this.pwErr = "";
    if (this.pwNew !== this.pwConfirm) {
      this.pwErr = "The new passwords don't match.";
      return;
    }
    if (this.pwNew.length < 8) {
      this.pwErr = "Use at least 8 characters.";
      return;
    }
    this.pwBusy = true;
    try {
      await api.changePassword(this.pwCurrent, this.pwNew);
      this.pwMsg = "Password changed.";
      this.pwCurrent = this.pwNew = this.pwConfirm = "";
    } catch (e) {
      this.pwErr = (e as Error).message;
    } finally {
      this.pwBusy = false;
    }
  }

  render() {
    return html`
      <div class="wrap">
        ${this.loadError
          ? html`<div class="banner error">
              <span class="material-symbols-rounded" style="font-size:18px;">error</span>
              ${this.loadError}
            </div>`
          : nothing}
        ${!this.canEdit && this.settings
          ? html`<div class="banner info">
              <span class="material-symbols-rounded" style="font-size:18px;">lock</span>
              Server settings are read-only — only an admin can change them.
            </div>`
          : nothing}
        ${this.renderAppearance()} ${this.renderAI()} ${this.renderScraping()}
        ${this.dirty || this.saved ? this.renderSaveBar() : nothing} ${this.renderLibrary()}
        ${this.renderAndroid()} ${this.renderAccount()} ${this.renderAbout()}
      </div>
    `;
  }

  private renderSaveBar() {
    return html`
      <div class="savebar">
        <span class="grow">
          ${this.saved && !this.dirty ? "Settings saved — they're live now." : "You have unsaved changes."}
        </span>
        <button class="btn-primary" ?disabled=${this.saving || !this.dirty} @click=${this.save}>
          <span class="material-symbols-rounded" style="font-size:20px;">save</span>
          ${this.saving ? "Saving…" : "Save"}
        </button>
      </div>
    `;
  }

  /**
   * The Android client, downloaded from the box that holds the library.
   *
   * There is no app store for this, so the server hands out its own client. The QR
   * code is the point: you scan it with the phone you want the app on, rather than
   * emailing yourself an APK.
   */
  private renderAndroid() {
    const apk = this.apk;
    return html`
      <section class="card">
        <h3><span class="material-symbols-rounded">android</span>Android app</h3>
        <p class="card-sub">
          Install the companion app straight from this server — no app store, no
          sideloading from a third party.
        </p>

        ${apk === null
          ? html`<p class="field-help">Checking…</p>`
          : !apk.available
            ? html`<p class="field-help">
                No APK is bundled with this server build. Drop one at
                <code>/config/oppailib.apk</code>, or grab it from the Actions run that
                built this image.
              </p>`
            : html`
                <div class="field">
                  <div class="field-text">
                    <div class="field-label">oppailib.apk</div>
                    <div class="field-help">
                      ${formatBytes(apk.size ?? 0)} · built
                      ${new Date((apk.modified ?? 0) * 1000).toLocaleDateString()}
                      ${apk.sha256
                        ? html`<br /><span style="font-family:monospace; font-size:11px;"
                            >sha256 ${apk.sha256.slice(0, 16)}…</span
                          >`
                        : nothing}
                    </div>
                  </div>
                  <div class="field-control">
                    <a href="/api/apk" download="oppailib.apk">
                      <button class="btn-primary">
                        <span class="material-symbols-rounded" style="font-size:20px;">download</span>
                        Download
                      </button>
                    </a>
                  </div>
                </div>

                <div class="field">
                  <div class="field-text">
                    <div class="field-label">Install on a phone</div>
                    <div class="field-help">
                      Open this page on the phone, sign in, and tap Download. Android
                      asks you to allow installing from the browser the first time.
                    </div>
                  </div>
                  <div class="field-control">
                    <code style="font-size:12px; opacity:0.8;">${location.origin}/api/apk</code>
                  </div>
                </div>
              `}
      </section>
    `;
  }

  private renderAppearance() {
    return html`
      <section class="card">
        <h3><span class="material-symbols-rounded">palette</span>Appearance</h3>
        <p class="card-sub">Per-device — applies as soon as you pick it.</p>

        <div class="field">
          <div class="field-text">
            <div class="field-label">Theme</div>
            <div class="field-help">"System" follows your OS light/dark setting.</div>
          </div>
          <div class="field-control seg">
            ${(
              [
                ["dark", "Dark", "dark_mode"],
                ["light", "Light", "light_mode"],
                ["system", "System", "contrast"],
              ] as [ThemePref, string, string][]
            ).map(
              ([id, label, icon]) => html`<button
                class=${this.theme === id ? "on" : ""}
                @click=${() => this.pickTheme(id)}
              >
                <span class="material-symbols-rounded" style="font-size:18px;">${icon}</span>${label}
              </button>`,
            )}
          </div>
        </div>

        <div class="field">
          <div class="field-text">
            <div class="field-label">Comic page size</div>
            <div class="field-help">
              How pages are sized in the reader. Fit page shows the whole page; fit width fills the
              column and scrolls.
            </div>
          </div>
          <div class="field-control seg">
            ${(
              [
                ["page", "Fit page", "fit_screen"],
                ["width", "Fit width", "fit_width"],
              ] as [ComicFit, string, string][]
            ).map(
              ([id, label, icon]) => html`<button
                class=${this.fit === id ? "on" : ""}
                @click=${() => this.pickFit(id)}
              >
                <span class="material-symbols-rounded" style="font-size:18px;">${icon}</span>${label}
              </button>`,
            )}
          </div>
        </div>
      </section>
    `;
  }

  private renderAI() {
    const s = this.settings;
    const info = this.info;
    return html`
      <section class="card" style="animation-delay:60ms;">
        <h3><span class="material-symbols-rounded">auto_awesome</span>AI auto-tagging</h3>
        <p class="card-sub">
          Tagging runs entirely on this box — no image ever leaves it. The heuristic tagger needs no
          model; a real classifier requires an ONNX build with a model in the model directory.
        </p>

        ${!s
          ? html`<div class="field-help">Loading…</div>`
          : html`
              ${this.switchField(
                "Enable auto-tagging",
                "Master switch. Off means no tagging at all, including the ✨ button.",
                s.aiEnabled,
                (v) => this.edit({ aiEnabled: v }),
              )}
              ${this.switchField(
                "Tag on import",
                "Tag new uploads and imports automatically. With this off, tagging only happens when you ask for it.",
                s.aiAutoTag,
                (v) => this.edit({ aiAutoTag: v }),
                !s.aiEnabled,
              )}

              <div class="field">
                <div class="field-text">
                  <div class="field-label">Minimum confidence</div>
                  <div class="field-help">Suggestions the tagger is less sure of than this are dropped.</div>
                </div>
                <div class="field-control">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    .value=${String(s.aiMinScore)}
                    ?disabled=${!this.canEdit || !s.aiEnabled}
                    @input=${(e: Event) =>
                      this.edit({ aiMinScore: Number((e.target as HTMLInputElement).value) })}
                  />
                  <span class="value">${s.aiMinScore.toFixed(2)}</span>
                </div>
              </div>

              <div class="field">
                <div class="field-text">
                  <div class="field-label">Maximum tags per item</div>
                  <div class="field-help">Only the highest-scoring suggestions are kept (1–100).</div>
                </div>
                <div class="field-control">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    .value=${String(s.aiMaxTags)}
                    ?disabled=${!this.canEdit || !s.aiEnabled}
                    @change=${(e: Event) =>
                      this.edit({ aiMaxTags: Number((e.target as HTMLInputElement).value) })}
                  />
                </div>
              </div>

              ${info
                ? html`
                    ${this.readOnlyField("Active tagger", "Chosen at startup.", info.aiTagger)}
                    ${this.readOnlyField(
                      "Inference device",
                      "OPPAI_AI_DEVICE — needs a restart to change.",
                      info.aiDevice,
                    )}
                    ${this.readOnlyField(
                      "Model directory",
                      "OPPAI_AI_MODEL_DIR — needs a restart to change.",
                      info.aiModelDir,
                    )}
                  `
                : nothing}
            `}
      </section>
    `;
  }

  private renderScraping() {
    const s = this.settings;
    return html`
      <section class="card" style="animation-delay:120ms;">
        <h3><span class="material-symbols-rounded">travel_explore</span>Import &amp; scraping</h3>
        <p class="card-sub">How OppaiLib behaves toward the sites you import from.</p>

        ${!s
          ? html`<div class="field-help">Loading…</div>`
          : html`
              ${this.switchField(
                "Respect robots.txt",
                "Skip URLs a site asks crawlers not to fetch.",
                s.scrapeRespectRobots,
                (v) => this.edit({ scrapeRespectRobots: v }),
              )}

              <div class="field">
                <div class="field-text">
                  <div class="field-label">Delay between requests</div>
                  <div class="field-help">
                    Minimum gap between two requests to the same host, in milliseconds (250–60000).
                  </div>
                </div>
                <div class="field-control">
                  <input
                    type="number"
                    min="250"
                    max="60000"
                    step="250"
                    .value=${String(s.scrapeDelayMs)}
                    ?disabled=${!this.canEdit}
                    @change=${(e: Event) =>
                      this.edit({ scrapeDelayMs: Number((e.target as HTMLInputElement).value) })}
                  />
                  <span class="value">ms</span>
                </div>
              </div>

              <div class="field stack">
                <div class="field-text">
                  <div class="field-label">User agent</div>
                  <div class="field-help">
                    Sent with every scrape. The default impersonates a browser because many sites only
                    serve metadata to one; clear it back to that default by leaving it blank.
                  </div>
                </div>
                <div class="field-control">
                  <input
                    type="text"
                    .value=${s.scrapeUserAgent}
                    ?disabled=${!this.canEdit}
                    @change=${(e: Event) =>
                      this.edit({ scrapeUserAgent: (e.target as HTMLInputElement).value })}
                  />
                </div>
              </div>

              <div class="field stack">
                <div class="field-text">
                  <div class="field-label">F95zone login</div>
                  <div class="field-help">
                    Most f95zone.to game threads are members-only. Sign in with your F95 account and
                    OppaiLib can fetch those when you scrape a thread URL. Leave blank to scrape only
                    public threads. Stored on your server; the password is never sent back to this page.
                  </div>
                </div>
                <div class="field-control">
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="F95 username"
                    .value=${s.f95Username}
                    ?disabled=${!this.canEdit}
                    @change=${(e: Event) =>
                      this.edit({ f95Username: (e.target as HTMLInputElement).value })}
                  />
                </div>
                <div class="field-control">
                  <input
                    type="password"
                    autocomplete="new-password"
                    placeholder=${s.f95PasswordSet ? "•••••••• (unchanged)" : "F95 password"}
                    ?disabled=${!this.canEdit}
                    @change=${(e: Event) =>
                      this.edit({ f95Password: (e.target as HTMLInputElement).value })}
                  />
                </div>
              </div>

              <div class="field stack">
                <div class="field-text">
                  <div class="field-label">Image generation</div>
                  <div class="field-help">
                    URL of a local Automatic1111 / SD.Next server on your network (the one that
                    exposes <code>/sdapi/v1</code>), e.g. <code>http://192.168.1.10:7860</code>.
                    Set it to turn on the <strong>Create</strong> tab; leave blank to keep it off.
                    Prompts stay on your own hardware — nothing is sent to a cloud service.
                  </div>
                </div>
                <div class="field-control">
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="http://host:7860"
                    .value=${s.imageGenUrl}
                    ?disabled=${!this.canEdit}
                    @change=${(e: Event) =>
                      this.edit({ imageGenUrl: (e.target as HTMLInputElement).value })}
                  />
                </div>
              </div>

              <div class="field stack">
                <div class="field-text">
                  <div class="field-label">Libby chat</div>
                  <div class="field-help">
                    OpenAI-compatible base URL and model for your local LLM, such as LM Studio,
                    llama.cpp, or Ollama's <code>/v1</code> bridge. OppaiLib appends
                    <code>/v1/chat/completions</code>. Both values are required to enable Chat.
                  </div>
                </div>
                <div class="field-control">
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="http://host:1234"
                    .value=${s.chatUrl}
                    ?disabled=${!this.canEdit}
                    @change=${(e: Event) => this.edit({ chatUrl: (e.target as HTMLInputElement).value })}
                  />
                </div>
                <div class="field-control">
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="Local model name"
                    .value=${s.chatModel}
                    ?disabled=${!this.canEdit}
                    @change=${(e: Event) => this.edit({ chatModel: (e.target as HTMLInputElement).value })}
                  />
                </div>
              </div>
            `}
      </section>
    `;
  }

  private renderLibrary() {
    const st = this.stats;
    if (!st) return nothing;
    const byKind = new Map(st.kinds.map((k) => [k.kind, k] as const));
    return html`
      <section class="card" style="animation-delay:180ms;">
        <h3><span class="material-symbols-rounded">inventory_2</span>Library</h3>
        <p class="card-sub">
          ${st.items} ${st.items === 1 ? "item" : "items"} · ${formatBytes(st.bytes)} stored ·
          ${st.tags} ${st.tags === 1 ? "tag" : "tags"}
        </p>
        <div class="stat-grid">
          ${(Object.keys(KIND_META) as Kind[]).map((k) => {
            const row = byKind.get(k);
            return html`<div class="stat">
              <div class="stat-num">${row?.count ?? 0}</div>
              <div class="stat-label">${KIND_META[k].label} · ${formatBytes(row?.bytes ?? 0)}</div>
            </div>`;
          })}
        </div>
      </section>
    `;
  }

  private renderAccount() {
    return html`
      <section class="card" style="animation-delay:240ms;">
        <h3><span class="material-symbols-rounded">account_circle</span>Account</h3>
        <p class="card-sub">
          Signed in as <strong>${this.user?.username}</strong>${this.user?.isAdmin ? " (admin)" : ""}.
        </p>

        ${this.pwErr
          ? html`<div class="banner error">
              <span class="material-symbols-rounded" style="font-size:18px;">error</span>${this.pwErr}
            </div>`
          : nothing}
        ${this.pwMsg
          ? html`<div class="banner ok">
              <span class="material-symbols-rounded" style="font-size:18px;">check_circle</span>${this.pwMsg}
            </div>`
          : nothing}

        <div class="pw">
          <input
            type="password"
            placeholder="Current password"
            autocomplete="current-password"
            .value=${this.pwCurrent}
            @input=${(e: Event) => (this.pwCurrent = (e.target as HTMLInputElement).value)}
          />
          <input
            type="password"
            placeholder="New password (8+ characters)"
            autocomplete="new-password"
            .value=${this.pwNew}
            @input=${(e: Event) => (this.pwNew = (e.target as HTMLInputElement).value)}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            autocomplete="new-password"
            .value=${this.pwConfirm}
            @input=${(e: Event) => (this.pwConfirm = (e.target as HTMLInputElement).value)}
          />
          <div>
            <button
              class="btn-primary"
              ?disabled=${this.pwBusy || !this.pwCurrent || !this.pwNew}
              @click=${this.changePassword}
            >
              <span class="material-symbols-rounded" style="font-size:20px;">key</span>
              ${this.pwBusy ? "Changing…" : "Change password"}
            </button>
          </div>
        </div>
      </section>
    `;
  }

  private renderAbout() {
    const i = this.info;
    if (!i) return nothing;
    return html`
      <section class="card" style="animation-delay:300ms;">
        <h3><span class="material-symbols-rounded">info</span>About this server</h3>
        <p class="card-sub">Set by environment variables; changing them needs a restart.</p>
        ${this.readOnlyField("Version", "The running build.", i.version)}
        ${this.readOnlyField(
          "Video thumbnails",
          "Posters need ffmpeg on the server's PATH.",
          i.ffmpeg ? "ffmpeg available" : "ffmpeg missing — posters disabled",
        )}
        ${this.readOnlyField("Media directory", "Where encrypted blobs live.", i.mediaDir)}
        ${this.readOnlyField("Database", "SQLite metadata store.", i.dbPath)}
        ${this.readOnlyField("Session length", "How long a login stays valid.", `${i.sessionHours} hours`)}
      </section>
    `;
  }

  // --- Field builders -----------------------------------------------------
  private switchField(
    label: string,
    help: string,
    value: boolean,
    onChange: (v: boolean) => void,
    forceDisabled = false,
  ) {
    const disabled = !this.canEdit || forceDisabled;
    return html`
      <div class="field">
        <div class="field-text">
          <div class="field-label">${label}</div>
          <div class="field-help">${help}</div>
        </div>
        <div class="field-control">
          <button
            class="switch ${value ? "on" : ""}"
            role="switch"
            aria-checked=${value ? "true" : "false"}
            aria-label=${label}
            ?disabled=${disabled}
            @click=${() => onChange(!value)}
          ></button>
        </div>
      </div>
    `;
  }

  private readOnlyField(label: string, help: string, value: string) {
    return html`
      <div class="field">
        <div class="field-text">
          <div class="field-label">${label}</div>
          <div class="field-help">${help}</div>
        </div>
        <div class="field-control"><span class="ro">${value}</span></div>
      </div>
    `;
  }
}

function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let n = bytes;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n < 10 && i > 0 ? n.toFixed(1) : Math.round(n)} ${units[i]}`;
}

declare global {
  interface HTMLElementTagNameMap {
    "oppai-settings": OppaiSettings;
  }
}
