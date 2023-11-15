/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			spacing: {
				'2xs': '4px',
				'3xs': '2px',
				sm: '6px',
				md: '12px',
				lg: '16px',
				xl: '20px',
				'2xl': '24px',
				'3xl': '32px'
			},
			height: {
				'screen-minus-header': 'calc(100vh - 130px)'
			},
			colors: {
				gray: {
					dark: {
						0: '#0F0F0F',
						1: '#141414',
						2: '#1C1C1C',
						3: '#232323',
						4: '#282828',
						5: '#2E2E2E',
						6: '#343434',
						8: '#505050',
						9: '#707070',
						10: '#7E7E7E',
						11: '#A0A0A0',
						12: '#EDEDED',
						13: '#F7F7F7'
					}
				},
				mint: {
					dark: {
						1: '#081917',
						2: '#05201E',
						3: '#052926',
						4: '#04312C',
						5: '#033A34',
						6: '#01453D',
						7: '#00564A',
						8: '#006D5B',
						9: '#70E1C8',
						11: '#25D0AB',
						12: '#E7FCF7'
					}
				},
				orange: {
					dark: {
						2: '#2B1400',
						4: '#441F04',
						11: '#FF8B3E'
					}
				},
				indigo: {
					dark: {
						2: '#15192D',
						4: '#1C274F',
						11: '#849DFF'
					}
				},
				red: {
					dark: {
						2: '#291415',
						4: '#481A1D',
						5: '#541B1F',
						7: '#822025',
						8: '#AA2429',
						10: '#F2555A',
						11: '#FF6369'
					}
				}
			},
			borderRadius: {
				'3xs': '2px',
				'2xs': '4px'
			}
		},
		fontFamily: {
			architekt: 'nb-architekt, Arial, sans-serif',
			inter: 'Inter, Arial, sans-serif',
			unbounded: 'Unbounded, Arial, sans-serif'
		}
	},
	plugins: []
};
