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
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity
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

    /** Shows the system biometric prompt; invokes [onSuccess] when unlocked. */
    private fun promptBiometric(onSuccess: () -> Unit, onFail: () -> Unit) {
        val canAuth = BiometricManager.from(this)
            .canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_WEAK)
        if (canAuth != BiometricManager.BIOMETRIC_SUCCESS) {
            onSuccess() // no biometric hardware/enrollment → don't lock the user out
            return
        }
        val prompt = BiometricPrompt(
            this,
            ContextCompat.getMainExecutor(this),
            object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) = onSuccess()
                override fun onAuthenticationError(code: Int, msg: CharSequence) = onFail()
            },
        )
        prompt.authenticate(
            BiometricPrompt.PromptInfo.Builder()
                .setTitle("Unlock OppaiLib")
                .setSubtitle("Authenticate to view your library")
                .setNegativeButtonText("Cancel")
                .build(),
        )
    }
}

@Composable
private fun AppRoot(
    repo: Repository,
    biometric: (onSuccess: () -> Unit, onFail: () -> Unit) -> Unit,
) {
    var authed by remember { mutableStateOf(repo.hasSession) }
    var locked by remember { mutableStateOf(repo.hasSession && repo.prefs.biometricLock) }

    when {
        !authed -> LoginScreen(repo, onAuthed = { authed = true; locked = false })
        locked -> LockScreen(onUnlock = { biometric({ locked = false }, { }) })
        else -> LibraryScreen(
            repo = repo,
            onLogout = { repo.clearSession(); authed = false },
        )
    }
}

@Composable
private fun LockScreen(onUnlock: () -> Unit) {
    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text("OppaiLib is locked", style = MaterialTheme.typography.headlineSmall)
        Button(onClick = onUnlock, modifier = Modifier.padding(top = 16.dp)) { Text("Unlock") }
    }
}
