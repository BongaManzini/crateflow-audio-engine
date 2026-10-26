# CrateFlow Android (Kotlin)

**Native Android application for Sample Lineage Detection, Algorithmic DJ Transition & Harmonic Playlist Synthesis**

Built with modern **Android Jetpack Compose**, **Kotlin Coroutines / StateFlow**, and **Media3 (ExoPlayer)**.

---

## Architecture & Features

### 1. Pure Algorithmic DSP Transition (No AI)
* **`DspCrossfader.kt`**: Pure mathematical constant-power crossfading ($Gain_A = \cos(\theta), Gain_B = \sin(\theta)$) and 4-bar automated DJ transitions (`Phase 1: High-Cut Sweep` $\to$ `Phase 2: Bass Swap` $\to$ `Phase 3: Drop into Sample`).
* **`AudioEngine.kt`**: Dual player instances managed via **Android Media3 ExoPlayer** for seamless cue jumping, loop playback, and hardware volume balance.

### 2. Multi-Playlist Synthesizer & Harmonic Flow
* **`PlaylistSynthesizer.kt`**: Mines public streaming playlists sharing the song.
* **Consensus $\leftrightarrow$ Culture Bridge Slider**: Allows users to blend between high-frequency consensus tracks and cross-genre cultural bridges (Soul, Jazz, Hip-Hop, Disco).
* **`CamelotWheel.kt`**: Sequences tracks along the harmonic Camelot Wheel ($8A \to 8B \to 9A \to 9B$) with progressive BPM alignment.

### 3. Community Crate-Digger Layer
* **Sync Nudge**: Micro-adjuster buttons (`-0.1s` / `+0.1s`) to lock in cue points.
* **Crowdsourced Submissions**: In-app modal dialog (`SubmitSampleDialog.kt`) for users to submit uncredited sample flips with exact timestamps.

---

## How to Run

### In Android Studio
1. Open Android Studio.
2. Select **File > Open...** and choose the `crateflow-android` folder.
3. Android Studio will automatically sync the Gradle configuration.
4. Select your emulator or connected physical Android device and click **Run (▶)**.

### Via Command Line
```bash
cd crateflow-android
./gradlew assembleDebug
```
The compiled APK will be generated at:
`crateflow-android/app/build/outputs/apk/debug/app-debug.apk`
