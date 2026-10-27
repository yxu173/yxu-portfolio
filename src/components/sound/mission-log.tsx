"use client";

import Link from "next/link";
import { ArrowRight, Radio, Signal } from "lucide-react";

type MissionItem = {
  role: string;
  company: string;
  period: string;
  location?: string;
  points: string[];
};

export function MissionLog({ items }: { items: MissionItem[] }) {
  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-600/15 blur-[70px]" />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-indigo-300">
            <Radio size={12} /> Experience
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">Where I&apos;ve been useful</h3>
        </div>
        <Link
          href="/about"
          className="mt-1 inline-flex shrink-0 items-center gap-1 text-[12px] text-indigo-300 transition hover:text-white"
        >
          Full story <ArrowRight size={13} />
        </Link>
      </div>

      <div className="relative mt-6 pl-7">
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-fuchsia-400/70 via-indigo-400/50 to-cyan-400/20" />

        <div className="space-y-6">
          {items.map((item, index) => {
            const isNow = index === 0;
            const frequency = `FM ${(88.1 + index * 4.7).toFixed(1)}`;
            return (
              <div key={`${item.role}-${item.period}`} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-7 top-1 grid h-4 w-4 place-items-center rounded-full border ${
                    isNow
                      ? "border-fuchsia-300/70 bg-fuchsia-500/25 shadow-[0_0_16px_rgba(232,121,249,0.5)]"
                      : "border-indigo-300/50 bg-[#0B011A] shadow-[0_0_12px_rgba(99,102,241,0.35)]"
                  }`}
                >
                  {isNow ? <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400/60" /> : null}
                  <span className={`relative h-1.5 w-1.5 rounded-full ${isNow ? "bg-fuchsia-200" : "bg-indigo-300"}`} />
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300/90">
                    <Signal size={10} /> {frequency}
                  </span>
                  {isNow ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-200">
                      <span className="h-1 w-1 rounded-full bg-emerald-300" /> Now
                    </span>
                  ) : null}
                </div>

                <p className="mt-1.5 text-[13.5px] font-medium text-white">{item.role}</p>
                <p className="text-[12px] text-indigo-200/80">
                  {item.company} <span className="text-slate-600">•</span> {item.period}
                  {item.location ? <span className="text-slate-500"> · {item.location}</span> : null}
                </p>
                <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-slate-400">{item.points[0]}</p>
              </div>
            );
          })}
        </div>
      </div>

      <p className="relative mt-6 border-t border-white/[0.07] pt-3 font-mono text-[9.5px] uppercase tracking-[0.2em] text-slate-600">
        yxu.fm · tuning in since 2020
      </p>
    </div>
  );
}
