import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ExternalLink, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
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
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-[13px] text-dust hover:text-starlight transition-colors">
          <ArrowLeft size={14} /> All projects
        </Link>
        <div className="flex gap-2">
          <Link href={`/projects/${prev.slug}`} className="rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-dust hover:text-starlight transition-colors">Previous: {prev.title}</Link>
          <Link href={`/projects/${next.slug}`} className="rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-dust hover:text-starlight transition-colors">Next: {next.title}</Link>
        </div>
      </div>

      {/* header */}
      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{project.category}</Badge>
            <Badge variant="secondary">{project.status}</Badge>
            <span className="text-[12px] text-dust">{project.timeline}, {project.team}</span>
          </div>
          <h1 className="mt-3 font-wide text-4xl md:text-5xl font-semibold text-starlight">{project.title}</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-starlight/85">{project.tagline}</p>
          <p className="mt-2 text-[13px] text-dust">My role: <span className="text-starlight/85">{project.role}</span></p>
          <div className="mt-5 flex flex-wrap gap-3">
            {project.demo && project.demo !== "#" && (
              <a href={project.demo} target="_blank" rel="noreferrer" className={buttonVariants()}>
                Live demo <ExternalLink size={14} />
              </a>
            )}
            {project.github && project.github !== "#" && (
              <a href={project.github} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "secondary" })}>
                <GithubIcon size={14} /> Source
              </a>
            )}
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {project.metrics.map((m) => (
              <div key={m.label} className="rounded-lg border border-white/10 bg-hull p-3 text-center">
                <p className="font-mono text-lg font-semibold text-arcturus">{m.value}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-dust">{m.label}</p>
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
          <h2 className="font-wide text-lg font-semibold text-starlight">Why it exists</h2>
          {project.longDescription.map((para, i) => (
            <p key={i} className="text-[14px] leading-relaxed text-dust">{para}</p>
          ))}
          <h2 className="pt-2 font-wide text-lg font-semibold text-starlight">What it does</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.features.map((f) => (
              <div key={f.title} className="rounded-lg border border-white/10 bg-hull p-4">
                <p className="text-[13.5px] font-semibold text-starlight">{f.title}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-dust">{f.desc}</p>
              </div>
            ))}
          </div>
          <h2 className="pt-2 font-wide text-lg font-semibold text-starlight">Hard parts + fixes</h2>
          <div className="space-y-3">
            {project.challenges.map((c) => (
              <div key={c.title} className="rounded-lg border border-white/10 border-l-arcturus/60 bg-hull p-4">
                <p className="text-[13.5px] font-semibold text-starlight">{c.title}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-starlight/85"><span className="font-medium text-arcturus">Fix: </span>{c.solution}</p>
              </div>
            ))}
          </div>
          <h2 className="pt-2 font-wide text-lg font-semibold text-starlight">Outcomes</h2>
          <ul className="space-y-2">
            {project.outcomes.map((o) => (
              <li key={o} className="border-l border-white/10 pl-3 text-[13.5px] text-starlight/85">{o}</li>
            ))}
          </ul>
        </Reveal>

        <div className="space-y-4">
          <Reveal delay={0.05} className="rounded-lg border border-white/10 bg-hull p-5">
            <h3 className="text-[14px] font-semibold text-starlight">Stack and why</h3>
            <div className="mt-3 space-y-2.5">
              {project.stack.map((s) => (
                <div key={s.name} className="flex items-start justify-between gap-3 border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                  <span className="text-[13px] font-medium text-starlight">{s.name}</span>
                  <span className="text-right text-[12px] text-dust">{s.reason}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="rounded-lg border border-white/10 bg-hull p-5">
            <h3 className="text-[14px] font-semibold text-starlight">Architecture</h3>
            <ol className="mt-3 space-y-2">
              {project.architecture.map((a, i) => (
                <li key={a} className="flex gap-2.5 text-[12.5px] text-dust">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-arcturus/40 font-mono text-[10px] text-arcturus">{i + 1}</span> {a}
                </li>
              ))}
            </ol>
          </Reveal>
          {project.testimonial && (
            <Reveal delay={0.15} className="rounded-lg border border-arcturus/30 bg-arcturus/10 p-5">
              <Quote size={16} className="text-arcturus" />
              <p className="mt-2 text-[13.5px] leading-relaxed text-starlight/90">“{project.testimonial.quote}”</p>
              <p className="mt-3 text-[12px] text-dust">{project.testimonial.author}, {project.testimonial.role}</p>
            </Reveal>
          )}
          <Reveal delay={0.2} className="rounded-lg border border-white/10 bg-hull p-5 text-center">
            <p className="text-[14px] font-medium text-starlight">Want this rigor on your roadmap?</p>
            <div className="mt-3 flex justify-center gap-2">
              <Link href="/contact"><Button size="sm">Start a project</Button></Link>
              <Link href="/projects"><Button size="sm" variant="secondary">More work</Button></Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* next */}
      <Reveal className="mt-10">
        <Link href={`/projects/${next.slug}`} className="group flex items-center justify-between rounded-lg border border-white/10 bg-hull p-5 transition-colors hover:border-arcturus/40">
          <span><span className="text-[12px] text-dust">Next case study</span><span className="font-wide block text-lg font-semibold text-starlight group-hover:text-arcturus">{next.title}</span></span>
          <ArrowRight size={20} className="text-dust group-hover:text-arcturus transition-colors" />
        </Link>
      </Reveal>
    </div>
  );
}
