"use client";

import { useEffect, useRef } from "react";
import { useCosmicAudio } from "@/components/audio/cosmic-audio";

type Star = { x: number; y: number; r: number; speed: number; tw: number; phase: number; depth: number };
type Shoot = { x: number; y: number; vx: number; vy: number; life: number; max: number };
type Link = { a: number; b: number };

const DEPTH_FACTOR = [1, 0.55, 0.28];
const PARALLAX = 16;

function buildLinks(stars: Star[], w: number, h: number): Link[] {
  const bright = stars
    .map((s, i) => ({ s, i }))
    .filter((o) => o.s.r > 1)
    .sort((a, b) => b.s.r - a.s.r)
    .slice(0, 22);
  const links: Link[] = [];
  const seen = new Set<string>();
  const maxDist = Math.min(w, h) * 0.16;

  for (const { s, i } of bright) {
    const nearest = bright
      .filter((o) => o.i !== i)
      .map((o) => ({ o, d: Math.hypot(o.s.x - s.x, o.s.y - s.y) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    for (const n of nearest) {
      if (n.d > maxDist) continue;
      const key = i < n.o.i ? `${i}:${n.o.i}` : `${n.o.i}:${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      links.push({ a: i, b: n.o.i });
      if (links.length >= 36) return links;
    }
  }
  return links;
}

export function Starfield({ density = 1, className = "" }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { getLevel } = useCosmicAudio();
  const getLevelRef = useRef(getLevel);

  useEffect(() => {
    getLevelRef.current = getLevel;
  }, [getLevel]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0;
    let visible = !document.hidden;
    let stars: Star[] = [];
    let links: Link[] = [];
    let shoots: Shoot[] = [];
    let t = 0;
    let glowSprite: HTMLCanvasElement | null = null;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const buildGlowSprite = () => {
      const size = 64;
      const sprite = document.createElement("canvas");
      sprite.width = size;
      sprite.height = size;
      const sctx = sprite.getContext("2d");
      if (!sctx) return;
      const half = size / 2;
      const gradient = sctx.createRadialGradient(half, half, 0, half, half, half);
      gradient.addColorStop(0, "rgba(129,140,248,1)");
      gradient.addColorStop(1, "rgba(129,140,248,0)");
      sctx.fillStyle = gradient;
      sctx.fillRect(0, 0, size, size);
      glowSprite = sprite;
    };

    const buildStars = () => {
      const count = Math.floor((w * h) / 5200 * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        speed: Math.random() * 0.12 + 0.02,
        tw: Math.random() * 2 + 1,
        phase: Math.random() * Math.PI * 2,
        depth: Math.floor(Math.random() * 3),
      }));
      links = buildLinks(stars, w, h);
    };

    const drawLinks = (alpha: number) => {
      if (links.length === 0) return;
      ctx.strokeStyle = `rgba(165,180,252,${alpha.toFixed(3)})`;
      ctx.lineWidth = 0.6;
      for (const link of links) {
        const a = stars[link.a];
        const b = stars[link.b];
        if (!a || !b) continue;
        const ax = a.x - pointer.x * PARALLAX * DEPTH_FACTOR[a.depth];
        const ay = a.y - pointer.y * PARALLAX * DEPTH_FACTOR[a.depth];
        const bx = b.x - pointer.x * PARALLAX * DEPTH_FACTOR[b.depth];
        const by = b.y - pointer.y * PARALLAX * DEPTH_FACTOR[b.depth];
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = 0.35 + 0.65 * Math.abs(Math.sin(s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226,232,240,${(a * 0.9).toFixed(3)})`;
        ctx.fill();
        if (s.r > 1.1 && glowSprite) {
          const glowR = s.r * 3.2;
          ctx.globalAlpha = a * 0.35;
          ctx.drawImage(glowSprite, s.x - glowR, s.y - glowR, glowR * 2, glowR * 2);
          ctx.globalAlpha = 1;
        }
      }
      drawLinks(0.05);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGlowSprite();
      buildStars();
      if (reduced) drawStatic();
    };
    resize();
    window.addEventListener("resize", resize);

    const onPointer = (event: PointerEvent) => {
      pointer.tx = (event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      pointer.ty = (event.clientY / Math.max(window.innerHeight, 1)) * 2 - 1;
    };
    if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    const tick = () => {
      if (!visible) return;
      t += 0.016;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      const level = getLevelRef.current();

      ctx.clearRect(0, 0, w, h);
      drawLinks(0.035 + level * 0.11);

      for (const s of stars) {
        s.y -= s.speed;
        if (s.y < -4) { s.y = h + 4; s.x = Math.random() * w; }
        const factor = DEPTH_FACTOR[s.depth];
        const x = s.x - pointer.x * PARALLAX * factor;
        const y = s.y - pointer.y * PARALLAX * factor;
        const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(t * s.tw + s.phase));
        const a = Math.min(1, twinkle * (1 + level * 0.6));
        const r = s.r * (1 + level * 0.22);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226,232,240,${(a * 0.9).toFixed(3)})`;
        ctx.fill();
        if (s.r > 1.1 && glowSprite) {
          const glowR = s.r * 3.2 * (1 + level * 0.9);
          ctx.globalAlpha = a * (0.35 + level * 0.35);
          ctx.drawImage(glowSprite, x - glowR, y - glowR, glowR * 2, glowR * 2);
          ctx.globalAlpha = 1;
        }
      }

      if (Math.random() < 0.008 * (1 + level * 3) && shoots.length < 3) {
        const sx = Math.random() * w * 0.7 + w * 0.2;
        shoots.push({ x: sx, y: Math.random() * h * 0.3, vx: -6 - Math.random() * 4, vy: 2.5 + Math.random() * 2, life: 0, max: 60 + Math.random() * 30 });
      }
      shoots = shoots.filter((sh) => sh.life < sh.max);
      for (const sh of shoots) {
        sh.life++; sh.x += sh.vx; sh.y += sh.vy;
        const fade = 1 - sh.life / sh.max;
        const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 10, sh.y - sh.vy * 10);
        grad.addColorStop(0, `rgba(255,255,255,${(0.9 * fade).toFixed(3)})`);
        grad.addColorStop(1, "rgba(99,102,241,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * 10, sh.y - sh.vy * 10);
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && !reduced) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) drawStatic();
    else start();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density]);

  return <canvas ref={ref} className={className} aria-hidden />;
}

export function Nebula({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/25 blur-[130px] animate-pulse" />
      <div className="absolute top-1/3 -left-40 h-[420px] w-[420px] rounded-full bg-fuchsia-600/15 blur-[120px]" />
      <div className="absolute top-1/4 -right-40 h-[480px] w-[480px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-0 left-1/2 h-[220px] w-[1100px] -translate-x-1/2 rounded-[100%] bg-indigo-500/20 blur-[80px]" />
      <div className="cosmic-grid absolute inset-0" />
    </div>
  );
}
