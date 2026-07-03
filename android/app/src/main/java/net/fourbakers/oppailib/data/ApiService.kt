package net.fourbakers.oppailib.data

import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part
import retrofit2.http.Path
import retrofit2.http.Query

interface ApiService {
    @GET("api/health")
    suspend fun health(): HealthResponse

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

    @Multipart
    @POST("api/media")
    suspend fun upload(
        @Part file: MultipartBody.Part,
        @Part("title") title: RequestBody? = null,
    ): UploadResponse

    @POST("api/media/{id}/autotag")
    suspend fun autotag(@Path("id") id: Long): AutotagResponse

    @POST("api/scrape")
    suspend fun scrape(@Body body: UrlRequest): ScrapeResult

    @POST("api/scrape/import")
    suspend fun scrapeImport(@Body body: ScrapeImportRequest): ImportResponse
}
