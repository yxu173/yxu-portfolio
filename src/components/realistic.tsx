"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CircleDot, GitBranch, Search, Bell, Plus, Send, Zap, Database, CheckCircle2 } from "lucide-react";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

function BrowserChrome({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-white/15 bg-[#0a0e24] shadow-2xl", className)}>
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 hidden sm:block truncate rounded-md bg-black/40 px-2.5 py-1 font-mono text-[10px] text-slate-400">{title}</span>
        <span className="ml-auto flex items-center gap-2 text-slate-500"><Search size={11} /><Bell size={11} /></span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

function Sidebar() {
  const items = ["Overview", "Agents", "Knowledge", "Whiteboard", "Tasks", "Evals"];
  return (
    <div className="hidden sm:flex w-28 shrink-0 flex-col gap-1 border-r border-white/10 bg-black/30 p-2">
      <div className="mb-1 flex items-center gap-1.5 px-1.5 py-1">
        <span className="grid h-5 w-5 place-items-center rounded-md bg-gradient-to-br from-indigo-500 to-fuchsia-600 text-[10px] font-bold text-white">Y</span>
        <span className="text-[10px] font-semibold text-white">yxuOS</span>
      </div>
      {items.map((it, i) => (
        <span key={it} className={cn("rounded-md px-2 py-1.5 text-[10px]", i === 1 ? "bg-indigo-600/40 text-white" : "text-slate-500")}>{it}</span>
      ))}
      <span className="mt-auto rounded-md bg-emerald-500/10 border border-emerald-400/20 px-2 py-1.5 text-[9px] text-emerald-300">● All systems live</span>
    </div>
  );
}

export function RealisticMockup({ project, className }: { project: Project; className?: string }) {
  if (project.slug === "yxuos") {
    return (
      <BrowserChrome title="yxuos.app/agents — Beta" className={className}>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-3">
            <div className="flex items-center justify-between">
              <div><p className="text-[11px] font-semibold text-white">Agent runs <span className="ml-1 rounded-full bg-indigo-500/20 px-1.5 py-0.5 text-[9px] text-indigo-200">live</span></p>
              <p className="text-[9px] text-slate-500">Sprint 24 • 14 tasks auto-dispatched</p></div>
              <span className="flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2 py-1 text-[9px] text-slate-300"><Plus size={10} /> New run</span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[["Planner", "92%", "emerald"], ["Architect", "7 PRs", "indigo"], ["Dispatcher", "14 tasks", "fuchsia"]].map(([t, v]) => (
                <div key={t} className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
                  <p className="text-[9px] text-slate-500">{t}</p>
                  <p className="text-[12px] font-semibold text-white">{v}</p>
                  <div className="mt-1 h-1 rounded bg-white/10"><div className="h-1 w-3/4 rounded bg-gradient-to-r from-indigo-500 to-fuchsia-500" /></div>
                </div>
              ))}
            </div>
            <div className="mt-2 rounded-lg border border-indigo-400/25 bg-indigo-500/[0.07] p-2">
              <p className="flex items-center gap-1 text-[9px] text-indigo-200"><Zap size={9} /> Architect review — auth-service PR #214</p>
              <p className="mt-1 text-[9px] leading-relaxed text-slate-400">Violates ADR-011 (no direct DB from API). Suggested: move to <span className="font-mono text-indigo-200">UserRepository</span> + add RLS policy. <span className="text-emerald-300">Auto-fix ready.</span></p>
              <div className="mt-1.5 flex gap-1.5">
                <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[9px] text-white">Apply fix</span>
                <span className="rounded-full border border-white/15 px-2 py-0.5 text-[9px] text-slate-300">View diff</span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1.5">
              <span className="text-[9px] text-slate-500">Ask yxuOS…</span>
              <span className="ml-auto grid h-5 w-5 place-items-center rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white"><Send size={9} /></span>
            </div>
          </div>
        </div>
      </BrowserChrome>
    );
  }
  if (project.slug === "zynda") {
    return (
      <BrowserChrome title="zynda.dev/graph — run #4821" className={className}>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-white">Research team <span className="font-mono text-[9px] text-slate-500">4 agents • $0.038</span></p>
            <span className="flex items-center gap-1 text-[9px] text-emerald-300"><CircleDot size={9} /> streaming</span>
          </div>
          <svg viewBox="0 0 300 90" className="mt-2 w-full rounded-lg border border-white/10 bg-black/30">
            <g stroke="rgba(129,140,248,0.5)" strokeWidth="1">
              <line x1="40" y1="45" x2="110" y2="20" /><line x1="40" y1="45" x2="110" y2="70" />
              <line x1="110" y1="20" x2="190" y2="45" /><line x1="110" y1="70" x2="190" y2="45" /><line x1="190" y1="45" x2="260" y2="45" />
            </g>
            {[["40", "45", "Goal"], ["110", "20", "Research"], ["110", "70", "Code"], ["190", "45", "Critic"], ["260", "45", "Ship"]].map(([x, y, l]) => (
              <g key={l}>
                <circle cx={x} cy={y} r="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.2" />
                <circle cx={x} cy={y} r="3" fill="#a5b4fc"><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" /></circle>
                <text x={x} y={Number(y) + 22} textAnchor="middle" fontSize="7" fill="#94a3b8">{l}</text>
              </g>
            ))}
          </svg>
          <div className="mt-2 space-y-1.5 font-mono text-[9px] leading-relaxed">
            <p className="rounded-md bg-black/40 border border-white/10 p-1.5 text-slate-400"><span className="text-cyan-300">researcher ›</span> 14 sources scanned, 3 contradict. Keeping newest…</p>
            <p className="rounded-md bg-indigo-600/15 border border-indigo-400/25 p-1.5 text-indigo-100"><span className="text-fuchsia-300">critic ›</span> code passes 11/12 checks. Fix retry budget, then ship.</p>
          </div>
        </div>
      </BrowserChrome>
    );
  }
  if (project.slug === "multi-ai-chat-api") {
    return (
      <BrowserChrome title="POST /v1/chat/completions — 200 • 182ms" className={className}>
        <div className="grid sm:grid-cols-2">
          <div className="border-r border-white/10 bg-black/50 p-3 font-mono text-[9.5px] leading-relaxed">
            <p className="text-slate-500">{"// one client, every model"}</p>
            <p><span className="text-fuchsia-300">const</span> <span className="text-white">res</span> <span className="text-slate-500">=</span> <span className="text-cyan-300">await</span> <span className="text-white">openai.chat.completions.create</span><span className="text-slate-400">({"{"}</span></p>
            <p className="pl-3 text-slate-300">model: <span className="text-emerald-300">{'\"auto:balanced\"'}</span>,</p>
            <p className="pl-3 text-slate-300">messages, stream: <span className="text-cyan-300">true</span></p>
            <p className="text-slate-400">{"});"}</p>
            <div className="mt-2 grid grid-cols-3 gap-1.5 text-center">
              {[["p50", "182ms"], ["cache hit", "58%"], ["uptime", "99.95%"]].map(([k, v]) => (
                <div key={k} className="rounded-md border border-white/10 bg-white/[0.04] p-1.5"><p className="text-[11px] font-bold text-white">{v}</p><p className="text-[8px] text-slate-500">{k}</p></div>
              ))}
            </div>
          </div>
          <div className="p-3">
            <p className="flex items-center gap-1 text-[10px] text-slate-300"><GitBranch size={10} className="text-indigo-300" /> fallback chain <span className="ml-auto text-[9px] text-emerald-300">healthy</span></p>
            <div className="mt-2 space-y-1.5 text-[10px]">
              {[["gpt-5-mini", "primary • 41ms", "w-11/12 border-emerald-400/40"], ["claude-haiku", "standby", "w-2/3"], ["llama-3.3-70b", "standby", "w-1/2"]].map(([m, s]) => (
                <div key={m} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5">
                  <span className="font-mono text-slate-200">{m}</span><span className="text-[9px] text-slate-500">{s}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 flex items-center gap-1 text-[9px] text-slate-500"><Database size={9} /> semantic cache • Redis vector • TTL 24h</p>
          </div>
        </div>
      </BrowserChrome>
    );
  }
  return (
    <BrowserChrome title="internships.eg — 62 open roles" className={className}>
      <div className="p-3">
        <div className="flex gap-1.5">
          <span className="flex-1 rounded-full border border-white/10 bg-black/40 px-2.5 py-1.5 text-[9px] text-slate-500">Search “backend intern Cairo”…</span>
          <span className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 px-2.5 py-1.5 text-[9px] text-white">Match me</span>
        </div>
        <div className="mt-2 space-y-1.5">
          {[["Backend Intern — Paymob", "Cairo • Hybrid • 94% match", true], ["Frontend Trainee — Vezeeta", "Remote • 88% match", false], ["ML Intern — WideBot", "Cairo • 86% match", false]].map(([t, s, hot]) => (
            <div key={t as string} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 text-[10px] font-bold text-white">{(t as string)[0]}</span>
              <span><span className="block text-[10px] font-medium text-white">{t as string} {hot ? <span className="ml-1 rounded-full bg-emerald-500/20 px-1.5 text-[8px] text-emerald-300">HOT</span> : null}</span>
              <span className="block text-[9px] text-slate-500">{s as string}</span></span>
              <CheckCircle2 size={13} className="ml-auto text-indigo-300" />
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

export function CoverImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover transition-transform duration-700 hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B011A] via-transparent to-transparent" />
    </div>
  );
}

export function Stat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.5 }} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center backdrop-blur">
      <p className="bg-gradient-to-r from-indigo-200 via-white to-fuchsia-200 bg-clip-text text-2xl font-bold text-transparent">{value}</p>
      <p className="mt-1 text-[11px] text-slate-400">{label}</p>
    </motion.div>
  );
}
