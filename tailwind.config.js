/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      colors: {
        cozy: {
          bg: '#FBF9F5',
          card: '#FFFFFF',
          border: '#EDE8E0',
          darkBg: '#181614',
          darkCard: '#23201D',
          darkBorder: '#36302B',
          matcha: '#688F6D',
          terracotta: '#D97746',
          caramel: '#C27838',
          honey: '#E59B3B',
          cream: '#F4EFE6'
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(120, 100, 80, 0.06)',
        'soft-lg': '0 10px 30px -4px rgba(120, 100, 80, 0.08)',
      }
    },
  },
  plugins: [],
}
