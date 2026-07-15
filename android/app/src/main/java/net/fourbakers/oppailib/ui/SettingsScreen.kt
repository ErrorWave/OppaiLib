package net.fourbakers.oppailib.ui

import android.content.Context
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Slider
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.launch
import net.fourbakers.oppailib.data.ApkInfo
import net.fourbakers.oppailib.data.PasswordRequest
import net.fourbakers.oppailib.data.Prefs
import net.fourbakers.oppailib.data.Repository
import net.fourbakers.oppailib.data.Stats
import net.fourbakers.oppailib.data.VideoFit
import net.fourbakers.oppailib.util.AppUpdate

/**
 * Device-local settings. Everything here is a preference about how *this* phone
 * plays and reads — none of it is server state, so nothing needs saving remotely;
 * each control writes through to [Prefs] as it's touched.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SettingsScreen(repo: Repository, onBack: () -> Unit, onLogout: () -> Unit) {
    val prefs = repo.prefs

    var fit by remember { mutableStateOf(prefs.videoFit) }
    var autoplay by remember { mutableStateOf(prefs.videoAutoplay) }
    var loop by remember { mutableStateOf(prefs.videoLoop) }
    var muted by remember { mutableStateOf(prefs.videoMuted) }
    var speed by remember { mutableFloatStateOf(prefs.videoSpeed) }
    var buffer by remember { mutableIntStateOf(prefs.bufferSeconds) }
    var backBuffer by remember { mutableStateOf(prefs.keepBackBuffer) }
    var rtl by remember { mutableStateOf(prefs.comicRtl) }
    var biometric by remember { mutableStateOf(prefs.biometricLock) }
    var server by remember { mutableStateOf(prefs.serverUrl ?: "") }

    var stats by remember { mutableStateOf<Stats?>(null) }
    var changingPassword by remember { mutableStateOf(false) }
    val context = LocalContext.current
    val scope = rememberCoroutineScope()

    LaunchedEffect(Unit) { stats = runCatching { repo.api.stats() }.getOrNull() }

    // Android back returns to the library, matching the top bar's arrow.
    BackHandler { onBack() }

    if (changingPassword) {
        ChangePasswordDialog(repo = repo, onDismiss = { changingPassword = false })
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Settings") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back")
                    }
                },
            )
        },
    ) { padding ->
        Column(
            Modifier.padding(padding).fillMaxSize().verticalScroll(rememberScrollState()).padding(16.dp),
        ) {
            SectionHeader("Video")

            Text("How the frame fills the screen", style = MaterialTheme.typography.bodyMedium)
            Row(
                Modifier.fillMaxWidth().padding(top = 8.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
            ) {
                VideoFit.entries.forEach { option ->
                    FilterChip(
                        selected = fit == option,
                        onClick = { fit = option; prefs.videoFit = option },
                        label = { Text(option.label) },
                    )
                }
            }
            Text(
                fit.description,
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 6.dp),
            )

            SwitchRow("Play on open", "Start playing as soon as a video is on screen", autoplay) {
                autoplay = it; prefs.videoAutoplay = it
            }
            SwitchRow("Loop", "Repeat instead of stopping at the end", loop) {
                loop = it; prefs.videoLoop = it
            }
            SwitchRow("Start muted", "Open videos with the sound off", muted) {
                muted = it; prefs.videoMuted = it
            }

            StepperRow(
                title = "Default speed",
                value = formatSpeedLabel(speed),
                onLess = { speed = stepSpeed(speed, -1); prefs.videoSpeed = speed },
                onMore = { speed = stepSpeed(speed, +1); prefs.videoSpeed = speed },
            )

            SectionHeader("Buffering")

            Text("Read ahead: ${buffer}s", style = MaterialTheme.typography.bodyMedium)
            Text(
                "How much video is fetched in front of the playhead. More rides out a bad " +
                    "connection; it also costs memory and pulls data for clips you may swipe past.",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            Slider(
                value = buffer.toFloat(),
                onValueChange = { buffer = it.toInt() },
                onValueChangeFinished = { prefs.bufferSeconds = buffer },
                valueRange = Prefs.MIN_BUFFER_SECONDS.toFloat()..Prefs.MAX_BUFFER_SECONDS.toFloat(),
                modifier = Modifier.padding(top = 4.dp),
            )
            SwitchRow(
                "Keep what's been played",
                "Seeking backwards replays from memory instead of refetching",
                backBuffer,
            ) { backBuffer = it; prefs.keepBackBuffer = it }
            Text(
                "Buffers are held only while a video is open. Closing it — or swiping to the " +
                    "next item — releases the player and drops everything it had buffered.",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 8.dp),
            )

            SectionHeader("Comics")
            SwitchRow(
                "Right-to-left",
                "Manga order: page one on the right, and you swipe right-to-left to advance",
                rtl,
            ) { rtl = it; prefs.comicRtl = it }

            SectionHeader("Library")
            StatsBlock(stats)

            SectionHeader("Account")
            SwitchRow("Require unlock", "Ask for your fingerprint or face when opening the app", biometric) {
                biometric = it; prefs.biometricLock = it
            }
            OutlinedTextField(
                value = server,
                onValueChange = { server = it },
                label = { Text("Server") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth().padding(top = 12.dp),
            )
            Button(
                onClick = { repo.setServer(server) },
                enabled = server.isNotBlank() && server != prefs.serverUrl,
                modifier = Modifier.padding(top = 8.dp),
            ) { Text("Save server") }
            TextButton(
                onClick = { changingPassword = true },
                modifier = Modifier.padding(top = 4.dp),
            ) { Text("Change password") }

            SectionHeader("App")
            UpdateBlock(repo = repo, context = context, scope = scope)

            Button(
                onClick = onLogout,
                modifier = Modifier.fillMaxWidth().padding(top = 24.dp),
            ) { Text("Sign out") }
        }
    }
}

/** What the server is holding, and how much of it. Silent until /api/stats answers. */
@Composable
private fun StatsBlock(stats: Stats?) {
    if (stats == null) {
        Text(
            "Counting…",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
        return
    }
    Text(
        "${stats.items} items · ${formatBytes(stats.bytes)} · ${stats.tags} tags",
        style = MaterialTheme.typography.bodyLarge,
    )
    stats.kinds.filter { it.count > 0 }.forEach { k ->
        Row(Modifier.fillMaxWidth().padding(top = 6.dp)) {
            Text(k.kind, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.weight(1f))
            Text(
                "${k.count} · ${formatBytes(k.bytes)}",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
    }
}

/**
 * Installing the build the server is handing out.
 *
 * The comparison is by hash, not version (see [AppUpdate]) — so this can only ever say
 * "the server has a different build", which is the honest claim. An operator who drops
 * an older APK into /config is offering a downgrade, and the app will say so rather
 * than pretend it can't see it.
 */
@Composable
private fun UpdateBlock(repo: Repository, context: Context, scope: CoroutineScope) {
    var info by remember { mutableStateOf<ApkInfo?>(null) }
    var installed by remember { mutableStateOf("") }
    var checking by remember { mutableStateOf(true) }
    var progress by remember { mutableFloatStateOf(-1f) } // < 0 means "not downloading"
    var error by remember { mutableStateOf<String?>(null) }

    val version = remember {
        runCatching {
            context.packageManager.getPackageInfo(context.packageName, 0).versionName
        }.getOrNull().orEmpty()
    }

    suspend fun check() {
        checking = true
        installed = AppUpdate.installedDigest(context)
        info = runCatching { repo.api.apkInfo() }.getOrNull()
        checking = false
    }

    LaunchedEffect(Unit) { check() }

    Text("Version $version", style = MaterialTheme.typography.bodyLarge)

    val current = info
    // Non-null exactly when there's something worth installing.
    val offered = current?.takeIf { AppUpdate.isNewer(it, installed) }

    Text(
        when {
            checking -> "Checking the server for a newer build…"
            current == null -> "Couldn't ask the server what build it has."
            !current.available -> "This server doesn't carry an APK to install."
            offered != null -> "The server has a different build (${formatBytes(offered.size)}). " +
                "It will only install over this one if both were signed with the same key."
            else -> "You're running the build this server hands out."
        },
        style = MaterialTheme.typography.labelSmall,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
        modifier = Modifier.padding(top = 4.dp),
    )

    error?.let {
        Text(
            it,
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.error,
            modifier = Modifier.padding(top = 4.dp),
        )
    }

    if (progress >= 0f) {
        LinearProgressIndicator(
            progress = { progress },
            modifier = Modifier.fillMaxWidth().padding(top = 12.dp),
        )
        Text(
            "Downloading — ${(progress * 100).toInt()}%",
            style = MaterialTheme.typography.labelSmall,
            modifier = Modifier.padding(top = 4.dp),
        )
        return
    }

    Row(Modifier.padding(top = 8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        offered?.let { apk ->
            Button(onClick = {
                error = null
                // Without this the install intent opens on a dead end. Ask for the toggle
                // first, and let the user come back and press the button again.
                if (!AppUpdate.canInstall(context)) {
                    AppUpdate.requestInstallPermission(context)
                    error = "Allow OppaiLib to install apps, then tap Update again."
                    return@Button
                }
                progress = 0f
                scope.launch {
                    AppUpdate.download(context, repo, apk) { progress = it }
                        .onSuccess { file ->
                            progress = -1f
                            AppUpdate.validateInstall(context, file)
                                .onSuccess { AppUpdate.install(context, file) }
                                .onFailure { error = it.message ?: "This APK cannot update the installed app." }
                        }
                        .onFailure { progress = -1f; error = it.message ?: "The download failed." }
                }
            }) { Text("Update") }
        }
        TextButton(onClick = { scope.launch { check() } }, enabled = !checking) { Text("Check again") }
    }
}

/**
 * Changing the account password. The server re-checks the current one before it takes
 * a new one, so a stolen phone session still can't lock the owner out of their library
 * — which is why this asks for the old password even though we're already signed in.
 */
@Composable
private fun ChangePasswordDialog(repo: Repository, onDismiss: () -> Unit) {
    var current by remember { mutableStateOf("") }
    var next by remember { mutableStateOf("") }
    var busy by remember { mutableStateOf(false) }
    var error by remember { mutableStateOf<String?>(null) }
    var done by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Change password") },
        text = {
            Column {
                OutlinedTextField(
                    value = current,
                    onValueChange = { current = it },
                    label = { Text("Current password") },
                    singleLine = true,
                    visualTransformation = PasswordVisualTransformation(),
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                    modifier = Modifier.fillMaxWidth(),
                )
                OutlinedTextField(
                    value = next,
                    onValueChange = { next = it },
                    label = { Text("New password") },
                    singleLine = true,
                    visualTransformation = PasswordVisualTransformation(),
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                    modifier = Modifier.fillMaxWidth().padding(top = 12.dp),
                )
                Text(
                    "At least 8 characters. Signing in again elsewhere will need the new one.",
                    style = MaterialTheme.typography.labelSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(top = 8.dp),
                )
                error?.let {
                    Text(
                        it,
                        color = MaterialTheme.colorScheme.error,
                        style = MaterialTheme.typography.labelSmall,
                        modifier = Modifier.padding(top = 8.dp),
                    )
                }
                if (done) {
                    Text(
                        "Password changed.",
                        style = MaterialTheme.typography.labelSmall,
                        modifier = Modifier.padding(top = 8.dp),
                    )
                }
            }
        },
        confirmButton = {
            TextButton(
                enabled = !busy && current.isNotBlank() && next.length >= 8,
                onClick = {
                    busy = true
                    error = null
                    scope.launch {
                        runCatching { repo.api.changePassword(PasswordRequest(current, next)) }
                            .onSuccess { done = true; onDismiss() }
                            // The server's own words: it's the one that knows whether the
                            // current password was wrong or the new one too short.
                            .onFailure { error = it.message ?: "The server refused that." }
                        busy = false
                    }
                },
            ) { Text("Change") }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } },
    )
}

private fun formatBytes(bytes: Long): String = when {
    bytes >= 1_000_000_000 -> "%.1f GB".format(bytes / 1_000_000_000.0)
    bytes >= 1_000_000 -> "%.0f MB".format(bytes / 1_000_000.0)
    bytes >= 1_000 -> "%.0f kB".format(bytes / 1_000.0)
    else -> "$bytes B"
}

@Composable
private fun SectionHeader(title: String) {
    HorizontalDivider(Modifier.padding(top = 24.dp))
    Text(
        title,
        style = MaterialTheme.typography.titleSmall,
        color = MaterialTheme.colorScheme.primary,
        modifier = Modifier.padding(top = 16.dp, bottom = 8.dp),
    )
}

@Composable
private fun SwitchRow(title: String, subtitle: String, checked: Boolean, onChange: (Boolean) -> Unit) {
    Row(
        Modifier.fillMaxWidth().clickable { onChange(!checked) }.padding(vertical = 10.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Column(Modifier.weight(1f).padding(end = 12.dp)) {
            Text(title, style = MaterialTheme.typography.bodyLarge)
            Text(
                subtitle,
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
        Switch(checked = checked, onCheckedChange = onChange)
    }
}

@Composable
private fun StepperRow(title: String, value: String, onLess: () -> Unit, onMore: () -> Unit) {
    Row(
        Modifier.fillMaxWidth().padding(vertical = 10.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(title, style = MaterialTheme.typography.bodyLarge, modifier = Modifier.weight(1f))
        IconButton(onClick = onLess) { Text("−", style = MaterialTheme.typography.titleLarge) }
        Text(value, style = MaterialTheme.typography.bodyLarge)
        IconButton(onClick = onMore) { Text("+", style = MaterialTheme.typography.titleLarge) }
    }
}
