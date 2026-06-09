/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#050A14',
        'bg-secondary': '#0A1628',
        'bg-card': '#0D1F3C',
        'accent-cyan': '#00D4FF',
        'accent-blue': '#0066FF',
        'accent-green': '#00FF94',
        'text-primary': '#F0F4FF',
        'text-muted': '#6B7FA3',
      },
      fontFamily: {
        grotesk: ['var(--font-space-grotesk)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body-md': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'mono-sm': ['0.875rem', { lineHeight: '1.5' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'scanline': "repeating-linear-gradient(transparent 50%, rgba(0,212,255,0.02) 50%)",
      },
      backgroundSize: {
        'scanline': '100% 4px',
      },
      boxShadow: {
        'cyan-sm': '0 0 10px rgba(0,212,255,0.15)',
        'cyan-md': '0 0 20px rgba(0,212,255,0.2)',
        'cyan-lg': '0 0 40px rgba(0,212,255,0.25)',
        'cyan-glow': '0 0 60px rgba(0,212,255,0.3)',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-cyan': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,212,255,0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(0,212,255,0.5)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'bounce-chevron': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        'bbox': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-cyan': 'pulse-cyan 2s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'bounce-chevron': 'bounce-chevron 1.5s ease-in-out infinite',
        'bbox': 'bbox 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
