<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { updateFolder, updateNote } from '$lib/supabase'
	import { sidebarOpen } from './store'

	export let currentFolder: Folder | undefined
	export let currentNote: Note | undefined
	export let userId: string | undefined

	let inputFolderName: HTMLInputElement

	$: folderName = currentFolder?.name
	$: noteName = currentNote?.name

	async function handleSubmit(e: Event) {
		e.preventDefault()
		const targetId = (e.target as HTMLFormElement).id
		if (targetId === 'folder-name-form') {
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
			console.log(data)
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
		<div>
			<form id="folder-name-form" on:submit={handleSubmit}>
				<input
					bind:this={inputFolderName}
					maxlength="32"
					class="input-field"
					type="text"
					value={folderName} />
			</form>
		</div>
		<span> / </span>
		<div>
			<form id="note-name-form" on:submit={handleSubmit}>
				<input
					maxlength="32"
					class="input-field"
					type="text"
					value={noteName} />
			</form>
		</div>
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
