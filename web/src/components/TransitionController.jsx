import React from 'react';

export default function TransitionController({
  isPlaying,
  onTogglePlay,
  crossfadeVal,
  onCrossfadeChange,
  onAutoTransition,
  isTransitioning,
  transitionPhase,
  transitionProgress,
  currentBeat,
  activePair,
  nudgeOffset,
  onNudge,
  onVote
}) {
  const percentA = Math.round((1 - crossfadeVal) * 100);
  const percentB = Math.round(crossfadeVal * 100);

  return (
    <div className="w-full bg-[#12131a] border border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
      
      {/* Background ambient transition glow */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, #f59e0b ${percentA}%, #06b6d4 ${percentB}%)`
        }}
      />

      <div className="relative z-10 flex flex-col gap-3.5">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Master Play/Pause + Beat Grid Clock */}
          <div className="flex items-center gap-3">
            <button
              onClick={onTogglePlay}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-lg transition-all transform active:scale-95 ${
                isPlaying
                  ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20 ring-2 ring-amber-400/50'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10'
              }`}
            >
              {isPlaying ? (
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1"/>
                  <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              )}
            </button>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-zinc-200">DSP Master Clock</span>
                {isPlaying && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                )}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                {[0, 1, 2, 3].map(beat => (
                  <span
                    key={beat}
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded transition-all ${
                      isPlaying && currentBeat === beat
                        ? 'bg-amber-500 text-black font-extrabold scale-105'
                        : 'bg-zinc-950 text-zinc-500 border border-white/5'
                    }`}
                  >
                    B{beat + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Big Auto-Transition Button */}
          <button
            onClick={onAutoTransition}
            disabled={isTransitioning}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-95 ${
              isTransitioning
                ? 'bg-gradient-to-r from-amber-500 via-pink-500 to-cyan-400 text-white animate-pulse'
                : 'bg-gradient-to-r from-amber-500 hover:from-amber-400 to-orange-500 hover:to-orange-400 text-black shadow-amber-500/20'
            }`}
          >
            <svg className={`w-4 h-4 ${isTransitioning ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m16 3 4 4-4 4"/>
              <path d="M20 7H4"/>
              <path d="m8 21-4-4 4-4"/>
              <path d="M4 17h16"/>
            </svg>
            <span>
              {isTransitioning 
                ? (transitionPhase || 'Transitioning...') 
                : crossfadeVal < 0.5 
                  ? 'Auto-Drop to Sample' 
                  : 'Auto-Return to Modern'}
            </span>
          </button>

          {/* Sync Nudge Tool (Micro-adjust cue point) */}
          <div className="flex items-center justify-between sm:justify-end gap-1.5 bg-zinc-950/80 border border-white/[0.06] p-1 rounded-xl">
            <span className="text-[10px] font-mono text-zinc-400 pl-1">Sync:</span>
            <button
              onClick={() => onNudge(-0.1)}
              className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-mono rounded border border-white/5 active:bg-amber-500 active:text-black transition-colors"
              title="Nudge cue back 0.1s"
            >
              -0.1s
            </button>
            <span className="text-[10px] font-mono text-amber-400 px-1 min-w-[2.5rem] text-center">
              {nudgeOffset > 0 ? `+${nudgeOffset.toFixed(1)}s` : `${nudgeOffset.toFixed(1)}s`}
            </span>
            <button
              onClick={() => onNudge(0.1)}
              className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-mono rounded border border-white/5 active:bg-amber-500 active:text-black transition-colors"
              title="Nudge cue forward 0.1s"
            >
              +0.1s
            </button>
            <button
              onClick={onVote}
              className="px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold rounded border border-emerald-500/20 flex items-center gap-1"
            >
              <span>✓</span>
              <span>{activePair.community.verifiedBy}</span>
            </button>
          </div>

        </div>

        {/* Transition Progress Bar */}
        {isTransitioning && (
          <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-white/5">
            <div 
              className="bg-gradient-to-r from-amber-500 via-pink-500 to-cyan-400 h-full transition-all duration-75"
              style={{ width: `${Math.round(transitionProgress * 100)}%` }}
            />
          </div>
        )}

        {/* Tactile DJ Crossfader Slider */}
        <div className="pt-1">
          <div className="flex justify-between items-center text-xs font-mono mb-1.5">
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <span>Deck A</span>
              <span className="text-zinc-500 text-[10px]">({percentA}%)</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-sans tracking-wide">
              Tactile DJ Crossfader
            </span>
            <span className="text-cyan-400 font-bold flex items-center gap-1">
              <span className="text-zinc-500 text-[10px]">({percentB}%)</span>
              <span>Deck B (Sample)</span>
            </span>
          </div>

          <div className="relative flex items-center">
            {/* Center Detent Marker */}
            <div className="absolute left-1/2 -top-1 bottom-1 w-0.5 bg-zinc-700/80 pointer-events-none z-10" />
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={crossfadeVal}
              onChange={(e) => onCrossfadeChange(parseFloat(e.target.value))}
              className="w-full h-3 bg-zinc-950 rounded-lg appearance-none cursor-ew-resize border border-white/5 accent-amber-400 focus:outline-none"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
