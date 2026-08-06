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
        bgBlack: '#FAFAFA',
        primaryWhite: '#09090B',
        softWhite: '#27272A',
        darkGray: '#FFFFFF',
        midGray: '#52525B',
        borderGray: 'rgba(0, 0, 0, 0.12)',
        cardBg: '#FFFFFF',
        cardBorder: 'rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'Geist', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
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
      },
    },
  },
  plugins: [],
};
