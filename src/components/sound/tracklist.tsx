"use client";

import { useState } from "react";
import Link from "next/link";
import { Disc3, Play, Radio } from "lucide-react";
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
  AI: "border-arcturus/40 bg-arcturus/10 text-arcturus",
  Backend: "border-rigel/40 bg-rigel/10 text-rigel",
  Fullstack: "border-starlight/30 bg-starlight/10 text-starlight",
  Tools: "border-white/15 bg-white/5 text-dust",
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
    <svg viewBox="0 0 320 320" aria-hidden="true" className="h-full w-full">
      <circle cx="160" cy="160" r="154" fill="#070A12" stroke="rgba(236,232,223,0.18)" strokeWidth="2" />
      {[144, 130, 116, 102, 88, 74].map((r) => (
        <circle key={r} cx="160" cy="160" r={r} fill="none" stroke="rgba(236,232,223,0.06)" strokeWidth="1" />
      ))}
      <circle cx="160" cy="160" r="54" fill="#F2A541" />
      <text x="160" y="157" textAnchor="middle" fontSize="12" fontWeight="700" fill="#070A12">
        yxu.fm
      </text>
      <text x="160" y="172" textAnchor="middle" fontSize="8" fill="#070A12">
        Side A
      </text>
      <circle cx="160" cy="160" r="7" fill="#070A12" />
      <circle cx="160" cy="160" r="2.5" fill="#F2A541" />
    </svg>
  );
}

function AlbumCover() {
  return (
    <svg viewBox="0 0 320 320" role="img" aria-label="Signals from Cairo, yxu, 2026 album cover" className="block h-full w-full rounded-lg border border-white/10">
      <rect width="320" height="320" rx="8" fill="#0F1420" />
      <g fill="#ECE8DF">
        {COVER_STARS.map((s) => (
          <circle key={s.id} cx={s.x} cy={s.y} r={s.r} opacity={s.o} />
        ))}
      </g>
      <g fill="none" stroke="#9FB8FF">
        <circle cx="160" cy="152" r="42" strokeWidth="0.8" opacity="0.5" />
        <circle cx="160" cy="152" r="66" strokeWidth="0.7" opacity="0.4" />
        <circle cx="160" cy="152" r="92" strokeWidth="0.7" opacity="0.3" />
        <circle cx="160" cy="152" r="114" strokeWidth="0.6" opacity="0.2" />
        <ellipse cx="160" cy="152" rx="122" ry="38" strokeWidth="0.9" opacity="0.6" transform="rotate(-23 160 152)" />
        <ellipse cx="160" cy="152" rx="105" ry="30" strokeWidth="0.7" opacity="0.4" transform="rotate(31 160 152)" />
      </g>
      <circle cx="210" cy="118" r="4.5" fill="#F2A541" />
      <circle cx="98" cy="176" r="2.6" fill="#ECE8DF" />
      <text x="22" y="238" fontSize="33" fontWeight="800" letterSpacing="2" fill="#ECE8DF">
        Signals
      </text>
      <text x="23" y="262" fontSize="15" fontWeight="600" fill="#F2A541">
        from Cairo
      </text>
      <line x1="22" y1="278" x2="118" y2="278" stroke="rgba(236,232,223,0.28)" strokeWidth="1" />
      <text x="22" y="296" fontSize="11" fill="#8C93A3">
        yxu
      </text>
      <text x="298" y="296" textAnchor="end" fontSize="11" fill="#8C93A3" fontFamily="ui-monospace, monospace">
        2026
      </text>
      <g transform="rotate(-6 256 246)">
        <rect x="216" y="204" width="84" height="80" rx="3" fill="#ECE8DF" stroke="#070A12" strokeWidth="4" />
        <text x="258" y="230" textAnchor="middle" fontSize="11" fontWeight="800" fill="#070A12">
          Production
        </text>
        <text x="258" y="246" textAnchor="middle" fontSize="11" fontWeight="800" fill="#070A12">
          grade
        </text>
        <text x="258" y="266" textAnchor="middle" fontSize="7" fill="#070A12">
          Evals and traces
        </text>
        <text x="258" y="275" textAnchor="middle" fontSize="7" fill="#070A12">
          Honest tradeoffs
        </text>
      </g>
    </svg>
  );
}

