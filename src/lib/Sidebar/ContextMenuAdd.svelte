<script lang="ts">
	import { onMount } from 'svelte'
	import { contextMenuAdd } from '$lib/store'
	import { clickoutside } from '@svelte-put/clickoutside'
	import { addFolder, addNote } from '$lib/supabase'
	import { invalidateAll } from '$app/navigation'

	export let x: number
	export let y: number
	export let userId: string

	let menu: HTMLElement

	let menuItems = [
		{
			icon: 'material-symbols:note-add-outline-rounded',
			text: 'New Note',
			handler: handleAddNote,
			active: false,
		},
		{
			icon: 'material-symbols:create-new-folder-outline-rounded',
			text: 'New Folder',
			handler: handleAddFolder,
			active: false,
		},
	]

	$: activeItem = menuItems.find((item) => item.active)

	onMount(() => {
		menu.style.left = `${x}px`
		menu.style.top = `${y}px`
	})

	function handleClose() {
		contextMenuAdd.set({ show: false, x: 0, y: 0 })
	}
	async function handleAddFolder() {
		console.log($contextMenuAdd)
		if ($contextMenuAdd.item?.id) {
			await addFolder({
				name: 'New Folder',
				owner: userId,
				parent_folder_id: $contextMenuAdd.item.id,
			})
			invalidateAll()
			handleClose()
		}
	}
	async function handleAddNote() {
		if ($contextMenuAdd.item?.id) {
			await addNote(userId, $contextMenuAdd.item.id)
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
		class="rounded-lg flex flex-col bg-nord3 shadow-xl p-1 shadow-nord0 text-nord6/80 w-52 gap-1 absolute"
		bind:this={menu}
		use:clickoutside
		on:clickoutside={handleClose}>
		{#each menuItems as item, i}
			<button
				class="ctx-btn"
				class:active={item.active}
				on:click={item.handler}
				on:mouseenter={() => setActive(i)}>
				<iconify-icon class="text-lg" icon={item.icon} />
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
		@apply bg-nord2 text-nord6;
	}
</style>
