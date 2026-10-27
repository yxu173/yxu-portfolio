import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, AlertTriangle, Trophy, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { RealisticMockup } from "@/components/realistic";
import { GithubIcon } from "@/components/icons";
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.title} — case study`, description: p.tagline };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  const project = projects[idx];
  if (!project) return notFound();
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-2">
      <div className="flex items-center justify-between">
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-white transition">
          <ArrowLeft size={14} /> All projects
        </Link>
        <div className="flex gap-2">
          <Link href={`/projects/${prev.slug}`} className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-slate-400 hover:text-white transition">← {prev.title}</Link>
          <Link href={`/projects/${next.slug}`} className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-slate-400 hover:text-white transition">{next.title} →</Link>
        </div>
      </div>

      {/* header */}
      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{project.category}</Badge>
            <Badge variant="secondary">{project.status}</Badge>
            <span className="font-mono text-[11px] text-slate-500">{project.timeline} • {project.team}</span>
          </div>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-white">{project.title}</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{project.tagline}</p>
          <p className="mt-2 text-[13px] text-slate-500">My role: <span className="text-slate-300">{project.role}</span></p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button>Live Demo <ExternalLink size={14} /></Button>
            <Button variant="secondary"><GithubIcon size={14} /> Source</Button>
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {project.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center">
                <p className="bg-gradient-to-r from-indigo-200 to-fuchsia-200 bg-clip-text text-lg font-bold text-transparent">{m.value}</p>
                <p className="mt-0.5 text-[10.5px] leading-tight text-slate-500">{m.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="space-y-3">
          <RealisticMockup project={project} />
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
          </div>
        </Reveal>
      </div>

      {/* story */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Why it exists</h2>
          {project.longDescription.map((para, i) => (
            <p key={i} className="text-[14px] leading-relaxed text-slate-400">{para}</p>
          ))}
          <h2 className="pt-2 text-lg font-semibold text-white">What it does</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="flex items-center gap-1.5 text-[13.5px] font-semibold text-white"><CheckCircle2 size={14} className="text-emerald-300" /> {f.title}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
          <h2 className="pt-2 text-lg font-semibold text-white">Hard parts + fixes</h2>
          <div className="space-y-3">
            {project.challenges.map((c) => (
              <div key={c.title} className="rounded-2xl border border-amber-400/20 bg-amber-500/[0.05] p-4">
                <p className="flex items-center gap-1.5 text-[13.5px] font-semibold text-amber-200"><AlertTriangle size={14} /> {c.title}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-300"><span className="text-emerald-300 font-medium">Fix: </span>{c.solution}</p>
              </div>
            ))}
          </div>
          <h2 className="pt-2 text-lg font-semibold text-white">Outcomes</h2>
          <ul className="space-y-2">
            {project.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-2 text-[13.5px] text-slate-300"><Trophy size={14} className="mt-0.5 shrink-0 text-amber-300" /> {o}</li>
            ))}
          </ul>
        </Reveal>

        <div className="space-y-4">
          <Reveal delay={0.05} className="rounded-2xl border border-white/10 bg-[#0F112A]/80 p-5">
            <h3 className="text-[14px] font-semibold text-white">Stack — and why</h3>
            <div className="mt-3 space-y-2.5">
              {project.stack.map((s) => (
                <div key={s.name} className="flex items-start justify-between gap-3 border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                  <span className="text-[13px] font-medium text-white">{s.name}</span>
                  <span className="text-right text-[11.5px] text-slate-500">{s.reason}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="text-[14px] font-semibold text-white">Architecture</h3>
            <ol className="mt-3 space-y-2">
              {project.architecture.map((a, i) => (
                <li key={a} className="flex gap-2.5 text-[12.5px] text-slate-400">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-indigo-600/30 font-mono text-[10px] text-indigo-200">{i + 1}</span> {a}
                </li>
              ))}
            </ol>
          </Reveal>
          {project.testimonial && (
            <Reveal delay={0.15} className="rounded-2xl border border-indigo-400/25 bg-indigo-600/10 p-5">
              <Quote size={16} className="text-indigo-300" />
              <p className="mt-2 text-[13.5px] italic leading-relaxed text-slate-200">“{project.testimonial.quote}”</p>
              <p className="mt-3 text-[12px] text-slate-400">— {project.testimonial.author}, {project.testimonial.role}</p>
            </Reveal>
          )}
          <Reveal delay={0.2} className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/25 to-fuchsia-600/15 p-5 text-center">
            <p className="text-[14px] font-medium text-white">Want this rigor on your roadmap?</p>
            <div className="mt-3 flex justify-center gap-2">
              <Link href="/contact"><Button size="sm">Start a project</Button></Link>
              <Link href="/projects"><Button size="sm" variant="secondary">More work</Button></Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* next */}
      <Reveal className="mt-10">
        <Link href={`/projects/${next.slug}`} className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-indigo-400/40 transition">
          <span><span className="text-[11px] uppercase tracking-widest text-slate-500">Next case study</span><span className="block text-lg font-semibold text-white group-hover:text-indigo-200">{next.title}</span></span>
          <ArrowRight size={20} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition" />
        </Link>
      </Reveal>
    </div>
  );
}
