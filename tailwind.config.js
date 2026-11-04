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
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        lila: {
          50: '#FAF7FE',
          100: '#F3ECFC',
          200: '#E7D8F9',
          300: '#D5BEF4',
          400: '#BD9AEB',
          500: '#A474DF',
          600: '#8C52CF',
          700: '#753AB5',
          800: '#603095',
          900: '#50297B',
        },
        night: {
          bg: '#130F24',
          card: '#1D1735',
          cardHover: '#241E40',
          border: '#2E2552',
        }
      },
      boxShadow: {
        'cloud': '0 10px 30px -5px rgba(164, 116, 223, 0.12)',
        'cloud-lg': '0 20px 40px -8px rgba(164, 116, 223, 0.18)',
        'star': '0 0 15px rgba(192, 132, 252, 0.4)',
      }
    },
  },
  plugins: [],
}
