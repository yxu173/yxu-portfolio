import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/motion";
import { HomeHero } from "@/components/home/hero";
import { Transmissions } from "@/components/home/transmissions";
import { Tracklist } from "@/components/sound/tracklist";
import { SkillConstellation } from "@/components/sound/skill-constellation";
import { MissionLog } from "@/components/sound/mission-log";
import { projects, experience } from "@/lib/data";

export const revalidate = 3600;

const proof = [
  { value: "11", label: "specialist agents in Zynda, the platform I work on" },
  { value: "4", label: "open-source projects on GitHub" },
  { value: "179", label: "tests keeping yxu-code honest" },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24">
      <HomeHero />

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

      {/* EXPERIENCE + LIVE ACTIVITY */}
      <section className="mt-24 grid gap-6 lg:grid-cols-2">
        <MissionLog items={experience} />
        <Transmissions />
      </section>

      {/* CONTACT */}
      <section className="mt-24 rounded-lg border border-white/10 bg-hull px-6 py-12 text-center md:px-12">
        <h2 className="font-wide mx-auto max-w-xl text-2xl font-semibold text-starlight md:text-3xl">
          Have an idea worth building?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-dust">
          Tell me what you&apos;re working on and how I can help. Agents, products or a wild idea about the future, I&apos;m
          listening.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/contact">
            <Button>Get in touch</Button>
          </Link>
          <a href="mailto:mohamedsamir177@outlook.com">
            <Button variant="secondary">Email me</Button>
          </a>
        </div>
      </section>
    </div>
  );
}
