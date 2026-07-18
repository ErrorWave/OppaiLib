// Libby presentation preference. Per-device, like the theme: whether the mascot
// appears is about who's looking at this screen, not about the library, so it lives
// in localStorage and needs no save step or admin rights.
//
// Hiding Libby removes the artwork and persona, not the features: errors that would
// have been spoken by the mascot still appear as plain notices, and Chat keeps
// working without her portrait.

const HIDE_KEY = "oppai_hide_libby";
const OUTFIT_KEY = "oppai_libby_outfit";

export function loadHideLibby(): boolean {
  return localStorage.getItem(HIDE_KEY) === "1";
}

export function saveHideLibby(hide: boolean): void {
  try {
    localStorage.setItem(HIDE_KEY, hide ? "1" : "0");
  } catch {
    /* ignore quota / private-mode errors */
  }
  // Views that are already on screen (the chat sidebar, the error popup) listen for
  // this so the toggle applies immediately, not on the next page load.
  window.dispatchEvent(new CustomEvent("oppai-libby-pref", { detail: { hidden: hide } }));
}

// Which outfit Libby wears, per-device like hiding her. Empty string means the
// default art that ships with the app. The images themselves come from the server
// (see api.libbyEmotionURL); an outfit that lacks an emotion 404s and the views
// fall back to the default art via the image's error handler.

export function loadLibbyOutfit(): string {
  return localStorage.getItem(OUTFIT_KEY) ?? "";
}

export function saveLibbyOutfit(id: string): void {
  try {
    if (id) localStorage.setItem(OUTFIT_KEY, id);
    else localStorage.removeItem(OUTFIT_KEY);
  } catch {
    /* ignore quota / private-mode errors */
  }
  window.dispatchEvent(new CustomEvent("oppai-libby-pref", { detail: { outfit: id } }));
}

/**
 * The image to show for one of Libby's emotions: the worn outfit's art when an
 * outfit is selected, else the bundled default. Callers should keep the default
 * as an @error fallback, since an outfit may not cover every emotion.
 */
export function libbyEmotionSrc(emotion: string): string {
  const outfit = loadLibbyOutfit();
  if (!outfit) return defaultLibbyArt(emotion);
  return `/api/libby/outfits/${encodeURIComponent(outfit)}/emotions/${encodeURIComponent(emotion)}`;
}

export function defaultLibbyArt(emotion: string): string {
  switch (emotion) {
    case "happy": return "/mascot-happy.png";
    case "mischievous": return "/mascot-mischievous.png";
    case "surprised": return "/mascot-surprised.png";
    case "thinking": return "/mascot-thinking.png";
    default: return "/mascot.png";
  }
}
