<script lang="ts">
	export let trashItems: (Folder | Note)[] = []
</script>

<main>
	{#each trashItems as item}
		<div>{item.name}</div>
	{/each}
</main>
