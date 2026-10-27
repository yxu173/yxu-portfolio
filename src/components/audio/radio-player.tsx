"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useCosmicAudio } from "@/components/audio/cosmic-audio";
import { cn } from "@/lib/utils";

const BAR_COUNT = 20;
const CANVAS_W = 88;
const CANVAS_H = 28;

export function RadioPlayer() {
  const {
    playing,
    toggle,
    volume,
    setVolume,
    getFrequencyData,
    trackName,
    frequency,
  } = useCosmicAudio();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startRef = useRef<() => void>(() => {});
  const playingRef = useRef(playing);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.repeat) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key.toLowerCase() !== "m") return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = CANVAS_W * dpr;
    canvas.height = CANVAS_H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let raf = 0;
    let t = 0;
    let visible = !document.hidden;

    const draw = () => {
      t += 0.03;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      const data = getFrequencyData();

      if (playingRef.current && data) {
        const gap = 2;
        const barW = (CANVAS_W - gap * (BAR_COUNT - 1)) / BAR_COUNT;
        for (let i = 0; i < BAR_COUNT; i++) {
          const bin = Math.floor((i / BAR_COUNT) * (data.length * 0.7));
          const v = data[bin] / 255;
          const barH = Math.max(1.5, v * CANVAS_H);
          const x = i * (barW + gap);
          const y = (CANVAS_H - barH) / 2;
          ctx.globalAlpha = 0.35 + v * 0.65;
          ctx.fillStyle = "#F2A541";
          ctx.fillRect(x, y, barW, barH);
        }
        ctx.globalAlpha = 1;
      } else {
        ctx.strokeStyle = "#8C93A3";
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = reducedMotion ? 0.45 : 0.6;
        ctx.beginPath();
        for (let x = 0; x <= CANVAS_W; x += 2) {
          const phase = reducedMotion ? 0 : t;
          const y =
            CANVAS_H / 2 + Math.sin(x * 0.16 + phase) * (CANVAS_H * 0.18);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    };

    const tick = () => {
      if (!visible) {
        raf = 0;
        return;
      }
      draw();
      if (reducedMotion && !playingRef.current) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (!visible) {
        raf = 0;
        return;
      }
      if (reducedMotion && !playingRef.current) {
        draw();
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    startRef.current = start;

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) start();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    start();
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      startRef.current = () => {};
    };
  }, [getFrequencyData, reducedMotion]);

  useEffect(() => {
    startRef.current();
  }, [playing]);

  const spinning = playing && !reducedMotion;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      {!playing && (
        <span
          className={cn(
            "pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-hull px-2.5 py-1 text-[11px] text-starlight"
          )}
        >
          Tune in ♪
        </span>
      )}

      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-hull px-2.5 py-2 sm:gap-3 sm:px-4">
        <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-space ring-1 ring-white/10">
          <svg
            viewBox="0 0 24 24"
            className={cn(
              "h-7 w-7 origin-center",
              spinning && "animate-spin [animation-duration:4s]"
            )}
            aria-hidden
          >
            <circle
              cx="12"
              cy="12"
              r="11"
              fill="#070A12"
              stroke="rgba(236,232,223,0.22)"
              strokeWidth="1"
            />
            <circle
              cx="12"
              cy="12"
              r="7.5"
              fill="none"
              stroke="rgba(236,232,223,0.25)"
              strokeWidth="0.5"
            />
            <circle
              cx="12"
              cy="12"
              r="5.5"
              fill="none"
              stroke="rgba(236,232,223,0.25)"
              strokeWidth="0.5"
            />
            <circle
              cx="12"
              cy="12"
              r="3.5"
              fill="none"
              stroke="rgba(236,232,223,0.25)"
              strokeWidth="0.5"
            />
            <circle cx="12" cy="12" r="1.7" fill="#F2A541" />
            <circle cx="12" cy="12" r="0.55" fill="#070A12" />
          </svg>
        </span>

        <div className="hidden flex-col leading-tight sm:flex">
          <span className="font-mono text-[11px] text-starlight">
            yxu.fm · {frequency}
          </span>
          <span className="font-mono text-[10px] text-dust">
            {trackName}
          </span>
        </div>

        <button
          type="button"
          onClick={toggle}
          title={playing ? "Pause (M)" : "Play (M)"}
          aria-label={playing ? "Pause music" : "Play music"}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-arcturus text-space transition-colors hover:bg-arcturus/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arcturus/70"
        >
          {playing ? (
            <Pause size={15} />
          ) : (
            <Play size={15} className="translate-x-[1px]" />
          )}
        </button>

        <canvas
          ref={canvasRef}
          aria-hidden
          className="hidden h-7 w-[88px] sm:block"
        />

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          aria-label="Volume"
          className="hidden h-1.5 w-20 cursor-pointer appearance-none rounded-full bg-white/15 sm:block [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-arcturus [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-arcturus"
        />
      </div>
    </div>
  );
}
