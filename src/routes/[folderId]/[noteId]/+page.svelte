<script lang="ts">
	import Milkdown from '$lib/Milkdown.svelte'
	import type { PageData } from './$types'

	export let data: PageData

	$: ({ note } = data)
</script>

<main class="w-full">
	<Milkdown defaultValue={note.content} />
</main>
