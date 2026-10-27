"use client";

import { Search, Bell, Send, CheckCircle2 } from "lucide-react";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

function BrowserChrome({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-white/15 bg-space", className)}>
      <div className="flex items-center gap-2 border-b border-white/10 bg-hull px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-2 hidden sm:block truncate rounded-md bg-space px-2.5 py-1 font-mono text-[10px] text-dust">{title}</span>
        <span className="ml-auto flex items-center gap-2 text-dust"><Search size={11} /><Bell size={11} /></span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

function Sidebar() {
  const items = ["Boards", "Designs", "Research", "Plans", "Tasks", "Brain"];
  return (
    <div className="hidden sm:flex w-28 shrink-0 flex-col gap-1 border-r border-white/10 bg-hull p-2">
      <div className="mb-1 flex items-center gap-1.5 px-1.5 py-1">
        <span className="grid h-5 w-5 place-items-center rounded-md bg-arcturus text-[10px] font-bold text-primary-foreground">Y</span>
        <span className="text-[10px] font-semibold text-starlight">yxuOS</span>
      </div>
      {items.map((it, i) => (
        <span key={it} className={cn("rounded-md px-2 py-1.5 text-[10px]", i === 0 ? "bg-arcturus/15 text-arcturus" : "text-dust")}>{it}</span>
      ))}
      <span className="mt-auto rounded-md border border-white/10 px-2 py-1.5 text-[9px] text-dust">Team: Orbit Labs</span>
    </div>
  );
}

export function RealisticMockup({ project, className }: { project: Project; className?: string }) {
  if (project.slug === "yxuos") {
    return (
      <BrowserChrome title="yxu-os.vercel.app/boards/auth-flow" className={className}>
        <div className="flex">
          <Sidebar />
          <div className="flex min-w-0 flex-1">
            <div className="flex-1 p-3">
              <p className="text-[11px] font-semibold text-starlight">Auth flow</p>
              <p className="text-[9px] text-dust">Whiteboard, edited by you and the board agent</p>
              <svg viewBox="0 0 220 120" className="mt-2 w-full rounded-lg border border-white/10 bg-hull">
                <g stroke="rgba(159,184,255,0.55)" strokeWidth="1" fill="none">
                  <path d="M55 30 H95" /><path d="M145 30 H170 V75" /><path d="M120 42 V75" /><path d="M145 90 H170" />
                </g>
                {[[10, 18, 45, "Client"], [95, 18, 50, "API"], [95, 75, 50, "Auth"], [150, 75, 55, "Postgres"]].map(([x, y, w, l]) => (
                  <g key={l as string}>
                    <rect x={x as number} y={y as number} width={w as number} height="24" rx="4" fill="#161c2b" stroke="#ece8df" strokeOpacity="0.35" />
                    <text x={(x as number) + (w as number) / 2} y={(y as number) + 15} textAnchor="middle" fontSize="8" fill="#ece8df">{l}</text>
                  </g>
                ))}
                <rect x="10" y="62" width="60" height="44" rx="3" fill="#f2a541" fillOpacity="0.85" />
                <text x="16" y="76" fontSize="7" fill="#1a1206">Session in</text>
                <text x="16" y="86" fontSize="7" fill="#1a1206">httpOnly cookie,</text>
                <text x="16" y="96" fontSize="7" fill="#1a1206">not localStorage</text>
              </svg>
            </div>
            <div className="hidden w-32 shrink-0 flex-col gap-1.5 border-l border-white/10 bg-hull p-2 sm:flex">
              <p className="text-[9px] font-medium text-starlight">Board agent</p>
              <p className="rounded-md bg-white/[0.05] p-1.5 text-[9px] leading-relaxed text-starlight/85">Diagram the login flow with a note on sessions</p>
              <p className="rounded-md border border-arcturus/30 bg-arcturus/[0.07] p-1.5 text-[9px] leading-relaxed text-dust">
                <span className="text-arcturus">Added 4 shapes, 4 arrows</span> and a sticky note. Grouped under &ldquo;Auth flow&rdquo;.
              </p>
              <div className="mt-auto flex items-center gap-1 rounded-full border border-white/10 bg-space px-2 py-1">
                <span className="text-[9px] text-dust">Ask the agent</span>
                <span className="ml-auto grid h-4 w-4 place-items-center rounded-full bg-arcturus text-primary-foreground"><Send size={8} /></span>
              </div>
            </div>
          </div>
        </div>
      </BrowserChrome>
    );
  }
  if (project.slug === "yxu-code") {
    return (
      <div className={cn("overflow-hidden rounded-lg border border-white/15 bg-space font-mono text-[9.5px] leading-relaxed", className)}>
        <div className="flex items-center justify-between border-b border-white/10 bg-hull px-3 py-2">
          <span className="text-rigel">⟡ yxu <span className="text-dust">feature, opus</span></span>
          <span className="tracking-[0.3em]"><span className="text-rigel">✦✦✦</span><span className="text-dust/50">··</span></span>
        </div>
        <div className="space-y-1.5 p-3">
          <p className="text-rigel">▹ <span className="text-starlight">add rate limiting to the API</span></p>
          <p className="text-starlight/90">◈ Plan: scout the middleware, build in parallel, then tests and review.</p>
          <p className="text-dust"><span className="text-dust/60">◉</span> scout <span className="text-dust/60">opencode</span> found 6 call sites in src/http</p>
          <p className="text-starlight/85"><span className="text-rigel">◴</span> builder <span className="text-dust/60">claude</span> limiter + config, 3 files</p>
          <p className="text-starlight/85"><span className="text-rigel">◷</span> tester <span className="text-dust/60">cmd</span> 12 cases for burst and reset</p>
          <p className="text-dust"><span className="text-dust/60">◉</span> verify <span className="text-dust/60">bun test</span> 191 passed</p>
          <div className="mt-2 rounded-md border border-arcturus/40 bg-arcturus/[0.07] p-2">
            <p className="text-arcturus">△ decision required</p>
            <p className="mt-0.5 text-dust">
              <span className="text-starlight">[a]</span> apply <span className="text-starlight">[v]</span> view diff <span className="text-starlight">[l]</span> later <span className="text-starlight">[x]</span> discard
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (project.slug === "zynda") {
    return (
      <BrowserChrome title="app.zynda.ai/chat" className={className}>
        <div className="space-y-2 p-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-starlight">Q3 launch prep</p>
            <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] text-dust">Agent mode</span>
          </div>
          <p className="ml-auto max-w-[80%] rounded-md bg-white/[0.06] p-2 text-[9.5px] leading-relaxed text-starlight/90">
            Research our top 3 competitors, make a 6-slide deck, and send it to #launch on Slack.
          </p>
          <div className="flex flex-wrap items-center gap-1.5 text-[9px]">
            <span className="text-dust">Router</span>
            {["Research", "Document", "Integration"].map((lane, i) => (
              <span key={lane} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-dust/50">/</span>}
                <span className={cn("rounded-full border px-2 py-0.5", i < 2 ? "border-white/15 text-starlight/85" : "border-arcturus/40 text-arcturus")}>
                  {i < 2 && <CheckCircle2 size={8} className="mr-1 inline" />}
                  {lane}
                </span>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-md border border-white/10 bg-hull p-2">
            <span className="grid h-7 w-6 place-items-center rounded-sm bg-arcturus/20 text-[7px] font-semibold text-arcturus">PPTX</span>
            <div className="min-w-0">
              <p className="truncate text-[9.5px] text-starlight">Competitor landscape.pptx</p>
              <p className="text-[8.5px] text-dust">6 slides, 14 cited sources, QA passed</p>
            </div>
          </div>
          <div className="rounded-md border border-arcturus/30 bg-arcturus/[0.07] p-2">
            <p className="text-[9px] text-arcturus">Slack, #launch: ready to send</p>
            <p className="mt-0.5 text-[9px] text-dust">Preview the message and attachment before anything is posted.</p>
            <div className="mt-1.5 flex gap-1.5">
              <span className="rounded-full bg-arcturus px-2 py-0.5 text-[9px] text-primary-foreground">Send to #launch</span>
              <span className="rounded-full border border-white/15 px-2 py-0.5 text-[9px] text-starlight/85">Edit message</span>
            </div>
          </div>
        </div>
      </BrowserChrome>
    );
  }
  if (project.slug === "scy-ai") {
    return (
      <BrowserChrome title="scy-ai-mu.vercel.app" className={className}>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-starlight">Open-weight models</p>
              <p className="text-[9px] text-dust">Tracker, 8 sources, refreshed this morning</p>
            </div>
            <span className="rounded-full border border-arcturus/40 px-2 py-0.5 text-[9px] text-arcturus">12 new</span>
          </div>
          <div className="mt-2 space-y-1.5">
            {[
              ["Hugging Face Blog", "A new open-weight model tops the coding leaderboard", "94"],
              ["arXiv cs.CL", "Long-context retrieval without the memory cost", "88"],
              ["The Decoder", "What the latest licence change means for builders", "81"],
            ].map(([source, title, score]) => (
              <div key={title} className="flex items-start gap-2 rounded-md border border-white/10 bg-hull p-2">
                <div className="min-w-0 flex-1">
                  <p className="text-[8.5px] text-rigel">{source}</p>
                  <p className="truncate text-[9.5px] text-starlight/90">{title}</p>
                </div>
                <span className="font-mono text-[9px] text-arcturus">{score}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1.5 rounded-full border border-white/10 bg-hull px-2.5 py-1.5">
            <span className="text-[9px] text-dust">Ask about your resources or adjust a tracker</span>
            <span className="ml-auto grid h-5 w-5 place-items-center rounded-full bg-arcturus text-primary-foreground"><Send size={9} /></span>
          </div>
        </div>
      </BrowserChrome>
    );
  }
  return (
    <BrowserChrome title="internships.eg, 62 open roles" className={className}>
      <div className="p-3">
        <div className="flex gap-1.5">
          <span className="flex-1 rounded-full border border-white/10 bg-hull px-2.5 py-1.5 text-[9px] text-dust">Search “backend intern Cairo”…</span>
          <span className="rounded-full bg-arcturus px-2.5 py-1.5 text-[9px] text-primary-foreground">Match me</span>
        </div>
        <div className="mt-2 space-y-1.5">
          {[["Backend Intern — Paymob", "Cairo, hybrid, 94% match", true], ["Frontend Trainee — Vezeeta", "Remote, 88% match", false], ["ML Intern — WideBot", "Cairo, 86% match", false]].map(([t, s, hot]) => (
            <div key={t as string} className="flex items-center gap-2 rounded-lg border border-white/10 bg-hull p-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-hull-2 text-[10px] font-bold text-rigel">{(t as string)[0]}</span>
              <span><span className="block text-[10px] font-medium text-starlight">{t as string} {hot ? <span className="ml-1 rounded-full bg-arcturus/15 px-1.5 text-[8px] text-arcturus">Hot</span> : null}</span>
              <span className="block text-[9px] text-dust">{s as string}</span></span>
              <CheckCircle2 size={13} className="ml-auto text-arcturus" />
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}
