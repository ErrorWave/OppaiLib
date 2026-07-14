package net.fourbakers.oppailib

import android.app.Application
import android.content.Context
import net.fourbakers.oppailib.data.Prefs
import net.fourbakers.oppailib.data.Repository
import net.fourbakers.oppailib.work.Notifications

/** Application-scoped service locator holding the singleton [Repository]. */
class OppaiApp : Application() {
    lateinit var repository: Repository
        private set

    override fun onCreate() {
        super.onCreate()
        repository = Repository(this, Prefs(this))
        // Not only for the app's own sake: an import worker can be started by
        // WorkManager into a process with no Activity in it, and it needs the channel
        // to already exist before it posts its foreground notification.
        Notifications.ensureChannels(this)
    }

    companion object {
        fun from(context: Context): OppaiApp = context.applicationContext as OppaiApp
    }
}
