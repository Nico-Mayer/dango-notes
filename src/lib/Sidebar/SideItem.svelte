<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let active: boolean

	function handleClick() {
		dispatch('click')
	}
</script>

<main class="flex h-12 w-12">
	<button
		on:click={handleClick}
		class="m-auto opacity-70 text-2xl trans hover:opacity-100"
		class:active>
		<div class={$$props.class} />
	</button>
</main>

<style>
	.active {
		--at-apply: opacity-100;
	}
</style>
