<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { makeToastPromise } from '$lib/Helper/utils'
	import {
		deleteFolder,
		deleteNote,
		recoverFolder,
		recoverNote,
	} from '$lib/supabase'
	import type { PageData } from './$types'

	export let data: PageData

	$: ({ trashItems, session } = data)
	$: userId = session?.user?.id
	$: {
		trashItems.sort((a, b) => {
			if (a.trashedAt === null) return 1
			if (b.trashedAt === null) return -1
			return b.trashedAt - a.trashedAt
		})
	}

	async function handleRecover(item: Folder | Note) {
		if ((item.type === 'folder' || item.type === 'workspace') && userId) {
			await makeToastPromise(
				recoverFolder(userId, item.id),
				{
					loading: `Recovering ${item.name}...`,
					success: 'Recovered!',
					error: `Failed to recover ${item.name}`,
				},
				'green'
			)
		} else if (item.type === 'note' && userId) {
			await makeToastPromise(
				recoverNote(userId, item.id),
				{
					loading: `Recovering ${item.name}...`,
					success: 'Recovered!',
					error: `Failed to recover ${item.name}`,
				},
				'green'
			)
		}
		invalidateAll()
	}

	async function handleDelete(item: Folder | Note) {
		if ((item.type === 'folder' || item.type === 'workspace') && userId) {
			await makeToastPromise(deleteFolder(userId, item.id), {
				loading: `Deleting ${item.name}...`,
				success: 'Deleted!',
				error: `Failed to delete ${item.name}`,
			})
		} else if (item.type === 'note' && userId) {
			await makeToastPromise(deleteNote(userId, item.id), {
				loading: `Deleting ${item.name}...`,
				success: 'Deleted!',
				error: `Failed to delete ${item.name}`,
			})
		}
		invalidateAll()
	}
</script>

<main>
	<table class="w-full table-auto">
		<thead class="border-b border-nord3">
			<tr>
				<th class="table-header">Name</th>
				<th class="table-header">Deleted at</th>
				<th class="table-header">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each trashItems as item, i}
				<tr class="trans hover:bg-nord2">
					<td class="table-data">
						<div class="flex gap-2">
							{#if item.type === 'folder'}
								<iconify-icon
									class="text-lg text-[#f0be51]"
									icon="material-symbols:folder-rounded" />
							{:else if item.type === 'workspace'}
								<iconify-icon
									class="text-lg text-nord7"
									icon="material-symbols:space-dashboard" />
							{:else}
								<iconify-icon
									class="text-lg "
									icon="material-symbols:note-outline-rounded" />
							{/if}
							<div>{item.name}</div>
						</div>
					</td>
					<td class="table-data">
						{#if item.trashedAt !== null}
							{new Date(item.trashedAt).toLocaleString()}
						{/if}
					</td>
					<td class="table-data">
						<section class="flex gap-2 items-center justify-start">
							<button
								class="flex items-center"
								on:click={() => handleRecover(item)}>
								<iconify-icon
									class="text-lg text-nord14"
									icon="grommet-icons:revert" />
							</button>
							<button
								class="flex items-center"
								on:click={() => handleDelete(item)}>
								<iconify-icon
									class="text-lg text-nord12"
									icon="material-symbols:delete-outline-rounded" />
							</button>
						</section>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>

<style>
	.table-header {
		@apply font-medium text-sm text-left py-4 px-6 text-nord6/80;
	}
	.table-data {
		@apply font-light text-sm py-4 px-6 text-nord6/60 whitespace-nowrap;
	}
</style>
