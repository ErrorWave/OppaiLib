package net.fourbakers.oppailib.ui

import androidx.activity.compose.BackHandler
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Save
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import net.fourbakers.oppailib.data.GenCharacter
import net.fourbakers.oppailib.data.GenLoraSelection
import net.fourbakers.oppailib.data.GenerateRequest
import net.fourbakers.oppailib.data.GenPreview
import net.fourbakers.oppailib.data.ImageGenStatus
import net.fourbakers.oppailib.data.Repository
import net.fourbakers.oppailib.data.SaveGeneratedRequest
import net.fourbakers.oppailib.util.copyUriToCache
import net.fourbakers.oppailib.util.mimeOf

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ImageGenScreen(repo: Repository, onBack: () -> Unit) {
    var status by remember { mutableStateOf<ImageGenStatus?>(null) }
    var characters by remember { mutableStateOf<List<GenCharacter>>(emptyList()) }
    var checkpoint by remember { mutableStateOf("") }
    var selectedLoras by remember { mutableStateOf(emptySet<String>()) }
    var selectedCharacters by remember { mutableStateOf(emptySet<Long>()) }
    var characterName by remember { mutableStateOf("") }
    var prompt by remember { mutableStateOf("") }
    var negative by remember { mutableStateOf("") }
    var suggestions by remember { mutableStateOf(emptyList<String>()) }
    var generating by remember { mutableStateOf(false) }
    var analyzing by remember { mutableStateOf(false) }
    var previews by remember { mutableStateOf<List<GenPreview>>(emptyList()) }
    var error by remember { mutableStateOf("") }
    val context = LocalContext.current
    val scope = rememberCoroutineScope()

    LaunchedEffect(Unit) {
        runCatching { repo.api.imageGenStatus() }.onSuccess {
            status = it
            if (checkpoint.isEmpty()) checkpoint = it.models.firstOrNull()?.title.orEmpty()
        }.onFailure { error = it.message ?: "Couldn't reach image generation" }
        runCatching { repo.api.characters().characters }.onSuccess { characters = it }
    }
    LaunchedEffect(prompt) {
        delay(180)
        val fragment = prompt.substringAfterLast(',').trim()
        if (fragment.length >= 2 && !fragment.startsWith("<lora:")) {
            runCatching { repo.api.booruTags(fragment).suggestions }.onSuccess { suggestions = it }
        } else suggestions = emptyList()
    }
    BackHandler(onBack = onBack)

    fun applyTag(tag: String) {
        val before = prompt.substringBeforeLast(',', "")
        prompt = if (before.isBlank()) tag else "$before, $tag"
        suggestions = emptyList()
    }

    val characterPicker = rememberLauncherForActivityResult(ActivityResultContracts.OpenDocument()) { uri ->
        if (uri == null || characterName.isBlank() || analyzing) return@rememberLauncherForActivityResult
        analyzing = true
        scope.launch {
            val (file, _) = copyUriToCache(context, uri)
            try {
                val created = repo.api.createCharacter(
                    repo.titlePart(characterName)!!,
                    repo.filePart(file, mimeOf(context, uri)),
                )
                characters = listOf(created) + characters
                selectedCharacters = selectedCharacters + created.id
                characterName = ""
            } catch (e: Exception) { error = e.message ?: "Character analysis failed" }
            finally { file.delete(); analyzing = false }
        }
    }

    Scaffold(topBar = { TopAppBar(
        title = { Text("Image creator") },
        navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Filled.ArrowBack, "Back") } },
    ) }) { padding ->
        Column(Modifier.padding(padding).fillMaxSize().verticalScroll(rememberScrollState()).padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)) {
            val st = status
            when {
                st == null && error.isEmpty() -> CircularProgressIndicator()
                st?.enabled == false -> Text("Configure image generation in web Settings first.")
                st?.reachable == false -> Text(st.error.ifEmpty { "The image generator is unreachable." }, color = MaterialTheme.colorScheme.error)
                else -> {
                    Text("Model", style = MaterialTheme.typography.titleSmall)
                    LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        items(st?.models.orEmpty()) { model -> AssistChip(
                            onClick = { checkpoint = model.title },
                            label = { Text(model.modelName) },
                            leadingIcon = if (checkpoint == model.title) ({ Text("✓") }) else null,
                        ) }
                    }
                    Text("LoRAs", style = MaterialTheme.typography.titleSmall)
                    LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        items(st?.loras.orEmpty()) { lora -> AssistChip(
                            onClick = { selectedLoras = if (lora.name in selectedLoras) selectedLoras - lora.name else selectedLoras + lora.name },
                            label = { Text(lora.alias.ifEmpty { lora.name }) },
                            leadingIcon = if (lora.name in selectedLoras) ({ Text("✓") }) else null,
                        ) }
                    }
                    Text("Characters", style = MaterialTheme.typography.titleSmall)
                    LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        items(characters, key = { it.id }) { character ->
                            Column(Modifier.fillParentMaxWidth(.36f)) {
                                AsyncImage(
                                    model = repo.characterImageUrl(character.id), imageLoader = repo.imageLoader,
                                    contentDescription = character.name, contentScale = ContentScale.Crop,
                                    modifier = Modifier.fillMaxWidth().height(120.dp),
                                )
                                AssistChip(
                                    onClick = { selectedCharacters = if (character.id in selectedCharacters) selectedCharacters - character.id else selectedCharacters + character.id },
                                    label = { Text(character.name) },
                                    leadingIcon = if (character.id in selectedCharacters) ({ Text("✓") }) else null,
                                )
                            }
                        }
                    }
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(characterName, { characterName = it }, label = { Text("New character") }, modifier = Modifier.weight(1f))
                        Button(onClick = { characterPicker.launch(arrayOf("image/*")) }, enabled = characterName.isNotBlank() && !analyzing) {
                            Text(if (analyzing) "Analyzing…" else "Picture")
                        }
                    }
                    OutlinedTextField(prompt, { prompt = it }, label = { Text("Prompt") }, minLines = 3, modifier = Modifier.fillMaxWidth())
                    if (suggestions.isNotEmpty()) LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        items(suggestions) { tag -> AssistChip(onClick = { applyTag(tag) }, label = { Text(tag) }) }
                    }
                    OutlinedTextField(negative, { negative = it }, label = { Text("Negative prompt") }, modifier = Modifier.fillMaxWidth())
                    Button(onClick = {
                        val characterTags = characters.filter { it.id in selectedCharacters }.flatMap { it.tags }
                        generating = true; error = ""
                        scope.launch {
                            runCatching {
                                // Resolve close Booru spellings immediately before the
                                // job, so mobile gets autocorrect even if the keyboard
                                // never sends a conventional focus-loss event.
                                val corrected = prompt.split(',').map { raw ->
                                    val tag = raw.trim()
                                    if (tag.length < 3 || tag.startsWith("<lora:")) tag
                                    else repo.api.booruTags(tag).correction.ifEmpty { tag }
                                }.filter { it.isNotBlank() }
                                prompt = corrected.joinToString(", ")
                                repo.api.generate(GenerateRequest(
                                prompt = (corrected + characterTags).distinct().joinToString(", "),
                                negativePrompt = negative,
                                checkpoint = checkpoint,
                                // LoRAs are always part of the request on mobile, not merely visual selections.
                                loras = selectedLoras.map { GenLoraSelection(it, 1.0) },
                            )) }.onSuccess { previews = it.images + previews }
                                .onFailure { error = it.message ?: "Generation failed" }
                            generating = false
                        }
                    }, enabled = prompt.isNotBlank() && !generating, modifier = Modifier.fillMaxWidth()) {
                        Icon(Icons.Filled.AutoAwesome, null)
                        Text(if (generating) "Generating…" else "Generate", Modifier.padding(start = 8.dp))
                    }
                    if (error.isNotEmpty()) Text(error, color = MaterialTheme.colorScheme.error)
                    previews.forEach { preview ->
                        AsyncImage(
                            model = repo.genPreviewUrl(preview.id), imageLoader = repo.imageLoader,
                            contentDescription = "Generated image", contentScale = ContentScale.Fit,
                            modifier = Modifier.fillMaxWidth().clip(RoundedCornerShape(14.dp)),
                        )
                        TextButton(onClick = { scope.launch { runCatching {
                            repo.api.saveGenerated(SaveGeneratedRequest(preview.id, prompt.take(80)))
                        } } }) { Icon(Icons.Filled.Save, null); Text("Save to library") }
                    }
                }
            }
        }
    }
}
