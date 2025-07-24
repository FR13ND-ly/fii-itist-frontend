/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#d03e45',
          dark: '#0e7490', 
        },
        secondary: {
          DEFAULT: '#121023',
          dark: '#334155',
        },
      },
      animation: {
        'marquee-up': 'marquee-up var(--duration, 30s) linear infinite',
        'marquee-down': 'marquee-down var(--duration, 30s) linear infinite',
      },
      keyframes: {
        'marquee-up': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        'marquee-down': {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}