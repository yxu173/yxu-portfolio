"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useCosmicAudio } from "@/components/audio/cosmic-audio";

type ConstellationGroup = {
  name: string;
  color: string;
  soft: string;
  labelX: number;
  path: string;
  stars: { name: string; reason: string; x: number; y: number }[];
};

const GROUPS: ConstellationGroup[] = [
  {
    name: "THE BACKEND",
    color: "#67e8f9",
    soft: "rgba(103,232,249,0.5)",
    labelX: 165,
    path: "M70,118 L210,84 L262,172 L170,204 L92,262 L224,292",
    stars: [
      { name: ".NET", reason: "Boring, fast APIs that hold 99.95% uptime.", x: 70, y: 118 },
      { name: "PostgreSQL", reason: "The source of truth — schemas I actually maintain.", x: 210, y: 84 },
      { name: "Redis", reason: "Caching and queues; 58% of LLM spend saved.", x: 262, y: 172 },
      { name: "SignalR", reason: "Live streams without polling the world.", x: 170, y: 204 },
      { name: "Docker", reason: "Same box locally, in staging and in prod.", x: 92, y: 262 },
      { name: "Linux", reason: "Arch daily driver since 2021.", x: 224, y: 292 },
    ],
  },
  {
    name: "THE MIND",
    color: "#f0abfc",
    soft: "rgba(240,171,252,0.5)",
    labelX: 425,
    path: "M342,124 L472,88 L522,196 L402,226 L322,266 L484,300",
    stars: [
      { name: "Mastra", reason: "Agent orchestration and evals in one loop.", x: 342, y: 124 },
      { name: "Vercel AI SDK", reason: "Streaming chat and tool calls without glue.", x: 472, y: 88 },
      { name: "pgvector", reason: "Hybrid search over 12k docs in under 800ms.", x: 522, y: 196 },
      { name: "RAG", reason: "Answers that cite sources, not vibes.", x: 402, y: 226 },
      { name: "Evals", reason: "120-case suites before anything ships.", x: 322, y: 266 },
      { name: "Agents", reason: "Budgets, approval gates and a critic that stops loops.", x: 484, y: 300 },
    ],
  },
  {
    name: "THE SURFACE",
    color: "#a5b4fc",
    soft: "rgba(165,180,252,0.5)",
    labelX: 680,
    path: "M596,132 L726,96 L688,228 L596,132",
    stars: [
      { name: "TypeScript", reason: "End-to-end types from database to UI.", x: 596, y: 132 },
      { name: "Next.js", reason: "App Router and RSC for fast dashboards.", x: 726, y: 96 },
      { name: "Tailwind", reason: "Cosmic UI, iterated in minutes not days.", x: 688, y: 228 },
    ],
  },
];

const FIELD_STARS = (() => {
  let s = 0xc0ffee;
  const rand = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
  return Array.from({ length: 58 }, (_, i) => ({
    id: i,
    x: Math.round(rand() * 800 * 10) / 10,
    y: Math.round(rand() * 420 * 10) / 10,
    r: Math.round((rand() * 1.1 + 0.25) * 100) / 100,
    o: Math.round((rand() * 0.4 + 0.12) * 100) / 100,
  }));
})();

const ALL_STARS = GROUPS.flatMap((group, groupIndex) =>
  group.stars.map((star, starIndex) => ({
    ...star,
    groupIndex,
    color: group.color,
    soft: group.soft,
    note: groupIndex * 6 + starIndex,
  }))
);

