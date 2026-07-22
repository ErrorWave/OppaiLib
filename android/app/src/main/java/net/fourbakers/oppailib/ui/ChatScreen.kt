package net.fourbakers.oppailib.ui

import android.util.Base64
import androidx.activity.compose.BackHandler
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.Send
import androidx.compose.material.icons.filled.AddComment
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.DeleteSweep
import androidx.compose.material.icons.filled.Group
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Slider
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.material3.rememberDrawerState
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
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.put
import kotlinx.serialization.json.buildJsonObject
import net.fourbakers.oppailib.data.ChatCharacter
import net.fourbakers.oppailib.data.ChatConversation
import net.fourbakers.oppailib.data.ChatImage
import net.fourbakers.oppailib.data.ChatImageUpload
import net.fourbakers.oppailib.data.ChatMessage
import net.fourbakers.oppailib.data.ChatModels
import net.fourbakers.oppailib.data.ChatRequest
import net.fourbakers.oppailib.data.ChatStatus
import net.fourbakers.oppailib.data.ChatWorkspace
import net.fourbakers.oppailib.data.LibbyMeter
import net.fourbakers.oppailib.data.LibbyVoice
import net.fourbakers.oppailib.data.LoadChatModelRequest
import net.fourbakers.oppailib.data.Repository
import net.fourbakers.oppailib.data.StoredChatMessage
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.UUID

private object ChatColors {
    val rail: Color @Composable get() = MaterialTheme.colorScheme.surface
    val side: Color @Composable get() = MaterialTheme.colorScheme.surfaceVariant
    val main: Color @Composable get() = MaterialTheme.colorScheme.background
    val input: Color @Composable get() = MaterialTheme.colorScheme.surfaceVariant
    val text: Color @Composable get() = MaterialTheme.colorScheme.onSurface
    val muted: Color @Composable get() = MaterialTheme.colorScheme.onSurfaceVariant
    val accent: Color @Composable get() = MaterialTheme.colorScheme.primary
    val danger: Color @Composable get() = MaterialTheme.colorScheme.error
}

private data class ChatMode(val id: String, val label: String, val emotion: String)
private val chatModes = listOf(
    ChatMode("sweet", "sweet", "happy"), ChatMode("playful", "playful", "mischievous"),
    ChatMode("bold", "bold", "surprised"), ChatMode("roleplay", "roleplay", "thinking"),
)
private val chatEmotions = listOf("neutral", "happy", "mischievous", "surprised", "thinking")
private fun chatID() = UUID.randomUUID().toString().replace("-", "")
private val chatStamp = SimpleDateFormat("h:mm a", Locale.getDefault())
private fun timeOf(ms: Long) = chatStamp.format(Date(ms))
private fun baseOptions() = buildJsonObject { put("temperature", .8); put("top_p", .95); put("repetition_penalty", 1.1); put("max_tokens", 400) }

