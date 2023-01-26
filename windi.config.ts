import { defineConfig } from 'windicss/helpers'

export default defineConfig({
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				nord0: '#2E3440',
				nord1: '#3B4252',
				nord2: '#434C5E',
				nord3: '#4C566A',
				nord4: '#D8DEE9',
				nord5: '#E5E9F0',
				nord6: '#ECEFF4',
				nord7: '#8FBCBB',
				nord8: '#88C0D0',
				nord9: '#81A1C1',
				nord10: '#5E81AC',
				nord11: '#BF616A',
				nord12: '#D08770',
				nord13: '#EBCB8B',
				nord14: '#A3BE8C',
				nord15: '#B48EAD',
			},
		},
	},
	plugins: [
		// Other plugins
		require('@windicss/plugin-animations')({
			settings: {
				animatedSpeed: 1000,
				heartBeatSpeed: 1000,
				hingeSpeed: 2000,
				bounceInSpeed: 750,
				bounceOutSpeed: 750,
				animationDelaySpeed: 1000,
			},
		}),
	],
	shortcuts: {
		btn: 'rounded-lg h-5 text-lg transition-all ease-in-out w-5 duration-250 hover:bg-nord2 hover:text-nord6',
		trans: 'transition-all ease-in-out duration-250',
		rubberBand: 'animate-rubberBand animate-animated',
	},
})
