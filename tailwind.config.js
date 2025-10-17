/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#614ea5',
        secondary: '#493b7b',
        accent: '#9e8eff',
        purple: {
          50: '#f5f4f8',
          100: '#ebe9f1',
          200: '#d7d3e3',
          300: '#c3bdd5',
          400: '#afa7c7',
          500: '#9b93b9',
          600: '#614ea5',
          700: '#493b7b',
          800: '#1a0b2e',
          900: '#0f0f23',
        },
      },
      fontFamily: {
        'inter': ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'roboto-mono': ['Roboto-Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
