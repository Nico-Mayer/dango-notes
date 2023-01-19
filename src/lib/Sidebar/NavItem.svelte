<script lang="ts">
	import NavItem from './NavItem.svelte'
	export let item: any
</script>

<div>
	<a
		class="rounded flex h-7 w-full px-2 text-nord4/60 items-center justify-between dark:(hover:bg-nord2) "
		href={'#'}>
		<section class="flex">
			<button class="flex items-center justify-center btn-hov">
				<iconify-icon icon="ri:arrow-right-s-line" />
			</button>
			<div class="flex text-sm ml-2 items-center">
				<iconify-icon icon="ri:folder-2-line" />
				<span class="font-semibold ml-1">{item.name}</span>
			</div>
		</section>

		<section class="flex space-x-1">
			<button class="flex items-center justify-center btn-hov">
				<iconify-icon icon="ri:more-fill" />
			</button>
			<button class="flex items-center justify-center btn-hov">
				<iconify-icon icon="ri:add-fill" />
			</button>
		</section>
	</a>
	{#if item.children}
		{#each item.children as child}
			<div class="ml-2">
				<NavItem item={child} />
			</div>
		{/each}
	{/if}
</div>

<style>
	.btn-hov {
		@apply rounded h-5 w-5;
	}
	.btn-hov:hover {
		@apply bg-nord3;
	}
</style>
