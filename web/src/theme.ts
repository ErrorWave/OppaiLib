import { css } from "lit";

// Material 3 design tokens (baseline dark scheme) applied globally. @material/web
// components read these --md-sys-color-* custom properties. Dark by default; a
// light override is provided under [data-theme="light"].
export const globalStyles = `
  :root {
    color-scheme: dark;
    --md-sys-color-primary: #d0bcff;
    --md-sys-color-on-primary: #381e72;
    --md-sys-color-primary-container: #4f378b;
    --md-sys-color-on-primary-container: #eaddff;
    --md-sys-color-secondary-container: #4a4458;
    --md-sys-color-on-secondary-container: #e8def8;
    --md-sys-color-surface: #141218;
    --md-sys-color-surface-container: #1d1b20;
    --md-sys-color-surface-container-high: #272529;
    --md-sys-color-on-surface: #e6e0e9;
    --md-sys-color-on-surface-variant: #cac4d0;
    --md-sys-color-outline: #938f99;
    --md-sys-color-error: #f2b8b5;
    --md-sys-color-background: #141218;

    --oppai-radius: 16px;
    font-family: "Roboto", system-ui, -apple-system, sans-serif;
  }
  :root[data-theme="light"] {
    color-scheme: light;
    --md-sys-color-primary: #6750a4;
    --md-sys-color-on-primary: #ffffff;
    --md-sys-color-primary-container: #eaddff;
    --md-sys-color-on-primary-container: #21005d;
    --md-sys-color-surface: #fef7ff;
    --md-sys-color-surface-container: #f3edf7;
    --md-sys-color-surface-container-high: #ece6f0;
    --md-sys-color-on-surface: #1d1b20;
    --md-sys-color-on-surface-variant: #49454f;
    --md-sys-color-outline: #79747e;
    --md-sys-color-background: #fef7ff;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; height: 100%; }
  body {
    background: var(--md-sys-color-background);
    color: var(--md-sys-color-on-surface);
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
