<script lang="ts">
	import NavItem from './NavItem.svelte'
	import { slide } from 'svelte/transition'
	import { updateFolderOpen } from '$lib/supabase'

	export let item: Folder | Note
	export let userId: string | undefined

	function isFolder(value: any): value is Folder {
		return value.type === 'folder'
	}

	function handleOpen() {
		if (isFolder(item)) {
			item.open = !item.open
			if (typeof userId === 'string') {
				updateFolderOpen(userId, item.id, item.open)
				if (item.open === false) {
					item.subfolders.forEach((folder) => {
						folder.open = false
						if (typeof userId === 'string') {
							updateFolderOpen(userId, folder.id, folder.open)
						}
					})
				}
			}
		}
	}
</script>

<div>
	<a
		class="rounded flex h-7 w-full px-2 text-nord4/60 items-center justify-between dark:(hover:bg-nord2) "
		href={'#'}>
		<section class="flex">
			<button
				class="flex items-center justify-center btn-hov"
				on:click={() => {
					handleOpen()
				}}>
				{#if item.type === 'folder'}
					<iconify-icon icon="ri:arrow-right-s-line" />
				{/if}
			</button>
			<div class="flex text-sm ml-2 items-center">
				<iconify-icon
					icon={item.type === 'folder'
						? 'ri:folder-2-line'
						: 'ri:sticky-note-2-line'} />
				<span class="font-semibold ml-1">{item.name}</span>
			</div>
		</section>

		<section class="flex space-x-1">
			<button class="flex items-center justify-center btn-hov">
				<iconify-icon icon="ri:more-fill" />
			</button>
			<button class="flex items-center justify-center btn-hov">
				<iconify-icon icon="ri:add-fill" />
			</button>
		</section>
	</a>
	{#if isFolder(item) && item.open === true}
		<div transition:slide>
			{#each item.notes as note}
				<div class="ml-2">
					<NavItem item={note} {userId} />
				</div>
			{/each}
			{#each item.subfolders as folder}
				<div class="ml-2">
					<NavItem item={folder} {userId} />
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.btn-hov {
		@apply rounded h-5 w-5;
	}
	.btn-hov:hover {
		@apply bg-nord3;
	}
</style>
