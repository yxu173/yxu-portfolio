"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Send, Check } from "lucide-react";
import { toast } from "sonner";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";
import { LogoMark } from "@/components/logo";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setDone(true);
      toast.success("Subscribed. First email lands next month.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Subscribe failed");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return <p className="flex items-center gap-1.5 text-[13px] text-arcturus"><Check size={13} /> Subscribed. First email lands next month.</p>;
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-sm gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="h-10 flex-1 rounded-full border border-white/12 bg-hull px-4 text-[13px] text-starlight placeholder:text-dust/70 focus:outline-none focus:border-arcturus/70"
      />
      <button disabled={loading} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-arcturus text-primary-foreground transition-colors hover:bg-[#f7b862] disabled:opacity-60" aria-label="Subscribe">
        <Send size={14} />
      </button>
    </form>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-space">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <Link href="/" aria-label="YXU home">
            <LogoMark width={96} height={34} />
          </Link>
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-dust">
            Mohamed Samir, software engineer in Cairo. Backends and AI systems, built to keep running.
          </p>
          <div className="mt-4 flex items-center gap-4 text-dust">
            <a href="https://github.com/yxu173" aria-label="GitHub" className="transition-colors hover:text-starlight"><GithubIcon size={17} /></a>
            <a href="https://linkedin.com/in/yxu" aria-label="LinkedIn" className="transition-colors hover:text-starlight"><LinkedinIcon size={17} /></a>
            <a href="https://x.com/yxu173" aria-label="X" className="transition-colors hover:text-starlight"><XIcon size={15} /></a>
            <a href="mailto:mohamedsamir177@outlook.com" aria-label="Email" className="transition-colors hover:text-starlight"><Mail size={17} /></a>
          </div>
                  </div>
        <nav className="grid grid-cols-2 gap-2 text-[13px] md:justify-items-center">
          <div className="space-y-2.5">
            <p className="text-[13px] font-medium text-starlight">Site</p>
            <Link href="/" className="block text-dust transition-colors hover:text-starlight">Home</Link>
            <Link href="/projects" className="block text-dust transition-colors hover:text-starlight">Projects</Link>
            <Link href="/about" className="block text-dust transition-colors hover:text-starlight">About</Link>
          </div>
          <div className="space-y-2.5">
            <p className="text-[13px] font-medium text-starlight">More</p>
            <Link href="/blog" className="block text-dust transition-colors hover:text-starlight">Blog</Link>
            <Link href="/contact" className="block text-dust transition-colors hover:text-starlight">Contact</Link>
            <a href="/resume.pdf" className="block text-dust transition-colors hover:text-starlight">Resume (PDF)</a>
          </div>
        </nav>
        <div>
          <p className="text-[13px] font-medium text-starlight">Monthly notes</p>
          <p className="mt-2 text-[13px] text-dust">One email a month on AI and backend work.</p>
          <div className="mt-3"><Newsletter /></div>
        </div>
      </div>
      <div className="border-t border-white/[0.06]">
        <p className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-1 px-5 py-4 text-[12px] text-dust/70">
          <span>© 2026 Mohamed Samir</span>
          <span>Made in Cairo, under the same stars</span>
        </p>
      </div>
    </footer>
  );
}
