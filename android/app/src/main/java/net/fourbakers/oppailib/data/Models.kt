package net.fourbakers.oppailib.data

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class MediaTag(
    val id: Long = 0,
    val name: String,
    val category: String = "general",
    val source: String? = null,
    val score: Double? = null,
)

@Serializable
data class Media(
    val id: Long,
    val kind: String,
    val sha256: String,
    val size: Long,
    val title: String = "",
    val notes: String? = null,
    val source: String? = null,
    val rating: Int = 0,
    val favorite: Boolean = false,
    val duration: Double? = null,
    val width: Int? = null,
    val height: Int? = null,
    val pageCount: Int? = null,
    val hasThumb: Boolean = false,
    /** Where to actually get a game — usually its store page. */
    val download: String? = null,
    /** Screenshot URLs for a game. They live on the origin site, not on us. */
    val gallery: List<String> = emptyList(),
    val tags: List<MediaTag> = emptyList(),
    val createdAt: Long = 0,
    val updatedAt: Long = 0,
) {
    /**
     * The platforms the scraper found, lowercased. Filed as their own tag category,
     * so this is a fact about the release and not a guess from a general tag that
     * might just be describing the subject matter.
     */
    val platforms: List<String>
        get() = tags.filter { it.category == "platform" }.map { it.name.lowercase() }

    /**
     * Null when the source never told us — which is not the same as "no". Games
     * imported before the scraper learned to read platforms have no platform tags
     * at all, and claiming those don't run on Android would be a lie.
     */
    val runsOnAndroid: Boolean?
        get() = if (platforms.isEmpty()) null else "android" in platforms
}

/**
 * Whether a comic's archive can be paged through in-app, and how many pages it
 * holds. [reason] carries the server's explanation when it can't be opened (an
 * unsupported archive format, say) so the reader can show it instead of a blank.
 */
@Serializable
data class ComicInfo(
    val readable: Boolean = false,
    val pages: Int = 0,
    val reason: String? = null,
)

/**
 * An edit to one item. Every field is nullable and defaults to null, and the Json
 * encoder omits defaults — so a patch carries only what the user actually touched,
 * and the server leaves the rest of the row alone. Sending `favorite = false` still
 * writes, because false differs from the null default.
 */
@Serializable
data class MediaPatch(
    val title: String? = null,
    val notes: String? = null,
    /** Stars, 0–5. Zero means unrated; the server clamps anything out of range. */
    val rating: Int? = null,
    val favorite: Boolean? = null,
    val addTags: List<String> = emptyList(),
    val removeTags: List<String> = emptyList(),
)

/** [action] is "delete" or "update"; [patch] is ignored for a delete. */
@Serializable
data class BulkRequest(
    val action: String,
    val ids: List<Long>,
    val patch: MediaPatch = MediaPatch(),
)

/**
 * Which ids the server actually applied the action to. One bad id doesn't sink the
 * batch, so the two lists are how the caller learns a partial result happened.
 */
@Serializable
data class BulkResponse(
    val ok: List<Long> = emptyList(),
    val failed: List<Long> = emptyList(),
)

@Serializable
data class KindStat(val kind: String, val count: Long = 0, val bytes: Long = 0)

@Serializable
data class Stats(
    val kinds: List<KindStat> = emptyList(),
    val items: Long = 0,
    val bytes: Long = 0,
    val tags: Long = 0,
)

@Serializable
data class PasswordRequest(
    val current: String,
    @SerialName("new") val newPassword: String,
)

/**
 * The APK this server is offering. [available] is false when the image was built
 * without one.
 *
 * There is no version number here, and that's deliberate: the server holds a file,
 * not a release manifest, and an operator can drop their own build into /config. So
 * the app decides whether an update is on offer by comparing [sha256] against the
 * hash of the APK it is itself running — a build that differs is a build worth
 * offering, and after installing it the two hashes agree and the offer goes away.
 */
@Serializable
data class ApkInfo(
    val available: Boolean = false,
    val size: Long = 0,
    val sha256: String = "",
    val modified: Long = 0,
    val filename: String = "oppailib.apk",
)

@Serializable
data class User(val id: Long, val username: String, val isAdmin: Boolean = false)

