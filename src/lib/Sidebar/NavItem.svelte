<script lang="ts">
	import NavItem from './NavItem.svelte'
	import { slide } from 'svelte/transition'
	import { updateFolder } from '$lib/supabase'

	export let item: Folder | Note
	export let userId: string

	function isFolder(value: any): value is Folder {
		return value.type === 'folder'
	}

	console.log(item)

	function handleOpen() {
		if (isFolder(item)) {
			item.open = !item.open
			updateFolder(userId, item.id, { ...item, open: item.open })
			if (item.open === false && item.subfolders) {
				item.subfolders.forEach((folder) => {
					folder.open = false
					updateFolder(userId, folder.id, {
						...folder,
						open: folder.open,
					})
				})
			}
		}
	}
</script>

{#if isFolder(item)}
	<div>
		<div
			class="rounded flex h-7 w-full px-2 text-nord4/60 group items-center justify-between dark:(hover:bg-nord2)">
			<section class="flex">
				<button
					class="flex items-center justify-center btn-hov"
					on:click={() => {
						handleOpen()
					}}>
					<iconify-icon
						icon={item.open
							? 'ri:arrow-down-s-line'
							: 'ri:arrow-right-s-line'} />
				</button>
				<div class="flex text-sm ml-2 items-center">
					<iconify-icon
						icon={!item.open
							? 'vscode-icons:default-folder'
							: 'vscode-icons:default-folder-opened'} />

					<span class="font-semibold ml-1">{item.name}</span>
				</div>
			</section>

			<section class="flex space-x-1">
				<button
					class="hidden items-center justify-center btn-hov group-hover:flex">
					<iconify-icon icon="ri:more-fill" />
				</button>
				<button
					class="hidden items-center justify-center btn-hov group-hover:flex">
					<iconify-icon icon="ri:add-fill" />
				</button>
			</section>
		</div>
		{#if item.open === true && item.notes && item.subfolders}
			<div transition:slide>
				{#each item.notes as note}
					<div class="ml-4">
						<NavItem item={note} {userId} />
					</div>
				{/each}
				{#each item.subfolders as folder}
					<div class="ml-4">
						<NavItem item={folder} {userId} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<div>
		<a
			class="rounded flex h-7 w-full px-2 text-nord4/60 group items-center justify-between dark:(hover:bg-nord2) "
			href={'#'}>
			<section class="flex">
				<div class="h-5 w-5 spacer" />
				<div class="flex text-sm ml-2 items-center">
					<iconify-icon icon="ri:sticky-note-2-line" />

					<span class="font-semibold ml-1">{item.name}</span>
				</div>
			</section>

			<section class="flex space-x-1">
				<button
					class="hidden items-center justify-center btn-hov group-hover:flex">
					<iconify-icon icon="ri:more-fill" />
				</button>
			</section>
		</a>
	</div>
{/if}

<style>
	.btn-hov {
		@apply rounded h-5 w-5;
	}
	.btn-hov:hover {
		@apply bg-nord3;
	}
</style>
