<script lang="ts">
	import { contextMenuAdd, contextMenuEdit } from '$lib/store'
	import { updateFolder } from '$lib/supabase'
	import { tippy } from '$lib/tippy'
	import { onMount } from 'svelte'
	import { slide } from 'svelte/transition'
	import NavFolder from './NavFolder.svelte'
	import NavNote from './NavNote.svelte'

	export let item: Folder
	export let lvl: number
	let containerFolder: HTMLElement

	onMount(() => {
		if (lvl > 0 && containerFolder) {
			containerFolder.style.paddingLeft = `${lvl * 1}rem`
		}
	})

	function handleOpen() {
		item.open = !item.open
		updateFolder(item.id, { ...item, open: item.open })
	}

	function handleContextMenuAdd(e: MouseEvent) {
		const { pageX, pageY } = e

		$contextMenuAdd = {
			show: true,
			x: pageX,
			y: pageY,
			item: item,
		}
	}

	function handleContextMenuEdit(e: MouseEvent) {
		const { pageX, pageY } = e

		$contextMenuEdit = {
			show: true,
			x: pageX,
			y: pageY,
			boxBoundaries: containerFolder.getBoundingClientRect(),
			item: item,
		}
	}
</script>

<div>
	<button
		class="rounded-lg flex h-9 w-full px-2 justify-between group items-center hover:bg-nord4 dark:hover:bg-nord3"
		class:workspace={lvl === 0}
		bind:this={containerFolder}
		on:click={handleOpen}
		on:contextmenu|preventDefault={handleContextMenuEdit}>
		<section class="flex min-w-0 grow items-center justify-center">
			<button
				class="flex items-center btn justify-center"
				on:click|stopPropagation={handleOpen}>
				<div
					class="i-ri-arrow-right-s-line trans"
					class:rotate-90={item.open} />
			</button>
			<div class="flex ml-2 min-w-0 items-center grow">
				{#if item.type === 'workspace'}
					<div class="text-lg i-ri-archive-line" />
				{:else}
					<div class={item.open ? 'openFolder' : 'folder'} />
				{/if}

				<span class="font-semibold text-sm ml-2 truncate">
					{item.name}
				</span>
			</div>
		</section>

		<section class="flex space-x-1">
			<button
				class="hidden items-center justify-center btn group-hover:flex"
				on:click|stopPropagation={handleContextMenuEdit}
				use:tippy={{ content: 'Delete, rename, etc...' }}>
				<div class="i-ri-more-fill" />
			</button>
			<button
				class="hidden items-center justify-center btn group-hover:flex"
				on:click|stopPropagation={handleContextMenuAdd}
				use:tippy={{ content: 'Add folder | note' }}>
				<div class="i-ri-add-fill" />
			</button>
		</section>
	</button>

	{#if item.open === true && item.notes && item.subfolders && item.notes.length + item.subfolders.length > 0}
		<div transition:slide class:openWs={item.type === 'workspace'}>
			{#each item.notes as note}
				<NavNote item={note} lvl={lvl + 1} />
			{/each}
			{#each item.subfolders as folder}
				<NavFolder item={folder} lvl={lvl + 1} />
			{/each}
		</div>
	{/if}
</div>

<style>
	.workspace {
		--at-apply: border-b rounded-none h-10;
	}

	.openWs {
		--at-apply: border-b p-1;
	}
	.folder {
		--at-apply: text-lg i-ri-folder-line trans;
	}

	.openFolder {
		--at-apply: text-lg i-ri-folder-open-line trans;
	}
</style>
