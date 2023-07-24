/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#05668D',
        secondary: '#93827F',
        black: '#020202',
        white: '#FFFFFF',
      },
      keyframes: {
        toggle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        toggle: 'toggle 2s step-start infinite',
      },
    },
    plugins: [],
  },
};
