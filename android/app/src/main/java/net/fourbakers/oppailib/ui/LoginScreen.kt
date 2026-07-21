package net.fourbakers.oppailib.ui

import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Fingerprint
import androidx.compose.material3.Button
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch
import net.fourbakers.oppailib.R
import net.fourbakers.oppailib.data.LoginRequest
import net.fourbakers.oppailib.data.Repository

/**
 * Sign-in. Beyond username/password, this device can **save the login behind a
 * fingerprint**: tick "Save login & use fingerprint" and the credentials are kept in
 * the app's AES-256 encrypted store, and next time a fingerprint alone signs you in
 * (the biometric prompt is what unlocks the saved credentials). Works even after the
 * session is cleared or expires, since it re-logs in rather than reusing a token.
 *
 * [biometric] is the activity's shared BiometricPrompt runner.
 */
@Composable
fun LoginScreen(
    repo: Repository,
    onAuthed: () -> Unit,
    onMascot: (message: String, emotion: String) -> Unit,
    biometric: (onSuccess: () -> Unit, onError: (String) -> Unit) -> Unit,
) {
    var server by remember { mutableStateOf(repo.prefs.serverUrl ?: "http://10.0.2.2:8080") }
    var username by remember { mutableStateOf(repo.prefs.savedUsername ?: "admin") }
    var password by remember { mutableStateOf("") }
    var remember_ by remember { mutableStateOf(repo.prefs.hasSavedCredentials) }
    var error by remember { mutableStateOf<String?>(null) }
    var busy by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()
    val hasSaved = repo.prefs.hasSavedCredentials

    // Signs in with the given credentials, persisting or clearing the saved login per
    // the checkbox. Used by both the password button and the fingerprint path.
    fun doLogin(user: String, pass: String, save: Boolean) {
        error = null
        busy = true
        repo.setServer(server)
        scope.launch {
            try {
                val res = repo.api.login(LoginRequest(user, pass))
                repo.saveSession(res.token)
                if (save) repo.prefs.saveCredentials(user, pass) else repo.prefs.clearCredentials()
                onMascot("Welcome back, ${res.user.username}!", "happy")
                onAuthed()
            } catch (e: Exception) {
                val message = e.message ?: "Login failed"
                error = message
                onMascot(
                    if (message.contains("401")) "That login didn't work. Check your details." else message,
                    "surprised",
                )
            } finally {
                busy = false
            }
        }
    }

    // Prompts for a fingerprint, then signs in with the saved credentials.
    fun fingerprintSignIn() {
        val user = repo.prefs.savedUsername
        val pass = repo.prefs.savedPassword
        if (user.isNullOrEmpty() || pass.isNullOrEmpty()) return
        biometric(
            { doLogin(user, pass, save = true) },
            { msg -> if (msg.isNotBlank()) error = msg },
        )
    }

    Column(
        modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        // The mark takes its colour from the theme rather than carrying its own, so it
        // follows the wallpaper on Material You and reads correctly in light and dark
        // alike — a fixed orange logo is a stain on one of them.
        Image(
            painter = painterResource(R.drawable.ic_logo),
            contentDescription = null,
            colorFilter = ColorFilter.tint(MaterialTheme.colorScheme.primary),
            modifier = Modifier.size(88.dp),
        )
        Text(
            "OppaiLib",
            style = MaterialTheme.typography.displaySmall,
            color = MaterialTheme.colorScheme.primary,
        )
        Text(
            "Sign in to your server",
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(bottom = 24.dp),
        )

        OutlinedTextField(
            value = server, onValueChange = { server = it },
            label = { Text("Server URL") }, singleLine = true,
            modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp),
        )
        OutlinedTextField(
            value = username, onValueChange = { username = it },
            label = { Text("Username") }, singleLine = true,
            modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp),
        )
        OutlinedTextField(
            value = password, onValueChange = { password = it },
            label = { Text("Password") }, singleLine = true,
            visualTransformation = PasswordVisualTransformation(),
            modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp),
        )

        Row(
            Modifier.fillMaxWidth().padding(top = 4.dp).clickable { remember_ = !remember_ },
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Checkbox(checked = remember_, onCheckedChange = { remember_ = it })
            Text("Save login & use fingerprint", style = MaterialTheme.typography.bodyMedium)
        }

        error?.let {
            Text(it, color = MaterialTheme.colorScheme.error, modifier = Modifier.padding(top = 8.dp))
        }

        Button(
            onClick = { doLogin(username.trim(), password, remember_) },
            enabled = !busy,
            modifier = Modifier.fillMaxWidth().padding(top = 16.dp),
        ) {
            if (busy) {
                CircularProgressIndicator(
                    strokeWidth = 2.dp,
                    modifier = Modifier.size(18.dp).padding(end = 0.dp),
                )
            }
            Text("Sign in", modifier = Modifier.padding(start = if (busy) 8.dp else 0.dp))
        }

        // Only offered once a login has been saved on this device.
        if (hasSaved) {
            OutlinedButton(
                onClick = { fingerprintSignIn() },
                enabled = !busy,
                modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
            ) {
                Icon(Icons.Filled.Fingerprint, contentDescription = null, Modifier.size(18.dp))
                Text("Sign in with fingerprint", modifier = Modifier.padding(start = 8.dp))
            }
        }
    }
}
