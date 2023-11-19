/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'tasa-orbiter-display': [
          'TASA Orbiter Display',
          ...defaultTheme.fontFamily.sans,
        ],
        'nb-architekt': ['NB Architekt', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand-black': '#0F0F0F',
        'brand-light-green': '#25D0AB',
        'brand-dark-green': '#04312C',
      },
      backgroundImage: {
        grid: 'url(/bg-grid.svg)',
      },
      content: {
        'shape-corner': 'url("/shape-corner.svg")',
      },
    },
  },
  plugins: [],
};
