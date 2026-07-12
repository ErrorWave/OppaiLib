package net.fourbakers.oppailib.ui

import android.app.Activity
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.awaitEachGesture
import androidx.compose.foundation.gestures.awaitFirstDown
import androidx.compose.foundation.gestures.calculatePan
import androidx.compose.foundation.gestures.calculateZoom
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBars
import androidx.compose.foundation.layout.systemBars
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.PagerState
import androidx.compose.foundation.pager.VerticalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.OpenInNew
import androidx.compose.material.icons.automirrored.filled.VolumeOff
import androidx.compose.material.icons.automirrored.filled.VolumeUp
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Forward10
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.LocalOffer
import androidx.compose.material.icons.filled.Pause
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Replay10
import androidx.compose.material.icons.filled.SwapHoriz
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Slider
import androidx.compose.material3.SliderDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.key
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableLongStateOf
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.input.pointer.positionChanged
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.unit.IntSize
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.media3.common.MediaItem
import androidx.media3.common.Player
import androidx.media3.common.util.UnstableApi
import androidx.media3.datasource.DefaultHttpDataSource
import androidx.media3.exoplayer.DefaultLoadControl
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.exoplayer.source.DefaultMediaSourceFactory
import androidx.media3.ui.AspectRatioFrameLayout
import androidx.media3.ui.PlayerView
import coil.ImageLoader
import coil.compose.AsyncImage
import coil.request.ImageRequest
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import net.fourbakers.oppailib.data.ComicInfo
import net.fourbakers.oppailib.data.Media
import net.fourbakers.oppailib.data.Repository
import net.fourbakers.oppailib.data.VideoFit
import java.net.URI

/**
 * Immersive, full-screen media viewer. Items are paged vertically like a short-video
 * feed: whichever page is settled is the one that plays, and swiping up/down moves
 * through the same list the grid showed. A tap toggles the chrome.
 *
 * The player and the comic reader are hoisted here rather than owned by the page
 * they render into, because their controls live in the chrome — which is drawn over
 * the feed, so it can't reach into a page's state.
 */
@Composable
fun ViewerScreen(
    repo: Repository,
    items: List<Media>,
    startIndex: Int,
    onClose: () -> Unit,
    onChanged: (Media) -> Unit,
    onSearchTag: (String) -> Unit,
    onDelete: (Media) -> Unit,
) {
    if (items.isEmpty()) { onClose(); return }

    val feed = rememberPagerState(initialPage = startIndex.coerceIn(0, items.lastIndex)) { items.size }
    var chrome by remember { mutableStateOf(true) }
    // A zoomed page owns the drag gesture; the feed must not steal it out from under.
    var zoomed by remember { mutableStateOf(false) }

    // Full-bleed: hide the system bars for as long as the viewer is on screen, and
    // put them back exactly as they were when it leaves.
    val view = LocalView.current
    DisposableEffect(Unit) {
        val window = (view.context as Activity).window
        val controller = WindowCompat.getInsetsController(window, view)
        val bars = WindowInsetsCompat.Type.systemBars()
        val hadBehavior = controller.systemBarsBehavior
        controller.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        controller.hide(bars)
        onDispose {
            controller.show(bars)
            controller.systemBarsBehavior = hadBehavior
        }
    }

    val settled = items.getOrNull(feed.settledPage)

    // Detail (tags, dimensions) isn't in the list payload, so fetch it per item as
    // the user lands on it and cache it for the life of the viewer.
    val details = remember { mutableStateMapOf<Long, Media>() }
    LaunchedEffect(settled?.id) {
        val m = settled ?: return@LaunchedEffect
        if (details[m.id] == null) {
            runCatching { repo.api.getMedia(m.id) }.getOrNull()?.let { details[m.id] = it }
        }
    }

    // Leaving an item tears its zoom down with it.
    LaunchedEffect(settled?.id) { zoomed = false }

    val player = rememberVideoPlayer(repo, settled)
    val comic = rememberComicReader(repo, settled)

    Box(Modifier.fillMaxSize().background(Color.Black)) {
        VerticalPager(
            state = feed,
            modifier = Modifier.fillMaxSize(),
            beyondViewportPageCount = 1,
            userScrollEnabled = !zoomed,
        ) { page ->
            val m = items[page]
            MediaPage(
                repo = repo,
                media = m,
                active = feed.settledPage == page,
                player = player,
                comic = comic,
                onToggleChrome = { chrome = !chrome },
                onZoomed = { zoomed = it },
            )
        }

        val current = items.getOrNull(feed.currentPage)
        val scope = rememberCoroutineScope()
        AnimatedVisibility(visible = chrome && current != null, enter = fadeIn(), exit = fadeOut()) {
            if (current != null) {
                Chrome(
                    repo = repo,
                    media = details[current.id] ?: current,
                    index = feed.currentPage,
                    count = feed.pageCount,
                    onClose = onClose,
                    onChanged = onChanged,
                    onDetail = { details[it.id] = it },
                    onSearchTag = onSearchTag,
                    onDelete = onDelete,
                    upNext = {
                        // Tapping the video raises the chrome; the chrome says what's next.
                        // Only for video: a comic's bottom bar is already a page scrubber,
                        // and stacking a second strip under it would be two scrubbers.
                        if (current.kind == "video") {
                            UpNextStrip(
                                repo = repo,
                                items = items.map {
                                    StripItem(
                                        key = it.id.toString(),
                                        title = it.title.ifEmpty { it.kind },
                                        thumbUrl = repo.thumbUrl(it.id),
                                        isVideo = it.kind == "video",
                                    )
                                },
                                current = feed.currentPage,
                                onPick = { scope.launch { feed.scrollToPage(it) } },
                                modifier = Modifier.padding(top = 8.dp),
                            )
                        }
                    },
                ) {
                    // Per-kind controls, sat directly above the metadata bar.
                    when {
                        current.kind == "video" && player != null -> VideoControls(player)
                        current.kind == "comic" && comic != null -> ComicControls(comic)
                    }
                }
            }
        }
    }
}

