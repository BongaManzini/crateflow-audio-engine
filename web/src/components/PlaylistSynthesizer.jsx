import React, { useState } from 'react';
import { synthesizeBlendedPlaylist } from '../data/playlistGraph';

export default function PlaylistSynthesizer({ activePair }) {
  const [consensusRatio, setConsensusRatio] = useState(0.5); // 0 = Culture Bridge, 1 = Consensus
  const [harmonicFlow, setHarmonicFlow] = useState(true);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [ytCopiedNotification, setYtCopiedNotification] = useState(false);

  const playlistData = synthesizeBlendedPlaylist(activePair.id, consensusRatio, harmonicFlow);

  // Extract real YouTube Video IDs from the synthesized tracks
  const youtubeVideoIds = playlistData.tracks
    .map(t => t.youtubeId)
    .filter(Boolean);

  // Instant YouTube Continuous Playlist URL
  const youtubePlaylistUrl = youtubeVideoIds.length > 0
    ? `https://www.youtube.com/watch_videos?video_ids=${youtubeVideoIds.slice(0, 50).join(',')}`
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(activePair.trackA.artist + ' ' + activePair.trackA.title + ' mix')}`;

  // Port to YouTube: Opens instant continuous playlist on YouTube
  const handlePortToYouTube = () => {
    window.open(youtubePlaylistUrl, '_blank', 'noopener,noreferrer');
  };

  // Copy direct YouTube continuous link
  const handleCopyYouTubeLink = () => {
    navigator.clipboard.writeText(youtubePlaylistUrl);
    setYtCopiedNotification(true);
    setTimeout(() => setYtCopiedNotification(false), 2500);
  };

  const handleExport = (format) => {
    if (format === 'm3u') {
      const m3uContent = "#EXTM3U\n" + playlistData.tracks.map(t => `#EXTINF:-1,${t.artist} - ${t.title}\nhttps://youtube.com/watch?v=${t.youtubeId || ''}`).join("\n");
      const blob = new Blob([m3uContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activePair.trackA.title.replace(/[^a-zA-Z0-9]/g, '_')}_Blended_Playlist.m3u`;
      a.click();
    } else {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  return (
    <div className="w-full bg-[#12131a] border border-white/[0.08] rounded-2xl p-4 sm:p-6 space-y-5 shadow-xl">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
              Multi-Playlist Synthesizer
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Graph Engine
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Mining {playlistData.playlistsCount} public playlists containing <span className="text-zinc-200 font-semibold">{activePair.trackA.title}</span>.
          </p>
        </div>

        {/* Source Playlists Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          {playlistData.playlists.slice(0, 3).map((pl, idx) => (
            <span 
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded-lg bg-zinc-900 border border-white/5 text-zinc-300 flex items-center gap-1"
            >
              <span className="text-emerald-400">●</span>
              <span className="truncate max-w-[120px]">{pl.name}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Synthesis Controls Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-zinc-950/80 p-3.5 sm:p-4 rounded-xl border border-white/[0.06]">
        
        {/* Consensus vs Culture Bridge Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className={`font-semibold text-[11px] ${consensusRatio < 0.4 ? 'text-amber-400' : 'text-zinc-400'}`}>
              Culture Bridge (Diverse)
            </span>
            <span className={`font-semibold text-[11px] ${consensusRatio > 0.6 ? 'text-emerald-400' : 'text-zinc-400'}`}>
              Consensus (Overlap)
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={consensusRatio}
            onChange={(e) => setConsensusRatio(parseFloat(e.target.value))}
            className="w-full h-2 bg-zinc-900 rounded-lg appearance-none cursor-pointer border border-white/5 accent-amber-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-zinc-500">
            <span>Soul & jazz roots</span>
            <span>{Math.round(consensusRatio * 100)}% Consensus</span>
            <span>Popular overlaps</span>
          </div>
        </div>

        {/* Harmonic Camelot Flow Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-3 border-t md:border-t-0 md:border-l border-white/[0.06] pt-2.5 md:pt-0 md:pl-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-zinc-200">Harmonic Camelot Flow</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 bg-purple-500/10 text-purple-300 rounded border border-purple-500/20">
                Key Match
              </span>
            </div>
            <p className="text-[10px] text-zinc-400">
              Orders tracks by musical key and progressive BPM
            </p>
          </div>
          <button
            onClick={() => setHarmonicFlow(!harmonicFlow)}
            className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 border ${
              harmonicFlow 
                ? 'bg-purple-600 border-purple-400' 
                : 'bg-zinc-800 border-white/10'
            }`}
          >
            <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${harmonicFlow ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

      </div>

      {/* NEW: Port to YouTube Feature Bar */}
      <div className="p-3.5 bg-gradient-to-r from-red-500/10 via-zinc-950 to-amber-500/10 border border-red-500/20 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 font-bold shrink-0">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white font-['Outfit'] flex items-center gap-1.5">
              <span>Port Playlist to YouTube</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-300">
                Instant Continuous Mix
              </span>
            </h4>
            <p className="text-[11px] text-zinc-400">
              Generates an unlisted continuous YouTube queue with all {youtubeVideoIds.length} tracks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyYouTubeLink}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 text-xs font-mono transition-colors"
          >
            {ytCopiedNotification ? '✓ Link Copied!' : 'Copy YouTube URL'}
          </button>
          <button
            onClick={handlePortToYouTube}
            className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <span>Open in YouTube ↗</span>
          </button>
        </div>
      </div>

      {/* Synthesized Tracks Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
          <span>{playlistData.tracks.length} Tracks Sequenced ({avgBridge}% Culture Bridge)</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport('m3u')}
              className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 text-xs flex items-center gap-1 transition-colors"
            >
              <span>Download .M3U</span>
            </button>
            <button
              onClick={() => handleExport('share')}
              className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors"
            >
              <span>{copiedNotification ? 'Copied!' : 'Export Playlist'}</span>
            </button>
          </div>
        </div>

        {/* Track Rows */}
        <div className="divide-y divide-white/[0.04] border border-white/[0.06] rounded-xl overflow-hidden bg-zinc-950/60">
          {playlistData.tracks.map((track, i) => (
            <div
              key={i}
              className={`p-2.5 sm:px-3 flex items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors ${
                track.bridgeScore > 0.85 ? 'bg-amber-950/10' : ''
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xs font-mono text-zinc-500 w-4 shrink-0 text-center">
                  {i + 1}
                </span>
                <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-mono text-amber-400">{track.key}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs sm:text-sm text-zinc-100 truncate">
                      {track.title}
                    </span>
                    {track.bridgeScore > 0.85 && (
                      <span className="px-1 py-0.2 rounded text-[9px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        CULTURE BRIDGE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate">
                    {track.artist} • <span className="text-zinc-500">{track.genre}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0 font-mono text-xs">
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-white/5 text-[10px]">
                  {track.sharedPlaylists} Playlists
                </span>
                <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px]">
                  {track.key}
                </span>
                <span className="text-zinc-400 text-[10px] w-12 text-right">
                  {track.bpm} BPM
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
