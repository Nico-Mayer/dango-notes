<script lang="ts">
	import { addFolder } from '$lib/supabase'
	import { invalidateAll } from '$app/navigation'
	export let userId: string | undefined

	async function handleAddWorkspace() {
		if (userId === undefined) return
		await addFolder({
			name: 'New Workspace',
			owner: userId,
			type: 'workspace',
			parent_folder_id: null,
		})
		invalidateAll()
	}
</script>

<button
	class="flex h-9 w-full px-4 rotate-6 items-center justify-between group trans hover:(bg-nord3 text-nord5) "
	on:click={handleAddWorkspace}>
	<section class="flex space-x-2 items-center">
		<iconify-icon
			icon="ri:add-fill"
			class="text-lg  group-hover:rubberBand" />
		<span class="font-semibold text-sm">Add a workspace</span>
	</section>
</button>
