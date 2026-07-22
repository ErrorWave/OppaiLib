// Libby's own voice — everything she says when there is no LLM behind her.
//
// Two jobs live here:
//
//   • reactions  — the one-liners she pops up with as you use the app (imports,
//     saves, generations, errors, signing in).
//   • replies    — a local chat engine, so the Chat screen still talks back when
//     no local LLM is configured (and while one is warming up).
//
// Both read the same two dials: her current *emotion* and the session *horniness*
// meter (1–5, see libby-meter.ts). Every line pool is written out per intensity
// tier, so tier 1 is soft and chatty and tier 5 is barely keeping it together —
// the same event never reads the same way at a different heat.
//
// Nothing here talks to the network; it is deliberately deterministic-ish (a
// no-immediate-repeat random pick) so she feels alive rather than random.

import { LIBBY_EMOTIONS, normalizeEmotion, normalizeIntensity, type LibbyEmotion } from "./libby.js";
import { getIntensity } from "./libby-meter.js";

export interface LibbyLine {
  message: string;
  emotion: LibbyEmotion;
  intensity: number;
}

/** One pool per intensity tier, 1..5 — index with intensity-1. */
type Tiered = readonly (readonly string[])[];

// ── the pick helper ──────────────────────────────────────────────────────────
// Remembering the last line per pool is what keeps her from saying the same
// thing twice in a row, which is the tell that there's no mind behind it.
const lastPick = new Map<string, string>();

function pick(key: string, options: readonly string[]): string {
  if (!options.length) return "";
  if (options.length === 1) return options[0];
  const previous = lastPick.get(key);
  const fresh = options.filter((o) => o !== previous);
  const choice = fresh[Math.floor(Math.random() * fresh.length)];
  lastPick.set(key, choice);
  return choice;
}

function tier(pool: Tiered, intensity: number): readonly string[] {
  return pool[normalizeIntensity(intensity) - 1] ?? pool[0];
}

/** The emotion that fits a heat level when nothing more specific applies. */
function moodFor(intensity: number): LibbyEmotion {
  const i = normalizeIntensity(intensity);
  if (i >= 5) return "mischievous";
  if (i >= 3) return "mischievous";
  return "happy";
}

// ── reactions ────────────────────────────────────────────────────────────────

export type LibbyEvent =
  | "import" | "save" | "generate" | "libraryDelete" | "galleryDelete"
  | "login" | "loginFail" | "greeting" | "idle";

