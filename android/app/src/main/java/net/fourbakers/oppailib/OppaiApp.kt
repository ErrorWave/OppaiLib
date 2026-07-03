package net.fourbakers.oppailib

import android.app.Application
import android.content.Context
import net.fourbakers.oppailib.data.Prefs
import net.fourbakers.oppailib.data.Repository

/** Application-scoped service locator holding the singleton [Repository]. */
class OppaiApp : Application() {
    lateinit var repository: Repository
        private set

    override fun onCreate() {
        super.onCreate()
        repository = Repository(this, Prefs(this))
    }

    companion object {
        fun from(context: Context): OppaiApp = context.applicationContext as OppaiApp
    }
}
