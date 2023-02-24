<script lang="ts">
	import Milkdown from '$lib/Milkdown.svelte'
	import { updateNote } from '$lib/supabase.js'
	import type { PageData } from './$types'

	export let data: PageData

	let newContent: string
	let cooldownTimer: NodeJS.Timeout

	$: initialContent = data?.note?.content
	$: initialContent, handleNoteChange()
	$: ({ note } = data)
	$: {
		clearTimeout(cooldownTimer)
		cooldownTimer = setTimeout(() => {
			if (newContent === initialContent) return
			saveNote()
		}, 1000)
	}

	function handleNoteChange() {
		clearTimeout(cooldownTimer)
		initialContent = data?.note?.content
	}

	async function saveNote() {
		await updateNote(note?.id, {
			...note,
			content: newContent,
		})
		console.log('Saved changes.')
	}
</script>

<div class="w-full prose dark:prose-invert">
	<Milkdown {initialContent} bind:value={newContent} />
</div>
