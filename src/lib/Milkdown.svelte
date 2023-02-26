<script lang="ts">
	import { splitEditing } from '@milkdown-lab/plugin-split-editing'
	import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core'
	import { history } from '@milkdown/plugin-history'
	import { indent } from '@milkdown/plugin-indent'
	import { listener, listenerCtx } from '@milkdown/plugin-listener'
	import { prism, prismConfig } from '@milkdown/plugin-prism'
	import { commonmark } from '@milkdown/preset-commonmark'
	import { gfm } from '@milkdown/preset-gfm'
	import { nord } from '@milkdown/theme-nord'
	import '@milkdown/theme-nord/style.css'
	import { replaceAll } from '@milkdown/utils'
	import 'prism-themes/themes/prism-nord.css'
	import css from 'refractor/lang/css'
	import javascript from 'refractor/lang/javascript'
	import jsx from 'refractor/lang/jsx'
	import markdown from 'refractor/lang/markdown'
	import tsx from 'refractor/lang/tsx'
	import typescript from 'refractor/lang/typescript'
	import { onMount } from 'svelte'

	export let initialContent: string
	export let value: string

	let editor: Promise<Editor>
	let editorRef: HTMLDivElement
	let mounted = false

	$: initialContent, restartEditor()

	onMount(async () => {
		mounted = true
		await initEditor()
	})

	async function initEditor() {
		editor = Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, editorRef)
				ctx.set(defaultValueCtx, initialContent)
				ctx.get(listenerCtx)
					.markdownUpdated((ctx, markdown, prevMarkdown) => {
						value = markdown
					})
					.mounted(() => {
						console.log('Milkdown mounted.')
					})
				ctx.set(prismConfig.key, {
					configureRefractor: (refractor) => {
						refractor.register(markdown)
						refractor.register(css)
						refractor.register(javascript)
						refractor.register(typescript)
						refractor.register(jsx)
						refractor.register(tsx)
					},
				})
			})
			.config(nord)
			.use(commonmark)
			.use(gfm)
			.use(history)
			.use(listener)
			.use(indent)
			.use(splitEditing)
			.use(prism)
			.create()
	}
	async function restartEditor() {
		if (!mounted) return
		;(await editor).action(replaceAll(initialContent))
	}
</script>

<div
	class="w-full max-h-[calc(100vh_-_40px)] overflow-hidden"
	bind:this={editorRef} />
