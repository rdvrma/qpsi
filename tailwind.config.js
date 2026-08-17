/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic Tokens
        surface: 'var(--surface)',
        'surface-raised': 'var(--surface-raised)',
        'surface-subtle': 'var(--surface-subtle)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        border: 'var(--border)',
        'border-hover': 'var(--border-hover)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-subtle': 'var(--accent-subtle)',
        'status-pass': 'var(--status-pass)',
        'status-pass-bg': 'var(--status-pass-bg)',
        'status-inconclusive': 'var(--status-inconclusive)',
        'status-inconclusive-bg': 'var(--status-inconclusive-bg)',
        'status-fail': 'var(--status-fail)',
        'status-fail-bg': 'var(--status-fail-bg)',
        'status-exploratory': 'var(--status-exploratory)',
        'status-exploratory-bg': 'var(--status-exploratory-bg)',

        // Backward Compatibility Tokens
        bgBlack: '#F7F7F4',
        primaryWhite: '#0A0A0B',
        softWhite: '#27272A',
        darkGray: '#FFFFFF',
        midGray: '#52525B',
        borderGray: 'rgba(10, 10, 11, 0.12)',
        cardBg: '#FFFFFF',
        cardBorder: 'rgba(10, 10, 11, 0.12)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
