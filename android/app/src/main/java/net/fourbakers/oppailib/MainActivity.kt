package net.fourbakers.oppailib

import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.widthIn
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.collect
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import net.fourbakers.oppailib.data.Repository
import net.fourbakers.oppailib.ui.LibraryScreen
import net.fourbakers.oppailib.ui.LoginScreen
import net.fourbakers.oppailib.ui.theme.OppaiTheme

class MainActivity : FragmentActivity() {

    private val askNotifications =
        registerForActivityResult(ActivityResultContracts.RequestPermission()) { /* declined is fine */ }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        requestNotificationsIfNeeded()
        val repo = OppaiApp.from(this).repository
        setContent {
            OppaiTheme {
                Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    AppRoot(repo, ::promptBiometric)
                }
            }
        }
    }

    /**
     * Asks for notifications on the versions that gate them (13+). Only imports post
     * any, and a refusal costs nothing more than a silent one — so it's asked for once
     * on launch and never insisted on.
     */
    private fun requestNotificationsIfNeeded() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) return
        val granted = ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) ==
            PackageManager.PERMISSION_GRANTED
        if (!granted) askNotifications.launch(Manifest.permission.POST_NOTIFICATIONS)
    }

    /**
     * Shows the system unlock prompt and reports the outcome.
     *
     * The prompt accepts the device PIN/pattern as well as a biometric ([DEVICE_CREDENTIAL]
     * alongside [BIOMETRIC_WEAK]): a fingerprint sensor that's briefly unavailable — busy
     * right after the phone itself was unlocked, say — used to dead-end the lock screen with
     * "something went wrong", and the PIN is the way through that. It also means no negative
     * "Cancel" button (the framework forbids pairing one with a device-credential fallback);
     * the way out is to authenticate or to leave the app.
     *
     * [onError] carries the message to show; an empty string means the user simply
     * dismissed it (nothing worth flagging). Crucially, nothing here ever touches the
     * session — a failed unlock leaves you locked, not logged out.
     */
    private fun promptBiometric(onSuccess: () -> Unit, onError: (String) -> Unit) {
        val authenticators = BiometricManager.Authenticators.BIOMETRIC_WEAK or
            BiometricManager.Authenticators.DEVICE_CREDENTIAL
        val canAuth = BiometricManager.from(this).canAuthenticate(authenticators)
        if (canAuth != BiometricManager.BIOMETRIC_SUCCESS) {
            onSuccess() // no biometric and no device lock → don't lock the user out
            return
        }
        val prompt = BiometricPrompt(
            this,
            ContextCompat.getMainExecutor(this),
            object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) = onSuccess()

                override fun onAuthenticationError(code: Int, msg: CharSequence) {
                    // A deliberate dismissal isn't a fault to surface; anything else is.
                    val dismissed = code == BiometricPrompt.ERROR_USER_CANCELED ||
                        code == BiometricPrompt.ERROR_CANCELED ||
                        code == BiometricPrompt.ERROR_NEGATIVE_BUTTON
                    onError(if (dismissed) "" else msg.toString())
                }
                // onAuthenticationFailed (a finger that didn't match) leaves the prompt up
                // for another try, so it's not terminal and needs no handling here.
            },
        )
        val info = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Unlock OppaiLib")
            .setSubtitle("Authenticate to view your library")
            .setAllowedAuthenticators(authenticators)
            .build()
        // Launching a prompt at a bad moment (a torn-down window) throws rather than
        // calling back; catch it so it surfaces as a retryable error, not a crash.
        runCatching { prompt.authenticate(info) }
            .onFailure { onError(it.message ?: "Couldn't start authentication") }
    }
}

