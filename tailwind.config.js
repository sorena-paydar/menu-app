/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    maxHeight: {
      '310': '310px',
    },
    extend: {},
  },
  plugins: [],
  purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.jsx', './src/**/*.tsx'],
}