export function SkillConstellation() {
  const { playNote } = useCosmicAudio();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const lastNote = useRef(0);

  const ring = useCallback(
    (note: number, velocity = 0.4) => {
      const now = Date.now();
      if (now - lastNote.current < 150) return;
      lastNote.current = now;
      playNote(note, { velocity, duration: 0.75 });
    },
    [playNote]
  );

  const activate = (index: number) => {
    setActive(index);
    const star = ALL_STARS[index];
    if (star) ring(star.note);
  };

  const activeStar = active !== null ? ALL_STARS[active] : null;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur">
      <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-[80px]" />
      <div className="pointer-events-none absolute right-0 top-10 h-64 w-64 rounded-full bg-fuchsia-600/10 blur-[90px]" />
      <div className="relative overflow-x-auto p-3 sm:p-5">
        <div className="min-w-[680px]">
          <svg
            viewBox="0 0 800 420"
            role="img"
            aria-label="Star map of Mohamed Samir's technical stack across backend, AI and frontend constellations"
            className="block h-auto w-full"
          >
            <defs>
              <radialGradient id="sky-glow" cx="50%" cy="46%" r="62%">
                <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.75" />
                <stop offset="55%" stopColor="#12042b" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#0b011a" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="star-halo-cyan" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="star-halo-fuchsia" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f0abfc" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#f0abfc" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="star-halo-indigo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="sky-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#f0abfc" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.45" />
              </linearGradient>
            </defs>

            <rect width="800" height="420" rx="18" fill="#080015" />
            <rect width="800" height="420" rx="18" fill="url(#sky-glow)" />

            <g aria-hidden="true">
              {FIELD_STARS.map((star) => (
                <circle key={star.id} cx={star.x} cy={star.y} r={star.r} fill="#e0e7ff" opacity={star.o} />
              ))}
            </g>

            {GROUPS.map((group) => (
              <g key={group.name}>
                <text
                  x={group.labelX}
                  y={28}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="700"
                  letterSpacing="3.5"
                  fill={group.color}
                  opacity="0.9"
                  fontFamily="ui-monospace, monospace"
                >
                  {group.name}
                </text>
                <motion.path
                  d={group.path}
                  fill="none"
                  stroke={group.soft}
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.75 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                />
              </g>
            ))}

            {ALL_STARS.map((star, index) => {
              const isActive = active === index;
              const halo =
                star.groupIndex === 0 ? "url(#star-halo-cyan)" : star.groupIndex === 1 ? "url(#star-halo-fuchsia)" : "url(#star-halo-indigo)";
              return (
                <g
                  key={star.name}
                  tabIndex={0}
                  role="button"
                  aria-label={`${star.name}. ${star.reason}`}
                  aria-pressed={isActive}
                  onMouseEnter={() => activate(index)}
                  onMouseLeave={() => setActive((current) => (current === index ? null : current))}
                  onFocus={() => activate(index)}
                  onBlur={() => setActive((current) => (current === index ? null : current))}
                  onClick={() => activate(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      activate(index);
                    }
                  }}
                  className="cursor-pointer outline-none"
                >
                  <circle cx={star.x} cy={star.y} r="22" fill="transparent" />
                  <circle cx={star.x} cy={star.y} r={isActive ? 26 : 17} fill={halo} opacity={isActive ? 0.95 : 0.45} className="transition-all duration-300" />
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r={isActive ? 5.6 : 4}
                    fill={isActive ? "#ffffff" : star.color}
                    className={`transition-all duration-300 ${reduce ? "" : "skill-twinkle"}`}
                    style={{ animationDelay: `${(index % 7) * 0.42}s`, animationDuration: `${3 + (index % 4) * 0.5}s` }}
                  />
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r="11"
                    fill="none"
                    stroke={star.color}
                    strokeWidth={isActive ? 1.6 : 0}
                    strokeOpacity="0.85"
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}

            {activeStar ? (
              <>
                <text
                  x={activeStar.x}
                  y={activeStar.y - 18}
                  textAnchor="middle"
                  fontSize="11.5"
                  fontWeight="600"
                  fill="#ffffff"
                  fontFamily="ui-monospace, monospace"
                  pointerEvents="none"
                >
                  {activeStar.name}
                </text>
                <foreignObject
                  x={Math.min(592, Math.max(8, activeStar.x - 105))}
                  y={activeStar.y > 130 ? activeStar.y - 86 : activeStar.y + 28}
                  width="210"
                  height="60"
                  pointerEvents="none"
                >
                  <div
                    className="rounded-xl border border-white/15 bg-[#160831]/95 px-3 py-2 font-mono text-[10px] leading-snug text-slate-200 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur"
                  >
                    <span className="mb-1 block text-[9px] uppercase tracking-[0.18em]" style={{ color: activeStar.color }}>
                      {activeStar.name}
                    </span>
                    {activeStar.reason}
                  </div>
                </foreignObject>
              </>
            ) : null}
          </svg>
        </div>
      </div>

      <div className="relative flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-3 sm:px-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          hover the stars — every skill has a note
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-indigo-300/70">15 stars · 3 constellations</p>
      </div>
    </div>
  );
}