@Composable
fun ChatScreen(repo: Repository, onBack: () -> Unit) {
    var status by remember { mutableStateOf<ChatStatus?>(null) }
    var models by remember { mutableStateOf<ChatModels?>(null) }
    var workspace by remember { mutableStateOf<ChatWorkspace?>(null) }
    var characterId by remember { mutableStateOf("libby") }
    var conversationId by remember { mutableStateOf("") }
    var draft by remember { mutableStateOf("") }
    var busy by remember { mutableStateOf(false) }
    var message by remember { mutableStateOf("") }
    var settingsOpen by remember { mutableStateOf(false) }
    var settingsTab by remember { mutableStateOf("character") }
    var addFriend by remember { mutableStateOf(false) }
    var friendName by remember { mutableStateOf("") }
    var imageTags by remember { mutableStateOf("") }
    val intensity by LibbyMeter.value.collectAsState()
    val scope = rememberCoroutineScope()
    val list = rememberLazyListState()
    val drawer = rememberDrawerState(DrawerValue.Closed)
    val context = LocalContext.current

    fun save(next: ChatWorkspace, quiet: Boolean = true) {
        workspace = next
        scope.launch {
            runCatching { repo.api.saveChatWorkspace(next) }
                .onSuccess { workspace = it }
                .onFailure { if (!quiet) message = it.message ?: "Couldn't save chat" }
        }
    }

    fun conversations(ws: ChatWorkspace, id: String) = ws.conversations.filter { it.characterId == id }.sortedByDescending { it.updatedAt }
    fun currentCharacter(ws: ChatWorkspace?) = ws?.characters?.firstOrNull { it.id == characterId } ?: ws?.characters?.firstOrNull()
    fun currentConversation(ws: ChatWorkspace?) = ws?.conversations?.firstOrNull { it.id == conversationId }

    fun newConversation(ws: ChatWorkspace, char: ChatCharacter): ChatWorkspace {
        val now = System.currentTimeMillis()
        val opener = if (char.firstMessage.isNotBlank()) char.firstMessage else if (char.id == "libby") LibbyVoice.opener(char.defaultMode).message else ""
        val convo = ChatConversation(
            id = chatID(), characterId = char.id, mode = char.defaultMode, emotion = chatModes.firstOrNull { it.id == char.defaultMode }?.emotion ?: "neutral",
            intensity = if (char.id == "libby") intensity else 1, progress = if (char.id == "libby") intensity.toDouble() else 1.0, options = baseOptions(),
            messages = if (opener.isBlank()) emptyList() else listOf(StoredChatMessage(chatID(), "assistant", opener, now)), createdAt = now, updatedAt = now,
        )
        characterId = char.id; conversationId = convo.id
        return ws.copy(conversations = ws.conversations + convo)
    }

    fun updateConversation(transform: (ChatConversation) -> ChatConversation) {
        val ws = workspace ?: return
        save(ws.copy(conversations = ws.conversations.map { if (it.id == conversationId) transform(it).copy(updatedAt = System.currentTimeMillis()) else it }))
    }

    fun updateCharacter(transform: (ChatCharacter) -> ChatCharacter) {
        val ws = workspace ?: return
        save(ws.copy(characters = ws.characters.map { if (it.id == characterId) transform(it) else it }))
    }

    val imagePicker = rememberLauncherForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        val ws = workspace; val char = currentCharacter(ws)
        if (uri != null && ws != null && char != null) scope.launch {
            message = "Scanning image locally…"
            runCatching {
                val bytes = context.contentResolver.openInputStream(uri)!!.use { it.readBytes() }
                require(bytes.size <= 8 * 1024 * 1024) { "Image must be 8 MB or smaller" }
                val mime = context.contentResolver.getType(uri) ?: "image/jpeg"
                val data = "data:$mime;base64," + Base64.encodeToString(bytes, Base64.NO_WRAP)
                repo.api.uploadChatImage(ChatImageUpload(char.id, "Character image", data, imageTags.split(",").map(String::trim).filter(String::isNotBlank)))
            }.onSuccess { image ->
                val chars = ws.characters.map { if (it.id == char.id && it.avatarImageId.isBlank()) it.copy(avatarImageId = image.id) else it }
                save(ws.copy(characters = chars, images = ws.images + image)); imageTags = ""; message = "Image scanned: ${image.tags.joinToString().ifBlank { "no content tags" }}"
            }.onFailure { message = it.message ?: "Image upload failed" }
        }
    }

    val cardImporter = rememberLauncherForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        val ws = workspace
        if (uri != null && ws != null) scope.launch {
            runCatching {
                val bytes = context.contentResolver.openInputStream(uri)!!.use { it.readBytes() }
                importedChatCharacter(bytes)
            }.onSuccess { char -> val next = newConversation(ws.copy(characters = ws.characters + char), char); save(next); message = "${char.name} joined your friends." }
                .onFailure { message = "Couldn't import that character card." }
        }
    }

    LaunchedEffect(Unit) {
        runCatching { status = repo.api.chatStatus(); repo.api.chatWorkspace() }
            .onSuccess { loaded ->
                var next = loaded
                val char = loaded.characters.firstOrNull() ?: return@onSuccess
                characterId = char.id
                val convo = conversations(loaded, char.id).firstOrNull()
                if (convo == null) next = newConversation(loaded, char) else conversationId = convo.id
                workspace = next
                if (next !== loaded) save(next)
            }.onFailure { message = it.message ?: "Couldn't reach chat" }
        if (status?.modelBackend == true) models = runCatching { repo.api.chatModels() }.getOrNull()
    }

    val active = currentConversation(workspace)
    LaunchedEffect(active?.messages?.size, busy) {
        // Intro is index 0, so N messages end at index N; typing is N+1.
        val target = (active?.messages?.size ?: 0) + if (busy) 1 else 0
        if (target >= 0) list.animateScrollToItem(target)
    }

    fun sendMessage() {
        val ws = workspace ?: return; val char = currentCharacter(ws) ?: return; val convo = currentConversation(ws) ?: return
        val text = draft.trim(); if (text.isBlank() || busy) return
        val now = System.currentTimeMillis(); val userLine = StoredChatMessage(chatID(), "user", text, now)
        val pending = convo.copy(title = if (convo.title == "New conversation") text.take(42) else convo.title, messages = convo.messages + userLine, updatedAt = now)
        workspace = ws.copy(conversations = ws.conversations.map { if (it.id == convo.id) pending else it }); draft = ""; busy = true; message = ""
        scope.launch {
            if (status?.enabled != true) {
                if (char.id != "libby") { message = "Configure a local chat model to talk with custom friends."; busy = false; return@launch }
                val progression = LibbyMeter.applyProgression(pending.progress, LibbyVoice.heatDelta(text, pending.mode))
                val line = LibbyVoice.reply(text, pending.mode, pending.emotion, progression.second, advance = false); delay(350)
                LibbyMeter.set(progression.second)
                val done = pending.copy(emotion = line.emotion, intensity = progression.second, progress = progression.first, messages = pending.messages + StoredChatMessage(chatID(), "assistant", line.message, System.currentTimeMillis()), updatedAt = System.currentTimeMillis())
                save(workspace!!.copy(conversations = workspace!!.conversations.map { if (it.id == done.id) done else it })); busy = false; return@launch
            }
            val history = pending.messages.map { ChatMessage(it.role, it.content) }
            runCatching { repo.api.chat(ChatRequest(pending.mode, history, pending.emotion, pending.intensity, pending.options, char.id)) }
                .onSuccess { reply ->
                    val progression = LibbyMeter.applyProgression(pending.progress, reply.intensity - pending.intensity)
                    LibbyMeter.set(progression.second)
                    val done = pending.copy(emotion = reply.emotion, intensity = progression.second, progress = progression.first, messages = pending.messages + StoredChatMessage(chatID(), "assistant", reply.message, System.currentTimeMillis(), reply.imageId), updatedAt = System.currentTimeMillis())
                    val latest = workspace ?: ws; save(latest.copy(conversations = latest.conversations.map { if (it.id == done.id) done else it }))
                }.onFailure { message = it.message ?: "Chat failed" }
            busy = false
        }
    }

    BackHandler(onBack = onBack)
    if (addFriend) AlertDialog(
        onDismissRequest = { addFriend = false }, title = { Text("Add a friend") },
        text = { TextField(friendName, { friendName = it }, label = { Text("Name") }) },
        confirmButton = { Button(onClick = {
            val ws = workspace ?: return@Button; val char = ChatCharacter(chatID(), friendName.trim().ifBlank { "New friend" }, firstMessage = "Hey! It's nice to meet you.")
            save(newConversation(ws.copy(characters = ws.characters + char), char)); friendName = ""; addFriend = false; settingsOpen = true
        }) { Text("Add") } }, dismissButton = { TextButton(onClick = { addFriend = false }) { Text("Cancel") } },
    )

    ModalNavigationDrawer(
        drawerState = drawer,
        drawerContent = { workspace?.let { ws -> ChatDrawer(repo, ws, characterId, conversationId, status?.enabled == true,
            onCharacter = { id -> characterId = id; val c = conversations(ws, id).firstOrNull(); if (c == null) save(newConversation(ws, ws.characters.first { it.id == id })) else conversationId = c.id; scope.launch { drawer.close() } },
            onConversation = { conversationId = it; characterId = ws.conversations.first { c -> c.id == it }.characterId; scope.launch { drawer.close() } },
            onNewConversation = { val char = currentCharacter(ws) ?: return@ChatDrawer; save(newConversation(ws, char)); scope.launch { drawer.close() } }, onAddFriend = { addFriend = true }) } },
    ) {
        val ws = workspace; val char = currentCharacter(ws); val convo = currentConversation(ws)
        if (ws == null || char == null || convo == null) Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { CircularProgressIndicator() }
        else Column(Modifier.fillMaxSize().background(ChatColors.main)) {
            Row(Modifier.fillMaxWidth().height(52.dp).padding(horizontal = 4.dp), verticalAlignment = Alignment.CenterVertically) {
                IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Filled.ArrowBack, "Back", tint = ChatColors.muted) }
                IconButton(onClick = { scope.launch { drawer.open() } }) { Icon(Icons.Filled.Menu, "Friends and conversations", tint = ChatColors.muted) }
                Text("@ ${char.name}", color = ChatColors.text, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1f))
                IconButton(onClick = { save(newConversation(ws, char)) }) { Icon(Icons.Filled.AddComment, "New conversation") }
                IconButton(onClick = { if (convo.messages.isNotEmpty()) updateConversation { it.copy(messages = emptyList(), title = "New conversation") } }) { Icon(Icons.Filled.DeleteSweep, "Clear messages") }
                IconButton(onClick = { settingsOpen = !settingsOpen }) { Icon(Icons.Filled.Settings, "Chat settings", tint = if (settingsOpen) ChatColors.accent else ChatColors.muted) }
            }
            if (settingsOpen) ChatSettings(
                repo, ws, char, convo, settingsTab, imageTags, models,
                onTab = { settingsTab = it }, onCharacter = { updateCharacter { _ -> it } }, onConversation = { replacement -> updateConversation { replacement } },
                onProfile = { save(ws.copy(profile = it)) }, onImageTags = { imageTags = it }, onPickImage = { imagePicker.launch("image/*") },
                onImport = { cardImporter.launch("*/*") }, onDeleteImage = { image -> scope.launch { runCatching { repo.api.deleteChatImage(image.id) }; save(ws.copy(images = ws.images - image, characters = ws.characters.map { if (it.avatarImageId == image.id) it.copy(avatarImageId = "") else it })) } },
                onLoadModel = { model -> scope.launch { message = "Loading $model…"; runCatching { repo.api.loadChatModel(LoadChatModelRequest(model)) }.onSuccess { models = repo.api.chatModels(); status = repo.api.chatStatus(); message = "$model is loaded." }.onFailure { message = it.message ?: "Model load failed" } } },
                onUnloadModel = { scope.launch { message = "Unloading chat model…"; runCatching { repo.api.unloadChatModel() }.onSuccess { models = repo.api.chatModels(); status = status?.copy(enabled = false); message = "Chat model unloaded." }.onFailure { message = it.message ?: "Model unload failed" } } },
                onRefreshModels = { scope.launch { models = runCatching { repo.api.chatModels() }.getOrNull() } },
            )
            LazyColumn(state = list, modifier = Modifier.weight(1f).fillMaxWidth(), contentPadding = PaddingValues(bottom = 12.dp)) {
                item { ChatIntro(repo, char, convo, status) }
                itemsIndexed(convo.messages, key = { _, item -> item.id }) { index, item -> ChatMessageRow(repo, ws, char, item, convo.messages.getOrNull(index - 1)) }
                if (busy) item { Text("${char.name} is typing…", color = ChatColors.muted, fontSize = 13.sp, modifier = Modifier.padding(start = 68.dp, top = 8.dp)) }
            }
            if (message.isNotBlank()) Text(message, color = if (message.contains("fail", true) || message.contains("couldn", true)) ChatColors.danger else ChatColors.muted, fontSize = 13.sp, modifier = Modifier.fillMaxWidth().background(ChatColors.side).padding(10.dp))
            Row(Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 8.dp), verticalAlignment = Alignment.CenterVertically) {
                TextField(draft, { draft = it }, placeholder = { Text("Message @${char.name}") }, enabled = !busy, maxLines = 4,
                    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Send), keyboardActions = KeyboardActions(onSend = { sendMessage() }),
                    colors = TextFieldDefaults.colors(focusedContainerColor = ChatColors.input, unfocusedContainerColor = ChatColors.input), modifier = Modifier.weight(1f))
                IconButton(onClick = { sendMessage() }, enabled = draft.isNotBlank() && !busy) { Icon(Icons.AutoMirrored.Filled.Send, "Send") }
            }
        }
    }
}

