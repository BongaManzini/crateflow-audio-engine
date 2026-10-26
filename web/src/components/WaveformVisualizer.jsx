import React from 'react';

export default function WaveformVisualizer({
  track,
  deck,
  isPlaying,
  cueTime,
  crossfadeVal,
  active,
  audioEngine
}) {
  const barsCount = 36;
  const isDeckA = deck === 'A';
  const accentColor = isDeckA ? '#f59e0b' : '#06b6d4';

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between select-none">
      {/* Top Details */}
      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
          <span>DSP Waveform Radar</span>
        </span>
        <span className="text-zinc-500">Cue @ {cueTime}s</span>
      </div>

      {/* Waveform Bars */}
      <div className="flex items-center justify-between gap-1 h-20 px-2">
        {Array.from({ length: barsCount }).map((_, i) => {
          // Pseudorandom pseudo-music waveform profile
          const seed = Math.sin((i * 12.9898) + (isDeckA ? 1.0 : 4.5)) * 43758.5453;
          const normalized = Math.abs(seed - Math.floor(seed));
          const baseHeight = 15 + normalized * 70;
          
          const isCuePoint = Math.abs(i - Math.floor((cueTime / 180) * barsCount)) < 2;

          return (
            <div
              key={i}
              className="flex-1 rounded-full transition-all duration-150 relative"
              style={{
                height: `${baseHeight}%`,
                backgroundColor: isCuePoint
                  ? '#ffffff'
                  : isPlaying && active
                  ? accentColor
                  : '#27272a',
                opacity: active ? (isCuePoint ? 1 : 0.85) : 0.35,
                boxShadow: isCuePoint ? `0 0 8px ${accentColor}` : 'none'
              }}
            >
              {isCuePoint && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Cue Guide */}
      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-white/5 pt-2">
        <span>0:00</span>
        <span className="text-zinc-400 font-semibold">
          {isPlaying && active ? 'Streaming Real Audio' : 'Ready to Spin'}
        </span>
        <span>{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
}
