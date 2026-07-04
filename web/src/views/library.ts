import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { api, type Media, type User } from "../api.js";
import { iconStyles } from "../theme.js";
import {
  KIND_META,
  KIND_ORDER,
  type Kind,
  swatchFor,
  hasThumbnail,
  statFor,
  primaryTag,
  loadFavorites,
  saveFavorites,
} from "../media-meta.js";
import "./viewer.js";
import "./scrape-dialog.js";

type Section = "home" | "favorites" | Kind;

interface NavSection {
  id: Section;
  label: string;
  icon: string;
}

const NAV_SECTIONS: NavSection[] = [
  { id: "home", label: "Home", icon: "home" },
  ...KIND_ORDER.map((k) => ({ id: k, label: KIND_META[k].label, icon: KIND_META[k].icon })),
  { id: "favorites", label: "Favorites", icon: "favorite" },
];

// Main application shell for the OppaiLib Media Server UI: a nav rail, top app
// bar with search, and a content area that routes between the home dashboard,
// category/favorites/search grids, and the single-item viewer.
@customElement("oppai-library")
export class OppaiLibrary extends LitElement {
  @property({ attribute: false }) user!: User;

  @state() private items: Media[] = [];
  @state() private loading = false;
  @state() private section: Section = "home";
  @state() private selectedId: number | null = null;
  @state() private search = "";
  @state() private filters: Record<string, string> = {};
  @state() private favorites = loadFavorites();
  @state() private uploadOpen = false;
  @state() private dragActive = false;
  @state() private theme: "dark" | "light" = "dark";

