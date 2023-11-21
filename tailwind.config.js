/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Work Sans']
      },
      colors: {
        'sail': '#B3E1F7',
        'rolling-stone': '#70757A',
        'royal-blue': '#1A73E8',
        'hawkes-blue': '#D2E3FC',
      }
    },
  },
  plugins: [],
}

