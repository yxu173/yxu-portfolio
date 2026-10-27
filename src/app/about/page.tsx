"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, ArrowRight, MapPin, GraduationCap, Briefcase, Award, Crown, Box, BookOpen, Terminal, Building2, FlaskConical, Cpu, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem, SectionHeading } from "@/components/motion";
import { ContributionMap } from "@/components/real-home";
import { experience, skills, journey } from "@/lib/data";

const interests = [
  { icon: Crown, label: "Chess", note: "1400 rapid" },
  { icon: Box, label: "Rubik's", note: "sub-45s" },
  { icon: BookOpen, label: "Reading", note: "systems + sci-fi" },
  { icon: Terminal, label: "Linux", note: "Arch + Hyprland" },
  { icon: Building2, label: "Building", note: "always shipping" },
  { icon: FlaskConical, label: "Research", note: "agents + evals" },
  { icon: Cpu, label: "Hardware", note: "homelab tinkerer" },
  { icon: Orbit, label: "Space", note: "cosmos enjoyer" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-2">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.22em] text-indigo-300">About — the human behind YXU</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-white">Mohamed Samir</h1>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-[14px] text-slate-300">
            Software Engineer <span className="text-slate-600">•</span> <span className="flex items-center gap-1"><MapPin size={13} /> Cairo, Egypt</span>
          </p>
          <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-slate-400">
            I&apos;m a backend-leaning engineer who fell into AI systems because clients kept asking “can it read our docs and just do it?” For 4 years I built APIs, queues and dashboards. For the last 2 I&apos;ve specialized in making LLMs useful in production: RAG with citations, agents with budgets, evals that block bad deploys.
          </p>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-slate-400">
            Off-screen: chess, Rubik&apos;s cube, Arabic coffee, night drives, and an Arch setup I&apos;ve been ricing since 2021. I write monthly notes on what actually worked — no hype threads.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="/resume.pdf" download><Button><Download size={14} /> Resume (PDF)</Button></a>
            <Link href="/contact"><Button variant="secondary">Work with me <ArrowRight size={14} /></Button></Link>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2.5 max-w-md">
            {[["4+", "years"], ["20+", "projects"], ["3", "open-source"]].map(([v, l]) => (
              <div key={l} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center"><p className="text-lg font-bold text-white">{v}</p><p className="text-[10px] text-slate-500">{l}</p></div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="space-y-4">
          <div className="relative h-72 overflow-hidden rounded-3xl border border-white/10">
            <Image src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=1200&auto=format&fit=crop" alt="Night sky over desert — Cairo" fill sizes="(max-width: 768px) 100vw, 560px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B011A] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div><p className="text-[13px] font-medium text-white">Cairo nights → deep work</p><p className="font-mono text-[11px] text-slate-400">EET (UTC+2) • async-first</p></div>
              <span className="rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] text-slate-200 backdrop-blur">✦ est. 2020</span>
            </div>
          </div>
          <ContributionMap />
        </Reveal>
      </div>

      {/* experience */}
      <section className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading eyebrow="Experience" title="Work that taught me production" />
          <div className="mt-5 space-y-4">
            {experience.map((e, i) => (
              <Reveal key={e.role} delay={i * 0.06} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/25 to-fuchsia-500/15 text-indigo-200">
                    {i === 0 ? <Briefcase size={17} /> : i === 1 ? <Terminal size={17} /> : <GraduationCap size={17} />}
                  </span>
                  <div>
                    <p className="text-[14.5px] font-semibold text-white">{e.role}</p>
                    <p className="text-[12.5px] text-indigo-200/80">{e.company} • {e.period} • {e.location}</p>
                    <ul className="mt-2 space-y-1.5">
                      {e.points.map((pt) => (
                        <li key={pt} className="text-[13px] leading-relaxed text-slate-400">• {pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Skills" title="Honest proficiency" desc="Levels = can ship alone + on-call it. 90+ means I've debugged it at 2am." />
          <div className="mt-5 space-y-4">
            {skills.map((g) => (
              <Reveal key={g.group} className="rounded-2xl border border-white/10 bg-[#0F112A]/70 p-5">
                <p className="text-[13px] font-semibold text-white">{g.group}</p>
                <div className="mt-3 space-y-2.5">
                  {g.items.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-[12px]"><span className="text-slate-300">{s.name}</span><span className="font-mono text-slate-500">{s.level}%</span></div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-4 flex items-center gap-2.5 rounded-2xl border border-amber-400/20 bg-amber-500/[0.06] p-4 text-[12.5px] text-amber-100/90">
            <Award size={16} className="shrink-0 text-amber-300" /> Open to senior backend / AI-platform roles + select freelance. References on request.
          </Reveal>
        </div>
      </section>

      {/* journey + interests */}
      <section className="mt-12 grid gap-5 lg:grid-cols-2">
        <Reveal className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="text-[15px] font-semibold text-white">Journey</h3>
          <div className="mt-4 relative ml-1 border-l border-indigo-500/30 pl-6 space-y-5">
            {journey.map((j, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <span className="absolute -left-[5px] h-2.5 w-2.5 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]" style={{ marginTop: 4 }} />
                <p className="font-mono text-[12px] text-indigo-300">{j.year}</p>
                <p className="text-[13px] text-slate-300">{j.text}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
        <div>
          <SectionHeading eyebrow="Beyond code" title="Interests" />
          <Stagger className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {interests.map((it) => (
              <StaggerItem key={it.label}>
                <div className="card-hover rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                  <it.icon size={19} className="mx-auto text-indigo-300" />
                  <p className="mt-1.5 text-[12px] font-medium text-white">{it.label}</p>
                  <p className="text-[10.5px] text-slate-500">{it.note}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/15 to-transparent p-6 text-center">
            <p className="text-[14px] italic leading-relaxed text-slate-200">“I&apos;m not just writing code — I&apos;m building the future I want to live in.”</p>
            <Link href="/contact" className="mt-4 inline-flex"><Button size="sm">Let&apos;s build it together</Button></Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
