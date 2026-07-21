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
 * The image to show for one of Libby's emotions at a given horniness tier: the
 * worn outfit's art when an outfit is selected, else the bundled default. This is
 * the head of libbyArtChain(); callers that can't handle the whole fallback chain
 * (a single <img> with an @error default) can use just this.
 */
export function libbyEmotionSrc(emotion: string, tier = 0): string {
  return libbyArtChain(emotion, tier)[0];
}

/**
 * The ordered list of images to try for an emotion at a tier, best first. A worn
 * outfit is tried at the requested tier and every lower tier down to the baseline
 * (a hornier tier the user never drew simply shows a calmer pose), then the
 * bundled default art, then the neutral mascot as the last resort. Views walk this
 * on each <img> error so a missing tier never leaves a broken image.
 */
export function libbyArtChain(emotion: string, tier = 0): string[] {
  const outfit = loadLibbyOutfit();
  const chain: string[] = [];
  if (outfit) {
    const base = `/api/libby/outfits/${encodeURIComponent(outfit)}/emotions/${encodeURIComponent(emotion)}`;
    for (let level = Math.max(0, tier); level >= 1; level--) {
      chain.push(`${base}?level=${level}`);
    }
    chain.push(base); // level 0, the suffix-free baseline
  }
  chain.push(defaultLibbyArt(emotion));
  if (!chain.includes("/mascot.png")) chain.push("/mascot.png");
  return chain;
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
