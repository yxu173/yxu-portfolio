import { cn } from "@/lib/utils";

/**
 * YXU logo — vector recreation of the cosmic mark:
 * gradient YXU wordmark with a luminous orbit through the X,
 * moon + sparkles + vertical beam for the full ceremonial version.
 */

export function LogoMark({ className, width = 86, height = 32 }: { className?: string; width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 120 40" fill="none" className={cn("shrink-0", className)} role="img" aria-label="YXU logo">
      <defs>
        <linearGradient id="yxu-text" x1="0" y1="0" x2="120" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#C7D2FE" />
          <stop offset="75%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="yxu-orbit" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="40%" stopColor="#60A5FA" />
          <stop offset="70%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <filter id="yxu-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <text
        x="60"
        y="29"
        textAnchor="middle"
        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
        fontWeight={800}
        fontSize={27}
        letterSpacing={3}
        fill="url(#yxu-text)"
      >
        YXU
      </text>
      {/* orbit through the X */}
      <g transform="rotate(-24 60 21)" filter="url(#yxu-glow)">
        <ellipse cx="60" cy="21" rx="31" ry="7.5" stroke="url(#yxu-orbit)" strokeWidth={3} fill="none" strokeLinecap="round" />
        <ellipse cx="60" cy="21" rx="31" ry="7.5" stroke="white" strokeWidth={0.7} fill="none" strokeLinecap="round" opacity={0.65} />
      </g>
    </svg>
  );
}

export function LogoFull({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 430" fill="none" className={cn("mx-auto", className)} role="img" aria-label="YXU cosmic logo">
      <defs>
        <linearGradient id="yxuf-text" x1="20" y1="150" x2="300" y2="230" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#C7D2FE" />
          <stop offset="78%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="yxuf-orbit" x1="60" y1="0" x2="260" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="45%" stopColor="#60A5FA" />
          <stop offset="75%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="yxuf-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="#C7D2FE" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="yxuf-moon" cx="0.35" cy="0.35" r="0.9">
          <stop offset="0%" stopColor="#0B011A" />
          <stop offset="72%" stopColor="#0B011A" />
          <stop offset="86%" stopColor="#C7D2FE" />
          <stop offset="100%" stopColor="#818CF8" />
        </radialGradient>
        <filter id="yxuf-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* vertical beam */}
      <rect x="159.2" y="8" width="1.6" height="400" fill="url(#yxuf-beam)" opacity={0.8} />

      {/* top sparkle */}
      <g transform="translate(160 52)" filter="url(#yxuf-glow)">
        <path d="M0 -11 C1 -3 3 -1 11 0 C3 1 1 3 0 11 C-1 3 -3 1 -11 0 C-3 -1 -1 -3 0 -11 Z" fill="#E0E7FF" />
      </g>

      {/* moon */}
      <circle cx="160" cy="104" r="21" fill="url(#yxuf-moon)" stroke="#A5B4FC" strokeOpacity="0.7" strokeWidth="1" />

      {/* outer thin orbit arcs */}
      <path d="M52 132 A115 115 0 0 1 138 118" stroke="#A5B4FC" strokeOpacity="0.5" strokeWidth="1" fill="none" />
      <path d="M182 118 A115 115 0 0 1 268 132" stroke="#A5B4FC" strokeOpacity="0.5" strokeWidth="1" fill="none" />
      <path d="M52 254 A115 115 0 0 0 138 268" stroke="#A5B4FC" strokeOpacity="0.4" strokeWidth="1" fill="none" />
      <path d="M182 268 A115 115 0 0 0 268 254" stroke="#A5B4FC" strokeOpacity="0.4" strokeWidth="1" fill="none" />
      <circle cx="160" cy="138" r="2" fill="#C7D2FE" />
      <circle cx="160" cy="148" r="1.3" fill="#C7D2FE" opacity={0.7} />

      {/* wordmark */}
      <text
        x="160"
        y="222"
        textAnchor="middle"
        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
        fontWeight={800}
        fontSize={64}
        letterSpacing={6}
        fill="url(#yxuf-text)"
      >
        YXU
      </text>
      {/* orbit through X */}
      <g transform="rotate(-24 160 196)" filter="url(#yxuf-glow)">
        <ellipse cx="160" cy="196" rx="72" ry="16" stroke="url(#yxuf-orbit)" strokeWidth={6.5} fill="none" strokeLinecap="round" />
        <ellipse cx="160" cy="196" rx="72" ry="16" stroke="white" strokeWidth={1.4} fill="none" opacity={0.7} />
      </g>

      {/* bottom sparkle */}
      <g transform="translate(160 282)" filter="url(#yxuf-glow)">
        <path d="M0 -10 C0.9 -2.8 2.8 -0.9 10 0 C2.8 0.9 0.9 2.8 0 10 C-0.9 2.8 -2.8 0.9 -10 0 C-2.8 -0.9 -0.9 -2.8 0 -10 Z" fill="#E0E7FF" />
      </g>
      <circle cx="160" cy="308" r="2.4" fill="#93C5FD" />

      {/* horizon over planet */}
      <path d="M20 408 Q160 372 300 408" stroke="#BFDBFE" strokeWidth="1.6" fill="none" opacity={0.95} />
      <path d="M20 408 Q160 372 300 408 L300 430 L20 430 Z" fill="#02010A" opacity={0.9} />
      <circle cx="160" cy="393" r="2.6" fill="white" filter="url(#yxuf-glow)" />
    </svg>
  );
}

export function LogoIcon({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} role="img" aria-label="YXU mark">
      <defs>
        <linearGradient id="yxui-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F112A" />
          <stop offset="100%" stopColor="#1E1B4B" />
        </linearGradient>
        <linearGradient id="yxui-t" x1="0" y1="0" x2="48" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
        <linearGradient id="yxui-o" x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="46" height="46" rx="12" fill="url(#yxui-bg)" stroke="rgba(165,180,252,0.4)" />
      <text x="24" y="31" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={800} fontSize={19} fill="url(#yxui-t)">X</text>
      <g transform="rotate(-24 24 24)">
        <ellipse cx="24" cy="24" rx="16" ry="4.5" stroke="url(#yxui-o)" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      </g>
      <circle cx="35" cy="10" r="1.6" fill="#E0E7FF" />
    </svg>
  );
}
