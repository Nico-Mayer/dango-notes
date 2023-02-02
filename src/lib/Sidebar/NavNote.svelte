<script lang="ts">
	import { contextMenuEdit } from '$lib/store'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	export let item: Note
	export let lvl: number

	let containerNote: HTMLElement

	$: active = $page.params.noteId === item.id

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
			x: pageX,
			y: pageY,
			boxBoundaries: containerNote.getBoundingClientRect(),
			item: item,
		}
	}
</script>

<div>
	<a
		class="rounded-lg flex h-9 w-full px-2 group items-center justify-between hover:(bg-nord3 text-nord6/80) "
		class:active
		on:contextmenu|preventDefault|stopPropagation={handleContextMenuEdit}
		href={`/${item.parent_folder_id}/${item.id}`}
		bind:this={containerNote}>
		<section class="flex min-w-0 grow justify-center items-center">
			<div class="flex h-6 w-6 items-center justify-center">
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
				class="hidden items-center justify-center btn group-hover:flex"
				on:click|preventDefault|stopPropagation={handleContextMenuEdit}>
				<iconify-icon icon="ri:more-fill" />
			</button>
		</section>
	</a>
</div>

<style>
	.active {
		@apply bg-nord2;
		color: rgba(236, 239, 244) !important;
	}
</style>
