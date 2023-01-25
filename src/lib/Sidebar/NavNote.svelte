<script lang="ts">
	import { contextMenuEdit } from '$lib/store'
	import { onMount } from 'svelte'

	export let item: Note
	export let userId: string
	export let lvl: number

	let containerNote: HTMLElement

	onMount(() => {
		if (lvl > 0 && containerNote) {
			containerNote.style.paddingLeft = `${lvl * 1}rem`
		}
	})

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
	<a
		class="rounded-lg flex h-9 w-full px-2 text-nord6/50 group items-center justify-between hover:bg-nord2"
		href={`/${item.parent_folder_id}/${item.id}`}
		bind:this={containerNote}>
		<section class="flex min-w-0 grow justify-center items-center">
			<div class="flex h-5 w-5 items-center justify-center">
				<iconify-icon icon="ci:dot-02-s" />
			</div>
			<div class="flex ml-2 min-w-0 items-center grow">
				<iconify-icon
					class="text-lg "
					icon="material-symbols:note-outline-rounded" />

				<span class="font-semibold text-sm ml-2 truncate">
					{item.name}
				</span>
			</div>
		</section>

		<section class="flex space-x-1">
			<button
				class="hidden items-center justify-center btn-hov group-hover:flex"
				on:click|preventDefault|stopPropagation={handleContextMenuEdit}>
				<iconify-icon icon="ri:more-fill" />
			</button>
		</section>
	</a>
</div>

<style>
	.btn-hov {
		@apply rounded-lg h-5 text-lg w-5;
	}
	.btn-hov:hover {
		@apply bg-nord3;
	}
</style>
