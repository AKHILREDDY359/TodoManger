// filepath: /Users/akhilkumarreddyseelam/Documents/Todomanager/my-todo-app/tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        // Custom color palette
        'black': '#010101',
        'athens-gray': '#eeedf3',
        'chardonnay': '#fecf8b',
        'twine': '#c0855b',
        'saddle': '#50352a',
        'logan': '#afa0cb',
        'kimberly': '#6f5c92',
        'eastern-blue': '#1399a7',
      },
    },
  },
  plugins: [],
}