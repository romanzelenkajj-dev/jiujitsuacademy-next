import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — deep black base + signature BJJ red
        ink: {
          DEFAULT: '#0A0A0B',
          900: '#0A0A0B',
          800: '#131316',
          700: '#1C1C21',
          600: '#2A2A30',
          500: '#3A3A42',
        },
        mat: '#E8E4DC', // warm off-white (tatami)
        blood: {
          DEFAULT: '#E4002B',
          600: '#C20024',
          700: '#9F001D',
          400: '#FF2E56',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-satoshi)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        card: '0 10px 40px -15px rgba(0,0,0,0.35)',
        glow: '0 0 0 1px rgba(228,0,43,0.35), 0 10px 40px -15px rgba(228,0,43,0.45)',
      },
      backgroundImage: {
        'grid-soft':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
}
export default config
