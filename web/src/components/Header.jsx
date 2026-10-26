import React from 'react';

export default function Header({
  viewMode,
  setViewMode,
  activeTab,
  setActiveTab,
  onOpenSubmitModal,
  onOpenPillowModal
}) {
  const tabs = [
    { id: 'decks', label: '🎧 Decks & Mixer', short: 'Decks' },
    { id: 'artistgrid', label: '🌐 ArtistGrid Trackers (585)', short: 'ArtistGrid' },
    { id: 'playlist', label: '🎛️ Playlist Synthesizer', short: 'Playlists' },
    { id: 'ancestry', label: '🌳 Sample Ancestry', short: 'Ancestry' }
  ];

  return (
    <header className="border-b border-white/[0.06] bg-[#090a0f]/90 backdrop-blur-xl sticky top-0 z-40 px-3 sm:px-6 lg:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
        
        {/* Brand & Mobile Actions Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Spinning vinyl logo */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 p-[1.5px] shadow-lg shadow-amber-500/15">
              <div className="w-full h-full bg-[#090a0f] rounded-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-1 rounded-full border border-zinc-800 animate-[spin_8s_linear_infinite]" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white font-['Outfit']">
                  Crate<span className="text-amber-400">Flow</span>
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  NO AI • 100% DSP
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 hidden sm:block">
                WhoSampled Lineage × ArtistGrid Trackers × Pillow Audio
              </p>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex sm:hidden items-center gap-1.5">
            {onOpenPillowModal && (
              <button
                onClick={onOpenPillowModal}
                className="p-1.5 rounded-lg bg-zinc-900 border border-white/10 text-cyan-400 text-xs"
                title="Connect Pillowcase Audio"
              >
                ☁️
              </button>
            )}
            <button
              onClick={onOpenSubmitModal}
              className="p-1.5 rounded-lg bg-zinc-900 border border-white/10 text-amber-400 text-xs"
              title="Contribute Sample"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'mobile' ? 'terminal' : 'mobile')}
              className={`text-[10px] font-mono px-2 py-1 rounded-lg border ${
                viewMode === 'terminal' 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold' 
                  : 'bg-zinc-900 text-zinc-400 border-white/10'
              }`}
            >
              {viewMode === 'terminal' ? 'DJ Term' : 'Player'}
            </button>
          </div>
        </div>

        {/* Center Navigation Tabs (Pill Bar) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none bg-[#12131a] border border-white/[0.06] p-1 rounded-xl">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-amber-500 text-black font-bold shadow-sm shadow-amber-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span className="hidden md:inline">{tab.label}</span>
                <span className="md:hidden">{tab.short}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Right Controls */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Connect Pillowcase Audio Button */}
          {onOpenPillowModal && (
            <button
              onClick={onOpenPillowModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-xs font-semibold text-cyan-400 border border-cyan-500/30 transition-colors"
            >
              <span>☁️ Connect Pillow</span>
            </button>
          )}

          {/* View Mode Toggle */}
          <div className="bg-[#12131a] border border-white/[0.06] p-0.5 rounded-xl flex items-center text-xs">
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'mobile'
                  ? 'bg-zinc-800 text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Streamlined
            </button>
            <button
              onClick={() => setViewMode('terminal')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'terminal'
                  ? 'bg-zinc-800 text-amber-400 font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              DJ Terminal
            </button>
          </div>

          {/* Contribute Button */}
          <button
            onClick={onOpenSubmitModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-xs font-semibold text-amber-400 border border-amber-500/30 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span>Contribute</span>
          </button>
        </div>

      </div>
    </header>
  );
}
