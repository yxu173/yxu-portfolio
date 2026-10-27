import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getTransmissions, timeAgo } from "@/lib/github";

export async function Transmissions() {
  const items = await getTransmissions();

  return (
    <div className="h-full rounded-lg border border-white/10 bg-hull p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-wide text-lg font-semibold text-starlight">Transmissions</h3>
          <p className="mt-1 text-[13px] text-dust">Latest commits from my open-source projects, live from GitHub.</p>
        </div>
        <a
          href="https://github.com/yxu173"
          target="_blank"
          rel="noreferrer"
          className="mt-1 shrink-0 text-[12px] text-arcturus transition-colors hover:text-starlight"
        >
          GitHub
        </a>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 text-[14px] leading-relaxed text-dust">
          Signal lost for a moment. The latest work is on{" "}
          <a href="https://github.com/yxu173" className="text-starlight underline underline-offset-4">
            github.com/yxu173
          </a>
          .
        </p>
      ) : (
        <ol className="mt-5 divide-y divide-white/[0.07]">
          {items.map((item) => (
            <li key={item.url} className="py-3">
              <div className="flex items-center justify-between gap-3 text-[12px]">
                <Link href={`/projects/${item.slug}`} className="font-mono text-rigel hover:text-starlight">
                  {item.repo}
                </Link>
                <time dateTime={item.date} className="text-dust">
                  {timeAgo(item.date)}
                </time>
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group mt-1 flex items-start justify-between gap-3 text-[14px] leading-snug text-starlight/90 hover:text-starlight"
              >
                <span className="line-clamp-2">{item.message}</span>
                <ArrowUpRight size={14} className="mt-0.5 shrink-0 text-dust group-hover:text-arcturus" />
              </a>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
