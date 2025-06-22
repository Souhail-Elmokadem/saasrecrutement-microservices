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
      },
      backgroundSize: {
        '400': '400% 400%',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'gradient-flow': 'gradient-flow 10s ease infinite',
        fadeInUp: 'fadeInUp 0.7s ease-out forwards',

      },
      backgroundImage: {
        'sidebar-img': "url('/assets/img/sidebar-bg.jpg')", // ou le chemin exact
      },
      keyframes: {
        'gradient-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
    }
  },
  plugins: [],
}

