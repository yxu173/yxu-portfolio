"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Project } from "@/lib/data";
import { RealisticMockup } from "@/components/realistic";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ x: px * 8, y: py * -8 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setT({ x: 0, y: 0 })} style={{ perspective: 900 }}>
        <motion.div style={{ rotateX: t.y, rotateY: t.x, transformStyle: "preserve-3d" }} transition={{ type: "spring", stiffness: 200, damping: 22 }}>
          <Card className="card-hover group overflow-hidden">
            <div className="relative">
              <RealisticMockup project={project} className="rounded-none border-0 border-b border-white/10" />
              <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">
                {project.status}
              </span>
              <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-1 font-mono text-[10px] text-slate-300 backdrop-blur">{project.year}</span>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-white group-hover:text-indigo-200 transition">{project.title}</h3>
                <ArrowUpRight size={15} className="mt-0.5 shrink-0 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>
              <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-slate-400">{project.tagline}</p>
              <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-500">
                <span className="font-medium text-indigo-300">{project.metrics[0]?.value}</span>
                <span className="truncate">{project.metrics[0]?.label}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tg) => (
                  <Badge key={tg} variant="secondary" className="text-[10px]">{tg}</Badge>
                ))}
              </div>
              <Link href={`/projects/${project.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-indigo-300 hover:text-white transition">
                Case study <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
