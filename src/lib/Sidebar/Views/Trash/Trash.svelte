<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { makeToastPromise } from '$lib/Helper/utils'
	import {
		deleteFolder,
		deleteNote,
		recoverFolder,
		recoverNote,
	} from '$lib/supabase'

	export let trashItems: (Folder | Note)[] = []

	$: {
		trashItems.sort((a, b) => {
			if (a.trashedAt === null) return 1
			if (b.trashedAt === null) return -1
			return b.trashedAt - a.trashedAt
		})
	}

	function toDate(date: number) {
		return new Date(date).toLocaleDateString()
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
	{#each trashItems as item}
		<div class="flex py-1 px-2 justify-between">
			<section class="flex text-center gap-2 items-center">
				{#if item.type === 'folder'}
					<div class="i-ri-folder-line" />
				{:else if item.type === 'note'}
					<div class="i-ri-file-line" />
				{:else}
					<div class="i-ri-archive-line" />
				{/if}

				<span>{item.name}</span>
				<span class="text-xs opacity-50"
					>{toDate(item.trashedAt ?? 0)}</span>
			</section>

			<section class="flex text-sm gap-2 items-center">
				<button
					class="i-ri-arrow-go-back-line"
					on:click={() => handleRecover(item)} />
				<button
					class="i-ri-delete-bin-line"
					on:click={() => handleDelete(item)} />
			</section>
		</div>
	{/each}
</main>
