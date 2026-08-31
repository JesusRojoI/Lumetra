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
        primary: {
          DEFAULT: '#1E2A47',
          light: '#2D3B5E',
          dark: '#151F36',
        },
        accent: {
          DEFAULT: '#FF6B35',
          light: '#FF8C5E',
          dark: '#E55525',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C558',
          dark: '#B8942F',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          light: '#FAF7F2',
          dark: '#E8DFD3',
        },
        teal: {
          DEFAULT: '#2A9D8F',
          light: '#4DB8AC',
          dark: '#1F7A70',
        },
      },
      fontFamily: {
        bentham: ['Bentham', 'serif'],
        unna: ['Unna', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config