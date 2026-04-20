import type { Locale } from '@/lib/i18n'

// Compact 3-card team grid. Photos mounted in /public/images/instructors/<slug>.webp
type Coach = {
  slug: 'roman-zelenka' | 'michal-kukumberg' | 'vladimir-urmanic'
  name: string
  title: { sk: string; en: string }
}

const COACHES: Coach[] = [
  {
    slug: 'roman-zelenka',
    name: 'Roman Zelenka',
    title: { sk: 'Čierny pás · 2. stupeň', en: '2nd Degree Black Belt' },
  },
  {
    slug: 'michal-kukumberg',
    name: 'Michal Kukumberg',
    title: { sk: 'Čierny pás · 1. stupeň', en: '1st Degree Black Belt' },
  },
  {
    slug: 'vladimir-urmanic',
    name: 'Vladimír Urmanič',
    title: { sk: 'Čierny pás', en: 'Black Belt' },
  },
]

export function InstructorGrid({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {COACHES.map((c) => (
        <div
          key={c.slug}
          className="group overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-800"
        >
          <div className="aspect-[4/5] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/instructors/${c.slug}.webp`}
              alt={c.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
          <div className="p-5">
            <h3 className="font-display text-xl font-semibold tracking-tight text-white">
              {c.name}
            </h3>
            <p className="mt-1 text-sm text-white/60">{c.title[locale]}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
