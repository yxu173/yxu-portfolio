"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Music, Pause, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/motion";
import { AvailabilityBadge } from "@/components/real-home";
import { OrbitalHero } from "@/components/hero-orbit";
import { useCosmicAudio } from "@/components/audio/cosmic-audio";
import { Tracklist } from "@/components/sound/tracklist";
import { SkillConstellation } from "@/components/sound/skill-constellation";
import { MissionLog } from "@/components/sound/mission-log";
import { projects, experience } from "@/lib/data";

const proof = [
  { value: "99.95%", label: "uptime on production APIs" },
  { value: "58%", label: "LLM cost cut with routing + caching" },
  { value: "20+", label: "projects shipped" },
];

export default function HomePage() {
  const { playing, toggle, frequency } = useCosmicAudio();
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24">
      {/* HERO: the page's one orchestrated moment */}
      <section className="grid gap-12 pt-10 lg:min-h-[calc(100svh-14rem)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <AvailabilityBadge />

          <h1 className="font-wide mt-6 text-[clamp(2.75rem,7vw,5.25rem)] font-semibold leading-[0.95] text-starlight">
            Mohamed
            <br />
            Samir
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-starlight/90 md:text-xl">
            Software engineer building backends and AI systems that keep running long after launch night.
          </p>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-dust">
            RAG that cites its sources, agents with budgets and evals, APIs that stay up at 2am. I&apos;m into space,
            synths and whatever we build next.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/projects">
              <Button>See my work</Button>
            </Link>
            <Button
              variant="secondary"
              onClick={toggle}
              aria-pressed={playing}
              className={playing ? "border-arcturus/60 text-arcturus" : undefined}
            >
              {playing ? <Pause size={15} /> : <Music size={15} />}
              {playing ? (
                <>
                  Pause <span className="font-mono text-[12px] opacity-80">{frequency}</span>
                </>
              ) : (
                "Tune in"
              )}
            </Button>
            <a href="/resume.pdf" className="px-2 text-[14px] text-dust underline underline-offset-4 transition-colors hover:text-starlight">
              Resume (PDF)
            </a>
          </div>

          <p className="mt-8 flex items-center gap-1.5 text-[13px] text-dust">
            <MapPin size={14} /> Cairo, Egypt. Working with teams worldwide.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.25 }}
          className="flex items-center justify-center lg:justify-end"
        >
          <OrbitalHero />
        </motion.div>
      </section>

      {/* PROOF */}
      <section className="mt-16 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-3">
        {proof.map((p) => (
          <div key={p.label} className="bg-space px-6 py-5">
            <p className="font-wide text-3xl font-semibold text-starlight">{p.value}</p>
            <p className="mt-1 text-[14px] text-dust">{p.label}</p>
          </div>
        ))}
      </section>

      {/* WORK */}
      <section className="mt-24">
        <SectionHeading
          title="Selected work"
          desc="Each project plays like a track. Open one for the architecture, the numbers and the tradeoffs."
        />
        <div className="mt-8">
          <Tracklist projects={projects} />
        </div>
      </section>

      {/* STACK */}
      <section className="mt-24">
        <SectionHeading title="The stack, mapped as constellations" desc="Hover a star to hear its note." />
        <div className="mt-8">
          <SkillConstellation />
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="mt-24 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <MissionLog items={experience} />
        <div className="self-start rounded-lg border border-white/10 bg-hull p-6">
          <h3 className="text-[15px] font-medium text-starlight">Right now</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-dust">
            Full-stack engineer at Zynda AI, and building yxuOS and yxu-code in the open.
          </p>
          <Link href="/contact" className="mt-5 inline-flex">
            <Button size="sm" variant="secondary">
              Book an intro call
            </Button>
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section className="mt-24 rounded-lg border border-white/10 bg-hull px-6 py-12 text-center md:px-12">
        <h2 className="font-wide mx-auto max-w-xl text-2xl font-semibold text-starlight md:text-3xl">
          Have an AI feature that has to actually work?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-dust">
          Send three lines: what you&apos;re building, the deadline and a budget range. I&apos;ll reply with a scoped plan
          and a fixed quote.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/contact">
            <Button>Start a project</Button>
          </Link>
          <a href="mailto:mohamedsamir177@outlook.com">
            <Button variant="secondary">Email me</Button>
          </a>
        </div>
      </section>
    </div>
  );
}
