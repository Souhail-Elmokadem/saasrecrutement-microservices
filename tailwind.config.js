/** @type {import('tailwindcss').Config} */

// const plugin = require('preline/plugin');

module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './node_modules/preline/**/*.js'
  ]
  ,
  theme: {
    extend: {
      colors: {
        'top-color': '#8e4d57',
        'heading': '#fcfbfc',
      }
    }
  },
  plugins: [],
}

