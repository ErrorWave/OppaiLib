package net.fourbakers.oppailib.ui

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Save
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Slider
import androidx.compose.material3.Surface
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
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import kotlinx.coroutines.launch
import net.fourbakers.oppailib.data.GenCharacter
import net.fourbakers.oppailib.data.GenLoraPick
import net.fourbakers.oppailib.data.GenModel
import net.fourbakers.oppailib.data.GenPreview
import net.fourbakers.oppailib.data.GenSaveRequest
import net.fourbakers.oppailib.data.GenTemplate
import net.fourbakers.oppailib.data.GenerateRequest
import net.fourbakers.oppailib.data.ImageGenStatus
import net.fourbakers.oppailib.data.Repository

/** Resolution presets: SD 1.x sizes first, SDXL sizes after. */
private data class SizePreset(val label: String, val w: Int, val h: Int)
private val sizePresets = listOf(
    SizePreset("512×768", 512, 768),
    SizePreset("512×512", 512, 512),
    SizePreset("768×512", 768, 512),
    SizePreset("832×1216", 832, 1216),
    SizePreset("1024×1024", 1024, 1024),
    SizePreset("1216×832", 1216, 832),
)

/** A generated preview plus whether it has been saved into the library yet. */
private data class ShotState(val preview: GenPreview, val saved: Boolean)

