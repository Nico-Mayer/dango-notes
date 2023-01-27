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

<main>
	<div class="w-full">
		{#each trashItems as item, i}
			<div
				class="flex p-2 gap-2 items-center justify-between hover:bg-nord2"
				class:bg-nord1={i % 2 === 0}>
				<section class="flex gap-2 items-center">
					{#if item.type === 'folder'}
						<iconify-icon
							class="text-lg text-[#f0be51]"
							icon="material-symbols:folder-rounded" />
						<div>{item.name}</div>
					{:else}
						<iconify-icon
							class="text-lg "
							icon="material-symbols:note-outline-rounded" />
						<div>{item.name}</div>
					{/if}
				</section>

				<section class="flex gap-2 items-center justify-center">
					<button class="flex items-center">
						<iconify-icon
							class="text-lg "
							icon="grommet-icons:revert" />
					</button>
					<button class="flex items-center">
						<iconify-icon
							class="text-lg "
							icon="material-symbols:delete-outline-rounded" />
					</button>
				</section>
			</div>
		{/each}
	</div>
</main>
