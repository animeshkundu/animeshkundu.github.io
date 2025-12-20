/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7f4',
          100: '#fceee8',
          200: '#f9dbd0',
          300: '#f3bda8',
          400: '#eb9471',
          500: '#e06b47',
          600: '#cc4e2d',
          700: '#ab3d24',
          800: '#8d3522',
          900: '#752f21',
          950: '#40160d',
        },
        accent: {
          50: '#f0fdfb',
          100: '#cbfcf4',
          200: '#97f8ea',
          300: '#5becd9',
          400: '#29d6c4',
          500: '#10b9a8',
          600: '#099589',
          700: '#0c766f',
          800: '#0e5e59',
          900: '#114e4a',
          950: '#032e2d',
        },
        'dark-bg-base': '#121212',
        'dark-bg-surface': '#1e1e1e',
        'dark-bg-alt': '#1a1a1a',
        'dark-bg-elevated': '#2a2a2a',
        'dark-text-primary': '#e8e6e3',
        'dark-text-secondary': '#b8b6b3',
        'dark-text-tertiary': '#8a8a8a',
        'dark-border': '#3a3a3a',
        'dark-border-hover': '#4a4a4a',
        'dark-primary': '#f0927a',
        'dark-primary-hover': '#ffb399',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgb(99 102 241 / 0.5), 0 0 20px rgb(99 102 241 / 0.3)' },
          '100%': { boxShadow: '0 0 20px rgb(99 102 241 / 0.8), 0 0 40px rgb(99 102 241 / 0.4)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': `
          radial-gradient(at 0% 0%, rgb(99 102 241 / 0.15) 0px, transparent 50%),
          radial-gradient(at 100% 0%, rgb(168 85 247 / 0.15) 0px, transparent 50%),
          radial-gradient(at 100% 100%, rgb(236 72 153 / 0.15) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgb(59 130 246 / 0.15) 0px, transparent 50%)
        `,
      },
    },
  },
  plugins: [],
};
