<script lang="ts">
	export let name: string
</script>

<main class="flex h-12 w-12">
	<button class="m-auto opacity-70 text-2xl trans hover:opacity-100">
		<div class={$$props.class} />
	</button>
</main>
