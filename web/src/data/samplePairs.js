// Curated sample lineage pairs with timing, BPM, harmonic keys, and actual verified YouTube video IDs
export const SAMPLE_PAIRS = [
  {
    id: "kendrick-grant-green",
    slug: "sing-about-me",
    trackA: {
      title: "Sing About Me, I'm Dying of Thirst",
      artist: "Kendrick Lamar",
      year: 2012,
      album: "good kid, m.A.A.d city",
      albumArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80",
      genre: "Conscious Hip-Hop",
      bpm: 74,
      key: "8A",
      cueTime: 0.0,
      duration: 360,
      youtubeId: "mIFAomeTBBM",
      sampleSnippet: "Guitar arpeggio & delicate jazz drum break loop",
      accentColor: "#f59e0b"
    },
    trackB: {
      title: "Maybe Tomorrow",
      artist: "Grant Green",
      year: 1971,
      album: "Visions",
      albumArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80",
      genre: "Soul Jazz / Blue Note",
      bpm: 74,
      key: "8A",
      cueTime: 4.2,
      duration: 295,
      youtubeId: "T-iZF2LyxIs",
      sampleType: "Direct Master Flip & Guitar Chop",
      accentColor: "#06b6d4"
    },
    ancestry: [
      { generation: 0, title: "Sing About Me, I'm Dying of Thirst", artist: "Kendrick Lamar", year: 2012, role: "Parent Track" },
      { generation: 1, title: "Maybe Tomorrow", artist: "Grant Green", year: 1971, role: "Primary Guitar & Rhythm Sample" },
      { generation: 2, title: "Django", artist: "Modern Jazz Quartet", year: 1954, role: "Harmonic Reference (Jazz Standard)" }
    ],
    community: {
      verifiedBy: 84,
      isVerified: true,
      nudgeOffset: 0.0,
      submissionsCount: 14,
      curatorNote: "Produced by Like of Pac Div. The vintage Blue Note guitar tone was time-stretched without pitch alteration to create the reflective heartbeat of the 12-minute opus."
    }
  },
  {
    id: "daft-punk-eddie-johns",
    slug: "one-more-time",
    trackA: {
      title: "One More Time",
      artist: "Daft Punk",
      year: 2000,
      album: "Discovery",
      albumArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80",
      genre: "French House / Filter Disco",
      bpm: 123,
      key: "11B",
      cueTime: 0.0,
      duration: 320,
      youtubeId: "FGBhQbmPwH8",
      sampleSnippet: "Micro-chopped celebratory brass fanfare & kick sync",
      accentColor: "#f59e0b"
    },
    trackB: {
      title: "More Spell on You",
      artist: "Eddie Johns",
      year: 1979,
      album: "More Spell on You (Single)",
      albumArt: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&auto=format&fit=crop&q=80",
      genre: "Euro Disco / Funk",
      bpm: 123,
      key: "11B",
      cueTime: 36.4,
      duration: 215,
      youtubeId: "gVfB6UqN0YQ",
      sampleType: "Micro-Chop & Re-Sequenced Brass Stabs",
      accentColor: "#06b6d4"
    },
    ancestry: [
      { generation: 0, title: "One More Time", artist: "Daft Punk", year: 2000, role: "Filter House Anthem" },
      { generation: 1, title: "More Spell on You", artist: "Eddie Johns", year: 1979, role: "Brass & Horn Micro-Chops" }
    ],
    community: {
      verifiedBy: 142,
      isVerified: true,
      nudgeOffset: 0.0,
      submissionsCount: 29,
      curatorNote: "Thomas Bangalter & Guy-Manuel sliced 0.25-second horn fragments from Eddie Johns, reversed subtle envelope tails, and re-arranged them into an entirely new melodic hook."
    }
  },
  {
    id: "kanye-chaka",
    slug: "through-the-wire",
    trackA: {
      title: "Through the Wire",
      artist: "Kanye West",
      year: 2003,
      album: "The College Dropout",
      albumArt: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80",
      genre: "Hip-Hop / Chipmunk Soul",
      bpm: 84,
      key: "1B",
      cueTime: 0.0,
      duration: 221,
      youtubeId: "uvb-1wjAtk4",
      sampleSnippet: "Speed-up vocal chorus & horn punchlines",
      accentColor: "#f59e0b"
    },
    trackB: {
      title: "Through the Fire",
      artist: "Chaka Khan",
      year: 1984,
      album: "I Feel for You",
      albumArt: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&auto=format&fit=crop&q=80",
      genre: "80s Soul / Quiet Storm",
      bpm: 84,
      key: "1B",
      cueTime: 199.0,
      duration: 286,
      youtubeId: "bZ_Vpydk2g8",
      sampleType: "Pitched-Up Master Vocal & Horn Sample",
      accentColor: "#06b6d4"
    },
    ancestry: [
      { generation: 0, title: "Through the Wire", artist: "Kanye West", year: 2003, role: "Breakthrough Debut Single" },
      { generation: 1, title: "Through the Fire", artist: "Chaka Khan", year: 1984, role: "Soul Classic Foundation" }
    ],
    community: {
      verifiedBy: 210,
      isVerified: true,
      nudgeOffset: 0.0,
      submissionsCount: 38,
      curatorNote: "Kanye pitched up Chaka Khan's chorus vocal by +5 semitones while his jaw was wired shut following his car crash."
    }
  },
  {
    id: "mfdoom-sade",
    slug: "doomsday",
    trackA: {
      title: "Doomsday",
      artist: "MF DOOM ft. Pebbles the Invisible Girl",
      year: 1999,
      album: "Operation: Doomsday",
      albumArt: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80",
      genre: "Underground Hip-Hop",
      bpm: 92,
      key: "4A",
      cueTime: 15.2,
      duration: 298,
      youtubeId: "gQbHGOJyP1Y",
      sampleSnippet: "Lush electric piano chords & vocal melody interpolation",
      accentColor: "#f59e0b"
    },
    trackB: {
      title: "Kiss of Love",
      artist: "Sade",
      year: 1992,
      album: "Love Deluxe",
      albumArt: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&auto=format&fit=crop&q=80",
      genre: "Smooth Soul / Quiet Storm",
      bpm: 92,
      key: "4A",
      cueTime: 0.0,
      duration: 254,
      youtubeId: "Bv_4L6kH5v4",
      sampleType: "Harmonic Interpolation & Rhyme Foundation",
      accentColor: "#06b6d4"
    },
    ancestry: [
      { generation: 0, title: "Doomsday", artist: "MF DOOM", year: 1999, role: "Underground Classic" },
      { generation: 1, title: "Kiss of Love", artist: "Sade", year: 1992, role: "Melodic & Vocal Foundation" }
    ],
    community: {
      verifiedBy: 96,
      isVerified: true,
      nudgeOffset: 0.0,
      submissionsCount: 19,
      curatorNote: "DOOM flipped the opening chords of Sade's 'Kiss of Love' and had Pebbles sing Sade's exact vocal cadence over dusty boom-bap drums."
    }
  },
  {
    id: "dre-david-mccallum",
    slug: "still-dre",
    trackA: {
      title: "Still D.R.E.",
      artist: "Dr. Dre ft. Snoop Dogg",
      year: 1999,
      album: "2001",
      albumArt: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&auto=format&fit=crop&q=80",
      genre: "West Coast Hip-Hop",
      bpm: 93,
      key: "6A",
      cueTime: 0.0,
      duration: 270,
      youtubeId: "_CL6n0FJZpk",
      sampleSnippet: "Iconic staccato piano chords & crisp orchestral tension",
      accentColor: "#f59e0b"
    },
    trackB: {
      title: "The Edge",
      artist: "David McCallum",
      year: 1967,
      album: "Music: A Bit More of Me",
      albumArt: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=400&auto=format&fit=crop&q=80",
      genre: "Orchestral Spy Funk",
      bpm: 93,
      key: "6A",
      cueTime: 21.0,
      duration: 174,
      youtubeId: "6-kIR5k9n_M",
      sampleType: "Direct String & Riff Sample (Arranged by David Axelrod)",
      accentColor: "#06b6d4"
    },
    ancestry: [
      { generation: 0, title: "Still D.R.E.", artist: "Dr. Dre", year: 1999, role: "West Coast Anthem" },
      { generation: 1, title: "The Edge", artist: "David McCallum", year: 1967, role: "Orchestral Foundation (David Axelrod)" }
    ],
    community: {
      verifiedBy: 210,
      isVerified: true,
      nudgeOffset: 0.0,
      submissionsCount: 45,
      curatorNote: "Arranged by David Axelrod. Scott Storch replayed the hypnotic piano pattern while the intro strings were sampled directly from the 1967 vinyl master."
    }
  },
  {
    id: "beyonce-robin-s",
    slug: "break-my-soul",
    trackA: {
      title: "Break My Soul",
      artist: "Beyoncé",
      year: 2022,
      album: "Renaissance",
      albumArt: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80",
      genre: "House / Dance Pop",
      bpm: 115,
      key: "5A",
      cueTime: 14.5,
      duration: 278,
      youtubeId: "yjki-9Pth4I",
      sampleSnippet: "Korg M1 Organ 2 bassline & euphoric 90s club groove",
      accentColor: "#f59e0b"
    },
    trackB: {
      title: "Show Me Love",
      artist: "Robin S",
      year: 1993,
      album: "Show Me Love",
      albumArt: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=80",
      genre: "90s Diva House",
      bpm: 115,
      key: "5A",
      cueTime: 8.0,
      duration: 252,
      youtubeId: "Ps2Jc28tQrw",
      sampleType: "Interpolation of Iconic Organ Bassline",
      accentColor: "#06b6d4"
    },
    ancestry: [
      { generation: 0, title: "Break My Soul", artist: "Beyoncé", year: 2022, role: "Grammy Winning House Record" },
      { generation: 1, title: "Show Me Love", artist: "Robin S", year: 1993, role: "Classic Korg M1 Organ Bassline" }
    ],
    community: {
      verifiedBy: 118,
      isVerified: true,
      nudgeOffset: 0.0,
      submissionsCount: 22,
      curatorNote: "The song bridges 90s New York house music with New Orleans bounce culture, seamlessly layering the classic Stonebridge organ riff."
    }
  }
];