// ── the feed's pages ─────────────────────────────────────────────────────────

@Composable
private fun MediaPage(
    repo: Repository,
    media: Media,
    active: Boolean,
    player: ExoPlayer?,
    comic: ComicReader?,
    onToggleChrome: () -> Unit,
    onZoomed: (Boolean) -> Unit,
) {
    // Only the settled item gets the player or the reader; the neighbours the pager
    // keeps warm show their poster, so swiping never leaves audio playing behind you.
    when {
        media.kind == "video" && active && player != null ->
            VideoSurface(player, repo.prefs.videoFit, onToggleChrome)

        media.kind == "comic" && active && comic != null ->
            ComicPages(repo, comic, onToggleChrome, onZoomed)

        media.kind == "game" -> GamePage(repo, media)

        media.kind == "image" || media.kind == "gif" ->
            ZoomableImage(
                url = repo.streamUrl(media.id),
                imageLoader = repo.imageLoader,
                contentDescription = media.title,
                enabled = active,
                onZoomed = onZoomed,
                onTap = { _, _ -> onToggleChrome() },
            )

        else -> Poster(repo, media, onToggleChrome)
    }
}

/**
 * A game isn't something you watch — it's something you go and get. So this is a
 * detail page (cover, platforms, screenshots, a way out to the download) rather than
 * the passive full-bleed frame the other kinds get.
 */
@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun GamePage(repo: Repository, media: Media) {
    val uriHandler = LocalUriHandler.current
    val context = LocalContext.current

    Column(
        Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .windowInsetsPadding(WindowInsets.systemBars)
            .padding(horizontal = 24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Spacer(Modifier.height(72.dp)) // clear the chrome's top bar

        AsyncImage(
            model = ImageRequest.Builder(context).data(repo.thumbUrl(media.id)).crossfade(true).build(),
            imageLoader = repo.imageLoader,
            contentDescription = media.title,
            contentScale = ContentScale.Crop,
            modifier = Modifier.fillMaxWidth().height(200.dp).clip(RoundedCornerShape(16.dp)),
        )

        Text(
            media.title.ifEmpty { "Untitled game" },
            color = Color.White,
            style = MaterialTheme.typography.headlineSmall,
            modifier = Modifier.padding(top = 16.dp),
        )

        AndroidSupport(media)

        if (media.platforms.isNotEmpty()) {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(6.dp),
                modifier = Modifier.padding(top = 12.dp),
            ) {
                media.platforms.forEach { AssistChip(onClick = {}, label = { Text(platformLabel(it)) }) }
            }
        }

        media.download?.takeIf { it.isNotBlank() }?.let { url ->
            Button(
                onClick = { uriHandler.openUri(url) },
                modifier = Modifier.fillMaxWidth().padding(top = 20.dp),
            ) {
                Icon(Icons.AutoMirrored.Filled.OpenInNew, contentDescription = null, modifier = Modifier.size(18.dp))
                Text("Get it on ${hostOf(url)}", modifier = Modifier.padding(start = 8.dp))
            }
        }

        if (media.gallery.isNotEmpty()) {
            Text(
                "Screenshots",
                color = Color.White,
                style = MaterialTheme.typography.titleSmall,
                modifier = Modifier.align(Alignment.Start).padding(top = 24.dp, bottom = 8.dp),
            )
            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                items(media.gallery) { shot ->
                    AsyncImage(
                        // Screenshots live on the origin site; the server fetches them for us.
                        model = ImageRequest.Builder(context).data(repo.proxyUrl(shot)).crossfade(true).build(),
                        imageLoader = repo.imageLoader,
                        contentDescription = null,
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.height(140.dp).width(240.dp).clip(RoundedCornerShape(10.dp)),
                    )
                }
            }
        }

        Spacer(Modifier.height(120.dp)) // clear the chrome's bottom bar
    }
}

