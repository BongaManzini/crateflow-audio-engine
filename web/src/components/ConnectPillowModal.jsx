import React, { useState } from 'react';
import { PILLOW_PRESETS, parsePillowUrl, createPillowTrack } from '../api/pillowApi';

export default function ConnectPillowModal({
  isOpen,
  onClose,
  onLoadPillowTrack,
  onLoadHybridPair,
  activePair
}) {
  const [pillowUrl, setPillowUrl] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [targetDeck, setTargetDeck] = useState('hybrid'); // 'deckA' | 'deckB' | 'hybrid'
  const [bpm, setBpm] = useState('88');
  const [cueTime, setCueTime] = useState('0.0');

  // YouTube Sample for Hybrid Combination
  const [sampleTitle, setSampleTitle] = useState('Chaka Khan - Through the Fire');
  const [sampleYoutubeId, setSampleYoutubeId] = useState('bZ_Vpydk2g8');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pillowUrl.trim()) return;

    const pillowTrack = createPillowTrack({
      title: songTitle || "Unreleased Pillow Track",
      artist: artistName || "Community Leak",
      pillowUrl: pillowUrl.trim(),
      bpm: parseInt(bpm) || 88,
      key: "8A",
      cueTime: parseFloat(cueTime) || 0.0
    });

    if (targetDeck === 'hybrid') {
      // Create a Hybrid Pair: Deck A is Pillow, Deck B is YouTube!
      const hybridPair = {
        id: `hybrid-${Date.now()}`,
        slug: `hybrid-${(songTitle || 'pillow').toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        trackA: {
          ...pillowTrack,
          sourceType: 'pillow',
          accentColor: '#f59e0b'
        },
        trackB: {
          title: sampleTitle.includes('-') ? sampleTitle.split('-')[1].trim() : sampleTitle,
          artist: sampleTitle.includes('-') ? sampleTitle.split('-')[0].trim() : "Vintage Source",
          year: 1982,
          album: "Original Sample Vault",
          albumArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80",
          genre: "Vintage Master",
          bpm: parseInt(bpm) || 88,
          key: "8A",
          cueTime: 0.0,
          duration: 220,
          sourceType: 'youtube',
          youtubeId: sampleYoutubeId.trim() || "bZ_Vpydk2g8",
          sampleType: "Direct Sample Source",
          accentColor: "#06b6d4"
        },
        ancestry: [
          { generation: 0, title: pillowTrack.title, artist: pillowTrack.artist, year: 2024, role: 'Pillowcase Audio Leak (Deck A)' },
          { generation: 1, title: sampleTitle, artist: 'Original Master', year: 1982, role: 'YouTube Vintage Sample (Deck B)' }
        ],
        community: {
          verifiedBy: 64,
          isVerified: true,
          nudgeOffset: 0.0,
          submissionsCount: 4,
          curatorNote: `Hybrid Deck Pair: Deck A streaming from Pillowcase.su, Deck B streaming from YouTube.`
        }
      };

      onLoadHybridPair(hybridPair);
    } else if (targetDeck === 'deckA') {
      onLoadPillowTrack('A', pillowTrack);
    } else {
      onLoadPillowTrack('B', pillowTrack);
    }

    onClose();
  };

  const handleSelectPreset = (preset) => {
    const hybridPair = {
      id: preset.id,
      slug: preset.id,
      trackA: {
        title: preset.title,
        artist: preset.artist,
        year: preset.year,
        album: preset.era,
        albumArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80",
        genre: "Pillowcase Audio Leak",
        bpm: preset.bpm,
        key: preset.key,
        cueTime: 0.0,
        duration: 220,
        sourceType: 'pillow',
        pillowUrl: preset.pillowUrl,
        audioUrl: preset.audioStreamUrl,
        sampleSnippet: preset.notes,
        accentColor: '#f59e0b'
      },
      trackB: {
        title: preset.sampleTitle,
        artist: preset.sampleArtist,
        year: 1980,
        album: "Original Vintage Vault",
        albumArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80",
        genre: "Vintage Sample Master",
        bpm: preset.bpm,
        key: preset.key,
        cueTime: preset.sampleCue || 0.0,
        duration: 210,
        sourceType: 'youtube',
        youtubeId: preset.sampleYoutubeId,
        sampleType: "Harmonic Sample Flip",
        accentColor: '#06b6d4'
      },
      ancestry: [
        { generation: 0, title: preset.title, artist: preset.artist, year: preset.year, role: 'Deck A: Pillowcase Audio' },
        { generation: 1, title: preset.sampleTitle, artist: preset.sampleArtist, year: 1980, role: 'Deck B: YouTube Sample' }
      ],
      community: {
        verifiedBy: 92,
        isVerified: true,
        nudgeOffset: 0.0,
        submissionsCount: 7,
        curatorNote: preset.notes
      }
    };

    onLoadHybridPair(hybridPair);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="w-full max-w-xl max-h-[92vh] bg-[#12131a] border border-white/[0.12] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between gap-3 bg-zinc-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              ☁️
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                Connect Pillow Audio (pillowcase.su)
              </h3>
              <p className="text-xs text-zinc-400">
                Mix unreleased Pillowcase tracks directly with YouTube sample records.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-white/5"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs scrollbar-thin">
          
          {/* Quick-Select Community Presets */}
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
              Quick Load Community Pillowcase Tracks (1-Click Hybrid Mix)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PILLOW_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p)}
                  className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-white/[0.06] hover:border-amber-400/40 text-left transition-all space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs group-hover:text-amber-400 truncate">
                      {p.title}
                    </span>
                    <span className="text-[9px] font-mono text-amber-400/80 bg-amber-500/10 px-1.5 py-0.5 rounded">
                      Pillow + YT
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate">{p.artist}</p>
                  <p className="text-[10px] text-zinc-500 truncate">
                    Sample: {p.sampleTitle} by {p.sampleArtist}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-3">
            <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-2">
              Or Connect Custom Pillow Link / Audio Stream
            </span>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Pillow URL */}
              <div className="space-y-1">
                <label className="text-zinc-400 font-medium">Pillowcase URL or Direct Stream Link:</label>
                <input
                  type="text"
                  placeholder="https://pillowcase.su/f/... or direct .mp3 / .wav"
                  value={pillowUrl}
                  onChange={(e) => setPillowUrl(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono text-xs"
                />
              </div>

              {/* Title & Artist */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-zinc-400 font-medium">Track Title:</label>
                  <input
                    type="text"
                    placeholder="e.g. Can U Be"
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-400 font-medium">Artist Name:</label>
                  <input
                    type="text"
                    placeholder="e.g. Kanye West"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Target Deck Selection */}
              <div className="space-y-1.5">
                <label className="text-zinc-400 font-medium">How to Load into Decks:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setTargetDeck('hybrid')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      targetDeck === 'hybrid'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400 font-bold'
                        : 'bg-zinc-950 text-zinc-400 border-white/5'
                    }`}
                  >
                    <span className="block text-xs">Hybrid Pair</span>
                    <span className="text-[10px] text-zinc-500">Pillow A + YouTube B</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetDeck('deckA')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      targetDeck === 'deckA'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400 font-bold'
                        : 'bg-zinc-950 text-zinc-400 border-white/5'
                    }`}
                  >
                    <span className="block text-xs">Deck A Only</span>
                    <span className="text-[10px] text-zinc-500">Modern Release</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetDeck('deckB')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      targetDeck === 'deckB'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold'
                        : 'bg-zinc-950 text-zinc-400 border-white/5'
                    }`}
                  >
                    <span className="block text-xs">Deck B Only</span>
                    <span className="text-[10px] text-zinc-500">Sample Flip</span>
                  </button>
                </div>
              </div>

              {/* Hybrid YouTube Pair Customization */}
              {targetDeck === 'hybrid' && (
                <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-[11px] font-bold text-cyan-300 uppercase font-mono">
                      Pair with YouTube Vintage Sample (Deck B)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Sample Name & Artist"
                      value={sampleTitle}
                      onChange={(e) => setSampleTitle(e.target.value)}
                      className="w-full px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-lg text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                    />
                    <input
                      type="text"
                      placeholder="YouTube Video ID (e.g. bZ_Vpydk2g8)"
                      value={sampleYoutubeId}
                      onChange={(e) => setSampleYoutubeId(e.target.value)}
                      className="w-full px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-lg text-white font-mono text-xs placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg flex items-center gap-1.5"
                >
                  <span>Connect & Load to Decks</span>
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
