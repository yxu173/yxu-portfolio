"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading, Reveal } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

const filters = ["All", "AI", "Backend", "Fullstack", "Tools"] as const;

export default function ProjectsPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = active === "All" || p.category === active || p.tags.includes(active);
      const matchQ = !q || (p.title + p.tagline + p.tags.join(" ")).toLowerCase().includes(q.toLowerCase());
      return matchCat && matchQ;
    });
  }, [active, q]);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-2">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <SectionHeading title="Selected projects" desc="Real constraints, real numbers. Every card links to architecture, tradeoffs and outcomes." />
        <Reveal delay={0.1} className="relative w-full md:w-64">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dust" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects and stacks" className="h-10 w-full rounded-full border border-white/10 bg-hull pl-9 pr-4 text-[13px] text-starlight placeholder:text-dust focus:outline-none focus:border-arcturus/60" />
        </Reveal>
      </div>

      <Reveal delay={0.08} className="mt-5 flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={cn(
              "rounded-full px-4 py-1.5 text-[12px] font-medium border transition-colors cursor-pointer",
              active === f
                ? "border-arcturus bg-arcturus text-primary-foreground"
                : "border-white/15 text-dust hover:border-white/35 hover:text-starlight"
            )}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto font-mono text-[11px] text-dust">{list.length} / {projects.length} shown</span>
      </Reveal>

      <motion.div layout className="mt-6 grid sm:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div key={p.slug} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.32, delay: i * 0.04 }}>
              <ProjectCard project={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && (
        <div className="mt-10 rounded-lg border border-dashed border-white/15 p-10 text-center">
          <p className="text-sm text-starlight/85">No matches for “{q}” in {active}.</p>
          <button onClick={() => { setQ(""); setActive("All"); }} className="mt-3 text-[13px] text-arcturus hover:underline">Reset filters</button>
        </div>
      )}

      <Reveal className="mt-10 rounded-lg border border-white/10 bg-hull p-6 text-center">
        <p className="text-[14px] text-starlight">Want the same rigor on your project?</p>
        <p className="mt-1 text-[13px] text-dust">Fixed scope, evals included, you own everything.</p>
        <Link href="/contact" className="mt-4 inline-flex"><Button>Start a project</Button></Link>
      </Reveal>
    </div>
  );
}
