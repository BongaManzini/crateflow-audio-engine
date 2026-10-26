import React, { useState } from 'react';
import { searchWhoSampled, convertWhoSampledToDualDeckPair, parseWhoSampledUrl } from '../api/whoSampledApi';
import { parsePillowUrl } from '../api/pillowApi';

export default function SearchBar({
  samplePairs,
  activePair,
  onSelectPair,
  isListening,
  onToggleListen,
  onOpenPillowModal
}) {
  const [query, setQuery] = useState('');
  const [inputMode, setInputMode] = useState('search'); // 'search' | 'link'
  const [pastedLink, setPastedLink] = useState('');
  const [showWhoSampledResults, setShowWhoSampledResults] = useState(false);

  // Search across WhoSampled database
  const whoSampledMatches = query.trim().length > 1 ? searchWhoSampled(query) : [];

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    if (!pastedLink) return;

    // Check if it's a Pillowcase / Pillows link
    const pillowParsed = parsePillowUrl(pastedLink);
    if (pillowParsed && pillowParsed.isValid) {
      if (onOpenPillowModal) {
        onOpenPillowModal();
      }
      setPastedLink('');
      return;
    }

    // Check if it's a WhoSampled link
    const wsParsed = parseWhoSampledUrl(pastedLink);
    if (wsParsed && wsParsed.isValid) {
      const matches = searchWhoSampled(wsParsed.title || wsParsed.artist);
      if (matches.length > 0) {
        const pair = convertWhoSampledToDualDeckPair(matches[0]);
        onSelectPair(pair);
        setPastedLink('');
        return;
      }
    }

    // Default match
    onSelectPair(samplePairs[0]);
    setPastedLink('');
  };

  const handleSelectWhoSampled = (wsItem) => {
    const pair = convertWhoSampledToDualDeckPair(wsItem);
    onSelectPair(pair);
    setQuery('');
    setShowWhoSampledResults(false);
  };

  return (
    <div className="w-full space-y-2.5">
      
      {/* Top Search, URL Ingest & Ambient Listen Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        
        {/* Search / URL Box */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
            {inputMode === 'search' ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            )}
          </div>

          {inputMode === 'search' ? (
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowWhoSampledResults(e.target.value.trim().length > 1);
              }}
              placeholder="Search artists & samples from WhoSampled (e.g. Daft Punk, Sade, Nina Simone)..."
              className="w-full pl-10 pr-28 py-2.5 bg-[#12131a] border border-white/[0.08] rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/30 transition-all shadow-inner"
            />
          ) : (
            <form onSubmit={handleLinkSubmit} className="flex">
              <input
                type="text"
                value={pastedLink}
                onChange={(e) => setPastedLink(e.target.value)}
                placeholder="Paste pillowcase.su URL, whosampled.com link, or YouTube URL..."
                className="w-full pl-10 pr-28 py-2.5 bg-[#12131a] border border-white/[0.08] rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/30 transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-14 top-1.5 bottom-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-lg transition-colors"
              >
                Match
              </button>
            </form>
          )}

          {/* Mode Switch Button */}
          <div className="absolute right-2 top-2 bottom-2 flex items-center">
            {inputMode === 'search' ? (
              <button
                onClick={() => setInputMode('link')}
                className="text-[10px] font-mono text-zinc-400 hover:text-amber-400 px-2 py-1 rounded bg-zinc-800/80 border border-white/5"
                title="Paste streaming or Pillowcase link"
              >
                URL mode
              </button>
            ) : (
              <button
                onClick={() => setInputMode('search')}
                className="text-[10px] font-mono text-zinc-400 hover:text-amber-400 px-2 py-1 rounded bg-zinc-800/80 border border-white/5"
              >
                Search
              </button>
            )}
          </div>
        </div>

        {/* Action: Connect Pillow Audio */}
        {onOpenPillowModal && (
          <button
            onClick={onOpenPillowModal}
            className="px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shrink-0"
          >
            <span>☁️ Connect Pillow</span>
          </button>
        )}

        {/* Ambient Recognition Button (Shazam Style) */}
        <button
          onClick={onToggleListen}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all shrink-0 ${
            isListening
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-lg shadow-rose-500/25 animate-pulse'
              : 'bg-[#12131a] hover:bg-zinc-800 text-zinc-200 border-white/[0.08]'
          }`}
        >
          <div className="relative">
            <svg className={`w-3.5 h-3.5 ${isListening ? 'text-rose-400' : 'text-amber-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="22"/>
            </svg>
            {isListening && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </div>
          <span>{isListening ? 'Acoustic Matching...' : 'Ambient Listen'}</span>
        </button>

      </div>

      {/* WhoSampled Live Dropdown Search Results */}
      {showWhoSampledResults && whoSampledMatches.length > 0 && (
        <div className="p-3 bg-[#12131a] border border-amber-500/30 rounded-xl shadow-2xl space-y-2 animate-fade-in">
          <div className="flex items-center justify-between text-xs border-b border-white/[0.06] pb-1.5">
            <span className="font-mono text-amber-400 font-bold text-[11px] flex items-center gap-1.5">
              <span>WhoSampled Sample Lineage Results ({whoSampledMatches.length})</span>
            </span>
            <button
              onClick={() => setShowWhoSampledResults(false)}
              className="text-zinc-500 hover:text-white text-[11px]"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto scrollbar-thin">
            {whoSampledMatches.map((ws) => (
              <button
                key={ws.id}
                onClick={() => handleSelectWhoSampled(ws)}
                className="p-2 rounded-lg bg-zinc-950/80 hover:bg-zinc-900 border border-white/5 hover:border-amber-400/30 text-left transition-all flex items-center justify-between gap-2 group"
              >
                <div className="min-w-0">
                  <div className="font-bold text-white text-xs truncate group-hover:text-amber-400">
                    {ws.title} <span className="text-zinc-400 font-normal">({ws.artist})</span>
                  </div>
                  <div className="text-[11px] text-cyan-400 truncate flex items-center gap-1">
                    <span>↳ Samples:</span>
                    <span className="text-zinc-300 font-medium">"{ws.sampleTitle}"</span>
                    <span className="text-zinc-500">by {ws.sampleArtist}</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 shrink-0">
                  Spin Flip
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Discovery Pills Horizontal Scroll */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-[10px] text-zinc-500 font-mono shrink-0 pl-1">Flips:</span>
        {samplePairs.map(pair => {
          const isSelected = activePair.id === pair.id;
          return (
            <button
              key={pair.id}
              onClick={() => onSelectPair(pair)}
              className={`shrink-0 px-2.5 py-1 rounded-lg border text-xs transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 font-semibold shadow-sm'
                  : 'bg-[#12131a]/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border-white/[0.06]'
              }`}
            >
              <span className="font-medium text-white">{pair.trackA.artist}</span>
              <span className="text-zinc-600 text-[10px]">⇄</span>
              <span className="text-zinc-300">{pair.trackB.artist}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
