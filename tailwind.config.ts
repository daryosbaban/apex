import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#050506',
          50: '#f5f5f6',
          100: '#e2e2e4',
          200: '#c5c5c9',
          300: '#9a9aa1',
          400: '#6b6b73',
          500: '#48484f',
          600: '#333338',
          700: '#232327',
          800: '#17171a',
          900: '#0d0d0f',
          950: '#050506',
        },
        charcoal: {
          DEFAULT: '#121215',
          light: '#1b1b1f',
          lighter: '#242429',
        },
        silver: {
          DEFAULT: '#c7cad1',
          50: '#f7f8f9',
          100: '#eceef0',
          200: '#dadde2',
          300: '#c7cad1',
          400: '#a9adb8',
          500: '#8b8f9c',
          600: '#6b6f7b',
          700: '#52555f',
          800: '#3a3c44',
          900: '#232429',
        },
        gold: {
          DEFAULT: '#c9a24a',
          50: '#fbf6e9',
          100: '#f5e8c6',
          200: '#ecd598',
          300: '#e0bd66',
          400: '#d4ab48',
          500: '#c9a24a',
          600: '#a9803a',
          700: '#87632f',
          800: '#664a25',
          900: '#4a361c',
          foil: '#e8cd8a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'metal-gradient': 'linear-gradient(135deg, #f5f6f7 0%, #c7cad1 25%, #8b8f9c 50%, #c7cad1 75%, #f5f6f7 100%)',
        'gold-gradient': 'linear-gradient(135deg, #f5e8c6 0%, #c9a24a 45%, #87632f 75%, #e0bd66 100%)',
        'dark-radial': 'radial-gradient(circle at 50% 0%, #1b1b1f 0%, #050506 70%)',
        'card-sheen': 'linear-gradient(120deg, transparent 30%, rgba(201,162,74,0.08) 45%, transparent 60%)',
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(201,162,74,0.35), 0 8px 30px -8px rgba(201,162,74,0.25)',
        silver: '0 0 0 1px rgba(199,202,209,0.25), 0 8px 30px -8px rgba(199,202,209,0.15)',
        elevated: '0 20px 60px -15px rgba(0,0,0,0.6)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
};

export default config;
