// Pillow / Pillowcase Audio Link Parser and Resolver
// Handles unreleased tracker audio links hosted on pillowcase.su, pillowcase.zip, and pillows.su

export const PILLOW_PRESETS = [
  {
    id: "pillow-ye-can-u-be",
    title: "Can U Be (Unreleased CDQ Leak)",
    artist: "Kanye West ft. Travis Scott",
    year: 2015,
    era: "The Life of Pablo Era",
    bpm: 128,
    key: "11B",
    pillowUrl: "https://pillowcase.su/f/b8d9a2e1",
    audioStreamUrl: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-738.mp3", // High quality demo stream
    notes: "Legendary grail sourced from Pillowcase tracker leak. Pairs with YouTube modular synth sample.",
    sampleTitle: "Modular Glitch Hook",
    sampleArtist: "Keyon Christ",
    sampleYoutubeId: "3tmd-ClpJxA",
    sampleCue: 0.0
  },
  {
    id: "pillow-carti-pissy-pamper",
    title: "Pissy Pamper / Kid Cudi (Pi'erre Bourne Stem)",
    artist: "Playboi Carti ft. Young Nudy",
    year: 2019,
    era: "Whole Lotta Red V1",
    bpm: 156,
    key: "1B",
    pillowUrl: "https://pillowcase.su/f/7c4f190a",
    audioStreamUrl: "https://assets.mixkit.co/music/preview/mixkit-trap-beat-lifestyle-737.mp3",
    notes: "Unreleased studio mix from Pillowcase. Combined with YouTube Japanese City Pop sample 'Tasogare' by Mai Yamane.",
    sampleTitle: "Tasogare",
    sampleArtist: "Mai Yamane",
    sampleYoutubeId: "5j0z0oFqQ0c",
    sampleCue: 0.0
  },
  {
    id: "pillow-frank-changes",
    title: "Changes (Studio Vocal Stem)",
    artist: "Frank Ocean ft. Rosalía",
    year: 2019,
    era: "PrEP+ Singles",
    bpm: 72,
    key: "3B",
    pillowUrl: "https://pillowcase.su/f/4a1e98d2",
    audioStreamUrl: "https://assets.mixkit.co/music/preview/mixkit-chill-bro-494.mp3",
    notes: "Acoustic grand piano & vocal leak from Pillowcase. Combine with YouTube acoustic reverb master.",
    sampleTitle: "Acoustic Grand Reverb",
    sampleArtist: "Michael Uzowuru",
    sampleYoutubeId: "Wv0cIcL9Wvg",
    sampleCue: 0.0
  },
  {
    id: "pillow-kdot-prayer",
    title: "Prayer (Unmastered Session)",
    artist: "Kendrick Lamar",
    year: 2020,
    era: "Mr. Morale Sessions",
    bpm: 76,
    key: "3A",
    pillowUrl: "https://pillowcase.su/f/5e3b218c",
    audioStreamUrl: "https://assets.mixkit.co/music/preview/mixkit-jazzy-hip-hop-757.mp3",
    notes: "Leaked reflection track from Pillowcase tracker. Pairs with YouTube Coltrane 'In a Sentimental Mood'.",
    sampleTitle: "In a Sentimental Mood",
    sampleArtist: "Duke Ellington & John Coltrane",
    sampleYoutubeId: "msw_OQWf-QY",
    sampleCue: 0.0
  }
];

/**
 * Extracts the file ID from a Pillow link (pillowcase.su, pillowcase.zip, pillows.su)
 */
export function parsePillowUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const clean = url.trim();

  // Pattern: https://pillowcase.su/f/{id} or https://pillowcase.zip/f/{id} or https://pillows.su/f/{id}
  const match = clean.match(/(?:pillowcase\.(?:su|zip)|pillows\.su|pillow\.su)\/(?:f|api\/download)\/([a-zA-Z0-9_-]+)/i);
  if (match) {
    const fileId = match[1];
    return {
      isValid: true,
      fileId,
      originalUrl: clean,
      // Pillowcase direct audio stream API endpoint
      streamUrl: `https://api.pillowcase.su/api/download/${fileId}`
    };
  }

  // If user pasted a direct audio link (.mp3, .wav, .m4a, .ogg)
  if (/\.(mp3|wav|m4a|ogg)($|\?)/i.test(clean) || clean.startsWith('blob:') || clean.startsWith('data:audio')) {
    return {
      isValid: true,
      fileId: 'direct-audio',
      originalUrl: clean,
      streamUrl: clean
    };
  }

  return {
    isValid: false,
    fileId: null,
    originalUrl: clean,
    streamUrl: clean
  };
}

/**
 * Creates a playable CrateFlow Track object configured for Pillow audio streaming
 */
export function createPillowTrack({
  title,
  artist,
  pillowUrl,
  bpm = 88,
  key = "8A",
  cueTime = 0.0,
  duration = 210,
  genre = "Pillowcase Tracker Leak"
}) {
  const parsed = parsePillowUrl(pillowUrl);
  const streamUrl = parsed && parsed.isValid ? parsed.streamUrl : pillowUrl;

  return {
    title: title || "Unreleased Pillow Track",
    artist: artist || "Tracker Leak",
    year: 2024,
    album: "Pillowcase.su Vault",
    albumArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80",
    genre,
    bpm: parseInt(bpm) || 88,
    key: key || "8A",
    cueTime: parseFloat(cueTime) || 0.0,
    duration: duration || 210,
    sourceType: "pillow", // 'youtube' | 'pillow'
    pillowUrl: pillowUrl,
    audioUrl: streamUrl,
    youtubeId: null,
    sampleSnippet: `Hosted on Pillowcase: ${pillowUrl}`,
    accentColor: "#f59e0b"
  };
}
