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
import retrofit2.http.PUT
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

    // ── image generation ─────────────────────────────────────────────────
    // Talks to the local generator through the server; generated images live in the
    // server's memory until save() files one into the library.

    @GET("api/imagegen/status")
    suspend fun imageGenStatus(): ImageGenStatus

    @POST("api/imagegen/generate")
    suspend fun imageGenGenerate(@Body body: GenerateRequest): GenerateResponse

    @POST("api/imagegen/save")
    suspend fun imageGenSave(@Body body: GenSaveRequest): GenSaveResponse

    @GET("api/imagegen/characters")
    suspend fun imageGenCharacters(): GenCharacterListResponse

    /** The generator's own model record: name, description, triggers, defaults. */
    @GET("api/imagegen/model")
    suspend fun modelMeta(@Query("name") name: String): GenModelMeta

    /** Writes the record back — the same edit InvokeAI's model manager would make. */
    @PATCH("api/imagegen/model")
    suspend fun patchModelMeta(@Body body: GenModelMetaPatch): GenModelMeta

    // ── InvokeAI gallery ─────────────────────────────────────────────────
    // The generator keeps every finished image in its own gallery; these browse
    // and prune it. Images stream via Repository.galleryThumbUrl/galleryFullUrl.

    @GET("api/imagegen/gallery/boards")
    suspend fun galleryBoards(): GalleryBoardsResponse

    @GET("api/imagegen/gallery/images")
    suspend fun galleryImages(
        @Query("board") board: String,
        @Query("offset") offset: Int = 0,
        @Query("limit") limit: Int = 60,
    ): GalleryPageResponse

    @DELETE("api/imagegen/gallery/image/{name}")
    suspend fun deleteGalleryImage(@Path("name") name: String)

    /** Copies one gallery image into the library (the only crossing point). */
    @POST("api/imagegen/gallery/save")
    suspend fun saveGalleryImage(@Body body: GallerySaveRequest): GenSaveResponse

    // ── Civitai catalogue (proxied through the server) ───────────────────

    @GET("api/imagegen/civitai/search")
    suspend fun civitaiSearch(
        @Query("q") q: String? = null,
        @Query("type") type: String? = null,
        @Query("sort") sort: String? = null,
        @Query("cursor") cursor: String? = null,
    ): CivitaiSearchResponse

    /** Hands a Civitai download URL to InvokeAI; the box downloads it itself. */
    @POST("api/imagegen/civitai/install")
    suspend fun civitaiInstall(@Body body: CivitaiInstallRequest): InstallJob

    @GET("api/imagegen/civitai/installs")
    suspend fun civitaiInstalls(): InstallJobsResponse

    // ── Libby outfits ────────────────────────────────────────────────────

    @GET("api/libby/outfits")
    suspend fun libbyOutfits(): LibbyOutfitsResponse

    @POST("api/libby/outfits")
    suspend fun saveLibbyOutfit(@Body body: LibbyOutfitSaveRequest): LibbyOutfit

    @DELETE("api/libby/outfits/{id}")
    suspend fun deleteLibbyOutfit(@Path("id") id: String)

    @PUT("api/libby/outfits/{id}/emotions/{emotion}")
    suspend fun setLibbyEmotion(
        @Path("id") id: String,
        @Path("emotion") emotion: String,
        @Body body: LibbyEmotionRequest,
    )

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
