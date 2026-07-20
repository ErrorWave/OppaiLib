package net.fourbakers.oppailib.data

import android.content.Context
import coil.ImageLoader
import coil.decode.GifDecoder
import coil.decode.ImageDecoderDecoder
import android.os.Build
import kotlinx.serialization.json.Json
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.CancellationException
import java.util.concurrent.TimeUnit
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.OkHttpClient
import okhttp3.RequestBody.Companion.asRequestBody
import okhttp3.RequestBody.Companion.toRequestBody
import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import retrofit2.Retrofit
import java.io.File
import java.net.URLEncoder

/**
 * Single source of truth for network + session. Rebuilds the API client (and a
 * matching Coil image loader that carries the auth header) whenever the server
 * URL changes. Held as a process-wide singleton by [net.fourbakers.oppailib.OppaiApp].
 */
class Repository(private val appContext: Context, val prefs: Prefs) {

    private val json = Json { ignoreUnknownKeys = true }
    private val _errors = MutableSharedFlow<String>(extraBufferCapacity = 8)
    val errors = _errors.asSharedFlow()

    @Volatile private var baseUrl: String = normalize(prefs.serverUrl ?: "http://10.0.2.2:8080/")
    @Volatile lateinit var api: ApiService
        private set
    @Volatile lateinit var imageLoader: ImageLoader
        private set

    init { rebuild() }

    val hasSession: Boolean get() = prefs.token != null
    val canBiometricReauth: Boolean get() = prefs.biometricLock && prefs.hasReauthCredential

    fun setServer(url: String) {
        baseUrl = normalize(url)
        prefs.serverUrl = baseUrl
        rebuild()
    }

    fun streamUrl(id: Long): String = "${baseUrl}api/media/$id/stream"

    /**
     * Poster URL. The server generates one for every kind it can (ffmpeg frame for
     * video, cover page for comics) and falls back to the blob itself for image/gif,
     * so tiles should always ask for this rather than streaming the full original.
     */
    fun thumbUrl(id: Long): String = "${baseUrl}api/media/$id/thumb"
    fun genPreviewUrl(id: String): String = "${baseUrl}api/imagegen/preview/${URLEncoder.encode(id, "UTF-8")}"
    fun characterImageUrl(id: Long): String = "${baseUrl}api/imagegen/characters/$id/image"

    /** A single comic page, 1-based to match what the reader shows the user. */
    fun pageUrl(id: Long, page: Int): String = "${baseUrl}api/media/$id/page/$page"

    /**
     * Fetches a remote image through the server. A game's screenshots live on the
     * site it was scraped from, and asking the phone to load them directly would
     * both leak the request and often be refused by the origin's hotlink rules.
     */
    fun proxyUrl(url: String): String =
        "${baseUrl}api/scrape/proxy?url=${URLEncoder.encode(url, "UTF-8")}"

    /**
     * Streams a remote source's media through the server, which forwards Range so a
     * video can be seeked. The server refuses any host that isn't a registered
     * source, so this can't be pointed at arbitrary URLs.
     */
    fun sourceStreamUrl(url: String): String =
        "${baseUrl}api/sources/stream?url=${URLEncoder.encode(url, "UTF-8")}"

    /**
     * The whole library (or one kind of it), walked a page at a time.
     *
     * There is no search endpoint: the list response carries each item's tags, and
     * clients filter over them locally. That only works if the client actually holds
     * the library, so search can't run against a single truncated first page — hence
     * walking to the end rather than taking [PAGE_SIZE] and stopping.
     */
    suspend fun listAll(kind: String?): List<Media> {
        val out = mutableListOf<Media>()
        while (out.size < MAX_ITEMS) {
            val batch = api.listMedia(kind, PAGE_SIZE, out.size).items
            out += batch
            if (batch.size < PAGE_SIZE) break
        }
        return out
    }

    fun saveSession(token: String) { prefs.token = token }
    fun clearSession() { prefs.clearSession() }

    fun saveReauthCredential(username: String, password: String) = prefs.saveReauthCredential(username, password)

    suspend fun closeSessionForReauth() {
        try { if (hasSession) api.logout() }
        catch (_: Exception) { /* local logout still wins if the server is unavailable */ }
        finally { prefs.clearActiveToken() }
    }

    suspend fun reauthenticate(): Boolean {
        val username = prefs.reauthUsername ?: return false
        val password = prefs.reauthPassword ?: return false
        return try {
            val response = api.login(LoginRequest(username, password))
            saveSession(response.token)
            true
        } catch (_: Exception) { false }
    }

    // ── client construction ──────────────────────────────────────────────

    private fun okHttp(): OkHttpClient =
        OkHttpClient.Builder()
            // OkHttp's default read timeout is 10 seconds, which is fine for every call
            // the app makes except the one that matters most: saving a comic from a
            // remote source. That downloads dozens of pages with a politeness delay
            // between them, sending nothing back until it's finished — so the socket
            // sits quiet for minutes and the default fires long before the answer comes.
            //
            // A long *read* timeout is safe: an unreachable server still fails fast on
            // connect, so this only extends the wait for a server that is connected and
            // busy. The server finishes the import even if we do give up on it.
            .connectTimeout(15, TimeUnit.SECONDS)
            .readTimeout(10, TimeUnit.MINUTES)
            .writeTimeout(5, TimeUnit.MINUTES)
            .addInterceptor { chain ->
                val req = chain.request().newBuilder()
                prefs.token?.let { req.header("Authorization", "Bearer $it") }
                try {
                    val response = chain.proceed(req.build())
                    if (!response.isSuccessful && response.code != 499 &&
                        !response.request.url.encodedPath.endsWith("/api/auth/login")) {
                        _errors.tryEmit("The server returned ${response.code}. Please try again.")
                    }
                    response
                } catch (e: Exception) {
                    val cancelled = e is CancellationException ||
                        e.message?.contains("cancel", ignoreCase = true) == true
                    if (!cancelled && !chain.request().url.encodedPath.endsWith("/api/auth/login")) {
                        _errors.tryEmit(e.message ?: "Couldn't reach the server.")
                    }
                    throw e
                }
            }
            .build()

    private fun rebuild() {
        val client = okHttp()
        val contentType = "application/json".toMediaTypeOrNull()!!
        api = Retrofit.Builder()
            .baseUrl(baseUrl)
            .client(client)
            .addConverterFactory(json.asConverterFactory(contentType))
            .build()
            .create(ApiService::class.java)
        imageLoader = ImageLoader.Builder(appContext)
            .okHttpClient(client)
            .components {
                if (Build.VERSION.SDK_INT >= 28) add(ImageDecoderDecoder.Factory())
                else add(GifDecoder.Factory())
            }
            .build()
    }

    // ── upload helper ────────────────────────────────────────────────────

    /** Builds a multipart part from a local file for [ApiService.upload]. */
    fun filePart(file: File, mime: String?): MultipartBody.Part {
        val body = file.asRequestBody(mime?.toMediaTypeOrNull())
        return MultipartBody.Part.createFormData("file", file.name, body)
    }

    fun titlePart(title: String?): okhttp3.RequestBody? =
        title?.toRequestBody("text/plain".toMediaTypeOrNull())

    companion object {
        /** The server's own ceiling: it quietly falls back to 50 for anything larger. */
        private const val PAGE_SIZE = 200
        private const val MAX_ITEMS = 2000

        private fun normalize(url: String): String {
            var u = url.trim()
            if (!u.startsWith("http://") && !u.startsWith("https://")) u = "http://$u"
            if (!u.endsWith("/")) u += "/"
            return u
        }
    }
}