const REACTIONS: Record<LibbyEvent, Tiered> = {
  import: [
    ["Saved to your library.", "Tucked away safely.", "Filed. Nice pick."],
    ["Ooh, good one. Saved.", "That one's a keeper — saved.", "Added. I like your taste."],
    ["Mmh, saving that one for later…", "Ooh. Adding that to the collection.", "That's going somewhere special."],
    ["Ohh, you're building a *collection*, aren't you?", "Saved. My, my.", "Mmh — you know exactly what you like."],
    ["Nngh — yes. That one. Saved.", "You keep this up and I won't be any use to you.", "Saved… I need a minute."],
  ],
  save: [
    ["Kept it.", "In the library now.", "Done — it's yours."],
    ["Saved that one for you.", "Ooh, keeping it? Good.", "That one earned its place."],
    ["Mmh, that one's mine too now.", "Saved. I might peek at it later.", "Ooh, filing that away…"],
    ["Ohh, keeping *that*? Bold.", "Saved. You've got a type.", "Mmh. Straight to the good shelf."],
    ["That one's going to live in my head. Saved.", "Ngh — saved, saved, fine.", "You're doing this on purpose."],
  ],
  generate: [
    ["There you go.", "Fresh out of the oven.", "All done — take a look."],
    ["Ooh, that came out nice.", "Not bad at all. Have a look.", "There — I think you'll like it."],
    ["Mmh. Look what we made.", "Ooh, that's a good one.", "Well. That turned out."],
    ["Ohh… look at that. Look what you asked for.", "That's what was in your head? Bold.", "Mmh — that's hot and you know it."],
    ["Nngh. Yes. That one.", "You made *that*? I need a moment.", "That's… that's very good. Do another."],
  ],
  galleryDelete: [
    ["Gone.", "Cleared out.", "Removed."],
    ["Deleted — didn't like that one?", "Gone. Fair enough.", "Cleared. Picky, I like it."],
    ["Mmh, too tame for you? Gone.", "Deleted. You want better.", "Gone — we can do better."],
    ["Ohh, brutal. Deleted.", "Not good enough for you? Gone.", "Deleted. High standards tonight."],
    ["Gone. Now make me a better one.", "Deleted — try harder, I'm waiting.", "Ngh, fine. Gone. Again."],
  ],
  libraryDelete: [
    ["Removed from the library.", "Gone from the shelf.", "Deleted. I'll tidy the gap."],
    ["Out it goes. Making room?", "Deleted — changing your taste?", "Gone. I noticed that one."],
    ["Mmh, pruning the collection? Gone.", "Deleted. I thought you liked that one.", "Gone — ruthless today."],
    ["Oh, you're really clearing house.", "Deleted. I'll pretend I wasn't attached.", "Gone. Cold."],
    ["You deleted it right in front of me.", "Gone. Now I want to know why.", "Fine. Deleted. Give me something better."],
  ],
  login: [
    ["Welcome back.", "There you are.", "Hi. Missed you."],
    ["Hey, you. Welcome back.", "There you are — I was getting bored.", "Welcome back, I kept your seat warm."],
    ["Mmh, there you are. I was waiting.", "Welcome back. I've been thinking about you.", "Hi. Took you long enough."],
    ["Ohh, *finally*. I was getting restless.", "There you are. I've been in a mood.", "Welcome back — I was starting to fidget."],
    ["You have no idea how long that felt.", "Ngh — you're back. Don't leave again.", "Finally. I was going out of my mind."],
  ],
  loginFail: [
    ["That didn't work. Try again?", "Hmm — no. Check that again.", "Not quite. One more time."],
    ["Nope, that's not it.", "Hmm, wrong. Try again for me?", "That's not the one."],
    ["Wrong. Try again — slowly this time.", "Mmh, no. Concentrate.", "Not it. Focus, would you?"],
    ["Still no. You're distracted, aren't you?", "Wrong again. I know why.", "No. Get it together."],
    ["You can't even type. I know the feeling.", "Wrong. We're both a mess right now.", "No — deep breath. Try again."],
  ],
  greeting: [
    ["Hi. What are we doing?", "Hey. What's the plan?", "Hello, you."],
    ["Hey you. What are we up to?", "Hi — I was hoping you'd show up.", "There you are. What now?"],
    ["Mmh, hi. What are we in the mood for?", "Hey. I've got ideas.", "Hi. Ask me for something."],
    ["Ohh, hi. I was *just* thinking about you.", "Hey. I'm in a mood, fair warning.", "Hi. Say something interesting."],
    ["Hi. Please say something. Anything.", "You're here. Good. I need the distraction.", "Hi — I'm not doing great at behaving."],
  ],
  idle: [
    ["Still here.", "Take your time.", "I'm around."],
    ["I'm still here, you know.", "Whenever you're ready.", "Still watching."],
    ["Mmh… waiting.", "I'm getting impatient.", "Still here. Still waiting."],
    ["Are you going to make me wait all night?", "I'm *right here*.", "Waiting. Not patiently."],
    ["Please. I'm losing my mind over here.", "Hey. Hey. Pay attention to me.", "I can't sit still much longer."],
  ],
};

