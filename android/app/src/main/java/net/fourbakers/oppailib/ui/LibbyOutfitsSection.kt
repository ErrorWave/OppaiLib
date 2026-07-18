package net.fourbakers.oppailib.ui

import android.net.Uri
import android.util.Base64
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
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
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import kotlinx.coroutines.launch
import net.fourbakers.oppailib.data.LibbyEmotionRequest
import net.fourbakers.oppailib.data.LibbyOutfit
import net.fourbakers.oppailib.data.LibbyOutfitSaveRequest
import net.fourbakers.oppailib.data.Repository

/** The emotion slots an outfit can dress, with where each one shows up. */
private val emotionSlots = listOf(
    "neutral" to "Popups",
    "happy" to "Sweet",
    "mischievous" to "Playful",
    "surprised" to "Bold",
    "thinking" to "Roleplay",
)

/**
 * The outfit wardrobe inside Settings → Libby. Outfits live on the server (they
 * are shared art); which one this phone shows is a local pref, like hiding her.
 * The phone's "drag and drop" is the photo picker: tap an emotion slot, pick an
 * image, and it uploads into that slot.
 */
@Composable
fun LibbyOutfitsSection(repo: Repository) {
    var outfits by remember { mutableStateOf<List<LibbyOutfit>>(emptyList()) }
    var worn by remember { mutableStateOf(repo.prefs.libbyOutfit) }
    var editing by remember { mutableStateOf<LibbyOutfit?>(null) }
    var creating by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    suspend fun reload() {
        runCatching { repo.api.libbyOutfits() }.onSuccess { res ->
            outfits = res.outfits
            if (worn.isNotEmpty() && res.outfits.none { it.id == worn }) {
                worn = ""
                repo.prefs.libbyOutfit = ""
            }
        }
    }

    LaunchedEffect(Unit) { reload() }

    fun wear(id: String) {
        worn = id
        repo.prefs.libbyOutfit = id
    }

    Column(Modifier.padding(top = 8.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
        Text(
            "Outfits swap Libby's artwork per emotion. Tap a slot in the editor to pick an image; " +
                "empty slots fall back to the default art. What she wears is per-device.",
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
        Row(
            Modifier.fillMaxWidth().padding(top = 2.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            FilterChip(selected = worn.isEmpty(), onClick = { wear("") }, label = { Text("Default") })
        }
        outfits.forEach { o ->
            Row(
                Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                Text(o.name, Modifier.weight(1f), style = MaterialTheme.typography.bodyMedium)
                Text(
                    "${o.emotions.size}/5",
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
                FilterChip(
                    selected = worn == o.id,
                    onClick = { wear(if (worn == o.id) "" else o.id) },
                    label = { Text(if (worn == o.id) "Wearing" else "Wear") },
                )
                TextButton(onClick = { editing = o }) { Text("Edit") }
            }
        }
        TextButton(onClick = { creating = true }) { Text("＋ New outfit") }
    }

    if (creating) {
        var name by remember { mutableStateOf("") }
        AlertDialog(
            onDismissRequest = { creating = false },
            title = { Text("New outfit") },
            text = {
                OutlinedTextField(name, { name = it }, label = { Text("Name") }, singleLine = true)
            },
            confirmButton = {
                TextButton(
                    onClick = {
                        scope.launch {
                            runCatching { repo.api.saveLibbyOutfit(LibbyOutfitSaveRequest(name = name.trim())) }
                                .onSuccess { created ->
                                    creating = false
                                    reload()
                                    editing = created
                                }
                                .onFailure { repo.report(it.message ?: "Couldn't create the outfit") }
                        }
                    },
                    enabled = name.isNotBlank(),
                ) { Text("Create") }
            },
            dismissButton = { TextButton(onClick = { creating = false }) { Text("Cancel") } },
        )
    }

    editing?.let { outfit ->
        OutfitEditorDialog(
            repo = repo,
            outfit = outfit,
            onChanged = { scope.launch { reload() } },
            onDeleted = {
                if (worn == outfit.id) wear("")
                editing = null
                scope.launch { reload() }
            },
            onDismiss = { editing = null },
        )
    }
}

@Composable
private fun OutfitEditorDialog(
    repo: Repository,
    outfit: LibbyOutfit,
    onChanged: () -> Unit,
    onDeleted: () -> Unit,
    onDismiss: () -> Unit,
) {
    val context = LocalContext.current
    var filled by remember { mutableStateOf(outfit.emotions.toSet()) }
    // Bumps the emotion image URLs so a fresh upload repaints past Coil's cache.
    var version by remember { mutableStateOf(0) }
    var pendingEmotion by remember { mutableStateOf<String?>(null) }
    val scope = rememberCoroutineScope()

    val picker = rememberLauncherForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
        val emotion = pendingEmotion
        pendingEmotion = null
        if (uri == null || emotion == null) return@rememberLauncherForActivityResult
        scope.launch {
            runCatching {
                val data = uriToDataUrl(context, uri)
                repo.api.setLibbyEmotion(outfit.id, emotion, LibbyEmotionRequest(data))
            }.onSuccess {
                filled = filled + emotion
                version++
                onChanged()
            }.onFailure { repo.report(it.message ?: "Couldn't upload the image") }
        }
    }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(outfit.name) },
        text = {
            Column(
                Modifier.verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                Text(
                    "Tap an emotion to pick its image.",
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
                LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    items(emotionSlots, key = { it.first }) { (emotion, hint) ->
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            modifier = Modifier
                                .width(92.dp)
                                .clickable { pendingEmotion = emotion; picker.launch("image/*") },
                        ) {
                            Box(
                                Modifier
                                    .fillMaxWidth()
                                    .aspectRatio(3f / 4f)
                                    .clip(RoundedCornerShape(10.dp))
                                    .background(MaterialTheme.colorScheme.surfaceVariant),
                                contentAlignment = Alignment.Center,
                            ) {
                                if (emotion in filled) {
                                    AsyncImage(
                                        model = "${repo.libbyEmotionUrl(outfit.id, emotion)}?v=$version",
                                        imageLoader = repo.imageLoader,
                                        contentDescription = emotion,
                                        contentScale = ContentScale.Crop,
                                        modifier = Modifier.fillMaxWidth().aspectRatio(3f / 4f),
                                    )
                                } else {
                                    Text("＋", style = MaterialTheme.typography.headlineMedium,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant)
                                }
                            }
                            Text(
                                emotion.replaceFirstChar { it.uppercase() },
                                style = MaterialTheme.typography.labelSmall,
                            )
                            Text(
                                hint,
                                style = MaterialTheme.typography.labelSmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        }
                    }
                }
            }
        },
        confirmButton = { TextButton(onClick = onDismiss) { Text("Done") } },
        dismissButton = {
            TextButton(
                onClick = {
                    scope.launch {
                        runCatching { repo.api.deleteLibbyOutfit(outfit.id) }
                            .onSuccess { onDeleted() }
                            .onFailure { repo.report(it.message ?: "Couldn't delete the outfit") }
                    }
                },
            ) { Text("Delete outfit", color = MaterialTheme.colorScheme.error) }
        },
    )
}

/** Reads a picked image into the data-URL form the server's upload endpoints take. */
private fun uriToDataUrl(context: android.content.Context, uri: Uri): String {
    val resolver = context.contentResolver
    val mime = resolver.getType(uri) ?: "image/png"
    val bytes = resolver.openInputStream(uri)?.use { it.readBytes() }
        ?: error("Couldn't read the image")
    require(bytes.size <= 8 * 1024 * 1024) { "The image is larger than 8 MB" }
    return "data:$mime;base64," + Base64.encodeToString(bytes, Base64.NO_WRAP)
}
