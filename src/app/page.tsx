"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, Star, Music, Pause, Sparkles, Quote, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem, SectionHeading } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { TypingRoles, AvailabilityBadge, ContributionMap } from "@/components/real-home";
import { OrbitalHero } from "@/components/hero-orbit";
import { useCosmicAudio } from "@/components/audio/cosmic-audio";
import { projects, experience, testimonials, faqs } from "@/lib/data";

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2.5">
      {faqs.map((f, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-[14px] font-medium text-white">
            {f.q}
            <ChevronDown size={16} className={`shrink-0 text-slate-500 transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && <p className="px-5 pb-4 text-[13px] leading-relaxed text-slate-400">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}

const signalCells = [
  { value: "99.95%", label: "uptime" },
  { value: "58%", label: "LLM cost saved" },
  { value: "1.2M+", label: "API requests" },
  { value: "20+", label: "projects shipped" },
  { value: "4+", label: "yrs experience" },
];

function SignalReadout() {
  const reduce = useReducedMotion();
  return (
    <Reveal className="mt-12">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-fuchsia-600/15 blur-[70px]" />
        <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-indigo-600/20 blur-[70px]" />
        <div className="relative flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-indigo-200/90">
            yxu.fm · signal readout
          </span>
          <span className="relative hidden h-5 w-24 overflow-hidden text-cyan-300/70 sm:block" aria-hidden="true">
            <svg viewBox="0 0 48 20" className="h-full w-full">
              <motion.g
                animate={reduce ? undefined : { x: [0, -24] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
              >
                <path
                  d="M0 10 Q6 2 12 10 T24 10 T36 10 T48 10 T60 10 T72 10 T84 10 T96 10 T108 10 T120 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </motion.g>
            </svg>
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            live
          </span>
        </div>
        <div className="relative grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-5">
          {signalCells.map((cell) => (
            <div
              key={cell.label}
              className="bg-[#0B011A]/70 px-4 py-4 last:col-span-2 sm:px-5 sm:last:col-span-1"
            >
              <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{cell.value}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">{cell.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function HomePage() {
  const { playing, toggle, frequency } = useCosmicAudio();
  return (
    <div className="mx-auto max-w-6xl px-5 pb-20">
      {/* HERO */}
      <section className="grid gap-10 pt-2 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-8 lg:pt-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] text-indigo-200/90 sm:text-[11px]">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-emerald-300">on air</span>
            <span className="text-slate-600">—</span>
            <span>yxu.fm <span className="text-fuchsia-300">{frequency}</span></span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">broadcasting from Cairo</span>
          </p>

          <h1 className="text-glow mt-4 text-5xl font-bold leading-[0.98] tracking-tight text-white md:text-6xl">
            Mohamed Samir
          </h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-indigo-200/70">
            software engineer · backend + AI
          </p>

          <div className="mt-4"><AvailabilityBadge /></div>

          <p className="mt-5 max-w-xl text-balance text-lg font-medium leading-relaxed text-slate-200 md:text-xl">
            I compose{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              backends &amp; AI systems
            </span>{" "}
            — engineered like orbits, tuned like{" "}
            <span className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              music
            </span>
            .
          </p>

          <div className="mt-4 font-mono text-[15px]"><TypingRoles /></div>

          <p className="mt-4 max-w-md text-[14px] leading-relaxed text-slate-400">
            I help startups ship production LLM systems on solid backends — RAG that cites sources, agents with budgets and evals, APIs that stay up at 2am. Based in Egypt, working worldwide.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/projects"><Button>View case studies <ArrowRight size={15} /></Button></Link>
            <Link href="/contact"><Button variant="secondary">Hire me</Button></Link>
            <Button
              variant="secondary"
              onClick={toggle}
              aria-pressed={playing}
              className={playing ? "border-fuchsia-400/50 text-fuchsia-100" : undefined}
            >
              {playing ? <Pause size={15} /> : <Music size={15} />}
              {playing ? "Pause signal" : "Tune in"}
            </Button>
            <a href="/resume.pdf" className="text-[13px] text-slate-400 underline underline-offset-4 transition hover:text-white">
              Resume ↓
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-slate-500">
            <span className="flex items-center gap-1.5"><MapPin size={13} /> Cairo, Egypt (EET)</span>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <span className="flex items-center gap-1"><Star size={12} className="text-amber-300" /> 320+ OSS stars</span>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <span>Replies &lt; 48h</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center lg:justify-end"
        >
          <OrbitalHero />
        </motion.div>
      </section>

      <SignalReadout />

      {/* FEATURED */}
      <section className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Case studies" title="Featured work — with numbers" desc="Each project ships with architecture, evals and honest tradeoffs. Click through for the full story." />
          <Reveal delay={0.1}><Link href="/projects" className="hidden sm:inline-flex shrink-0 items-center gap-1 text-[13px] text-indigo-300 hover:text-white transition">All projects <ArrowRight size={14} /></Link></Reveal>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 gap-5">
          {projects.map((pr, i) => (
            <ProjectCard key={pr.slug} project={pr} index={i} />
          ))}
        </div>
      </section>

      {/* EXPERIENCE + ACTIVITY */}
      <section className="mt-14 grid gap-5 lg:grid-cols-2">
        <Reveal className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-300">Experience</p>
          <h3 className="mt-1 text-lg font-semibold text-white">Where I&apos;ve been useful</h3>
          <div className="mt-4 space-y-4">
            {experience.slice(0, 3).map((e) => (
              <div key={e.role} className="border-l-2 border-indigo-500/40 pl-4">
                <p className="text-[13.5px] font-medium text-white">{e.role}</p>
                <p className="text-[12px] text-indigo-200/80">{e.company} • {e.period}</p>
                <p className="mt-1 text-[12.5px] text-slate-400 line-clamp-2">{e.points[0]}</p>
              </div>
            ))}
          </div>
          <Link href="/about" className="mt-4 inline-flex items-center gap-1 text-[13px] text-indigo-300 hover:text-white transition">Full story <ArrowRight size={13} /></Link>
        </Reveal>
        <div className="space-y-4">
          <Reveal delay={0.08}><ContributionMap /></Reveal>
          <Reveal delay={0.12} className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/20 to-fuchsia-600/10 p-5">
            <p className="flex items-center gap-1.5 text-[12px] text-indigo-200"><Sparkles size={13} /> Currently</p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-white">Building <span className="font-semibold">yxuOS beta</span> with 2 teams + taking 1 freelance LLM-systems project for Oct.</p>
            <Link href="/contact" className="mt-3 inline-flex"><Button size="sm">Book intro call</Button></Link>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mt-14">
        <SectionHeading eyebrow="Proof" title="People I've shipped with" align="center" />
        <Stagger className="mt-6 grid md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <StaggerItem key={t.author}>
              <figure className="card-hover h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <Quote size={18} className="text-indigo-300" />
                <blockquote className="mt-2 text-[13.5px] leading-relaxed text-slate-200">“{t.quote}”</blockquote>
                <figcaption className="mt-4 flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-600 text-[12px] font-bold text-white">{t.initials}</span>
                  <span><span className="block text-[13px] font-medium text-white">{t.author}</span><span className="block text-[11px] text-slate-500">{t.role}</span></span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* FAQ + CTA */}
      <section className="mt-14 grid gap-5 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="FAQ" title="Honest answers" />
          <div className="mt-4"><Faq /></div>
        </div>
        <Reveal delay={0.1} className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a0f3d] via-[#0F112A] to-[#0B011A] p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fuchsia-600/20 blur-[80px]" />
          <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-indigo-600/30 blur-[80px]" />
          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-300">Next step</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Have an LLM feature that must actually work?</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">Send 3 lines: what you&apos;re building, deadline, budget range. I reply with a scoped plan + fixed quote — no discovery-call maze.</p>
            <ul className="mt-4 space-y-1.5 text-[13px] text-slate-300">
              <li>✓ Fixed scope + price, evals included</li>
              <li>✓ You own all code + prompts + evals</li>
              <li>✓ 2 weeks free bug-fix after launch</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/contact"><Button>Tell me about it <ArrowRight size={14} /></Button></Link>
              <a href="mailto:yxu@proton.me"><Button variant="secondary">yxu@proton.me</Button></a>
            </div>
            <p className="mt-3 font-mono text-[11px] text-slate-500">avg. reply: 14h • 1 slot left for Oct 2026</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
