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
