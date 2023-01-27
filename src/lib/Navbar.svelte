<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { updateFolder, updateNote } from '$lib/supabase'
	import { sidebarOpen } from './store'
	import { page } from '$app/stores'

	export let currentFolder: Folder | undefined
	export let currentNote: Note | undefined
	export let userId: string | undefined

	let inputFolderName: HTMLInputElement
	let inputNoteName: HTMLInputElement

	$: folderName = currentFolder?.name
	$: noteName = currentNote?.name

	$: inTrash = $page.route.id === '/trash'
	$: home = $page.route.id === '/'

	async function handleSubmit(type: 'folder' | 'note') {
		if (type === 'folder') {
			if (
				currentFolder === undefined ||
				userId === undefined ||
				folderName === undefined
			)
				return

			const { data, error } = await updateFolder(
				userId,
				currentFolder.id,
				{
					...currentFolder,
					name: inputFolderName.value,
				}
			)

			if (error) console.error(error)

			inputFolderName.blur()
			invalidateAll()
		}
		if (type === 'note') {
			if (
				currentNote === undefined ||
				userId === undefined ||
				noteName === undefined ||
				currentFolder === undefined
			)
				return

			const { data, error } = await updateNote(
				userId,
				currentNote.id,
				currentFolder?.id,
				{
					...currentNote,
					name: inputNoteName.value,
				}
			)

			if (error) console.error(error)

			inputNoteName.blur()
			invalidateAll()
		}
	}
</script>

<main class="flex h-12 w-full p-2 gap-5 items-center">
	<button
		class="rounded-lg flex p-1 trans items-center hover:bg-nord2"
		class:hidden={$sidebarOpen}
		on:click={() => {
			$sidebarOpen = true
		}}>
		<iconify-icon
			class="text-xl hover:rubberBand"
			icon="material-symbols:menu" />
	</button>

	<div class="flex text-sm text-nord6/60 gap-2 items-center">
		{#if home}
			<h1 class="font-semibold px-4">Home</h1>
		{:else if inTrash}
			<h1 class="font-semibold px-4">Trash</h1>
		{:else}
			<div>
				<form on:submit|preventDefault={() => handleSubmit('folder')}>
					<input
						bind:this={inputFolderName}
						maxlength="32"
						class="input-field"
						type="text"
						value={folderName}
						on:blur={() => handleSubmit('folder')} />
				</form>
			</div>
			<span> / </span>
			<div>
				<form on:submit|preventDefault={() => handleSubmit('note')}>
					<input
						bind:this={inputNoteName}
						maxlength="32"
						class="input-field"
						type="text"
						value={noteName}
						on:blur={() => handleSubmit('note')} />
				</form>
			</div>
		{/if}
	</div>
</main>

<style>
	.input-field {
		@apply bg-transparent border-none rounded-lg outline-none py-1 px-4 transition-all ease-in-out duration-250;
	}
	.input-field:hover {
		@apply bg-nord1 text-nord6;
	}
	.input-field:focus {
		@apply bg-nord1 text-nord6;
	}
</style>
