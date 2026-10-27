"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandPalette } from "@/components/chrome";
import { LogoMark } from "@/components/logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

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
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "border-white/10 bg-space/90 backdrop-blur-md" : "border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5">
        <Link href="/" className="flex shrink-0 items-center" aria-label="YXU home">
          <LogoMark width={88} height={32} />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-1 text-[14px] transition-colors",
                  active ? "text-starlight" : "text-dust hover:text-starlight"
                )}
              >
                {l.label}
                {active && <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-arcturus" />}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <CommandPalette />
          <Link
            href="/contact"
            className="hidden h-9 items-center rounded-full bg-arcturus px-4 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-[#f7b862] sm:inline-flex"
          >
            Hire me
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-starlight md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-4 mb-3 rounded-lg border border-white/10 bg-hull p-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-md px-4 py-2.5 text-sm",
                isActive(pathname, l.href) ? "bg-white/[0.06] text-starlight" : "text-dust hover:text-starlight"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-arcturus px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
          >
            Hire me
          </Link>
        </div>
      )}
    </header>
  );
}
