<script lang="ts">
	import NavItem from './NavItem.svelte'
	import { slide } from 'svelte/transition'
	import { updateFolder } from '$lib/supabase'
	import { onMount } from 'svelte'

	export let item: Folder | Note
	export let userId: string
	export let lvl: number
	let containerFolder: HTMLElement
	let containerNote: HTMLElement

	function isFolder(value: any): value is Folder {
		return value.type === 'folder'
	}

	function handleOpen() {
		if (isFolder(item)) {
			item.open = !item.open
			updateFolder(userId, item.id, { ...item, open: item.open })
		}
	}

	onMount(() => {
		if (lvl > 0 && containerFolder) {
			containerFolder.style.paddingLeft = `${lvl * 1}rem`
		}
		if (lvl > 0 && containerNote) {
			containerNote.style.paddingLeft = `${lvl * 1}rem`
		}
	})
</script>

{#if isFolder(item)}
	<div>
		<button
			class="rounded flex h-9 w-full px-2 text-nord6/50 group items-center justify-between hover:bg-nord2"
			bind:this={containerFolder}
			on:click={handleOpen}>
			<section class="flex items-center justify-center">
				<button
					class="flex items-center justify-center btn-hov"
					on:click|stopPropagation={handleOpen}>
					<iconify-icon
						icon={item.open
							? 'ri:arrow-down-s-line'
							: 'ri:arrow-right-s-line'} />
				</button>
				<div class="flex ml-2 items-center">
					<iconify-icon
						class="text-lg text-[#f0be51]"
						icon={!item.open
							? 'material-symbols:folder-rounded'
							: 'material-symbols:folder-open-rounded'} />

					<div
						class="font-semibold text-sm ml-2 block whitespace-nowrap overflow-hidden">
						{item.name}
					</div>
				</div>
			</section>

			<section class="flex space-x-1">
				<button
					class="hidden items-center justify-center btn-hov group-hover:flex"
					on:click|stopPropagation={() => {}}>
					<iconify-icon icon="ri:more-fill" />
				</button>
				<button
					class="hidden items-center justify-center btn-hov group-hover:flex"
					on:click|stopPropagation={() => {}}>
					<iconify-icon icon="ri:add-fill" />
				</button>
			</section>
		</button>
		{#if item.open === true && item.notes && item.subfolders}
			<div transition:slide>
				{#each item.notes as note}
					<NavItem item={note} {userId} lvl={lvl + 1} />
				{/each}
				{#each item.subfolders as folder}
					<NavItem item={folder} {userId} lvl={lvl + 1} />
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<div>
		<a
			class="rounded flex h-9 w-full px-2 text-nord6/50 group items-center justify-between hover:bg-nord2"
			href={'#'}
			bind:this={containerNote}>
			<section class="flex justify-center items-center">
				<div class="h-5 w-5 spacer" />
				<div class="flex ml-2 items-center">
					<iconify-icon
						class="text-lg"
						icon="ri:sticky-note-2-line" />

					<div
						class="font-semibold text-sm ml-2 block whitespace-nowrap overflow-hidden">
						{item.name}
					</div>
				</div>
			</section>

			<section class="flex space-x-1">
				<button
					class="hidden items-center justify-center btn-hov group-hover:flex"
					on:click|stopPropagation={() => {}}>
					<iconify-icon icon="ri:more-fill" />
				</button>
			</section>
		</a>
	</div>
{/if}

<style>
	.btn-hov {
		@apply rounded h-5 text-lg w-5;
	}
	.btn-hov:hover {
		@apply bg-nord3;
	}
</style>
