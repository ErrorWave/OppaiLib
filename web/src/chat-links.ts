// Things a chat message can point at, and the pictures it should not point at again.
//
// Shared by the Chat screen and the browse-together session because both are the
// same conversation seen from different chairs: both send turns to /api/chat, both
// have to say which pictures have already been shown, and both draw the library
// items a reply named.

import { css, html, nothing, type TemplateResult } from "lit";
import { api, type LibbyLink, type StoredChatMessage } from "./api.js";

/**
 * The pictures already seen in this conversation, oldest first.
 *
 * The server keeps no memory between requests — the client owns the log — so
 * "you have already sent this one" has to travel with every turn. Both roles
 * count: a photo the user shared is just as much on screen as one she sent, and
 * handing it back to them is the same non-answer either way.
 *
 * Bounded because it rides in the request body and because a picture ruled out
 * forever is a picture removed from the gallery.
 */
export function recentlySent(messages: StoredChatMessage[], limit = 12): string[] {
  const ids: string[] = [];
  for (const message of messages) {
    if (message.imageId && ids[ids.length - 1] !== message.imageId) ids.push(message.imageId);
  }
  return ids.slice(-limit);
}

/** Asks the app shell to open a library item. Chat lives inside Library, which
    knows how to route it; nothing below here needs to know that. */
export const OPEN_MEDIA_EVENT = "oppai-open-media";

export function requestOpenMedia(source: EventTarget, id: number): void {
  source.dispatchEvent(new CustomEvent<{ id: number }>(OPEN_MEDIA_EVENT, {
    detail: { id }, bubbles: true, composed: true,
  }));
}

/** Icon per library kind, matching the nav so a chip reads as the same object. */
const KIND_ICONS: Record<string, string> = {
  video: "movie", gif: "gif_box", image: "image", comic: "menu_book", game: "sports_esports",
};

/** Styles for the chips below. Shadow DOM means each host has to include these
    itself; exporting them is what keeps the two call sites looking identical. */
export const linkChipStyles = css`
  .links { display:flex; flex-wrap:wrap; gap:8px; margin-top:8px; }
  .link-chip {
    display:flex; align-items:center; gap:8px; padding:6px 12px 6px 6px; max-width:100%;
    border:1px solid var(--md-sys-color-outline-variant, rgba(255,255,255,.14));
    border-radius:12px; background:var(--md-sys-color-surface-container-high, rgba(255,255,255,.05));
    color:inherit; font:inherit; font-size:13px; text-align:left; cursor:pointer;
  }
  .link-chip:hover { border-color:var(--md-sys-color-primary, #f97316); }
  .link-chip img, .link-chip .link-icon {
    width:36px; height:36px; border-radius:8px; flex:0 0 auto; object-fit:cover;
    display:grid; place-items:center; background:rgba(255,255,255,.07);
  }
  .link-chip .link-copy { display:flex; flex-direction:column; min-width:0; }
  .link-chip strong { font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .link-chip span { opacity:.6; font-size:11px; text-transform:capitalize; }
`;

/**
 * Draws what a reply pointed at, as things you can open.
 *
 * The title is already in the prose — the server substitutes it for the link tag —
 * so this is deliberately a chip rather than a card: it is the "open it" affordance
 * for something she has already named, not a second copy of the sentence.
 */
export function renderLinkChips(links: LibbyLink[] | undefined, open: (id: number) => void): TemplateResult | typeof nothing {
  if (!links?.length) return nothing;
  return html`<div class="links">${links.map((link) => html`
    <button class="link-chip" title=${`Open ${link.title}`} @click=${() => open(link.id)}>
      ${link.hasThumb
        ? html`<img src=${api.thumbURL(link.id)} alt="" loading="lazy"/>`
        : html`<span class="link-icon"><span class="material-symbols-rounded" style="font-size:20px">${KIND_ICONS[link.kind] ?? "folder"}</span></span>`}
      <span class="link-copy"><strong>${link.title}</strong><span>${link.kind}</span></span>
    </button>`)}</div>`;
}
