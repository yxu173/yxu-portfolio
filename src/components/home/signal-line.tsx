"use client";

import { useEffect, useRef } from "react";
import { useCosmicAudio } from "@/components/audio/cosmic-audio";

const AMBER = "242,165,65";
const DUST = "140,147,163";

/**
 * An oscilloscope trace under the hero name. It breathes slowly when silent,
 * bends toward the pointer, and follows the live audio spectrum while yxu.fm plays.
 */
export function SignalLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { getLevel, getFrequencyData } = useCosmicAudio();
  const audioRef = useRef({ getLevel, getFrequencyData });

  useEffect(() => {
    audioRef.current = { getLevel, getFrequencyData };
  }, [getLevel, getFrequencyData]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;
    let last = performance.now();
    let level = 0;
    const pointer = { x: -1, pull: 0, target: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mid = h / 2;

      ctx.strokeStyle = `rgba(${DUST},0.16)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(w, mid);
      ctx.stroke();

      const freq = audioRef.current.getFrequencyData();
      const bins = freq ? Math.floor(freq.length * 0.45) : 0;
      const base = 2.2 + level * 10;

      ctx.strokeStyle = `rgba(${AMBER},${(0.55 + level * 0.45).toFixed(3)})`;
      ctx.lineWidth = 1.6;
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const n = x / w;
        const env = Math.pow(Math.sin(Math.PI * n), 1.2);
        let y = base * Math.sin(n * 13 + t * 1.4) + base * 0.55 * Math.sin(n * 34 - t * 2.1);
        if (freq && bins) {
          const v = Math.min(1, (freq[Math.min(bins - 1, Math.floor(n * bins))] / 255) * 1.7);
          y += v * (mid - 4) * Math.sin(n * 70 + t * 7);
        }
        if (pointer.pull > 0.01) {
          const dx = x - pointer.x;
          y += pointer.pull * 12 * Math.exp(-(dx * dx) / (2 * 46 * 46)) * Math.sin(n * 58 - t * 5);
        }
        const py = mid + env * y;
        if (x === 0) ctx.moveTo(x, py);
        else ctx.lineTo(x, py);
      }
      ctx.stroke();
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      level += (audioRef.current.getLevel() - level) * 0.15;
      pointer.pull += (pointer.target - pointer.pull) * 0.08;
      draw();
      raf = requestAnimationFrame(tick);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      const dy = Math.abs(e.clientY - (rect.top + rect.height / 2));
      const inside = pointer.x >= 0 && pointer.x <= rect.width;
      pointer.target = inside ? Math.max(0, 1 - dy / 140) : 0;
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start());

    resize();
    const observer = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });
    observer.observe(canvas);

    if (reduced) {
      draw();
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      start();
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
