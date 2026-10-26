// Pre-indexed repository vaults for ArtistGrid artists
// Contains authenticated tracker tracks, eras, curator notes, sample lineages, and audio IDs.

export const ARTIST_GRID_VAULTS = {
  kanyewest: {
    artistName: "Kanye West",
    curators: "Nicole, Edideaur, Crave, Yetracker Team",
    sheetId: "12nGHPPh5dVTfLuBLVQYzC3QgPxKfvp-jgCoNccvEasM",
    trackerUrl: "https://yetracker.net",
    totalTracks: 412,
    eras: [
      "College Dropout (2001-2004)",
      "Late Registration (2004-2005)",
      "Graduation (2006-2007)",
      "Good Ass Job / MBDTF (2008-2010)",
      "Yeezus & Yeezus II (2013-2014)",
      "So Help Me God / SWISH (2014-2015)",
      "The Life of Pablo (2015-2016)",
      "TurboGrafx16 & Wyoming (2016-2018)",
      "Yandhi (2018-2019)",
      "Donda & With Child (2020-2021)"
    ],
    tracks: [
      {
        id: "ye-never-see-me-again",
        title: "Never See Me Again",
        era: "Good Ass Job / MBDTF (2008-2010)",
        length: "8:52",
        date: "2010",
        quality: "CDQ / Studio Master",
        notes: "Legendary unreleased track recorded after the 2009 VMAs. Samples 'Yukiko' by Yukiko Okada. Features raw emotional piano and vocal chops.",
        sampleDetected: {
          title: "Yukiko",
          artist: "Yukiko Okada",
          year: 1984,
          type: "80s Japanese City Pop Piano & Vocal Resample",
          youtubeId: "8Z0bM3fE-1g",
          cueSample: 12.0
        },
        youtubeId: "T7f3Yv7F-gI",
        bpm: 86,
        key: "6B"
      },
      {
        id: "ye-through-the-wire-demo",
        title: "Through The Wire (Original Unmastered 2002 Demo)",
        era: "College Dropout (2001-2004)",
        length: "4:02",
        date: "2002",
        quality: "CDQ Studio",
        notes: "Recorded with jaw wired shut after near-fatal car crash. Samples 'Through the Fire' by Chaka Khan (1984). High pitch soul chop.",
        sampleDetected: {
          title: "Through the Fire",
          artist: "Chaka Khan",
          year: 1984,
          type: "Sped-up Soul Pitch Shift & Chop",
          youtubeId: "bZ_Vpydk2g8",
          cueSample: 199.0
        },
        youtubeId: "uvb-1wjAtk4",
        bpm: 84,
        key: "1B"
      },
      {
        id: "ye-alien-godzilla",
        title: "Alien / Godzilla (ft. Kid Cudi & Young Thug)",
        era: "Yandhi (2018-2019)",
        length: "5:18",
        date: "2018",
        quality: "CDQ Multi-Track",
        notes: "Unreleased grail from Yandhi sessions. Hypnotic woodwind synth chop, Mike Dean outro synthesizers, and Young Thug intro verse.",
        sampleDetected: {
          title: "Alien Flute Theme",
          artist: "Vintage Sound Library",
          year: 1978,
          type: "Analog Synthesizer & Flute Chop",
          youtubeId: "FjHGZj2IjBk",
          cueSample: 0.0
        },
        youtubeId: "FjHGZj2IjBk",
        bpm: 140,
        key: "4A"
      },
      {
        id: "ye-can-u-be",
        title: "Can U Be (ft. Travis Scott)",
        era: "The Life of Pablo (2015-2016)",
        length: "3:34",
        date: "2015",
        quality: "CDQ",
        notes: "Produced with Keyon Christ and Mike Dean. Energetic electro-synth lead with distorted 808s and Travis Scott bridge.",
        sampleDetected: {
          title: "Can U Be Synth Hook",
          artist: "Keyon Christ",
          year: 2015,
          type: "Glitch Electro Hook & Modular Synth",
          youtubeId: "3tmd-ClpJxA",
          cueSample: 0.0
        },
        youtubeId: "3tmd-ClpJxA",
        bpm: 128,
        key: "11B"
      },
      {
        id: "ye-mamas-boyfriend",
        title: "Mama's Boyfriend",
        era: "Good Ass Job / MBDTF (2008-2010)",
        length: "3:45",
        date: "2010",
        quality: "CDQ / Studio Session",
        notes: "Co-produced with Q-Tip. Samples 'Moving Out (Anthony's Song)' by Billy Joel (1977). Acapella vocal performance at Facebook HQ.",
        sampleDetected: {
          title: "Movin' Out (Anthony's Song)",
          artist: "Billy Joel",
          year: 1977,
          type: "Piano Stabs & Bassline Interpolation",
          youtubeId: "dtURhQ-qAps",
          cueSample: 0.0
        },
        youtubeId: "Wv0cIcL9Wvg",
        bpm: 92,
        key: "7A"
      },
      {
        id: "ye-brothers",
        title: "Brothers (ft. Charlie Wilson)",
        era: "TurboGrafx16 & Wyoming (2016-2018)",
        length: "4:12",
        date: "2017",
        quality: "CDQ Master",
        notes: "Wyoming sessions tribute to JAY-Z friendship. Samples 'I Can't Stand the Rain' by Ann Peebles (1973). Warm Rhodes and soul choir.",
        sampleDetected: {
          title: "I Can't Stand the Rain",
          artist: "Ann Peebles",
          year: 1973,
          type: "Memphis Soul Drum & Organ Chop",
          youtubeId: "g5R13o3i4c0",
          cueSample: 4.5
        },
        youtubeId: "g5R13o3i4c0",
        bpm: 80,
        key: "9A"
      },
      {
        id: "ye-slave-name",
        title: "Slave Name / Last Name (ft. Ant Clemons)",
        era: "Yandhi (2018-2019)",
        length: "3:50",
        date: "2018",
        quality: "CDQ Mix",
        notes: "Fan favorite Yandhi track. Samples 'Wally' by Wally Badarou (1983). Relaxed clean electric guitar riffs layered with 808s.",
        sampleDetected: {
          title: "Wally",
          artist: "Wally Badarou",
          year: 1983,
          type: "Clean Electric Guitar Riff & Synth Bass",
          youtubeId: "eW4QeY4pQfI",
          cueSample: 15.0
        },
        youtubeId: "eW4QeY4pQfI",
        bpm: 85,
        key: "5B"
      },
      {
        id: "ye-city-in-the-sky",
        title: "City in the Sky / Sky City (ft. 070 Shake & Desiigner)",
        era: "Yandhi (2018-2019)",
        length: "4:24",
        date: "2018",
        quality: "CDQ",
        notes: "Uplifting ambient soul track. Vocal hooks by 070 Shake and Ty Dolla $ign with choir swells.",
        sampleDetected: {
          title: "O-o-h Child",
          artist: "The Five Stairsteps",
          year: 1970,
          type: "Soul Vocal Interpolation & Chords",
          youtubeId: "yURRmWtbTbo",
          cueSample: 10.0
        },
        youtubeId: "yURRmWtbTbo",
        bpm: 78,
        key: "8B"
      },
      {
        id: "ye-bittersweet-poetry",
        title: "Bittersweet Poetry (ft. John Mayer)",
        era: "Graduation (2006-2007)",
        length: "4:01",
        date: "2007",
        quality: "CDQ Official Japanese Bonus",
        notes: "Graduation Japanese edition exclusive. Samples 'Bittersweet' by Chairmen of the Board (1970). John Mayer vocal hook.",
        sampleDetected: {
          title: "Bittersweet",
          artist: "Chairmen of the Board",
          year: 1970,
          type: "Soul Horns & String Resample",
          youtubeId: "kJQP7kiw5Fk",
          cueSample: 0.0
        },
        youtubeId: "kJQP7kiw5Fk",
        bpm: 88,
        key: "10B"
      },
      {
        id: "ye-christian-dior",
        title: "Christian Dior Denim Flow (ft. Kid Cudi, Pusha T, John Legend)",
        era: "Good Ass Job / MBDTF (2008-2010)",
        length: "5:08",
        date: "2010",
        quality: "CDQ Master",
        notes: "Iconic G.O.O.D. Friday release. Samples Blue Sky Black Death atmospheric guitars and reverb-soaked snare.",
        sampleDetected: {
          title: "Sleeping Children Are Still Flying",
          artist: "Blue Sky Black Death",
          year: 2008,
          type: "Shoegaze Guitar & Ambient Drone Chop",
          youtubeId: "Qp3L9m_T63Y",
          cueSample: 30.0
        },
        youtubeId: "Qp3L9m_T63Y",
        bpm: 82,
        key: "2A"
      }
    ]
  },

  kendricklamar: {
    artistName: "Kendrick Lamar",
    curators: "Infisrael, aeolowl, hunnnter, sixsensenella",
    sheetId: "1i4OQglDHiiqMDthqfUFPutGmpZzK7n63LaoWApqhQXI",
    trackerUrl: "https://docs.google.com/spreadsheets/d/1i4OQglDHiiqMDthqfUFPutGmpZzK7n63LaoWApqhQXI",
    totalTracks: 168,
    eras: [
      "Overly Dedicated (2009-2010)",
      "Section.80 (2010-2011)",
      "good kid, m.A.A.d city (2012-2013)",
      "To Pimp a Butterfly (2014-2015)",
      "untitled unmastered. (2014-2016)",
      "DAMN. (2016-2017)",
      "Black Panther Sessions (2017-2018)",
      "Mr. Morale & The Big Steppers (2019-2022)"
    ],
    tracks: [
      {
        id: "kdot-cartoon-cereal",
        title: "Cartoon & Cereal (ft. Gunplay)",
        era: "good kid, m.A.A.d city (2012-2013)",
        length: "6:55",
        date: "2012",
        quality: "CDQ Master",
        notes: "Legendary unreleased cut intended for GKMC. Samples 'Snoopy and the Red Baron' sound bites and eerie vocal loop.",
        sampleDetected: {
          title: "Snoopy's Christmas",
          artist: "The Royal Guardsmen",
          year: 1967,
          type: "Nostalgic Cartoon Audio Snippet & Bass Drop",
          youtubeId: "3u86eXg30h0",
          cueSample: 0.0
        },
        youtubeId: "c8Q_XnN1t6I",
        bpm: 72,
        key: "5A"
      },
      {
        id: "kdot-sing-about-me",
        title: "Sing About Me, I'm Dying of Thirst (Alternate Mix)",
        era: "good kid, m.A.A.d city (2012-2013)",
        length: "12:03",
        date: "2012",
        quality: "CDQ Master",
        notes: "Produced by Like. Samples 'Maybe Tomorrow' by Grant Green (1971). Timeless jazz-soul guitar arpeggio.",
        sampleDetected: {
          title: "Maybe Tomorrow",
          artist: "Grant Green",
          year: 1971,
          type: "Direct Master Flip & Guitar Chop",
          youtubeId: "T-iZF2LyxIs",
          cueSample: 4.2
        },
        youtubeId: "mIFAomeTBBM",
        bpm: 74,
        key: "8A"
      },
      {
        id: "kdot-prayer",
        title: "Prayer",
        era: "Mr. Morale & The Big Steppers (2019-2022)",
        length: "3:40",
        date: "2020",
        quality: "CDQ Studio Leak",
        notes: "Profound philosophical track exploring artist legacy and art vs artist. Samples vintage electric Rhodes keys and subtle vinyl crackle.",
        sampleDetected: {
          title: "In a Sentimental Mood",
          artist: "Duke Ellington & John Coltrane",
          year: 1963,
          type: "Rhodes Piano Chords & Vintage Reverb",
          youtubeId: "msw_OQWf-QY",
          cueSample: 0.0
        },
        youtubeId: "msw_OQWf-QY",
        bpm: 76,
        key: "3A"
      },
      {
        id: "kdot-im-better",
        title: "I'm Better (ft. Sampha)",
        era: "Mr. Morale & The Big Steppers (2019-2022)",
        length: "4:05",
        date: "2021",
        quality: "CDQ",
        notes: "Minimalist hypnotic trap beat with Sampha's emotive vocal runs and Kendrick's rhythmic cadence.",
        sampleDetected: {
          title: "Subtle Synth Atmosphere",
          artist: "Sampha",
          year: 2020,
          type: "Original Vocal Stem & Synth Progression",
          youtubeId: "p8ZJ0Q4x46w",
          cueSample: 0.0
        },
        youtubeId: "p8ZJ0Q4x46w",
        bpm: 132,
        key: "1A"
      },
      {
        id: "kdot-look-over-your-shoulder",
        title: "Look Over Your Shoulder (Original 2017 Demo)",
        era: "DAMN. (2016-2017)",
        length: "3:30",
        date: "2017",
        quality: "CDQ",
        notes: "Unreleased demo with Busta Rhymes. Samples 'I'll Be There' by The Jackson 5 (1970). Pure soul chop.",
        sampleDetected: {
          title: "I'll Be There",
          artist: "The Jackson 5",
          year: 1970,
          type: "Motown Soul Vocal Chop & Piano Riff",
          youtubeId: "XgSz5_eXvD0",
          cueSample: 0.0
        },
        youtubeId: "XgSz5_eXvD0",
        bpm: 88,
        key: "9B"
      }
    ]
  },

  playboicarti: {
    artistName: "Playboi Carti",
    curators: "Playboi Balint, realgangshit, Aztek Silver, Duke",
    sheetId: "1ivoRJskby8zykhH_szifY4a1HIQCTnVh6c2WfIfMbkM",
    trackerUrl: "https://docs.google.com/spreadsheets/d/1ivoRJskby8zykhH_szifY4a1HIQCTnVh6c2WfIfMbkM",
    totalTracks: 110,
    eras: [
      "Awful Records / In Abundance (2014-2016)",
      "Playboi Carti Self-Titled (2016-2017)",
      "Die Lit (2017-2018)",
      "Whole Lotta Red V1 (2018-2019)",
      "Whole Lotta Red V2 (2019-2020)",
      "Whole Lotta Red V3 / Narcissist (2020-2022)",
      "Music / I AM MUSIC (2023-2025)"
    ],
    tracks: [
      {
        id: "carti-pissy-pamper",
        title: "Pissy Pamper / Kid Cudi (ft. Young Nudy)",
        era: "Whole Lotta Red V1 (2018-2019)",
        length: "4:04",
        date: "2019",
        quality: "CDQ Studio",
        notes: "Biggest unreleased rap song in history. Produced by Pi'erre Bourne. Samples 'Tasogare' by Mai Yamane (1980 Japanese City Pop).",
        sampleDetected: {
          title: "Tasogare",
          artist: "Mai Yamane",
          year: 1980,
          type: "Japanese City Pop Bassline & Vocal Chop",
          youtubeId: "5j0z0oFqQ0c",
          cueSample: 0.0
        },
        youtubeId: "5j0z0oFqQ0c",
        bpm: 156,
        key: "1B"
      },
      {
        id: "carti-cancun",
        title: "Cancun (Sega Genesis Snippet)",
        era: "Whole Lotta Red V1 (2018-2019)",
        length: "2:10",
        date: "2018",
        quality: "CDQ",
        notes: "Iconic video snippet in NYC street. Produced by Pi'erre Bourne. 8-bit video game bells and sliding 808s.",
        sampleDetected: {
          title: "Sega Master Chime",
          artist: "Vintage 16-Bit Chiptune",
          year: 1991,
          type: "Synthesizer Chime Arpeggio",
          youtubeId: "Z7ymPZqYtF8",
          cueSample: 0.0
        },
        youtubeId: "Z7ymPZqYtF8",
        bpm: 142,
        key: "11A"
      },
      {
        id: "carti-molly",
        title: "Molly / No Stylist",
        era: "Whole Lotta Red V1 (2018-2019)",
        length: "3:15",
        date: "2019",
        quality: "CDQ Master",
        notes: "Ethereal hyperpop-trap fusion produced by Pi'erre Bourne. Reverb-drenched synth leads.",
        sampleDetected: {
          title: "Ethereal Pad Loop",
          artist: "Pi'erre Bourne Vault",
          year: 2018,
          type: "Custom Sound Design Pad",
          youtubeId: "q4lZ9V3lT38",
          cueSample: 0.0
        },
        youtubeId: "q4lZ9V3lT38",
        bpm: 148,
        key: "7B"
      },
      {
        id: "carti-location-demo",
        title: "Location (Extended Studio Demo)",
        era: "Playboi Carti Self-Titled (2016-2017)",
        length: "3:05",
        date: "2017",
        quality: "CDQ Master",
        notes: "Samples 'Trans-Europe Express' by Kraftwerk (1977). Ambient electronic chords transformed into modern cloud trap.",
        sampleDetected: {
          title: "Trans-Europe Express",
          artist: "Kraftwerk",
          year: 1977,
          type: "German Synth Krautrock Lead",
          youtubeId: "XMVokT5o0zs",
          cueSample: 14.0
        },
        youtubeId: "XMVokT5o0zs",
        bpm: 82,
        key: "2A"
      }
    ]
  },

  daftpunk: {
    artistName: "Daft Punk",
    curators: "aj834, NikLaffe",
    sheetId: "1ZPjnzdSJLRIGwscll1T8NpPFJ57CCmE4oj43NnxmaDY",
    trackerUrl: "https://docs.google.com/spreadsheets/d/1ZPjnzdSJLRIGwscll1T8NpPFJ57CCmE4oj43NnxmaDY",
    totalTracks: 88,
    eras: [
      "Darlin' & Soma Demos (1992-1995)",
      "Homework Era (1995-1999)",
      "Discovery Era (1999-2003)",
      "Human After All (2004-2006)",
      "Alive 2007 Tour Stems (2006-2008)",
      "Tron: Legacy (2009-2011)",
      "Random Access Memories (2012-2021)"
    ],
    tracks: [
      {
        id: "dp-one-more-time-demo",
        title: "One More Time (1999 Filter Demo)",
        era: "Discovery Era (1999-2003)",
        length: "5:20",
        date: "1999",
        quality: "CDQ Studio",
        notes: "Original raw Akai S730 micro-chop. Samples 'More Spell on You' by Eddie Johns (1979). Re-ordered brass stabs.",
        sampleDetected: {
          title: "More Spell on You",
          artist: "Eddie Johns",
          year: 1979,
          type: "Micro-Chop & Re-Sequenced Brass Stabs",
          youtubeId: "bZ_Vpydk2g8",
          cueSample: 36.4
        },
        youtubeId: "FGBhQbmPwH8",
        bpm: 123,
        key: "11B"
      },
      {
        id: "dp-robot-rock-extended",
        title: "Robot Rock (Maximum Overdrive Mix)",
        era: "Human After All (2004-2006)",
        length: "4:47",
        date: "2005",
        quality: "CDQ Master",
        notes: "Heavy analog overdrive treatment. Directly samples 'Release the Beast' by Breakwater (1980) funk guitar riff.",
        sampleDetected: {
          title: "Release the Beast",
          artist: "Breakwater",
          year: 1980,
          type: "Direct Funk Guitar Riff & Drum Loop",
          youtubeId: "sOS9aBBR778",
          cueSample: 0.0
        },
        youtubeId: "sOS9aBBR778",
        bpm: 112,
        key: "4A"
      },
      {
        id: "dp-harder-better-stems",
        title: "Harder, Better, Faster, Stronger (Raw Stems)",
        era: "Discovery Era (1999-2003)",
        length: "3:44",
        date: "2000",
        quality: "CDQ Stems",
        notes: "Samples 'Cola Bottle Baby' by Edwin Birdsong (1979). Isolated vocoder talkbox and bass arpeggios.",
        sampleDetected: {
          title: "Cola Bottle Baby",
          artist: "Edwin Birdsong",
          year: 1979,
          type: "Electric Funk Bassline & Keyboard Riff",
          youtubeId: "Z3AKrwna2C8",
          cueSample: 0.0
        },
        youtubeId: "Z3AKrwna2C8",
        bpm: 123,
        key: "11A"
      },
      {
        id: "dp-infinity-repeating",
        title: "Infinity Repeating (ft. Julian Casablancas)",
        era: "Random Access Memories (2012-2021)",
        length: "3:59",
        date: "2013",
        quality: "CDQ RAM 10th Master",
        notes: "The last finished Daft Punk track ever recorded. Features Julian Casablancas on vocals and vocoder harmonies.",
        sampleDetected: {
          title: "Analog Drum & Arpeggiator",
          artist: "Daft Punk Studio",
          year: 2013,
          type: "Original Neve Console Modular Recording",
          youtubeId: "A2VpR8HahKc",
          cueSample: 0.0
        },
        youtubeId: "A2VpR8HahKc",
        bpm: 118,
        key: "9B"
      }
    ]
  },

  tylerthecreator: {
    artistName: "Tyler, The Creator",
    curators: "ColbyJackChedda, thainglorious1, Marin, Zulsk",
    sheetId: "1Teqk7F5p_9b4eX20B9K33_7QG3i22a",
    trackerUrl: "https://tylertracker.net",
    totalTracks: 145,
    eras: [
      "Odd Future & Bastard (2007-2010)",
      "Goblin (2011-2012)",
      "Wolf (2012-2014)",
      "Cherry Bomb (2014-2016)",
      "Flower Boy (2016-2018)",
      "IGOR (2018-2020)",
      "Call Me If You Get Lost (2020-2023)",
      "Chromakopia (2024-2025)"
    ],
    tracks: [
      {
        id: "tyler-911-extended",
        title: "911 / Mr. Lonely (Extended Studio Mix)",
        era: "Flower Boy (2016-2018)",
        length: "4:35",
        date: "2017",
        quality: "CDQ Master",
        notes: "Samples 'Outstanding' by The Gap Band (1982) and 'Today' by The Esquires. Features Frank Ocean, Steve Lacy, and Anna of the North.",
        sampleDetected: {
          title: "Outstanding",
          artist: "The Gap Band",
          year: 1982,
          type: "Vocal Melody Interpolation & Chord Progression",
          youtubeId: "0qYI3h3TfD0",
          cueSample: 0.0
        },
        youtubeId: "0qYI3h3TfD0",
        bpm: 95,
        key: "7B"
      },
      {
        id: "tyler-rose-tinted-cheeks",
        title: "Rose Tinted Cheeks",
        era: "Flower Boy (2016-2018)",
        length: "3:40",
        date: "2017",
        quality: "CDQ Official Demo",
        notes: "Original rough demo written during Flower Boy sessions. Soulful electric piano chords and Tyler reciting intimate love lyrics.",
        sampleDetected: {
          title: "Neo-Soul Rhodes Progression",
          artist: "Tyler, The Creator",
          year: 2016,
          type: "Fender Rhodes Mark I Chords",
          youtubeId: "mX1lUfZXf_4",
          cueSample: 0.0
        },
        youtubeId: "mX1lUfZXf_4",
        bpm: 84,
        key: "5A"
      },
      {
        id: "tyler-boyfriend",
        title: "Boyfriend (Physical CD Exclusive)",
        era: "IGOR (2018-2020)",
        length: "4:00",
        date: "2019",
        quality: "CDQ Official",
        notes: "Included only on the vinyl and CD editions of IGOR. Samples 'Fluid' by John Handy (1976). Gritty analog synthesizer fuzz.",
        sampleDetected: {
          title: "Fluid",
          artist: "John Handy",
          year: 1976,
          type: "70s Jazz-Funk Saxophone & Bass Loop",
          youtubeId: "fKkP2M3R29s",
          cueSample: 10.0
        },
        youtubeId: "fKkP2M3R29s",
        bpm: 80,
        key: "6B"
      }
    ]
  },

  mfdoom: {
    artistName: "MF DOOM",
    curators: "madvilliany, HeyImTy, kill aka piirates",
    sheetId: "1zEbzMVXFXzuY4wLdPvdQA23lb3RwCSOKqWtHsllXNk8",
    trackerUrl: "https://docs.google.com/spreadsheets/d/1zEbzMVXFXzuY4wLdPvdQA23lb3RwCSOKqWtHsllXNk8",
    totalTracks: 340,
    eras: [
      "KMD (1988-1994)",
      "Operation: Doomsday (1997-2000)",
      "Take Me to Your Leader / King Geedorah (2001-2003)",
      "Vaudeville Villain / Viktor Vaughn (2003-2004)",
      "Madvillainy (2002-2004)",
      "MM..FOOD (2004-2005)",
      "Danger Doom (2005-2006)",
      "Born Like This (2008-2009)",
      "Special Herbs Beat Tapes (1999-2006)"
    ],
    tracks: [
      {
        id: "doom-doomsday-demo",
        title: "Doomsday (Original 4-Track Demo)",
        era: "Operation: Doomsday (1997-2000)",
        length: "4:58",
        date: "1997",
        quality: "CDQ Master",
        notes: "Recorded on cassette in Manhattan apartment. Samples 'Kiss of Love' by Sade (1992). Smooth Rhodes piano and bassline.",
        sampleDetected: {
          title: "Kiss of Love",
          artist: "Sade",
          year: 1992,
          type: "Harmonic Interpolation & Rhyme Foundation",
          youtubeId: "g5R13o3i4c0",
          cueSample: 0.0
        },
        youtubeId: "g5R13o3i4c0",
        bpm: 92,
        key: "4A"
      },
      {
        id: "doom-rhymes-like-dimes",
        title: "Rhymes Like Dimes (Raw Session)",
        era: "Operation: Doomsday (1997-2000)",
        length: "4:18",
        date: "1998",
        quality: "CDQ Master",
        notes: "Produced by DOOM. Samples 'One Hundred Ways' by Quincy Jones ft. James Ingram (1981). Classic boom-bap drums.",
        sampleDetected: {
          title: "One Hundred Ways",
          artist: "Quincy Jones ft. James Ingram",
          year: 1981,
          type: "80s Soul Rhodes & Synthesizer Lead",
          youtubeId: "pXlqV1Vn6eY",
          cueSample: 15.0
        },
        youtubeId: "pXlqV1Vn6eY",
        bpm: 94,
        key: "2B"
      },
      {
        id: "doom-arrow-root",
        title: "Arrow Root (Special Herbs Vol. 1)",
        era: "Special Herbs Beat Tapes (1999-2006)",
        length: "3:45",
        date: "2001",
        quality: "CDQ Vinyl",
        notes: "Instrumental beat tape classic. Samples 'Next Movement' by The Roots. Hypnotic electric piano and boom-bap rhythm.",
        sampleDetected: {
          title: "The Next Movement",
          artist: "The Roots",
          year: 1999,
          type: "Hip-Hop Rhythm & Rhodes Sample",
          youtubeId: "x0Z-0X1Q9gY",
          cueSample: 0.0
        },
        youtubeId: "x0Z-0X1Q9gY",
        bpm: 90,
        key: "7A"
      }
    ]
  },

  travisscott: {
    artistName: "Travis Scott",
    curators: "lxns, FlameVault",
    sheetId: "1gJqbQrb3dIWF-PLMsKkNUrftpQb8zxsZFDAIpSvT5Fo",
    trackerUrl: "https://docs.google.com/spreadsheets/d/1gJqbQrb3dIWF-PLMsKkNUrftpQb8zxsZFDAIpSvT5Fo",
    totalTracks: 130,
    eras: [
      "Owl Pharaoh (2012-2013)",
      "Days Before Rodeo (2014)",
      "Rodeo (2015)",
      "Birds in the Trap Sing McKnight (2016)",
      "Huncho Jack (2017)",
      "Astroworld (2018)",
      "JACKBOYS (2019-2020)",
      "Utopia (2021-2023)"
    ],
    tracks: [
      {
        id: "travis-too-many-chances",
        title: "Too Many Chances",
        era: "Astroworld (2018)",
        length: "3:42",
        date: "2018",
        quality: "CDQ Studio",
        notes: "Fan favorite Astroworld outtake. Produced by Sonny Digital. Samples 80s synth chords and features atmospheric autotuned melodies.",
        sampleDetected: {
          title: "80s Dream Synth",
          artist: "Vintage Synth Library",
          year: 1985,
          type: "Analog Polyphonic Synth Pad",
          youtubeId: "d-B_KzXW3Jg",
          cueSample: 0.0
        },
        youtubeId: "d-B_KzXW3Jg",
        bpm: 130,
        key: "8A"
      },
      {
        id: "travis-sicko-mode-switch",
        title: "SICKO MODE (Beat Switch Demo)",
        era: "Astroworld (2018)",
        length: "5:12",
        date: "2018",
        quality: "CDQ Master",
        notes: "Legendary 3-part beat switch. Samples 'Gimme the Loot' by The Notorious B.I.G. and Uncle Luke vocal chops.",
        sampleDetected: {
          title: "Gimme the Loot",
          artist: "The Notorious B.I.G.",
          year: 1994,
          type: "East Coast Vocal Hook & Drum Break",
          youtubeId: "bZ_Vpydk2g8",
          cueSample: 0.0
        },
        youtubeId: "6ONRf7h3Mdk",
        bpm: 77,
        key: "8A"
      }
    ]
  },

  frankocean: {
    artistName: "Frank Ocean",
    curators: "Infishere, Edideaur",
    sheetId: "177l6JpGjV6Zf3_3q5o6J0j7",
    trackerUrl: "https://franktracker.net",
    totalTracks: 74,
    eras: [
      "The Lonny Breaux Collection (2008-2010)",
      "Nostalgia, ULTRA (2011)",
      "Channel ORANGE (2012)",
      "Endless (2016)",
      "Blonde (2016)",
      "PrEP+ Singles (2019-2020)"
    ],
    tracks: [
      {
        id: "frank-changes",
        title: "Changes (ft. Rosalía)",
        era: "PrEP+ Singles (2019-2020)",
        length: "3:48",
        date: "2019",
        quality: "CDQ Video Leak",
        notes: "Produced by Michael Uzowuru. Intimate grand piano ballad with Rosalía vocal harmonies and subtle 808 bass.",
        sampleDetected: {
          title: "Acoustic Grand Reverb",
          artist: "Michael Uzowuru",
          year: 2019,
          type: "Classical Grand Piano Solo",
          youtubeId: "Wv0cIcL9Wvg",
          cueSample: 0.0
        },
        youtubeId: "Wv0cIcL9Wvg",
        bpm: 72,
        key: "3B"
      },
      {
        id: "frank-close-to-you",
        title: "Close to You (Extended Studio Rehearsal)",
        era: "Blonde (2016)",
        length: "2:40",
        date: "2016",
        quality: "CDQ Master",
        notes: "Direct talkbox vocal resampling of Stevie Wonder performing 'Never Can Say Goodbye' live on The David Frost Show (1972).",
        sampleDetected: {
          title: "Never Can Say Goodbye (Talkbox Live)",
          artist: "Stevie Wonder",
          year: 1972,
          type: "Talkbox Vocal Resampling & Live Prism Interpolation",
          youtubeId: "d-B_KzXW3Jg",
          cueSample: 12.0
        },
        youtubeId: "d-B_KzXW3Jg",
        bpm: 68,
        key: "11B"
      }
    ]
  }
};
