<script lang="ts">
	import { onMount } from 'svelte'
	import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core'
	import { commonmark } from '@milkdown/preset-commonmark'
	import { gfm } from '@milkdown/preset-gfm'
	import { history } from '@milkdown/plugin-history'
	import { listener, listenerCtx } from '@milkdown/plugin-listener'
	import { indent } from '@milkdown/plugin-indent'
	import { prism, prismConfig } from '@milkdown/plugin-prism'
	import markdown from 'refractor/lang/markdown'
	import css from 'refractor/lang/css'
	import javascript from 'refractor/lang/javascript'
	import typescript from 'refractor/lang/typescript'
	import jsx from 'refractor/lang/jsx'
	import tsx from 'refractor/lang/tsx'

	import { nord } from '@milkdown/theme-nord'
	import '@milkdown/theme-nord/style.css'
	import 'prism-themes/themes/prism-nord.css'

	export let initialContent: string
	export let value: string

	let editor: Promise<Editor>
	let editorRef: HTMLDivElement
	let isMounted = false

	$: initialContent, restartEditor()

	onMount(async () => {
		await initEditor()
		isMounted = true
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
					.mounted((ctx) => {
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
			.use(prism)
			.create()
	}
	async function restartEditor() {
		if (!isMounted) return
		await editor.then((editor) => editor.create())
	}
</script>

<div bind:this={editorRef} />
