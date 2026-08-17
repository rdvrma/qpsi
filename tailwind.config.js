/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Institutional Surface Palette
        surface: 'var(--surface)',
        'surface-raised': 'var(--surface-raised)',
        'surface-card': 'var(--surface-card)',
        'surface-subtle': 'var(--surface-subtle)',
        'surface-panel': 'var(--surface-panel)',

        // Text Ink Palette
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',

        // Hairline Borders
        border: 'var(--border)',
        'border-hover': 'var(--border-hover)',
        'border-subtle': 'var(--border-subtle)',

        // Accents
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-subtle': 'var(--accent-subtle)',
        'scientific-cyan': 'var(--scientific-cyan)',

        // Deep Evidence Room Tokens
        'evidence-surface': 'var(--evidence-surface)',
        'evidence-raised': 'var(--evidence-raised)',
        'evidence-card': 'var(--evidence-card)',
        'evidence-border': 'var(--evidence-border)',
        'evidence-text-primary': 'var(--evidence-text-primary)',
        'evidence-text-secondary': 'var(--evidence-text-secondary)',
        'evidence-text-muted': 'var(--evidence-text-muted)',

        // Status Indicators
        'status-pass': 'var(--status-pass)',
        'status-pass-bg': 'var(--status-pass-bg)',
        'status-inconclusive': 'var(--status-inconclusive)',
        'status-inconclusive-bg': 'var(--status-inconclusive-bg)',
        'status-fail': 'var(--status-fail)',
        'status-fail-bg': 'var(--status-fail-bg)',
        'status-exploratory': 'var(--status-exploratory)',
        'status-exploratory-bg': 'var(--status-exploratory-bg)',
        'status-pending': 'var(--status-pending)',
        'status-pending-bg': 'var(--status-pending-bg)',

        // Backward Compatibility
        bgBlack: '#101522',
        primaryWhite: '#10131A',
        softWhite: '#667085',
        darkGray: '#EAECE8',
        midGray: '#8B949E',
        borderGray: '#D8DCE3',
        cardBg: '#FFFFFF',
        cardBorder: '#D8DCE3',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Source Serif 4', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
