/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				'tasa-orbiter-display': ['TASA Orbiter Display', ...defaultTheme.fontFamily.sans],
				'nb-architekt': ['NB Architekt', ...defaultTheme.fontFamily.sans]
			},
			colors: {
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
				'gray-11': '#0F0F0F'
			},
			backgroundImage: {
				grid: 'url(/bg-grid.svg)'
			},
			content: {
				'shape-corner': 'url("/shape-corner.svg")'
			}
		}
	},
	plugins: []
};
