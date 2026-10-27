"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Music, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrbitalHero } from "@/components/hero-orbit";
import { useCosmicAudio } from "@/components/audio/cosmic-audio";
import { SignalLine } from "@/components/home/signal-line";

function CairoSky() {
  const [now, setNow] = useState<{ time: string; night: boolean } | null>(null);

  useEffect(() => {
    const read = () => {
      const parts = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Africa/Cairo",
      }).formatToParts(new Date());
      const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 12);
      const minute = parts.find((p) => p.type === "minute")?.value ?? "00";
      setNow({ time: `${String(hour).padStart(2, "0")}:${minute}`, night: hour < 6 || hour >= 19 });
    };
    read();
    const id = setInterval(read, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="flex min-h-5 items-center gap-2 text-[14px] text-dust">
      <span className="h-2 w-2 rounded-full bg-arcturus" aria-hidden="true" />
      {now ? (
        <span>
          <span className="font-mono text-starlight">{now.time}</span> in Cairo,{" "}
          {now.night ? "the stars are out" : "the sun is up"}
        </span>
      ) : (
        <span>Cairo, Egypt</span>
      )}
    </p>
  );
}

export function HomeHero() {
  const { playing, toggle, frequency } = useCosmicAudio();
  const reduce = useReducedMotion();

  return (
    <section className="grid gap-12 pt-10 lg:min-h-[calc(100svh-14rem)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <CairoSky />

        <h1 className="font-wide mt-6 text-[clamp(2.75rem,7vw,5.25rem)] font-semibold leading-[0.95] text-starlight">
          Mohamed
          <br />
          Samir
        </h1>

        <SignalLine className="mt-5 block h-14 w-full max-w-lg" />

        <p className="mt-5 max-w-lg text-lg leading-relaxed text-starlight/90 md:text-xl">
          Full-stack engineer building AI products, from the agent to the last pixel.
        </p>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-dust">
          I work on Zynda at Zynda AI and build open-source agent tools on the side. Press tune in and watch the signal
          come alive.
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
          <a
            href="/resume.pdf"
            className="px-2 text-[14px] text-dust underline underline-offset-4 transition-colors hover:text-starlight"
          >
            Resume (PDF)
          </a>
        </div>
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
  );
}
