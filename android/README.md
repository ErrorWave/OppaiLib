# OppaiLib Android app

Native Kotlin + Jetpack Compose + Material 3 (Material You / dynamic color)
client for an OppaiLib server. Talks to the same REST API as the web UI and uses
the same auth model (Bearer session token, stored in Jetpack Security's
`EncryptedSharedPreferences`), with an optional biometric app lock.

Requires Android 6.0 (API 23) or newer.

## Features implemented
- Sign in to any server URL (stored encrypted on device)
- Browse the library in a Material 3 grid, filter by kind
- View images (Coil) and stream video (Media3/ExoPlayer, auth header attached)
- Upload from the device via the Storage Access Framework (multipart)
- Import by pasting a URL → preview scraped media → import selected assets
- One-tap AI auto-tag from the viewer
- Optional biometric lock (`BiometricPrompt`)

Roadmap (scaffolded, not yet wired): encrypted offline download cache, panic/
decoy mode, per-item rating/favorite editing.

## Get an APK

### From CI (no toolchain needed)

[`.github/workflows/android.yml`](../.github/workflows/android.yml) builds the
APK on GitHub's runners. This is the easy path — nothing to install locally.

- **Any push to `main`, or a manual run** (Actions → *Build Android APK* → *Run
  workflow*) produces a **debug APK**, downloadable from the run's *Artifacts*.
  It installs on any phone with no setup.
- **Pushing a tag `vX.Y.Z`** produces a **signed release APK** and attaches it to
  the GitHub Release, so you can download it straight onto the phone.

Release signing needs a keystore you create once; the workflow header documents
the four secrets to add. Tagged releases and Docker images stop with an actionable
error when that key is missing; silently shipping a runner's throwaway debug key
would make the next in-app update impossible.

> **Debug and release APKs cannot replace each other.** They carry different
> signatures, and Android refuses an in-place update across a signature change.
> Debug keys also differ between hosted runners. Use debug APKs only for testing;
> uninstall once when moving to the persistently signed server/release build, then
> future in-app updates can replace it normally. Uninstalling wipes the app's saved
> server URL and session, but not the server library.

### Locally

You need the Android SDK (via Android Studio Ladybug+ or the command-line tools)
and JDK 17.

The Gradle wrapper jar is **not** committed, so there is no `./gradlew` in a
fresh clone. Generate it once with a system Gradle (8.11.1):

```sh
cd android
gradle wrapper --gradle-version 8.11.1
```

(or just open `android/` in Android Studio, which does this for you.)

Point to your SDK — create `android/local.properties`:

```properties
sdk.dir=/path/to/Android/sdk
```

Then build:

```sh
./gradlew assembleDebug
# → app/build/outputs/apk/debug/app-debug.apk
```

A local `assembleRelease` is minified but **unsigned** unless you export the
same `ANDROID_KEYSTORE_FILE` / `ANDROID_KEYSTORE_PASSWORD` / `ANDROID_KEY_ALIAS`
/ `ANDROID_KEY_PASSWORD` environment variables that CI uses. An unsigned APK
will not install — sign it with `apksigner`, or just let CI build it.

## Sideload

1. Copy the APK to your phone (USB, or `adb install app-debug.apk`).
2. Enable **Install unknown apps** for your file manager / browser.
3. Open the APK to install.
4. Launch OppaiLib, enter your server URL (e.g. `http://192.168.1.50:8080`),
   and sign in with your OppaiLib credentials.

> The app permits cleartext HTTP so it works with a LAN server that has no TLS.
> For access outside your LAN, put the server behind a reverse proxy with HTTPS
> and use the `https://` URL.

## Emulator note
From the Android emulator, your host machine is reachable at `http://10.0.2.2:8080`
(the default prefilled server URL).
