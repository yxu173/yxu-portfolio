import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
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
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-[13px] text-dust hover:text-starlight transition-colors"><ArrowLeft size={14} /> All articles</Link>
      <Reveal>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px] text-dust">
          <Badge>{post.tag}</Badge>
          <span>{post.date}</span><span className="flex items-center gap-1"><Clock size={12} /> {post.readingTime}</span><span>By Mohamed Samir</span>
        </div>
        <h1 className="mt-3 font-wide text-3xl md:text-4xl font-semibold text-starlight">{post.title}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-dust">{post.excerpt}</p>
        <div className="relative mt-6 h-64 overflow-hidden rounded-lg border border-white/10">
          <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
        </div>
      </Reveal>

      <div className="mt-8 space-y-8">
        {post.content.map((sec, i) => (
          <Reveal key={i}>
            <h2 className="font-wide text-lg font-semibold text-starlight">{sec.heading}</h2>
            <div className="mt-2.5 space-y-3">
              {sec.body.map((para, j) => (
                <p key={j} className="text-[14.5px] leading-relaxed text-dust">{para}</p>
              ))}
            </div>
            {sec.code && (
              <div className="mt-3 overflow-hidden rounded-lg border border-white/10 bg-hull">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
                  <span className="font-mono text-[11px] text-dust">{sec.code.lang}</span>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-starlight/90"><code>{sec.code.code}</code></pre>
              </div>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-hull p-5">
        <div className="flex items-center gap-3">
          <LogoIcon size={44} className="rounded-full" />
          <div><p className="text-[14px] font-medium text-starlight">Mohamed Samir</p><p className="text-[12px] text-dust">Backend and AI systems, Cairo</p></div>
        </div>
        <div className="flex gap-2">
          <a href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-[12px] text-starlight/85 hover:border-white/35 transition-colors"><Share2 size={13} /> Share</a>
          <Link href="/contact" className="rounded-full bg-arcturus px-4 py-2 text-[12px] font-medium text-primary-foreground hover:bg-[#f7b862] transition-colors">Discuss this</Link>
        </div>
      </Reveal>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {related.map((r) => (
          <Link key={r.slug} href={`/blog/${r.slug}`} className="group overflow-hidden rounded-lg border border-white/10 bg-hull transition-colors hover:border-white/25">
            <div className="relative h-28"><Image src={r.image} alt={r.title} fill sizes="360px" className="object-cover" loading="lazy" /></div>
            <div className="p-4"><p className="text-[13.5px] font-medium text-starlight line-clamp-2">{r.title}</p></div>
          </Link>
        ))}
      </div>
      <Link href={`/blog/${next.slug}`} className="group mt-4 flex items-center justify-between rounded-lg border border-white/10 p-5 transition-colors hover:border-arcturus/40">
        <span><span className="text-[12px] text-dust">Next article</span><span className="block font-medium text-starlight group-hover:text-arcturus">{next.title}</span></span>
      </Link>
    </div>
  );
}
