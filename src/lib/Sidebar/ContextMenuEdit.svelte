<script lang="ts">
	import { onMount } from 'svelte'
	import { contextMenuEdit, contextRename } from '$lib/store'
	import { clickoutside } from '@svelte-put/clickoutside'
	import { trashFolder, trashNote } from '$lib/supabase'
	import { invalidateAll } from '$app/navigation'
	import { isNote, makeToastPromise } from '$lib/Helper/utils'

	const { x, y, item } = $contextMenuEdit

	let menu: HTMLElement

	let menuItems = [
		{
			icon: 'delete',
			text: 'Delete',
			handler: handleDelete,
			active: false,
		},
		{
			icon: 'rename',
			text: 'Rename',
			handler: handleRename,
			active: false,
		},
		{
			icon: 'star',
			text: 'Add to Favorites',
			handler: () => {},
			active: false,
		},
		{
			icon: 'duplicate',
			text: 'Duplicate',
			handler: () => {},
			active: false,
		},
	]

	$: activeItem = menuItems.find((item) => item.active)

	onMount(() => {
		console.log(item)
		const windowHeight = window.innerHeight
		const overflow = windowHeight - y - menu.clientHeight < 0

		if (overflow) {
			menu.style.top = `${y - menu.clientHeight}px`
		} else {
			menu.style.top = `${y}px`
		}

		menu.style.left = `${x}px`
	})

	function handleClose() {
		contextMenuEdit.set({
			show: false,
			x: 0,
			y: 0,
		})
	}

	async function handleDelete() {
		const item = $contextMenuEdit.item
		if (item) {
			if (item.type === 'folder' || item.type === 'workspace') {
				await makeToastPromise(trashFolder(item.id), {
					loading: `Moving ${item.name}...`,
					success: `Moved ${item.name} to trash`,
					error: `Failed to move ${item.name}`,
				})
			} else if (item.type === 'note') {
				await makeToastPromise(trashNote(item.id), {
					loading: `Moving ${item.name}...`,
					success: `Moved ${item.name} to trash`,
					error: `Failed to move ${item.name}`,
				})
			}

			invalidateAll()
			handleClose()
		}
	}

	function handleRename(e: MouseEvent | KeyboardEvent) {
		$contextRename = {
			show: true,
			x: 0,
			y: 0,
			boxBoundaries: $contextMenuEdit.boxBoundaries,
			item: $contextMenuEdit.item,
		}
		e.stopPropagation()
		e.preventDefault()
		handleClose()
	}

	function handleKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowUp':
				if (!activeItem) setActive(0)
				else {
					const index = menuItems.indexOf(activeItem)
					if (index > 0) {
						setActive(index - 1)
					} else {
						setActive(menuItems.length - 1)
					}
				}
				break
			case 'ArrowDown':
				if (!activeItem) setActive(0)
				else {
					const index = menuItems.indexOf(activeItem)
					if (index < menuItems.length - 1) {
						setActive(index + 1)
					} else {
						setActive(0)
					}
				}
				break
			case 'Enter':
				if (activeItem) {
					activeItem.handler(e)
				}
				break
		}
	}

	function setActive(index: number) {
		menuItems.forEach((item) => (item.active = false))
		menuItems[index].active = true
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div
	class="h-screen text-sm w-screen top-0 left-0 z-100 absolute overflow-hidden"
	on:contextmenu|preventDefault={handleClose}>
	<div
		class="rounded-lg flex flex-col  shadow-xl w-66 absolute"
		bind:this={menu}
		use:clickoutside
		on:clickoutside={handleClose}>
		<div class="flex flex-col p-1 gap-1">
			{#each menuItems as item, i}
				<button
					class="ctx-btn"
					class:active={item.active}
					on:click={item.handler}
					on:mouseenter={() => setActive(i)}>
					<div class={item.icon} />
					<span>{item.text}</span>
				</button>
			{/each}
		</div>

		{#if isNote(item) && item.last_edited}
			<div class="border-t flex flex-col text-xs p-3 gap-1">
				<span>Last Edited: </span>
				<span>{new Date(item.last_edited).toLocaleString()}</span>
			</div>
		{/if}
		<div />
	</div>
</div>

<style>
	.ctx-btn {
		@apply rounded-lg flex h-8 text-left px-2 gap-4 items-center justify-start;
	}
	.active {
	}

	.rename {
		@apply i-ri-edit-line text-lg;
	}
	.delete {
		@apply i-ri-delete-bin-line text-lg;
	}
	.star {
		@apply i-ri-star-line text-lg;
	}
	.duplicate {
		@apply i-ri-file-copy-line text-lg;
	}
</style>
