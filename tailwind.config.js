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
        // Quantum Obsidian Tokens
        surface: 'var(--surface)',
        'surface-raised': 'var(--surface-raised)',
        'surface-card': 'var(--surface-card)',
        'surface-subtle': 'var(--surface-subtle)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        border: 'var(--border)',
        'border-hover': 'var(--border-hover)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-subtle': 'var(--accent-subtle)',
        'accent-indigo': 'var(--accent-indigo)',
        'status-pass': 'var(--status-pass)',
        'status-pass-bg': 'var(--status-pass-bg)',
        'status-inconclusive': 'var(--status-inconclusive)',
        'status-inconclusive-bg': 'var(--status-inconclusive-bg)',
        'status-fail': 'var(--status-fail)',
        'status-fail-bg': 'var(--status-fail-bg)',
        'status-exploratory': 'var(--status-exploratory)',
        'status-exploratory-bg': 'var(--status-exploratory-bg)',

        // Backward Compatibility Tokens
        bgBlack: '#05070E',
        primaryWhite: '#F8FAFC',
        softWhite: '#E2E8F0',
        darkGray: '#0A0D18',
        midGray: '#94A3B8',
        borderGray: 'rgba(255, 255, 255, 0.08)',
        cardBg: '#0F1527',
        cardBorder: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'laser-glow': 'laserGlow 4s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
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
        laserGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.3))' },
          '50%': { filter: 'drop-shadow(0 0 25px rgba(0, 240, 255, 0.7))' },
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
