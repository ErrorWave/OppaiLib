import { css } from "lit";

// Material 3 design tokens, tuned to the "OppaiLib Media Server UI" design:
// a deep-green dark scheme. @material/web components read these
// --md-sys-color-* custom properties. Dark by default; a light override is
// provided under [data-theme="light"]. The raw design hex values are also
// exposed as --oppai-* tokens for the hand-authored shell in library.ts.
export const globalStyles = `
  :root {
    color-scheme: dark;

    /* M3 tokens (green scheme) */
    --md-sys-color-primary: #74DB94;
    --md-sys-color-on-primary: #00391A;
    --md-sys-color-primary-container: #0B5A2C;
    --md-sys-color-on-primary-container: #92F8AC;
    --md-sys-color-secondary-container: #354B38;
    --md-sys-color-on-secondary-container: #D0E8D1;
    --md-sys-color-surface: #0F130E;
    --md-sys-color-surface-container-low: #161A15;
    --md-sys-color-surface-container: #1C201B;
    --md-sys-color-surface-container-high: #262B24;
    --md-sys-color-on-surface: #E1E4DC;
    --md-sys-color-on-surface-variant: #C2C9BD;
    --md-sys-color-outline: #42483F;
    --md-sys-color-outline-variant: #262B24;
    --md-sys-color-error: #FFB4AB;
    --md-sys-color-background: #0F130E;
    --md-icon-font: 'Material Symbols Rounded';

    /* Raw design palette, used by the hand-authored shell */
    --oppai-bg: #0F130E;
    --oppai-nav: #161A15;
    --oppai-surface: #1C201B;
    --oppai-surface-2: #262B24;
    --oppai-accent: #354B38;
    --oppai-primary: #74DB94;
    --oppai-primary-bright: #92F8AC;
    --oppai-primary-container: #0B5A2C;
    --oppai-on-primary: #00391A;
    --oppai-text: #E1E4DC;
    --oppai-text-dim: #C2C9BD;
    --oppai-text-muted: #8C9388;
    --oppai-border: #262B24;
    --oppai-border-strong: #42483F;
    --oppai-fav: #FFB4AB;

    --oppai-radius: 16px;
    font-family: "Roboto", system-ui, -apple-system, sans-serif;
  }
  :root[data-theme="light"] {
    color-scheme: light;
    --md-sys-color-primary: #006D3B;
    --md-sys-color-on-primary: #ffffff;
    --md-sys-color-primary-container: #92F8AC;
    --md-sys-color-on-primary-container: #00210E;
    --md-sys-color-surface: #F5FBF2;
    --md-sys-color-surface-container: #E9EFE6;
    --md-sys-color-surface-container-high: #E3E9E0;
    --md-sys-color-on-surface: #191D18;
    --md-sys-color-on-surface-variant: #414941;
    --md-sys-color-outline: #717970;
    --md-sys-color-background: #F5FBF2;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; height: 100%; }
  body {
    background: var(--md-sys-color-background);
    color: var(--md-sys-color-on-surface);
    font-family: "Roboto", system-ui, -apple-system, sans-serif;
  }
  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-thumb { background: #42483F; border-radius: 8px; }
  ::-webkit-scrollbar-track { background: transparent; }
`;

// Material Symbols Rounded icon helper, included in each shadow root that
// renders <span class="material-symbols-rounded">. The @font-face itself is
// loaded document-side via <link> in index.html and applies inside shadow DOM.
export const iconStyles = css`
  .material-symbols-rounded {
    font-family: "Material Symbols Rounded";
    font-weight: normal;
    font-style: normal;
    font-variation-settings: "opsz" 24, "wght" 400, "FILL" 0, "GRAD" 0;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    font-feature-settings: "liga";
    -webkit-font-smoothing: antialiased;
    user-select: none;
  }
  .fill-icon {
    font-variation-settings: "opsz" 24, "wght" 500, "FILL" 1, "GRAD" 0;
  }
`;

// Shared component-level styles.
export const cardStyles = css`
  .card {
    background: var(--md-sys-color-surface-container);
    border-radius: var(--oppai-radius);
    overflow: hidden;
  }
`;
