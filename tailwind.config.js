/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    fontFamily: {
      fontbase: ['Work Sans', 'sans-serif'],
    },

    extend: {
      colors: {
        bodycolor: '#F1F0EE',
        primarycolor: '#00FF84',
        secondarycolor: '#002333',
      },
    },
  },

  plugins: [],
};
