package net.fourbakers.oppailib.ui

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.Tag
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.Slider
import androidx.compose.material3.Text
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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import net.fourbakers.oppailib.data.ChatMessage
import net.fourbakers.oppailib.data.ChatRequest
import net.fourbakers.oppailib.data.ChatStatus
import net.fourbakers.oppailib.data.LibbyMeter
import net.fourbakers.oppailib.data.LibbyVoice
import net.fourbakers.oppailib.data.Repository
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/**
 * Discord's dark chrome, hard-coded. Half of "looks like a Discord client" is the
 * palette, so this screen deliberately does not follow the app theme.
 */
private object Dc {
    val rail = Color(0xFF1E1F22)
    val side = Color(0xFF2B2D31)
    val main = Color(0xFF313338)
    val hover = Color(0xFF35373C)
    val input = Color(0xFF383A40)
    val text = Color(0xFFDBDEE1)
    val bright = Color(0xFFF2F3F5)
    val muted = Color(0xFF949BA4)
    val accent = Color(0xFF5865F2)
    val line = Color(0xFF3F4147)
    val libby = Color(0xFFF0A6C8)
    val danger = Color(0xFFFA777C)
}

/** Each mode is a channel in Libby's "server", and maps to one of her emotions. */
private data class LibbyChannel(val id: String, val label: String, val emotion: String, val topic: String)

private val channels = listOf(
    LibbyChannel("sweet", "sweet", "happy", "Soft, warm, and unhurried."),
    LibbyChannel("playful", "playful", "mischievous", "Teasing and quick on her feet."),
    LibbyChannel("bold", "bold", "surprised", "Blunt, uninhibited, no coyness."),
    LibbyChannel("roleplay", "roleplay", "thinking", "In character, in scene, in detail."),
)

private val libbyEmotions =
    listOf("default", "happy", "sad", "worried", "surprised", "thinking", "mischievous", "horniness")

/** A message plus who said it and when — the log renders Discord-style rows. */
private data class Entry(
    val role: String,
    val content: String,
    val at: Long,
    /** Assistant lines she wrote herself, with no model behind her. */
    val local: Boolean = false,
)