/**
 * Whether this runs on the phone you're holding. Three states, not two: a game
 * scraped before the parser learned to read platforms carries no platform tags at
 * all, and reporting that as "not supported" would be inventing an answer.
 */
@Composable
private fun AndroidSupport(media: Media) {
    val (label, colour) = when (media.runsOnAndroid) {
        true -> "Runs on Android" to Color(0xFF4CAF50)
        false -> "Not available for Android" to Color(0xFFE57373)
        null -> "Android support unknown — re-scrape to find out" to Color(0xFF9E9E9E)
    }
    Row(
        Modifier.padding(top = 10.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Icon(
            if (media.runsOnAndroid == true) Icons.Filled.CheckCircle else Icons.Filled.Info,
            contentDescription = null,
            tint = colour,
            modifier = Modifier.size(18.dp),
        )
        Text(
            label,
            color = colour,
            style = MaterialTheme.typography.labelLarge,
            modifier = Modifier.padding(start = 6.dp),
        )
    }
}

private fun platformLabel(p: String): String = when (p) {
    "macos" -> "macOS"
    "ios" -> "iOS"
    "web" -> "Browser"
    else -> p.replaceFirstChar { it.uppercase() }
}

private fun hostOf(url: String): String =
    runCatching { URI(url).host?.removePrefix("www.") }.getOrNull()?.takeIf { it.isNotBlank() } ?: "the web"

/** The still frame the server has for an item we can't render inline (a game, say). */
@Composable
private fun Poster(repo: Repository, media: Media, onTap: () -> Unit) {
    Box(
        Modifier.fillMaxSize().pointerInput(Unit) { detectTapGestures { onTap() } },
        Alignment.Center,
    ) {
        AsyncImage(
            model = ImageRequest.Builder(LocalContext.current).data(repo.thumbUrl(media.id)).crossfade(true).build(),
            imageLoader = repo.imageLoader,
            contentDescription = media.title,
            contentScale = ContentScale.Fit,
            modifier = Modifier.fillMaxSize(),
        )
    }
}

/**
 * An image that pinch-zooms and pans, with double-tap to snap between fit and 2.5×.
 *
 * The gesture is hand-rolled rather than `detectTransformGestures` because that one
 * swallows single-finger drags unconditionally, which would eat the pager's swipe.
 * Here a drag is only consumed once there are two fingers down or we're already
 * zoomed in — otherwise it falls through and the pager scrolls as normal.
 */
@Composable
private fun ZoomableImage(
    url: String,
    imageLoader: ImageLoader,
    contentDescription: String?,
    enabled: Boolean,
    onZoomed: (Boolean) -> Unit,
    onTap: (Offset, IntSize) -> Unit,
) {
    var scale by remember(url) { mutableFloatStateOf(1f) }
    var offset by remember(url) { mutableStateOf(Offset.Zero) }
    var size by remember(url) { mutableStateOf(IntSize.Zero) }

    // Keep the image's edges inside the viewport: at scale s it overhangs by
    // (s-1)/2 of its size on each axis, and that's exactly how far it may travel.
    fun clamp(s: Float, o: Offset): Offset {
        val maxX = size.width * (s - 1f) / 2f
        val maxY = size.height * (s - 1f) / 2f
        return Offset(o.x.coerceIn(-maxX, maxX), o.y.coerceIn(-maxY, maxY))
    }

    LaunchedEffect(scale, enabled) { if (enabled) onZoomed(scale > ZOOM_EPSILON) }

    Box(
        Modifier
            .fillMaxSize()
            .onSizeChanged { size = it }
            .pointerInput(url) {
                detectTapGestures(
                    onTap = { onTap(it, size) },
                    onDoubleTap = { pos ->
                        if (scale > ZOOM_EPSILON) {
                            scale = 1f
                            offset = Offset.Zero
                        } else {
                            // Pull the tapped point toward the centre as we zoom into it.
                            val centre = Offset(size.width / 2f, size.height / 2f)
                            scale = DOUBLE_TAP_SCALE
                            offset = clamp(DOUBLE_TAP_SCALE, (centre - pos) * (DOUBLE_TAP_SCALE - 1f))
                        }
                    },
                )
            }
            .pointerInput(url) {
                awaitEachGesture {
                    awaitFirstDown(requireUnconsumed = false)
                    do {
                        val event = awaitPointerEvent()
                        val multiTouch = event.changes.count { it.pressed } > 1
                        if (!multiTouch && scale <= ZOOM_EPSILON) continue // let the pager have it
                        val next = (scale * event.calculateZoom()).coerceIn(1f, MAX_SCALE)
                        scale = next
                        offset = if (next <= ZOOM_EPSILON) Offset.Zero else clamp(next, offset + event.calculatePan())
                        event.changes.forEach { if (it.positionChanged()) it.consume() }
                    } while (event.changes.any { it.pressed })
                }
            },
        contentAlignment = Alignment.Center,
    ) {
        AsyncImage(
            model = ImageRequest.Builder(LocalContext.current).data(url).crossfade(true).build(),
            imageLoader = imageLoader,
            contentDescription = contentDescription,
            contentScale = ContentScale.Fit,
            modifier = Modifier.fillMaxSize().graphicsLayer {
                scaleX = scale
                scaleY = scale
                translationX = offset.x
                translationY = offset.y
            },
        )
    }
}

private const val ZOOM_EPSILON = 1.01f
private const val DOUBLE_TAP_SCALE = 2.5f
private const val MAX_SCALE = 5f

// ── comics ───────────────────────────────────────────────────────────────────

/** The open comic: its probe result, the page pager, and which way it reads. */
private class ComicReader(
    val media: Media,
    val info: ComicInfo?,
    val pages: PagerState,
    val rtl: Boolean,
    val setRtl: (Boolean) -> Unit,
) {
    val readable: Boolean get() = info?.readable == true && info.pages > 0
    val pageCount: Int get() = info?.pages ?: 0
}

/**
 * Probes [media]'s archive and holds the reader state for it, resuming at whatever
 * page was last read. Returns null for anything that isn't a comic.
 */
@Composable
private fun rememberComicReader(repo: Repository, media: Media?): ComicReader? {
    if (media == null || media.kind != "comic") return null

    var info by remember(media.id) { mutableStateOf<ComicInfo?>(null) }
    var rtl by remember { mutableStateOf(repo.prefs.comicRtl) }

    LaunchedEffect(media.id) {
        info = runCatching { repo.api.comicInfo(media.id) }
            .getOrElse { ComicInfo(readable = false, reason = it.message ?: "couldn't open archive") }
    }

    // The pager has to exist before the probe lands (it's what the reader renders
    // into), so it starts empty and the page count fills in underneath it.
    val pages = key(media.id) {
        rememberPagerState(initialPage = 0) { info?.pages ?: 0 }
    }

    val count = info?.pages ?: 0
    LaunchedEffect(media.id, count) {
        if (count > 0) pages.scrollToPage((repo.prefs.comicPage(media.id) - 1).coerceIn(0, count - 1))
    }
    LaunchedEffect(media.id, pages.settledPage, count) {
        if (count > 0) repo.prefs.setComicPage(media.id, pages.settledPage + 1)
    }

    return ComicReader(
        media = media,
        info = info,
        pages = pages,
        rtl = rtl,
        setRtl = { rtl = it; repo.prefs.comicRtl = it },
    )
}

/**
 * The pages themselves. Reading direction is applied by flipping the layout
 * direction of the pager: in RTL page 1 sits on the right and the next page comes
 * in from the left, which is what a manga reader expects. Page indices stay
 * logical (0 is always the first page) — only the geometry flips.
 */
@Composable
private fun ComicPages(
    repo: Repository,
    comic: ComicReader,
    onToggleChrome: () -> Unit,
    onZoomed: (Boolean) -> Unit,
) {
    val info = comic.info
    if (info == null) {
        Box(Modifier.fillMaxSize(), Alignment.Center) { CircularProgressIndicator(color = Color.White) }
        return
    }
    if (!comic.readable) {
        Box(Modifier.fillMaxSize().pointerInput(Unit) { detectTapGestures { onToggleChrome() } }, Alignment.Center) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("Can't read this comic", color = Color.White, style = MaterialTheme.typography.titleMedium)
                Text(
                    info.reason ?: "The server couldn't open the archive.",
                    color = Color.White.copy(alpha = 0.7f),
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(top = 6.dp),
                )
            }
        }
        return
    }

    var zoomed by remember(comic.media.id) { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    fun turn(delta: Int) {
        val target = (comic.pages.currentPage + delta).coerceIn(0, comic.pageCount - 1)
        if (target != comic.pages.currentPage) scope.launch { comic.pages.animateScrollToPage(target) }
    }

    CompositionLocalProvider(
        LocalLayoutDirection provides if (comic.rtl) LayoutDirection.Rtl else LayoutDirection.Ltr,
    ) {
        HorizontalPager(
            state = comic.pages,
            modifier = Modifier.fillMaxSize(),
            beyondViewportPageCount = 1, // warms the neighbouring page so a turn is instant
            userScrollEnabled = !zoomed,
        ) { page ->
            ZoomableImage(
                url = repo.pageUrl(comic.media.id, page + 1),
                imageLoader = repo.imageLoader,
                contentDescription = "Page ${page + 1}",
                enabled = page == comic.pages.settledPage,
                onZoomed = {
                    if (page == comic.pages.settledPage) {
                        zoomed = it
                        onZoomed(it)
                    }
                },
                onTap = { pos, size ->
                    // Edge thirds turn the page, the middle toggles the chrome. Which
                    // edge means "forward" follows the reading direction.
                    val edge = size.width / 3f
                    val forward = if (comic.rtl) pos.x < edge else pos.x > size.width - edge
                    val back = if (comic.rtl) pos.x > size.width - edge else pos.x < edge
                    when {
                        size.width == 0 -> onToggleChrome()
                        forward -> turn(1)
                        back -> turn(-1)
                        else -> onToggleChrome()
                    }
                },
            )
        }
    }
}

