package net.fourbakers.oppailib.data

import android.content.Context
import coil.ImageLoader
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.OkHttpClient
import okhttp3.RequestBody.Companion.asRequestBody
import okhttp3.RequestBody.Companion.toRequestBody
import retrofit2.Retrofit
import retrofit2.converter.kotlinx.serialization.asConverterFactory
import java.io.File

/**
 * Single source of truth for network + session. Rebuilds the API client (and a
 * matching Coil image loader that carries the auth header) whenever the server
 * URL changes. Held as a process-wide singleton by [net.fourbakers.oppailib.OppaiApp].
 */
class Repository(private val appContext: Context, val prefs: Prefs) {

    private val json = Json { ignoreUnknownKeys = true }

    @Volatile private var baseUrl: String = normalize(prefs.serverUrl ?: "http://10.0.2.2:8080/")
    @Volatile lateinit var api: ApiService
        private set
    @Volatile lateinit var imageLoader: ImageLoader
        private set

    init { rebuild() }

    val hasSession: Boolean get() = prefs.token != null

    fun setServer(url: String) {
        baseUrl = normalize(url)
        prefs.serverUrl = baseUrl
        rebuild()
    }

    fun streamUrl(id: Long): String = "${baseUrl}api/media/$id/stream"

    fun saveSession(token: String) { prefs.token = token }
    fun clearSession() { prefs.clearSession() }

    // ── client construction ──────────────────────────────────────────────

    private fun okHttp(): OkHttpClient =
        OkHttpClient.Builder()
            .addInterceptor { chain ->
                val req = chain.request().newBuilder()
                prefs.token?.let { req.header("Authorization", "Bearer $it") }
                chain.proceed(req.build())
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
        imageLoader = ImageLoader.Builder(appContext).okHttpClient(client).build()
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
        private fun normalize(url: String): String {
            var u = url.trim()
            if (!u.startsWith("http://") && !u.startsWith("https://")) u = "http://$u"
            if (!u.endsWith("/")) u += "/"
            return u
        }
    }
}
