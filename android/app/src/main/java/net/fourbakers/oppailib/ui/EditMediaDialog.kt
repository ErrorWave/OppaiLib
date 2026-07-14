package net.fourbakers.oppailib.ui

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.AssistChip
import androidx.compose.material3.AssistChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import net.fourbakers.oppailib.data.Media
import net.fourbakers.oppailib.data.MediaPatch

/**
 * Editing an item's title, notes and tags.
 *
 * It builds a [MediaPatch] rather than a whole item: only the fields the user actually
 * changed are sent, so two people (or the AI tagger) touching different fields don't
 * overwrite each other's work with a stale copy of the row.
 *
 * Tags are staged, not applied as they're tapped — closing with Cancel leaves the item
 * exactly as it was, which is what a dialog with a Cancel button promises.
 */
@OptIn(ExperimentalLayoutApi::class)
@Composable
fun EditMediaDialog(media: Media, onDismiss: () -> Unit, onSave: (MediaPatch) -> Unit) {
    var title by remember { mutableStateOf(media.title) }
    var notes by remember { mutableStateOf(media.notes.orEmpty()) }
    var draft by remember { mutableStateOf("") }

    // Existing tags minus the ones struck off, plus the ones typed in. Names, because
    // that's the currency the patch endpoint deals in.
    val kept = remember { mutableStateListOf<String>().apply { addAll(media.tags.map { it.name }) } }
    val added = remember { mutableStateListOf<String>() }

    fun addDraft() {
        val name = draft.trim()
        if (name.isEmpty()) return
        if (name !in kept && name !in added) added += name
        draft = ""
    }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Edit details") },
        text = {
            Column(Modifier.verticalScroll(rememberScrollState())) {
                OutlinedTextField(
                    value = title,
                    onValueChange = { title = it },
                    label = { Text("Title") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth(),
                )
                OutlinedTextField(
                    value = notes,
                    onValueChange = { notes = it },
                    label = { Text("Notes") },
                    modifier = Modifier.fillMaxWidth().heightIn(min = 88.dp).padding(top = 12.dp),
                )

                Text(
                    "Tags",
                    style = MaterialTheme.typography.labelLarge,
                    modifier = Modifier.padding(top = 16.dp),
                )
                Row(Modifier.fillMaxWidth()) {
                    OutlinedTextField(
                        value = draft,
                        onValueChange = { draft = it },
                        label = { Text("Add a tag") },
                        singleLine = true,
                        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
                        keyboardActions = KeyboardActions(onDone = { addDraft() }),
                        modifier = Modifier.weight(1f),
                    )
                    IconButton(onClick = { addDraft() }, modifier = Modifier.padding(top = 8.dp)) {
                        Icon(Icons.Filled.Add, contentDescription = "Add this tag")
                    }
                }
                FlowRow(Modifier.fillMaxWidth().padding(top = 8.dp)) {
                    (kept + added).forEach { name ->
                        AssistChip(
                            onClick = { if (name in added) added -= name else kept -= name },
                            label = { Text(name) },
                            trailingIcon = {
                                Icon(
                                    Icons.Filled.Close,
                                    contentDescription = "Remove $name",
                                    modifier = Modifier.size(AssistChipDefaults.IconSize),
                                )
                            },
                            modifier = Modifier.padding(end = 6.dp),
                        )
                    }
                }
                if (kept.size + added.size == 0) {
                    Text(
                        "No tags. Auto-tag from the viewer, or add your own above.",
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }
        },
        confirmButton = {
            TextButton(onClick = {
                // A tag typed but never added is still a tag the user meant to add.
                addDraft()
                val removed = media.tags.map { it.name }.filterNot { it in kept }
                onSave(
                    MediaPatch(
                        title = title.takeIf { it != media.title },
                        notes = notes.takeIf { it != media.notes.orEmpty() },
                        addTags = added.toList(),
                        removeTags = removed,
                    ),
                )
            }) { Text("Save") }
        },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } },
    )
}
