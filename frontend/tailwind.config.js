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
          50: '#e6f7f7',
          100: '#b3e9e9',
          200: '#80dada',
          300: '#4dcccc',
          400: '#1abdbd',
          500: '#00a8a8',
          600: '#008585',
          700: '#006363',
          800: '#004040',
          900: '#001e1e',
        },
        secondary: {
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50',
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20',
        }
      }
    },
  },
  plugins: [],
}
