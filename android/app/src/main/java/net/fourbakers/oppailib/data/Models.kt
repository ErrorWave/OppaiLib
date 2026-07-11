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
    val tags: List<MediaTag> = emptyList(),
    val createdAt: Long = 0,
    val updatedAt: Long = 0,
)

@Serializable
data class User(val id: Long, val username: String, val isAdmin: Boolean = false)

@Serializable
data class LoginRequest(val username: String, val password: String)

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
