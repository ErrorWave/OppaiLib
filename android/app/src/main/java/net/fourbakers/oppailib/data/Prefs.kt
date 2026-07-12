package net.fourbakers.oppailib.data

import android.content.Context
import android.content.SharedPreferences
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey

/**
 * Encrypted local settings: server URL, session token, and the biometric-lock
 * flag. Backed by Jetpack Security's EncryptedSharedPreferences (AES-256), so
 * the token is not stored in plaintext on the device.
 */
class Prefs(context: Context) {
    private val sp: SharedPreferences = run {
        val key = MasterKey.Builder(context)
            .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
            .build()
        EncryptedSharedPreferences.create(
            context,
            "oppai_secure_prefs",
            key,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM,
        )
    }

    var serverUrl: String?
        get() = sp.getString(KEY_SERVER, null)
        set(v) = sp.edit().putString(KEY_SERVER, v).apply()

    var token: String?
        get() = sp.getString(KEY_TOKEN, null)
        set(v) = sp.edit().putString(KEY_TOKEN, v).apply()

    var biometricLock: Boolean
        get() = sp.getBoolean(KEY_BIOMETRIC, false)
        set(v) = sp.edit().putBoolean(KEY_BIOMETRIC, v).apply()

    // ── video ────────────────────────────────────────────────────────────

    /** How the frame fills the screen. See [VideoFit]. */
    var videoFit: VideoFit
        get() = VideoFit.from(sp.getString(KEY_VIDEO_FIT, null))
        set(v) = sp.edit().putString(KEY_VIDEO_FIT, v.id).apply()

    var videoAutoplay: Boolean
        get() = sp.getBoolean(KEY_VIDEO_AUTOPLAY, true)
        set(v) = sp.edit().putBoolean(KEY_VIDEO_AUTOPLAY, v).apply()

    var videoLoop: Boolean
        get() = sp.getBoolean(KEY_VIDEO_LOOP, true)
        set(v) = sp.edit().putBoolean(KEY_VIDEO_LOOP, v).apply()

    var videoMuted: Boolean
        get() = sp.getBoolean(KEY_VIDEO_MUTED, false)
        set(v) = sp.edit().putBoolean(KEY_VIDEO_MUTED, v).apply()

    var videoSpeed: Float
        get() = sp.getFloat(KEY_VIDEO_SPEED, 1f)
        set(v) = sp.edit().putFloat(KEY_VIDEO_SPEED, v).apply()

    /**
     * How many seconds of video to read ahead of the playhead. Bigger rides out a
     * bad connection at the cost of memory (and of data pulled for a clip you might
     * swipe straight past).
     */
    var bufferSeconds: Int
        get() = sp.getInt(KEY_BUFFER_AHEAD, DEFAULT_BUFFER_SECONDS).coerceIn(MIN_BUFFER_SECONDS, MAX_BUFFER_SECONDS)
        set(v) = sp.edit().putInt(KEY_BUFFER_AHEAD, v.coerceIn(MIN_BUFFER_SECONDS, MAX_BUFFER_SECONDS)).apply()

    /**
     * Whether already-played video is kept in memory so seeking backwards replays
     * from the buffer instead of refetching it.
     */
    var keepBackBuffer: Boolean
        get() = sp.getBoolean(KEY_BACK_BUFFER, true)
        set(v) = sp.edit().putBoolean(KEY_BACK_BUFFER, v).apply()

    /** How the library grid is ordered. See [SortMode]. */
    var sortMode: SortMode
        get() = SortMode.from(sp.getString(KEY_SORT, null))
        set(v) = sp.edit().putString(KEY_SORT, v.id).apply()

    // ── comics ───────────────────────────────────────────────────────────

    /** Manga order: page 1 on the right, and you swipe right-to-left to advance. */
    var comicRtl: Boolean
        get() = sp.getBoolean(KEY_COMIC_RTL, false)
        set(v) = sp.edit().putBoolean(KEY_COMIC_RTL, v).apply()

    /** Last page read in a comic, 1-based, so reopening it resumes where you left off. */
    fun comicPage(id: Long): Int = sp.getInt("$KEY_COMIC_PAGE$id", 1)

    fun setComicPage(id: Long, page: Int) {
        sp.edit().putInt("$KEY_COMIC_PAGE$id", page).apply()
    }

    fun clearSession() {
        sp.edit().remove(KEY_TOKEN).apply()
    }

    companion object {
        const val DEFAULT_BUFFER_SECONDS = 30
        const val MIN_BUFFER_SECONDS = 10
        const val MAX_BUFFER_SECONDS = 120

        private const val KEY_SERVER = "server_url"
        private const val KEY_TOKEN = "token"
        private const val KEY_BIOMETRIC = "biometric_lock"
        private const val KEY_COMIC_RTL = "comic_rtl"
        private const val KEY_COMIC_PAGE = "comic_page_"
        private const val KEY_VIDEO_FIT = "video_fit"
        private const val KEY_VIDEO_AUTOPLAY = "video_autoplay"
        private const val KEY_VIDEO_LOOP = "video_loop"
        private const val KEY_VIDEO_MUTED = "video_muted"
        private const val KEY_VIDEO_SPEED = "video_speed"
        private const val KEY_BUFFER_AHEAD = "video_buffer_seconds"
        private const val KEY_BACK_BUFFER = "video_back_buffer"
        private const val KEY_SORT = "sort_mode"
    }
}

/**
 * How the library grid is ordered. Sorting is client-side: the app already holds the
 * whole library so search can run locally, and the server offers no ordering beyond
 * newest-first — so there is nothing to gain by making it a round trip.
 */
enum class SortMode(val id: String, val label: String) {
    NEWEST("newest", "Newest first"),
    OLDEST("oldest", "Oldest first"),
    TITLE("title", "Title (A–Z)"),
    LARGEST("largest", "Largest first"),
    SMALLEST("smallest", "Smallest first"),
    ;

    companion object {
        fun from(id: String?): SortMode = entries.firstOrNull { it.id == id } ?: NEWEST
    }
}

/**
 * How a video is scaled into the screen. Mirrors media3's resize modes, but named
 * for what the viewer sees rather than for the layout mechanic underneath.
 */
enum class VideoFit(val id: String, val label: String, val description: String) {
    FIT("fit", "Fit", "Whole frame visible, letterboxed if it doesn't match the screen"),
    FILL("fill", "Stretch", "Frame stretched to the screen, ignoring its aspect ratio"),
    ZOOM("zoom", "Fill screen", "Frame cropped to fill the screen, keeping its shape"),
    ;

    companion object {
        fun from(id: String?): VideoFit = entries.firstOrNull { it.id == id } ?: FIT
    }
}