@Composable
private fun ChatDrawer(
    repo: Repository, ws: ChatWorkspace, characterId: String, conversationId: String, online: Boolean,
    onCharacter: (String) -> Unit, onConversation: (String) -> Unit, onNewConversation: () -> Unit, onAddFriend: () -> Unit,
) {
    Row(Modifier.fillMaxHeight().width(330.dp)) {
        Column(Modifier.fillMaxHeight().width(72.dp).background(ChatColors.rail).padding(vertical = 10.dp), horizontalAlignment = Alignment.CenterHorizontally) {
            ws.characters.forEach { char -> Box(Modifier.padding(vertical = 4.dp).size(48.dp).clip(if (char.id == characterId) RoundedCornerShape(14.dp) else CircleShape).background(ChatColors.input).clickable { onCharacter(char.id) }) { ChatAvatar(repo, char, Modifier.fillMaxSize()) } }
            IconButton(onClick = onAddFriend) { Icon(Icons.Filled.Group, "Add friend", tint = ChatColors.accent) }
        }
        Column(Modifier.fillMaxHeight().weight(1f).background(ChatColors.side)) {
            Row(Modifier.fillMaxWidth().padding(16.dp), verticalAlignment = Alignment.CenterVertically) { Text(ws.characters.firstOrNull { it.id == characterId }?.name ?: "Chat", fontWeight = FontWeight.Bold, modifier = Modifier.weight(1f)); IconButton(onClick = onNewConversation) { Icon(Icons.Filled.AddComment, "New") } }
            Text("CONVERSATIONS", color = ChatColors.muted, fontSize = 11.sp, modifier = Modifier.padding(horizontal = 16.dp, vertical = 5.dp))
            LazyColumn(Modifier.weight(1f)) { items(ws.conversations.filter { it.characterId == characterId }.sortedByDescending { it.updatedAt }) { convo -> Text(convo.title, color = if (convo.id == conversationId) ChatColors.text else ChatColors.muted, modifier = Modifier.fillMaxWidth().clickable { onConversation(convo.id) }.background(if (convo.id == conversationId) ChatColors.input else Color.Transparent).padding(12.dp)) } }
            Text(if (online) "Online" else "Local mode", color = ChatColors.muted, modifier = Modifier.padding(16.dp))
        }
    }
}