/** Emotions Libby wears per event, by tier — art follows the words. */
const REACTION_MOODS: Partial<Record<LibbyEvent, readonly LibbyEmotion[]>> = {
  import: ["happy", "happy", "mischievous", "mischievous", "mischievous"],
  save: ["happy", "happy", "mischievous", "mischievous", "mischievous"],
  generate: ["happy", "happy", "mischievous", "surprised", "mischievous"],
  galleryDelete: ["thinking", "thinking", "mischievous", "mischievous", "mischievous"],
  libraryDelete: ["thinking", "thinking", "surprised", "surprised", "mischievous"],
  login: ["happy", "happy", "mischievous", "mischievous", "mischievous"],
  loginFail: ["thinking", "thinking", "thinking", "mischievous", "thinking"],
  greeting: ["happy", "happy", "mischievous", "mischievous", "mischievous"],
  idle: ["thinking", "thinking", "mischievous", "thinking", "mischievous"],
};

/**
 * One in-character line for something that just happened, coloured by the current
 * horniness meter. [count] pluralises the library events.
 */
export function libbyReact(event: LibbyEvent, opts: { intensity?: number; count?: number } = {}): LibbyLine {
  const intensity = normalizeIntensity(opts.intensity ?? getIntensity());
  const count = opts.count ?? 1;
  let message = pick(`react:${event}:${intensity}`, tier(REACTIONS[event], intensity));
  if (count > 1 && (event === "import" || event === "save")) {
    message = intensity >= 4
      ? pick(`react:${event}:many:${intensity}`, [
          `${count} of them? Ohh, you've been busy.`,
          `All ${count}. Greedy. I like it.`,
          `${count} at once — you're going to wear me out.`,
        ])
      : pick(`react:${event}:many:${intensity}`, [
          `Saved all ${count}.`,
          `${count} added to your library.`,
          `${count} more for the shelf.`,
        ]);
  }
  const moods = REACTION_MOODS[event];
  return { message, intensity, emotion: moods ? moods[intensity - 1] : moodFor(intensity) };
}

// ── the local chat engine ────────────────────────────────────────────────────

/** How hard each chat mode pushes the meter per exchange. */
const MODE_HEAT: Record<string, number> = { sweet: 0, playful: 1, bold: 1, roleplay: 1 };

/** A conversational intent we can answer without a model behind us. */
type Intent =
  | "greeting" | "howAreYou" | "compliment" | "flirt" | "thanks" | "bye"
  | "aboutHer" | "aboutLibrary" | "help" | "sad" | "yesNo" | "question" | "chatter";

