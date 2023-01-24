<script lang="ts">
	export let currentFolder: Folder | undefined
	export let currentNote: Note | undefined
</script>

<main class="flex h-11 w-full p-2 gap-5">
	<h1>navbar</h1>
	<h1>Folder: {currentFolder?.name}</h1>
	<h1>Note: {currentNote?.name}</h1>
</main>