@Composable
private fun ChatSettings(
    repo: Repository, ws: ChatWorkspace, char: ChatCharacter, convo: ChatConversation, tab: String, imageTags: String, models: ChatModels?,
    onTab: (String) -> Unit, onCharacter: (ChatCharacter) -> Unit, onConversation: (ChatConversation) -> Unit,
    onProfile: (net.fourbakers.oppailib.data.ChatProfile) -> Unit, onImageTags: (String) -> Unit, onPickImage: () -> Unit,
    onImport: () -> Unit, onDeleteImage: (ChatImage) -> Unit,
    onLoadModel: (String) -> Unit, onUnloadModel: () -> Unit, onRefreshModels: () -> Unit,
) {
    var advancedOptions by remember(convo.id) { mutableStateOf(convo.options.toString()) }
    Column(Modifier.fillMaxWidth().background(ChatColors.side).padding(12.dp)) {
        Row(Modifier.horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(5.dp)) { listOf("character", "generation", "images", "profile").forEach { name -> Text(name.replaceFirstChar(Char::uppercase), color = if (tab == name) MaterialTheme.colorScheme.onPrimary else ChatColors.text, modifier = Modifier.clip(RoundedCornerShape(5.dp)).background(if (tab == name) ChatColors.accent else ChatColors.input).clickable { onTab(name) }.padding(horizontal = 11.dp, vertical = 7.dp)) } }
        when (tab) {
            "character" -> Column(Modifier.fillMaxWidth().padding(top = 8.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                TextField(char.name, { onCharacter(char.copy(name = it)) }, label = { Text("Name") }, modifier = Modifier.fillMaxWidth())
                TextField(char.description, { onCharacter(char.copy(description = it)) }, label = { Text("Description") }, maxLines = 2, modifier = Modifier.fillMaxWidth())
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) { TextField(char.personality, { onCharacter(char.copy(personality = it)) }, label = { Text("Personality") }, maxLines = 3, modifier = Modifier.weight(1f)); TextField(char.scenario, { onCharacter(char.copy(scenario = it)) }, label = { Text("Scenario") }, maxLines = 3, modifier = Modifier.weight(1f)) }
                TextField(char.systemPrompt, { onCharacter(char.copy(systemPrompt = it)) }, label = { Text("System prompt") }, maxLines = 3, modifier = Modifier.fillMaxWidth())
                TextField(char.firstMessage, { onCharacter(char.copy(firstMessage = it)) }, label = { Text("First message") }, maxLines = 2, modifier = Modifier.fillMaxWidth())
                Text("Default mode", color = ChatColors.muted, fontSize = 12.sp); Row(Modifier.horizontalScroll(rememberScrollState())) { chatModes.forEach { mode -> Text(mode.label, modifier = Modifier.clip(RoundedCornerShape(4.dp)).background(if (char.defaultMode == mode.id) ChatColors.accent else ChatColors.input).clickable { onCharacter(char.copy(defaultMode = mode.id)) }.padding(10.dp, 6.dp)) } }
                Text("Card weight ${"%.2f".format(char.promptWeight)}", color = ChatColors.muted); Slider(char.promptWeight.toFloat(), { onCharacter(char.copy(promptWeight = it.toDouble())) }, valueRange = .1f..2f)
                OutlinedButton(onClick = onImport) { Text("Import SillyTavern JSON") }
            }
            "generation" -> Column(Modifier.fillMaxWidth().padding(top = 8.dp)) {
                Text("Loaded model", color = ChatColors.muted)
                Row(Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(5.dp)) {
                    models?.models?.forEach { model -> FilterChip(selected = model == models.loaded, enabled = models.supported, onClick = { onLoadModel(model) }, label = { Text(model) }) }
                }
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    OutlinedButton(onClick = onUnloadModel, enabled = models?.supported == true && models.loaded.isNotBlank()) { Text("Unload") }
                    OutlinedButton(onClick = onRefreshModels) { Text("Refresh") }
                }
                if (models != null && !models.supported) Text("This backend lists models but does not support in-app loading.", color = ChatColors.muted, fontSize = 11.sp)
                Text("Mode", color = ChatColors.muted); Row(Modifier.horizontalScroll(rememberScrollState())) { chatModes.forEach { mode -> Text(mode.label, modifier = Modifier.clip(RoundedCornerShape(4.dp)).background(if (convo.mode == mode.id) ChatColors.accent else ChatColors.input).clickable { onConversation(convo.copy(mode = mode.id)) }.padding(10.dp, 6.dp)) } }
                ChatSlider("Temperature", convo.options, "temperature", 0f, 2f, .8f) { onConversation(convo.copy(options = convo.options.withNumber("temperature", it))) }
                ChatSlider("Top P", convo.options, "top_p", .05f, 1f, .95f) { onConversation(convo.copy(options = convo.options.withNumber("top_p", it))) }
                ChatSlider("Repetition penalty", convo.options, "repetition_penalty", 1f, 2f, 1.1f) { onConversation(convo.copy(options = convo.options.withNumber("repetition_penalty", it))) }
                ChatSlider("Max reply tokens", convo.options, "max_tokens", 64f, 2048f, 400f) { onConversation(convo.copy(options = convo.options.withNumber("max_tokens", it))) }
                Text("Horniness ${convo.intensity}/5", color = ChatColors.muted); Slider(convo.intensity.toFloat(), { LibbyMeter.set(it.toInt()); onConversation(convo.copy(intensity = it.toInt(), progress = it.toDouble())) }, valueRange = 1f..5f, steps = 3)
                TextField(advancedOptions, { advancedOptions = it }, label = { Text("Advanced API options (JSON)") }, minLines = 2, maxLines = 4, modifier = Modifier.fillMaxWidth())
                OutlinedButton(onClick = { runCatching { Json.parseToJsonElement(advancedOptions).jsonObject }.onSuccess { onConversation(convo.copy(options = it)) } }) { Text("Apply advanced options") }
            }
            "images" -> Column(Modifier.fillMaxWidth().padding(top = 8.dp)) {
                Text("Uploads are scanned locally and sent only when tags match the chat.", color = ChatColors.muted, fontSize = 12.sp)
                TextField(imageTags, onImageTags, label = { Text("Extra tags: beach, happy…") }, modifier = Modifier.fillMaxWidth())
                Button(onClick = onPickImage, modifier = Modifier.padding(vertical = 5.dp)) { Text("Upload and scan") }
                Row(Modifier.horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(8.dp)) { ws.images.filter { it.characterId == char.id }.forEach { image -> Column(Modifier.width(110.dp)) { AsyncImage(repo.chatImageUrl(image.id), image.name, imageLoader = repo.imageLoader, modifier = Modifier.size(110.dp).clip(RoundedCornerShape(7.dp))); Text(image.tags.joinToString().ifBlank { "No tags" }, fontSize = 10.sp, maxLines = 2); TextButton(onClick = { onDeleteImage(image) }) { Text("Delete", color = ChatColors.danger) } } } }
            }
            "profile" -> Column(Modifier.fillMaxWidth().padding(top = 8.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                TextField(ws.profile.displayName, { onProfile(ws.profile.copy(displayName = it)) }, label = { Text("Display name") }, modifier = Modifier.fillMaxWidth())
                TextField(ws.profile.persona, { onProfile(ws.profile.copy(persona = it)) }, label = { Text("Your persona") }, maxLines = 4, modifier = Modifier.fillMaxWidth())
            }
        }
    }
}

