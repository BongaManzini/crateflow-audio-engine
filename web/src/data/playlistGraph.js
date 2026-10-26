// Multi-Playlist Synthesizer & Harmonic Camelot Wheel Sorting Engine
// Computes track co-occurrence across shared playlists and blends mainstream consensus with rare culture bridges.

const MOCK_POOLS = {
  default: [
    { title: "Wesley's Theory", artist: "Kendrick Lamar ft. George Clinton", bpm: 114, key: "7A", sharedPlaylists: 142, bridgeScore: 0.88, genre: "P-Funk / Hip-Hop", youtubeId: "s0QtdMA9LYQ" },
    { title: "Maybe Tomorrow", artist: "Grant Green", bpm: 74, key: "8A", sharedPlaylists: 34, bridgeScore: 0.94, genre: "Soul Jazz", youtubeId: "T-iZF2LyxIs" },
    { title: "Devil in a New Dress", artist: "Kanye West ft. Rick Ross", bpm: 82, key: "6A", sharedPlaylists: 210, bridgeScore: 0.65, genre: "Soul Chopping", youtubeId: "Qp3L9m_T63Y" },
    { title: "Will You Still Love Me Tomorrow", artist: "Smokey Robinson", bpm: 82, key: "6B", sharedPlaylists: 18, bridgeScore: 0.96, genre: "Motown Soul", youtubeId: "dtURhQ-qAps" },
    { title: "Redbone", artist: "Childish Gambino", bpm: 80, key: "7A", sharedPlaylists: 320, bridgeScore: 0.42, genre: "Psychedelic Soul", youtubeId: "Kp7eSUU9oy8" },
    { title: "I'd Rather Be With You", artist: "Bootsy Collins", bpm: 80, key: "7B", sharedPlaylists: 45, bridgeScore: 0.92, genre: "Funk Master", youtubeId: "g5R13o3i4c0" },
    { title: "Money Trees", artist: "Kendrick Lamar ft. Jay Rock", bpm: 72, key: "8A", sharedPlaylists: 280, bridgeScore: 0.38, genre: "West Coast Hip-Hop", youtubeId: "smqhSl0u_Qk" },
    { title: "Silver Soul", artist: "Beach House", bpm: 72, key: "8B", sharedPlaylists: 52, bridgeScore: 0.91, genre: "Dream Pop", youtubeId: "90iGIdM1_aM" },
    { title: "One More Time", artist: "Daft Punk", bpm: 123, key: "11B", sharedPlaylists: 450, bridgeScore: 0.25, genre: "French House", youtubeId: "FGBhQbmPwH8" },
    { title: "More Spell on You", artist: "Eddie Johns", bpm: 123, key: "11B", sharedPlaylists: 12, bridgeScore: 0.98, genre: "70s Euro-Disco", youtubeId: "bZ_Vpydk2g8" }
  ]
};

export function synthesizeBlendedPlaylist(pairId, consensusRatio = 0.5, harmonicFlow = true) {
  const pool = MOCK_POOLS.default;

  // Score each track: combination of popularity (consensus) vs rare bridge score
  let scored = pool.map(track => {
    const normPopularity = track.sharedPlaylists / 450;
    const score = (consensusRatio * normPopularity) + ((1 - consensusRatio) * track.bridgeScore);
    return { ...track, score };
  });

  // Sort by score
  scored.sort((a, b) => b.score - a.score);

  // Harmonic Camelot Sequencing
  if (harmonicFlow) {
    scored.sort((a, b) => {
      const numA = parseInt(a.key) || 8;
      const numB = parseInt(b.key) || 8;
      return numA - numB;
    });
  }

  const avgBridge = Math.round(scored.reduce((acc, t) => acc + t.bridgeScore, 0) / scored.length * 100);
  const consensusPct = Math.round(consensusRatio * 100);

  return {
    consensusPct,
    bridgePct: 100 - consensusPct,
    bridgeScore: avgBridge,
    playlistsCount: 284,
    playlists: [
      { name: "Soul Chop Renaissance", curator: "CrateDigger_99" },
      { name: "Late Night Vinyl Flips", curator: "BeatsByTheo" },
      { name: "Universal Sample Roots", curator: "ArchivistDJ" }
    ],
    tracks: scored
  };
}
