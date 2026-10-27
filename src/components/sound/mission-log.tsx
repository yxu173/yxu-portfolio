"use client";

import Link from "next/link";
import { Radio, Signal } from "lucide-react";

type MissionItem = {
  role: string;
  company: string;
  period: string;
  location?: string;
  points: string[];
};

export function MissionLog({ items }: { items: MissionItem[] }) {
  return (
    <div className="h-full rounded-lg border border-white/10 bg-hull p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-1.5 text-[13px] text-arcturus">
            <Radio size={13} /> Experience
          </p>
          <h3 className="font-wide mt-1 text-lg font-semibold text-starlight">Where I&apos;ve been useful</h3>
        </div>
        <Link
          href="/about"
          className="mt-1 inline-flex shrink-0 items-center gap-1 text-[12px] text-arcturus transition-colors hover:text-starlight"
        >
          Full story
        </Link>
      </div>

      <div className="relative mt-6 pl-7">
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10" />

        <div className="space-y-6">
          {items.map((item, index) => {
            const isNow = index === 0;
            const frequency = `FM ${(88.1 + index * 4.7).toFixed(1)}`;
            return (
              <div key={`${item.role}-${item.period}`} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-7 top-1 grid h-4 w-4 place-items-center rounded-full border ${
                    isNow ? "border-arcturus bg-arcturus/20" : "border-white/25 bg-hull"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${isNow ? "bg-arcturus" : "bg-dust"}`} />
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-dust">
                    <Signal size={10} /> {frequency}
                  </span>
                  {isNow ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-arcturus/40 bg-arcturus/10 px-2 py-0.5 text-[11px] text-arcturus">
                      Now
                    </span>
                  ) : null}
                </div>

                <p className="mt-1.5 text-[13.5px] font-medium text-starlight">{item.role}</p>
                <p className="text-[12px] text-dust">
                  {item.company}, {item.period}
                  {item.location ? `, ${item.location}` : null}
                </p>
                <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-dust">{item.points[0]}</p>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-6 border-t border-white/10 pt-3 text-[12px] text-dust/70">
        yxu.fm, tuning in since 2021
      </p>
    </div>
  );
}