private fun JsonObject.withNumber(key: String, value: Float) = buildJsonObject { this@withNumber.forEach { (k, v) -> put(k, v) }; put(key, value.toDouble()) }

@Composable
private fun ChatSlider(label: String, options: JsonObject, key: String, min: Float, max: Float, fallback: Float, onChange: (Float) -> Unit) {
    val value = options[key]?.jsonPrimitive?.doubleOrNull?.toFloat()?.coerceIn(min, max) ?: fallback
    Text("$label ${"%.2f".format(value)}", color = ChatColors.muted, fontSize = 12.sp); Slider(value, onChange, valueRange = min..max)
}

@Composable
private fun ChatIntro(repo: Repository, char: ChatCharacter, convo: ChatConversation, status: ChatStatus?) {
    Column(Modifier.fillMaxWidth().padding(16.dp)) { ChatAvatar(repo, char, Modifier.size(68.dp).clip(CircleShape)); Text(char.name, color = ChatColors.text, fontSize = 25.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(top = 8.dp)); Text(char.description.ifBlank { "This is the beginning of your conversation with ${char.name}." } + if (status?.enabled == true) " Running on ${status.model}." else " Local reply mode.", color = ChatColors.muted, fontSize = 13.sp) }
}

@Composable
private fun ChatAvatar(repo: Repository, char: ChatCharacter, modifier: Modifier) {
    if (char.avatarImageId.isNotBlank()) AsyncImage(repo.chatImageUrl(char.avatarImageId), char.name, imageLoader = repo.imageLoader, modifier = modifier)
    else if (char.id == "libby" && !repo.prefs.hideLibby) LibbyPortrait(repo, "happy", LibbyMeter.tier(), mascotAsset("happy", LibbyMeter.tier()), modifier)
    else Box(modifier.background(ChatColors.accent), contentAlignment = Alignment.Center) { Text(char.name.take(2).uppercase(), color = MaterialTheme.colorScheme.onPrimary, fontWeight = FontWeight.Bold) }
}

