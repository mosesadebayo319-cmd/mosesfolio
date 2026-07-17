import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        foreground: '#f8f9fa',
        card: '#1e293b',
        muted: '#475569',
        'muted-foreground': '#cbd5e1',
        accent: '#14b8a6',
        'accent-foreground': '#0f172a',
        border: '#334155',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        display: 'var(--font-display)',
        heading: 'var(--font-heading)',
      },
      borderRadius: {
        lg: '0.65rem',
      },
    },
  },
  plugins: [],
}

export default config