private val stamp = SimpleDateFormat("h:mm a", Locale.getDefault())
private fun timeOf(ms: Long) = stamp.format(Date(ms))

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ChatScreen(repo: Repository, onBack: () -> Unit) {
    var status by remember { mutableStateOf<ChatStatus?>(null) }
    var channel by remember { mutableStateOf(channels.first()) }
    var emotion by remember { mutableStateOf(channel.emotion) }
    // Intensity is Libby's session horniness meter (see LibbyMeter): persistent across
    // the app, nudged by library adds, and set by hand in the settings panel.
    val intensity by LibbyMeter.value.collectAsState()
    var entries by remember { mutableStateOf<List<Entry>>(emptyList()) }
    var draft by remember { mutableStateOf("") }
    var busy by remember { mutableStateOf(false) }
    var error by remember { mutableStateOf("") }
    // The settings panel is folded away until the gear is pressed — the chat is the point.
    var settingsOpen by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()
    val list = rememberLazyListState()
    val drawer = rememberDrawerState(DrawerValue.Closed)
    val me = repo.prefs.reauthUsername?.takeIf { it.isNotBlank() } ?: "You"

    LaunchedEffect(Unit) {
        runCatching { repo.api.chatStatus() }
            .onSuccess { status = it }
            .onFailure { error = it.message ?: "Couldn't reach Libby" }
        // Her opening line is written locally, so a fresh channel is never empty.
        val opener = LibbyVoice.opener(channel.id)
        emotion = opener.emotion
        entries = listOf(Entry("assistant", opener.message, System.currentTimeMillis(), local = true))
    }
    LaunchedEffect(entries.size, busy) {
        val count = entries.size + if (busy) 1 else 0
        if (count > 0) list.animateScrollToItem(count - 1)
    }
    BackHandler(onBack = onBack)

    fun send() {
        val text = draft.trim()
        if (text.isEmpty() || busy) return
        val next = entries + Entry("user", text, System.currentTimeMillis())
        entries = next
        draft = ""
        busy = true
        error = ""
        scope.launch {
            // No local LLM configured? Libby answers for herself rather than going
            // quiet — her own voice reads the message and replies from the emotion
            // and heat she's in.
            if (status?.enabled != true) {
                val line = LibbyVoice.reply(text, channel.id, emotion, intensity)
                delay(350L + (0..450).random()) // a beat of "typing"
                emotion = line.emotion
                LibbyMeter.set(line.intensity)
                entries = next + Entry("assistant", line.message, System.currentTimeMillis(), local = true)
                busy = false
                return@launch
            }
            // Lines Libby wrote herself (the opener, offline replies) are hers, not
            // the model's — they stay out of the history we hand it.
            val history = next.filterNot { it.local }.map { ChatMessage(it.role, it.content) }
            runCatching { repo.api.chat(ChatRequest(channel.id, history, emotion, intensity)) }
                .onSuccess {
                    emotion = it.emotion.takeIf(libbyEmotions::contains) ?: "default"
                    // Persist the reply's intensity into the shared session meter.
                    LibbyMeter.set(it.intensity)
                    entries = next + Entry("assistant", it.message, System.currentTimeMillis())
                }
                .onFailure { error = it.message ?: "Libby couldn't answer" }
            busy = false
        }
    }

    ModalNavigationDrawer(
        drawerState = drawer,
        drawerContent = {
            ChannelDrawer(
                repo = repo,
                current = channel,
                me = me,
                online = status?.enabled == true,
                emotion = emotion,
                intensity = intensity,
                onPick = {
                    // Switching channel puts her in that channel's pose, the way the
                    // mode picker used to. The log carries over — it's one conversation.
                    channel = it
                    emotion = it.emotion
                    scope.launch { drawer.close() }
                },
            )
        },
    ) {
        Column(Modifier.fillMaxSize().background(Dc.main)) {
            // ── channel header ───────────────────────────────────────────────
            Row(
                Modifier.fillMaxWidth().background(Dc.main).height(52.dp).padding(horizontal = 8.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                IconButton(onClick = onBack) {
                    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = Dc.muted)
                }
                Icon(Icons.Filled.Tag, contentDescription = null, tint = Dc.muted, modifier = Modifier.size(20.dp))
                Text(
                    channel.label,
                    color = Dc.bright,
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 17.sp,
                    modifier = Modifier.padding(start = 4.dp).clickable { scope.launch { drawer.open() } },
                )
                Spacer(Modifier.weight(1f))
                IconButton(onClick = { settingsOpen = !settingsOpen }) {
                    Icon(
                        Icons.Filled.Settings,
                        contentDescription = "Libby settings",
                        tint = if (settingsOpen) Dc.bright else Dc.muted,
                    )
                }
            }
            if (settingsOpen) {
                LibbySettingsPanel(emotion = emotion, intensity = intensity, onEmotion = { emotion = it })
            }

            // ── message log ──────────────────────────────────────────────────
            LazyColumn(
                state = list,
                modifier = Modifier.weight(1f).fillMaxWidth(),
                contentPadding = PaddingValues(bottom = 12.dp),
            ) {
                item { ChannelIntro(channel, status) }
                itemsIndexed(entries) { i, entry ->
                    MessageRow(
                        entry = entry,
                        previous = entries.getOrNull(i - 1),
                        repo = repo,
                        emotion = emotion,
                        intensity = intensity,
                        me = me,
                    )
                }
                if (busy) {
                    item {
                        Row(
                            Modifier.fillMaxWidth().padding(start = 68.dp, top = 6.dp),
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            CircularProgressIndicator(Modifier.size(12.dp), strokeWidth = 2.dp, color = Dc.muted)
                            Text("  Libby is typing…", color = Dc.muted, fontSize = 13.sp)
                        }
                    }
                }
            }
            if (error.isNotEmpty()) {
                Text(
                    error,
                    color = Dc.danger,
                    fontSize = 13.sp,
                    modifier = Modifier.padding(horizontal = 16.dp, vertical = 4.dp),
                )
            }

            // ── composer ─────────────────────────────────────────────────────
            Row(
                Modifier.fillMaxWidth().background(Dc.main).padding(horizontal = 12.dp, vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                TextField(
                    value = draft,
                    onValueChange = { draft = it },
                    placeholder = { Text("Message #${channel.label}", color = Dc.muted) },
                    enabled = !busy,
                    maxLines = 4,
                    shape = RoundedCornerShape(20.dp),
                    colors = TextFieldDefaults.colors(
                        focusedContainerColor = Dc.input,
                        unfocusedContainerColor = Dc.input,
                        disabledContainerColor = Dc.input,
                        focusedTextColor = Dc.text,
                        unfocusedTextColor = Dc.text,
                        cursorColor = Dc.bright,
                        focusedIndicatorColor = Color.Transparent,
                        unfocusedIndicatorColor = Color.Transparent,
                        disabledIndicatorColor = Color.Transparent,
                    ),
                    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Send),
                    keyboardActions = KeyboardActions(onSend = { send() }),
                    modifier = Modifier.weight(1f),
                )
                IconButton(onClick = { send() }, enabled = draft.isNotBlank() && !busy) {
                    Icon(
                        Icons.AutoMirrored.Filled.Send,
                        contentDescription = "Send",
                        tint = if (draft.isNotBlank() && !busy) Dc.bright else Dc.muted,
                    )
                }
            }
        }
    }
}