@Composable
private fun ChatMessageRow(repo: Repository, ws: ChatWorkspace, char: ChatCharacter, entry: StoredChatMessage, previous: StoredChatMessage?) {
    val grouped = previous?.role == entry.role && entry.at - previous.at < 5 * 60_000; val friend = entry.role == "assistant"; val name = if (friend) char.name else ws.profile.displayName.ifBlank { repo.prefs.reauthUsername ?: "You" }
    Row(Modifier.fillMaxWidth().padding(start = 12.dp, end = 12.dp, top = if (grouped) 1.dp else 14.dp), verticalAlignment = Alignment.Top) {
        Box(Modifier.width(52.dp), contentAlignment = Alignment.TopCenter) { if (!grouped) { if (friend) ChatAvatar(repo, char, Modifier.size(40.dp).clip(CircleShape)) else Box(Modifier.size(40.dp).clip(CircleShape).background(ChatColors.accent), contentAlignment = Alignment.Center) { Text(name.take(2).uppercase(), color = MaterialTheme.colorScheme.onPrimary, fontWeight = FontWeight.Bold) } } }
        Column(Modifier.weight(1f)) { if (!grouped) Row(verticalAlignment = Alignment.Bottom) { Text(name, color = if (friend) ChatColors.accent else ChatColors.text, fontWeight = FontWeight.SemiBold); if (friend) Text(" BOT ", color = MaterialTheme.colorScheme.onPrimary, fontSize = 9.sp, modifier = Modifier.padding(start = 5.dp).clip(RoundedCornerShape(3.dp)).background(ChatColors.accent)); Text("  ${timeOf(entry.at)}", color = ChatColors.muted, fontSize = 11.sp) }; Text(richChatText(entry.content), color = ChatColors.text, fontSize = 15.sp); if (entry.imageId.isNotBlank()) AsyncImage(repo.chatImageUrl(entry.imageId), "Image sent by $name", imageLoader = repo.imageLoader, modifier = Modifier.fillMaxWidth().height(300.dp).padding(top = 7.dp).clip(RoundedCornerShape(8.dp))) }
    }
}