  static styles = [
    iconStyles,
    css`
      :host {
        display: flex;
        width: 100vw;
        height: 100vh;
        background: #0f130e;
        color: #e1e4dc;
        overflow: hidden;
        position: relative;
        font-family: "Roboto", system-ui, sans-serif;
      }
      button {
        font-family: inherit;
      }
      input::placeholder {
        color: #939c8e;
      }

      /* Nav rail */
      nav {
        width: 96px;
        flex-shrink: 0;
        height: 100%;
        background: #161a15;
        border-right: 1px solid #262b24;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0 16px;
        gap: 20px;
      }
      .add-btn {
        width: 56px;
        height: 56px;
        border-radius: 16px;
        background: #0b5a2c;
        border: none;
        color: #92f8ac;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        transition: filter 0.12s ease;
      }
      .add-btn:hover {
        filter: brightness(1.15);
      }
      .nav-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
        align-items: center;
      }
      .nav-item {
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 0;
        width: 64px;
      }
      .nav-pill {
        width: 56px;
        height: 32px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.12s ease;
      }
      .nav-item:hover .nav-pill {
        background: #21271f;
      }
      .nav-label {
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.2px;
      }
      .icon-btn {
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      /* Layout */
      .main-col {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      header {
        height: 72px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 0 28px;
        border-bottom: 1px solid #1e221c;
      }
      .h-title {
        font-size: 20px;
        font-weight: 500;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 280px;
        flex-shrink: 0;
      }
      .searchbox {
        flex: 1;
        max-width: 520px;
        height: 44px;
        background: #262b24;
        border-radius: 22px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 16px;
      }
      .searchbox input {
        flex: 1;
        background: none;
        border: none;
        outline: none;
        color: #e1e4dc;
        font-size: 14px;
      }
      .filters-btn {
        background: none;
        border: 1px solid #42483f;
        border-radius: 20px;
        height: 40px;
        padding: 0 14px;
        display: flex;
        align-items: center;
        gap: 6px;
        color: #c2c9bd;
        cursor: pointer;
        flex-shrink: 0;
      }
      main {
        flex: 1;
        overflow-y: auto;
        padding: 28px 32px 60px;
      }

      /* Home */
      .greeting {
        font-size: 28px;
        font-weight: 400;
        margin: 0 0 4px;
      }
      .greeting-sub {
        font-size: 14px;
        color: #c2c9bd;
        margin: 0 0 32px;
      }
      .row {
        margin-bottom: 36px;
      }
      .row-head {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 14px;
      }
      .row-title {
        font-size: 18px;
        font-weight: 500;
        margin: 0;
        flex: 1;
      }
      .see-all {
        background: none;
        border: none;
        color: #92f8ac;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 2px;
      }
      .row-scroll {
        display: flex;
        gap: 16px;
        overflow-x: auto;
        padding-bottom: 8px;
      }

      /* Grid */
      .grid-head {
        display: flex;
        align-items: baseline;
        gap: 12px;
        margin-bottom: 6px;
      }
      .grid-title {
        font-size: 26px;
        font-weight: 400;
        margin: 0;
      }
      .grid-count {
        font-size: 13px;
        color: #8c9388;
      }
      .chips {
        display: flex;
        gap: 8px;
        margin: 18px 0 24px;
        flex-wrap: wrap;
      }
      .chip {
        height: 36px;
        padding: 0 16px;
        border-radius: 18px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 22px;
      }
      .empty {
        text-align: center;
        padding: 80px 0;
        color: #8c9388;
      }

      /* Tiles */
      .tile {
        cursor: pointer;
      }
      .tile-media {
        position: relative;
        border-radius: 16px;
        overflow: hidden;
        transition: transform 0.12s ease;
      }
      .tile:hover .tile-media {
        transform: translateY(-2px);
      }
      .tile-media img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .tile-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 6px;
        opacity: 0.55;
      }
      .type-label {
        font: 600 10px ui-monospace, monospace;
        color: #fff;
        letter-spacing: 1px;
      }
      .fav-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 32px;
        height: 32px;
        border-radius: 16px;
        background: rgba(0, 0, 0, 0.4);
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .tile-stat {
        position: absolute;
        bottom: 6px;
        right: 8px;
        font-size: 11px;
        font-weight: 600;
        color: #fff;
        background: rgba(0, 0, 0, 0.5);
        padding: 2px 6px;
        border-radius: 6px;
      }
      .tile-meta {
        padding: 10px 2px 0;
      }
      .tile-title {
        font-size: 13px;
        font-weight: 500;
        color: #e1e4dc;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tile-tag {
        font-size: 12px;
        color: #8c9388;
        margin-top: 2px;
      }

      /* Upload dialog */
      .scrim {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 20;
      }
      .dialog {
        width: 480px;
        max-width: calc(100vw - 32px);
        background: #262b24;
        border-radius: 28px;
        padding: 28px;
      }
      .dialog h2 {
        font-size: 20px;
        font-weight: 500;
        margin: 0 0 20px;
      }
      .dropzone {
        border: 1.5px dashed #6c756a;
        border-radius: 16px;
        padding: 40px 20px;
        text-align: center;
        color: #c2c9bd;
        cursor: pointer;
        transition: border-color 0.12s ease, background 0.12s ease;
      }
      .dropzone.drag {
        border-color: #74db94;
        background: rgba(116, 219, 148, 0.08);
      }
      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 24px;
      }
      .btn-text {
        height: 40px;
        padding: 0 20px;
        border-radius: 20px;
        background: none;
        border: none;
        color: #92f8ac;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .btn-filled {
        height: 40px;
        padding: 0 20px;
        border-radius: 20px;
        background: #74db94;
        border: none;
        color: #00391a;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .link-btn {
        display: block;
        margin: 14px auto 0;
        background: none;
        border: none;
        color: #92f8ac;
        font-size: 13px;
        cursor: pointer;
      }
      input[type="file"] {
        display: none;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.refresh();
  }

  private async refresh() {
    this.loading = true;
    try {
      // No search/favorite endpoints server-side; fetch the library once and
      // filter client-side, matching the design's model.
      const res = await api.listMedia("", 500, 0);
      this.items = res.items ?? [];
    } finally {
      this.loading = false;
    }
  }

  // --- Navigation / state -------------------------------------------------
  private selectSection(id: Section) {
    this.section = id;
    this.selectedId = null;
    this.search = "";
  }
  private openItem(id: number) {
    this.selectedId = id;
  }
  private closeItem = () => {
    this.selectedId = null;
  };
  private onSearchInput(e: Event) {
    this.search = (e.target as HTMLInputElement).value;
    this.selectedId = null;
  }
  private clearSearch() {
    this.search = "";
  }
  private setFilter(section: string, tag: string) {
    this.filters = { ...this.filters, [section]: tag };
  }
  private toggleFavorite(id: number, e?: Event) {
    e?.stopPropagation();
    const next = new Set(this.favorites);
    next.has(id) ? next.delete(id) : next.add(id);
    this.favorites = next;
    saveFavorites(next);
  }
  private toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = this.theme === "light" ? "light" : "";
  }
  private logout() {
    this.dispatchEvent(new CustomEvent("logout", { bubbles: true, composed: true }));
  }

  // --- Upload -------------------------------------------------------------
  private toggleUpload = () => {
    this.uploadOpen = !this.uploadOpen;
    this.dragActive = false;
  };
  private browse() {
    (this.renderRoot.querySelector("#file") as HTMLInputElement)?.click();
  }
  private async onFiles(files: FileList | File[]) {
    const list = Array.from(files);
    if (!list.length) return;
    this.uploadOpen = false;
    for (const f of list) {
      try {
        await api.upload(f);
      } catch (err) {
        console.error("upload", err);
      }
    }
    this.refresh();
  }
  private onFileInput(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) this.onFiles(input.files);
    input.value = "";
  }
  private onDrop(e: DragEvent) {
    e.preventDefault();
    this.dragActive = false;
    if (e.dataTransfer?.files?.length) this.onFiles(e.dataTransfer.files);
  }
  private openScrape() {
    this.uploadOpen = false;
    (this.renderRoot.querySelector("oppai-scrape-dialog") as any)?.open();
  }

  // --- Derived view state -------------------------------------------------
  private itemsForKind(kind: Kind): Media[] {
    return this.items.filter((m) => m.kind === kind);
  }

  render() {
    const hasSearch = this.search.trim().length > 0;
    const isViewer = this.selectedId != null;
    const isFavorites = !isViewer && this.section === "favorites" && !hasSearch;
    const isHome = !isViewer && this.section === "home" && !hasSearch && !isFavorites;
    const isSearch = !isViewer && hasSearch;
    const isGrid = !isViewer && !isHome && !isFavorites && !isSearch;

    const activeItem = isViewer ? this.items.find((m) => m.id === this.selectedId) ?? null : null;

    let headerTitle = "Library";
    if (isViewer) headerTitle = activeItem ? activeItem.title : "Library";
    else if (isSearch) headerTitle = "Search results";
    else if (isFavorites) headerTitle = "Favorites";
    else if (isHome) headerTitle = "Library";
    else headerTitle = KIND_META[this.section as Kind]?.label ?? "Library";

    return html`
      ${this.renderNav()}
      <div class="main-col">
        ${this.renderHeader(headerTitle, hasSearch, isViewer)}
        <main>
          ${isHome ? this.renderHome() : nothing}
          ${isGrid || isFavorites || isSearch
            ? this.renderGrid(isGrid, isFavorites, isSearch)
            : nothing}
          ${isViewer && activeItem
            ? html`<oppai-viewer
                .media=${activeItem}
                .favorite=${this.favorites.has(activeItem.id)}
                @toggle-favorite=${() => this.toggleFavorite(activeItem.id)}
                @changed=${() => this.refresh()}
              ></oppai-viewer>`
            : nothing}
          ${isViewer && !activeItem
            ? html`<div class="empty">Item not found.</div>`
            : nothing}
        </main>
      </div>
      ${this.renderUpload()}
      <oppai-scrape-dialog @imported=${() => this.refresh()}></oppai-scrape-dialog>
      <input id="file" type="file" multiple @change=${this.onFileInput} />
    `;
  }

  private renderNav() {
    const initials = (this.user?.username ?? "?").slice(0, 2).toUpperCase();
    return html`
      <nav>
        <button class="add-btn" title="Add media" @click=${this.toggleUpload}>
          <span class="material-symbols-rounded" style="font-size:26px;">add</span>
        </button>

        <div class="nav-list">
          ${NAV_SECTIONS.map((n) => {
            const active = this.section === n.id && this.selectedId == null;
            return html`
              <button class="nav-item" @click=${() => this.selectSection(n.id)}>
                <span
                  class="nav-pill"
                  style="background:${active ? "#0b5a2c" : "transparent"};"
                >
                  <span
                    class="material-symbols-rounded ${active ? "fill-icon" : ""}"
                    style="font-size:22px; color:${active ? "#92f8ac" : "#c2c9bd"};"
                    >${n.icon}</span
                  >
                </span>
                <span class="nav-label" style="color:${active ? "#e1e4dc" : "#8c9388"};"
                  >${n.label}</span
                >
              </button>
            `;
          })}
        </div>

        <div style="flex:1;"></div>

        <button
          class="icon-btn"
          title="Toggle theme"
          @click=${this.toggleTheme}
          style="width:48px; height:48px; border-radius:24px; background:#262b24; color:#c2c9bd;"
        >
          <span class="material-symbols-rounded" style="font-size:22px;">settings</span>
        </button>
        <button
          class="icon-btn"
          title="Sign out (${this.user?.username})"
          @click=${this.logout}
          style="width:40px; height:40px; border-radius:20px; background:#354b38; color:#d0e8d1; font-size:13px; font-weight:600;"
        >
          ${initials}
        </button>
      </nav>
    `;
  }

  private renderHeader(title: string, hasSearch: boolean, isViewer: boolean) {
    return html`
      <header>
        ${isViewer
          ? html`<button
              class="icon-btn"
              title="Back"
              @click=${this.closeItem}
              style="width:40px; height:40px; border-radius:20px; background:none; color:#e1e4dc; flex-shrink:0;"
            >
              <span class="material-symbols-rounded" style="font-size:24px;">arrow_back</span>
            </button>`
          : nothing}

        <h1 class="h-title">${title}</h1>

        <div class="searchbox">
          <span class="material-symbols-rounded" style="font-size:20px; color:#c2c9bd;">search</span>
          <input
            .value=${this.search}
            @input=${this.onSearchInput}
            placeholder="Search photos, videos, games, comics..."
          />
          ${hasSearch
            ? html`<button
                class="icon-btn"
                @click=${this.clearSearch}
                style="background:none; color:#c2c9bd;"
              >
                <span class="material-symbols-rounded" style="font-size:18px;">close</span>
              </button>`
            : nothing}
        </div>

        <div style="flex:1;"></div>

        <button class="filters-btn">
          <span class="material-symbols-rounded" style="font-size:18px;">tune</span>
          <span style="font-size:13px; font-weight:500;">Filters</span>
        </button>
      </header>
    `;
  }

  private renderHome() {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    const rows = KIND_ORDER.map((k) => ({
      kind: k,
      label: KIND_META[k].label,
      icon: KIND_META[k].icon,
      items: this.itemsForKind(k).slice(0, 12),
    })).filter((r) => r.items.length > 0);

    if (this.loading && this.items.length === 0) {
      return html`<div class="empty">Loading your library…</div>`;
    }
    if (rows.length === 0) {
      return html`<div>
        <h2 class="greeting">${greeting}</h2>
        <p class="greeting-sub">Your library is empty — add media or import from a URL.</p>
        <div class="empty">
          <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
            >library_add</span
          >
          <div style="font-size:14px;">Nothing here yet.</div>
        </div>
      </div>`;
    }

    return html`
      <div>
        <h2 class="greeting">${greeting}</h2>
        <p class="greeting-sub">Here's what's new across your library</p>
        ${rows.map(
          (row) => html`
            <section class="row">
              <div class="row-head">
                <span class="material-symbols-rounded" style="font-size:22px; color:#92f8ac;"
                  >${row.icon}</span
                >
                <h3 class="row-title">${row.label}</h3>
                <button class="see-all" @click=${() => this.selectSection(row.kind)}>
                  See all
                  <span class="material-symbols-rounded" style="font-size:16px;">chevron_right</span>
                </button>
              </div>
              <div class="row-scroll">
                ${row.items.map((m) => this.renderTile(m, "200px"))}
              </div>
            </section>
          `,
        )}
      </div>
    `;
  }

  private renderGrid(isGrid: boolean, isFavorites: boolean, isSearch: boolean) {
    let title = "";
    let gridItems: Media[] = [];
    let chips: { label: string; active: boolean }[] = [];

    if (isFavorites) {
      title = "Favorites";
      gridItems = this.items.filter((m) => this.favorites.has(m.id));
    } else if (isSearch) {
      title = "Search results";
      const q = this.search.trim().toLowerCase();
      gridItems = this.items.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          (m.tags ?? []).some((t) => t.name.toLowerCase().includes(q)),
      );
    } else {
      const kind = this.section as Kind;
      title = KIND_META[kind]?.label ?? "";
      const all = this.itemsForKind(kind);
      const tagNames = Array.from(new Set(all.flatMap((m) => (m.tags ?? []).map((t) => t.name)))).slice(0, 8);
      const active = this.filters[kind] ?? "All";
      chips = ["All", ...tagNames].map((label) => ({ label, active: active === label }));
      gridItems =
        active === "All" ? all : all.filter((m) => (m.tags ?? []).some((t) => t.name === active));
    }

    const count = `${gridItems.length} ${gridItems.length === 1 ? "item" : "items"}`;

    return html`
      <div>
        <div class="grid-head">
          <h2 class="grid-title">${title}</h2>
          <span class="grid-count">${count}</span>
        </div>

        ${isGrid && chips.length > 1
          ? html`<div class="chips">
              ${chips.map(
                (c) => html`<button
                  class="chip"
                  @click=${() => this.setFilter(this.section, c.label)}
                  style="background:${c.active ? "#354b38" : "transparent"}; color:${c.active
                    ? "#d0e8d1"
                    : "#c2c9bd"}; border:1px solid ${c.active ? "#354b38" : "#42483f"};"
                >
                  ${c.active
                    ? html`<span class="material-symbols-rounded" style="font-size:16px;">check</span>`
                    : nothing}
                  ${c.label}
                </button>`,
              )}
            </div>`
          : html`<div style="height:24px;"></div>`}