/** The server rail plus channel list, behind Discord's left-edge drawer. */
@Composable
private fun ChannelDrawer(
    repo: Repository,
    current: LibbyChannel,
    me: String,
    online: Boolean,
    emotion: String,
    intensity: Int,
    onPick: (LibbyChannel) -> Unit,
) {
    Row(Modifier.fillMaxHeight().width(300.dp)) {
        // Server rail: one guild, Libby's.
        Column(
            Modifier.fillMaxHeight().width(64.dp).background(Dc.rail).padding(vertical = 12.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Box(
                Modifier.size(48.dp).clip(RoundedCornerShape(14.dp)).background(Dc.accent)
                    .border(0.dp, Color.Transparent, CircleShape),
                contentAlignment = Alignment.Center,
            ) {
                if (repo.prefs.hideLibby) {
                    Text("L", color = Color.White, fontWeight = FontWeight.Bold)
                } else {
                    LibbyPortrait(
                        repo = repo,
                        emotion = emotion,
                        tier = LibbyMeter.tier(intensity),
                        fallbackAsset = mascotAsset(emotion),
                        modifier = Modifier.fillMaxSize(),
                    )
                }
            }
        }
        Column(Modifier.fillMaxHeight().weight(1f).background(Dc.side)) {
            Text(
                "Libby",
                color = Dc.bright,
                fontWeight = FontWeight.SemiBold,
                fontSize = 16.sp,
                modifier = Modifier.padding(16.dp),
            )
            Text(
                "CHANNELS",
                color = Dc.muted,
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.padding(start = 16.dp, bottom = 4.dp),
            )
            channels.forEach { c ->
                val on = c.id == current.id
                Row(
                    Modifier.fillMaxWidth().padding(horizontal = 8.dp, vertical = 1.dp)
                        .clip(RoundedCornerShape(4.dp))
                        .background(if (on) Dc.hover else Color.Transparent)
                        .clickable { onPick(c) }
                        .padding(horizontal = 8.dp, vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Icon(Icons.Filled.Tag, contentDescription = null, tint = Dc.muted, modifier = Modifier.size(18.dp))
                    Text(
                        c.label,
                        color = if (on) Dc.bright else Dc.muted,
                        fontWeight = FontWeight.Medium,
                        modifier = Modifier.padding(start = 6.dp),
                    )
                }
            }
            Spacer(Modifier.weight(1f))
            Row(
                Modifier.fillMaxWidth().background(Color(0xFF232428)).padding(10.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Box(
                    Modifier.size(32.dp).clip(CircleShape).background(Dc.accent),
                    contentAlignment = Alignment.Center,
                ) {
                    Text(me.take(2).uppercase(), color = Color.White, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                }
                Column(Modifier.padding(start = 8.dp)) {
                    Text(me, color = Dc.bright, fontSize = 14.sp, fontWeight = FontWeight.SemiBold)
                    Text(if (online) "Online" else "Offline mode", color = Dc.muted, fontSize = 12.sp)
                }
            }
        }
    }
}

/**
 * The settings panel: hidden until the gear is pressed, and built from the emotion
 * model the rest of the app uses now — the named emotions plus the 1–5 horniness
 * meter that picks which tier of her art she wears.
 */
@Composable
private fun LibbySettingsPanel(emotion: String, intensity: Int, onEmotion: (String) -> Unit) {
    Column(Modifier.fillMaxWidth().background(Dc.side).padding(horizontal = 14.dp, vertical = 12.dp)) {
        Text("EMOTION", color = Dc.muted, fontSize = 12.sp, fontWeight = FontWeight.Bold)
        Row(
            Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()).padding(top = 6.dp),
            horizontalArrangement = Arrangement.spacedBy(6.dp),
        ) {
            libbyEmotions.forEach { e ->
                val on = e == emotion
                Text(
                    if (e == "horniness") "Horniness" else e.replaceFirstChar(Char::uppercase),
                    color = if (on) Color.White else Dc.text,
                    fontSize = 13.sp,
                    modifier = Modifier
                        .clip(RoundedCornerShape(4.dp))
                        .background(if (on) Dc.accent else Color.Transparent)
                        .border(1.dp, if (on) Dc.accent else Dc.line, RoundedCornerShape(4.dp))
                        .clickable { onEmotion(e) }
                        .padding(horizontal = 10.dp, vertical = 5.dp),
                )
            }
        }
        Text(
            "HORNINESS",
            color = Dc.muted,
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(top = 12.dp),
        )
        Row(verticalAlignment = Alignment.CenterVertically) {
            Slider(
                value = intensity.toFloat(),
                onValueChange = { LibbyMeter.set(it.toInt()) },
                valueRange = 1f..LibbyMeter.MAX.toFloat(),
                steps = LibbyMeter.MAX - 2,
                modifier = Modifier.weight(1f),
            )
            Text("  $intensity / ${LibbyMeter.MAX}", color = Dc.muted, fontSize = 13.sp)
        }
    }
}

/** Discord's "Welcome to #channel" block at the top of the log. */
@Composable
private fun ChannelIntro(channel: LibbyChannel, status: ChatStatus?) {
    Column(Modifier.fillMaxWidth().padding(16.dp)) {
        Box(
            Modifier.size(64.dp).clip(CircleShape).background(Dc.input),
            contentAlignment = Alignment.Center,
        ) { Icon(Icons.Filled.Tag, contentDescription = null, tint = Dc.bright, modifier = Modifier.size(34.dp)) }
        Text(
            "Welcome to #${channel.label}!",
            color = Dc.bright,
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(top = 8.dp),
        )
        Text(
            channel.topic + if (status?.enabled == true) " Running on ${status.model}."
            else " No local LLM configured — Libby is answering on her own.",
            color = Dc.muted,
            fontSize = 14.sp,
            modifier = Modifier.padding(top = 4.dp),
        )
    }
}

@Composable
private fun MessageRow(
    entry: Entry,
    previous: Entry?,
    repo: Repository,
    emotion: String,
    intensity: Int,
    me: String,
) {
    // Discord groups consecutive messages from the same author within a few minutes:
    // the follow-ups drop the avatar and header and just show the text.
    val grouped = previous != null && previous.role == entry.role && entry.at - previous.at < 5 * 60_000
    val fromLibby = entry.role == "assistant"
    Row(
        Modifier.fillMaxWidth().padding(start = 12.dp, end = 12.dp, top = if (grouped) 1.dp else 14.dp),
        verticalAlignment = Alignment.Top,
    ) {
        Box(Modifier.width(52.dp), contentAlignment = Alignment.TopCenter) {
            if (!grouped) {
                if (fromLibby && !repo.prefs.hideLibby) {
                    Box(Modifier.size(40.dp).clip(CircleShape).background(Dc.input)) {
                        LibbyPortrait(
                            repo = repo,
                            emotion = emotion,
                            tier = LibbyMeter.tier(intensity),
                            fallbackAsset = mascotAsset(emotion),
                            modifier = Modifier.fillMaxSize(),
                        )
                    }
                } else if (fromLibby) {
                    Box(
                        Modifier.size(40.dp).clip(CircleShape).background(Dc.libby),
                        contentAlignment = Alignment.Center,
                    ) { Text("L", color = Color.White, fontWeight = FontWeight.Bold) }
                } else {
                    Box(
                        Modifier.size(40.dp).clip(CircleShape).background(Dc.accent),
                        contentAlignment = Alignment.Center,
                    ) {
                        Text(me.take(2).uppercase(), color = Color.White, fontSize = 14.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
        Column(Modifier.weight(1f)) {
            if (!grouped) {
                Row(verticalAlignment = Alignment.Bottom) {
                    Text(
                        if (fromLibby) "Libby" else me,
                        color = if (fromLibby) Dc.libby else Dc.bright,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Medium,
                    )
                    if (fromLibby) {
                        Text(
                            if (entry.local) "LOCAL" else "BOT",
                            color = Color.White,
                            fontSize = 9.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier
                                .padding(start = 6.dp)
                                .clip(RoundedCornerShape(3.dp))
                                .background(if (entry.local) Color(0xFF4E5058) else Dc.accent)
                                .padding(horizontal = 4.dp, vertical = 1.dp),
                        )
                    }
                    Text(
                        "  ${timeOf(entry.at)}",
                        color = Dc.muted,
                        fontSize = 12.sp,
                        modifier = Modifier.padding(start = 4.dp),
                    )
                }
            }
            Text(entry.content, color = Dc.text, fontSize = 15.sp)
        }
    }
}
