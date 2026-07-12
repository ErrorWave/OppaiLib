package net.fourbakers.oppailib.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.grid.rememberLazyGridState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.MenuBook
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.PushPin
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.outlined.PushPin
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.runtime.snapshotFlow
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalSoftwareKeyboardController
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import kotlinx.coroutines.launch
import net.fourbakers.oppailib.data.PinnedFeed
import net.fourbakers.oppailib.data.RemoteSource
import net.fourbakers.oppailib.data.Repository
import net.fourbakers.oppailib.data.SourceFeed
import net.fourbakers.oppailib.data.SourceItem

/**
 * Browses a remote catalogue — a 4chan board, a doujin listing — without importing
 * anything. Items stream from the origin through the server's proxy; only the save
 * button pulls one into the library.
 *
 * [openAt] lands the screen straight on a pinned feed (search term and all) instead of
 * on whatever source happens to come first.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BrowseScreen(repo: Repository, openAt: PinnedFeed? = null, onBack: () -> Unit) {
    var sources by remember { mutableStateOf<List<RemoteSource>>(emptyList()) }
    var source by remember { mutableStateOf<RemoteSource?>(null) }
    var feed by remember { mutableStateOf("") }
    var sort by remember { mutableStateOf("") }

    // The committed search term — what was actually fetched. `draft` is what's in the
    // box. Keeping them apart is what stops every keystroke becoming a request.
    var query by remember { mutableStateOf("") }
    var draft by remember { mutableStateOf("") }

    var items by remember { mutableStateOf<List<SourceItem>>(emptyList()) }
    var cursor by remember { mutableStateOf("") }
    var loading by remember { mutableStateOf(false) }
    // Distinct from `loading`: until the source list arrives there is no feed to be
    // empty, and saying "Nothing on this feed" before we've even asked is a lie.
    var loadingSources by remember { mutableStateOf(true) }
    var error by remember { mutableStateOf<String?>(null) }
    var viewerAt by remember { mutableStateOf<Int?>(null) }
    var pinned by remember { mutableStateOf(repo.prefs.pinnedFeeds) }

    val grid = rememberLazyGridState()
    val scope = rememberCoroutineScope()
    val snackbar = remember { SnackbarHostState() }
    val keyboard = LocalSoftwareKeyboardController.current

    val currentFeed: SourceFeed? = source?.feeds?.firstOrNull { it.id == feed }
    val isSearch = currentFeed?.query == true

    LaunchedEffect(Unit) {
        runCatching { repo.api.sources().sources }
            .onSuccess { list ->
                sources = list
                // A pin names the source and feed it wants; otherwise land on something
                // browsable rather than an empty picker.
                val want = openAt?.let { pin -> list.firstOrNull { it.id == pin.sourceId } }
                if (want != null && openAt != null) {
                    source = want
                    feed = openAt.feedId
                    query = openAt.query
                    draft = openAt.query
                    sort = openAt.sort
                } else {
                    list.firstOrNull()?.let { first ->
                        source = first
                        feed = first.feeds.firstOrNull()?.id ?: ""
                    }
                }
            }
            .onFailure { error = it.message ?: "Couldn't reach the server" }
        loadingSources = false
    }

    /** Loads a page of the current feed. [reset] starts the feed over. */
    fun load(reset: Boolean) {
        val src = source ?: return
        if (loading) return
        if (!reset && cursor.isEmpty() && items.isNotEmpty()) return // at the end
        // A search feed with no term would 400 upstream; wait for one instead.
        if (isSearch && query.isBlank()) return
        loading = true
        scope.launch {
            runCatching {
                repo.api.browseSource(
                    id = src.id,
                    feed = feed,
                    cursor = if (reset) null else cursor.ifEmpty { null },
                    q = query.ifBlank { null },
                    sort = sort.ifBlank { null },
                )
            }
                .onSuccess { page ->
                    items = if (reset) page.items else items + page.items
                    cursor = page.cursor
                    error = null
                }
                .onFailure { error = it.message ?: "Couldn't load that feed" }
            loading = false
        }
    }

    // Refetch whenever the thing being asked for changes. `query` is the committed
    // term, not the draft, so typing doesn't stream requests at the site.
    LaunchedEffect(source?.id, feed, query, sort) {
        if (source != null && feed.isNotEmpty()) {
            items = emptyList()
            cursor = ""
            grid.scrollToItem(0)
            load(reset = true)
        }
    }

    // Infinite scroll: fetch the next page as the last row comes into view.
    val nearEnd by remember {
        derivedStateOf {
            val last = grid.layoutInfo.visibleItemsInfo.lastOrNull()?.index ?: 0
            items.isNotEmpty() && last >= items.size - 6
        }
    }
    LaunchedEffect(Unit) {
        snapshotFlow { nearEnd }.collect { if (it && cursor.isNotEmpty()) load(reset = false) }
    }

    viewerAt?.let { start ->
        RemoteViewerScreen(
            repo = repo,
            sourceId = source?.id ?: return@let,
            items = items,
            startIndex = start,
            onClose = { viewerAt = null },
            onSaved = { scope.launch { snackbar.showSnackbar("Saved to library") } },
            onSaveFailed = { msg -> scope.launch { snackbar.showSnackbar(msg) } },
        )
        return
    }

    // What pinning this view would store. A search pin remembers its term and sort, so
    // reopening it doesn't mean retyping the search.
    val pin: PinnedFeed? = source?.let { src ->
        val f = currentFeed ?: return@let null
        if (isSearch && query.isBlank()) return@let null // nothing to pin yet
        PinnedFeed(
            sourceId = src.id,
            feedId = f.id,
            label = if (isSearch) "${src.name}: $query" else "${src.name} — ${f.label}",
            query = query,
            sort = sort,
        )
    }
    val isPinned = pin != null && pinned.any {
        it.sourceId == pin.sourceId && it.feedId == pin.feedId && it.query == pin.query
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(source?.name ?: "Browse") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    if (pin != null) {
                        IconButton(
                            onClick = {
                                repo.prefs.togglePin(pin)
                                pinned = repo.prefs.pinnedFeeds
                                scope.launch {
                                    snackbar.showSnackbar(
                                        if (repo.prefs.isPinned(pin.sourceId, pin.feedId)) {
                                            "Pinned to the sidebar"
                                        } else {
                                            "Unpinned"
                                        },
                                    )
                                }
                            },
                        ) {
                            Icon(
                                if (isPinned) Icons.Filled.PushPin else Icons.Outlined.PushPin,
                                contentDescription = if (isPinned) "Unpin this feed" else "Pin this feed",
                                tint = if (isPinned) {
                                    MaterialTheme.colorScheme.primary
                                } else {
                                    MaterialTheme.colorScheme.onSurfaceVariant
                                },
                            )
                        }
                    }
                },
            )
        },
        snackbarHost = { SnackbarHost(snackbar) },
    ) { padding ->
        Column(Modifier.padding(padding).fillMaxSize()) {
            if (sources.size > 1) {
                ChipRow(
                    options = sources.map { it.id to it.name },
                    selected = source?.id,
                    onSelect = { id ->
                        sources.firstOrNull { it.id == id }?.let {
                            source = it
                            feed = it.feeds.firstOrNull()?.id ?: ""
                            query = ""
                            draft = ""
                            sort = ""
                        }
                    },
                )
            }
            source?.let { src ->
                ChipRow(
                    options = src.feeds.map { it.id to it.label },
                    selected = feed,
                    onSelect = { id ->
                        feed = id
                        // Each feed carries its own orderings; the previous feed's sort
                        // is meaningless here, so fall back to the new feed's default.
                        sort = ""
                        val f = src.feeds.firstOrNull { it.id == id }
                        if (f?.query != true) {
                            query = ""
                            draft = ""
                        }
                    },
                )
            }

            if (isSearch) {
                OutlinedTextField(
                    value = draft,
                    onValueChange = { draft = it },
                    label = { Text("Search ${source?.name.orEmpty()}") },
                    singleLine = true,
                    leadingIcon = { Icon(Icons.Filled.Search, contentDescription = null) },
                    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
                    // Committing on Search, not on every keystroke: each commit is a
                    // request to someone else's site.
                    keyboardActions = KeyboardActions(onSearch = {
                        keyboard?.hide()
                        query = draft.trim()
                    }),
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 4.dp),
                )
                currentFeed?.sorts?.takeIf { it.isNotEmpty() }?.let { sorts ->
                    ChipRow(
                        options = sorts.map { it.id to it.label },
                        selected = sort.ifEmpty { sorts.first().id },
                        onSelect = { sort = it },
                    )
                }
            }

            when {
                error != null && items.isEmpty() -> Box(Modifier.fillMaxSize(), Alignment.Center) {
                    Text(error ?: "", Modifier.padding(24.dp))
                }
                loadingSources || (items.isEmpty() && loading) ->
                    Box(Modifier.fillMaxSize(), Alignment.Center) { CircularProgressIndicator() }
                // A search that hasn't been run yet isn't an empty feed — say so.
                isSearch && query.isBlank() -> Box(Modifier.fillMaxSize(), Alignment.Center) {
                    Text("Search ${source?.name.orEmpty()} to see results.", Modifier.padding(24.dp))
                }
                items.isEmpty() -> Box(Modifier.fillMaxSize(), Alignment.Center) {
                    Text(
                        if (isSearch) "Nothing matched “$query”." else "Nothing on this feed.",
                        Modifier.padding(24.dp),
                    )
                }
                else -> LazyVerticalGrid(
                    state = grid,
                    columns = GridCells.Adaptive(minSize = 150.dp),
                    modifier = Modifier.fillMaxSize().padding(horizontal = 8.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp),
                ) {
                    items(items, key = { it.id }) { item ->
                        RemoteTile(repo, item) { viewerAt = items.indexOf(item) }
                    }
                }
            }
        }
    }
}

