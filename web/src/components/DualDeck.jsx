import React, { useState } from 'react';
import WaveformVisualizer from './WaveformVisualizer';

export default function DualDeck({
  activePair,
  crossfadeVal,
  isPlaying,
  viewMode,
  audioEngine,
  eqSettings,
  onEqChange,
  onOpenPillowModal
}) {
  const { trackA, trackB } = activePair;
  const isPillowA = trackA.sourceType === 'pillow' || !!trackA.audioUrl;
  const isPillowB = trackB.sourceType === 'pillow' || !!trackB.audioUrl;

  const [deckViewModeA, setDeckViewModeA] = useState(isPillowA ? 'waveform' : 'video');
  const [deckViewModeB, setDeckViewModeB] = useState(isPillowB ? 'waveform' : 'video');

  const deckAActive = crossfadeVal < 0.85;
  const deckBActive = crossfadeVal > 0.15;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
      
      {/* DECK A: Modern Release or Pillowcase Audio */}
      <div className={`relative rounded-2xl p-4 sm:p-5 border transition-all duration-300 ${
        crossfadeVal < 0.5 
          ? 'bg-[#12131a] border-amber-500/40 shadow-xl shadow-amber-500/10' 
          : 'bg-[#12131a]/60 border-white/[0.06] opacity-75'
      }`}>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${crossfadeVal < 0.5 ? 'bg-amber-400 animate-pulse' : 'bg-zinc-600'}`} />
            <span className="text-[11px] font-mono font-bold tracking-wider text-amber-400 uppercase">
              DECK A • {isPillowA ? '☁️ PILLOWCASE STREAM' : '▶ YOUTUBE MASTER'}
            </span>
            {isPillowA && (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                PILLOW.SU
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px]">
            {onOpenPillowModal && (
              <button
                onClick={onOpenPillowModal}
                className="px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-colors"
                title="Connect Pillowcase Audio"
              >
                + Pillow
              </button>
            )}

            {!isPillowA && (
              <button
                onClick={() => setDeckViewModeA(deckViewModeA === 'video' ? 'waveform' : 'video')}
                className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 transition-colors"
              >
                {deckViewModeA === 'video' ? 'Show Wave' : 'Show Video'}
              </button>
            )}
            <span className="px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/25 font-bold">
              {trackA.bpm} BPM
            </span>
            <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-white/10">
              Key: {trackA.key}
            </span>
          </div>
        </div>

        {/* Video or Waveform Display Area */}
        <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden mb-3 border border-white/10 bg-black shadow-inner">
          {/* YouTube Player Container for Deck A (hidden if using Pillow) */}
          <div className={`w-full h-full ${!isPillowA && deckViewModeA === 'video' ? 'block' : 'opacity-0 pointer-events-none absolute inset-0'}`}>
            <div id="yt-deck-a" className="w-full h-full"></div>
          </div>

          {/* Waveform / Pillow Audio Player Display */}
          {(isPillowA || deckViewModeA === 'waveform') && (
            <div className="w-full h-full flex flex-col justify-center p-4 bg-zinc-950">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={trackA.albumArt}
                  alt={trackA.title}
                  className="w-12 h-12 rounded-lg object-cover border border-white/10"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-white truncate font-['Outfit']">{trackA.title}</h4>
                  <p className="text-xs text-amber-400 truncate">{trackA.artist}</p>
                  {isPillowA && (
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Streaming Pillowcase HTML5 Audio
                    </span>
                  )}
                </div>
              </div>
              <WaveformVisualizer
                track={trackA}
                deck="A"
                isPlaying={isPlaying}
                cueTime={trackA.cueTime}
                crossfadeVal={crossfadeVal}
                active={deckAActive}
                audioEngine={audioEngine}
              />
            </div>
          )}

          {/* Live Playing Tag */}
          {isPlaying && deckAActive && (
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-500/90 text-black text-[9px] font-mono font-extrabold shadow flex items-center gap-1 z-10 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
              <span>{isPillowA ? 'LIVE PILLOW AUDIO' : 'LIVE YOUTUBE'}</span>
            </div>
          )}
        </div>

        {/* Title + Artist Metadata */}
        <div className="mb-2">
          <h3 className="font-bold text-sm sm:text-base text-white truncate font-['Outfit']">
            {trackA.title}
          </h3>
          <p className="text-xs text-amber-400/90 font-medium truncate">
            {trackA.artist} • <span className="text-zinc-500">{trackA.album} ({trackA.year})</span>
          </p>
        </div>

        {/* Sample Snippet Badge */}
        <div className="p-2 rounded-xl bg-zinc-950/70 border border-white/[0.06] text-[11px] text-zinc-400 flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
          <span className="truncate">{trackA.sampleSnippet || 'Direct Sample Flip'}</span>
        </div>

        {/* DJ Terminal EQ Knobs */}
        {viewMode === 'terminal' && (
          <div className="mt-3 pt-3 border-t border-white/[0.08] grid grid-cols-3 gap-2 text-center animate-fade-in">
            {['low', 'mid', 'high'].map(band => (
              <div key={band} className="bg-zinc-950/90 p-2 rounded-xl border border-white/[0.06]">
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block">{band} EQ</span>
                <input
                  type="range"
                  min="-24"
                  max="6"
                  step="1"
                  value={eqSettings.A[band]}
                  onChange={(e) => onEqChange('A', band, parseFloat(e.target.value))}
                  className="w-full accent-amber-400 mt-1 cursor-pointer"
                />
                <span className="text-[10px] font-mono text-amber-400">
                  {eqSettings.A[band] > 0 ? `+${eqSettings.A[band]}` : eqSettings.A[band]} dB
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DECK B: Original Vintage Sample or Pillowcase Audio */}
      <div className={`relative rounded-2xl p-4 sm:p-5 border transition-all duration-300 ${
        crossfadeVal > 0.5 
          ? 'bg-[#12131a] border-cyan-500/40 shadow-xl shadow-cyan-500/10' 
          : 'bg-[#12131a]/60 border-white/[0.06] opacity-75'
      }`}>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${crossfadeVal > 0.5 ? 'bg-cyan-400 animate-pulse' : 'bg-zinc-600'}`} />
            <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-400 uppercase">
              DECK B • {isPillowB ? '☁️ PILLOWCASE STREAM' : '▶ YOUTUBE SAMPLE'}
            </span>
            {isPillowB && (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                PILLOW.SU
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px]">
            {onOpenPillowModal && (
              <button
                onClick={onOpenPillowModal}
                className="px-2 py-0.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-colors"
                title="Connect Pillowcase Audio"
              >
                + Pillow
              </button>
            )}

            {!isPillowB && (
              <button
                onClick={() => setDeckViewModeB(deckViewModeB === 'video' ? 'waveform' : 'video')}
                className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 transition-colors"
              >
                {deckViewModeB === 'video' ? 'Show Wave' : 'Show Video'}
              </button>
            )}
            <span className="px-2 py-0.5 rounded-md bg-cyan-400/10 text-cyan-300 border border-cyan-400/25 font-bold">
              {trackB.bpm} BPM
            </span>
            <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-white/10">
              Key: {trackB.key}
            </span>
          </div>
        </div>

        {/* Video or Waveform Display Area */}
        <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden mb-3 border border-white/10 bg-black shadow-inner">
          {/* YouTube Player Container for Deck B */}
          <div className={`w-full h-full ${!isPillowB && deckViewModeB === 'video' ? 'block' : 'opacity-0 pointer-events-none absolute inset-0'}`}>
            <div id="yt-deck-b" className="w-full h-full"></div>
          </div>

          {/* Waveform / Pillow Audio Player Display */}
          {(isPillowB || deckViewModeB === 'waveform') && (
            <div className="w-full h-full flex flex-col justify-center p-4 bg-zinc-950">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={trackB.albumArt}
                  alt={trackB.title}
                  className="w-12 h-12 rounded-lg object-cover border border-white/10"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-white truncate font-['Outfit']">{trackB.title}</h4>
                  <p className="text-xs text-cyan-400 truncate">{trackB.artist}</p>
                  {isPillowB && (
                    <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      Streaming Pillowcase HTML5 Audio
                    </span>
                  )}
                </div>
              </div>
              <WaveformVisualizer
                track={trackB}
                deck="B"
                isPlaying={isPlaying}
                cueTime={trackB.cueTime}
                crossfadeVal={crossfadeVal}
                active={deckBActive}
                audioEngine={audioEngine}
              />
            </div>
          )}

          {/* Live Playing Tag */}
          {isPlaying && deckBActive && (
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-cyan-500/90 text-black text-[9px] font-mono font-extrabold shadow flex items-center gap-1 z-10 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
              <span>{isPillowB ? 'LIVE PILLOW AUDIO' : 'LIVE YOUTUBE'}</span>
            </div>
          )}
        </div>

        {/* Title + Artist Metadata */}
        <div className="mb-2">
          <h3 className="font-bold text-sm sm:text-base text-white truncate font-['Outfit']">
            {trackB.title}
          </h3>
          <p className="text-xs text-cyan-400/90 font-medium truncate">
            {trackB.artist} • <span className="text-zinc-500">{trackB.album} ({trackB.year})</span>
          </p>
        </div>

        {/* Sample Type Badge */}
        <div className="p-2 rounded-xl bg-zinc-950/70 border border-white/[0.06] text-[11px] text-zinc-400 flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-cyan-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          <span className="truncate">{trackB.sampleType || 'Vintage Sample Source'}</span>
        </div>

        {/* DJ Terminal EQ Knobs */}
        {viewMode === 'terminal' && (
          <div className="mt-3 pt-3 border-t border-white/[0.08] grid grid-cols-3 gap-2 text-center animate-fade-in">
            {['low', 'mid', 'high'].map(band => (
              <div key={band} className="bg-zinc-950/90 p-2 rounded-xl border border-white/[0.06]">
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block">{band} EQ</span>
                <input
                  type="range"
                  min="-24"
                  max="6"
                  step="1"
                  value={eqSettings.B[band]}
                  onChange={(e) => onEqChange('B', band, parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 mt-1 cursor-pointer"
                />
                <span className="text-[10px] font-mono text-cyan-400">
                  {eqSettings.B[band] > 0 ? `+${eqSettings.B[band]}` : eqSettings.B[band]} dB
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
