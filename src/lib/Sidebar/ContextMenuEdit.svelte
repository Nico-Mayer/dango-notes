<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { isNote, makeToastPromise } from '$lib/Helper/utils'
	import { contextMenuEdit, contextRename } from '$lib/store'
	import { trashFolder, trashNote } from '$lib/supabase'
	import { clickoutside } from '@svelte-put/clickoutside'
	import { onMount } from 'svelte'

	const { x, y, item } = $contextMenuEdit

	let menu: HTMLElement

	let menuItems = [
		{
			icon: 'i-ri-delete-bin-line',
			text: 'Delete',
			handler: handleDelete,
			active: false,
		},
		{
			icon: 'i-ri-edit-line',
			text: 'Rename',
			handler: handleRename,
			active: false,
		},
		{
			icon: 'i-ri-star-line',
			text: 'Add to Favorites',
			handler: () => {},
			active: false,
		},
		{
			icon: 'i-ri-file-copy-line',
			text: 'Duplicate',
			handler: () => {},
			active: false,
		},
	]

	$: activeItem = menuItems.find((item) => item.active)

	onMount(() => {
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
	class="h-screen text-sm w-screen top-0 left-0 z-50 absolute overflow-hidden"
	on:contextmenu|preventDefault={handleClose}>
	<div
		class="bg-white rounded-lg flex flex-col shadow-xl w-64 absolute dark:bg-nord-3"
		bind:this={menu}
		use:clickoutside
		on:clickoutside={handleClose}>
		<div class="flex flex-col p-1 gap-1">
			{#each menuItems as item, i}
				<button
					class="ctx-btn"
					class:activeItem={item.active}
					on:click={item.handler}
					on:mouseenter={() => setActive(i)}>
					<div class={item.icon + ' text-lg'} />
					<span>{item.text}</span>
				</button>
			{/each}
		</div>

		{#if isNote(item) && item.last_edited}
			<div
				class="border-t flex flex-col text-xs p-3 gap-1 dark:border-nord-2">
				<span>Last Edited: </span>
				<span>{new Date(item.last_edited).toLocaleString()}</span>
			</div>
		{/if}
		<div />
	</div>
</div>
