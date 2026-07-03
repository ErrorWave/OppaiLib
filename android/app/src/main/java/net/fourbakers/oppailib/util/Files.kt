package net.fourbakers.oppailib.util

import android.content.Context
import android.net.Uri
import android.provider.OpenableColumns
import java.io.File

/** Copies a content Uri into a temp file in cacheDir so it can be uploaded as
 *  a multipart body. Returns the file and its display name. */
fun copyUriToCache(context: Context, uri: Uri): Pair<File, String> {
    val name = queryDisplayName(context, uri) ?: "upload_${System.currentTimeMillis()}"
    val out = File(context.cacheDir, name)
    context.contentResolver.openInputStream(uri)!!.use { input ->
        out.outputStream().use { input.copyTo(it) }
    }
    return out to name
}

fun mimeOf(context: Context, uri: Uri): String? = context.contentResolver.getType(uri)

private fun queryDisplayName(context: Context, uri: Uri): String? {
    context.contentResolver.query(uri, null, null, null, null)?.use { c ->
        val idx = c.getColumnIndex(OpenableColumns.DISPLAY_NAME)
        if (idx >= 0 && c.moveToFirst()) return c.getString(idx)
    }
    return null
}
