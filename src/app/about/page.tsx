import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, Orbit, Music, Cpu, Telescope, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/motion";
import { experience, skills, journey } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "Mohamed Samir, full-stack engineer at Zynda AI in Cairo, building AI products and open-source agent tools.",
};

const facts = [
  { label: "Now", value: "Full-stack engineer at Zynda AI" },
  { label: "Based in", value: "Cairo, Egypt (UTC+2)" },
  { label: "Studied", value: "Computer Science, Faculty of Science, Menofia University, 2021 — 2025" },
  { label: "Building", value: "yxuOS, yxu-code and scy-ai, in the open" },
];

const building = [
  { slug: "yxuos", title: "yxuOS", line: "Whiteboards, designs and agents that draft with your team." },
  { slug: "yxu-code", title: "yxu-code", line: "Opus leads my coding agents from the terminal." },
  { slug: "scy-ai", title: "scy-ai", line: "Trackers that read the news so I don't have to." },
];

const loves = [
  { icon: Cpu, label: "Tech", note: "Agents, tools and the systems under them" },
  { icon: Telescope, label: "Space", note: "Stars, orbits and how big it all is" },
  { icon: Music, label: "Music", note: "Always on while I build" },
  { icon: Orbit, label: "The future", note: "Building the one I want to live in" },
  { icon: Terminal, label: "Linux", note: "Arch + Hyprland, tuned daily" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-6">
      {/* intro */}
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <h1 className="font-wide text-4xl font-semibold text-starlight md:text-5xl">About me</h1>
          <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-relaxed text-dust">
            <p className="text-lg leading-relaxed text-starlight/90">
              I&apos;m Mohamed Samir, a full-stack engineer in Cairo. I build AI products end to end, from the database to the
              agent to the last pixel.
            </p>
            <p>
              At Zynda AI I work across the whole product: backend, frontend, AI and some DevOps. The product is Zynda, a
              platform where one chat box hands work to a fleet of specialist agents that research, write documents, build
              apps, edit images and work inside 37 connected apps.
            </p>
            <p>
              Outside work I build my own tools in the open. yxuOS is a workspace where agents draw diagrams, design screens
              and plan with your team. yxu-code lets Opus lead the coding agents on my machine. scy-ai follows the topics I
              care about and keeps my reading calm.
            </p>
            <p>
              I&apos;m happiest with music on, a starfield somewhere on screen and an Arch setup I keep tuning. Tech, space and
              music are what keep me curious, and the future is what I&apos;m building toward.
            </p>
          </div>

          <dl className="mt-8 max-w-xl divide-y divide-white/10 border-y border-white/10">
            {facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-[14px]">
                <dt className="text-dust">{f.label}</dt>
                <dd className="text-starlight/90">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/resume.pdf" download>
              <Button>
                <Download size={14} /> Resume (PDF)
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="secondary">Work with me</Button>
            </Link>
          </div>
        </div>

        <div className="relative h-80 overflow-hidden rounded-lg border border-white/10 lg:h-[30rem]">
          <Image
            src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=1200&auto=format&fit=crop"
            alt="Night sky full of stars over the desert"
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover grayscale"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 bg-space/85 px-5 py-4">
            <p className="text-[14px] font-medium text-starlight">Cairo nights, deep work</p>
            <p className="text-[13px] text-dust">The same stars, whatever we build next</p>
          </div>
        </div>
      </section>

      {/* now building */}
      <section className="mt-24">
        <SectionHeading title="What I'm building now" />
        <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-3">
          {building.map((b) => (
            <Link key={b.slug} href={`/projects/${b.slug}`} className="group bg-space p-5 transition-colors hover:bg-hull">
              <p className="font-wide text-[17px] font-semibold text-starlight group-hover:text-arcturus">{b.title}</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-dust">{b.line}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* experience + toolbox */}
      <section className="mt-24 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading title="Experience" />
          <div className="mt-6 space-y-8">
            {experience.map((e) => (
              <article key={e.role} className="border-l-2 border-arcturus/60 pl-5">
                <h3 className="text-[16px] font-semibold text-starlight">{e.role}</h3>
                <p className="mt-0.5 text-[13px] text-dust">
                  {e.company}, {e.period}
                  {e.location ? `, ${e.location}` : null}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {e.points.map((pt) => (
                    <li key={pt} className="text-[14px] leading-relaxed text-dust">
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading title="Toolbox" desc="What I reach for, taken from the projects on this site." />
          <div className="mt-6 space-y-5">
            {skills.map((g) => (
              <div key={g.group}>
                <h3 className="text-[13px] font-medium text-starlight">{g.group}</h3>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <li key={item} className="rounded-full border border-white/12 px-3 py-1 text-[13px] text-dust">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* journey + loves */}
      <section className="mt-24 grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading title="Journey" />
          <ol className="relative ml-1 mt-6 space-y-6 border-l border-white/10 pl-6">
            {journey.map((j) => (
              <li key={j.year} className="relative">
                <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-arcturus" />
                <p className="font-mono text-[13px] text-arcturus">{j.year}</p>
                <p className="mt-0.5 text-[14px] text-starlight/85">{j.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <SectionHeading title="What I love" />
          <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
            {loves.map((l) => (
              <li key={l.label} className="flex items-center gap-4 py-3.5">
                <l.icon size={18} className="shrink-0 text-arcturus" />
                <span className="w-24 shrink-0 text-[14px] font-medium text-starlight">{l.label}</span>
                <span className="text-[14px] text-dust">{l.note}</span>
              </li>
            ))}
          </ul>
          <p className="font-wide mt-8 text-xl font-semibold leading-snug text-starlight">
            &ldquo;I&apos;m not just writing code. I&apos;m building the future I want to live in.&rdquo;
          </p>
          <Link href="/contact" className="mt-5 inline-flex">
            <Button size="sm" variant="secondary">
              Let&apos;s build it together
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
