// Pure-SVG tatami texture — dark ink base + subtle red accent tiles.
// Zero bytes of raster data so it scales perfectly at any DPI.
export function TatamiHero({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Tatami weave — fine diagonal cross-hatch */}
          <pattern id="weave" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M0 10 L10 0" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
            <path d="M-2 2 L2 -2 M8 12 L12 8" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
          </pattern>

          {/* Mat tiles — big rounded panels arranged like a dojo floor */}
          <pattern id="tiles" width="240" height="240" patternUnits="userSpaceOnUse">
            <rect
              x="8" y="8" width="224" height="224"
              rx="28" ry="28"
              fill="url(#weave)"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          </pattern>

          <radialGradient id="spot" cx="70%" cy="20%" r="70%">
            <stop offset="0%" stopColor="#2A0710" stopOpacity="1" />
            <stop offset="60%" stopColor="#0A0A0B" stopOpacity="1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="1" />
          </radialGradient>

          <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E4002B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#9F001D" stopOpacity="0.65" />
          </linearGradient>

          <filter id="soft" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>

        {/* base */}
        <rect width="1440" height="900" fill="url(#spot)" />

        {/* tatami tiling */}
        <rect width="1440" height="900" fill="url(#tiles)" />

        {/* red competition square — the classic "fight area" on a BJJ mat */}
        <rect
          x="420" y="180" width="640" height="640"
          rx="48" ry="48"
          fill="none"
          stroke="url(#accent)"
          strokeWidth="3"
          strokeDasharray="2 8"
          opacity="0.55"
        />

        {/* red glow */}
        <circle cx="1180" cy="200" r="260" fill="#E4002B" opacity="0.18" filter="url(#soft)" />
        <circle cx="260" cy="760" r="300" fill="#E4002B" opacity="0.10" filter="url(#soft)" />

        {/* thin center line (like a jiu-jitsu mat seam) */}
        <line x1="0" y1="450" x2="1440" y2="450" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <line x1="720" y1="0" x2="720" y2="900" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      </svg>

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.75)_100%)]" />
    </div>
  )
}
