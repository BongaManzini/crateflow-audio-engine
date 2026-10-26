import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import DualDeck from './components/DualDeck';
import TransitionController from './components/TransitionController';
import PlaylistSynthesizer from './components/PlaylistSynthesizer';
import SampleAncestryTree from './components/SampleAncestryTree';
import SubmitSampleModal from './components/SubmitSampleModal';
import ConnectPillowModal from './components/ConnectPillowModal';
import ArtistGridExplorer from './components/ArtistGridExplorer';
import { SAMPLE_PAIRS } from './data/samplePairs';
import { youtubeEngine } from './audio/youtubeEngine';
import { audioEngine } from './audio/webAudioEngine';

export default function App() {
  const [samplePairs, setSamplePairs] = useState(SAMPLE_PAIRS);
  const [activePair, setActivePair] = useState(SAMPLE_PAIRS[0]);
  const [viewMode, setViewMode] = useState('mobile'); // 'mobile' | 'terminal'
  const [activeTab, setActiveTab] = useState('decks'); // 'decks' | 'artistgrid' | 'playlist' | 'ancestry'
  
  // Audio Playback & Transition State
  const [isPlaying, setIsPlaying] = useState(false);
  const [crossfadeVal, setCrossfadeVal] = useState(0.0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState('');
  const [transitionProgress, setTransitionProgress] = useState(0.0);
  const [currentBeat, setCurrentBeat] = useState(0);
  
  // Recognition & Community
  const [isListening, setIsListening] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isPillowModalOpen, setIsPillowModalOpen] = useState(false);
  const [nudgeOffset, setNudgeOffset] = useState(0.0);

  // EQ Settings for DJ Terminal Mode
  const [eqSettings, setEqSettings] = useState({
    A: { low: 0, mid: 0, high: 0 },
    B: { low: 0, mid: 0, high: 0 },
  });

  // Initialize YouTube IFrame API and load active pair
  useEffect(() => {
    youtubeEngine.init(() => {
      youtubeEngine.loadPair(activePair);
    });

    youtubeEngine.onStateChange((playing, xVal) => {
      setIsPlaying(playing);
    });
  }, []);

  // Update audio engine when active pair changes
  useEffect(() => {
    youtubeEngine.loadPair(activePair);
    audioEngine.setTempo(activePair.trackA.bpm);
  }, [activePair]);

  // Master Playback Toggle (Synchronizes both YouTube and Pillow players)
  const handleTogglePlay = () => {
    youtubeEngine.togglePlay();
  };

  // Crossfade update (controls both YouTube and Pillow volumes in real-time)
  const handleCrossfadeChange = (val) => {
    setCrossfadeVal(val);
    youtubeEngine.setCrossfade(val);
  };

  // 4-Bar Automated Algorithmic DJ Transition across any combination of sources
  const handleAutoTransition = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTransitionProgress(0);

    youtubeEngine.autoTransition(
      4.0, // 4 seconds transition duration
      (progress, currentX) => {
        setTransitionProgress(progress);
        setCrossfadeVal(currentX);

        if (progress < 0.35) {
          setTransitionPhase('Phase 1: Cueing Sample...');
        } else if (progress < 0.75) {
          setTransitionPhase('Phase 2: Volume Crossfade');
        } else {
          setTransitionPhase('Phase 3: Drop into Sample!');
        }
      },
      (targetX) => {
        setIsTransitioning(false);
        setTransitionPhase('');
        setCrossfadeVal(targetX);
      }
    );
  };

  // Sync Nudge
  const handleNudge = (delta) => {
    setNudgeOffset(prev => {
      const next = Math.round((prev + delta) * 10) / 10;
      youtubeEngine.nudge(crossfadeVal < 0.5 ? 'A' : 'B', delta);
      return next;
    });
  };

  // Upvote / Verify Cue
  const handleVote = () => {
    setActivePair(prev => ({
      ...prev,
      community: {
        ...prev.community,
        verifiedBy: prev.community.verifiedBy + 1
      }
    }));
  };

  // EQ Change Handler
  const handleEqChange = (deck, band, value) => {
    setEqSettings(prev => ({
      ...prev,
      [deck]: { ...prev[deck], [band]: value }
    }));
  };

  // Ambient Listening Simulator
  const handleToggleListen = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }
    setIsListening(true);

    setTimeout(() => {
      setIsListening(false);
      const nextIndex = (samplePairs.findIndex(p => p.id === activePair.id) + 1) % samplePairs.length;
      handleSelectPair(samplePairs[nextIndex]);
    }, 2400);
  };

  // Pair Selection
  const handleSelectPair = (pair) => {
    setActivePair(pair);
    setCrossfadeVal(0.0);
    setNudgeOffset(0.0);
    youtubeEngine.loadPair(pair);
  };

  // Select Artist Flip from ArtistGrid
  const handleSelectArtistFlip = (flip) => {
    const existing = samplePairs.find(p => p.id === flip.id);
    if (existing) {
      handleSelectPair(existing);
    } else {
      const newPair = {
        id: flip.id,
        slug: flip.id,
        trackA: {
          title: flip.titleA,
          artist: flip.artistA,
          year: flip.yearA,
          album: 'Single / LP',
          albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80',
          genre: 'ArtistGrid Index',
          bpm: flip.bpm,
          key: flip.key,
          cueTime: flip.cueA,
          duration: 240,
          sourceType: 'youtube',
          youtubeId: "uvb-1wjAtk4",
          sampleSnippet: flip.type,
          accentColor: '#f59e0b'
        },
        trackB: {
          title: flip.titleB,
          artist: flip.artistB,
          year: flip.yearB,
          album: 'Archive',
          albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80',
          genre: 'Vintage Source',
          bpm: flip.bpm,
          key: flip.key,
          cueTime: flip.cueB,
          duration: 210,
          sourceType: 'youtube',
          youtubeId: "bZ_Vpydk2g8",
          sampleType: flip.type,
          accentColor: '#06b6d4'
        },
        ancestry: [
          { generation: 0, title: flip.titleA, artist: flip.artistA, year: flip.yearA, role: 'Parent Track' },
          { generation: 1, title: flip.titleB, artist: flip.artistB, year: flip.yearB, role: flip.type }
        ],
        community: {
          verifiedBy: 42,
          isVerified: true,
          nudgeOffset: 0.0,
          submissionsCount: 6,
          curatorNote: `Loaded directly from ArtistGrid community tracker archives.`
        }
      };
      setSamplePairs([newPair, ...samplePairs]);
      handleSelectPair(newPair);
    }
    setActiveTab('decks');
  };

  // Select full custom pair (e.g. from ArtistGrid Tracker Vault or WhoSampled)
  const handleSelectCustomPair = (pair) => {
    const existing = samplePairs.find(p => p.id === pair.id);
    if (existing) {
      handleSelectPair(existing);
    } else {
      setSamplePairs([pair, ...samplePairs]);
      handleSelectPair(pair);
    }
    setActiveTab('decks');
  };

  // Load single Pillow track to Deck A or Deck B
  const handleLoadPillowTrack = (deck, pillowTrack) => {
    const updated = {
      ...activePair,
      id: `pillow-${Date.now()}`,
      [deck === 'A' ? 'trackA' : 'trackB']: pillowTrack
    };
    setActivePair(updated);
    youtubeEngine.loadPair(updated);
    setActiveTab('decks');
  };

  // Load Hybrid Pair (e.g. Deck A Pillowcase Audio + Deck B YouTube Sample)
  const handleLoadHybridPair = (hybridPair) => {
    setActivePair(hybridPair);
    setSamplePairs([hybridPair, ...samplePairs.filter(p => p.id !== hybridPair.id)]);
    youtubeEngine.loadPair(hybridPair);
    setActiveTab('decks');
  };

  // Add Community Sample
  const handleAddSample = (newPair) => {
    setSamplePairs([newPair, ...samplePairs]);
    handleSelectPair(newPair);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col font-['Inter'] selection:bg-amber-500 selection:text-black">
      
      {/* Top Header with Navigation Tabs */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenPillowModal={() => setIsPillowModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        
        {/* Search, WhoSampled Match, Pillow Ingest & Ambient Listening */}
        <SearchBar
          samplePairs={samplePairs}
          activePair={activePair}
          onSelectPair={handleSelectPair}
          isListening={isListening}
          onToggleListen={handleToggleListen}
          onOpenPillowModal={() => setIsPillowModalOpen(true)}
        />

        {/* Tab 1: Decks & Mixer (Hybrid YouTube + Pillow Engine) */}
        {activeTab === 'decks' && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            {/* Dual Deck Player (Streams YouTube OR Pillowcase HTML5 Audio independently) */}
            <DualDeck
              activePair={activePair}
              crossfadeVal={crossfadeVal}
              isPlaying={isPlaying}
              viewMode={viewMode}
              audioEngine={audioEngine}
              eqSettings={eqSettings}
              onEqChange={handleEqChange}
              onOpenPillowModal={() => setIsPillowModalOpen(true)}
            />

            {/* Transition Controller (Automated DJ Drop, Hybrid Crossfader, Sync Nudge) */}
            <TransitionController
              isPlaying={isPlaying}
              onTogglePlay={handleTogglePlay}
              crossfadeVal={crossfadeVal}
              onCrossfadeChange={handleCrossfadeChange}
              onAutoTransition={handleAutoTransition}
              isTransitioning={isTransitioning}
              transitionPhase={transitionPhase}
              transitionProgress={transitionProgress}
              currentBeat={currentBeat}
              activePair={activePair}
              nudgeOffset={nudgeOffset}
              onNudge={handleNudge}
              onVote={handleVote}
            />
          </div>
        )}

        {/* Tab 2: ArtistGrid Catalog & Tracker Repository */}
        {activeTab === 'artistgrid' && (
          <div className="animate-fade-in">
            <ArtistGridExplorer
              onSelectArtistFlip={handleSelectArtistFlip}
              onSelectCustomPair={handleSelectCustomPair}
            />
          </div>
        )}

        {/* Tab 3: Multi-Playlist Synthesizer (With Port to YouTube feature) */}
        {activeTab === 'playlist' && (
          <div className="animate-fade-in">
            <PlaylistSynthesizer
              activePair={activePair}
            />
          </div>
        )}

        {/* Tab 4: Sample Ancestry */}
        {activeTab === 'ancestry' && (
          <div className="animate-fade-in">
            <SampleAncestryTree
              activePair={activePair}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#090a0f]/90 py-5 px-4 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p>
            CrateFlow • Real YouTube Audio × Pillowcase Audio × WhoSampled × 585 ArtistGrid Trackers
          </p>
          <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
            <span>Hybrid Audio Engine</span>
            <span>•</span>
            <span>Port to YouTube Continuous Mix</span>
            <span>•</span>
            <span>$0 Cloud Infrastructure</span>
          </div>
        </div>
      </footer>

      {/* Submission Modal */}
      <SubmitSampleModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onAddSample={handleAddSample}
      />

      {/* Connect Pillow Audio Modal (Pillowcase.su) */}
      <ConnectPillowModal
        isOpen={isPillowModalOpen}
        onClose={() => setIsPillowModalOpen(false)}
        onLoadPillowTrack={handleLoadPillowTrack}
        onLoadHybridPair={handleLoadHybridPair}
        activePair={activePair}
      />

    </div>
  );
}
