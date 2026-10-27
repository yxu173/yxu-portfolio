"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; speed: number; tw: number; phase: number };
type Shoot = { x: number; y: number; vx: number; vy: number; life: number; max: number };

export function Starfield({ density = 1, className = "" }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, raf = 0;
    let stars: Star[] = [];
    let shoots: Shoot[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor((w * h) / 5200 * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        speed: Math.random() * 0.12 + 0.02,
        tw: Math.random() * 2 + 1,
        phase: Math.random() * Math.PI * 2,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const tick = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.y -= s.speed;
        if (s.y < -4) { s.y = h + 4; s.x = Math.random() * w; }
        const a = 0.35 + 0.65 * Math.abs(Math.sin(t * s.tw + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226,232,240,${(a * 0.9).toFixed(3)})`;
        ctx.fill();
        if (s.r > 1.1) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3.2, 0, Math.PI * 2);
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.2);
          g.addColorStop(0, `rgba(129,140,248,${(a * 0.35).toFixed(3)})`);
          g.addColorStop(1, "rgba(129,140,248,0)");
          ctx.fillStyle = g;
          ctx.fill();
        }
      }

      if (Math.random() < 0.008 && shoots.length < 3) {
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
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
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

export function Horizon({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none relative ${className}`} aria-hidden>
      <div className="horizon-beam animate-[horizon_6s_ease-in-out_infinite] h-[2px] w-full rounded-full" />
      <div className="absolute left-1/2 top-0 h-[180px] w-[720px] -translate-x-1/2 bg-gradient-to-t from-indigo-500/25 to-transparent blur-2xl" />
    </div>
  );
}
