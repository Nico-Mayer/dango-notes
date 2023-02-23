<script lang="ts">
	import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core'
	import { commonmark } from '@milkdown/preset-commonmark'

	import { nord } from '@milkdown/theme-nord'
	import '@milkdown/theme-nord/style.css'

	export let defaultValue: string

	function editor(dom: HTMLDivElement) {
		Editor.make()
			.config(nord)
			.config((ctx) => {
				ctx.set(rootCtx, dom)
				ctx.set(defaultValueCtx, defaultValue)
			})
			.use(commonmark)
			.create()
	}
</script>

<div use:editor />
