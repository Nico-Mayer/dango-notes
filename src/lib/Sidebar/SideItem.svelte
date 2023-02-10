<script lang="ts">
	export let name: string
	export let active: boolean
</script>

<main class="flex border-l-2 h-12 w-12">
	<button class="m-auto opacity-70 text-2xl trans hover:opacity-100">
		<div class={$$props.class} />
	</button>
</main>
