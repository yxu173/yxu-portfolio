"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Send, Check } from "lucide-react";
import { toast } from "sonner";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";
import { LogoMark } from "@/components/logo";

function Newsletter() {
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
      toast.success("Subscribed — one email per month, no spam.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Subscribe failed");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return <p className="flex items-center gap-1.5 rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-3.5 py-2.5 text-[12px] text-emerald-200"><Check size={13} /> You&apos;re in. Check your inbox.</p>;
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-sm gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com — monthly notes"
        className="h-10 flex-1 rounded-full border border-white/10 bg-white/[0.05] px-4 text-[12px] text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400/60"
      />
      <button disabled={loading} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:brightness-110 transition disabled:opacity-60" aria-label="Subscribe">
        <Send size={14} />
      </button>
    </form>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[#080114]/90 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <Link href="/" aria-label="YXU home">
            <LogoMark width={96} height={34} />
          </Link>
          <p className="mt-3 max-w-xs text-[12.5px] leading-relaxed text-slate-400">
            Mohamed Samir — Software Engineer in Egypt. Backend, AI agents and systems that survive production.
          </p>
          <div className="mt-4 flex items-center gap-3 text-slate-400">
            <a href="https://github.com/yxu173" aria-label="GitHub" className="hover:text-white transition hover:scale-110 transform"><GithubIcon size={17} /></a>
            <a href="https://linkedin.com/in/yxu" aria-label="LinkedIn" className="hover:text-white transition hover:scale-110 transform"><LinkedinIcon size={17} /></a>
            <a href="https://x.com/yxu173" aria-label="X" className="hover:text-white transition hover:scale-110 transform"><XIcon size={15} /></a>
            <a href="mailto:yxu@proton.me" aria-label="Email" className="hover:text-white transition hover:scale-110 transform"><Mail size={17} /></a>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> All systems operational • Cairo (EET)</p>
        </div>
        <nav className="grid grid-cols-2 gap-2 text-[13px] md:justify-items-center">
          <div className="space-y-2.5">
            <p className="text-[11px] uppercase tracking-widest text-slate-500">Site</p>
            <Link href="/" className="block text-slate-400 hover:text-white transition">Home</Link>
            <Link href="/projects" className="block text-slate-400 hover:text-white transition">Projects</Link>
            <Link href="/about" className="block text-slate-400 hover:text-white transition">About</Link>
          </div>
          <div className="space-y-2.5">
            <p className="text-[11px] uppercase tracking-widest text-slate-500">More</p>
            <Link href="/blog" className="block text-slate-400 hover:text-white transition">Blog</Link>
            <Link href="/contact" className="block text-slate-400 hover:text-white transition">Contact</Link>
            <a href="/resume.pdf" className="block text-slate-400 hover:text-white transition">Resume ↓</a>
          </div>
        </nav>
        <div>
          <p className="text-[11px] uppercase tracking-widest text-slate-500">Monthly notes — AI + backend</p>
          <p className="mt-2 text-[12.5px] text-slate-400">One practical email/mo. No spam, unsubscribe anytime.</p>
          <div className="mt-3"><Newsletter /></div>
        </div>
      </div>
      <div className="border-t border-white/5">
        <p className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-1 px-5 py-4 text-[11px] text-slate-600">
          <span>© 2026 YXU • Mohamed Samir. Built with Next.js + shadcn in Cairo.</span>
          <span className="font-mono">v2.1 • last deploy 2 days ago</span>
        </p>
      </div>
    </footer>
  );
}