private fun richChatText(text: String): AnnotatedString = buildAnnotatedString {
    val regex = Regex("(\\*\\*[^*\\n]+\\*\\*|\\*[^*\\n]+\\*|\"[^\"\\n]+\")")
    var at = 0
    regex.findAll(text).forEach { match ->
        append(text.substring(at, match.range.first)); val token = match.value
        when { token.startsWith("**") -> { pushStyle(SpanStyle(fontWeight = FontWeight.Bold, fontStyle = FontStyle.Italic)); append(token.drop(2).dropLast(2)); pop() }
            token.startsWith("*") -> { pushStyle(SpanStyle(fontStyle = FontStyle.Italic)); append(token.drop(1).dropLast(1)); pop() }
            else -> { pushStyle(SpanStyle(fontWeight = FontWeight.Medium)); append(token); pop() } }
        at = match.range.last + 1
    }
    append(text.substring(at))
}

/** Reads either Character Card V2 JSON or SillyTavern's PNG `chara` tEXt chunk. */
private fun importedChatCharacter(bytes: ByteArray): ChatCharacter {
    var jsonText = bytes.toString(Charsets.UTF_8)
    if (bytes.size > 8 && bytes[0].toInt() == 0x89 - 0x100 && bytes.copyOfRange(1, 4).contentEquals(byteArrayOf(0x50, 0x4e, 0x47))) {
        var offset = 8
        while (offset + 12 <= bytes.size) {
            val length = ((bytes[offset].toInt() and 255) shl 24) or ((bytes[offset + 1].toInt() and 255) shl 16) or
                ((bytes[offset + 2].toInt() and 255) shl 8) or (bytes[offset + 3].toInt() and 255)
            if (length < 0 || offset + length + 12 > bytes.size) break
            val type = bytes.copyOfRange(offset + 4, offset + 8).toString(Charsets.US_ASCII)
            if (type == "tEXt") {
                val payload = bytes.copyOfRange(offset + 8, offset + 8 + length)
                val split = payload.indexOf(0)
                if (split > 0 && payload.copyOfRange(0, split).toString(Charsets.ISO_8859_1) == "chara") {
                    jsonText = Base64.decode(payload.copyOfRange(split + 1, payload.size), Base64.DEFAULT).toString(Charsets.UTF_8)
                    break
                }
            }
            offset += length + 12
        }
    }
    val root = Json.parseToJsonElement(jsonText).jsonObject
    val data = root["data"]?.jsonObject ?: root
    fun value(name: String, fallback: String = "") = data[name]?.jsonPrimitive?.content ?: fallback
    return ChatCharacter(
        id = chatID(), name = value("name", "Imported friend"), description = value("description"), personality = value("personality"),
        scenario = value("scenario"), firstMessage = value("first_mes", value("firstMessage")), exampleDialogue = value("mes_example"),
        systemPrompt = value("system_prompt"), creatorNotes = value("creator_notes"), defaultMode = "roleplay",
    )
}
