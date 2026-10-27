"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Disc3, Play, Radio } from "lucide-react";
import { useCosmicAudio } from "@/components/audio/cosmic-audio";
import type { Project } from "@/lib/data";

function hashString(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function makePrng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const COVER_STARS = (() => {
  const rand = makePrng(0x5eed1a7);
  return Array.from({ length: 46 }, (_, i) => ({
    id: i,
    x: Math.round(rand() * 320),
    y: Math.round(rand() * 320),
    r: Math.round((rand() * 1.4 + 0.45) * 100) / 100,
    o: Math.round((rand() * 0.55 + 0.3) * 100) / 100,
  }));
})();

const GENRE_STYLES: Record<Project["category"], string> = {
  AI: "border-fuchsia-400/30 bg-fuchsia-500/15 text-fuchsia-200",
  Backend: "border-cyan-400/30 bg-cyan-500/15 text-cyan-200",
  Fullstack: "border-indigo-400/30 bg-indigo-500/15 text-indigo-200",
  Tools: "border-amber-400/30 bg-amber-500/15 text-amber-200",
};

function trackMeta(slug: string) {
  const hash = hashString(slug);
  const rand = makePrng(hash);
  const bars = Array.from({ length: 32 }, () => Math.round(18 + rand() * 82));
  const minutes = 2 + (hash % 4);
  const seconds = (hash >>> 8) % 60;
  return {
    bars,
    duration: `${minutes}:${String(seconds).padStart(2, "0")}`,
    seconds: minutes * 60 + seconds,
  };
}

function Vinyl() {
  return (
    <svg viewBox="0 0 320 320" aria-hidden="true" className="h-full w-full drop-shadow-[0_18px_40px_rgba(0,0,0,0.7)]">
      <defs>
        <radialGradient id="vinyl-label" cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#f0abfc" />
          <stop offset="45%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#4c1d95" />
        </radialGradient>
        <linearGradient id="vinyl-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <circle cx="160" cy="160" r="154" fill="#05010f" stroke="#2a1e4d" strokeWidth="2" />
      {[144, 130, 116, 102, 88, 74].map((r) => (
        <circle key={r} cx="160" cy="160" r={r} fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="1" />
      ))}
      <circle cx="160" cy="160" r="154" fill="url(#vinyl-sheen)" />
      <circle cx="160" cy="160" r="54" fill="url(#vinyl-label)" stroke="rgba(255,255,255,0.25)" />
      <text x="160" y="150" textAnchor="middle" fontSize="11" letterSpacing="3" fill="#fdf4ff" fontWeight="700">
        yxu.fm
      </text>
      <text x="160" y="168" textAnchor="middle" fontSize="7" letterSpacing="2" fill="#f5d0fe">
        SIDE A · 33⅓
      </text>
      <circle cx="160" cy="160" r="7" fill="#0b011a" />
      <circle cx="160" cy="160" r="2.5" fill="#0b011a" />
      <path d="M60 210 A 130 130 0 0 0 210 276" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function AlbumCover() {
  return (
    <svg viewBox="0 0 320 320" role="img" aria-label="SIGNALS FROM CAIRO — yxu, 2026 album cover" className="block h-full w-full rounded-2xl border border-white/10">
      <defs>
        <radialGradient id="cover-bg" cx="50%" cy="34%" r="78%">
          <stop offset="0%" stopColor="#4c1d95" />
          <stop offset="42%" stopColor="#2a0d5c" />
          <stop offset="76%" stopColor="#150633" />
          <stop offset="100%" stopColor="#0b011a" />
        </radialGradient>
        <linearGradient id="cover-orbit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.8" />
          <stop offset="55%" stopColor="#e879f9" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="cover-title" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f5d0fe" />
          <stop offset="100%" stopColor="#c7d2fe" />
        </linearGradient>
        <filter id="cover-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <rect width="320" height="320" rx="16" fill="url(#cover-bg)" />
      <circle cx="160" cy="152" r="86" fill="#a855f7" opacity="0.16" filter="url(#cover-blur)" />
      <g fill="#e9d5ff">
        {COVER_STARS.map((s) => (
          <circle key={s.id} cx={s.x} cy={s.y} r={s.r} opacity={s.o} />
        ))}
      </g>
      <g fill="none" stroke="url(#cover-orbit)">
        <circle cx="160" cy="152" r="42" strokeWidth="0.8" opacity="0.7" />
        <circle cx="160" cy="152" r="66" strokeWidth="0.7" opacity="0.55" />
        <circle cx="160" cy="152" r="92" strokeWidth="0.7" opacity="0.4" />
        <circle cx="160" cy="152" r="114" strokeWidth="0.6" opacity="0.25" />
        <ellipse cx="160" cy="152" rx="122" ry="38" strokeWidth="0.9" opacity="0.75" transform="rotate(-23 160 152)" />
        <ellipse cx="160" cy="152" rx="105" ry="30" strokeWidth="0.7" opacity="0.5" transform="rotate(31 160 152)" />
      </g>
      <circle cx="210" cy="118" r="4.5" fill="#f0abfc" />
      <circle cx="210" cy="118" r="9" fill="none" stroke="#f0abfc" strokeOpacity="0.35" />
      <circle cx="98" cy="176" r="2.6" fill="#a5f3fc" />
      <text x="22" y="238" fontSize="33" fontWeight="800" letterSpacing="4" fill="url(#cover-title)">
        SIGNALS
      </text>
      <text x="23" y="262" fontSize="15" fontWeight="600" letterSpacing="6.5" fill="#c4b5fd">
        FROM CAIRO
      </text>
      <line x1="22" y1="278" x2="118" y2="278" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
      <text x="22" y="296" fontSize="11" letterSpacing="3" fill="#a5b4fc" fontFamily="ui-monospace, monospace">
        yxu
      </text>
      <text x="298" y="296" textAnchor="end" fontSize="11" letterSpacing="2.5" fill="#a5b4fc" fontFamily="ui-monospace, monospace">
        2026
      </text>
      <g transform="rotate(-6 256 246)">
        <rect x="216" y="204" width="84" height="80" rx="3" fill="#ffffff" stroke="#05010f" strokeWidth="4" />
        <text x="258" y="230" textAnchor="middle" fontSize="11" fontWeight="800" letterSpacing="0.6" fill="#05010f" fontFamily="ui-monospace, monospace">
          PRODUCTION
        </text>
        <text x="258" y="246" textAnchor="middle" fontSize="11" fontWeight="800" letterSpacing="1.4" fill="#05010f" fontFamily="ui-monospace, monospace">
          GRADE
        </text>
        <text x="258" y="266" textAnchor="middle" fontSize="6.5" letterSpacing="1.2" fill="#05010f" fontFamily="ui-monospace, monospace">
          EVALS · TRACES
        </text>
        <text x="258" y="275" textAnchor="middle" fontSize="6.5" letterSpacing="1.2" fill="#05010f" fontFamily="ui-monospace, monospace">
          HONEST TRADEOFFS
        </text>
      </g>
    </svg>
  );
}

function Waveform({ bars, active }: { bars: number[]; active: boolean }) {
  return (
    <div className="relative flex h-8 w-full items-center gap-[2px] overflow-hidden" aria-hidden="true">
      {bars.map((height, i) => (
        <span
          key={i}
          className="flex-1 rounded-full transition-all duration-300"
          style={{
            height: `${height}%`,
            minWidth: 1.5,
            backgroundImage: active ? "linear-gradient(to top, #6366f1, #e879f9)" : undefined,
            backgroundColor: active ? undefined : "rgba(148, 163, 184, 0.32)",
            boxShadow: active ? "0 0 8px rgba(168, 85, 247, 0.35)" : undefined,
          }}
        />
      ))}
      {active ? (
        <span className="track-shine pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      ) : null}
    </div>
  );
}

export function Tracklist({ projects }: { projects: Project[] }) {
  const { playNote } = useCosmicAudio();
  const [active, setActive] = useState<number | null>(null);

  const tracks = projects.map((project) => ({ project, meta: trackMeta(project.slug) }));
  const totalMinutes = Math.max(1, Math.round(tracks.reduce((sum, t) => sum + t.meta.seconds, 0) / 60));

  const activate = (index: number) => {
    setActive(index);
    playNote(index, { velocity: 0.45, duration: 0.8 });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur sm:p-7">
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-600/20 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-fuchsia-600/15 blur-[90px]" />

      <div className="relative grid gap-7 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-9">
        {/* Sleeve + liner notes */}
        <div>
          <div className="group/sleeve relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[310px] lg:mx-0 lg:max-w-none">
            <div className="absolute inset-y-2 left-7 w-[88%] origin-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/sleeve:translate-x-[36%] group-hover/sleeve:rotate-[3deg]">
              <Vinyl />
            </div>
            <div className="relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/sleeve:-translate-x-1 group-hover/sleeve:-rotate-1">
              <AlbumCover />
            </div>
            <span className="absolute -right-2 -top-2 z-20 hidden items-center gap-1 rounded-full border border-white/15 bg-[#0B011A]/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-indigo-200 backdrop-blur sm:inline-flex">
              <Disc3 size={10} /> LP
            </span>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-indigo-300">
              <Radio size={11} /> Liner notes
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-slate-400">
              Every project ships with architecture, evals and honest tradeoffs. Press play on a track — the whole record was
              mastered in Cairo, transmitted from a small room with a big antenna.
            </p>
            <p className="mt-3 font-mono text-[10px] text-slate-500">YXP-026 · stereo · 33⅓ rpm</p>
          </div>
        </div>

        {/* Tracklist */}
        <div className="relative z-20 min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-fuchsia-300">Side A</p>
              <p className="mt-1 text-[13px] text-slate-400">
                <span className="font-mono text-white">{String(projects.length).padStart(2, "0")}</span> tracks ·{" "}
                <span className="font-mono text-white">{totalMinutes} min</span> · production grade
              </p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-slate-400">
              <Play size={9} className="fill-indigo-300 text-indigo-300" /> hover to audition
            </span>
          </div>

          <div className="mt-2 divide-y divide-white/[0.06]">
            {tracks.map(({ project, meta }, index) => {
              const isActive = active === index;
              const metric = project.metrics[0];
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  onMouseEnter={() => activate(index)}
                  onFocus={() => activate(index)}
                  onBlur={() => setActive((current) => (current === index ? null : current))}
                  aria-label={`Track ${index + 1}: ${project.title} — ${project.tagline}`}
                  className={`group/row relative grid grid-cols-[1.6rem_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-2 rounded-xl px-2 py-3.5 outline-none transition-colors sm:px-3 lg:grid-cols-[2rem_minmax(0,1fr)_9rem_3.25rem] lg:items-center lg:gap-x-4 ${
                    isActive ? "bg-indigo-500/[0.09]" : "hover:bg-white/[0.025]"
                  }`}
                >
                  <span
                    className={`mt-0.5 font-mono text-[12px] transition-colors lg:mt-0 ${
                      isActive ? "text-fuchsia-300" : "text-slate-500"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <div className="flex min-w-0 items-center gap-2">
                      <p className={`truncate text-[14px] font-semibold transition-colors ${isActive ? "text-white" : "text-slate-200"}`}>
                        {project.title}
                      </p>
                      <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] ${GENRE_STYLES[project.category]}`}
                      >
                        {project.category}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-[12px] leading-relaxed text-slate-400">{project.tagline}</p>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isActive ? "mt-1 max-h-8 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {metric ? (
                        <p className="font-mono text-[10.5px] text-indigo-200">
                          <span className="text-fuchsia-300">{metric.value}</span> · {metric.label}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <span className="mt-0.5 font-mono text-[11px] text-slate-500 lg:col-start-4 lg:row-start-1 lg:mt-0 lg:text-right">
                    {meta.duration}
                  </span>

                  <div className="col-span-3 w-full lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:w-36">
                    <Waveform bars={meta.bars} active={isActive} />
                  </div>

                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 rounded-xl border transition-colors ${
                      isActive ? "border-indigo-400/30" : "border-transparent"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">yxu.fm · Cairo broadcast</p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-indigo-300 transition hover:text-white"
            >
              All projects <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
