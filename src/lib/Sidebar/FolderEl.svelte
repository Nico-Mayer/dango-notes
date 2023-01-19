<script lang="ts">
	import 'iconify-icon'
	export let folder: any
</script>

<a
	class="rounded flex h-7 w-full px-2 text-nord4/60 items-center justify-between dark:(hover:bg-nord2) "
	href={'#'}>
	<section class="flex">
		<button class="flex items-center justify-center btn-hov">
			<iconify-icon icon="ri:arrow-right-s-line" />
		</button>
		<div class="flex text-sm ml-2 items-center">
			<iconify-icon icon="ri:folder-2-line" />
			<span class="font-semibold ml-1">{folder.name}</span>
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

<style>
	.btn-hov {
		@apply rounded h-5 w-5;
	}
	.btn-hov:hover {
		@apply bg-nord3;
	}
</style>
