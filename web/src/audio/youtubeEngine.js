// Hybrid DJ Audio Engine: YouTube IFrame API + HTML5 Audio (Pillowcase / Pillows Streams)
// Seamlessly mixes and crossfades between any combination:
// - YouTube + YouTube
// - Pillowcase Audio + YouTube Sample (Hybrid Deck Synergy)
// - Pillowcase + Pillowcase
// - YouTube + Pillowcase Sample

class HybridAudioEngine {
  constructor() {
    this.playerA = null;
    this.playerB = null;
    this.audioA = null;
    this.audioB = null;

    this.isReadyA = false;
    this.isReadyB = false;
    this.isPlaying = false;
    this.crossfade = 0.0; // 0 = 100% Deck A, 1 = 100% Deck B
    this.activePair = null;
    this.onStateChangeCallbacks = [];

    // Initialize HTML5 Audio elements for Pillow streaming
    if (typeof window !== 'undefined') {
      this.initHtml5Audio();
    }
  }

  initHtml5Audio() {
    if (!this.audioA) {
      this.audioA = new Audio();
      this.audioA.preload = "auto";
      this.audioA.addEventListener("ended", () => this.handleTrackEnd('A'));
    }
    if (!this.audioB) {
      this.audioB = new Audio();
      this.audioB.preload = "auto";
      this.audioB.addEventListener("ended", () => this.handleTrackEnd('B'));
    }
  }

  // Load YouTube IFrame API script
  init(onReady) {
    if (typeof window === 'undefined') return;
    this.initHtml5Audio();

    if (window.YT && window.YT.Player) {
      this.setupPlayers(onReady);
      return;
    }

    if (!document.getElementById('yt-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }

    const previousOnReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previousOnReady) previousOnReady();
      this.setupPlayers(onReady);
    };
  }

  setupPlayers(onReady) {
    if (!window.YT) return;

    // Deck A YouTube Player
    if (!this.playerA && document.getElementById('yt-deck-a')) {
      this.playerA = new window.YT.Player('yt-deck-a', {
        height: '100%',
        width: '100%',
        videoId: 'mIFAomeTBBM',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          origin: window.location.origin
        },
        events: {
          onReady: () => {
            this.isReadyA = true;
            this.updateVolumes();
            if (this.isReadyA && this.isReadyB && onReady) onReady();
          },
          onStateChange: (e) => this.handlePlayerState(e, 'A')
        }
      });
    }

