"use client";

import { useEffect, useRef, useState } from "react";
import { useCosmicAudio } from "@/components/audio/cosmic-audio";
import { LogoIcon } from "@/components/logo";

type MoonSpec = {
  title: string;
  line: string;
  orbit: number;
  flatten: number;
  tilt: number;
  speed: number;
  phase: number;
  direction: 1 | -1;
  color: string;
};

const MOONS: MoonSpec[] = [
  {
    title: "Backend",
    line: ".NET + Node APIs, 99.95% uptime",
    orbit: 0.7,
    flatten: 0.3,
    tilt: -0.2,
    speed: 0.19,
    phase: 0.5,
    direction: 1,
    color: "#9FB8FF",
  },
  {
    title: "AI & LLMs",
    line: "RAG, multi-agent, evals",
    orbit: 0.77,
    flatten: 0.36,
    tilt: 0.27,
    speed: 0.15,
    phase: 2.3,
    direction: -1,
    color: "#F2A541",
  },
  {
    title: "Architecture",
    line: "Postgres + Redis + queues",
    orbit: 0.84,
    flatten: 0.42,
    tilt: -0.38,
    speed: 0.12,
    phase: 4,
    direction: 1,
    color: "#ECE8DF",
  },
  {
    title: "Product",
    line: "Idea to shipped, 850+ users",
    orbit: 0.9,
    flatten: 0.48,
    tilt: 0.14,
    speed: 0.095,
    phase: 5.4,
    direction: -1,
    color: "rgb(242,190,120)",
  },
];

const INITIAL_SCENE_SIZE = 520;

function initialMoonTransform(moon: MoonSpec): string {
  const half = INITIAL_SCENE_SIZE / 2;
  const angle = moon.phase;
  const x0 = Math.cos(angle) * moon.orbit * half;
  const y0 = Math.sin(angle) * moon.orbit * half * moon.flatten;
  const x = x0 * Math.cos(moon.tilt) - y0 * Math.sin(moon.tilt);
  const y = x0 * Math.sin(moon.tilt) + y0 * Math.cos(moon.tilt);
  return `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
}

const DISC_STYLE = {
  background:
    "repeating-radial-gradient(circle at 50% 50%, rgba(236,232,223,0.05) 0 1px, transparent 1px 4px), #0F1420",
  boxShadow: "inset 0 0 0 1px rgba(236,232,223,0.12)",
};

function SaturnRings({ front = false }: { front?: boolean }) {
  const clipId = front ? "hero-ring-front-clip" : "hero-ring-back-clip";
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {front ? (
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="100" width="200" height="100" />
          </clipPath>
        </defs>
      ) : null}
      <g clipPath={front ? `url(#${clipId})` : undefined}>
        <g transform="rotate(-18 100 100)" fill="none">
          <ellipse cx="100" cy="100" rx="90" ry="26" stroke="#ECE8DF" strokeWidth="0.9" opacity="0.25" />
          <ellipse cx="100" cy="100" rx="83.5" ry="23.8" stroke="#F2A541" strokeWidth="4" opacity="0.8" />
          <ellipse cx="100" cy="100" rx="75" ry="21" stroke="#ECE8DF" strokeWidth="1.2" opacity="0.4" />
          <ellipse cx="100" cy="100" rx="67" ry="18.6" stroke="#ECE8DF" strokeWidth="0.7" opacity="0.2" />
        </g>
      </g>
    </svg>
  );
}

