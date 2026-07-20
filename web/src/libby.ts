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
  default: "🙂",
  happy: "😊",
  sad: "😢",
  worried: "😟",
  surprised: "😮",
  thinking: "🤔",
  mischievous: "😏",
  horniness: "🥵",
};

const legacyAsset: Partial<Record<LibbyEmotion, string>> = {
  happy: "/mascot-happy.png",
  worried: "/mascot-thinking.png",
  surprised: "/mascot-surprised.png",
  thinking: "/mascot-thinking.png",
  mischievous: "/mascot-mischievous.png",
  horniness: "/mascot-mischievous.png",
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

/**
 * Asset lookup deliberately tries GIF before PNG. Operators can add animated Libby
 * emotions/outfits without a code change, while installations with only the original
 * PNGs keep working. Missing emotions always finish at mascot.png.
 */
export function libbyAssetCandidates(emotion?: string, intensity?: number, outfit = "default"): string[] {
  const mood = normalizeEmotion(emotion);
  const level = normalizeIntensity(intensity);
  const safeOutfit = outfit.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-") || "default";
  const paths = [
    `/libby/${safeOutfit}/${mood}-${level}.gif`,
    `/libby/${safeOutfit}/${mood}-${level}.png`,
    `/libby/${safeOutfit}/${mood}.gif`,
    `/libby/${safeOutfit}/${mood}.png`,
  ];
  if (legacyAsset[mood]) paths.push(legacyAsset[mood]!);
  paths.push("/mascot.png");
  return [...new Set(paths)];
}

export function inferErrorEmotion(message: string): Pick<LibbyCue, "emotion" | "intensity"> {
  const text = message.toLowerCase();
  if (/timed? out|unreachable|network|offline|couldn.t reach|connection/.test(text)) {
    return { emotion: "worried", intensity: 4 };
  }
  if (/unauthori[sz]ed|session ended|sign in|password|login/.test(text)) {
    return { emotion: "sad", intensity: 3 };
  }
  if (/invalid|missing|required|not found|doesn.t exist/.test(text)) {
    return { emotion: "thinking", intensity: 2 };
  }
  if (/failed|error|couldn.t|can.t/.test(text)) {
    return { emotion: "surprised", intensity: 3 };
  }
  return { emotion: "worried", intensity: 2 };
}

export function applyImageFallback(img: HTMLImageElement, candidates: string[]) {
  const current = Number(img.dataset.fallbackIndex || "0");
  const next = current + 1;
  if (next >= candidates.length) return;
  img.dataset.fallbackIndex = String(next);
  img.src = candidates[next];
}