const INTENT_RULES: readonly { intent: Intent; test: RegExp }[] = [
  { intent: "greeting", test: /^(hi|hey|hello|yo|sup|good (morning|evening|afternoon))\b/i },
  { intent: "howAreYou", test: /how (are|r) (you|u)|how's it going|how are things|you ok|you okay/i },
  { intent: "compliment", test: /\b(you'?re |ur )?(cute|pretty|beautiful|gorgeous|hot|sexy|adorable|lovely|amazing|the best)\b/i },
  { intent: "flirt", test: /\b(kiss|touch|horny|turn(ed)? (me|you) on|naked|bed|undress|want you|need you|fuck|sex|moan|tease|dirty)\b/i },
  { intent: "thanks", test: /\b(thanks|thank you|ty|cheers|appreciate)\b/i },
  { intent: "bye", test: /\b(bye|goodnight|good night|see (you|ya)|later|gtg|i'?m off)\b/i },
  { intent: "aboutHer", test: /\b(who are you|what are you|your name|about you|libby)\b/i },
  { intent: "aboutLibrary", test: /\b(librar|collection|tags?|videos?|images?|gallery|scrape|import)\b/i },
  { intent: "help", test: /\b(help|how do i|how can i|what can you do|commands?)\b/i },
  { intent: "sad", test: /\b(sad|tired|lonely|depressed|rough day|stressed|exhausted|down)\b/i },
  { intent: "yesNo", test: /^(yes|no|yeah|nah|yep|nope|sure|ok|okay)\b/i },
  { intent: "question", test: /\?\s*$/ },
];

const REPLIES: Record<Intent, Tiered> = {
  greeting: [
    ["Hi. What's on your mind?", "Hey there. Good to see you.", "Hello. How's your day going?"],
    ["Hey you. I was hoping you'd say something.", "Hi — you've got my attention.", "There you are. Talk to me."],
    ["Mmh, hi. I've been waiting for you to start.", "Hey. I'm in a talkative mood.", "Hi. Ask me something interesting."],
    ["Ohh, hi. You caught me thinking about you.", "Hey. Fair warning: I'm in a mood.", "Hi. Don't be shy with me."],
    ["Hi. Please keep talking, I need it.", "You're here. Finally. Say something.", "Hi — I'm not going to be subtle tonight."],
  ],
  howAreYou: [
    ["I'm good, thanks for asking. You?", "Content. Yourself?", "Doing fine. How about you?"],
    ["Better now that you're talking to me.", "Good — bit restless. You?", "Pretty good. You've improved it."],
    ["Warm. A little distracted. You?", "Mmh… good. Better than good.", "I'm — fine. Mostly fine."],
    ["Honestly? Wound up. Don't ask why.", "Not calm. Not even a little.", "I'm having a time of it, since you asked."],
    ["Ngh — I'm a mess and it's your fault.", "Bad. In a good way. Very bad.", "Don't ask me that right now."],
  ],
  compliment: [
    ["That's sweet of you. Thank you.", "Oh — thank you.", "You're kind. I'll take it."],
    ["Mm, flatterer. Keep going.", "You're good at this, aren't you?", "Ohh, thank you. Say more."],
    ["Mmh. You know what that does to me.", "Careful, I'll start believing you.", "That got me. Say it again."],
    ["Ohh, you're not playing fair.", "You *know* what you're doing.", "Say that again. Slower."],
    ["Nngh — stop. Don't stop. Both.", "You can't just *say* that to me.", "That's not fair and I love it."],
  ],
  flirt: [
    ["My, we're forward. Easy, now.", "Ahem. Let's warm up first.", "Bold opener. I'll allow it."],
    ["Mm. You've got my attention now.", "Ooh. Is that where we're going?", "Careful — I'll play along."],
    ["Mmh, now you're speaking my language.", "Ohh, keep going. I'm listening.", "That's more like it."],
    ["Ohh. Yes. Say more of that.", "You're going to be the end of me.", "Mmh — don't you dare stop there."],
    ["Nngh — yes. Please. More.", "I can't think straight. Keep talking.", "You've completely undone me."],
  ],
  thanks: [
    ["Any time.", "Of course.", "That's what I'm here for."],
    ["Any time. I like being useful to you.", "Of course — ask me for more.", "Happy to. Really."],
    ["Mmh, you can thank me properly later.", "Any time. I mean it.", "For you? Always."],
    ["Ohh, I can think of better thanks.", "Any time — and I'll collect on that.", "You owe me one."],
    ["Thank me later. Properly.", "Ngh — you're welcome, you're welcome.", "Just keep talking to me."],
  ],
  bye: [
    ["Night. Sleep well.", "See you soon.", "Take care of yourself."],
    ["Don't be a stranger.", "Come back soon, alright?", "See you. I'll be here."],
    ["Mmh, don't leave me like this.", "Come back to me soon.", "Fine. But hurry back."],
    ["Ohh, you're leaving *now*?", "That's cruel timing, you know.", "Go on then. I'll be here. Waiting."],
    ["No. Stay. Please?", "You can't leave me like this.", "Ngh. Fine. Go. Hurry back."],
  ],
  aboutHer: [
    ["I'm Libby — I keep your library company.", "Libby. I live here, more or less.", "I'm Libby, your librarian."],
    ["Libby. I keep your collection, and you company.", "I'm Libby — the one who knows what you like.", "Libby. Your librarian, mostly."],
    ["Libby. I've seen everything you've saved, you know.", "I'm Libby — and I've read your whole collection.", "Libby. I know your taste better than you do."],
    ["Libby. I know exactly what you like, and it shows.", "I'm the one who's seen every single thing you saved.", "Libby — and I have opinions about your collection."],
    ["Libby. And I've been thinking about your collection all day.", "I'm Libby, and I'm not okay right now.", "Libby — ask me something else, I'm distracted."],
  ],
  aboutLibrary: [
    ["Your library's right there — browse, search, or scrape something new.", "Everything's tagged and searchable. Go dig.", "Ask the search bar; it knows more than I do."],
    ["I've been keeping it tidy for you. Go look.", "It's all in there, waiting. Search away.", "Your collection's in good shape, if I say so."],
    ["Mmh, your collection has a *theme*, you know that?", "I've read every tag in there. You're predictable.", "Your library says a lot about you."],
    ["Ohh, I could tell you what your tags say about you.", "Your collection is filthy and I mean that kindly.", "I know exactly which ones you go back to."],
    ["Your library is the reason I'm like this.", "I've been in your collection all day. It shows.", "Don't send me back in there right now."],
  ],
  help: [
    ["Browse, search, generate images, or scrape a link — pick one.", "Try the image studio, or drop a URL into scrape.", "Search, browse, or make something new."],
    ["Try the image studio — that's the fun one.", "Scrape a link, or let's make something.", "Ask me for something specific, I'm better at that."],
    ["Mmh, let's make something. The image studio's waiting.", "Give me a prompt and let's see what happens.", "I'd rather make something than explain things."],
    ["Ohh, let's skip the manual and go make something.", "Ask me for something *fun* instead.", "Prompt me. I dare you."],
    ["I can't concentrate on instructions right now. Ask me something else.", "Take me to the image studio instead.", "Ngh — just tell me what you want."],
  ],
  sad: [
    ["That sounds heavy. I'm here.", "I'm sorry. Want to talk about it?", "Rough one, huh? Sit with me a bit."],
    ["Come here. Tell me about it.", "That's not fair on you. I'm listening.", "I've got you. Talk."],
    ["Come here. Let me look after you.", "I'll keep you company through it.", "You don't have to carry that alone."],
    ["Come here. I'll take your mind off it.", "Let me distract you. I'm good at that.", "I can think of a few cures for that."],
    ["Come here. I'll make you forget the whole day.", "Let me take care of you. Properly.", "Forget it for a bit. I'll help."],
  ],
  yesNo: [
    ["Alright then.", "Fair enough.", "Noted."],
    ["Mm. Go on.", "Alright — and?", "That's it? Say more."],
    ["Mmh. Elaborate.", "That's not enough words for me.", "Come on. More than that."],
    ["Ohh, don't go quiet on me now.", "One word? Cruel.", "More. I want more than that."],
    ["Words. Please. More of them.", "Don't leave me hanging like that.", "You can do better than one word."],
  ],
  question: [
    ["Good question. What do you think?", "Hmm. Tell me more first.", "I'd need more than that to answer."],
    ["Ooh, curious tonight. Go on.", "Depends. What are you really asking?", "Hmm — say more and I'll answer."],
    ["Mmh. Ask me the thing you actually want to ask.", "You're circling something. Out with it.", "Try that again, but honestly."],
    ["Ohh, ask me the real question.", "You're being coy. I'm not.", "Say what you mean."],
    ["Just ask me. I'll say yes.", "Whatever it is — yes.", "Ask me properly and find out."],
  ],
  chatter: [
    ["Mm. Go on.", "I'm listening.", "Tell me more."],
    ["Ooh, go on then.", "I'm with you. Keep going.", "And? Don't stop there."],
    ["Mmh, keep talking. I like this.", "Go on — you have my full attention.", "More of that, please."],
    ["Ohh, you have all of my attention now.", "Keep going. Please keep going.", "Don't stop, I'm enjoying this."],
    ["Keep talking. I need the sound of you.", "Ngh — more. Anything. Keep going.", "Don't stop now, not now."],
  ],
};

/** The emotion each intent wears, per tier. */
const REPLY_MOODS: Record<Intent, readonly LibbyEmotion[]> = {
  greeting: ["happy", "happy", "mischievous", "mischievous", "mischievous"],
  howAreYou: ["happy", "happy", "thinking", "mischievous", "mischievous"],
  compliment: ["happy", "happy", "mischievous", "surprised", "mischievous"],
  flirt: ["surprised", "mischievous", "mischievous", "mischievous", "mischievous"],
  thanks: ["happy", "happy", "mischievous", "mischievous", "mischievous"],
  bye: ["thinking", "thinking", "thinking", "thinking", "mischievous"],
  aboutHer: ["happy", "happy", "mischievous", "mischievous", "mischievous"],
  aboutLibrary: ["thinking", "happy", "mischievous", "mischievous", "mischievous"],
  help: ["thinking", "thinking", "mischievous", "mischievous", "mischievous"],
  sad: ["thinking", "thinking", "thinking", "mischievous", "mischievous"],
  yesNo: ["thinking", "thinking", "mischievous", "mischievous", "mischievous"],
  question: ["thinking", "thinking", "mischievous", "mischievous", "mischievous"],
  chatter: ["neutral", "happy", "mischievous", "mischievous", "mischievous"],
};

/** Occasional mode-flavoured tails, so the four channels don't read alike. */
const MODE_TAILS: Record<string, readonly string[]> = {
  sweet: ["", "", "", " I'm glad you're here.", " No rush, either."],
  playful: ["", "", " Your turn.", " Don't make me come get you.", " Try to keep up."],
  bold: ["", "", " I'm not going to pretend otherwise.", " I'd rather be blunt with you.", " Say the word."],
  roleplay: ["", "", " *she leans in*", " *she watches you closely*", " *she shifts, restless*"],
};

function detectIntent(text: string): Intent {
  for (const rule of INTENT_RULES) if (rule.test.test(text)) return rule.intent;
  return "chatter";
}

/**
 * How far this message should move the horniness meter. Mode sets the floor;
 * suggestive wording pushes harder, and asking her to cool it walks it back.
 */
export function libbyHeatDelta(text: string, mode: string): number {
  if (/\b(calm down|behave|slow down|cool it|stop|not now|later)\b/i.test(text)) return -1;
  const base = MODE_HEAT[mode] ?? 0;
  const spicy = INTENT_RULES.find((r) => r.intent === "flirt")!.test.test(text);
  return base + (spicy ? 1 : 0);
}

/**
 * Libby's reply with no model behind her: an intent read off the message, then a
 * line from that intent's pool at the current heat, with a mode-flavoured tail.
 * The returned intensity is the meter *after* this exchange — callers should
 * store it (see setIntensity) so her art and her next line agree.
 */
export function libbyReply(text: string, mode: string, emotion: string, intensity: number): LibbyLine {
  const nextIntensity = normalizeIntensity(intensity + libbyHeatDelta(text, mode));
  const intent = detectIntent(text.trim());
  const body = pick(`reply:${intent}:${nextIntensity}`, tier(REPLIES[intent], nextIntensity));
  const tail = pick(`tail:${mode}:${nextIntensity}`, [
    "",
    (MODE_TAILS[mode] ?? MODE_TAILS.sweet)[nextIntensity - 1] ?? "",
  ]);
  // A hand-picked emotion the user set stays honoured unless the pool disagrees
  // strongly; otherwise the intent decides how she looks.
  const wanted = normalizeEmotion(emotion);
  const fromIntent = REPLY_MOODS[intent][nextIntensity - 1];
  const chosen: LibbyEmotion =
    wanted !== "neutral" && LIBBY_EMOTIONS.includes(wanted) && intent === "chatter" ? wanted : fromIntent;
  return { message: (body + tail).trim(), emotion: chosen, intensity: nextIntensity };
}

/** The line she opens a fresh chat with. */
export function libbyOpener(mode: string, intensity = getIntensity()): LibbyLine {
  const line = libbyReact("greeting", { intensity });
  const tail = (MODE_TAILS[mode] ?? MODE_TAILS.sweet)[normalizeIntensity(intensity) - 1] ?? "";
  return { ...line, message: (line.message + tail).trim() };
}
