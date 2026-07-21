package net.fourbakers.oppailib.data

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

/**
 * Libby's "horniness" meter: a per-session stat, 0–100, that decides which art tier
 * of her outfit she wears. It's deliberately in-memory only — a mood for this run of
 * the app that starts fresh next launch (the process dying is the session ending),
 * mirroring the web client's sessionStorage-backed meter.
 *
 * Three things move it: the user sets it by hand in Chat, chatting with Libby nudges
 * it up (harder in the bolder modes), and adding items to the library nudges it up.
 */
object LibbyMeter {
    /** Five art tiers, levels 0..4, matching the server's maxLibbyLevel. */
    const val TIERS = 5

    private val _value = MutableStateFlow(0)
    val value: StateFlow<Int> = _value

    /** Sets the meter to an absolute value (manual control). */
    fun set(v: Int) {
        _value.value = v.coerceIn(0, 100)
    }

    /** Nudges the meter by a delta (chat, library adds). */
    fun bump(delta: Int) {
        set(_value.value + delta)
    }

    /** The art tier (0..TIERS-1) for a meter value. */
    fun tier(v: Int = _value.value): Int =
        (v.coerceIn(0, 100) / (100 / TIERS)).coerceIn(0, TIERS - 1)
}
