/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        game: {
          bg: '#070b19',
          card: '#0e1738',
          board: '#03194a',
          accent: '#3b82f6',
          correct: '#10b981',
          error: '#ef4444',
          pass: '#f59e0b',
          gold: '#fbbf24',
          neon: '#00f5d4',
        }
      },
      fontFamily: {
        display: ['Outfit', 'Montserrat', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-short': 'bounce 0.5s ease-in-out 1',
      }
    },
  },
  plugins: [],
}
