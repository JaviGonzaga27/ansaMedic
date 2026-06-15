import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Marca: teal (se mantiene)
        teal: {
          50: '#f0fdfc',
          100: '#ccfbf6',
          200: '#99f6ec',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0f7d80',
          700: '#0e6469',
          800: '#115e59',
          900: '#134e4a',
        },
        // Neutros cálidos (fondos crema/arena) — base "cálido y cercano"
        cream: {
          50: '#fdfbf7',
          100: '#faf5ec',
          200: '#f3e9d7',
          300: '#e9d8bd',
          400: '#dcc3a0',
        },
        // Acento cálido (coral/durazno) que combina con el teal
        coral: {
          50: '#fff6f1',
          100: '#ffe9dd',
          200: '#ffd0ba',
          300: '#ffae8b',
          400: '#ff8a5f',
          500: '#f96c3d',
          600: '#e5511f',
          700: '#be3f17',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideUp': 'slideUp 0.8s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
        'blob': 'blob 9s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(20px, -30px) scale(1.08)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.94)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      boxShadow: {
        'teal-glow': '0 0 20px rgba(20, 184, 166, 0.3)',
        'teal-glow-lg': '0 0 30px rgba(20, 184, 166, 0.4)',
        'premium': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'premium-lg': '0 20px 60px rgba(0, 0, 0, 0.15)',
        // Sombras cálidas y suaves (tono arena, no negro puro)
        'warm': '0 10px 30px -8px rgba(120, 80, 40, 0.12)',
        'warm-lg': '0 24px 50px -12px rgba(120, 80, 40, 0.18)',
        'soft': '0 2px 14px -4px rgba(120, 90, 60, 0.10)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-teal': 'linear-gradient(135deg, #0f7d80 0%, #14b8a6 100%)',
        'gradient-warm': 'linear-gradient(135deg, #faf5ec 0%, #fff6f1 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