@Composable
private fun ChipRow(options: List<Pair<String, String>>, selected: String?, onSelect: (String) -> Unit) {
    Row(
        Modifier.fillMaxWidth().horizontalScroll(rememberScrollState())
            .padding(horizontal = 12.dp, vertical = 6.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        options.forEach { (id, label) ->
            FilterChip(
                selected = selected == id,
                onClick = { onSelect(id) },
                label = { Text(label) },
            )
        }
    }
}

@Composable
private fun RemoteTile(repo: Repository, item: SourceItem, onClick: () -> Unit) {
    val context = LocalContext.current
    Box(
        Modifier.aspectRatio(0.75f).clip(RoundedCornerShape(16.dp))
            .background(MaterialTheme.colorScheme.surfaceVariant).clickable(onClick = onClick),
    ) {
        AsyncImage(
            // Even the thumbnail goes through the server: it carries our auth, and the
            // origin would otherwise see the phone's IP on every tile it scrolls past.
            model = ImageRequest.Builder(context).data(repo.sourceStreamUrl(item.thumbUrl)).crossfade(true).build(),
            imageLoader = repo.imageLoader,
            contentDescription = item.title,
            contentScale = ContentScale.Crop,
            modifier = Modifier.fillMaxSize(),
        )
        if (item.kind == "video") {
            Box(
                Modifier.align(Alignment.Center).size(44.dp).clip(CircleShape).background(Color(0x66000000)),
                Alignment.Center,
            ) { Icon(Icons.Filled.PlayArrow, contentDescription = null, tint = Color.White) }
        }
        if (item.kind == "comic") {
            Box(
                Modifier.align(Alignment.TopEnd).padding(6.dp).size(28.dp)
                    .clip(CircleShape).background(Color(0x99000000)),
                Alignment.Center,
            ) {
                Icon(
                    Icons.AutoMirrored.Filled.MenuBook,
                    contentDescription = "Comic",
                    tint = Color.White,
                    modifier = Modifier.size(16.dp),
                )
            }
        }
        Text(
            item.title,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
            style = MaterialTheme.typography.labelMedium,
            color = Color.White,
            modifier = Modifier.align(Alignment.BottomStart)
                .background(Color(0x99000000)).fillMaxWidth().padding(6.dp),
        )
    }
}
