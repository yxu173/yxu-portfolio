"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Copy, Check, ChevronRight } from "lucide-react";

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

export function DevTerminal() {
  const [copied, setCopied] = useState(false);
  const lines = [
    { p: "$", c: "whoami", o: "mohamed-samir — software engineer (cairo)" },
    { p: "$", c: "cat focus.txt", o: "backend • llm systems • agents • evals" },
    { p: "$", c: "npx yxu contact", o: "→ yxu@proton.me — replies in <48h ✓" },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <Terminal size={13} className="text-indigo-300" />
        <span className="font-mono text-[11px] text-slate-400">mohamed@yxu: ~</span>
        <button
          onClick={() => { navigator.clipboard?.writeText("npx yxu contact"); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="ml-auto text-slate-500 hover:text-white transition"
          aria-label="Copy command"
        >
          {copied ? <Check size={13} className="text-emerald-300" /> : <Copy size={13} />}
        </button>
      </div>
      <div className="space-y-2 p-4 font-mono text-[12px] leading-relaxed">
        {lines.map((l, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }}>
            <p><span className="text-fuchsia-300">{l.p}</span> <span className="text-white">{l.c}</span></p>
            <p className="text-slate-500">{l.o}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function TechMarquee() {
  const tech = ["TypeScript", "Next.js", ".NET", "PostgreSQL", "pgvector", "Redis", "Mastra", "Vercel AI SDK", "Docker", "Tailwind", "SignalR", "Linux"];
  const row = [...tech, ...tech];
  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex w-max gap-2.5"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {row.map((t, i) => (
          <span key={i} className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[12px] text-slate-300 backdrop-blur">
            {t}
          </span>
        ))}
      </motion.div>
    </div>
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
