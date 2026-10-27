import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Project } from "@/lib/data";
import { RealisticMockup } from "@/components/realistic";

export function ProjectCard({ project }: { project: Project; index?: number }) {
  return (
    <Card className="group relative overflow-hidden transition-colors hover:border-white/25">
      <RealisticMockup project={project} className="rounded-none border-0 border-b border-white/10" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-wide font-semibold text-starlight">{project.title}</h3>
          <ArrowUpRight size={15} className="mt-0.5 shrink-0 text-dust group-hover:text-arcturus transition-colors" />
        </div>
        <p className="mt-1 text-[12px] text-dust">
          {project.status}, {project.year}
        </p>
        <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-dust">{project.tagline}</p>
        <div className="mt-3 flex items-center gap-3 text-[12px] text-dust">
          <span className="font-mono font-medium text-arcturus">{project.metrics[0]?.value}</span>
          <span className="truncate">{project.metrics[0]?.label}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tg) => (
            <Badge key={tg} variant="secondary">{tg}</Badge>
          ))}
        </div>
        <Link href={`/projects/${project.slug}`} className="mt-4 inline-flex text-[13px] font-medium text-arcturus after:absolute after:inset-0 hover:underline">
          Case study
        </Link>
      </div>
    </Card>
  );
}
