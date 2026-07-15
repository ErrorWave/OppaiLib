package net.fourbakers.oppailib.data

import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Multipart
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.Part
import retrofit2.http.Path
import retrofit2.http.Query
import retrofit2.http.Streaming

interface ApiService {
    @GET("api/health")
    suspend fun health(): HealthResponse

    @GET("api/chat/status")
    suspend fun chatStatus(): ChatStatus

    @POST("api/chat")
    suspend fun chat(@Body body: ChatRequest): ChatResponse

    @POST("api/auth/login")
    suspend fun login(@Body body: LoginRequest): LoginResponse

    @GET("api/auth/me")
    suspend fun me(): User

    @POST("api/auth/logout")
    suspend fun logout()

    @GET("api/media")
    suspend fun listMedia(
        @Query("kind") kind: String? = null,
        @Query("limit") limit: Int = 60,
        @Query("offset") offset: Int = 0,
    ): MediaListResponse

    @GET("api/media/{id}")
    suspend fun getMedia(@Path("id") id: Long): Media

    /** Returns the item as it now stands, tags included — no need to re-fetch it. */
    @PATCH("api/media/{id}")
    suspend fun patchMedia(@Path("id") id: Long, @Body body: MediaPatch): Media

    /** One action over many ids. Capped at 500 by the server. */
    @POST("api/media/bulk")
    suspend fun bulkMedia(@Body body: BulkRequest): BulkResponse

    @GET("api/stats")
    suspend fun stats(): Stats

    @POST("api/auth/password")
    suspend fun changePassword(@Body body: PasswordRequest)

    @Multipart
    @POST("api/media")
    suspend fun upload(
        @Part file: MultipartBody.Part,
        @Part("title") title: RequestBody? = null,
    ): UploadResponse

    @POST("api/media/{id}/autotag")
    suspend fun autotag(@Path("id") id: Long): AutotagResponse

    /** Probes a comic's archive. Page images come from [Repository.pageUrl]. */
    @GET("api/media/{id}/comic")
    suspend fun comicInfo(@Path("id") id: Long): ComicInfo

    @DELETE("api/media/{id}")
    suspend fun deleteMedia(@Path("id") id: Long)

    // ── remote sources ───────────────────────────────────────────────────
    // Browsing streams straight from the origin and stores nothing. Only save()
    // pulls an item into the library.

    @GET("api/sources")
    suspend fun sources(): SourceListResponse

    @GET("api/sources/{id}/browse")
    suspend fun browseSource(
        @Path("id") id: String,
        @Query("feed") feed: String,
        @Query("cursor") cursor: String? = null,
        // Search feeds only: the term, and which of the feed's orderings to use.
        @Query("q") q: String? = null,
        @Query("sort") sort: String? = null,
    ): SourceListing

    @GET("api/sources/{id}/item/{item}/pages")
    suspend fun sourcePages(@Path("id") id: String, @Path("item") item: String): SourcePagesResponse

    /**
     * The conversation an item was posted in — [SourceItem.threadId], not the item's
     * own id. Sources with no discussions answer 404.
     */
    @GET("api/sources/{id}/item/{item}/comments")
    suspend fun sourceComments(
        @Path("id") id: String,
        @Path("item") item: String,
    ): SourceCommentsResponse

    @POST("api/sources/{id}/save")
    suspend fun saveFromSource(@Path("id") id: String, @Body body: SourceSaveRequest): ImportResponse

    @POST("api/scrape")
    suspend fun scrape(@Body body: UrlRequest): ScrapeResult

    @POST("api/scrape/import")
    suspend fun scrapeImport(@Body body: ScrapeImportRequest): ImportResponse

    // ── the app updating itself ──────────────────────────────────────────

    @GET("api/apk/info")
    suspend fun apkInfo(): ApkInfo

    /**
     * The APK itself — tens of megabytes, so @Streaming: the body is handed over as
     * an open stream to write to disk, rather than being built up in memory first.
     */
    @Streaming
    @GET("api/apk")
    suspend fun downloadApk(): ResponseBody
}
