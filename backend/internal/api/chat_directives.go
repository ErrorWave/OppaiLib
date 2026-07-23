package api

import (
	"regexp"
	"strings"
)

// The net under the protocol parsers.
//
// A reply carries control tags the user is never meant to read: [mood: …] picks the
// face, [send: …] picks a picture, [link: …] points at the library. splitMood,
// splitPhotoRequest and resolveLibraryLinks take those off — but each of them is
// anchored to the end of the reply, because that is where the prompt asks for them
// and because an anchored pattern cannot eat a line of prose that merely looks like
// a tag.
//
// Models do not stay inside that shape. They put the mood tag in the middle, emit it
// twice, wrap it in emphasis, or drop the brackets entirely and narrate the machinery
// as a stage direction — "*sending you a picture*", "*progressing mood to 4*",
// "*changes mood: mischievous*". None of that is dialogue. It is the plumbing being
// read out loud, and it is the single most immersion-breaking thing she does.
//
// So: the anchored parsers still *decide* (they own which mood and which picture,
// and only a well-formed trailing tag should be trusted with that), and everything
// below is deletion only. Nothing here changes what she feels or sends; it only stops
// the user from seeing how it was requested.

// strayTag matches a bracketed control tag anywhere in a reply. Restricted to the
// verbs the protocol actually defines plus the words models substitute for them, so
// bracketed prose ("[laughs]", "[1]") survives untouched.
//
// Bounded to one line and 120 characters: a tag is short by construction, and an
// unbounded match across a paragraph would swallow real writing between two brackets.
var strayTag = regexp.MustCompile(`(?i)[*_~` + "`" + `]{0,2}\[\s*(?:` +
	`mood|emotion|feeling|expression|face|pose|intensity|horniness|heat|meter` +
	`|send|sends|sending|show|shows|showing|attach|attaches|attaching` +
	`|photo|photos|pic|pics|picture|pictures|image|images|selfie|selfies` +
	`)\b[^\]\n]{0,120}\]` + "[*_~`]{0,2}")

// wrappedSpan finds the emphasis and parenthesis forms a stage direction is written
// in: *…*, **…**, _…_, (…). Each is capped at one line and 160 characters, which is
// longer than any of these ever are and short enough that a mismatched delimiter
// cannot run away with a paragraph.
//
// Deliberately *not* a filter on emphasis as such. Italic action lines are how she
// writes — "*leans in*" is her voice and must survive. Only spans whose content is
// about the app's own machinery are removed, which machineryPhrase decides.
var wrappedSpan = regexp.MustCompile(`(?i)(\*\*|\*|__|_)([^*_\n]{1,160}?)(\*\*|\*|__|_)|\(([^()\n]{1,160}?)\)`)

// machineryPhrase recognises a stage direction that is narrating the protocol rather
// than the scene.
//
// Three families, which is all of what has actually been seen leaking:
//   - a bare mood readout: "mood: happy 3", "emotion — mischievous"
//   - sending a picture as an announced act: "sending you a photo", "attaches an image"
//   - moving the meter: "progressing mood to 4", "changes her mood", "raising intensity"
//
// Anchored at the start of the span so it classifies what the direction *is about*.
// A sentence that merely mentions a picture in passing ("*I look at the photo*") does
// not begin with the verb, and is left alone.
var machineryPhrase = regexp.MustCompile(`(?i)^\s*(?:` +
	// "mood: happy 3" / "intensity 4" — a label plus a value, not a sentence.
	`(?:current\s+|displayed\s+|new\s+)?(?:mood|emotion|feeling|expression|intensity|horniness|heat)\s*(?:[:=—–-]|\bis\b|\bto\b)\s*\S` +
	// Announcing an attachment.
	`|(?:i\s+am\s+|i'?m\s+|she\s+)?(?:send|sends|sending|sent|attach|attaches|attaching|attached|share|shares|sharing|shared|show|shows|showing|showed|posts?|posting|uploads?|uploading)\b[^\n]{0,60}?\b(?:photo|photos|pic|pics|picture|pictures|image|images|selfie|selfies|nude|nudes)\b` +
	// A picture referred to as a delivered artifact.
	`|(?:photo|picture|pic|image|selfie)\s+(?:sent|attached|shown|shared|delivered|enclosed)\b` +
	// Moving the meter.
	`|(?:progress|progresses|progressing|advance\w*|change|changes|changing|shift\w*|updat\w*|increas\w*|rais\w*|lower\w*|bump\w*|set|setting|adjust\w*)\b[^\n]{0,40}?\b(?:mood|emotion|feeling|expression|intensity|horniness|heat|meter|tier|level)\b` +
	`)`)

