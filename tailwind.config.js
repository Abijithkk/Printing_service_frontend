/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['"Open Sans"', 'sans-serif'],
        'bebas-neue': ['"Bebas Neue"', 'cursive'],
        inter: ['"Inter"', 'sans-serif'],
      },
      colors: {
        'qnl-lime': '#b8ff00',
      },
    },
  },
  plugins: [],
};
