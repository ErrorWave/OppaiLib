package net.fourbakers.oppailib.ui

import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.combinedClickable
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
import androidx.compose.foundation.lazy.grid.itemsIndexed
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Logout
import androidx.compose.material.icons.automirrored.filled.MenuBook
import androidx.compose.material.icons.filled.Android
import androidx.compose.material.icons.automirrored.filled.Sort
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Collections
import androidx.compose.material.icons.filled.Explore
import androidx.compose.material.icons.filled.Gif
import androidx.compose.material.icons.filled.Image
import androidx.compose.material.icons.filled.Link
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Movie
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.PushPin
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.SportsEsports
import androidx.compose.material.icons.filled.Upload
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.NavigationDrawerItem
import androidx.compose.material3.NavigationDrawerItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import kotlinx.coroutines.launch
import net.fourbakers.oppailib.data.Media
import net.fourbakers.oppailib.data.PinnedFeed
import net.fourbakers.oppailib.data.Repository
import net.fourbakers.oppailib.data.SortMode
import net.fourbakers.oppailib.util.copyUriToCache
import net.fourbakers.oppailib.util.mimeOf

/** Sidebar sections. The empty kind is the unfiltered "everything" view. */
private data class Section(val kind: String, val label: String, val icon: ImageVector)

private val SECTIONS = listOf(
    Section("", "All media", Icons.Filled.Collections),
    Section("video", "Videos", Icons.Filled.Movie),
    Section("gif", "GIFs", Icons.Filled.Gif),
    Section("image", "Images", Icons.Filled.Image),
    Section("comic", "Comics", Icons.AutoMirrored.Filled.MenuBook),
    Section("game", "Games", Icons.Filled.SportsEsports),
)

private fun iconFor(kind: String): ImageVector =
    SECTIONS.firstOrNull { it.kind == kind }?.icon ?: Icons.Filled.Collections

/**
 * Everything a query can match: the title, the notes, and each tag's name *and* its
 * category — so "character" or "explicit" surfaces everything filed that way, not
 * just items that happen to have those words in the title.
 */
private fun haystack(m: Media): String = buildString {
    append(m.title).append('\n')
    m.notes?.let { append(it).append('\n') }
    m.tags.forEach { append(it.name).append('\n').append(it.category).append('\n') }
}.lowercase()

/**
 * Terms are ANDed, so "blue_hair explicit" narrows across fields — one term matching
 * a tag and another matching the rating — rather than requiring one field to hold
 * them both. There's no search endpoint; the list response carries tags precisely so
 * this can run client-side.
 */
private fun matches(m: Media, terms: List<String>): Boolean {
    if (terms.isEmpty()) return true
    val hay = haystack(m)
    return terms.all { hay.contains(it) }
}

/**
 * Orders the grid. Client-side, because the app already holds the whole library (so
 * search can run locally) and the server only ever returns newest-first — there's
 * nothing a round trip would buy.
 */
