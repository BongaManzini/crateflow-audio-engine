import React, { useState, useEffect } from 'react';
import { ARTIST_GRID_CATALOG } from '../data/artistGridCatalog';
import {
  fetchArtistTracker,
  searchAllVaults,
  createDualDeckPairFromTracker
} from '../api/artistGridApi';

export default function ArtistGridExplorer({ onSelectArtistFlip, onSelectCustomPair }) {
  const [activeMode, setActiveMode] = useState('artists'); // 'artists' | 'vaultSearch'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All'); // 'All' | 'Verified Trackers' | 'External Sites' | 'Google Sheets'
  
  // Vault Modal State
  const [selectedArtistVault, setSelectedArtistVault] = useState(null);
  const [vaultData, setVaultData] = useState(null);
  const [isLoadingVault, setIsLoadingVault] = useState(false);
  const [vaultEraFilter, setVaultEraFilter] = useState('All');
  const [vaultSearchFilter, setVaultSearchFilter] = useState('');

  // Global Vault Search State
  const [globalSearchResults, setGlobalSearchResults] = useState([]);

  // Handle global search input
  useEffect(() => {
    if (activeMode === 'vaultSearch' && searchQuery.trim().length > 0) {
      const results = searchAllVaults(searchQuery);
      setGlobalSearchResults(results);
    } else {
      setGlobalSearchResults([]);
    }
  }, [searchQuery, activeMode]);

  // Load an artist's full tracker vault
  const handleOpenVault = async (artist) => {
    setSelectedArtistVault(artist);
    setIsLoadingVault(true);
    setVaultEraFilter('All');
    setVaultSearchFilter('');

    try {
      const data = await fetchArtistTracker(artist);
      setVaultData(data);
    } catch (err) {
      console.error("Failed to load live tracker:", err);
    } finally {
      setIsLoadingVault(false);
    }
  };

  // Close vault modal
  const handleCloseVault = () => {
    setSelectedArtistVault(null);
    setVaultData(null);
  };

  // Load a track from the vault into the Dual Decks
  const handleSpinVaultTrack = (track, artistName) => {
    const pair = createDualDeckPairFromTracker(track, artistName);
    if (onSelectCustomPair) {
      onSelectCustomPair(pair);
    } else if (onSelectArtistFlip) {
      onSelectArtistFlip({
        id: pair.id,
        titleA: pair.trackA.title,
        artistA: pair.trackA.artist,
        yearA: pair.trackA.year,
        titleB: pair.trackB.title,
        artistB: pair.trackB.artist,
        yearB: pair.trackB.year,
        bpm: pair.trackA.bpm,
        key: pair.trackA.key,
        cueA: pair.trackA.cueTime,
        cueB: pair.trackB.cueTime,
        type: pair.trackB.sampleType
      });
    }
    handleCloseVault();
  };

  // Filtered artists for browse mode
  const filteredArtists = ARTIST_GRID_CATALOG.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          artist.credit.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (artist.trackerId && artist.trackerId.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (filterType === 'All') return matchesSearch;
    if (filterType === 'Verified Trackers') return matchesSearch && artist.isBest;
    if (filterType === 'External Sites') return matchesSearch && artist.trackerId && artist.trackerId.includes('.');
    if (filterType === 'Google Sheets') return matchesSearch && artist.trackerId && !artist.trackerId.includes('.');
    return matchesSearch;
  });

  // Filtered tracks in the open vault
  const filteredVaultTracks = vaultData ? vaultData.tracks.filter(track => {
    const matchesEra = vaultEraFilter === 'All' || track.era === vaultEraFilter;
    const matchesQuery = !vaultSearchFilter ||
      track.title.toLowerCase().includes(vaultSearchFilter.toLowerCase()) ||
      track.notes.toLowerCase().includes(vaultSearchFilter.toLowerCase()) ||
      (track.sampleDetected && track.sampleDetected.title.toLowerCase().includes(vaultSearchFilter.toLowerCase()));
    return matchesEra && matchesQuery;
  }) : [];

  return (
    <div className="w-full bg-[#12131a] border border-white/[0.08] rounded-2xl p-4 sm:p-6 space-y-5 shadow-2xl">
      
      {/* Real ArtistGrid Connection Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-cyan-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center shrink-0">
            <span className="text-amber-400 font-bold font-mono text-sm">AG</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-sm sm:text-base font-bold text-white font-['Outfit']">
                Connected to Real ArtistGrid (<span className="text-amber-400">artistgrid.cx</span>)
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-white/10">
                585 Real Trackers
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Live index from <code className="text-zinc-300 font-mono text-[11px]">https://artists.artistgrid.cx/artists.csv</code>. Click any artist to connect to their real tracker sheet.
            </p>
          </div>
        </div>

        {/* External Link to Real ArtistGrid */}
        <a
          href="https://artistgrid.cx/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shrink-0"
        >
          <span>Open Real ArtistGrid.cx</span>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 p-1 bg-zinc-950 border border-white/[0.06] rounded-xl w-fit">
        <button
          onClick={() => setActiveMode('artists')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
            activeMode === 'artists'
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>585 Artists Directory</span>
        </button>

        <button
          onClick={() => setActiveMode('vaultSearch')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
            activeMode === 'vaultSearch'
              ? 'bg-cyan-500 text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span>Unreleased Songs & Samples</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Main Search Input */}
        <div className="relative flex-1">
          <svg className="w-4 h-4 absolute left-3 top-3 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeMode === 'artists'
                ? "Search across 585 real artists, curators (e.g. Nicole, Infisrael, edideaur)..."
                : "Search real unreleased cuts & sample origins (e.g. Never See Me Again, Alien, Pissy Pamper)..."
            }
            className="w-full pl-9 pr-4 py-2.5 bg-zinc-950 border border-white/[0.08] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Filter Pills */}
        {activeMode === 'artists' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            {['All', 'Verified Trackers', 'Google Sheets', 'External Sites'].map(type => {
              const isSelected = filterType === type;
              return (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1.5 rounded-xl border text-xs whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-black font-bold border-amber-400 shadow-sm'
                      : 'bg-zinc-950 text-zinc-400 hover:text-white border-white/5'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* MODE 1: 585 Real Artists Grid */}
      {activeMode === 'artists' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-500 px-1 font-mono">
            <span>Showing {filteredArtists.length} of {ARTIST_GRID_CATALOG.length} authentic artists</span>
            <span>Real data from artists.artistgrid.cx</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin">
            {filteredArtists.map((artist, idx) => (
              <div
                key={idx}
                className="group relative bg-zinc-950/80 hover:bg-zinc-900 border border-white/[0.06] hover:border-amber-500/40 rounded-xl p-3.5 transition-all duration-200 flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Real Artist Photo from ArtistGrid Asset CDN */}
                  <div className="relative w-full h-32 rounded-lg overflow-hidden mb-2.5 border border-white/5 bg-zinc-900">
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      onError={(e) => {
                        // Fallback to stylized initial card if not on webp CDN
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(artist.name)}&background=18181b&color=f59e0b&bold=true&size=256`;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    
                    {artist.isBest && (
                      <span className="absolute top-2 left-2 text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500 text-black font-extrabold shadow">
                        VERIFIED TRACKER
                      </span>
                    )}

                    <span className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-300 bg-black/70 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm truncate max-w-[90%]">
                      {artist.trackerId ? (artist.trackerId.includes('.') ? artist.trackerId : 'Google Sheet') : 'Tracker'}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors font-['Outfit'] truncate">
                    {artist.name}
                  </h3>
                  <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                    Curators: <span className="text-zinc-300">{artist.credit}</span>
                  </p>
                </div>

                {/* Direct Action Links */}
                <div className="mt-3 pt-2.5 border-t border-white/[0.06] space-y-1.5">
                  {/* Link 1: Connect directly to the real Google Sheet or custom tracker site */}
                  <a
                    href={artist.liveTrackerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 px-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/30 hover:border-amber-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Open Live Tracker</span>
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>

                  {/* Link 2: View In-App */}
                  <button
                    onClick={() => handleOpenVault(artist)}
                    className="w-full py-1 px-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all"
                  >
                    <svg className="w-3 h-3 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    <span>Inspect Vault & Flips</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODE 2: Global Vault Song Search */}
      {activeMode === 'vaultSearch' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <span>
              Found <strong className="text-cyan-400">{globalSearchResults.length}</strong> songs & samples matching query
            </span>
            <span className="text-[11px] font-mono text-zinc-500">
              Scanned across authenticated ArtistGrid vaults
            </span>
          </div>

          {globalSearchResults.length === 0 && searchQuery.trim() !== '' && (
            <div className="p-8 text-center bg-zinc-950/60 rounded-xl border border-white/5 text-zinc-400 text-xs">
              No unreleased songs found matching "{searchQuery}". Try searching for popular grails like "Never See Me Again", "Alien", "Cancun", or "Sing About Me".
            </div>
          )}

          {globalSearchResults.length === 0 && searchQuery.trim() === '' && (
            <div className="p-8 text-center bg-zinc-950/60 rounded-xl border border-white/5 text-zinc-400 text-xs space-y-2">
              <p className="font-semibold text-zinc-300">
                Search unreleased songs, leaks, or sample origins
              </p>
              <p className="text-zinc-500 max-w-md mx-auto">
                Type in the search bar above to query real recordings across Kanye West, Kendrick Lamar, Playboi Carti, Daft Punk, MF DOOM, Travis Scott, Tyler, The Creator, Frank Ocean, and Drake.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {globalSearchResults.map((track, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-zinc-950/90 hover:bg-zinc-900 border border-white/[0.08] hover:border-cyan-500/40 rounded-xl space-y-2 transition-all shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-white text-sm font-['Outfit']">
                      {track.title}
                    </h4>
                    <p className="text-xs text-amber-400 font-medium">
                      {track.artistName} • <span className="text-zinc-400">{track.era}</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-white/5 shrink-0">
                    {track.quality}
                  </span>
                </div>

                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                  {track.notes}
                </p>

                {/* Sample Lineage Banner */}
                {track.sampleDetected && (
                  <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-[11px] text-cyan-300 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-cyan-400 font-semibold">✦ Sample:</span>
                      <strong className="text-white truncate">"{track.sampleDetected.title}"</strong>
                      <span className="text-zinc-400 truncate">by {track.sampleDetected.artist}</span>
                    </div>
                    <span className="text-[9px] font-mono bg-cyan-900/60 text-cyan-200 px-1.5 py-0.5 rounded shrink-0">
                      Deck B
                    </span>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/[0.05]">
                  <span className="text-[10px] font-mono text-zinc-500">
                    {track.length} • {track.date}
                  </span>

                  <button
                    onClick={() => handleSpinVaultTrack(track, track.artistName)}
                    className="py-1 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    <span>Spin in Decks</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TRACKER VAULT MODAL (Real Spreadsheet / Tracker Details) */}
      {selectedArtistVault && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="w-full max-w-4xl max-h-[90vh] bg-[#12131a] border border-white/[0.12] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-start justify-between gap-4 bg-zinc-950/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <h3 className="text-lg sm:text-xl font-bold text-white font-['Outfit']">
                    {selectedArtistVault.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-amber-400 border border-white/10">
                    ArtistGrid Tracker
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Curated by <strong className="text-zinc-200">{selectedArtistVault.credit}</strong>
                </p>
              </div>

              {/* Direct Link to Live Tracker */}
              <div className="flex items-center gap-2">
                <a
                  href={selectedArtistVault.liveTrackerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <span>Open Live Tracker ↗</span>
                </a>
                <button
                  onClick={handleCloseVault}
                  className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-white/5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Filter Sub-bar inside Vault */}
            <div className="p-3 sm:p-4 border-b border-white/[0.06] bg-zinc-950 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <div className="relative flex-1">
                <svg className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  value={vaultSearchFilter}
                  onChange={(e) => setVaultSearchFilter(e.target.value)}
                  placeholder={`Search ${selectedArtistVault.name} tracker recordings & samples...`}
                  className="w-full pl-8 pr-3 py-1.5 bg-zinc-900 border border-white/[0.08] rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {vaultData && vaultData.eras && vaultData.eras.length > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-zinc-500 text-[11px] whitespace-nowrap">Era:</span>
                  <select
                    value={vaultEraFilter}
                    onChange={(e) => setVaultEraFilter(e.target.value)}
                    className="bg-zinc-900 border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="All">All Eras ({vaultData.tracks.length})</option>
                    {vaultData.eras.map(era => (
                      <option key={era} value={era}>{era}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Modal Body / Tracklist */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 scrollbar-thin">
              {isLoadingVault ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-zinc-400 font-mono">
                    Connecting to live tracker spreadsheet...
                  </p>
                </div>
              ) : filteredVaultTracks.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <p className="text-sm font-semibold text-white">
                    {vaultData && vaultData.statusMessage ? vaultData.statusMessage : `View the full ${selectedArtistVault.name} tracker directly`}
                  </p>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto">
                    This artist's tracker contains unreleased cuts, stems, and alternate versions curated by the community. Click below to view the official live spreadsheet.
                  </p>
                  <div className="pt-2">
                    <a
                      href={selectedArtistVault.liveTrackerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-lg"
                    >
                      <span>Open {selectedArtistVault.name} Tracker Sheet ↗</span>
                    </a>
                  </div>
                </div>
              ) : (
                filteredVaultTracks.map((track, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 rounded-xl bg-zinc-950/70 hover:bg-zinc-900 border border-white/[0.06] hover:border-cyan-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-white text-sm font-['Outfit']">
                          {track.title}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-amber-400 border border-white/5">
                          {track.era}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                          {track.quality}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {track.notes}
                      </p>

                      {/* Detected Sample Highlight */}
                      {track.sampleDetected && (
                        <div className="mt-1 flex items-center gap-2 text-[11px] text-cyan-300 bg-cyan-950/30 px-2.5 py-1 rounded-lg border border-cyan-500/20 w-fit">
                          <span className="font-semibold text-cyan-400">Sample Origin:</span>
                          <span className="text-white">"{track.sampleDetected.title}"</span>
                          <span className="text-zinc-400">by {track.sampleDetected.artist}</span>
                          <span className="text-[10px] text-zinc-500 font-mono">({track.sampleDetected.type})</span>
                        </div>
                      )}
                    </div>

                    {/* Action */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleSpinVaultTrack(track, selectedArtistVault.name)}
                        className="py-1.5 px-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                        <span>Spin in Decks</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t border-white/[0.08] bg-zinc-950/90 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500">
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <a
                  href={selectedArtistVault.liveTrackerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline"
                >
                  Direct Tracker URL ↗
                </a>
                <span>•</span>
                <a
                  href="https://artistgrid.cx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:underline"
                >
                  artistgrid.cx ↗
                </a>
              </div>
              <button
                onClick={handleCloseVault}
                className="px-4 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-medium"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
