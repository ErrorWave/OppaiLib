import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { api, mascotSay, type ChatCharacter, type Media, type User } from "../api.js";
import { canShare, shareWithCharacter } from "../chat-share.js";
import { libbyReact } from "../libby-voice.js";
import { iconStyles, motionStyles, loadTheme, saveTheme, applyTheme } from "../theme.js";
import { logoSVG } from "../logo.js";
import { dismissDownload, downloadTasks, type DownloadTask } from "../downloads.js";
import { menuDivider, nativeMenuWanted, openMenu, type MenuItem } from "../context-menu.js";
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
  isTypingTarget,
} from "../media-meta.js";
import "../context-menu.js";
import "./viewer.js";
import "./scrape-dialog.js";
import "./settings.js";
import "./browse.js";
import "./imagegen.js";
import "./chat.js";

type Section = "home" | "favorites" | "browse" | "imagegen" | "chat" | "settings" | Kind;

interface NavSection {
  id: Section;
  label: string;
  icon: string;
}

const NAV_SECTIONS: NavSection[] = [
  { id: "home", label: "Home", icon: "home" },
  ...KIND_ORDER.map((k) => ({ id: k, label: KIND_META[k].label, icon: KIND_META[k].icon })),
  { id: "favorites", label: "Favorites", icon: "favorite" },
  // Remote catalogues. Not part of the library — nothing here is imported until the
  // user saves it — but it's how things get *into* the library, so it sits with them.
  { id: "browse", label: "Browse", icon: "explore" },
  // Image generation. Like Browse, nothing is in the library until saved; it's another
  // way things get *into* it, so it sits alongside.
  { id: "imagegen", label: "Create", icon: "auto_awesome" },
  { id: "chat", label: "Chat", icon: "chat_bubble" },
];

// Everything about an item a search query can match: its title, its notes, and
// its tags — both the tag name and its category, so "character" or "rating"
// surfaces everything the AI classified that way.
function searchHaystack(m: Media): string {
  const tags = (m.tags ?? []).flatMap((t) => [t.name, t.category]);
  return [m.title, m.notes ?? "", ...tags].join("\n").toLowerCase();
}

