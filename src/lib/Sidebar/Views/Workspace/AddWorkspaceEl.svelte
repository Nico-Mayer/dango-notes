<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { addFolder } from '$lib/supabase'

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
	class="flex h-9 w-full px-4 items-center justify-between group trans"
	on:click={handleAddWorkspace}>
	<section class="flex space-x-2 items-center">
		<div class="text-lg i-ri-add-fill trans group-hover:rotate-180" />
		<span class="font-semibold text-sm">Add a workspace</span>
	</section>
</button>
