"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

const roles = ["AI Agent Systems", "Scalable Backends", "RAG Pipelines", "Developer Platforms"];

export function TypingRoles() {
  const [i, setI] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = roles[i];
    const speed = del ? 32 : 62;
    const t = setTimeout(() => {
      if (!del && sub < word.length) setSub(sub + 1);
      else if (!del && sub === word.length) setTimeout(() => setDel(true), 1400);
      else if (del && sub > 0) setSub(sub - 1);
      else { setDel(false); setI((i + 1) % roles.length); }
    }, speed);
    return () => clearTimeout(t);
  }, [sub, del, i]);

  return (
    <span className="inline-flex items-center gap-1 text-indigo-200">
      <ChevronRight size={18} className="text-fuchsia-300" />
      {roles[i].slice(0, sub)}
      <span className="inline-block h-5 w-[2px] animate-pulse bg-fuchsia-300" />
    </span>
  );
}

export function ContributionMap() {
  // deterministic pseudo-activity
  const weeks = 26;
  const days = 7;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-slate-300">1,284 contributions in the last year</p>
        <p className="text-[11px] text-slate-500">Less <span className="inline-flex gap-0.5 align-middle">{[0, 1, 2, 3, 4].map((l) => <span key={l} className="h-2.5 w-2.5 rounded-[3px]" style={{ background: `rgba(99,102,241,${0.15 + l * 0.2})` }} />)}</span> More</p>
      </div>
      <div className="mt-3 flex gap-[3px] overflow-x-auto pb-1">
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({ length: days }).map((_, d) => {
              const v = (w * 7 + d * 13) % 10;
              const alpha = v < 3 ? 0.08 : v < 5 ? 0.3 : v < 7 ? 0.55 : v < 9 ? 0.8 : 1;
              return <span key={d} title={`${v} commits`} className="h-2.5 w-2.5 rounded-[3px]" style={{ background: `rgba(99,102,241,${alpha})` }} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AvailabilityBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3.5 py-1.5 text-[12px] text-emerald-200">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      Available for 1 project — starting Oct 2026
    </span>
  );
}
