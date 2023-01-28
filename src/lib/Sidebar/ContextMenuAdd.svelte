<script lang="ts">
	import { onMount } from 'svelte'
	import { contextMenuAdd } from '$lib/store'
	import { clickoutside } from '@svelte-put/clickoutside'
	import { addFolder, addNote } from '$lib/supabase'
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
		contextMenuAdd.set({ show: false, x: 0, y: 0, parentFolderId: '' })
	}
	async function handleAddFolder() {
		await addFolder({
			name: 'New Folder',
			owner: userId,
			parent_folder_id: $contextMenuAdd.parentFolderId,
		})
		invalidateAll()
		handleClose()
	}
	async function handleAddNote() {
		await addNote(userId, $contextMenuAdd.parentFolderId)
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
		<button class="ctx-btn" on:click={handleAddNote}>
			<iconify-icon class="text-lg" icon="ri:file-add-line" />
			<span>Add Note</span>
		</button>

		<button class="ctx-btn" on:click={handleAddFolder}>
			<iconify-icon class="text-lg" icon="ri:folder-add-line" />
			<span>Add Folder</span>
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