// Terms are ANDed, so "blue hair explicit" narrows across fields — a tag from
// one, a rating from another — rather than requiring one field to hold them all.
function matchesSearch(m: Media, terms: string[]): boolean {
  if (terms.length === 0) return true;
  const hay = searchHaystack(m);
  return terms.every((t) => hay.includes(t));
}

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
  @state() private selectMode = false;
  @state() private selected = new Set<number>();
  @state() private busy = false;
  @state() private downloads: DownloadTask[] = downloadTasks();

  static styles = [
    iconStyles,
    motionStyles,
    css`
      :host {
        display: flex;
        width: 100vw;
        height: 100vh;
        background: var(--oppai-bg);
        color: var(--oppai-text);
        overflow: hidden;
        position: relative;
        font-family: "Roboto", system-ui, sans-serif;
      }
      button {
        font-family: inherit;
      }
      input::placeholder {
        color: var(--oppai-text-muted);
      }

      /* Nav rail */
      nav {
        width: 96px;
        flex-shrink: 0;
        height: 100%;
        background: var(--oppai-nav);
        border-right: 1px solid var(--oppai-surface-2);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0 16px;
        gap: 20px;
      }
      /* The mark, inlined so it takes currentColor and follows the theme. */
      .logo {
        width: 44px;
        height: 44px;
        padding: 0;
        border: none;
        background: none;
        cursor: pointer;
        color: var(--oppai-primary);
        transition: transform 0.22s var(--oppai-ease-spring), color 0.2s ease;
      }
      .logo:hover {
        transform: scale(1.08);
        color: var(--oppai-primary-bright);
      }
      .logo svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      .add-btn {
        width: 56px;
        height: 56px;
        border-radius: 16px;
        background: var(--oppai-primary-container);
        border: none;
        color: var(--oppai-primary-bright);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        transition: transform 0.2s var(--oppai-ease-spring), filter 0.15s ease,
          box-shadow 0.2s ease;
      }
      .add-btn:hover {
        filter: brightness(1.1);
        transform: translateY(-2px) rotate(90deg);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.45);
      }
      .add-btn:active {
        transform: scale(0.94) rotate(90deg);
      }
      .add-btn span {
        transition: transform 0.2s var(--oppai-ease-spring);
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
        transition: background 0.22s var(--oppai-ease-emphasized),
          transform 0.22s var(--oppai-ease-spring);
      }
      .nav-item:hover .nav-pill {
        background: var(--oppai-nav-hover);
      }
      .nav-item:active .nav-pill {
        transform: scale(0.9);
      }
      .nav-pill span {
        transition: color 0.2s ease;
      }
      .nav-label {
        transition: color 0.2s ease;
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
        border-bottom: 1px solid var(--oppai-border);
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
        background: var(--oppai-surface-2);
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
        color: var(--oppai-text);
        font-size: 14px;
      }
      .filters-btn {
        background: none;
        border: 1px solid var(--oppai-border-strong);
        border-radius: 20px;
        height: 40px;
        padding: 0 14px;
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--oppai-text-dim);
        cursor: pointer;
        flex-shrink: 0;
      }
      main {
        flex: 1;
        overflow-y: auto;
        padding: 28px 32px 60px;
      }
      /* Chat is a full-bleed client, not a card inside the library shell: it
         owns its own scrolling regions, so the shell's padding and scrollbar
         would produce a nested-scroller feel and a visible inset frame. */
      main.flush {
        padding: 0;
        overflow: hidden;
        min-height: 0;
      }

      /* Home */
      .greeting {
        font-size: 28px;
        font-weight: 400;
        margin: 0 0 4px;
      }
      .greeting-sub {
        font-size: 14px;
        color: var(--oppai-text-dim);
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
        color: var(--oppai-primary-bright);
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
        color: var(--oppai-text-muted);
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
        color: var(--oppai-text-muted);
      }

      /* Tiles */
      .tile {
        cursor: pointer;
      }
      .tile-media {
        position: relative;
        border-radius: 16px;
        overflow: hidden;
        transition: transform 0.28s var(--oppai-ease-emphasized),
          box-shadow 0.28s var(--oppai-ease-emphasized);
        will-change: transform;
      }
      .tile:hover .tile-media {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
      }
      .tile:active .tile-media {
        transform: translateY(-1px) scale(0.99);
      }
      .tile-media img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s var(--oppai-ease-emphasized);
      }
      .tile:hover .tile-media img {
        transform: scale(1.06);
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
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.2s ease, transform 0.2s var(--oppai-ease-spring),
          background 0.2s ease;
        backdrop-filter: blur(2px);
      }
      .tile:hover .fav-btn,
      .fav-btn.is-fav {
        opacity: 1;
        transform: scale(1);
      }
      .fav-btn:hover {
        background: rgba(0, 0, 0, 0.6);
      }
      .fav-btn:active .material-symbols-rounded {
        animation: oppai-pop 0.35s var(--oppai-ease-spring);
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
        color: var(--oppai-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tile-tag {
        font-size: 12px;
        color: var(--oppai-text-muted);
        margin-top: 2px;
      }

      /* Upload dialog */
      .scrim {
        position: absolute;
        inset: 0;
        background: var(--oppai-scrim);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 20;
        animation: oppai-fade-in 0.2s var(--oppai-ease-standard) both;
      }
      .dialog {
        width: 480px;
        max-width: calc(100vw - 32px);
        background: var(--oppai-surface-2);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
        animation: oppai-scale-in 0.32s var(--oppai-ease-spring) both;
      }
      .dialog h2 {
        font-size: 20px;
        font-weight: 500;
        margin: 0 0 20px;
      }
      .dropzone {
        border: 1.5px dashed var(--oppai-border-strong);
        border-radius: 16px;
        padding: 40px 20px;
        text-align: center;
        color: var(--oppai-text-dim);
        cursor: pointer;
        transition: border-color 0.12s ease, background 0.12s ease;
      }
      .dropzone.drag {
        border-color: var(--oppai-primary);
        background: color-mix(in srgb, var(--oppai-primary) 12%, transparent);
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
        color: var(--oppai-primary-bright);
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .btn-filled {
        height: 40px;
        padding: 0 20px;
        border-radius: 20px;
        background: var(--oppai-primary);
        border: none;
        color: var(--oppai-on-primary);
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .link-btn {
        display: block;
        margin: 14px auto 0;
        background: none;
        border: none;
        color: var(--oppai-primary-bright);
        font-size: 13px;
        cursor: pointer;
      }
      input[type="file"] {
        display: none;
      }

      /* Selection mode */
      .tile.selecting .tile-media {
        transform: none;
      }
      .tile.selected .tile-media {
        outline: 3px solid var(--oppai-primary);
        outline-offset: 2px;
      }
      .select-check {
        position: absolute;
        top: 8px;
        left: 8px;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.5);
        border: 2px solid #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        backdrop-filter: blur(2px);
      }
      .select-check.on {
        background: var(--oppai-primary);
        border-color: var(--oppai-primary);
      }
      .select-check .material-symbols-rounded {
        font-size: 18px;
        color: #fff;
      }
      .bulk-bar {
        position: absolute;
        left: 50%;
        bottom: 24px;
        transform: translateX(-50%);
        z-index: 25;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px 10px 18px;
        border-radius: 28px;
        background: var(--oppai-surface-2);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
        animation: oppai-scale-in 0.28s var(--oppai-ease-spring) both;
      }
      .bulk-count {
        font-size: 14px;
        font-weight: 600;
        margin-right: 6px;
        white-space: nowrap;
      }
      .bulk-btn {
        height: 40px;
        padding: 0 14px;
        border-radius: 20px;
        background: none;
        border: none;
        color: var(--oppai-text);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .bulk-btn:hover {
        background: var(--oppai-surface);
      }
      .bulk-btn.danger {
        color: var(--oppai-error, #f2b8b5);
      }
      .bulk-btn[disabled] {
        opacity: 0.5;
        cursor: default;
      }
      .download-area {
        position: absolute; right: 22px; bottom: 86px; z-index: 24;
        width: min(360px, calc(100vw - 44px)); padding: 12px;
        border: 1px solid var(--oppai-border); border-radius: 18px;
        background: color-mix(in srgb, var(--oppai-surface-2) 94%, transparent);
        box-shadow: 0 14px 44px rgba(0, 0, 0, .48); backdrop-filter: blur(16px);
        animation: oppai-scale-in .24s var(--oppai-ease-spring) both;
      }
      .download-heading { font-size: 12px; font-weight: 700; opacity: .72; padding: 0 4px 7px; }
      .download-row { display: flex; align-items: center; gap: 11px; min-height: 48px; padding: 5px 4px; }
      .download-row + .download-row { border-top: 1px solid var(--oppai-border); }
      .download-ring {
        width: 36px; height: 36px; flex: 0 0 36px; border-radius: 50%;
        display: grid; place-items: center; color: var(--oppai-primary-bright);
        background: conic-gradient(var(--oppai-primary) calc(var(--p) * 1turn), var(--oppai-border) 0);
        transition: background .8s linear; position: relative;
      }
      .download-ring::before { content: ""; position: absolute; inset: 3px; border-radius: 50%; background: var(--oppai-surface-2); }
      .download-ring span { position: relative; z-index: 1; font-size: 19px; }
      .download-copy { min-width: 0; flex: 1; }
      .download-title { font-size: 13px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .download-status { font-size: 11px; opacity: .68; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .download-dismiss { border: 0; background: none; color: inherit; opacity: .66; cursor: pointer; padding: 5px; }
      .header-toggle.on {
        background: var(--oppai-primary-container);
        color: var(--oppai-primary-bright);
        border-color: var(--oppai-primary);
      }
    `,
  ];

  // Ordered ids of the list the viewer was opened from, so arrow keys can page
  // between neighbours (see onKey / stepItem).
  private viewerList: number[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.refresh();
    // The shell's menu is the fallback for the whole app: it catches right-clicks
    // that bubble out of any view, including through a child's shadow root. A view
    // that built its own menu has already called preventDefault, which is how the
    // two stay out of each other's way (see onContextMenu).
    this.addEventListener("contextmenu", this.onContextMenu);
    window.addEventListener("keydown", this.onKey);
    window.addEventListener("oppai-downloads", this.onDownloads as EventListener);
    window.addEventListener("oppai-download-complete", this.onDownloadComplete);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("contextmenu", this.onContextMenu);
    window.removeEventListener("keydown", this.onKey);
    window.removeEventListener("oppai-downloads", this.onDownloads as EventListener);
    window.removeEventListener("oppai-download-complete", this.onDownloadComplete);
  }

  /**
   * The application-wide right-click menu.
   *
   * Three cases, most specific first: a library tile acts on that item, a nav entry
   * jumps to that section, and anything else gets the shell menu. A view that owns
   * its own menu (Chat) has already handled the event, and text fields keep the
   * browser's own menu so Paste stays reachable.
   */
  private onContextMenu = (event: MouseEvent) => {
    if (event.defaultPrevented || nativeMenuWanted(event)) return;
    const path = event.composedPath();
    const at = (selector: string) =>
      path.find((node) => (node as HTMLElement)?.classList?.contains?.(selector)) as HTMLElement | undefined;

    const tileID = Number(at("tile")?.dataset.id);
    const items = Number.isFinite(tileID) && tileID > 0
      ? this.tileMenuItems(tileID, event)
      : this.shellMenuItems();
    if (!items.length) return;
    event.preventDefault();
    openMenu({ x: event.clientX, y: event.clientY, items });
  };

  private tileMenuItems(id: number, event: MouseEvent): MenuItem[] {
    const item = this.items.find((m) => m.id === id);
    if (!item) return [];
    const fav = this.favorites.has(id);
    return [
      { label: "Open", icon: "open_in_full", run: () => this.openItem(id) },
      { label: fav ? "Remove from favorites" : "Add to favorites", icon: fav ? "heart_minus" : "favorite", run: () => this.toggleFavorite(id) },
      { label: this.selectMode ? "Toggle selection" : "Select items", icon: "check_box", run: () => this.selectMode ? this.toggleSelected(id) : this.toggleSelectMode() },
      menuDivider,
      // Disabled rather than hidden when there is nothing showable: the entry not
      // being there reads as "this build can't do it" instead of "not this item".
      { label: "Share with…", icon: "ios_share", disabled: !canShare(item),
        run: () => void this.openShareMenu(item, event.clientX, event.clientY) },
      { label: "Copy title", icon: "content_copy", run: () => void navigator.clipboard.writeText(item.title) },
      { label: "Open the file", icon: "open_in_new", run: () => window.open(api.streamURL(id), "_blank") },
      menuDivider,
      { label: "Delete", icon: "delete", danger: true, run: () => void this.deleteOne(id) },
    ];
  }

  /**
   * Second step of "Share with…": the characters to choose from.
   *
   * The workspace is fetched here rather than kept loaded, so a library session that
   * never shares anything never asks for it. The menu re-opens at the same point the
   * first one did, which reads as the submenu it stands in for.
   */
  private async openShareMenu(item: Media, x: number, y: number) {
    let characters: ChatCharacter[] = [];
    try {
      characters = (await api.chatWorkspace()).characters ?? [];
    } catch (error) {
      mascotSay((error as Error).message || "Couldn't load your chat characters.", "error");
      return;
    }
    if (!characters.length) {
      mascotSay("No chat characters yet — add one in Chat first.", "error");
      return;
    }
    openMenu({
      x, y, title: `Share "${item.title}" with`,
      items: characters.map((character) => ({
        label: character.name, icon: "person",
        run: () => void this.share(item, character),
      })),
    });
  }

  private async share(item: Media, character: ChatCharacter) {
    try {
      await shareWithCharacter(item, character.id);
      // Only switch once the bytes are in hand: landing in Chat and then failing
      // would leave the user in the wrong view with nothing to show for it.
      this.selectSection("chat");
    } catch (error) {
      mascotSay((error as Error).message || `Couldn't share with ${character.name}.`, "error");
    }
  }

  private shellMenuItems(): MenuItem[] {
    const dark = loadTheme() !== "light";
    return [
      { label: "Add media", icon: "add", run: () => this.toggleUpload() },
      { label: "Import from a URL", icon: "link", run: () => this.openScrape() },
      { label: "Refresh library", icon: "refresh", run: () => void this.refresh() },
      menuDivider,
      { label: "Home", icon: "home", run: () => this.selectSection("home") },
      { label: "Favorites", icon: "favorite", run: () => this.selectSection("favorites") },
      { label: "Chat", icon: "chat_bubble", run: () => this.selectSection("chat") },
      { label: "Create", icon: "auto_awesome", run: () => this.selectSection("imagegen") },
      menuDivider,
      { label: dark ? "Switch to light theme" : "Switch to dark theme", icon: dark ? "light_mode" : "dark_mode", run: () => this.flipTheme() },
      { label: "Settings", icon: "settings", run: () => this.selectSection("settings") },
    ];
  }

  private flipTheme() {
    const next = loadTheme() === "light" ? "dark" : "light";
    saveTheme(next);
    applyTheme(next);
  }

  /** Deletes one item, used by the tile menu — the bulk bar handles selections. */
  private async deleteOne(id: number) {
    const item = this.items.find((m) => m.id === id);
    if (!item || !confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    this.busy = true;
    try {
      await api.deleteMedia(id);
      if (this.selectedId === id) this.closeItem();
      await this.refresh();
    } catch (err) {
      mascotSay(`Couldn't delete that: ${(err as Error).message}`, "error");
    } finally {
      this.busy = false;
    }
  }

  private onDownloads = (event: CustomEvent<DownloadTask[]>) => {
    this.downloads = event.detail;
  };

  private onDownloadComplete = () => this.refresh();

  // In the viewer, Left/Right page between items and Escape closes it. Guarded so
  // it never fires while typing in the search box or with the upload dialog open.
  // Comics are the exception: there the arrows turn pages (the viewer owns them),
  // so the shell stands down and only Escape still closes.
  private onKey = (e: KeyboardEvent) => {
    if (this.selectedId == null || this.uploadOpen) return;
    if (isTypingTarget(e)) return;
    const reading = this.items.find((m) => m.id === this.selectedId)?.kind === "comic";
    switch (e.key) {
      case "ArrowRight":
        if (reading) return;
        e.preventDefault();
        this.stepItem(1);
        break;
      case "ArrowLeft":
        if (reading) return;
        e.preventDefault();
        this.stepItem(-1);
        break;
      case "Escape":
        this.closeItem();
        break;
    }
  };

  private stepItem = (dir: number) => {
    if (this.selectedId == null) return;
    const i = this.viewerList.indexOf(this.selectedId);
    if (i < 0) return;
    const j = i + dir;
    if (j < 0 || j >= this.viewerList.length) return;
    this.selectedId = this.viewerList[j];
  };

  private async refresh() {
    this.loading = true;
    try {
      // Search/favorites are client-side, so the web client needs the whole library.
      // The API caps a page at 200; asking for 500 fell back to its 50-item default,
      // which made older images disappear from the desktop UI.
      const pageSize = 200;
      const all: Media[] = [];
      for (let offset = 0; ; offset += pageSize) {
        const res = await api.listMedia("", pageSize, offset);
        const page = res.items ?? [];
        all.push(...page);
        if (page.length < pageSize) break;
      }
      this.items = all;
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
  private openItem(id: number, list?: Media[]) {
    if (list && list.length) this.viewerList = list.map((m) => m.id);
    else if (!this.viewerList.includes(id)) this.viewerList = [id];
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

  // --- Bulk selection -----------------------------------------------------
  private toggleSelectMode = () => {
    this.selectMode = !this.selectMode;
    if (!this.selectMode) this.selected = new Set();
  };
  private exitSelect() {
    this.selectMode = false;
    this.selected = new Set();
  }
  private toggleSelected(id: number, e?: Event) {
    e?.stopPropagation();
    const next = new Set(this.selected);
    next.has(id) ? next.delete(id) : next.add(id);
    this.selected = next;
  }
  private async bulkDelete() {
    const ids = [...this.selected];
    if (!ids.length) return;
    if (!confirm(`Delete ${ids.length} item${ids.length === 1 ? "" : "s"}? This cannot be undone.`))
      return;
    this.busy = true;
    try {
      await api.bulkMedia("delete", ids);
      const line = libbyReact("libraryDelete", { count: ids.length });
      mascotSay(line.message, "success", { emotion: line.emotion, intensity: line.intensity });
      // Drop any client-side favorites for the deleted items.
      const favs = new Set(this.favorites);
      ids.forEach((id) => favs.delete(id));
      this.favorites = favs;
      saveFavorites(favs);
      this.exitSelect();
      await this.refresh();
    } catch (err) {
      console.error("bulk delete", err);
    } finally {
      this.busy = false;
    }
  }
  private async bulkTags(mode: "add" | "remove") {
    const ids = [...this.selected];
    if (!ids.length) return;
    const raw = prompt(
      mode === "add" ? "Add tags (comma-separated):" : "Remove tags (comma-separated):",
    );
    if (raw == null) return;
    const tags = raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (!tags.length) return;
    this.busy = true;
    try {
      await api.bulkMedia("update", ids, mode === "add" ? { addTags: tags } : { removeTags: tags });
      await this.refresh();
    } catch (err) {
      console.error("bulk tags", err);
    } finally {
      this.busy = false;
    }
  }
  private async bulkChangeKind() {
    const ids = [...this.selected];
    if (!ids.length) return;
    const kind = prompt("Change type to (video, gif, image, comic, game):");
    if (kind == null) return;
    const k = kind.trim().toLowerCase();
    if (!KIND_ORDER.includes(k as Kind)) {
      alert(`Unknown type "${k}".`);
      return;
    }
    this.busy = true;
    try {
      await api.bulkMedia("update", ids, { kind: k as Media["kind"] });
      this.exitSelect();
      await this.refresh();
    } catch (err) {
      console.error("bulk kind", err);
    } finally {
      this.busy = false;
    }
  }
  private bulkFavorite() {
    // Favorites live client-side (localStorage); add the whole selection.
    const next = new Set(this.favorites);
    this.selected.forEach((id) => next.add(id));
    this.favorites = next;
    saveFavorites(next);
    this.exitSelect();
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

  /**
   * The run of items the viewer is paging through, as records rather than ids — what
   * the arrow keys walk and what the viewer's "up next" carousel is made of.
   *
   * An id whose item has since been deleted is dropped rather than rendered as a hole.
   */
  private get viewerQueue(): Media[] {
    return this.viewerList
      .map((id) => this.items.find((m) => m.id === id))
      .filter((m): m is Media => m != null);
  }

  render() {
    const hasSearch = this.search.trim().length > 0;
    const isViewer = this.selectedId != null;
    const isSettings = !isViewer && this.section === "settings" && !hasSearch;
    const isBrowse = !isViewer && this.section === "browse" && !hasSearch;
    const isImageGen = !isViewer && this.section === "imagegen" && !hasSearch;
    const isChat = !isViewer && this.section === "chat" && !hasSearch;
    const isFavorites = !isViewer && this.section === "favorites" && !hasSearch;
    const isHome = !isViewer && this.section === "home" && !hasSearch && !isFavorites;
    const isSearch = !isViewer && hasSearch;
    const isGrid =
      !isViewer && !isHome && !isFavorites && !isSearch && !isSettings && !isBrowse && !isImageGen && !isChat;

    const activeItem = isViewer ? this.items.find((m) => m.id === this.selectedId) ?? null : null;

    let headerTitle = "Library";
    if (isViewer) headerTitle = activeItem ? activeItem.title : "Library";
    else if (isSearch) headerTitle = "Search results";
    else if (isSettings) headerTitle = "Settings";
    else if (isBrowse) headerTitle = "Browse sources";
    else if (isImageGen) headerTitle = "Create";
    else if (isChat) headerTitle = "Chat with Libby";
    else if (isFavorites) headerTitle = "Favorites";
    else if (isHome) headerTitle = "Library";
    else headerTitle = KIND_META[this.section as Kind]?.label ?? "Library";

    return html`
      ${this.renderNav()}
      <div class="main-col">
        ${this.renderHeader(headerTitle, hasSearch, isViewer, isSettings)}
        <main class=${isChat ? "flush" : ""}>
          ${isHome ? this.renderHome() : nothing}
          ${isSettings ? html`<oppai-settings .user=${this.user}></oppai-settings>` : nothing}
          ${isBrowse
            ? html`<oppai-browse @imported=${() => this.refresh()}></oppai-browse>`
            : nothing}
          ${isImageGen
            ? html`<oppai-imagegen @imported=${() => this.refresh()}></oppai-imagegen>`
            : nothing}
          ${isChat ? html`<oppai-chat .user=${this.user}></oppai-chat>` : nothing}
          ${isGrid || isFavorites || isSearch
            ? this.renderGrid(isGrid, isFavorites, isSearch)
            : nothing}
          ${isViewer && activeItem
            ? html`<oppai-viewer
                .media=${activeItem}
                .queue=${this.viewerQueue}
                .favorite=${this.favorites.has(activeItem.id)}
                @toggle-favorite=${() => this.toggleFavorite(activeItem.id)}
                @navigate=${(e: CustomEvent<{ dir: number }>) => this.stepItem(e.detail.dir)}
                @jump=${(e: CustomEvent<{ id: number }>) => (this.selectedId = e.detail.id)}
                @changed=${() => this.refresh()}
                @deleted=${() => {
                  this.closeItem();
                  this.refresh();
                }}
              ></oppai-viewer>`
            : nothing}
          ${isViewer && !activeItem
            ? html`<div class="empty">Item not found.</div>`
            : nothing}
        </main>
      </div>
      ${this.renderUpload()}
      ${this.renderBulkBar()}
      ${this.renderDownloads()}
      <oppai-scrape-dialog @imported=${() => this.refresh()}></oppai-scrape-dialog>
      <oppai-context-menu></oppai-context-menu>
      <input id="file" type="file" multiple @change=${this.onFileInput} />
    `;
  }

  private renderDownloads() {
    if (this.downloads.length === 0) return nothing;
    return html`<aside class="download-area" aria-label="Downloads">
      <div class="download-heading">Downloads</div>
      ${this.downloads.slice(0, 5).map((task) => html`
        <div class="download-row">
          <div class="download-ring" style=${`--p:${task.progress}`}>
            <span class="material-symbols-rounded">${task.state === "done" ? "check" : task.state === "error" ? "error" : "download"}</span>
          </div>
          <div class="download-copy">
            <div class="download-title">${task.label}</div>
            <div class="download-status">${task.state === "running"
              ? `${Math.round(task.progress * 100)}% · running in background`
              : task.state === "done" ? "Complete" : task.error || "Failed"}</div>
          </div>
          ${task.state !== "running" ? html`<button class="download-dismiss" title="Dismiss" @click=${() => dismissDownload(task.id)}>
            <span class="material-symbols-rounded">close</span>
          </button>` : nothing}
        </div>`)}
    </aside>`;
  }

  private renderBulkBar() {
    if (!this.selectMode || this.selected.size === 0) return nothing;
    const n = this.selected.size;
    return html`
      <div class="bulk-bar">
        <span class="bulk-count">${n} selected</span>
        <button class="bulk-btn" ?disabled=${this.busy} @click=${() => this.bulkTags("add")}>
          <span class="material-symbols-rounded" style="font-size:18px;">sell</span>Add tags
        </button>
        <button class="bulk-btn" ?disabled=${this.busy} @click=${() => this.bulkTags("remove")}>
          <span class="material-symbols-rounded" style="font-size:18px;">label_off</span>Remove tags
        </button>
        <button class="bulk-btn" ?disabled=${this.busy} @click=${this.bulkChangeKind}>
          <span class="material-symbols-rounded" style="font-size:18px;">category</span>Type
        </button>
        <button class="bulk-btn" ?disabled=${this.busy} @click=${this.bulkFavorite}>
          <span class="material-symbols-rounded" style="font-size:18px;">favorite</span>Favorite
        </button>
        <button class="bulk-btn danger" ?disabled=${this.busy} @click=${this.bulkDelete}>
          <span class="material-symbols-rounded" style="font-size:18px;">delete</span>Delete
        </button>
        <button class="bulk-btn" @click=${() => this.exitSelect()}>
          <span class="material-symbols-rounded" style="font-size:18px;">close</span>
        </button>
      </div>
    `;
  }

  private renderNav() {
    const initials = (this.user?.username ?? "?").slice(0, 2).toUpperCase();
    const settingsActive = this.section === "settings" && this.selectedId == null;
    return html`
      <nav>
        <button class="logo" title="OppaiLib" @click=${() => this.selectSection("home")}>
          ${logoSVG}
        </button>
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
                  style="background:${active ? "var(--oppai-primary-container)" : "transparent"};"
                >
                  <span
                    class="material-symbols-rounded ${active ? "fill-icon" : ""}"
                    style="font-size:22px; color:${active ? "var(--oppai-primary-bright)" : "var(--oppai-text-dim)"};"
                    >${n.icon}</span
                  >
                </span>
                <span class="nav-label" style="color:${active ? "var(--oppai-text)" : "var(--oppai-text-muted)"};"
                  >${n.label}</span
                >
              </button>
            `;
          })}
        </div>

        <div style="flex:1;"></div>

        <button
          class="icon-btn"
          title="Settings"
          @click=${() => this.selectSection("settings")}
          style="width:48px; height:48px; border-radius:24px; background:${settingsActive
            ? "var(--oppai-primary-container)"
            : "var(--oppai-surface-2)"}; color:${settingsActive
            ? "var(--oppai-primary-bright)"
            : "var(--oppai-text-dim)"};"
        >
          <span class="material-symbols-rounded ${settingsActive ? "fill-icon" : ""}" style="font-size:22px;"
            >settings</span
          >
        </button>
        <button
          class="icon-btn"
          title="Sign out (${this.user?.username})"
          @click=${this.logout}
          style="width:40px; height:40px; border-radius:20px; background:var(--oppai-accent); color:var(--oppai-on-accent); font-size:13px; font-weight:600;"
        >
          ${initials}
        </button>
      </nav>
    `;
  }

  private renderHeader(title: string, hasSearch: boolean, isViewer: boolean, isSettings = false) {
    return html`
      <header>
        ${isViewer
          ? html`<button
              class="icon-btn"
              title="Back"
              @click=${this.closeItem}
              style="width:40px; height:40px; border-radius:20px; background:none; color:var(--oppai-text); flex-shrink:0;"
            >
              <span class="material-symbols-rounded" style="font-size:24px;">arrow_back</span>
            </button>`
          : nothing}

        <h1 class="h-title">${title}</h1>

        <div class="searchbox">
          <span class="material-symbols-rounded" style="font-size:20px; color:var(--oppai-text-dim);">search</span>
          <input
            .value=${this.search}
            @input=${this.onSearchInput}
            placeholder="Search titles, tags, notes..."
          />
          ${hasSearch
            ? html`<button
                class="icon-btn"
                @click=${this.clearSearch}
                style="background:none; color:var(--oppai-text-dim);"
              >
                <span class="material-symbols-rounded" style="font-size:18px;">close</span>
              </button>`
            : nothing}
        </div>

        <div style="flex:1;"></div>

        ${!isViewer && !isSettings
          ? html`<button
              class="filters-btn header-toggle ${this.selectMode ? "on" : ""}"
              title="Select multiple"
              @click=${this.toggleSelectMode}
            >
              <span class="material-symbols-rounded" style="font-size:18px;"
                >${this.selectMode ? "check_circle" : "check_box_outline_blank"}</span
              >
              <span style="font-size:13px; font-weight:500;">Select</span>
            </button>`
          : nothing}
        ${!isSettings
          ? html`<button class="filters-btn">
              <span class="material-symbols-rounded" style="font-size:18px;">tune</span>
              <span style="font-size:13px; font-weight:500;">Filters</span>
            </button>`
          : nothing}
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
        <h2 class="greeting anim-rise">${greeting}</h2>
        <p class="greeting-sub anim-rise" style="animation-delay:40ms;">
          Here's what's new across your library
        </p>
        ${rows.map(
          (row, i) => html`
            <section class="row anim-rise" style="animation-delay:${80 + i * 70}ms;">
              <div class="row-head">
                <span class="material-symbols-rounded" style="font-size:22px; color:var(--oppai-primary-bright);"
                  >${row.icon}</span
                >
                <h3 class="row-title">${row.label}</h3>
                <button class="see-all" @click=${() => this.selectSection(row.kind)}>
                  See all
                  <span class="material-symbols-rounded" style="font-size:16px;">chevron_right</span>
                </button>
              </div>
              <div class="row-scroll">
                ${row.items.map((m) => this.renderTile(m, "200px", undefined, row.items))}
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
      const terms = this.search.trim().toLowerCase().split(/\s+/).filter(Boolean);
      gridItems = this.items.filter((m) => matchesSearch(m, terms));
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
                  style="background:${c.active ? "var(--oppai-accent)" : "transparent"}; color:${c.active
                    ? "var(--oppai-on-accent)"
                    : "var(--oppai-text-dim)"}; border:1px solid ${c.active ? "var(--oppai-accent)" : "var(--oppai-border-strong)"};"
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
          : html`<div class="grid">
              ${gridItems.map((m, i) => this.renderTile(m, "100%", i, gridItems))}
            </div>`}
      </div>
    `;
  }

  private renderTile(m: Media, width: string, index?: number, list?: Media[]) {
    const meta = KIND_META[m.kind];
    const fav = this.favorites.has(m.id);
    const stat = statFor(m);
    // Grid tiles (index provided) fade+rise in with a capped stagger; home-row
    // tiles inherit their section's entrance instead.
    const anim = index != null ? "anim-rise" : "";
    const delay = index != null ? `animation-delay:${Math.min(index, 12) * 45}ms;` : "";
    const isSel = this.selected.has(m.id);
    const cls = `tile ${anim} ${this.selectMode ? "selecting" : ""} ${isSel ? "selected" : ""}`;
    return html`
      <div
        class=${cls}
        data-id=${m.id}
        @click=${() => (this.selectMode ? this.toggleSelected(m.id) : this.openItem(m.id, list))}
        style="flex-shrink:0; width:${width}; ${delay}"
      >
        <div
          class="tile-media"
          style="width:100%; aspect-ratio:${meta.aspect}; background:${swatchFor(m)};"
        >
          ${hasThumbnail(m)
            ? html`<img loading="lazy" src=${api.thumbURL(m.id)} alt=${m.title} />`
            : html`<div class="tile-overlay">
                <span class="material-symbols-rounded" style="font-size:30px; color:#fff;"
                  >${meta.icon}</span
                >
                <span class="type-label">${meta.typeLabel}</span>
              </div>`}
          ${this.selectMode
            ? html`<div class="select-check ${isSel ? "on" : ""}">
                ${isSel
                  ? html`<span class="material-symbols-rounded">check</span>`
                  : nothing}
              </div>`
            : html`<button
                class="fav-btn ${fav ? "is-fav" : ""}"
                @click=${(e: Event) => this.toggleFavorite(m.id, e)}
              >
                <span
                  class="material-symbols-rounded fill-icon"
                  style="font-size:18px; color:${fav ? "var(--oppai-fav)" : "rgba(255,255,255,0.9)"};"
                  >${fav ? "favorite" : "favorite_border"}</span
                >
              </button>`}
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
            <div style="font-size:12px; color:var(--oppai-text-muted); margin-top:4px;">
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
