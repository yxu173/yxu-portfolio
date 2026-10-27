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
    name: "The backend",
    color: "#9FB8FF",
    soft: "rgba(159,184,255,0.5)",
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
    name: "The mind",
    color: "#F2A541",
    soft: "rgba(242,165,65,0.5)",
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
    name: "The surface",
    color: "#ECE8DF",
    soft: "rgba(236,232,223,0.5)",
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
    <div className="overflow-hidden rounded-lg border border-white/10 bg-hull">
      <div className="overflow-x-auto p-3 sm:p-5">
        <div className="min-w-[680px]">
          <svg
            viewBox="0 0 800 420"
            role="img"
            aria-label="Star map of Mohamed Samir's technical stack across backend, AI and frontend constellations"
            className="block h-auto w-full"
          >

            <rect width="800" height="420" rx="8" fill="#070A12" />

            <g aria-hidden="true">
              {FIELD_STARS.map((star) => (
                <circle key={star.id} cx={star.x} cy={star.y} r={star.r} fill="#ECE8DF" opacity={star.o} />
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
                  fill={group.color}
                  opacity="0.9"
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
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r={isActive ? 5.6 : 4}
                    fill={star.color}
                    className="transition-all duration-300"
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
                  fill="#ECE8DF"
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
                  <div className="rounded-lg border border-white/15 bg-hull-2 px-3 py-2 text-[11px] leading-snug text-starlight">
                    <span className="mb-1 block text-[11px] font-medium" style={{ color: activeStar.color }}>
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

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-3 sm:px-5">
        <p className="text-[12px] text-dust">Hover the stars, every skill has a note</p>
        <p className="text-[12px] text-dust">15 stars in 3 constellations</p>
      </div>
    </div>
  );
}
