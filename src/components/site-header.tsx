"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CommandPalette } from "@/components/chrome";
import { LogoMark } from "@/components/logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function CairoClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const f = () => {
      try {
        setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Cairo" }).format(new Date()));
      } catch { setTime(""); }
    };
    f();
    const t = setInterval(f, 30000);
    return () => clearInterval(t);
  }, []);
  if (!time) return null;
  return <span className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-slate-400">Cairo {time} <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /></span>;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-[#0B011A]/85 backdrop-blur-xl border-b border-white/10 py-2.5" : "bg-transparent py-4"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5">
        <Link href="/" className="group flex shrink-0 items-center gap-2" aria-label="YXU home">
          <LogoMark width={88} height={32} className="transition group-hover:brightness-125 group-hover:drop-shadow-[0_0_12px_rgba(99,102,241,0.7)]" />
          <span className="hidden xl:inline rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-200">● open</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 backdrop-blur">
          {links.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-[13px] transition-colors",
                  active ? "text-white" : "text-slate-400 hover:text-white"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <CairoClock />
          <CommandPalette />
          <Link href="/contact" className="hidden sm:inline-flex rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-[12px] font-medium text-white shadow-[0_0_20px_rgba(99,102,241,0.45)] hover:brightness-110 transition">
            Hire me
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="md:hidden grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="md:hidden mx-4 mt-3 rounded-2xl border border-white/10 bg-[#0F112A]/95 backdrop-blur-xl p-3"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-xl px-4 py-2.5 text-sm",
                  pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href))
                    ? "bg-indigo-600/30 text-white"
                    : "text-slate-300 hover:bg-white/5"
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 block rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-center text-sm text-white">
              Hire me
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
