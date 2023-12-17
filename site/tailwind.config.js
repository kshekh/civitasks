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
        'mint-1': '#95F3D9',
        'green-1': '#25D0AB',
        'green-2': '#04312C',
        'gray-1': '#F7F7F7',
        'gray-2': '#EDEDED',
        'gray-3': '#E0DFDD',
        'gray-4': '#A0A0A0',
        'gray-5': '#878781',
        'gray-6': '#7E7E7E',
        'gray-7': '#505050',
        'gray-8': '#343434',
        'gray-9': '#1C1C1C',
        'gray-10': '#141414',
        'gray-11': '#0F0F0F',
        'gray-12': '#282828',
        'gray-13': '#171615',
      },
      backgroundImage: {
        'grid-1': 'url("/images/elements/grid-1.svg")',
        'grid-2': 'url("/images/elements/grid-2.png")',
        'illustration-3': 'url("/images/illustrations/illustration-3.png")',
        'illustration-6': 'url("/images/illustrations/illustration-6.png")',
        'illustration-6-m': 'url("/images/illustrations/illustration-6-m.png")',
        'illustration-7': 'url("/images/illustrations/illustration-7.png")',
        'illustration-12': 'url("/images/illustrations/illustration-12.png")',
      },
      content: {
        'plus-detail-1': 'url("/images/elements/plus-detail-1.svg")',
        'plus-detail-2': 'url("/images/elements/plus-detail-2.svg")',
        trophy: 'url("/images/icons/trophy.svg")',
        'right-angle': 'url("/images/icons/right-angle.svg")',
        minus: 'url("/images/icons/minus.svg")',
        plus: 'url("/images/icons/plus.svg")',
        'glitch-1': 'url("/images/elements/glitch-1.svg")',
        'glitch-2': 'url("/images/elements/glitch-2.svg")',
        globe: 'url("/images/elements/globe.svg")',
        'illustration-10': 'url("/images/illustrations/illustration-10.png")',
        'illustration-11': 'url("/images/illustrations/illustration-11.png")',
      },
    },
  },
  plugins: [],
};
