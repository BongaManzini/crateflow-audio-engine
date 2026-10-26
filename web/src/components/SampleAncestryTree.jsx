import React from 'react';

export default function SampleAncestryTree({ activePair }) {
  const ancestry = activePair?.ancestry || [
    { generation: 0, title: activePair?.trackA?.title || "Parent Track", artist: activePair?.trackA?.artist || "Artist", year: activePair?.trackA?.year || 2024, role: "Parent Track" },
    { generation: 1, title: activePair?.trackB?.title || "Sample Source", artist: activePair?.trackB?.artist || "Vintage Artist", year: activePair?.trackB?.year || 1980, role: "Sample Source" }
  ];
  const community = activePair?.community || { verifiedBy: 42, curatorNote: "Verified by community listeners." };

  return (
    <div className="w-full bg-[#12131a] border border-white/[0.08] rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
            Sample Genealogy & Ancestry Tree
          </h2>
        </div>
        <span className="text-[11px] font-mono text-zinc-500">
          Decades of Influence
        </span>
      </div>

      {/* Visual Ancestry Node Chain */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 py-1">
        {ancestry.map((node, idx) => (
          <React.Fragment key={idx}>
            <div className="flex-1 bg-zinc-950/80 border border-white/[0.06] p-3.5 rounded-xl relative shadow-md">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1">
                <span>GEN {node.generation}</span>
                <span className="text-amber-400 font-bold">{node.year}</span>
              </div>
              <h4 className="font-bold text-sm text-zinc-100 truncate font-['Outfit']">
                {node.title}
              </h4>
              <p className="text-xs text-zinc-400 truncate mb-2">
                {node.artist}
              </p>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-900 text-zinc-300 border border-white/5">
                {node.role}
              </span>
            </div>

            {idx < ancestry.length - 1 && (
              <div className="flex items-center justify-center text-zinc-600 font-bold py-1 md:py-0">
                <svg className="w-4 h-4 hidden md:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
                <svg className="w-4 h-4 md:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <polyline points="19 12 12 19 5 12"/>
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Curator & Lineage Breakdown Note */}
      {community.curatorNote && (
        <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/[0.06] text-xs text-zinc-300 flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          </div>
          <div>
            <span className="font-bold text-zinc-200 block mb-0.5 text-[11px]">Lineage & Production Context:</span>
            <p className="text-zinc-400 leading-relaxed text-[11px]">{community.curatorNote}</p>
          </div>
        </div>
      )}

    </div>
  );
}
