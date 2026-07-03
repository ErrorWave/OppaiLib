# OppaiLib Android app

Native Kotlin + Jetpack Compose + Material 3 (Material You / dynamic color)
client for an OppaiLib server. Talks to the same REST API as the web UI and uses
the same auth model (Bearer session token, stored in Jetpack Security's
`EncryptedSharedPreferences`), with an optional biometric app lock.

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

## Build

You need the Android SDK (via Android Studio Ladybug+ or the command-line
tools) and JDK 17.

1. **Generate the Gradle wrapper jar** (not committed):
   ```sh
   cd android
   gradle wrapper --gradle-version 8.11.1
   ```
   (or just open the `android/` folder in Android Studio, which does this for you)

2. **Point to your SDK** — create `android/local.properties`:
   ```properties
   sdk.dir=/path/to/Android/sdk
   ```

3. **Build a debug APK:**
   ```sh
   ./gradlew assembleDebug
   # → app/build/outputs/apk/debug/app-debug.apk
   ```

   Or a signed release APK:
   ```sh
   ./gradlew assembleRelease
   ```
   (configure a signing config in `app/build.gradle.kts`, or sign with
   `apksigner` afterwards).

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
