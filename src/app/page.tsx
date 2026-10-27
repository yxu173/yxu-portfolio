"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Server, Brain, Layers, Lightbulb, Sparkles, Quote, ChevronDown, CalendarCheck, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogoIcon } from "@/components/logo";
import { Reveal, Stagger, StaggerItem, SectionHeading } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { Stat, RealisticMockup } from "@/components/realistic";
import { TypingRoles, DevTerminal, TechMarquee, ContributionMap, AvailabilityBadge } from "@/components/real-home";
import { projects, experience, testimonials, faqs } from "@/lib/data";

const pillars = [
  { icon: Server, title: "Backend Engineering", desc: ".NET + Node APIs at 99.95% uptime, 1.2M+ requests proxied.", stat: "4+ yrs" },
  { icon: Brain, title: "AI & LLMs", desc: "RAG, multi-agent teams, evals. $0.04 median task cost.", stat: "6 agents live" },
  { icon: Layers, title: "System Architecture", desc: "Postgres + Redis + queues. Cheap, observable, boring-in-a-good-way.", stat: "12k docs indexed" },
  { icon: Lightbulb, title: "Product Thinking", desc: "From vague idea → scoped epic → shipped. Planning 2.5x faster.", stat: "850+ users" },
];

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

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-20">
      {/* HERO */}
      <section className="grid gap-8 pt-4 lg:grid-cols-[1.05fr_1fr] lg:items-start">
        <div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <AvailabilityBadge />
            <h1 className="mt-4 text-4xl md:text-[46px] font-semibold leading-[1.06] tracking-tight text-white">
              Mohamed Samir
              <br />
              <span className="text-[24px] md:text-[28px] font-medium text-slate-200">Software Engineer — backend + AI</span>
              <br />
              <span className="shimmer-text text-[22px] md:text-[26px]">Building intelligent systems for a better tomorrow.</span>
            </h1>
            <div className="mt-3 font-mono text-[15px]"><TypingRoles /></div>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-slate-400">
              I help startups ship production LLM systems on solid backends — RAG that cites sources, agents with budgets and evals, APIs that stay up at 2am. Based in Egypt, working worldwide.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/projects"><Button><CalendarCheck size={15} /> View case studies <ArrowRight size={15} /></Button></Link>
              <Link href="/contact"><Button variant="secondary">Hire me</Button></Link>
              <a href="/resume.pdf" className="text-[13px] text-slate-400 underline underline-offset-4 hover:text-white transition">Resume ↓</a>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-slate-500">
              <span className="flex items-center gap-1.5"><MapPin size={13} /> Cairo, Egypt (EET)</span>
              <span className="flex items-center gap-1"><Star size={12} className="text-amber-300" /> 320+ stars on open source</span>
              <span>Replies in &lt;48h</span>
            </div>
          </motion.div>
          <div className="mt-6"><DevTerminal /></div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.12 }} className="space-y-4">
          {/* portrait + proof card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#150b35] to-[#0B011A]">
            <div className="relative h-64">
              <Image src="https://images.unsplash.com/photo-1451187580459-43490279c429?q=80&w=1200&auto=format&fit=crop" alt="Cosmic systems — Mohamed Samir portfolio cover" fill priority sizes="(max-width: 768px) 100vw, 560px" className="object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B011A] via-[#0B011A]/30 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full border-2 border-indigo-400/60 bg-[#0F112A]">
                  <LogoIcon size={44} />
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-white">@yxu173 • ships AI systems</p>
                  <p className="font-mono text-[11px] text-slate-400">4 yrs backend → now agents + RAG</p>
                </div>
                <span className="ml-auto hidden sm:inline rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] text-slate-300 backdrop-blur">★ 320+ OSS stars</span>
              </div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 text-center">
              {[["4+", "yrs experience"], ["20+", "projects shipped"], ["1.2M+", "API requests"]].map(([v, l]) => (
                <div key={l} className="px-2 py-3"><p className="text-lg font-bold text-white">{v}</p><p className="text-[10px] text-slate-500">{l}</p></div>
              ))}
            </div>
          </div>
          <RealisticMockup project={projects[0]} />
        </motion.div>
      </section>

      <div className="mt-8"><TechMarquee /></div>

      {/* STATS */}
      <section className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat value="99.95%" label="gateway uptime — 6 months" />
        <Stat value="58%" label="LLM cost saved via cache" delay={0.05} />
        <Stat value="42%" label="faster sprint planning (beta)" delay={0.1} />
        <Stat value="850+" label="students onboarded (pilot)" delay={0.15} />
      </section>

      {/* PILLARS */}
      <section className="mt-14">
        <SectionHeading eyebrow="What I do" title="Backend rigor + AI leverage" desc="Not demos — systems with budgets, evals, tracing and on-call calm." />
        <Stagger className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => (
            <StaggerItem key={p.title}>
              <div className="card-hover group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/20 border border-white/10 text-indigo-200 group-hover:scale-110 transition-transform">
                    <p.icon size={18} />
                  </div>
                  <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] font-medium text-indigo-200">{p.stat}</span>
                </div>
                <h3 className="mt-3 text-[14px] font-semibold text-white">{p.title}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-400">{p.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

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
