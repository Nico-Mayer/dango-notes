<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { updateFolder, updateNote } from '$lib/supabase'
	import { sidebarOpen } from './store'
	import { page } from '$app/stores'

	export let currentFolder: Folder | undefined
	export let currentNote: Note | undefined

	let inputFolderName: HTMLInputElement
	let inputNoteName: HTMLInputElement

	$: folderName = currentFolder?.name
	$: noteName = currentNote?.name

	$: inTrash = $page.route.id === '/trash'
	$: home = $page.route.id === '/'

	async function handleSubmit(type: 'folder' | 'note') {
		if (type === 'folder') {
			if (currentFolder === undefined || folderName === undefined) return

			const { error } = await updateFolder(currentFolder.id, {
				...currentFolder,
				name: inputFolderName.value,
			})

			if (error) console.error(error)

			inputFolderName.blur()
			invalidateAll()
		}
		if (type === 'note') {
			if (
				currentNote === undefined ||
				noteName === undefined ||
				currentFolder === undefined
			)
				return

			const { error } = await updateNote(currentNote.id, {
				...currentNote,
				name: inputNoteName.value,
			})

			if (error) console.error(error)

			inputNoteName.blur()
			invalidateAll()
		}
	}
</script>

<main class="flex font-semibold h-12 w-full p-2 gap-5 items-center ">
	<button
		class="rounded-lg flex p-1 trans items-center"
		class:hide={$sidebarOpen}
		on:click={() => {
			$sidebarOpen = true
		}}>
		<div class="text-xl i-carbon-menu" />
	</button>

	<div class="flex gap-2 items-center">
		{#if home}
			<h1 class="px-4">Home</h1>
		{:else if inTrash}
			<h1 class="px-4">Trash</h1>
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
		--at-apply: bg-transparent border-none rounded-lg outline-none py-1 px-4
			transition-all ease-in-out duration-250;
	}
	.input-field:hover {
	}
	.input-field:focus {
	}

	.hide {
		--at-apply: hidden;
	}
</style>