export function OrbitalHero() {
  const { playing, toggle, getLevel, getFrequencyData, playNote, frequency } =
    useCosmicAudio();

  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const moonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const pausedRef = useRef<boolean[]>(MOONS.map(() => false));
  const activeIndexRef = useRef<number | null>(null);
  const playingRef = useRef(playing);
  const layoutRef = useRef<() => void>(() => {});
  const [active, setActive] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    layoutRef.current();
  }, [active]);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const disc = discRef.current;
    if (!scene || !canvas || !disc) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let size = scene.clientWidth;
    let raf = 0;
    let last = performance.now();
    let elapsed = 0;
    let discAngle = 0;
    const angles = MOONS.map((moon) => moon.phase);
    const positions = MOONS.map(() => ({ x: 0, y: 0 }));

    const resize = () => {
      size = scene.clientWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(size * dpr));
      canvas.height = Math.max(1, Math.round(size * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const placeMoons = () => {
      const half = size / 2;
      moonRefs.current.forEach((el, i) => {
        if (!el) return;
        const moon = MOONS[i];
        const angle = angles[i];
        const x0 = Math.cos(angle) * moon.orbit * half;
        const y0 = Math.sin(angle) * moon.orbit * half * moon.flatten;
        const x = x0 * Math.cos(moon.tilt) - y0 * Math.sin(moon.tilt);
        const y = x0 * Math.sin(moon.tilt) + y0 * Math.cos(moon.tilt);
        positions[i].x = x;
        positions[i].y = y;
        el.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      });
    };

    const placeTooltip = () => {
      const tip = tipRef.current;
      const index = activeIndexRef.current;
      if (!tip || index === null) return;
      const half = size / 2;
      const point = positions[index];
      const width = tip.offsetWidth || 168;
      const height = tip.offsetHeight || 44;
      const maxX = Math.max(0, half - width / 2 - 6);
      const x = Math.max(-maxX, Math.min(maxX, point.x));
      const y = Math.max(-half + height + 6, point.y - 26);
      tip.style.transform = `translate(-50%, -100%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    };

    const layout = () => {
      placeMoons();
      placeTooltip();
    };
    layoutRef.current = layout;

    const drawRing = (t: number) => {
      if (!size) return;
      const center = size / 2;
      ctx.clearRect(0, 0, size, size);

      const data = getFrequencyData();
      const level = getLevel();
      const live = playingRef.current && data !== null && level > 0.006;

      if (live && data) {
        const bars = 120;
        const inner = size * 0.285;
        const maxLen = size * 0.058;
        ctx.lineCap = "round";
        ctx.lineWidth = Math.max(1.4, size * 0.0042);
        for (let i = 0; i < bars; i++) {
          const bin = Math.floor((i / bars) * (data.length * 0.72));
          const value = data[bin] / 255;
          const amplitude = Math.pow(value, 0.75);
          const angle = (i / bars) * Math.PI * 2 - Math.PI / 2 + t * 0.18;
          const length = Math.max(size * 0.006, amplitude * maxLen);
          const r1 = inner + length;
          ctx.strokeStyle = "#F2A541";
          ctx.globalAlpha = 0.3 + amplitude * 0.7;
          ctx.beginPath();
          ctx.moveTo(center + Math.cos(angle) * inner, center + Math.sin(angle) * inner);
          ctx.lineTo(center + Math.cos(angle) * r1, center + Math.sin(angle) * r1);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      } else {
        const breathe = reduced ? 0.5 : (Math.sin(t * 0.9) + 1) / 2;
        const radius = size * 0.285 + breathe * size * 0.006;
        ctx.strokeStyle = "#F2A541";
        ctx.lineWidth = Math.max(1.2, size * 0.0035);
        ctx.globalAlpha = 0.45 + breathe * 0.25;
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 0.18 + breathe * 0.12;
        ctx.beginPath();
        ctx.arc(center, center, radius + size * 0.012, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      elapsed += dt;
      discAngle += dt * (playingRef.current ? 1.15 : 0.24);
      disc.style.transform = `rotate(${discAngle}rad)`;
      MOONS.forEach((moon, i) => {
        if (!pausedRef.current[i]) angles[i] += dt * moon.speed * moon.direction;
      });
      layout();
      drawRing(elapsed);
      raf = window.requestAnimationFrame(frame);
    };

    resize();
    if (reduced) {
      disc.style.transform = "rotate(0rad)";
      layout();
      drawRing(0);
    } else {
      raf = window.requestAnimationFrame(frame);
    }

    const observer = new ResizeObserver(() => {
      resize();
      layout();
      if (reduced) drawRing(0);
    });
    observer.observe(scene);

    const onVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      } else if (!reduced && raf === 0) {
        last = performance.now();
        raf = window.requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [getFrequencyData, getLevel, reduced]);

  const handleEnter = (index: number) => {
    pausedRef.current[index] = true;
    activeIndexRef.current = index;
    setActive(index);
    playNote(index * 2, { velocity: 0.35, duration: 0.7 });
  };

  const handleLeave = (index: number) => {
    pausedRef.current[index] = false;
    if (activeIndexRef.current === index) {
      activeIndexRef.current = null;
      setActive(null);
    }
  };

  return (
    <div className="relative flex w-full justify-center lg:justify-end">
      <div
        ref={sceneRef}
        className="relative aspect-square w-[min(520px,90vw)] select-none"
      >
        <svg
          viewBox="0 0 200 200"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {MOONS.map((moon, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="100"
              rx={moon.orbit * 100}
              ry={moon.orbit * 100 * moon.flatten}
              fill="none"
              stroke="rgba(236,232,223,0.14)"
              strokeWidth="0.4"
              strokeDasharray="1.5 3.5"
              transform={`rotate(${(moon.tilt * 180) / Math.PI} 100 100)`}
            />
          ))}
        </svg>

        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        <SaturnRings />

        <div className="absolute left-1/2 top-1/2 aspect-square w-[52%] -translate-x-1/2 -translate-y-1/2">
          <div
            ref={discRef}
            className="absolute inset-0 rounded-full will-change-transform"
            style={DISC_STYLE}
          />
          <button
            type="button"
            onClick={toggle}
            aria-pressed={playing}
            aria-label={playing ? "Pause the yxu.fm signal" : "Play the yxu.fm signal"}
            className="absolute left-1/2 top-1/2 grid aspect-square w-[36%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-space transition-colors duration-300 hover:border-arcturus/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arcturus/70"
          >
            <LogoIcon size={56} className="h-[68%] w-[68%]" />
          </button>
        </div>

        <SaturnRings front />

        {MOONS.map((moon, i) => (
          <button
            key={moon.title}
            ref={(el) => {
              moonRefs.current[i] = el;
            }}
            type="button"
            title={`${moon.title} — ${moon.line}`}
            aria-label={`${moon.title} — ${moon.line}`}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
            onFocus={() => handleEnter(i)}
            onBlur={() => handleLeave(i)}
            className="group absolute left-1/2 top-1/2 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-hull transition-colors duration-300 hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arcturus/70"
            style={{
              willChange: "transform",
              transform: initialMoonTransform(moon),
            }}
          >
            <span
              aria-hidden="true"
              className="h-3 w-3 rounded-full"
              style={{ background: moon.color }}
            />
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-full border border-white/0 transition-colors duration-300 group-hover:border-white/15"
            />
          </button>
        ))}

        <div
          ref={tipRef}
          aria-hidden="true"
          className={`pointer-events-none absolute left-1/2 top-1/2 z-30 w-max max-w-[184px] rounded-lg border border-white/15 bg-hull px-3 py-2 text-left transition-opacity duration-150 ${
            active === null ? "opacity-0" : "opacity-100"
          }`}
          style={{ transform: "translate(-50%, -100%)" }}
        >
          {active !== null ? (
            <>
              <span
                className="block text-[12px] font-medium"
                style={{ color: MOONS[active].color }}
              >
                {MOONS[active].title}
              </span>
              <span className="mt-0.5 block text-[11px] leading-snug text-dust">
                {MOONS[active].line}
              </span>
            </>
          ) : null}
        </div>

        {!playing ? (
          <span className="pointer-events-none absolute bottom-[3%] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-hull px-3 py-1 text-[12px] text-starlight">
            Click the record
          </span>
        ) : (
          <span className="pointer-events-none absolute bottom-[3%] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] text-arcturus">
            {frequency}, on air
          </span>
        )}
      </div>
    </div>
  );
}