/**
 * [client] identifies this as the phone app rather than a browser.
 *
 * It is load-bearing, not decoration: the server idles browser sessions out after an
 * hour and drops them when it restarts. A phone is a device you own and signed in on
 * once — there is nobody at the keyboard to re-authenticate it — so the app says who
 * it is and the server exempts it from both rules.
 */
@Serializable
data class LoginRequest(
    val username: String,
    val password: String,
    val client: String = "android",
)

@Serializable
data class LoginResponse(val token: String, val user: User)

@Serializable
data class MediaListResponse(val items: List<Media> = emptyList())

@Serializable
data class UploadResponse(val id: Long, val sha256: String, val deduped: Boolean)

@Serializable
data class AutotagResponse(val tags: List<MediaTag> = emptyList())

@Serializable
data class HealthResponse(
    val status: String,
    val aiEnabled: Boolean = false,
    val aiTagger: String = "",
)

@Serializable
data class ChatMessage(val role: String, val content: String)

@Serializable
data class ChatRequest(val mode: String, val messages: List<ChatMessage>)

@Serializable
data class ChatResponse(val message: String)

@Serializable
data class ChatStatus(
    val enabled: Boolean = false,
    val model: String = "",
    val modes: List<String> = emptyList(),
)

// ── image generation ─────────────────────────────────────────────────────────
// Mirrors the web client's shapes: /api/imagegen/status lists what the generator
// offers, /generate returns in-memory preview ids, /save files one into the library.

@Serializable
data class GenModel(
    val title: String,
    @SerialName("model_name") val modelName: String = "",
    val base: String = "",
    val defaults: GenModelDefaults? = null,
)

/** The generator's recommended settings for a model; applied when it's picked. */
@Serializable
data class GenModelDefaults(
    val steps: Int = 0,
    val cfgScale: Double = 0.0,
    val scheduler: String = "",
    val width: Int = 0,
    val height: Int = 0,
    val vae: String = "",
)

@Serializable
data class GenLora(val name: String, val alias: String = "")

@Serializable
data class GenVae(val key: String, val name: String, val base: String = "")

/** A prompt template (InvokeAI style preset); `prompt` may contain "{prompt}". */
@Serializable
data class GenTemplate(
    val id: String,
    val name: String,
    val prompt: String = "",
    val negativePrompt: String = "",
)

@Serializable
data class GenCharacter(
    val id: String,
    val name: String,
    val prompt: String = "",
    val negativePrompt: String = "",
    val hasThumb: Boolean = false,
)

@Serializable
data class GenCharacterListResponse(val characters: List<GenCharacter> = emptyList())

@Serializable
data class ImageGenStatus(
    val enabled: Boolean = false,
    val reachable: Boolean = false,
    val backend: String = "",
    val error: String = "",
    val models: List<GenModel> = emptyList(),
    val loras: List<GenLora> = emptyList(),
    val vaes: List<GenVae> = emptyList(),
    val templates: List<GenTemplate> = emptyList(),
)

@Serializable
data class GenLoraPick(val name: String, val weight: Double)

@Serializable
data class GenerateRequest(
    val prompt: String,
    val negativePrompt: String = "",
    val checkpoint: String = "",
    val vae: String = "",
    val sampler: String = "",
    val steps: Int = 25,
    val width: Int = 512,
    val height: Int = 768,
    val cfgScale: Double = 7.0,
    val seed: Long = -1,
    val count: Int = 1,
    val loras: List<GenLoraPick> = emptyList(),
)

@Serializable
data class GenPreview(val id: String, val seed: Long = 0)

@Serializable
data class GenerateResponse(val images: List<GenPreview> = emptyList(), val prompt: String = "")

@Serializable
data class GenSaveRequest(val id: String, val title: String = "", val tags: List<String> = emptyList())

@Serializable
data class GenSaveResponse(val id: Long, val existed: Boolean = false)

@Serializable
data class UrlRequest(val url: String)

/** A tag the site's parser filed under a taxonomy (artist, character, parody, …). */
@Serializable
data class ScrapedTag(
    val name: String = "",
    val category: String = "general",
)

@Serializable
data class ScrapeResult(
    val title: String = "",
    val description: String = "",
    val tags: List<String> = emptyList(),
    val performers: List<String> = emptyList(),
    val mediaUrls: List<String> = emptyList(),
    val sourceUrl: String = "",
    val kind: String = "image",
    // Only populated by parsers that categorize. `tags` still holds the flat union
    // of every tag, so display can ignore this — but the import has to send it
    // back, since the server doesn't re-fetch the page when we supply mediaUrls.
    val categorizedTags: List<ScrapedTag> = emptyList(),
)