/** Page scrubber and the reading-direction switch. */
@Composable
private fun ComicControls(comic: ComicReader) {
    if (!comic.readable) return
    val scope = rememberCoroutineScope()
    var scrub by remember(comic.media.id) { mutableStateOf<Float?>(null) }
    val page = scrub ?: comic.pages.currentPage.toFloat()

    Row(
        Modifier.fillMaxWidth().padding(horizontal = 12.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(
            "${page.toInt() + 1} / ${comic.pageCount}",
            color = Color.White,
            style = MaterialTheme.typography.labelMedium,
        )
        // The slider is a spatial map of the book, so it has to run the same way the
        // pages do — otherwise dragging right would walk you backwards.
        CompositionLocalProvider(
            LocalLayoutDirection provides if (comic.rtl) LayoutDirection.Rtl else LayoutDirection.Ltr,
        ) {
            // Continuous, not stepped: a long book would otherwise draw a tick per page.
            Slider(
                value = page,
                onValueChange = { scrub = it },
                onValueChangeFinished = {
                    scrub?.let { target ->
                        scope.launch { comic.pages.scrollToPage(target.toInt().coerceIn(0, comic.pageCount - 1)) }
                    }
                    scrub = null
                },
                valueRange = 0f..(comic.pageCount - 1).coerceAtLeast(1).toFloat(),
                colors = whiteSlider(),
                modifier = Modifier.weight(1f).padding(horizontal = 12.dp),
            )
        }
        IconButton(onClick = { comic.setRtl(!comic.rtl) }) {
            Icon(
                Icons.Filled.SwapHoriz,
                contentDescription = if (comic.rtl) "Read left-to-right" else "Read right-to-left",
                tint = if (comic.rtl) MaterialTheme.colorScheme.primary else Color.White,
            )
        }
    }
}

// ── video ────────────────────────────────────────────────────────────────────

// How much has to be buffered before playback starts, and before it resumes after a
// stall. These stay fixed: they're about how quickly the video reacts, which isn't
// the thing the read-ahead setting is trading off.
private const val BUFFER_FOR_PLAYBACK_MS = 2_500
private const val BUFFER_FOR_PLAYBACK_AFTER_REBUFFER_MS = 5_000

/**
 * The player for the settled item, or null when that item isn't a video. Rebuilt on
 * every item change and released with it, so at most one player exists at a time.
 */
@androidx.annotation.OptIn(UnstableApi::class)
@Composable
private fun rememberVideoPlayer(repo: Repository, media: Media?): ExoPlayer? {
    val context = LocalContext.current
    val prefs = repo.prefs
    val id = media?.takeIf { it.kind == "video" }?.id

    val player = remember(id, prefs.bufferSeconds, prefs.keepBackBuffer) {
        if (id == null) return@remember null

        val aheadMs = prefs.bufferSeconds * 1_000
        // DefaultLoadControl won't accept a steady-state buffer smaller than what it
        // wants in hand before resuming from a stall, so that's the floor.
        val bufferMs = aheadMs.coerceAtLeast(BUFFER_FOR_PLAYBACK_AFTER_REBUFFER_MS)
        val loadControl = DefaultLoadControl.Builder()
            .setBufferDurationsMs(
                bufferMs,
                bufferMs,
                BUFFER_FOR_PLAYBACK_MS,
                BUFFER_FOR_PLAYBACK_AFTER_REBUFFER_MS,
            )
            // Without this the byte-size cap governs and buffering stops well short of
            // the requested seconds — the read-ahead setting would do nothing on a
            // high-bitrate file, which is exactly the file it matters for.
            .setPrioritizeTimeOverSizeThresholds(true)
            // The back buffer is what makes seeking backwards free; with none, ExoPlayer
            // discards each frame the moment it's been played and a scrub back refetches.
            .setBackBuffer(if (prefs.keepBackBuffer) bufferMs else 0, true)
            .build()

        val http = DefaultHttpDataSource.Factory().apply {
            prefs.token?.let { setDefaultRequestProperties(mapOf("Authorization" to "Bearer $it")) }
        }
        ExoPlayer.Builder(context)
            .setMediaSourceFactory(DefaultMediaSourceFactory(http))
            .setLoadControl(loadControl)
            .build().apply {
                setMediaItem(MediaItem.fromUri(repo.streamUrl(id)))
                repeatMode = if (prefs.videoLoop) Player.REPEAT_MODE_ONE else Player.REPEAT_MODE_OFF
                volume = if (prefs.videoMuted) 0f else 1f
                setPlaybackSpeed(prefs.videoSpeed)
                prepare()
                playWhenReady = prefs.videoAutoplay
            }
    }

    // Closing the viewer — or merely swiping to the next item — has to give the memory
    // back. stop() ends the load, clearMediaItems() drops the buffered source, and
    // release() frees the allocator behind it. A read-ahead buffer can be tens of
    // megabytes, and leaving one alive behind every video you glanced at would add up.
    DisposableEffect(player) {
        onDispose { player?.run { stop(); clearMediaItems(); release() } }
    }
    return player
}

// media3's UnstableApi is an AndroidX opt-in marker, not a Kotlin one, so it needs
// androidx.annotation.OptIn — kotlin.OptIn silently does nothing here.
@androidx.annotation.OptIn(UnstableApi::class)
@Composable
private fun VideoSurface(player: ExoPlayer, fit: VideoFit, onToggleChrome: () -> Unit) {
    val resize = when (fit) {
        VideoFit.FIT -> AspectRatioFrameLayout.RESIZE_MODE_FIT
        VideoFit.FILL -> AspectRatioFrameLayout.RESIZE_MODE_FILL
        VideoFit.ZOOM -> AspectRatioFrameLayout.RESIZE_MODE_ZOOM
    }
    Box(
        Modifier.fillMaxSize().pointerInput(player) {
            detectTapGestures(
                onTap = { onToggleChrome() },
                // Double-tap seeking, YouTube-style: which side you hit decides the way.
                onDoubleTap = { pos ->
                    val back = pos.x < size.width / 2f
                    val target = player.currentPosition + if (back) -SEEK_STEP_MS else SEEK_STEP_MS
                    player.seekTo(target.coerceAtLeast(0L))
                },
            )
        },
    ) {
        AndroidView(
            factory = { ctx ->
                PlayerView(ctx).apply {
                    this.player = player
                    useController = false // the chrome's own controls drive this
                    setBackgroundColor(android.graphics.Color.BLACK)
                }
            },
            update = { it.resizeMode = resize },
            modifier = Modifier.fillMaxSize(),
        )
    }
}

/** Transport controls: scrubber, play/pause, ±10s, mute, and playback speed. */
@Composable
private fun VideoControls(player: ExoPlayer) {
    var playing by remember(player) { mutableStateOf(player.isPlaying) }
    var position by remember(player) { mutableLongStateOf(0L) }
    var duration by remember(player) { mutableLongStateOf(0L) }
    var buffering by remember(player) { mutableStateOf(false) }
    var scrub by remember(player) { mutableStateOf<Float?>(null) }
    var muted by remember(player) { mutableStateOf(player.volume == 0f) }
    var speed by remember(player) { mutableFloatStateOf(player.playbackParameters.speed) }

    DisposableEffect(player) {
        val listener = object : Player.Listener {
            override fun onIsPlayingChanged(isPlaying: Boolean) { playing = isPlaying }
            override fun onPlaybackStateChanged(state: Int) { buffering = state == Player.STATE_BUFFERING }
        }
        player.addListener(listener)
        onDispose { player.removeListener(listener) }
    }

    // ExoPlayer has no position callback — the scrubber has to poll. Only while the
    // controls are actually on screen, which is exactly the lifetime of this composable.
    LaunchedEffect(player) {
        while (true) {
            if (scrub == null) position = player.currentPosition.coerceAtLeast(0L)
            duration = player.duration.takeIf { it > 0L } ?: 0L
            delay(200)
        }
    }

    Column(Modifier.fillMaxWidth().padding(horizontal = 12.dp)) {
        Slider(
            value = scrub ?: position.toFloat(),
            onValueChange = { scrub = it },
            onValueChangeFinished = {
                scrub?.let { player.seekTo(it.toLong()) }
                scrub = null
            },
            valueRange = 0f..duration.coerceAtLeast(1L).toFloat(),
            enabled = duration > 0L,
            colors = whiteSlider(),
        )
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = { if (playing) player.pause() else player.play() }) {
                if (buffering) {
                    CircularProgressIndicator(color = Color.White, strokeWidth = 2.dp, modifier = Modifier.size(20.dp))
                } else {
                    Icon(
                        if (playing) Icons.Filled.Pause else Icons.Filled.PlayArrow,
                        contentDescription = if (playing) "Pause" else "Play",
                        tint = Color.White,
                    )
                }
            }
            IconButton(onClick = { player.seekTo((player.currentPosition - SEEK_STEP_MS).coerceAtLeast(0L)) }) {
                Icon(Icons.Filled.Replay10, contentDescription = "Back 10 seconds", tint = Color.White)
            }
            IconButton(onClick = { player.seekTo(player.currentPosition + SEEK_STEP_MS) }) {
                Icon(Icons.Filled.Forward10, contentDescription = "Forward 10 seconds", tint = Color.White)
            }
            Text(
                "${formatTime((scrub?.toLong() ?: position))} / ${formatTime(duration)}",
                color = Color.White,
                style = MaterialTheme.typography.labelSmall,
                modifier = Modifier.padding(start = 4.dp),
            )
            Spacer(Modifier.weight(1f))
            TextButton(onClick = {
                speed = nextSpeed(speed)
                player.setPlaybackSpeed(speed)
            }) {
                Text(formatSpeedLabel(speed), color = Color.White, style = MaterialTheme.typography.labelMedium)
            }
            IconButton(onClick = {
                muted = !muted
                player.volume = if (muted) 0f else 1f
            }) {
                Icon(
                    if (muted) Icons.AutoMirrored.Filled.VolumeOff else Icons.AutoMirrored.Filled.VolumeUp,
                    contentDescription = if (muted) "Unmute" else "Mute",
                    tint = Color.White,
                )
            }
        }
    }
}

