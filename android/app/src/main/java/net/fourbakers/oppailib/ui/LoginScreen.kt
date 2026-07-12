package net.fourbakers.oppailib.ui

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
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

@Composable
fun LoginScreen(repo: Repository, onAuthed: () -> Unit) {
    var server by remember { mutableStateOf(repo.prefs.serverUrl ?: "http://10.0.2.2:8080") }
    var username by remember { mutableStateOf("admin") }
    var password by remember { mutableStateOf("") }
    var error by remember { mutableStateOf<String?>(null) }
    var busy by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

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

        error?.let {
            Text(it, color = MaterialTheme.colorScheme.error, modifier = Modifier.padding(top = 8.dp))
        }

        Button(
            onClick = {
                error = null
                busy = true
                repo.setServer(server)
                scope.launch {
                    try {
                        val res = repo.api.login(LoginRequest(username, password))
                        repo.saveSession(res.token)
                        onAuthed()
                    } catch (e: Exception) {
                        error = e.message ?: "Login failed"
                    } finally {
                        busy = false
                    }
                }
            },
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
    }
}
