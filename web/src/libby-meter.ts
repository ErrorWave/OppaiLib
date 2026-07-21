// Libby's "horniness" meter: a per-session stat, 0–100, that decides which art
// tier of her outfit she wears. It is deliberately session-scoped (sessionStorage,
// not localStorage) — it's a mood for this sitting, and starts fresh next time.
//
// Three things move it, all funnelled through here so every surface agrees:
//   - the user sets it by hand (slider / ± in the chat panel),
//   - chatting with Libby nudges it up (harder in the bolder modes),
//   - adding items to the library nudges it up.
//
// Views react to the `oppai-libby-meter` event to re-render at the new tier.

const METER_KEY = "oppai_libby_meter";

// Five art tiers, levels 0..4, matching the server's maxLibbyLevel.
export const LIBBY_TIERS = 5;

export function getMeter(): number {
  const raw = sessionStorage.getItem(METER_KEY);
  const v = raw === null ? 0 : Number(raw);
  return Number.isFinite(v) ? clamp(v) : 0;
}

/** Sets the meter to an absolute value (manual control). Returns the stored value. */
export function setMeter(value: number): number {
  return store(value);
}

/** Nudges the meter by a delta (chat, library adds). Returns the stored value. */
export function bumpMeter(delta: number): number {
  return store(getMeter() + delta);
}

/** The art tier (0..LIBBY_TIERS-1) for a meter value. */
export function tierForMeter(value: number = getMeter()): number {
  const t = Math.floor(clamp(value) / (100 / LIBBY_TIERS));
  return Math.max(0, Math.min(LIBBY_TIERS - 1, t));
}

function store(value: number): number {
  const v = clamp(value);
  try {
    sessionStorage.setItem(METER_KEY, String(v));
  } catch {
    /* ignore quota / private-mode errors */
  }
  window.dispatchEvent(new CustomEvent("oppai-libby-meter", { detail: { value: v } }));
  return v;
}

function clamp(v: number): number {
  return Math.max(0, Math.min(100, Math.round(v)));
}
