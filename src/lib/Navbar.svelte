<script lang="ts">
	import { sidebarOpen } from './store'

	export let currentFolder: Folder | undefined
	export let currentNote: Note | undefined
</script>

<main class="border flex h-11 w-full p-2 gap-5 items-center">
	<button
		class="flex items-center"
		class:hidden={$sidebarOpen}
		on:click={() => {
			$sidebarOpen = true
		}}>
		<iconify-icon icon="material-symbols:menu" />
	</button>
	<div class="flex text-sm text-nord6/50 gap-2">
		<span>
			{currentFolder?.name}
		</span>
		<span> / </span>
		<span>{currentNote?.name}</span>
	</div>
</main>