private fun sorted(items: List<Media>, mode: SortMode): List<Media> = when (mode) {
    SortMode.NEWEST -> items.sortedByDescending { it.createdAt }
    SortMode.OLDEST -> items.sortedBy { it.createdAt }
    // Untitled items sort last rather than clumping at the top under the empty string.
    SortMode.TITLE -> items.sortedWith(
        compareBy(String.CASE_INSENSITIVE_ORDER) { it.title.ifEmpty { "￿" } },
    )
    SortMode.LARGEST -> items.sortedByDescending { it.size }
    SortMode.SMALLEST -> items.sortedBy { it.size }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LibraryScreen(repo: Repository, onLogout: () -> Unit) {
    var items by remember { mutableStateOf<List<Media>>(emptyList()) }
    var kind by remember { mutableStateOf("") }
    var loading by remember { mutableStateOf(false) }
    var viewerAt by remember { mutableStateOf<Int?>(null) }
    var showScrape by remember { mutableStateOf(false) }
    var aiTagger by remember { mutableStateOf("") }
    var query by remember { mutableStateOf("") }
    var searching by remember { mutableStateOf(false) }
    var showSettings by remember { mutableStateOf(false) }
    var showBrowse by remember { mutableStateOf(false) }
    // Which pinned feed to open the browser on; null means the browser's own default.
    var browsePin by remember { mutableStateOf<PinnedFeed?>(null) }
    var pins by remember { mutableStateOf(repo.prefs.pinnedFeeds) }
    var sort by remember { mutableStateOf(repo.prefs.sortMode) }
    var sortMenu by remember { mutableStateOf(false) }
    var confirmDelete by remember { mutableStateOf<Media?>(null) }
    val drawer = rememberDrawerState(DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    val context = LocalContext.current

    fun refresh() {
        loading = true
        scope.launch {
            try { items = repo.listAll(kind.ifEmpty { null }) }
            catch (_: Exception) { }
            finally { loading = false }
        }
    }

    fun delete(m: Media) {
        scope.launch {
            runCatching { repo.api.deleteMedia(m.id) }
                .onSuccess { items = items.filterNot { it.id == m.id } }
        }
    }

    val terms = remember(query) { query.trim().lowercase().split(' ').filter { it.isNotEmpty() } }
    val shown = remember(items, terms, sort) {
        val filtered = if (terms.isEmpty()) items else items.filter { matches(it, terms) }
        sorted(filtered, sort)
    }

    LaunchedEffect(Unit) {
        refresh()
        runCatching { repo.api.health() }.getOrNull()?.let { aiTagger = if (it.aiEnabled) it.aiTagger else "off" }
    }

    val uploadLauncher = rememberLauncherForActivityResult(
        ActivityResultContracts.OpenMultipleDocuments(),
    ) { uris ->
        if (uris.isNullOrEmpty()) return@rememberLauncherForActivityResult
        scope.launch {
            for (uri in uris) {
                runCatching {
                    val (file, _) = copyUriToCache(context, uri)
                    repo.api.upload(repo.filePart(file, mimeOf(context, uri)))
                    file.delete()
                }
            }
            refresh()
        }
    }

    if (showSettings) {
        SettingsScreen(repo = repo, onBack = { showSettings = false }, onLogout = onLogout)
        return
    }

    if (showBrowse) {
        // Coming back from a browse may have saved new items, so reload rather than
        // showing a library that's silently missing what was just added. Pins may have
        // changed while browsing too, so the drawer is re-read on the way back.
        BrowseScreen(
            repo = repo,
            openAt = browsePin,
            onBack = {
                showBrowse = false
                browsePin = null
                pins = repo.prefs.pinnedFeeds
                refresh()
            },
        )
        return
    }

    confirmDelete?.let { target ->
        AlertDialog(
            onDismissRequest = { confirmDelete = null },
            title = { Text("Delete this?") },
            text = {
                Text(
                    "“${target.title.ifEmpty { target.kind }}” will be removed from the library " +
                        "and its file deleted. This can't be undone.",
                )
            },
            confirmButton = {
                TextButton(onClick = { delete(target); confirmDelete = null }) {
                    Text("Delete", color = MaterialTheme.colorScheme.error)
                }
            },
            dismissButton = {
                TextButton(onClick = { confirmDelete = null }) { Text("Cancel") }
            },
        )
    }

    // The viewer owns the whole screen (immersive), so it replaces the library
    // rather than layering over it. It pages through exactly what the grid showed —
    // the filtered list, not the whole library — so the index lines up either way.
    viewerAt?.let { start ->
        ViewerScreen(
            repo = repo,
            items = shown,
            startIndex = start,
            onClose = { viewerAt = null },
            onChanged = { updated ->
                items = items.map { if (it.id == updated.id) updated else it }
            },
            onSearchTag = { tag ->
                query = tag
                searching = true
                viewerAt = null // the filtered list is about to change out from under it
            },
            onDelete = { m ->
                // Close first: the viewer indexes into `shown`, and that list is about to
                // lose an entry underneath it.
                viewerAt = null
                confirmDelete = m
            },
        )
        return
    }

    if (showScrape) {
        ScrapeDialog(repo = repo, onDismiss = { showScrape = false }, onImported = { showScrape = false; refresh() })
    }

    ModalNavigationDrawer(
        drawerState = drawer,
        drawerContent = {
            ModalDrawerSheet {
                Text(
                    "OppaiLib",
                    style = MaterialTheme.typography.headlineSmall,
                    modifier = Modifier.padding(horizontal = 28.dp, vertical = 20.dp),
                )
                HorizontalDivider()
                SECTIONS.forEach { section ->
                    NavigationDrawerItem(
                        icon = { Icon(section.icon, contentDescription = null) },
                        label = { Text(section.label) },
                        selected = kind == section.kind,
                        onClick = {
                            scope.launch { drawer.close() }
                            if (kind != section.kind) {
                                kind = section.kind
                                query = ""
                                searching = false
                                refresh()
                            }
                        },
                        modifier = Modifier.padding(NavigationDrawerItemDefaults.ItemPadding),
                    )
                }
                HorizontalDivider(Modifier.padding(vertical = 8.dp))
                NavigationDrawerItem(
                    icon = { Icon(Icons.Filled.Explore, contentDescription = null) },
                    label = { Text("Browse sources") },
                    selected = false,
                    onClick = {
                        scope.launch { drawer.close() }
                        browsePin = null
                        showBrowse = true
                    },
                    modifier = Modifier.padding(NavigationDrawerItemDefaults.ItemPadding),
                )
                // Pinned remote feeds sit under Browse, as shortcuts into it. A long
                // press unpins, so a pin can be undone without going back to the feed
                // it was made from.
                pins.forEach { p ->
                    NavigationDrawerItem(
                        icon = { Icon(Icons.Filled.PushPin, contentDescription = null) },
                        label = { Text(p.label, maxLines = 1, overflow = TextOverflow.Ellipsis) },
                        selected = false,
                        onClick = {
                            scope.launch { drawer.close() }
                            browsePin = p
                            showBrowse = true
                        },
                        badge = {
                            IconButton(onClick = {
                                repo.prefs.togglePin(p)
                                pins = repo.prefs.pinnedFeeds
                            }) {
                                Icon(
                                    Icons.Filled.Close,
                                    contentDescription = "Unpin ${p.label}",
                                    modifier = Modifier.size(16.dp),
                                )
                            }
                        },
                        modifier = Modifier.padding(NavigationDrawerItemDefaults.ItemPadding),
                    )
                }
                NavigationDrawerItem(
                    icon = { Icon(Icons.Filled.Settings, contentDescription = null) },
                    label = { Text("Settings") },
                    selected = false,
                    onClick = { scope.launch { drawer.close() }; showSettings = true },
                    modifier = Modifier.padding(NavigationDrawerItemDefaults.ItemPadding),
                )
                NavigationDrawerItem(
                    icon = { Icon(Icons.AutoMirrored.Filled.Logout, contentDescription = null) },
                    label = { Text("Sign out") },
                    selected = false,
                    onClick = onLogout,
                    modifier = Modifier.padding(NavigationDrawerItemDefaults.ItemPadding),
                )
                Text(
                    "AI tagger: ${aiTagger.ifEmpty { "…" }}",
                    style = MaterialTheme.typography.labelSmall,
                    modifier = Modifier.padding(horizontal = 28.dp, vertical = 12.dp),
                )
            }
        },
    ) {
        val focus = remember { FocusRequester() }
        LaunchedEffect(searching) { if (searching) runCatching { focus.requestFocus() } }

        Scaffold(
            topBar = {
                TopAppBar(
                    title = {
                        if (searching) {
                            TextField(
                                value = query,
                                onValueChange = { query = it },
                                placeholder = { Text("Search titles and tags") },
                                singleLine = true,
                                keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
                                colors = TextFieldDefaults.colors(
                                    focusedContainerColor = Color.Transparent,
                                    unfocusedContainerColor = Color.Transparent,
                                    focusedIndicatorColor = Color.Transparent,
                                    unfocusedIndicatorColor = Color.Transparent,
                                ),
                                modifier = Modifier.fillMaxWidth().focusRequester(focus),
                            )
                        } else {
                            Text(SECTIONS.first { it.kind == kind }.label)
                        }
                    },
                    navigationIcon = {
                        IconButton(onClick = { scope.launch { drawer.open() } }) {
                            Icon(Icons.Filled.Menu, contentDescription = "Open menu")
                        }
                    },
                    actions = {
                        if (searching) {
                            IconButton(onClick = { query = ""; searching = false }) {
                                Icon(Icons.Filled.Clear, contentDescription = "Close search")
                            }
                        } else {
                            IconButton(onClick = { searching = true }) {
                                Icon(Icons.Filled.Search, contentDescription = "Search")
                            }
                        }
                        Box {
                            IconButton(onClick = { sortMenu = true }) {
                                Icon(Icons.AutoMirrored.Filled.Sort, contentDescription = "Sort")
                            }
                            DropdownMenu(expanded = sortMenu, onDismissRequest = { sortMenu = false }) {
                                SortMode.entries.forEach { mode ->
                                    DropdownMenuItem(
                                        text = { Text(mode.label) },
                                        leadingIcon = {
                                            if (mode == sort) {
                                                Icon(Icons.Filled.Check, contentDescription = null)
                                            }
                                        },
                                        onClick = {
                                            sort = mode
                                            repo.prefs.sortMode = mode
                                            sortMenu = false
                                        },
                                    )
                                }
                            }
                        }
                    },
                )
            },
            floatingActionButton = {
                Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    FloatingActionButton(onClick = { showScrape = true }) { Icon(Icons.Filled.Link, "Scrape") }
                    FloatingActionButton(onClick = { uploadLauncher.launch(arrayOf("*/*")) }) { Icon(Icons.Filled.Upload, "Upload") }
                }
            },
        ) { padding ->
            Column(Modifier.padding(padding).fillMaxSize()) {
                when {
                    loading -> Box(Modifier.fillMaxSize(), Alignment.Center) { CircularProgressIndicator() }
                    shown.isEmpty() -> Box(Modifier.fillMaxSize(), Alignment.Center) {
                        Text(if (terms.isEmpty()) "Nothing here yet." else "No matches for “$query”.")
                    }
                    else -> LazyVerticalGrid(
                        columns = GridCells.Adaptive(minSize = 150.dp),
                        modifier = Modifier.fillMaxSize().padding(horizontal = 8.dp),
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp),
                    ) {
                        itemsIndexed(shown, key = { _, m -> m.id }) { index, m ->
                            MediaTile(
                                repo = repo,
                                m = m,
                                onClick = { viewerAt = index },
                                onLongClick = { confirmDelete = m },
                            )
                        }
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalFoundationApi::class)
@Composable
private fun MediaTile(repo: Repository, m: Media, onClick: () -> Unit, onLongClick: () -> Unit) {
    val context = LocalContext.current
    Box(
        Modifier.aspectRatio(0.75f).clip(RoundedCornerShape(16.dp))
            .background(MaterialTheme.colorScheme.surfaceVariant)
            .combinedClickable(onClick = onClick, onLongClick = onLongClick),
    ) {
        // The kind glyph sits underneath as the placeholder: it shows through while
        // the poster loads, and stays visible if the server has no thumb for this
        // item (e.g. a game, or a video ffmpeg couldn't decode).
        Box(Modifier.fillMaxSize(), Alignment.Center) {
            Icon(
                iconFor(m.kind),
                contentDescription = m.kind,
                tint = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.size(48.dp),
            )
        }
        AsyncImage(
            model = ImageRequest.Builder(context).data(repo.thumbUrl(m.id)).crossfade(true).build(),
            imageLoader = repo.imageLoader,
            contentDescription = m.title,
            contentScale = ContentScale.Crop,
            modifier = Modifier.fillMaxSize(),
        )
        if (m.kind == "video") {
            Box(
                Modifier.align(Alignment.Center).size(44.dp).clip(CircleShape).background(Color(0x66000000)),
                Alignment.Center,
            ) {
                Icon(Icons.Filled.PlayArrow, contentDescription = null, tint = Color.White)
            }
        }
        // Whether a game runs on the phone you're holding is the one thing worth
        // knowing before you tap into it, so it goes on the tile.
        if (m.kind == "game" && m.runsOnAndroid == true) {
            Row(
                Modifier.align(Alignment.TopStart).padding(6.dp)
                    .clip(RoundedCornerShape(6.dp)).background(Color(0xCC2E7D32)).padding(horizontal = 6.dp, vertical = 3.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Icon(
                    Icons.Filled.Android,
                    contentDescription = null,
                    tint = Color.White,
                    modifier = Modifier.size(12.dp),
                )
                Text(
                    "Android",
                    style = MaterialTheme.typography.labelSmall,
                    color = Color.White,
                    modifier = Modifier.padding(start = 4.dp),
                )
            }
        }
        Text(
            m.title,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
            style = MaterialTheme.typography.labelMedium,
            color = Color.White,
            modifier = Modifier.align(Alignment.BottomStart)
                .background(Color(0x99000000)).fillMaxWidth().padding(6.dp),
        )
    }
}
