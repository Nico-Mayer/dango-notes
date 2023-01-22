<script lang="ts">
	import 'iconify-icon'
	import { addFolder } from '$lib/supabase'
	import { invalidateAll } from '$app/navigation'
	export let userId: string | undefined

	async function handleAddFolder() {
		if (userId === undefined) return
		await addFolder({
			name: 'New Folder',
			owner: userId,
		})
		invalidateAll()
	}
</script>

<button
	class="flex h-9 w-full px-4 text-nord4/80 rotate-6 items-center justify-between group hover:bg-nord2"
	on:click={handleAddFolder}>
	<section class="flex space-x-2 items-center">
		<iconify-icon
			icon="ri:add-fill"
			class="text-lg animate-fast group-hover:animate-rubberBand" />
		<span class="font-semibold text-sm">Add a folder</span>
	</section>
</button>
