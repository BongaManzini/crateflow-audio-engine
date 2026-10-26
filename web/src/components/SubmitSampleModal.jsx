import React, { useState } from 'react';

export default function SubmitSampleModal({ isOpen, onClose, onAddSample }) {
  const [songA, setSongA] = useState('');
  const [artistA, setArtistA] = useState('');
  const [songB, setSongB] = useState('');
  const [artistB, setArtistB] = useState('');
  const [sampleType, setSampleType] = useState('Soul Vocal Chop');
  const [cueA, setCueA] = useState('0.0');
  const [cueB, setCueB] = useState('0.0');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!songA || !artistA || !songB || !artistB) return;

    const newPair = {
      id: `crowd-${Date.now()}`,
      slug: `${songA.toLowerCase().replace(/[^a-z0-9]/g, '-')}-sample`,
      trackA: {
        title: songA,
        artist: artistA,
        year: 2024,
        album: 'Community Submission',
        albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80',
        genre: 'Hip-Hop / Electronic',
        bpm: 88,
        key: '8A',
        cueTime: parseFloat(cueA) || 0.0,
        duration: 220,
        youtubeId: "uvb-1wjAtk4",
        sampleSnippet: notes || sampleType,
        accentColor: '#f59e0b'
      },
      trackB: {
        title: songB,
        artist: artistB,
        year: 1978,
        album: 'Original Master Archives',
        albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80',
        genre: 'Vintage Master',
        bpm: 88,
        key: '8A',
        cueTime: parseFloat(cueB) || 0.0,
        duration: 200,
        youtubeId: "bZ_Vpydk2g8",
        sampleType: sampleType,
        accentColor: '#06b6d4'
      },
      ancestry: [
        { generation: 0, title: songA, artist: artistA, year: 2024, role: 'Parent Track' },
        { generation: 1, title: songB, artist: artistB, year: 1978, role: sampleType }
      ],
      community: {
        verifiedBy: 1,
        isVerified: false,
        nudgeOffset: 0.0,
        submissionsCount: 1,
        curatorNote: notes || "Submitted by community listener."
      }
    };

    onAddSample(newPair);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#12131a] border border-white/[0.1] rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Submit Sample Pair or Tracker Flip
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {/* Track A */}
          <div className="p-3 bg-zinc-950/80 rounded-xl border border-amber-500/20 space-y-2">
            <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              Deck A: Modern Track or Unreleased Cut
            </span>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Song Title"
                value={songA}
                onChange={(e) => setSongA(e.target.value)}
                required
                className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
              <input
                type="text"
                placeholder="Artist Name"
                value={artistA}
                onChange={(e) => setArtistA(e.target.value)}
                required
                className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-zinc-400 font-mono">Cue Timestamp (s):</span>
              <input
                type="number"
                step="0.1"
                value={cueA}
                onChange={(e) => setCueA(e.target.value)}
                className="w-24 px-2 py-1 bg-zinc-900 border border-white/10 rounded text-white font-mono text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Track B */}
          <div className="p-3 bg-zinc-950/80 rounded-xl border border-cyan-500/20 space-y-2">
            <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
              Deck B: Original Sample Source
            </span>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Original Song Title"
                value={songB}
                onChange={(e) => setSongB(e.target.value)}
                required
                className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
              />
              <input
                type="text"
                placeholder="Original Artist"
                value={artistB}
                onChange={(e) => setArtistB(e.target.value)}
                required
                className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-zinc-400 font-mono">Sample Cue Timestamp (s):</span>
              <input
                type="number"
                step="0.1"
                value={cueB}
                onChange={(e) => setCueB(e.target.value)}
                className="w-24 px-2 py-1 bg-zinc-900 border border-white/10 rounded text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Sample Type & Notes */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-zinc-400 font-medium">Flip Classification:</label>
            <select
              value={sampleType}
              onChange={(e) => setSampleType(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-400"
            >
              <option value="Direct Master Flip & Chop">Direct Master Flip & Chop</option>
              <option value="Speed-up Soul Pitch Shift">Speed-up Soul Pitch Shift</option>
              <option value="Micro-Chop & Re-Sequence">Micro-Chop & Re-Sequence</option>
              <option value="Harmonic Interpolation">Harmonic Interpolation</option>
              <option value="Drum Break Loop">Drum Break Loop</option>
              <option value="Vocal Resample">Vocal Resample</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] text-zinc-400 font-medium">Curator Notes / Lore:</label>
            <textarea
              rows="2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Sourced from 1974 Stax record, chopped on MPC3000..."
              className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Submit CTA */}
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
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg"
            >
              Verify & Add to Decks
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
