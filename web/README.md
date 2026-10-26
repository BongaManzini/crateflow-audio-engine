# CrateFlow

**Sample Lineage Detection, Algorithmic DJ Transition & Harmonic Playlist Synthesizer**

CrateFlow is a client-side music discovery platform built for crate-diggers, producers, and casual listeners. It identifies musical samples, executes beat-matched DJ transitions between songs and their vintage sources, and synthesizes hybrid playlists by mining the social graph of streaming services.

---

## Key Capabilities

### 1. Zero-AI Client-Side DSP Audio Engine
- **No Cloud AI Costs:** All audio synthesis, EQ filtering, and beat-clock tracking run 100% in the user's browser via the native Web Audio API.
- **4-Bar Automated DJ Transition:**
  - *Phase 1:* High-cut filter sweep rolls off high frequencies of the outgoing track.
  - *Phase 2:* Bass swap isolates and swaps the low-end kick frequencies so they never clash.
  - *Phase 3:* Beat 1 drop lands squarely on the sample cue point of the incoming record.
- **Tactile DJ Crossfader:** Constant-power crossfade curve allowing smooth manual blending.
- **Real-Time Spectrum Visualizer:** Dual animated waveforms showing beat pulses and cue timestamps.

### 2. Multi-Playlist Synthesizer ("Does All of That")
- **Social Graph Mining:** Analyzes public playlists across Spotify, YouTube Music, and Apple Music that share the target track.
- **Consensus $\leftrightarrow$ Culture Bridge Slider:**
  - *Consensus (Hive Mind):* Focuses on the most frequently co-occurring tracks across all playlists.
  - *Culture Bridge (Serendipity):* Discovers unexpected genre crossover tracks (e.g., connecting modern hip-hop to 70s Japanese jazz or French house).
- **Harmonic Camelot Flow Sorting:** Orders tracks along the Camelot Wheel (8A $\to$ 8B $\to$ 9A) with smooth BPM progression for non-stop DJ sets.
- **Exporting:** Download instant `.m3u` playlist files or copy universal streaming links.

### 3. Community Crate-Digger Verification Layer
- **Sync Nudge Tool:** Real-time `[-0.1s]` / `[+0.1s]` micro-adjusters to fine-tune cue points on the fly.
- **Decentralized Submissions:** Users can contribute uncredited sample flips with exact timestamps, sample classifications (Direct Master Flip, Melodic Interpolation, Drum Break, Vocal Chop), and earn community verification badges.

### 4. Responsive Dual Modes
- **Mobile View:** Touch-optimized, streamlined cards, big waveforms, tap-to-flip hero transition.
- **DJ Terminal Mode:** Expanded dual-deck studio dashboard with 3-band EQ knobs (Low, Mid, High), live BPM counters, and audio routing.

---

## How to Run

From the project root:

```bash
npm run dev:crateflow
```

Or run directly from the `crate-flow` directory:

```bash
cd crate-flow
npx vite
```

Open your browser at `http://localhost:5174`.
