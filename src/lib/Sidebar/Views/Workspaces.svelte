<script lang="ts">
	import AddWorkspaceEl from '../AddWorkspaceEl.svelte'
	import NavFolder from '../NavFolder.svelte'

	export let folderTree: Folder[] | null
	export let id: string
</script>

<ul>
	{#if folderTree}
		{#each folderTree as rootFolder}
			<NavFolder item={rootFolder} lvl={0} />
		{/each}
	{/if}
</ul>
<div class="mt-2">
	<AddWorkspaceEl userId={id} />
</div>
