package net.fourbakers.oppailib.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
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
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch
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
        modifier = Modifier.fillMaxSize().padding(24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text("OppaiLib", style = MaterialTheme.typography.displaySmall, color = MaterialTheme.colorScheme.primary)
        Text("Sign in to your server", style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(bottom = 24.dp))

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

        error?.let { Text(it, color = MaterialTheme.colorScheme.error, modifier = Modifier.padding(top = 8.dp)) }

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
            if (busy) CircularProgressIndicator(modifier = Modifier.padding(end = 8.dp))
            Text("Sign in")
        }
    }
}
