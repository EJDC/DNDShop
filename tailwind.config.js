/** @type {import('tailwindcss').Config} */

module.exports = {

  content: [
    "./index.html",

    "./src/**/*.tsx",
  ],

  theme: {

    extend: {
      colors: {
        primary: '#280003',
        secondary: '#baa898',
        highlight: '#c2847a',
        tertiary: '#eee0cb',
      },
      
    },

  },

  plugins: [],

}