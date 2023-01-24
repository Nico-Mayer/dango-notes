<script lang="ts">
	import { onMount } from 'svelte'
	import { contextMenuEdit } from '$lib/store'
	import { clickoutside } from '@svelte-put/clickoutside'
	import { deleteFolder, deleteNote } from '$lib/supabase'
	import { invalidateAll } from '$app/navigation'

	export let x: number
	export let y: number
	export let userId: string

	let menu: HTMLElement

	onMount(() => {
		menu.style.left = `${x}px`
		menu.style.top = `${y}px`
	})

	function handleClose() {
		contextMenuEdit.set({
			show: false,
			itemId: '',
			type: '',
			x: 0,
			y: 0,
			parentFolderId: '',
		})
	}

	async function handleDelete() {
		if ($contextMenuEdit.type === 'folder') {
			console.log('delete folder')
			await deleteFolder(userId, $contextMenuEdit.itemId)
		} else if ($contextMenuEdit.type === 'note') {
			await deleteNote(
				userId,
				$contextMenuEdit.itemId,
				$contextMenuEdit.parentFolderId
			)
		}
		invalidateAll()
		handleClose()
	}
</script>

<div class="h-screen text-sm w-screen top-0 left-0 z-100 absolute">
	<div
		class="rounded-lg flex flex-col bg-nord2 h-20 shadow-xl p-1 shadow-nord0 w-40 gap-1 absolute"
		bind:this={menu}
		use:clickoutside
		on:clickoutside={handleClose}>
		<button class="ctx-btn" on:click={handleDelete}>
			<iconify-icon class="text-lg" icon="ri:delete-bin-6-line" />
			<span>Delete</span>
		</button>
	</div>
</div>

<style>
	.ctx-btn {
		@apply rounded-lg flex h-9 text-left px-2 gap-2 items-center justify-start;
	}
	.ctx-btn:hover {
		@apply bg-nord3;
	}
</style>