/**
 * The phone's image-generation studio. Same contract as the web view: everything is
 * generated into the server's memory and previewed from there; only Save files an
 * image into the library. Models, LoRAs, VAEs, templates and the character library
 * all come from /api/imagegen/status and /characters.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ImageGenScreen(repo: Repository, onBack: () -> Unit, onSaved: () -> Unit) {
    var status by remember { mutableStateOf<ImageGenStatus?>(null) }
    var statusError by remember { mutableStateOf("") }
    var characters by remember { mutableStateOf<List<GenCharacter>>(emptyList()) }

    var checkpoint by remember { mutableStateOf("") }
    var vae by remember { mutableStateOf("") }
    var templateId by remember { mutableStateOf("") }
    var loraWeights by remember { mutableStateOf<Map<String, Double>>(emptyMap()) }
    var selectedChars by remember { mutableStateOf<Set<String>>(emptySet()) }

    var prompt by remember { mutableStateOf("") }
    var negative by remember { mutableStateOf("") }
    var width by remember { mutableStateOf(512) }
    var height by remember { mutableStateOf(768) }
    var steps by remember { mutableStateOf(25) }
    var cfg by remember { mutableStateOf(7.0) }
    var count by remember { mutableStateOf(1) }
    var seedText by remember { mutableStateOf("-1") }

    var generating by remember { mutableStateOf(false) }
    var shots by remember { mutableStateOf<List<ShotState>>(emptyList()) }
    var error by remember { mutableStateOf("") }
    val scope = rememberCoroutineScope()

    fun applyModel(m: GenModel) {
        checkpoint = m.title
        val d = m.defaults ?: return
        if (d.steps > 0) steps = d.steps
        if (d.cfgScale > 0) cfg = d.cfgScale
        if (d.width > 0) width = d.width
        if (d.height > 0) height = d.height
        if (d.vae.isNotEmpty()) vae = d.vae
    }

    LaunchedEffect(Unit) {
        runCatching { repo.api.imageGenStatus() }
            .onSuccess { st ->
                status = st
                if (checkpoint.isEmpty()) st.models.firstOrNull()?.let { applyModel(it) }
            }
            .onFailure { statusError = it.message ?: "Couldn't reach the server" }
        runCatching { repo.api.imageGenCharacters() }
            .onSuccess { characters = it.characters }
    }
    BackHandler(onBack = onBack)

    /** The same prompt assembly the web does: characters appended, template spliced. */
    fun assembledPrompts(): Pair<String, String> {
        val parts = mutableListOf(prompt.trim())
        val negParts = mutableListOf(negative.trim())
        for (id in selectedChars) {
            val c = characters.find { it.id == id } ?: continue
            if (c.prompt.isNotBlank()) parts += c.prompt.trim()
            if (c.negativePrompt.isNotBlank()) negParts += c.negativePrompt.trim()
        }
        var pos = parts.filter { it.isNotEmpty() }.joinToString(", ")
        var neg = negParts.filter { it.isNotEmpty() }.joinToString(", ")
        val tpl: GenTemplate? = status?.templates?.find { it.id == templateId }
        if (tpl != null) {
            pos = if (tpl.prompt.contains("{prompt}")) tpl.prompt.replace("{prompt}", pos)
            else if (tpl.prompt.isNotBlank()) "$pos, ${tpl.prompt.trim()}" else pos
            if (tpl.negativePrompt.isNotBlank()) {
                neg = if (neg.isEmpty()) tpl.negativePrompt.trim() else "$neg, ${tpl.negativePrompt.trim()}"
            }
        }
        return pos to neg
    }

    fun generate() {
        if (generating || prompt.isBlank()) return
        generating = true
        error = ""
        val (pos, neg) = assembledPrompts()
        scope.launch {
            runCatching {
                repo.api.imageGenGenerate(
                    GenerateRequest(
                        prompt = pos,
                        negativePrompt = neg,
                        checkpoint = checkpoint,
                        vae = vae,
                        steps = steps,
                        width = width,
                        height = height,
                        cfgScale = cfg,
                        seed = seedText.toLongOrNull() ?: -1,
                        count = count,
                        loras = loraWeights.map { (name, weight) -> GenLoraPick(name, weight) },
                    ),
                )
            }.onSuccess { res ->
                shots = res.images.map { ShotState(it, saved = false) } + shots
            }.onFailure { error = it.message ?: "Generation failed" }
            generating = false
        }
    }

    fun save(shot: ShotState) {
        if (shot.saved) return
        scope.launch {
            runCatching {
                repo.api.imageGenSave(
                    GenSaveRequest(id = shot.preview.id, title = prompt.trim().take(80).ifBlank { "Generated image" }),
                )
            }.onSuccess {
                shots = shots.map { if (it.preview.id == shot.preview.id) it.copy(saved = true) else it }
                repo.report("Saved to library")
                onSaved()
            }.onFailure { repo.report(it.message ?: "Couldn't save the image") }
        }
    }

    Scaffold(topBar = {
        TopAppBar(
            title = { Text("Image studio") },
            navigationIcon = { IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
            } },
        )
    }) { padding ->
        val st = status
        when {
            st == null && statusError.isEmpty() -> Box(
                Modifier.padding(padding).fillMaxSize(),
                contentAlignment = Alignment.Center,
            ) { CircularProgressIndicator() }

            st == null || !st.enabled || !st.reachable -> Column(
                Modifier.padding(padding).fillMaxSize().padding(24.dp),
                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally,
            ) {
                Text(
                    when {
                        st == null -> statusError
                        !st.enabled -> "Image generation isn't set up yet. Add your InvokeAI or A1111 URL in the web Settings screen."
                        else -> st.error.ifBlank { "Can't reach the image generator." }
                    },
                    style = MaterialTheme.typography.bodyLarge,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }

            else -> LazyColumn(
                modifier = Modifier.padding(padding).fillMaxSize(),
                verticalArrangement = Arrangement.spacedBy(14.dp),
                contentPadding = androidx.compose.foundation.layout.PaddingValues(
                    start = 14.dp, end = 14.dp, top = 4.dp, bottom = 24.dp,
                ),
            ) {
                // ── model picker ────────────────────────────────────────────
                item {
                    SectionLabel("Model")
                    LazyRow(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                        items(st.models, key = { it.title }) { m ->
                            PickerCard(
                                label = m.modelName.ifBlank { m.title },
                                imageUrl = repo.modelThumbUrl(m.title),
                                selected = m.title == checkpoint,
                                repo = repo,
                                onClick = { applyModel(m) },
                            )
                        }
                    }
                }

                // ── LoRAs ───────────────────────────────────────────────────
                if (st.loras.isNotEmpty()) {
                    item {
                        SectionLabel("LoRAs")
                        LazyRow(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                            items(st.loras, key = { it.name }) { lora ->
                                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                    PickerCard(
                                        label = lora.alias.ifBlank { lora.name },
                                        imageUrl = repo.loraThumbUrl(lora.name),
                                        selected = lora.name in loraWeights,
                                        repo = repo,
                                        onClick = {
                                            loraWeights = if (lora.name in loraWeights) {
                                                loraWeights - lora.name
                                            } else {
                                                loraWeights + (lora.name to 1.0)
                                            }
                                        },
                                    )
                                    loraWeights[lora.name]?.let { w ->
                                        Slider(
                                            value = w.toFloat(),
                                            onValueChange = {
                                                loraWeights = loraWeights + (lora.name to it.toDouble())
                                            },
                                            valueRange = -2f..2f,
                                            modifier = Modifier.width(110.dp),
                                        )
                                        Text(
                                            "%.2f".format(w),
                                            style = MaterialTheme.typography.labelSmall,
                                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                                        )
                                    }
                                }
                            }
                        }
                    }
                }

                // ── VAE ─────────────────────────────────────────────────────
                if (st.vaes.isNotEmpty()) {
                    item {
                        SectionLabel("VAE")
                        Row(Modifier.horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            FilterChip(selected = vae.isEmpty(), onClick = { vae = "" }, label = { Text("Model default") })
                            st.vaes.forEach { v ->
                                FilterChip(
                                    selected = vae == v.key,
                                    onClick = { vae = if (vae == v.key) "" else v.key },
                                    label = { Text(v.name, maxLines = 1, overflow = TextOverflow.Ellipsis) },
                                )
                            }
                        }
                    }
                }

                // ── templates ───────────────────────────────────────────────
                if (st.templates.isNotEmpty()) {
                    item {
                        SectionLabel("Templates")
                        Row(Modifier.horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            st.templates.forEach { t ->
                                FilterChip(
                                    selected = templateId == t.id,
                                    onClick = { templateId = if (templateId == t.id) "" else t.id },
                                    label = { Text(t.name, maxLines = 1, overflow = TextOverflow.Ellipsis) },
                                )
                            }
                        }
                    }
                }

                // ── characters ──────────────────────────────────────────────
                if (characters.isNotEmpty()) {
                    item {
                        SectionLabel("Characters")
                        LazyRow(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                            items(characters, key = { it.id }) { c ->
                                PickerCard(
                                    label = c.name,
                                    imageUrl = if (c.hasThumb) repo.characterThumbUrl(c.id) else null,
                                    selected = c.id in selectedChars,
                                    repo = repo,
                                    onClick = {
                                        selectedChars = if (c.id in selectedChars) selectedChars - c.id else selectedChars + c.id
                                    },
                                )
                            }
                        }
                    }
                }

                // ── prompt ──────────────────────────────────────────────────
                item {
                    SectionLabel("Prompt")
                    OutlinedTextField(
                        value = prompt,
                        onValueChange = { prompt = it },
                        placeholder = { Text("masterpiece, best quality, …") },
                        minLines = 2,
                        modifier = Modifier.fillMaxWidth(),
                    )
                    OutlinedTextField(
                        value = negative,
                        onValueChange = { negative = it },
                        placeholder = { Text("Negative prompt (optional)") },
                        modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
                    )
                }

                // ── resolution ──────────────────────────────────────────────
                item {
                    SectionLabel("Resolution")
                    Row(Modifier.horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        sizePresets.forEach { p ->
                            FilterChip(
                                selected = width == p.w && height == p.h,
                                onClick = { width = p.w; height = p.h },
                                label = { Text(p.label) },
                            )
                        }
                    }
                }

                // ── settings ────────────────────────────────────────────────
                item {
                    SectionLabel("Settings")
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        NumberField("Steps", steps.toString(), Modifier.weight(1f)) {
                            steps = (it.toIntOrNull() ?: 25).coerceIn(1, 80)
                        }
                        NumberField("CFG", cfg.toString(), Modifier.weight(1f)) {
                            cfg = (it.toDoubleOrNull() ?: 7.0).coerceIn(1.0, 30.0)
                        }
                        NumberField("Count", count.toString(), Modifier.weight(1f)) {
                            count = (it.toIntOrNull() ?: 1).coerceIn(1, 8)
                        }
                        NumberField("Seed", seedText, Modifier.weight(1.2f)) { seedText = it }
                    }
                }

                item {
                    Button(
                        onClick = { generate() },
                        enabled = !generating && prompt.isNotBlank(),
                        modifier = Modifier.fillMaxWidth(),
                    ) {
                        if (generating) {
                            CircularProgressIndicator(Modifier.size(18.dp), strokeWidth = 2.dp)
                            Text("  Generating…")
                        } else {
                            Icon(Icons.Filled.AutoAwesome, contentDescription = null, Modifier.size(18.dp))
                            Text("  Generate")
                        }
                    }
                    if (error.isNotEmpty()) {
                        Text(
                            error,
                            color = MaterialTheme.colorScheme.error,
                            style = MaterialTheme.typography.bodySmall,
                            modifier = Modifier.padding(top = 6.dp),
                        )
                    }
                }

                // ── results ─────────────────────────────────────────────────
                if (shots.isNotEmpty()) {
                    item { SectionLabel("Results — save what you want to keep") }
                    items(shots.chunked(2), key = { it.first().preview.id }) { pair ->
                        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                            pair.forEach { shot ->
                                Column(Modifier.weight(1f)) {
                                    AsyncImage(
                                        model = repo.genPreviewUrl(shot.preview.id),
                                        imageLoader = repo.imageLoader,
                                        contentDescription = "Generated image",
                                        contentScale = ContentScale.Crop,
                                        modifier = Modifier
                                            .fillMaxWidth()
                                            .aspectRatio(3f / 4f)
                                            .clip(RoundedCornerShape(14.dp))
                                            .background(MaterialTheme.colorScheme.surfaceVariant),
                                    )
                                    Button(
                                        onClick = { save(shot) },
                                        enabled = !shot.saved,
                                        modifier = Modifier.fillMaxWidth().padding(top = 6.dp),
                                    ) {
                                        Icon(
                                            if (shot.saved) Icons.Filled.Check else Icons.Filled.Save,
                                            contentDescription = null,
                                            Modifier.size(16.dp),
                                        )
                                        Text(if (shot.saved) "  Saved" else "  Save")
                                    }
                                }
                            }
                            if (pair.size == 1) Box(Modifier.weight(1f)) {}
                        }
                    }
                    item {
                        Text(
                            "Generated images live only on this screen until you save one — leaving drops the rest.",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun SectionLabel(text: String) {
    Text(
        text,
        style = MaterialTheme.typography.labelLarge,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
        modifier = Modifier.padding(bottom = 8.dp),
    )
}

/** A model/LoRA/character tile: cover art (or a placeholder) with a caption. */
@Composable
private fun PickerCard(
    label: String,
    imageUrl: String?,
    selected: Boolean,
    repo: Repository,
    onClick: () -> Unit,
) {
    val border = if (selected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outlineVariant
    Surface(
        onClick = onClick,
        shape = RoundedCornerShape(12.dp),
        modifier = Modifier.width(110.dp).border(2.dp, border, RoundedCornerShape(12.dp)),
        color = MaterialTheme.colorScheme.surfaceVariant,
    ) {
        Column {
            if (imageUrl != null) {
                AsyncImage(
                    model = imageUrl,
                    imageLoader = repo.imageLoader,
                    contentDescription = label,
                    contentScale = ContentScale.Crop,
                    modifier = Modifier.fillMaxWidth().aspectRatio(3f / 4f),
                )
            } else {
                Box(
                    Modifier.fillMaxWidth().aspectRatio(3f / 4f),
                    contentAlignment = Alignment.Center,
                ) {
                    Icon(
                        Icons.Filled.Person,
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.size(34.dp),
                    )
                }
            }
            Text(
                label,
                style = MaterialTheme.typography.labelSmall,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
                modifier = Modifier.padding(horizontal = 8.dp, vertical = 6.dp),
            )
        }
    }
}

@Composable
private fun NumberField(label: String, value: String, modifier: Modifier = Modifier, onChange: (String) -> Unit) {
    OutlinedTextField(
        value = value,
        onValueChange = onChange,
        label = { Text(label) },
        singleLine = true,
        modifier = modifier,
    )
}
