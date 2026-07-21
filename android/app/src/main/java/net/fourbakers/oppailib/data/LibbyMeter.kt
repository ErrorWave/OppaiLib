package net.fourbakers.oppailib.data

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

/**
 * Libby's "horniness" meter: a per-session intensity, 1–5, shared across the app.
 * It backs the chat's intensity picker, is nudged up by adding items to the library,
 * and selects which of an outfit's five art tiers she wears (tier = intensity-1).
 *
 * In-memory only — a mood for this run of the app that starts fresh next launch,
 * mirroring the web client's session-scoped meter.
 */
object LibbyMeter {
    const val MAX = 5

    private val _value = MutableStateFlow(1)
    val value: StateFlow<Int> = _value

    /** Sets the intensity to an absolute value (chat picker / model replies). */
    fun set(v: Int) {
        _value.value = v.coerceIn(1, MAX)
    }

    /** Nudges the intensity up (library adds, bolder chat). */
    fun bump(delta: Int = 1) {
        set(_value.value + delta)
    }

    /** The outfit art tier (0..4) for an intensity (1..5). */
    fun tier(v: Int = _value.value): Int = v.coerceIn(1, MAX) - 1
}
