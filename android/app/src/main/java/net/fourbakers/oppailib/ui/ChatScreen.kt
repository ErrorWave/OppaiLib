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
import androidx.compose.material3.Slider
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
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
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

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ChatScreen(repo: Repository, onBack: () -> Unit) {
    var status by remember { mutableStateOf<ChatStatus?>(null) }
    var mode by remember { mutableStateOf(libbyModes.first()) }
    var messages by remember { mutableStateOf<List<ChatMessage>>(emptyList()) }
    var draft by remember { mutableStateOf("") }
    var busy by remember { mutableStateOf(false) }
    var error by remember { mutableStateOf("") }
    val scope = rememberCoroutineScope()
    val list = rememberLazyListState()
    val meter by LibbyMeter.value.collectAsState()
    val tier = LibbyMeter.tier(meter)

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
        // Talking to Libby warms her up — bolder modes push harder (see LibbyMode.heat).
        LibbyMeter.bump(mode.heat)
        scope.launch {
            runCatching { repo.api.chat(ChatRequest(mode.id, next)) }
                .onSuccess { messages = next + ChatMessage("assistant", it.message) }
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
                LibbyPortrait(
                    repo = repo,
                    emotion = mode.emotion,
                    tier = tier,
                    fallbackAsset = mode.asset,
                    modifier = Modifier.fillMaxWidth().height(180.dp),
                )
            }
            Row(
                Modifier.fillMaxWidth().padding(horizontal = 12.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                libbyModes.forEach { item ->
                    AssistChip(onClick = { mode = item }, label = { Text(item.label) },
                        leadingIcon = if (item == mode) ({ Text("✓") }) else null)
                }
            }
            // Horniness meter: rises as you chat and add to the library; set by hand too.
            Column(Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 4.dp)) {
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("Horniness", style = MaterialTheme.typography.labelMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant)
                    Text("$meter", style = MaterialTheme.typography.labelMedium,
                        color = MaterialTheme.colorScheme.primary)
                }
                Slider(
                    value = meter.toFloat(),
                    onValueChange = { LibbyMeter.set(it.toInt()) },
                    valueRange = 0f..100f,
                )
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
