<script lang="ts">
	import { onMount } from 'svelte'
	import { contextMenuAdd } from '$lib/store'
	import { clickoutside } from '@svelte-put/clickoutside'
	import { addFolder, addNote, updateFolder } from '$lib/supabase'
	import { invalidateAll } from '$app/navigation'
	import { isFolder, isWorkspace } from '$lib/Helper/utils'

	const { x, y } = $contextMenuAdd

	export let userId: string

	let menu: HTMLElement

	let menuItems = [
		{
			icon: 'addFile',
			text: 'New Note',
			handler: handleAddNote,
			active: false,
		},
		{
			icon: 'addFolder',
			text: 'New Folder',
			handler: handleAddFolder,
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
		contextMenuAdd.set({ show: false, x: 0, y: 0 })
	}
	async function handleAddFolder() {
		const { item } = $contextMenuAdd
		if (item?.id) {
			await addFolder({
				name: 'New Folder',
				owner: userId,
				parent_folder_id: item.id,
			})
			if (isFolder(item) || isWorkspace(item)) {
				if (item.open === false) {
					await updateFolder(item.id, { ...item, open: true })
				}
			}
			invalidateAll()
			handleClose()
		}
	}
	async function handleAddNote() {
		const { item } = $contextMenuAdd
		if (item?.id) {
			await addNote(userId, item.id)
			if (isFolder(item) || isWorkspace(item)) {
				if (item.open === false) {
					await updateFolder(item.id, { ...item, open: true })
				}
			}
			invalidateAll()
			handleClose()
		}
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
					activeItem.handler()
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

<div class="h-screen text-sm w-screen top-0 left-0 z-100 absolute">
	<div
		class="rounded-lg flex flex-col shadow-xl p-1 w-66 gap-1 absolute"
		bind:this={menu}
		use:clickoutside
		on:clickoutside={handleClose}>
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
		<div />
	</div>
</div>

<style>
	.ctx-btn {
		@apply rounded-lg flex h-8 text-left px-2 gap-4 items-center justify-start;
	}
	.active {
	}

	.addFile {
		@apply i-ri-file-add-line text-lg;
	}
	.addFolder {
		@apply i-ri-folder-add-line text-lg;
	}
</style>
