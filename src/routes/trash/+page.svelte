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

	$: {
		trashItems.sort((a, b) => {
			if (a.trashedAt === null) return 1
			if (b.trashedAt === null) return -1
			return b.trashedAt - a.trashedAt
		})
	}

	async function handleRecover(item: Folder | Note) {
		if (item.type === 'folder' || item.type === 'workspace') {
			await makeToastPromise(
				recoverFolder(item.id),
				{
					loading: `Recovering ${item.name}...`,
					success: 'Recovered!',
					error: `Failed to recover ${item.name}`,
				},
				'green'
			)
		} else if (item.type === 'note') {
			await makeToastPromise(
				recoverNote(item.id),
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
		if (item.type === 'folder' || item.type === 'workspace') {
			await makeToastPromise(deleteFolder(item.id), {
				loading: `Deleting ${item.name}...`,
				success: 'Deleted!',
				error: `Failed to delete ${item.name}`,
			})
		} else if (item.type === 'note') {
			await makeToastPromise(deleteNote(item.id), {
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
		<thead class="border-b">
			<tr>
				<th class="table-header">Name</th>
				<th class="table-header">Deleted at</th>
				<th class="table-header">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each trashItems as item, i}
				<tr class="trans">
					<td class="table-data">
						<div class="flex gap-2">
							{#if item.type === 'folder'}
								<div class="text-lg i-ri-folder-line" />
							{:else if item.type === 'workspace'}
								<div class="text-lg i-ri-archive-line" />
							{:else}
								<div class="text-lg i-ri-file-line" />
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
								<div class="text-lg i-ri-arrow-go-back-line" />
							</button>
							<button
								class="flex items-center"
								on:click={() => handleDelete(item)}>
								<div class="text-lg i-ri-delete-bin-line" />
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
		--at-apply: font-medium text-sm text-left py-4 px-6;
	}
	.table-data {
		--at-apply: font-light text-sm py-4 px-6 whitespace-nowrap;
	}
</style>
