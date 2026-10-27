import { cn } from "@/lib/utils";

/**
 * YXU logo — the wordmark with an amber orbit through the X,
 * plus moon, sparkles and a vertical beam for the full version.
 */

export function LogoMark({ className, width = 86, height = 32 }: { className?: string; width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 120 40" fill="none" className={cn("shrink-0", className)} role="img" aria-label="YXU logo">
      <text
        x="60"
        y="29"
        textAnchor="middle"
        fontFamily="Archivo, ui-sans-serif, system-ui, sans-serif"
        fontWeight={800}
        fontSize={27}
        letterSpacing={3}
        fill="#ECE8DF"
      >
        YXU
      </text>
      <g transform="rotate(-24 60 21)">
        <ellipse cx="60" cy="21" rx="31" ry="7.5" stroke="#F2A541" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function LogoFull({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 430" fill="none" className={cn("mx-auto", className)} role="img" aria-label="YXU cosmic logo">
      <rect x="159.2" y="8" width="1.6" height="400" fill="#ECE8DF" opacity={0.25} />

      <g transform="translate(160 52)">
        <path d="M0 -11 C1 -3 3 -1 11 0 C3 1 1 3 0 11 C-1 3 -3 1 -11 0 C-3 -1 -1 -3 0 -11 Z" fill="#ECE8DF" />
      </g>

      <circle cx="160" cy="104" r="21" fill="#0F1420" stroke="#ECE8DF" strokeOpacity="0.5" strokeWidth="1" />

      <path d="M52 132 A115 115 0 0 1 138 118" stroke="#8C93A3" strokeOpacity="0.6" strokeWidth="1" fill="none" />
      <path d="M182 118 A115 115 0 0 1 268 132" stroke="#8C93A3" strokeOpacity="0.6" strokeWidth="1" fill="none" />
      <path d="M52 254 A115 115 0 0 0 138 268" stroke="#8C93A3" strokeOpacity="0.45" strokeWidth="1" fill="none" />
      <path d="M182 268 A115 115 0 0 0 268 254" stroke="#8C93A3" strokeOpacity="0.45" strokeWidth="1" fill="none" />
      <circle cx="160" cy="138" r="2" fill="#ECE8DF" />
      <circle cx="160" cy="148" r="1.3" fill="#ECE8DF" opacity={0.7} />

      <text
        x="160"
        y="222"
        textAnchor="middle"
        fontFamily="Archivo, ui-sans-serif, system-ui, sans-serif"
        fontWeight={800}
        fontSize={64}
        letterSpacing={6}
        fill="#ECE8DF"
      >
        YXU
      </text>
      <g transform="rotate(-24 160 196)">
        <ellipse cx="160" cy="196" rx="72" ry="16" stroke="#F2A541" strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>

      <g transform="translate(160 282)">
        <path d="M0 -10 C0.9 -2.8 2.8 -0.9 10 0 C2.8 0.9 0.9 2.8 0 10 C-0.9 2.8 -2.8 0.9 -10 0 C-2.8 -0.9 -0.9 -2.8 0 -10 Z" fill="#ECE8DF" />
      </g>
      <circle cx="160" cy="308" r="2.4" fill="#9FB8FF" />

      <path d="M20 408 Q160 372 300 408" stroke="#8C93A3" strokeWidth="1.6" fill="none" />
      <path d="M20 408 Q160 372 300 408 L300 430 L20 430 Z" fill="#070A12" />
      <circle cx="160" cy="393" r="2.6" fill="#F2A541" />
    </svg>
  );
}

export function LogoIcon({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} role="img" aria-label="YXU mark">
      <rect x="1" y="1" width="46" height="46" rx="12" fill="#0F1420" stroke="rgba(236,232,223,0.2)" />
      <text x="24" y="31" textAnchor="middle" fontFamily="Archivo, sans-serif" fontWeight={800} fontSize={19} fill="#ECE8DF">X</text>
      <g transform="rotate(-24 24 24)">
        <ellipse cx="24" cy="24" rx="16" ry="4.5" stroke="#F2A541" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      </g>
      <circle cx="35" cy="10" r="1.6" fill="#ECE8DF" />
    </svg>
  );
}
