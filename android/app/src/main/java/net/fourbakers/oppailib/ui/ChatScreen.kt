package net.fourbakers.oppailib.ui

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.Send
import androidx.compose.material3.AssistChip
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.foundation.rememberScrollState
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import coil.compose.SubcomposeAsyncImage
import kotlinx.coroutines.launch
import net.fourbakers.oppailib.data.ChatMessage
import net.fourbakers.oppailib.data.ChatRequest
import net.fourbakers.oppailib.data.ChatStatus
import net.fourbakers.oppailib.data.LibbyMeter
import net.fourbakers.oppailib.data.Repository

/** Each mode maps to one of Libby's emotions; [asset] is the bundled default art.
    [heat] is how hard chatting in this mode pushes the horniness meter per message. */
private data class LibbyMode(val id: String, val label: String, val emotion: String, val asset: String, val heat: Int)
private val libbyModes = listOf(
    LibbyMode("sweet", "Sweet", "happy", "mascot-happy.png", 3),
    LibbyMode("playful", "Playful", "mischievous", "mascot-mischievous.png", 7),
    LibbyMode("bold", "Bold", "surprised", "mascot-surprised.png", 10),
    LibbyMode("roleplay", "Roleplay", "thinking", "mascot-thinking.png", 6),
)
private val libbyEmotions = listOf("default", "happy", "sad", "worried", "surprised", "thinking", "mischievous", "horniness")
private fun libbyAsset(emotion: String) = when (emotion) {
    "happy" -> "mascot-happy.png"
    "mischievous", "horniness" -> "mascot-mischievous.png"
    "surprised" -> "mascot-surprised.png"
    "thinking", "worried" -> "mascot-thinking.png"
    else -> "mascot.png"
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ChatScreen(repo: Repository, onBack: () -> Unit) {
    var status by remember { mutableStateOf<ChatStatus?>(null) }
    var mode by remember { mutableStateOf(libbyModes.first()) }
    var emotion by remember { mutableStateOf(mode.emotion) }
    // Intensity is Libby's session horniness meter (see LibbyMeter): persistent across
    // the app, nudged by library adds, and set by hand with the picker below.
    val intensity by LibbyMeter.value.collectAsState()
    var messages by remember { mutableStateOf<List<ChatMessage>>(emptyList()) }
    var draft by remember { mutableStateOf("") }
    var busy by remember { mutableStateOf(false) }
    var error by remember { mutableStateOf("") }
    val scope = rememberCoroutineScope()
    val list = rememberLazyListState()

    LaunchedEffect(Unit) {
        runCatching { repo.api.chatStatus() }
            .onSuccess { status = it }
            .onFailure { error = it.message ?: "Couldn't reach Libby" }
    }
    LaunchedEffect(messages.size, busy) {
        val count = messages.size + if (busy) 1 else 0
        if (count > 0) list.animateScrollToItem(count - 1)
    }
    BackHandler(onBack = onBack)

    fun send() {
        val text = draft.trim()
        if (text.isEmpty() || busy || status?.enabled != true) return
        val next = messages + ChatMessage("user", text)
        messages = next
        draft = ""
        busy = true
        error = ""
        scope.launch {
            runCatching { repo.api.chat(ChatRequest(mode.id, next, emotion, intensity)) }
                .onSuccess {
                    emotion = it.emotion.takeIf(libbyEmotions::contains) ?: "default"
                    // Persist the reply's intensity into the shared session meter.
                    LibbyMeter.set(it.intensity)
                    messages = next + ChatMessage("assistant", it.message)
                }
                .onFailure { error = it.message ?: "Libby couldn't answer" }
            busy = false
        }
    }

    Scaffold(topBar = {
        TopAppBar(
            title = { Column { Text("Chat with Libby"); status?.model?.takeIf { it.isNotEmpty() }?.let {
                Text(it, style = MaterialTheme.typography.labelSmall)
            } } },
            navigationIcon = { IconButton(onClick = onBack) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
            } },
        )
    }) { padding ->
        Column(Modifier.padding(padding).fillMaxSize()) {
            // Hiding Libby drops her portrait; the mode chips stay, since modes change
            // how the assistant answers, not how it looks. A worn outfit swaps the art
            // per emotion, falling back to the bundled default when the outfit lacks one.
            if (!repo.prefs.hideLibby) {
                val outfit = repo.prefs.libbyOutfit
                // Outfit art can vary by horniness tier (level = intensity-1); fall back
                // to the bundled emotion art when the outfit lacks that tier/emotion.
                SubcomposeAsyncImage(
                    model = if (outfit.isEmpty()) "file:///android_asset/${libbyAsset(emotion)}"
                    else repo.libbyEmotionUrl(outfit, emotion, LibbyMeter.tier(intensity)),
                    imageLoader = repo.imageLoader,
                    contentDescription = "Libby",
                    contentScale = ContentScale.Fit,
                    modifier = Modifier.fillMaxWidth().height(180.dp),
                    error = {
                        AsyncImage(
                            model = "file:///android_asset/${libbyAsset(emotion)}",
                            contentDescription = "Libby",
                            contentScale = ContentScale.Fit,
                            modifier = Modifier.fillMaxWidth().height(180.dp),
                        )
                    },
                )
            }
            Row(
                Modifier.fillMaxWidth().padding(horizontal = 12.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                libbyModes.forEach { item ->
                    AssistChip(onClick = { mode = item; emotion = item.emotion }, label = { Text(item.label) },
                        leadingIcon = if (item == mode) ({ Text("✓") }) else null)
                }
            }
            Row(
                Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()).padding(horizontal = 12.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                libbyEmotions.forEach { item ->
                    AssistChip(onClick = { emotion = item }, label = { Text(if (item == "horniness") "Horniness" else item.replaceFirstChar(Char::uppercase)) },
                        leadingIcon = if (item == emotion) ({ Text("✓") }) else null)
                }
            }
            // Horniness / intensity, backed by the shared session meter.
            Row(
                Modifier.fillMaxWidth().padding(horizontal = 12.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                Text("Horniness", modifier = Modifier.align(Alignment.CenterVertically))
                (1..5).forEach { level ->
                    AssistChip(onClick = { LibbyMeter.set(level) }, label = { Text(level.toString()) },
                        leadingIcon = if (level == intensity) ({ Text("✓") }) else null)
                }
            }
            LazyColumn(
                state = list,
                modifier = Modifier.weight(1f).fillMaxWidth().padding(horizontal = 12.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                if (status?.enabled == false) item {
                    Text("Configure the local LLM URL and model in the web Settings screen.",
                        color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(16.dp))
                }
                items(messages) { message ->
                    Box(Modifier.fillMaxWidth(), contentAlignment = if (message.role == "user") Alignment.CenterEnd else Alignment.CenterStart) {
                        Surface(
                            color = if (message.role == "user") MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceVariant,
                            shape = RoundedCornerShape(16.dp),
                            modifier = Modifier.fillMaxWidth(0.82f),
                        ) { Text(message.content, Modifier.padding(12.dp)) }
                    }
                }
                if (busy) item { CircularProgressIndicator(Modifier.padding(12.dp)) }
            }
            if (error.isNotEmpty()) Text(error, color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.labelSmall, modifier = Modifier.padding(horizontal = 16.dp, vertical = 4.dp))
            Row(Modifier.fillMaxWidth().padding(10.dp), verticalAlignment = Alignment.CenterVertically) {
                TextField(
                    value = draft, onValueChange = { draft = it }, placeholder = { Text("Message Libby…") },
                    enabled = status?.enabled == true && !busy, maxLines = 4,
                    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Send),
                    keyboardActions = KeyboardActions(onSend = { send() }),
                    modifier = Modifier.weight(1f),
                )
                IconButton(onClick = { send() }, enabled = draft.isNotBlank() && !busy && status?.enabled == true) {
                    Icon(Icons.AutoMirrored.Filled.Send, contentDescription = "Send")
                }
            }
        }
    }
}