function Waveform({ bars, active }: { bars: number[]; active: boolean }) {
  return (
    <div className="flex h-8 w-full items-center gap-[2px] overflow-hidden" aria-hidden="true">
      {bars.map((height, i) => (
        <span
          key={i}
          className="flex-1 rounded-full transition-all duration-300"
          style={{
            height: `${height}%`,
            minWidth: 1.5,
            backgroundColor: active ? "#F2A541" : "rgba(140, 147, 163, 0.35)",
          }}
        />
      ))}
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
    <div className="overflow-hidden rounded-lg border border-white/10 bg-hull p-5 sm:p-7">
      <div className="relative grid gap-7 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-9">
        {/* Sleeve + liner notes */}
        <div>
          <div className="group/sleeve relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[310px] lg:mx-0 lg:max-w-none">
            <div className="absolute inset-y-2 left-7 w-[88%] origin-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/sleeve:translate-x-[36%]">
              <Vinyl />
            </div>
            <div className="relative z-10">
              <AlbumCover />
            </div>
            <span className="absolute -right-2 -top-2 z-20 hidden items-center gap-1 rounded-full border border-white/15 bg-hull px-2.5 py-1 text-[11px] text-starlight sm:inline-flex">
              <Disc3 size={10} /> LP
            </span>
          </div>

          <div className="mt-5 rounded-lg border border-white/10 bg-hull-2 p-4">
            <p className="flex items-center gap-1.5 text-[13px] text-arcturus">
              <Radio size={11} /> Liner notes
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-dust">
              Every project ships with architecture, evals and honest tradeoffs. Press play on a track — the whole record was
              mastered in Cairo, transmitted from a small room with a big antenna.
            </p>
            <p className="mt-3 font-mono text-[11px] text-dust/70">YXP-026, 33⅓ rpm</p>
          </div>
        </div>

        {/* Tracklist */}
        <div className="relative z-20 min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <p className="font-wide text-[15px] font-semibold text-arcturus">Side A</p>
              <p className="mt-1 text-[13px] text-dust">
                <span className="font-mono text-starlight">{String(projects.length).padStart(2, "0")}</span> tracks ·{" "}
                <span className="font-mono text-starlight">{totalMinutes} min</span>, production grade
              </p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-hull-2 px-2.5 py-1 text-[12px] text-dust">
              <Play size={9} className="fill-arcturus text-arcturus" /> hover to audition
            </span>
          </div>

          <div className="mt-2 divide-y divide-white/10">
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
                  className={`group/row relative grid grid-cols-[1.6rem_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-2 rounded-lg px-2 py-3.5 outline-none transition-colors sm:px-3 lg:grid-cols-[2rem_minmax(0,1fr)_9rem_3.25rem] lg:items-center lg:gap-x-4 ${
                    isActive ? "bg-arcturus/10" : "hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`mt-0.5 font-mono text-[12px] transition-colors lg:mt-0 ${
                      isActive ? "text-arcturus" : "text-dust"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <div className="flex min-w-0 items-center gap-2">
                      <p className={`truncate text-[14px] font-semibold transition-colors ${isActive ? "text-starlight" : "text-starlight/90"}`}>
                        {project.title}
                      </p>
                      <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] ${GENRE_STYLES[project.category]}`}
                      >
                        {project.category}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-[12px] leading-relaxed text-dust">{project.tagline}</p>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isActive ? "mt-1 max-h-8 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {metric ? (
                        <p className="font-mono text-[11px] text-dust">
                          <span className="text-arcturus">{metric.value}</span> {metric.label}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <span className="mt-0.5 font-mono text-[11px] text-dust lg:col-start-4 lg:row-start-1 lg:mt-0 lg:text-right">
                    {meta.duration}
                  </span>

                  <div className="col-span-3 w-full lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:w-36">
                    <Waveform bars={meta.bars} active={isActive} />
                  </div>

                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 rounded-lg border transition-colors ${
                      isActive ? "border-arcturus/40" : "border-transparent"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
            <p className="text-[12px] text-dust">yxu.fm, broadcasting from Cairo</p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-arcturus transition-colors hover:text-starlight"
            >
              All projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