        ${gridItems.length === 0
          ? html`<div class="empty">
              <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
                >${isFavorites ? "favorite_border" : "search_off"}</span
              >
              <div style="font-size:14px;">
                ${isFavorites
                  ? "No favorites yet. Tap the heart on any item."
                  : "No items match your search or filter."}
              </div>
            </div>`
          : html`<div class="grid">${gridItems.map((m) => this.renderTile(m, "100%"))}</div>`}
      </div>
    `;
  }

  private renderTile(m: Media, width: string) {
    const meta = KIND_META[m.kind];
    const fav = this.favorites.has(m.id);
    const stat = statFor(m);
    return html`
      <div
        class="tile"
        @click=${() => this.openItem(m.id)}
        style="flex-shrink:0; width:${width};"
      >
        <div
          class="tile-media"
          style="width:100%; aspect-ratio:${meta.aspect}; background:${swatchFor(m)};"
        >
          ${hasThumbnail(m)
            ? html`<img loading="lazy" src=${api.streamURL(m.id)} alt=${m.title} />`
            : html`<div class="tile-overlay">
                <span class="material-symbols-rounded" style="font-size:30px; color:#fff;"
                  >${meta.icon}</span
                >
                <span class="type-label">${meta.typeLabel}</span>
              </div>`}
          <button class="fav-btn" @click=${(e: Event) => this.toggleFavorite(m.id, e)}>
            <span
              class="material-symbols-rounded fill-icon"
              style="font-size:18px; color:${fav ? "#ffb4ab" : "rgba(255,255,255,0.9)"};"
              >${fav ? "favorite" : "favorite_border"}</span
            >
          </button>
          ${stat ? html`<span class="tile-stat">${stat}</span>` : nothing}
        </div>
        <div class="tile-meta">
          <div class="tile-title">${m.title}</div>
          <div class="tile-tag">${primaryTag(m)}</div>
        </div>
      </div>
    `;
  }

  private renderUpload() {
    if (!this.uploadOpen) return nothing;
    return html`
      <div class="scrim" @click=${this.toggleUpload}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <h2>Upload media</h2>
          <div
            class="dropzone ${this.dragActive ? "drag" : ""}"
            @click=${this.browse}
            @dragover=${(e: DragEvent) => {
              e.preventDefault();
              this.dragActive = true;
            }}
            @dragleave=${() => (this.dragActive = false)}
            @drop=${this.onDrop}
          >
            <span class="material-symbols-rounded" style="font-size:36px; display:block; margin-bottom:10px;"
              >upload_file</span
            >
            <div style="font-size:14px;">Drag files here, or click to browse</div>
            <div style="font-size:12px; color:#8c9388; margin-top:4px;">
              Photos, GIFs, videos, games, comics
            </div>
          </div>
          <button class="link-btn" @click=${this.openScrape}>or import from a URL</button>
          <div class="dialog-actions">
            <button class="btn-text" @click=${this.toggleUpload}>Cancel</button>
            <button class="btn-filled" @click=${this.browse}>Choose files</button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "oppai-library": OppaiLibrary;
  }
}
