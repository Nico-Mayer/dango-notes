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
		}),
		sveltekit(),
	],
}

export default config
