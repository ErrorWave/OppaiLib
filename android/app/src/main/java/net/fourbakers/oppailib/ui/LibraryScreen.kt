package net.fourbakers.oppailib.ui

import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Link
import androidx.compose.material.icons.filled.Logout
import androidx.compose.material.icons.filled.Movie
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.SportsEsports
import androidx.compose.material.icons.filled.Upload
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
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
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import kotlinx.coroutines.launch
import net.fourbakers.oppailib.data.Media
import net.fourbakers.oppailib.data.Repository
import net.fourbakers.oppailib.util.copyUriToCache
import net.fourbakers.oppailib.util.mimeOf

private val KINDS = listOf("" to "All", "video" to "Videos", "gif" to "GIFs", "image" to "Images", "comic" to "Comics", "game" to "Games")

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LibraryScreen(repo: Repository, onLogout: () -> Unit) {
    var items by remember { mutableStateOf<List<Media>>(emptyList()) }
    var kind by remember { mutableStateOf("") }
    var loading by remember { mutableStateOf(false) }
    var selected by remember { mutableStateOf<Media?>(null) }
    var showScrape by remember { mutableStateOf(false) }
    var aiTagger by remember { mutableStateOf("") }
    val scope = rememberCoroutineScope()
    val context = LocalContext.current

    fun refresh() {
        loading = true
        scope.launch {
            try { items = repo.api.listMedia(kind.ifEmpty { null }).items }
            catch (_: Exception) { }
            finally { loading = false }
        }
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

    selected?.let {
        ViewerScreen(repo = repo, media = it, onClose = { selected = null }, onChanged = { refresh() })
        return
    }

    if (showScrape) {
        ScrapeDialog(repo = repo, onDismiss = { showScrape = false }, onImported = { showScrape = false; refresh() })
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("OppaiLib") },
                actions = {
                    Text("AI: $aiTagger", style = MaterialTheme.typography.labelSmall, modifier = Modifier.padding(end = 8.dp))
                    IconButton(onClick = onLogout) { Icon(Icons.Filled.Logout, contentDescription = "Sign out") }
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
        Box(Modifier.padding(padding).fillMaxSize()) {
            androidx.compose.foundation.layout.Column(Modifier.fillMaxSize()) {
                Row(
                    Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()).padding(horizontal = 12.dp, vertical = 8.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                ) {
                    KINDS.forEach { (k, label) ->
                        FilterChip(
                            selected = kind == k,
                            onClick = { if (kind != k) { kind = k; refresh() } },
                            label = { Text(label) },
                        )
                    }
                }

                when {
                    loading -> Box(Modifier.fillMaxSize(), Alignment.Center) { CircularProgressIndicator() }
                    items.isEmpty() -> Box(Modifier.fillMaxSize(), Alignment.Center) { Text("Nothing here yet.") }
                    else -> LazyVerticalGrid(
                        columns = GridCells.Adaptive(minSize = 150.dp),
                        modifier = Modifier.fillMaxSize().padding(horizontal = 8.dp),
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp),
                    ) {
                        items(items, key = { it.id }) { m -> MediaTile(repo, m) { selected = m } }
                    }
                }
            }
        }
    }
}

@Composable
private fun MediaTile(repo: Repository, m: Media, onClick: () -> Unit) {
    val context = LocalContext.current
    Box(
        Modifier.aspectRatio(0.75f).clip(RoundedCornerShape(16.dp))
            .background(MaterialTheme.colorScheme.surfaceVariant).clickable(onClick = onClick),
    ) {
        if (m.kind == "image" || m.kind == "gif") {
            AsyncImage(
                model = ImageRequest.Builder(context).data(repo.streamUrl(m.id)).crossfade(true).build(),
                imageLoader = repo.imageLoader,
                contentDescription = m.title,
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize(),
            )
        } else {
            Box(Modifier.fillMaxSize(), Alignment.Center) {
                val icon = when (m.kind) {
                    "video" -> Icons.Filled.Movie
                    "comic" -> Icons.Filled.MenuBook
                    else -> Icons.Filled.SportsEsports
                }
                Icon(icon, contentDescription = m.kind, modifier = Modifier.padding(24.dp))
            }
        }
        Text(
            m.title,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
            style = MaterialTheme.typography.labelMedium,
            color = androidx.compose.ui.graphics.Color.White,
            modifier = Modifier.align(Alignment.BottomStart)
                .background(androidx.compose.ui.graphics.Color(0x99000000)).fillMaxWidth().padding(6.dp),
        )
    }
}
