"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/motion";
import { posts } from "@/lib/data";

export default function BlogPage() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("All");
  const tags = ["All", ...Array.from(new Set(posts.map((p) => p.tag)))];
  const list = posts.filter((p) => {
    const mq = !q || (p.title + p.tag + p.excerpt).toLowerCase().includes(q.toLowerCase());
    const mt = tag === "All" || p.tag === tag;
    return mq && mt;
  });
  const featured = posts[0];

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-2">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <SectionHeading eyebrow="Blog" title="Notes from shipping AI systems" desc="No fluff — what broke, what worked, exact configs. One practical post every few weeks." />
        <Reveal delay={0.1} className="relative w-full md:w-64">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles..." className="h-10 w-full rounded-full border border-white/10 bg-white/[0.04] pl-9 pr-4 text-[13px] text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400/60" />
        </Reveal>
      </div>

      {/* featured */}
      {!q && tag === "All" && (
        <Reveal className="mt-6">
          <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-3xl border border-white/10 bg-[#0F112A]/80 md:grid-cols-2 hover:border-indigo-400/40 transition">
            <div className="relative h-56 md:h-full min-h-56">
              <Image src={featured.image} alt={featured.title} fill sizes="(max-width: 768px) 100vw, 560px" className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F112A]/40" />
              <span className="absolute left-4 top-4 rounded-full bg-black/60 px-2.5 py-1 text-[10px] text-white backdrop-blur">★ Featured</span>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <Badge variant="secondary" className="text-[10px]">{featured.tag}</Badge>
                <span>{featured.date}</span>•<span className="flex items-center gap-1"><Clock size={11} /> {featured.readingTime}</span>
              </div>
              <h2 className="mt-2 text-xl md:text-2xl font-semibold text-white group-hover:text-indigo-200 transition">{featured.title}</h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">{featured.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[13px] text-indigo-300 group-hover:text-white">Read article <ArrowRight size={14} /></span>
            </div>
          </Link>
        </Reveal>
      )}

      <Reveal delay={0.05} className="mt-5 flex flex-wrap gap-2">
        {tags.map((t) => (
          <button key={t} onClick={() => setTag(t)} className={`rounded-full px-3.5 py-1.5 text-[12px] border transition cursor-pointer ${tag === t ? "bg-white text-black border-white" : "border-white/15 text-slate-400 hover:text-white"}`}>
            {t}
          </button>
        ))}
      </Reveal>

      <Stagger className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((p) => (
          <StaggerItem key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="card-hover group block overflow-hidden rounded-2xl border border-white/10 bg-[#0F112A]/80">
              <div className="relative h-40">
                <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 360px" className="object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F112A] via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <Badge variant="secondary" className="text-[10px]">{p.tag}</Badge>
                  <span>{p.date}</span>•<span>{p.readingTime}</span>
                </div>
                <h3 className="mt-2 text-[15px] font-semibold text-white group-hover:text-indigo-200 transition line-clamp-2">{p.title}</h3>
                <p className="mt-1 text-[12.5px] text-slate-400 line-clamp-2">{p.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[12.5px] text-indigo-300 group-hover:text-white transition">Read <ArrowRight size={13} /></span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
      {list.length === 0 && <p className="mt-10 text-center text-sm text-slate-500">No articles for “{q}”.</p>}
    </div>
  );
}
