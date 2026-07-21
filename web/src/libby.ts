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

export const LIBBY_EMOTIONS = [
  "default", "happy", "sad", "worried", "surprised", "thinking", "mischievous", "horniness",
] as const;

export type LibbyEmotion = (typeof LIBBY_EMOTIONS)[number];
export type LibbyTone = "success" | "error";

export interface LibbyCue {
  message: string;
  tone: LibbyTone;
  emotion: LibbyEmotion;
  intensity: number;
  outfit?: string;
}

const emoji: Record<LibbyEmotion, string> = {
  default: "🙂", happy: "😊", sad: "😢", worried: "😟", surprised: "😮",
  thinking: "🤔", mischievous: "😏", horniness: "🥵",
};

export function normalizeEmotion(value?: string): LibbyEmotion {
  const emotion = (value ?? "").trim().toLowerCase();
  return (LIBBY_EMOTIONS as readonly string[]).includes(emotion)
    ? emotion as LibbyEmotion
    : "default";
}

export function normalizeIntensity(value?: number): number {
  return Math.max(1, Math.min(5, Math.round(Number(value) || 1)));
}

export function emotionEmoji(value?: string): string {
  return emoji[normalizeEmotion(value)];
}

/** Outfit uploads may be GIF or PNG; the server preserves their media type. */
export function libbyAssetCandidates(emotion?: string, intensity?: number, outfit = loadLibbyOutfit()): string[] {
  const mood = normalizeEmotion(emotion);
  const level = normalizeIntensity(intensity);
  const paths: string[] = [];
  if (outfit && outfit !== "default") {
    // Outfits can carry a separate image per horniness tier (server levels 0..4,
    // where level = intensity-1). Try the tier for this intensity and every calmer
    // one down to the baseline, so a tier the user never drew shows a cooler pose.
    const outfitBase = `/api/libby/outfits/${encodeURIComponent(outfit)}/emotions/${encodeURIComponent(mood)}`;
    for (let tier = level - 1; tier >= 1; tier--) paths.push(`${outfitBase}?level=${tier}`);
    paths.push(outfitBase); // level 0, the suffix-free baseline
  }
  paths.push(
    `/libby/default/${mood}-${level}.gif`,
    `/libby/default/${mood}-${level}.png`,
    `/libby/default/${mood}.gif`,
    `/libby/default/${mood}.png`,
    defaultLibbyArt(mood),
    "/mascot.png",
  );
  return [...new Set(paths)];
}

export function inferErrorEmotion(message: string): Pick<LibbyCue, "emotion" | "intensity"> {
  const text = message.toLowerCase();
  if (/timed? out|unreachable|network|offline|couldn.t reach|connection/.test(text)) return { emotion: "worried", intensity: 4 };
  if (/unauthori[sz]ed|session ended|sign in|password|login/.test(text)) return { emotion: "sad", intensity: 3 };
  if (/invalid|missing|required|not found|doesn.t exist/.test(text)) return { emotion: "thinking", intensity: 2 };
  if (/failed|error|couldn.t|can.t/.test(text)) return { emotion: "surprised", intensity: 3 };
  return { emotion: "worried", intensity: 2 };
}

export function applyImageFallback(img: HTMLImageElement, candidates: string[]) {
  const next = Number(img.dataset.fallbackIndex || "0") + 1;
  if (next >= candidates.length) return;
  img.dataset.fallbackIndex = String(next);
  img.src = candidates[next];
}
