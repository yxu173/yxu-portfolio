import type { Metadata } from "next";
import Link from "next/link";
import { Newsletter } from "@/components/site-footer";
import { posts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from Mohamed Samir on building AI products, agents and developer tools.",
};

// A small, unlit constellation: the empty sky before the first post.
const STARS = [
  [24, 70], [70, 38], [118, 56], [160, 24], [204, 48], [250, 30], [292, 66],
] as const;

function EmptySky() {
  return (
    <svg viewBox="0 0 316 96" className="h-auto w-full max-w-sm" aria-hidden="true">
      <polyline
        points={STARS.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none"
        stroke="#ece8df"
        strokeOpacity="0.14"
        strokeDasharray="2 5"
      />
      {STARS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 3.5 : 2} fill={i === 0 ? "#f2a541" : "#8c93a3"} fillOpacity={i === 0 ? 1 : 0.5} />
      ))}
    </svg>
  );
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-6">
      <h1 className="font-wide text-4xl font-semibold text-starlight md:text-5xl">Blog</h1>
      <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-dust">
        Notes on building AI products, agents and the tools around them: what worked, what broke and why.
      </p>

      {posts.length === 0 ? (
        <section className="mt-14 rounded-lg border border-white/10 bg-hull px-6 py-12 sm:px-10">
          <EmptySky />
          <h2 className="font-wide mt-8 text-2xl font-semibold text-starlight">No posts yet</h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-dust">
            The first star is lit. Subscribe and the first post will land in your inbox the day it&apos;s published.
          </p>
          <div className="mt-6">
            <Newsletter />
          </div>
          <p className="mt-8 text-[14px] text-dust">
            Until then, the{" "}
            <Link href="/projects" className="text-starlight underline underline-offset-4 hover:text-arcturus">
              projects
            </Link>{" "}
            tell the story of what I&apos;ve been building.
          </p>
        </section>
      ) : (
        <ol className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group grid gap-1 py-6 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <time className="text-[13px] text-dust">{p.date}</time>
                <div>
                  <h2 className="text-[18px] font-semibold text-starlight group-hover:text-arcturus">{p.title}</h2>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-dust">{p.excerpt}</p>
                  <p className="mt-2 text-[13px] text-dust/80">
                    {p.tag}, {p.readingTime}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
