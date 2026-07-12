package net.fourbakers.oppailib.ui

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Slider
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import net.fourbakers.oppailib.data.Prefs
import net.fourbakers.oppailib.data.Repository
import net.fourbakers.oppailib.data.VideoFit

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

            Button(
                onClick = onLogout,
                modifier = Modifier.fillMaxWidth().padding(top = 24.dp),
            ) { Text("Sign out") }
        }
    }
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
