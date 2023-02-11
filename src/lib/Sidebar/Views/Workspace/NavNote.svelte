<script lang="ts">
	import { page } from '$app/stores'
	import { contextMenuEdit } from '$lib/store'
	import { tippy } from '$lib/tippy'
	import { onMount } from 'svelte'

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
		class="rounded-lg flex h-9 w-full px-2 group items-center justify-between hover:(bg-nord4 dark:bg-nord3) "
		class:activeItem={active}
		on:contextmenu|preventDefault|stopPropagation={handleContextMenuEdit}
		href={`/${item.parent_folder_id}/${item.id}`}
		bind:this={containerNote}>
		<section class="flex min-w-0 grow justify-center items-center">
			<div class="flex h-6 w-6 items-center justify-center">
				<div class="text-xs opacity-0 i-carbon-dot-mark" />
			</div>
			<div class="flex ml-2 min-w-0 items-center grow">
				<div class="text-lg i-ri-file-line" />

				<span class="font-semibold text-sm ml-2 truncate">
					{item.name}
				</span>
			</div>
		</section>

		<section class="flex space-x-1">
			<button
				class="hidden items-center justify-center btn group-hover:flex"
				use:tippy={{ content: 'Delete, rename, etc...' }}
				on:click|preventDefault|stopPropagation={handleContextMenuEdit}>
				<div class="i-ri-more-fill" />
			</button>
		</section>
	</a>
</div>
