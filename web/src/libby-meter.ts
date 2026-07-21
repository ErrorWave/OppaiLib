// Libby's "horniness" meter: a per-session intensity, 1–5, shared across the app.
// It is the persistent backing for the chat's intensity slider — deliberately
// session-scoped (sessionStorage), a mood for this sitting that starts fresh next
// time. Three things move it: the user sets it by hand (the chat slider), chatting
// with Libby (the model's replies carry an intensity), and adding items to the
// library. It also selects which tier of an outfit's art Libby wears (see
// libbyAssetCandidates in libby.ts), so hornier = a hotter outfit tier.
//
// Values line up with the server's five outfit art tiers: intensity i ↔ level i-1.

const KEY = "oppai_libby_intensity";

/** Intensity runs 1..5, matching normalizeIntensity() and the five art tiers. */
export const LIBBY_MAX_INTENSITY = 5;

export function getIntensity(): number {
  const raw = sessionStorage.getItem(KEY);
  const v = raw === null ? 1 : Number(raw);
  return Number.isFinite(v) ? clamp(v) : 1;
}

/** Sets the intensity to an absolute value (the chat slider / model replies). */
export function setIntensity(value: number): number {
  return store(value);
}

/** Nudges the intensity up (library adds, bolder chat). */
export function bumpIntensity(delta = 1): number {
  return store(getIntensity() + delta);
}

/** The outfit art tier (0..4) for an intensity (1..5). */
export function tierForIntensity(value: number = getIntensity()): number {
  return clamp(value) - 1;
}

function store(value: number): number {
  const v = clamp(value);
  try {
    sessionStorage.setItem(KEY, String(v));
  } catch {
    /* ignore quota / private-mode errors */
  }
  window.dispatchEvent(new CustomEvent("oppai-libby-meter", { detail: { intensity: v } }));
  return v;
}

function clamp(v: number): number {
  return Math.max(1, Math.min(LIBBY_MAX_INTENSITY, Math.round(v)));
}
