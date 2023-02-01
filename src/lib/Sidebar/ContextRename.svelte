<script lang="ts">
	import { onMount } from 'svelte'
	import { contextRename } from '$lib/store'
	import { clickoutside } from '@svelte-put/clickoutside'

	const { x, y, boxBoundaries, item } = $contextRename

	let container: HTMLElement

	function handleClose() {
		contextRename.set({ show: false, x: 0, y: 0 })
	}

	onMount(() => {
		if (!boxBoundaries) return
		container.style.left = `${boxBoundaries.x + 20}px`
		container.style.top = `${boxBoundaries.bottom}px`
	})
</script>

<svelte:window on:keydown={() => {}} />

<main class="h-screen text-sm w-screen top-0 left-0 z-200 absolute">
	<div
		id="rename-context-menu"
		class="rounded-lg flex bg-nord3 shadow-xl p-1 shadow-nord0 text-nord6/80 w-52 gap-2 absolute items-center"
		bind:this={container}
		use:clickoutside
		on:clickoutside={handleClose}>
		<div class="flex h-5 w-5">
			<iconify-icon class="m-auto" icon="carbon:sun" />
		</div>
		<input class="input" type="text" placeholder={item?.name} />
		<div />
	</div>
</main>

<style>
	.input {
		padding: 2px;
		background-color: transparent;
		outline: none;
		border: none;
	}
</style>
