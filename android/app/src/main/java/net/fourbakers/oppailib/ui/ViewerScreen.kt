package net.fourbakers.oppailib.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.media3.common.MediaItem
import androidx.media3.common.util.UnstableApi
import androidx.media3.datasource.DefaultHttpDataSource
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.exoplayer.source.DefaultMediaSourceFactory
import androidx.media3.ui.PlayerView
import coil.compose.AsyncImage
import coil.request.ImageRequest
import kotlinx.coroutines.launch
import net.fourbakers.oppailib.data.Media
import net.fourbakers.oppailib.data.Repository

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ViewerScreen(repo: Repository, media: Media, onClose: () -> Unit, onChanged: () -> Unit) {
    var full by remember { mutableStateOf(media) }
    var tagging by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    LaunchedEffect(media.id) {
        runCatching { repo.api.getMedia(media.id) }.getOrNull()?.let { full = it }
    }

    Column(Modifier.fillMaxSize().background(Color(0xF2000000))) {
        Row(Modifier.fillMaxWidth().padding(8.dp), verticalAlignment = Alignment.CenterVertically) {
            Text(full.title, color = Color.White, modifier = Modifier.weight(1f).padding(start = 8.dp))
            IconButton(onClick = {
                tagging = true
                scope.launch {
                    runCatching { repo.api.autotag(media.id) }.getOrNull()?.let {
                        full = full.copy(tags = it.tags); onChanged()
                    }
                    tagging = false
                }
            }) { Icon(Icons.Filled.AutoAwesome, "Auto-tag", tint = Color.White) }
            IconButton(onClick = onClose) { Icon(Icons.Filled.Close, "Close", tint = Color.White) }
        }

        Box(Modifier.weight(1f).fillMaxWidth(), Alignment.Center) {
            when (media.kind) {
                "video" -> VideoPlayer(repo, media)
                else -> AsyncImage(
                    model = ImageRequest.Builder(LocalContext.current).data(repo.streamUrl(media.id)).build(),
                    imageLoader = repo.imageLoader,
                    contentDescription = full.title,
                    modifier = Modifier.fillMaxSize().padding(8.dp),
                )
            }
        }

        Column(Modifier.background(MaterialTheme.colorScheme.surface).fillMaxWidth().padding(12.dp)) {
            val meta = buildString {
                append(full.kind)
                append(" · ${"%.1f".format(full.size / 1_000_000.0)} MB")
                if (full.width != null) append(" · ${full.width}×${full.height}")
            }
            Text(meta, style = MaterialTheme.typography.labelSmall)
            FlowRow(horizontalArrangement = Arrangement.spacedBy(6.dp), modifier = Modifier.padding(top = 8.dp)) {
                if (full.tags.isEmpty()) {
                    Text(if (tagging) "Tagging…" else "No tags yet", style = MaterialTheme.typography.bodySmall)
                } else full.tags.forEach { t ->
                    AssistChip(onClick = {}, label = { Text(t.name) })
                }
            }
        }
    }
}

@OptIn(UnstableApi::class)
@Composable
private fun VideoPlayer(repo: Repository, media: Media) {
    val context = LocalContext.current
    val player = remember {
        val http = DefaultHttpDataSource.Factory().apply {
            repo.prefs.token?.let { setDefaultRequestProperties(mapOf("Authorization" to "Bearer $it")) }
        }
        ExoPlayer.Builder(context)
            .setMediaSourceFactory(DefaultMediaSourceFactory(http))
            .build().apply {
                setMediaItem(MediaItem.fromUri(repo.streamUrl(media.id)))
                prepare()
                playWhenReady = true
            }
    }
    DisposableEffect(Unit) { onDispose { player.release() } }
    AndroidView(factory = { PlayerView(it).apply { this.player = player } }, modifier = Modifier.fillMaxSize())
}
