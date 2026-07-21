package net.fourbakers.oppailib.ui

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import coil.compose.SubcomposeAsyncImage
import net.fourbakers.oppailib.data.Repository

/**
 * Libby's portrait, in one place. Given an emotion and the current horniness tier it
 * shows the worn outfit's art, walking down a fallback chain on any load error so a
 * missing tier (or a stale outfit) degrades cleanly instead of breaking:
 *
 *   worn outfit at [tier] → … → the outfit's baseline (level 0) → the bundled asset.
 *
 * This mirrors the web client's libby-portrait / libbyArtChain and is the single
 * source of Libby's face on the phone (Chat and any event reactions use it).
 */
@Composable
fun LibbyPortrait(
    repo: Repository,
    emotion: String,
    tier: Int,
    /** Bundled default art (an android_asset filename) for when no outfit covers this. */
    fallbackAsset: String,
    modifier: Modifier = Modifier,
) {
    val outfit = repo.prefs.libbyOutfit
    val chain = buildList {
        if (outfit.isNotEmpty()) {
            for (level in tier downTo 1) add(repo.libbyEmotionUrl(outfit, emotion, level))
            add(repo.libbyEmotionUrl(outfit, emotion, 0))
        }
        add("file:///android_asset/$fallbackAsset")
    }
    ChainImage(chain, repo, modifier)
}

/** The bundled default art (an android_asset filename) for an emotion, used when no
    worn outfit covers it. Mirrors the web client's defaultLibbyArt(). */
fun mascotAsset(emotion: String): String = when (emotion) {
    "happy" -> "mascot-happy.png"
    "mischievous" -> "mascot-mischievous.png"
    "surprised" -> "mascot-surprised.png"
    "thinking" -> "mascot-thinking.png"
    else -> "mascot.png"
}

/** Renders the first model, falling through to the next on load error. */
@Composable
private fun ChainImage(models: List<String>, repo: Repository, modifier: Modifier) {
    if (models.isEmpty()) return
    SubcomposeAsyncImage(
        model = models.first(),
        imageLoader = repo.imageLoader,
        contentDescription = "Libby",
        contentScale = ContentScale.Fit,
        modifier = modifier,
        error = { ChainImage(models.drop(1), repo, modifier) },
    )
}
