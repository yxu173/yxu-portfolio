"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, FileText, Briefcase, User, Mail, Home } from "lucide-react";
import { projects, posts } from "@/lib/data";

const pages = [
  { title: "Home", href: "/", icon: Home },
  { title: "Projects", href: "/projects", icon: Briefcase },
  { title: "About", href: "/about", icon: User },
  { title: "Blog", href: "/blog", icon: FileText },
  { title: "Contact", href: "/contact", icon: Mail },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();

  const openPalette = () => {
    setQ("");
    setOpen(true);
  };

  const togglePalette = () => {
    setQ("");
    setOpen((v) => !v);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        togglePalette();
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ql = q.toLowerCase();
  const matchedPages = pages.filter((p) => p.title.toLowerCase().includes(ql));
  const matchedProjects = projects.filter((p) => (p.title + p.tagline).toLowerCase().includes(ql)).slice(0, 4);
  const matchedPosts = posts.filter((p) => (p.title + p.tag).toLowerCase().includes(ql)).slice(0, 3);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button
        onClick={openPalette}
        className="hidden md:flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 text-[12px] text-dust transition-colors hover:border-white/25 hover:text-starlight"
      >
        <Search size={13} /> Search… <kbd className="rounded border border-white/15 px-1.5 text-[10px]">⌘K</kbd>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-space/80 p-4" onClick={() => setOpen(false)}>
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto mt-24 max-w-lg overflow-hidden rounded-lg border border-white/15 bg-hull"
            >
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <Search size={15} className="text-dust" />
                <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Go to page, project, article…" className="w-full bg-transparent text-[14px] text-starlight placeholder:text-dust/70 focus:outline-none" />
                <kbd className="rounded border border-white/15 px-1.5 text-[10px] text-dust">ESC</kbd>
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                {matchedPages.map((p) => (
                  <button key={p.href} onClick={() => go(p.href)} className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-[13px] text-starlight hover:bg-white/[0.05]">
                    <p.icon size={14} className="text-dust" /> {p.title}
                  </button>
                ))}
                {matchedProjects.length > 0 && <p className="px-3 pt-2 pb-1 text-[12px] text-dust">Projects</p>}
                {matchedProjects.map((p) => (
                  <button key={p.slug} onClick={() => go(`/projects/${p.slug}`)} className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-[13px] text-starlight hover:bg-white/[0.05]">
                    <Briefcase size={14} className="text-arcturus" /> {p.title} <span className="truncate text-[11px] text-dust">{p.tagline.slice(0, 40)}…</span>
                  </button>
                ))}
                {matchedPosts.length > 0 && <p className="px-3 pt-2 pb-1 text-[12px] text-dust">Articles</p>}
                {matchedPosts.map((p) => (
                  <button key={p.slug} onClick={() => go(`/blog/${p.slug}`)} className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-[13px] text-starlight hover:bg-white/[0.05]">
                    <FileText size={14} className="text-rigel" /> {p.title}
                  </button>
                ))}
                {matchedPages.length === 0 && matchedProjects.length === 0 && matchedPosts.length === 0 && (
                  <p className="px-3 py-6 text-center text-[13px] text-dust">No results for “{q}”.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-4 z-[60] grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-hull text-starlight hover:border-white/35 sm:bottom-6 sm:right-6"
          aria-label="Back to top"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
