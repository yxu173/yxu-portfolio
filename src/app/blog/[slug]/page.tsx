import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Clock, Share2, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion";
import { LogoIcon } from "@/components/logo";
import { posts } from "@/lib/data";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.excerpt };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = posts.findIndex((p) => p.slug === slug);
  const post = posts[idx];
  if (!post) return notFound();
  const related = posts.filter((_, i) => i !== idx).slice(0, 2);
  const next = posts[(idx + 1) % posts.length];

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-2">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-white transition"><ArrowLeft size={14} /> All articles</Link>
      <Reveal>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px] text-slate-500">
          <Badge>{post.tag}</Badge>
          <span>{post.date}</span>•<span className="flex items-center gap-1"><Clock size={12} /> {post.readingTime}</span>•<span>By Mohamed Samir</span>
        </div>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-white">{post.title}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-400">{post.excerpt}</p>
        <div className="relative mt-6 h-64 overflow-hidden rounded-3xl border border-white/10">
          <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B011A]/70 to-transparent" />
        </div>
      </Reveal>

      <div className="mt-8 space-y-8">
        {post.content.map((sec, i) => (
          <Reveal key={i}>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white"><BookOpen size={16} className="text-indigo-300" /> {sec.heading}</h2>
            <div className="mt-2.5 space-y-3">
              {sec.body.map((para, j) => (
                <p key={j} className="text-[14.5px] leading-relaxed text-slate-400">{para}</p>
              ))}
            </div>
            {sec.code && (
              <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/60">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
                  <span className="font-mono text-[11px] text-slate-500">{sec.code.lang}</span>
                  <span className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-red-400/70" /><span className="h-2 w-2 rounded-full bg-yellow-300/70" /><span className="h-2 w-2 rounded-full bg-green-400/70" /></span>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-slate-200"><code>{sec.code.code}</code></pre>
              </div>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div className="flex items-center gap-3">
          <LogoIcon size={44} className="rounded-full" />
          <div><p className="text-[14px] font-medium text-white">Mohamed Samir</p><p className="text-[12px] text-slate-500">Backend + AI systems • Cairo</p></div>
        </div>
        <div className="flex gap-2">
          <a href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-[12px] text-slate-300 hover:text-white hover:border-indigo-400/50 transition"><Share2 size={13} /> Share</a>
          <Link href="/contact" className="rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2 text-[12px] font-medium text-white">Discuss this →</Link>
        </div>
      </Reveal>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {related.map((r) => (
          <Link key={r.slug} href={`/blog/${r.slug}`} className="card-hover group overflow-hidden rounded-2xl border border-white/10 bg-[#0F112A]/80">
            <div className="relative h-28"><Image src={r.image} alt={r.title} fill sizes="360px" className="object-cover" loading="lazy" /></div>
            <div className="p-4"><p className="text-[13.5px] font-medium text-white group-hover:text-indigo-200 line-clamp-2">{r.title}</p></div>
          </Link>
        ))}
      </div>
      <Link href={`/blog/${next.slug}`} className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 p-5 hover:border-indigo-400/40 transition group">
        <span><span className="text-[11px] uppercase tracking-widest text-slate-500">Next article</span><span className="block font-medium text-white">{next.title}</span></span>
        <ArrowRight size={18} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition" />
      </Link>
    </div>
  );
}
