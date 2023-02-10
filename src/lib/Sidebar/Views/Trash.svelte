<script lang="ts">
	import { onMount } from 'svelte'

	let trashItems: (Folder | Note)[] = []

	onMount(() => {
		fetch('/api/trash')
			.then((res) => res.json())
			.then((data) => {
				trashItems = data.trashItems
			})
	})
</script>

<main>
	{#each trashItems as item}
		<div>{item.name}</div>
	{/each}
</main>
