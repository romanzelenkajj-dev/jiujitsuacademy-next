import { TatamiHero } from './TatamiHero'

type Props = {
  src?: string
  poster?: string
}

// Full-bleed background video with a dark overlay + red glow to keep the hero
// text legible. Falls back to the SVG tatami pattern if src is empty (useful
// for prerender / ultra-low-bandwidth clients that disable autoplay).
export function VideoHero({ src = '/video/adults.mp4', poster = '/video/adults-poster.jpg' }: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Fallback layer — the SVG tatami renders instantly and is masked by the
          video once it loads, so the hero never flashes empty. */}
      <TatamiHero />

      {src && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}

      {/* Darken + red-glow overlay so the headline stays readable over any frame */}
      <div className="absolute inset-0 bg-ink/55" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(228,0,43,0.22),transparent_55%)]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_55%,rgba(10,10,11,0.85)_100%)]"
      />
    </div>
  )
}
