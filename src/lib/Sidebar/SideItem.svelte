<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { tippy } from '$lib/tippy'

	type SideItem = {
		icon: string
		name: string
		link: string
		index: number
	}

	export let active: boolean
	export let item: SideItem

	const dispatch = createEventDispatcher()

	function handleClick() {
		dispatch('click')
	}
</script>

<main
	class="flex h-12 opacity-50 w-12 trans hover:opacity-100"
	class:active
	use:tippy={{ content: item?.name }}>
	<button on:click={handleClick} class="m-auto text-2xl ">
		<div class={$$props.class} />
	</button>
</main>

<style>
	.active {
		@apply opacity-100;
	}
</style>
