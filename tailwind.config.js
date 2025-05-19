/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    theme: {
      extend: {
        colors: {
          'game-dark': '#0d1117',
          'game-dark-light': '#161b22',
          'game-accent': '#58a6ff',
        },
        boxShadow: {
          'game': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: [],
  }