private const val SEEK_STEP_MS = 10_000L

private fun formatTime(ms: Long): String {
    val total = (ms / 1000).coerceAtLeast(0)
    val h = total / 3600
    val m = (total % 3600) / 60
    val s = total % 60
    return if (h > 0) "%d:%02d:%02d".format(h, m, s) else "%d:%02d".format(m, s)
}

// ── chrome ───────────────────────────────────────────────────────────────────

/**
 * The bars over the media: title and actions on top; the per-kind controls and the
 * metadata line at the bottom. Tags hang off a dropdown rather than being laid out
 * over the media — a comic page or a video frame is the thing you came to look at,
 * and a wall of chips was covering it.
 */
@Composable
private fun Chrome(
    repo: Repository,
    media: Media,
    index: Int,
    count: Int,
    onClose: () -> Unit,
    onChanged: (Media) -> Unit,
    onDetail: (Media) -> Unit,
    onSearchTag: (String) -> Unit,
    onDelete: (Media) -> Unit,
    /** The "up next" carousel, drawn above the controls. Empty for kinds that get none. */
    upNext: @Composable () -> Unit,
    controls: @Composable () -> Unit,
) {
    var tagging by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    // The bars sit over the media, and a bar is not the media: swallow taps that land
    // on one. Without this they'd fall through to the page beneath — which for a comic
    // means brushing the metadata line would turn the page.
    val swallowTaps = Modifier.pointerInput(Unit) { detectTapGestures { } }

    Column(Modifier.fillMaxSize()) {
        Row(
            Modifier.fillMaxWidth().background(Color(0x99000000)).then(swallowTaps)
                .windowInsetsPadding(WindowInsets.statusBars).padding(8.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Text(
                media.title.ifEmpty { media.kind },
                color = Color.White,
                maxLines = 1,
                modifier = Modifier.weight(1f).padding(start = 8.dp),
            )
            Text(
                "${index + 1}/$count",
                color = Color.White,
                style = MaterialTheme.typography.labelSmall,
                modifier = Modifier.padding(end = 8.dp),
            )
            IconButton(onClick = {
                tagging = true
                scope.launch {
                    runCatching { repo.api.autotag(media.id) }.getOrNull()?.let {
                        val updated = media.copy(tags = it.tags)
                        onDetail(updated)
                        onChanged(updated)
                    }
                    tagging = false
                }
            }) { Icon(Icons.Filled.AutoAwesome, "Auto-tag", tint = Color.White) }
            IconButton(onClick = { onDelete(media) }) {
                Icon(Icons.Filled.Delete, "Delete", tint = Color.White)
            }
            IconButton(onClick = onClose) { Icon(Icons.Filled.Close, "Close", tint = Color.White) }
        }

        Box(Modifier.weight(1f))

        Column(
            Modifier.fillMaxWidth().background(Color(0x99000000)).then(swallowTaps)
                .windowInsetsPadding(WindowInsets.navigationBars),
        ) {
            upNext()
            controls()
            Row(
                Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                val meta = buildString {
                    append(media.kind)
                    append(" · ${"%.1f".format(media.size / 1_000_000.0)} MB")
                    if (media.width != null) append(" · ${media.width}×${media.height}")
                    if (media.pageCount != null) append(" · ${media.pageCount} pages")
                }
                Text(
                    meta,
                    style = MaterialTheme.typography.labelSmall,
                    color = Color.White,
                    modifier = Modifier.weight(1f),
                )
                TagsDropdown(media, tagging, onSearchTag)
            }
        }
    }
}

/** "Tags (n)" — a menu, so the tags are one tap away instead of over the media. */
@Composable
private fun TagsDropdown(media: Media, tagging: Boolean, onSearchTag: (String) -> Unit) {
    var open by remember(media.id) { mutableStateOf(false) }

    Box {
        TextButton(onClick = { if (media.tags.isNotEmpty()) open = true }, enabled = !tagging) {
            Icon(Icons.Filled.LocalOffer, contentDescription = null, tint = Color.White, modifier = Modifier.size(16.dp))
            Text(
                when {
                    tagging -> "Tagging…"
                    media.tags.isEmpty() -> "No tags"
                    else -> "Tags (${media.tags.size})"
                },
                color = Color.White,
                style = MaterialTheme.typography.labelMedium,
                modifier = Modifier.padding(start = 6.dp),
            )
            if (media.tags.isNotEmpty()) {
                Icon(Icons.Filled.ArrowDropDown, contentDescription = null, tint = Color.White)
            }
        }

        DropdownMenu(expanded = open, onDismissRequest = { open = false }, modifier = Modifier.width(260.dp)) {
            // Grouped the way the scraper filed them — artist, character, parody — so a
            // long tag list stays legible instead of being one undifferentiated run.
            media.tags.groupBy { it.category }.toSortedMap().forEach { (category, tags) ->
                Text(
                    category,
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                )
                tags.forEach { tag ->
                    DropdownMenuItem(
                        text = { Text(tag.name) },
                        onClick = { open = false; onSearchTag(tag.name) },
                    )
                }
                HorizontalDivider()
            }
        }
    }
}

@Composable
private fun whiteSlider() = SliderDefaults.colors(
    thumbColor = Color.White,
    activeTrackColor = Color.White,
    inactiveTrackColor = Color(0x66FFFFFF),
)
