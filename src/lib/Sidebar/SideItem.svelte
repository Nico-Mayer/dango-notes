<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { tippy } from '$lib/tippy'

	type SideItem = {
		icon: string
		name: string
		index: number
	}

	export let active: boolean
	export let item: SideItem

	const dispatch = createEventDispatcher()

	function handleClick() {
		dispatch('click')
	}
</script>

<button
	on:click={handleClick}
	class="flex h-12 opacity-50 w-12 trans hover:opacity-100"
	class:active
	use:tippy={{ content: item?.name }}>
	<div class={$$props.class + ' m-auto text-2xl'} />
</button>

<style>
	.active {
		@apply opacity-100;
	}
</style>
