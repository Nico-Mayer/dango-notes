<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData

	$: ({ trashItems } = data)

	$: {
		trashItems.sort((a, b) => {
			if (a.trashedAt === null) return 1
			if (b.trashedAt === null) return -1
			return b.trashedAt - a.trashedAt
		})
	}

	$: console.log(trashItems)
</script>

<main class="p-2">
	<div class="w-full">
		{#each trashItems as item}
			{#if item.type === 'folder'}
				<div class="flex p-2 gap-2 items-center">
					<iconify-icon
						class="text-lg text-[#f0be51]"
						icon="material-symbols:folder-rounded" />
					<div>{item.name}</div>
				</div>
			{:else}
				<div class="flex p-2 gap-2 items-center">
					<iconify-icon
						class="text-lg "
						icon="material-symbols:note-outline-rounded" />
					<div>{item.name}</div>
				</div>
			{/if}
		{/each}
	</div>
</main>