@Serializable
data class ScrapeImportRequest(
    val url: String? = null,
    val mediaUrls: List<String> = emptyList(),
    val title: String? = null,
    val tags: List<String> = emptyList(),
    val categorizedTags: List<ScrapedTag> = emptyList(),
)

@Serializable
data class ImportResponse(val imported: List<Long> = emptyList(), val count: Int = 0)

// ── remote sources ───────────────────────────────────────────────────────────

/** One ordering a feed offers. The first is the default. */
@Serializable
data class SourceSort(val id: String, val label: String)

/**
 * One browsable listing inside a source: a board, a category, a search.
 *
 * [query] marks a feed that needs a search term — the UI shows a search box for it
 * rather than browsing it blindly, since a term-less search is an error upstream, not
 * an empty page.
 */
@Serializable
data class SourceFeed(
    val id: String,
    val label: String,
    val query: Boolean = false,
    val sorts: List<SourceSort> = emptyList(),
)

@Serializable
data class RemoteSource(
    val id: String,
    val name: String,
    val feeds: List<SourceFeed> = emptyList(),
)

@Serializable
data class SourceListResponse(val sources: List<RemoteSource> = emptyList())

/**
 * An item that lives on the remote source and is *not* in the library. Every URL on
 * it is remote — the app never fetches them directly, it asks the server to proxy
 * them (see [Repository.sourceStreamUrl]).
 */
@Serializable
data class SourceItem(
    val id: String,
    val title: String = "",
    val kind: String = "image",
    val thumbUrl: String = "",
    val mediaUrl: String = "",
    val pageUrl: String = "",
    /**
     * Set when the item is a *container* — a 4chan thread — rather than a file. The
     * tile stands for a set, so opening it browses [feedId] instead of putting the
     * OP's image in the viewer.
     */
    val feedId: String = "",
    /**
     * The discussion this item was posted in, for sources that have one. A file from a
     * 4chan thread carries its thread's id, which is all the viewer needs to pull up
     * the conversation around the image on screen.
     */
    val threadId: String = "",
    /** This item's own post in that thread, so its comment can be marked in the list. */
    val postNo: Long = 0,
    /** How many files a container holds. Zero on anything else. */
    val count: Int = 0,
    val width: Int = 0,
    val height: Int = 0,
) {
    val isContainer: Boolean get() = feedId.isNotEmpty()

    /** Whether there is a conversation to show for this item. */
    val hasComments: Boolean get() = threadId.isNotEmpty()
}

/** [cursor] is opaque; empty means there is nothing after this page. */
@Serializable
data class SourceListing(
    val items: List<SourceItem> = emptyList(),
    val cursor: String = "",
)

@Serializable
data class SourcePagesResponse(val pages: List<String> = emptyList(), val count: Int = 0)

/**
 * One post in a source's discussion thread.
 *
 * Flat rather than nested: a 4chan post quotes by number and can quote several posts
 * at once, so the conversation is a graph. [quotes] carries those numbers and the list
 * renders in post order — which is how the site itself shows a thread.
 */
@Serializable
data class SourceComment(
    val no: Long = 0,
    val time: Long = 0,
    val name: String = "",
    val subject: String = "",
    val text: String = "",
    val thumbUrl: String = "",
    val mediaUrl: String = "",
    /**
     * The post's upload described as an item — the same [SourceItem.kind] vocabulary,
     * and the id the feed knows that file by. Both empty when the post has no file.
     *
     * 4chan renders a JPEG thumbnail for everything, so [thumbUrl] alone can't tell a
     * webm from a photo: [kind] is how a video gets a play badge, and [itemId] is how
     * tapping it lands on that exact item rather than something that looks like it.
     */
    val kind: String = "",
    val itemId: String = "",
    val quotes: List<Long> = emptyList(),
    val op: Boolean = false,
)

@Serializable
data class SourceCommentsResponse(
    val comments: List<SourceComment> = emptyList(),
    val count: Int = 0,
)

@Serializable
data class SourceSaveRequest(
    val mediaUrl: String? = null,
    val itemId: String? = null,
    val pageUrl: String? = null,
    val title: String? = null,
    val kind: String? = null,
    val tags: List<String> = emptyList(),
)
