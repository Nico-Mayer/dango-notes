<script lang="ts">
	import Milkdown from '$lib/Milkdown.svelte'
	import type { PageData } from './$types'

	export let data: PageData

	$: ({ note } = data)
</script>

<div class="w-full prose dark:prose-invert">
	<Milkdown defaultValue={note.content} />
</div>
