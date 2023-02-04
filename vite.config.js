import { sveltekit } from '@sveltejs/kit/vite'
import Unocss from 'unocss/vite'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		Unocss({
			mode: 'svelte-scoped',
			presets: [presetUno(), presetIcons()],
			transformers: [transformerDirectives(), transformerVariantGroup()],
			theme: {
				colors: {
					nord: {
						0: '#2E3440',
						1: '#3B4252',
						2: '#434C5E',
						3: '#4C566A',
						4: '#D8DEE9',
						5: '#E5E9F0',
						6: '#ECEFF4',
						7: '#8FBCBB',
						8: '#88C0D0',
						9: '#81A1C1',
						10: '#5E81AC',
						11: '#BF616A',
						12: '#D08770',
						13: '#EBCB8B',
						14: '#A3BE8C',
						15: '#B48EAD',
					},
				},
			},
			shortcuts: {
				trans: 'transition-all ease-in-out duration-250',
				btn: 'rounded-lg h-6 w-6 text-lg trans hover:(bg-nord6 dark:bg-nord2)',
				shortcut:
					'rounded-lg flex bg-nord6 h-13 w-13 trans items-center justify-center dark:bg-nord2 hover:bg-nord5 dark:hover:bg-nord3',
				activeItem: 'bg-nord5 dark:bg-nord2',
			},
		}),
		sveltekit(),
	],
}

export default config
