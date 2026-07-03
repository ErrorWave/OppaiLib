package net.fourbakers.oppailib.data

import android.content.Context
import android.content.SharedPreferences
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey

/**
 * Encrypted local settings: server URL, session token, and the biometric-lock
 * flag. Backed by Jetpack Security's EncryptedSharedPreferences (AES-256), so
 * the token is not stored in plaintext on the device.
 */
class Prefs(context: Context) {
    private val sp: SharedPreferences = run {
        val key = MasterKey.Builder(context)
            .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
            .build()
        EncryptedSharedPreferences.create(
            context,
            "oppai_secure_prefs",
            key,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM,
        )
    }

    var serverUrl: String?
        get() = sp.getString(KEY_SERVER, null)
        set(v) = sp.edit().putString(KEY_SERVER, v).apply()

    var token: String?
        get() = sp.getString(KEY_TOKEN, null)
        set(v) = sp.edit().putString(KEY_TOKEN, v).apply()

    var biometricLock: Boolean
        get() = sp.getBoolean(KEY_BIOMETRIC, false)
        set(v) = sp.edit().putBoolean(KEY_BIOMETRIC, v).apply()

    fun clearSession() {
        sp.edit().remove(KEY_TOKEN).apply()
    }

    companion object {
        private const val KEY_SERVER = "server_url"
        private const val KEY_TOKEN = "token"
        private const val KEY_BIOMETRIC = "biometric_lock"
    }
}
