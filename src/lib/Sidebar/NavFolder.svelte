<script lang="ts">
	import { contextMenuAdd, contextMenuEdit } from '$lib/store'
	import { updateFolder } from '$lib/supabase'
	import { onMount } from 'svelte'
	import { slide } from 'svelte/transition'
	import NavFolder from './NavFolder.svelte'
	import NavNote from './NavNote.svelte'

	export let item: Folder
	export let userId: string
	export let lvl: number
	let containerFolder: HTMLElement

	onMount(() => {
		if (lvl > 0 && containerFolder) {
			containerFolder.style.paddingLeft = `${lvl * 1}rem`
		}
	})

	function handleOpen() {
		item.open = !item.open
		updateFolder(userId, item.id, { ...item, open: item.open })
	}

	function handleContextMenuAdd(e: MouseEvent) {
		const { pageX, pageY } = e

		$contextMenuAdd = {
			show: true,
			x: pageX,
			y: pageY,
			parentFolderId: item.id,
		}
	}

	function handleContextMenuEdit(e: MouseEvent) {
		const { pageX, pageY } = e

		if (item.parent_folder_id === null) return
		$contextMenuEdit = {
			show: true,
			itemId: item.id,
			type: item.type,
			x: pageX,
			y: pageY,
			parentFolderId: item.parent_folder_id,
		}
	}
</script>

<div>
	<button
		class="rounded-lg flex h-9 w-full px-2 justify-between group items-center hover:bg-nord3"
		bind:this={containerFolder}
		on:click={handleOpen}>
		<section class="flex min-w-0 grow items-center justify-center">
			<button
				class="flex items-center btn justify-center"
				on:click|stopPropagation={handleOpen}>
				<iconify-icon
					class="text-nord13"
					icon={item.open
						? 'ri:arrow-down-s-line'
						: 'ri:arrow-right-s-line'} />
			</button>
			<div class="flex ml-2 min-w-0 items-center grow">
				<iconify-icon
					class="text-lg text-[#f0be51]"
					icon={!item.open
						? 'material-symbols:folder-rounded'
						: 'material-symbols:folder-open-rounded'} />

				<span class="font-semibold text-sm ml-2 truncate">
					{item.name}
				</span>
			</div>
		</section>

		<section class="flex space-x-1">
			<button
				class="hidden items-center justify-center btn group-hover:flex"
				on:click|stopPropagation={handleContextMenuEdit}>
				<iconify-icon icon="ri:more-fill" />
			</button>
			<button
				class="hidden items-center justify-center btn group-hover:flex"
				on:click|stopPropagation={handleContextMenuAdd}>
				<iconify-icon icon="ri:add-fill" />
			</button>
		</section>
	</button>
	{#if item.open === true && item.notes && item.subfolders}
		<div transition:slide>
			{#each item.notes as note}
				<NavNote item={note} {userId} lvl={lvl + 1} />
			{/each}
			{#each item.subfolders as folder}
				<NavFolder item={folder} {userId} lvl={lvl + 1} />
			{/each}
		</div>
	{/if}
</div>