// looseMoodTag and looseSendTag are the unanchored twins of moodTag and sendTag.
//
// They exist so a tag that landed in the wrong place still *counts*. Scrubbing alone
// would delete a mid-reply "[mood: mischievous 4]" and leave the face on whatever it
// was already showing — which is the same stuck-mood bug as before, just without the
// visible tag. Read here, deleted by scrubDirectives afterwards.
//
// They are consulted only when the anchored parse found nothing, so a well-formed
// trailing tag always wins over a stray one earlier in the text.
var (
	looseMoodTag = regexp.MustCompile(`(?i)\[\s*mood\s*[:=-]?\s*([^\]\d]{0,60}?)\s*[,;:/|-]?\s*(\d{1,2})?\s*\]`)
	looseSendTag = regexp.MustCompile(`(?i)\[\s*(?:send|show|photo|pic|image|attach)\s*[:=-]?\s*([^\]\n]{1,200}?)\s*\]`)
)

// findLooseMood reads a mood tag from anywhere in a reply. The last one wins: a model
// that emits several is revising, and the final one is where it landed.
func findLooseMood(reply string) (emotion string, intensity int, ok bool) {
	matches := looseMoodTag.FindAllStringSubmatch(reply, -1)
	if len(matches) == 0 {
		return "", 0, false
	}
	last := matches[len(matches)-1]
	if emotion = canonicalMood(last[1]); emotion == "" {
		return "", 0, false
	}
	intensity = atoiClamped(last[2], 0, 5)
	return emotion, intensity, true
}

// findLoosePhotoRequest reads a picture request from anywhere in a reply. The first
// one wins here, unlike the mood: a second [send: …] is a model repeating itself, and
// only one picture can be attached to a reply anyway.
func findLoosePhotoRequest(reply string) (request string, ok bool) {
	match := looseSendTag.FindStringSubmatch(reply)
	if match == nil {
		return "", false
	}
	if request = strings.TrimSpace(match[1]); request == "" {
		return "", false
	}
	return request, true
}

// atoiClamped parses a small non-negative integer, returning lo for anything
// unreadable and capping at hi. Clamping rather than rejecting mirrors splitMood: a
// model told to pick 1-5 that answers 9 means "as much as possible".
func atoiClamped(s string, lo, hi int) int {
	n := 0
	for _, r := range s {
		if r < '0' || r > '9' {
			return lo
		}
		n = n*10 + int(r-'0')
		if n > hi {
			return hi
		}
	}
	if s == "" {
		return lo
	}
	return n
}

// blankLineRun collapses the gaps deletion leaves behind.
var blankLineRun = regexp.MustCompile(`\n{3,}`)

// spaceRun collapses the double spaces left where a mid-sentence tag was removed.
var spaceRun = regexp.MustCompile(`[ \t]{2,}`)

// danglingSpace tidies punctuation that ends up separated from its word.
var danglingSpace = regexp.MustCompile(`[ \t]+([,.!?;:])`)

// scrubDirectives removes every control tag and machinery stage direction left in a
// reply, and tidies the seams.
//
// Returns the original text unchanged if scrubbing would empty it: a reply that was
// nothing but tags is a backend problem the caller reports as "no message", and
// handing it back blank turns a diagnosable failure into a silent one.
func scrubDirectives(reply string) string {
	cleaned := strayTag.ReplaceAllString(reply, "")
	cleaned = wrappedSpan.ReplaceAllStringFunc(cleaned, func(span string) string {
		inner := span
		// Strip whichever wrapper matched. Parentheses and emphasis are separate
		// alternatives in the pattern, so exactly one of these applies.
		if strings.HasPrefix(inner, "(") {
			inner = strings.TrimSuffix(strings.TrimPrefix(inner, "("), ")")
		} else {
			inner = strings.Trim(inner, "*_")
		}
		if machineryPhrase.MatchString(inner) {
			return ""
		}
		return span
	})
	cleaned = spaceRun.ReplaceAllString(cleaned, " ")
	cleaned = danglingSpace.ReplaceAllString(cleaned, "$1")
	// Trim the trailing spaces deletion leaves at line ends before collapsing runs,
	// or a line that is now only whitespace does not read as blank.
	lines := strings.Split(cleaned, "\n")
	for i, line := range lines {
		lines[i] = strings.TrimRight(line, " \t")
	}
	cleaned = blankLineRun.ReplaceAllString(strings.Join(lines, "\n"), "\n\n")
	cleaned = strings.TrimSpace(cleaned)
	if cleaned == "" {
		return reply
	}
	return cleaned
}