@Composable
private fun AppRoot(
    repo: Repository,
    biometric: (onSuccess: () -> Unit, onError: (String) -> Unit) -> Unit,
) {
    var authed by remember { mutableStateOf(repo.hasSession) }
    var locked by remember { mutableStateOf(repo.hasSession && repo.prefs.biometricLock) }
    // Guards the lock re-arm against the biometric prompt's own lifecycle: on some devices
    // the system prompt drives the activity through ON_STOP, which would otherwise re-lock
    // (harmless) and, worse, race the success callback. While a prompt is in flight this
    // stays true, so background handling leaves it alone.
    var authInProgress by remember { mutableStateOf(false) }
    var lockError by remember { mutableStateOf<String?>(null) }
    var mascotMessage by remember { mutableStateOf("") }

    LaunchedEffect(repo) {
        repo.errors.collect { mascotMessage = it }
    }
    LaunchedEffect(mascotMessage) {
        if (mascotMessage.isNotBlank()) {
            delay(5_000)
            mascotMessage = ""
        }
    }

    fun unlock() {
        if (authInProgress) return
        authInProgress = true
        lockError = null
        biometric(
            { authInProgress = false; locked = false; mascotMessage = "Welcome back!" },
            { msg ->
                authInProgress = false
                lockError = msg
                if (msg.isNotBlank()) mascotMessage = msg
            },
        )
    }

    // The lock re-arms when the app leaves the foreground (so returning to it needs an
    // unlock), and the prompt is (re)raised when it comes back — which also covers the
    // cold-start case, since registering an observer replays up to the current state.
    val lifecycleOwner = LocalLifecycleOwner.current
    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event ->
            when (event) {
                Lifecycle.Event.ON_STOP ->
                    if (authed && repo.prefs.biometricLock && !authInProgress) locked = true
                Lifecycle.Event.ON_RESUME ->
                    if (authed && locked && !authInProgress) unlock()
                else -> {}
            }
        }
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose { lifecycleOwner.lifecycle.removeObserver(observer) }
    }

    Box(Modifier.fillMaxSize()) {
        when {
            !authed -> LoginScreen(
                repo,
                onAuthed = { authed = true; locked = false },
                onMascot = { mascotMessage = it },
            )
            locked -> LockScreen(
                error = lockError,
                onUnlock = { unlock() },
                // The escape hatch, so a phone whose sensor won't cooperate is never a
                // dead end: sign out cleanly rather than the user having to clear app data.
                onSignOut = {
                    repo.clearSession()
                    authed = false
                    locked = false
                    lockError = null
                },
            )
            else -> LibraryScreen(
                repo = repo,
                onLogout = { repo.clearSession(); authed = false },
            )
        }
        if (mascotMessage.isNotBlank()) {
            MascotPopup(mascotMessage, Modifier.align(Alignment.BottomEnd))
        }
    }
}

@Composable
private fun MascotPopup(message: String, modifier: Modifier = Modifier) {
    Row(
        modifier = modifier.padding(end = 8.dp, bottom = 8.dp),
        verticalAlignment = Alignment.Bottom,
        horizontalArrangement = Arrangement.End,
    ) {
        Surface(
            shape = MaterialTheme.shapes.large,
            tonalElevation = 6.dp,
            shadowElevation = 8.dp,
            modifier = Modifier.widthIn(max = 240.dp).padding(bottom = 72.dp),
        ) {
            Text(message, modifier = Modifier.padding(14.dp), style = MaterialTheme.typography.bodyMedium)
        }
        AsyncImage(
            model = "file:///android_asset/mascot.png",
            contentDescription = null,
            modifier = Modifier.size(width = 150.dp, height = 220.dp),
        )
    }
}

@Composable
private fun LockScreen(error: String?, onUnlock: () -> Unit, onSignOut: () -> Unit) {
    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text("OppaiLib is locked", style = MaterialTheme.typography.headlineSmall)
        if (!error.isNullOrBlank()) {
            Text(
                error,
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(top = 12.dp),
            )
        }
        Button(onClick = onUnlock, modifier = Modifier.padding(top = 16.dp)) { Text("Unlock") }
        TextButton(onClick = onSignOut, modifier = Modifier.padding(top = 4.dp)) { Text("Sign out") }
    }
}