    // Deck B YouTube Player
    if (!this.playerB && document.getElementById('yt-deck-b')) {
      this.playerB = new window.YT.Player('yt-deck-b', {
        height: '100%',
        width: '100%',
        videoId: 'T-iZF2LyxIs',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          origin: window.location.origin
        },
        events: {
          onReady: () => {
            this.isReadyB = true;
            this.updateVolumes();
            if (this.isReadyA && this.isReadyB && onReady) onReady();
          },
          onStateChange: (e) => this.handlePlayerState(e, 'B')
        }
      });
    }
  }

  handlePlayerState(event, deck) {
    if (event.data === window.YT?.PlayerState?.PLAYING) {
      this.isPlaying = true;
    } else if (event.data === window.YT?.PlayerState?.PAUSED || event.data === window.YT?.PlayerState?.ENDED) {
      const aPlaying = this.isDeckPlaying('A');
      const bPlaying = this.isDeckPlaying('B');
      if (!aPlaying && !bPlaying) {
        this.isPlaying = false;
      }
    }
    this.notifyState();
  }

  handleTrackEnd(deck) {
    const otherDeck = deck === 'A' ? 'B' : 'A';
    if (!this.isDeckPlaying(otherDeck)) {
      this.isPlaying = false;
      this.notifyState();
    }
  }

  isDeckPlaying(deck) {
    const isDeckA = deck === 'A';
    const track = isDeckA ? this.activePair?.trackA : this.activePair?.trackB;
    const isPillow = track?.sourceType === 'pillow';

    if (isPillow) {
      const audio = isDeckA ? this.audioA : this.audioB;
      return audio ? !audio.paused && audio.currentTime > 0 : false;
    } else {
      const player = isDeckA ? this.playerA : this.playerB;
      return player?.getPlayerState?.() === 1;
    }
  }

  notifyState() {
    this.onStateChangeCallbacks.forEach(cb => cb(this.isPlaying, this.crossfade));
  }

  onStateChange(cb) {
    this.onStateChangeCallbacks.push(cb);
  }

  // Load a pair into Deck A and Deck B (Hybrid YouTube & Pillow support)
  loadPair(pair) {
    this.activePair = pair;
    this.initHtml5Audio();

    // Configure Deck A
    const isPillowA = pair.trackA?.sourceType === 'pillow' || !!pair.trackA?.audioUrl;
    if (isPillowA && this.audioA) {
      this.playerA?.pauseVideo?.();
      this.audioA.src = pair.trackA.audioUrl || pair.trackA.pillowUrl;
      this.audioA.currentTime = pair.trackA.cueTime || 0;
    } else if (this.playerA?.cueVideoById && pair.trackA?.youtubeId) {
      this.audioA?.pause();
      this.playerA.cueVideoById({
        videoId: pair.trackA.youtubeId,
        startSeconds: pair.trackA.cueTime || 0
      });
    }

    // Configure Deck B
    const isPillowB = pair.trackB?.sourceType === 'pillow' || !!pair.trackB?.audioUrl;
    if (isPillowB && this.audioB) {
      this.playerB?.pauseVideo?.();
      this.audioB.src = pair.trackB.audioUrl || pair.trackB.pillowUrl;
      this.audioB.currentTime = pair.trackB.cueTime || 0;
    } else if (this.playerB?.cueVideoById && pair.trackB?.youtubeId) {
      this.audioB?.pause();
      this.playerB.cueVideoById({
        videoId: pair.trackB.youtubeId,
        startSeconds: pair.trackB.cueTime || 0
      });
    }

    this.setCrossfade(0.0);
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.isPlaying = true;
    const isPillowA = this.activePair?.trackA?.sourceType === 'pillow';
    const isPillowB = this.activePair?.trackB?.sourceType === 'pillow';

    // Start Deck A if audible
    if (this.crossfade < 0.95) {
      if (isPillowA) {
        this.audioA?.play()?.catch(() => {});
      } else {
        this.playerA?.playVideo?.();
      }
    }

    // Start Deck B if audible
    if (this.crossfade > 0.05) {
      if (isPillowB) {
        this.audioB?.play()?.catch(() => {});
      } else {
        this.playerB?.playVideo?.();
      }
    }

    this.updateVolumes();
    this.notifyState();
  }

  pause() {
    this.isPlaying = false;
    this.playerA?.pauseVideo?.();
    this.playerB?.pauseVideo?.();
    this.audioA?.pause();
    this.audioB?.pause();
    this.notifyState();
  }

  setCrossfade(val) {
    this.crossfade = Math.max(0, Math.min(1, val));
    this.updateVolumes();
    this.notifyState();
  }

  updateVolumes() {
    // Constant-power DJ crossfade curve
    const angle = this.crossfade * (Math.PI / 2);
    const volA_unit = Math.cos(angle);
    const volB_unit = Math.sin(angle);

    const volA_yt = Math.round(volA_unit * 100);
    const volB_yt = Math.round(volB_unit * 100);

    const isPillowA = this.activePair?.trackA?.sourceType === 'pillow';
    const isPillowB = this.activePair?.trackB?.sourceType === 'pillow';

    try {
      // Deck A volume routing
      if (isPillowA && this.audioA) {
        this.audioA.volume = Math.max(0, Math.min(1, volA_unit));
      } else if (this.playerA?.setVolume) {
        this.playerA.setVolume(volA_yt);
      }

      // Deck B volume routing
      if (isPillowB && this.audioB) {
        this.audioB.volume = Math.max(0, Math.min(1, volB_unit));
      } else if (this.playerB?.setVolume) {
        this.playerB.setVolume(volB_yt);
      }

      // If playing, ensure active streams are unpaused
      if (this.isPlaying) {
        if (volA_unit > 0.05) {
          if (isPillowA) {
            if (this.audioA?.paused) this.audioA.play().catch(() => {});
          } else if (this.playerA?.getPlayerState?.() !== 1) {
            this.playerA?.playVideo?.();
          }
        }

        if (volB_unit > 0.05) {
          if (isPillowB) {
            if (this.audioB?.paused) this.audioB.play().catch(() => {});
          } else if (this.playerB?.getPlayerState?.() !== 1) {
            this.playerB?.playVideo?.();
          }
        }
      }
    } catch (e) {
      // Ignore timing race conditions during fast scrub
    }
  }

  // Automated 4-bar DJ transition between any mix of YouTube & Pillowcase
  autoTransition(durationSeconds = 4.0, onProgress, onComplete) {
    const startTime = performance.now();
    const startX = this.crossfade;
    const targetX = startX < 0.5 ? 1.0 : 0.0;

    const incomingIsDeckB = targetX === 1.0;
    const incomingTrack = incomingIsDeckB ? this.activePair?.trackB : this.activePair?.trackA;
    const isPillowIncoming = incomingTrack?.sourceType === 'pillow';
    const cueTime = incomingTrack?.cueTime || 0;

    // Prime and start incoming source at exact sample cue point
    try {
      if (incomingIsDeckB) {
        if (isPillowIncoming && this.audioB) {
          this.audioB.currentTime = cueTime;
          this.audioB.play().catch(() => {});
        } else if (this.playerB) {
          this.playerB.seekTo?.(cueTime, true);
          this.playerB.playVideo?.();
        }
      } else {
        if (isPillowIncoming && this.audioA) {
          this.audioA.currentTime = cueTime;
          this.audioA.play().catch(() => {});
        } else if (this.playerA) {
          this.playerA.seekTo?.(cueTime, true);
          this.playerA.playVideo?.();
        }
      }
    } catch (e) {}

    this.isPlaying = true;

    const animate = (now) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1.0, elapsed / durationSeconds);

      // Smooth cubic easing curve
      const eased = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentX = startX + (targetX - startX) * eased;
      this.setCrossfade(currentX);

      if (onProgress) onProgress(progress, currentX);

      if (progress < 1.0) {
        requestAnimationFrame(animate);
      } else {
        this.setCrossfade(targetX);
        if (onComplete) onComplete(targetX);
      }
    };

    requestAnimationFrame(animate);
  }

  nudge(deck, deltaSeconds) {
    const isDeckA = deck === 'A';
    const track = isDeckA ? this.activePair?.trackA : this.activePair?.trackB;
    const isPillow = track?.sourceType === 'pillow';

    if (isPillow) {
      const audio = isDeckA ? this.audioA : this.audioB;
      if (audio) {
        audio.currentTime = Math.max(0, audio.currentTime + deltaSeconds);
      }
    } else {
      const player = isDeckA ? this.playerA : this.playerB;
      if (player?.getCurrentTime) {
        const current = player.getCurrentTime();
        player.seekTo(Math.max(0, current + deltaSeconds), true);
      }
    }
  }

  getCurrentTime(deck) {
    const isDeckA = deck === 'A';
    const track = isDeckA ? this.activePair?.trackA : this.activePair?.trackB;
    if (track?.sourceType === 'pillow') {
      const audio = isDeckA ? this.audioA : this.audioB;
      return audio ? audio.currentTime : 0;
    } else {
      const player = isDeckA ? this.playerA : this.playerB;
      return player?.getCurrentTime ? player.getCurrentTime() : 0;
    }
  }
}

export const youtubeEngine = new HybridAudioEngine();
export const hybridAudioEngine = youtubeEngine;
