<script lang="ts">
	import { onMount } from 'svelte'
	import { contextRename } from '$lib/store'
	import { clickoutside } from '@svelte-put/clickoutside'
	import { updateNote, updateFolder } from '$lib/supabase'
	import { isFolder, isNote, isWorkspace } from '$lib/Helper/utils'
	import { invalidateAll } from '$app/navigation'

	const { x, y, boxBoundaries, item } = $contextRename

	let container: HTMLElement
	let newName = ''

	onMount(() => {
		if (!boxBoundaries) return
		container.style.left = `${boxBoundaries.x + 20}px`
		container.style.top = `${boxBoundaries.bottom}px`
	})

	function handleClose() {
		contextRename.set({ show: false, x: 0, y: 0 })
	}

	async function handleRename() {
		if (!item) return

		if (newName.length > 0) {
			if (isFolder(item) || isWorkspace(item))
				await updateFolder(item.id, { ...item, name: newName })
			else if (isNote(item))
				await updateNote(item.id, { ...item, name: newName })

			invalidateAll()
			handleClose()
		} else {
			container.classList.add('shakeX')
			setTimeout(() => {
				container.classList.remove('shakeX')
			}, 500)
		}
	}
</script>

<svelte:window on:keydown={() => {}} />

<main class="h-screen text-sm w-screen top-0 left-0 z-200 absolute">
	<div
		id="rename-context-menu"
		class="rounded-lg flex bg-nord3 h-9 shadow-xl p-1 animate-fast shadow-nord0 text-nord6/80 gap-2 absolute items-center"
		bind:this={container}
		use:clickoutside
		on:clickoutside={handleClose}>
		<div class="rounded-lg flex h-full bg-nord2 w-[28px]">
			<iconify-icon class="m-auto" icon="carbon:sun" />
		</div>
		<form on:submit|preventDefault={handleRename}>
			<!-- svelte-ignore a11y-autofocus -->
			<input
				class="rounded bg-nord2 py-1 px-2 input"
				type="text"
				bind:value={newName}
				maxlength="32"
				autofocus
				placeholder={item?.name} />
			<div />
		</form>
	</div>
</main>

<style>
	.input {
		outline: none;
		border: none;
	}
</style>
