<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import UserItem from '$lib/Sidebar/UserItem.svelte'
	import type { User } from '@supabase/supabase-js'
	import { updateNote } from './supabase'

	export let currentFolder: Folder | undefined
	export let currentNote: Note | undefined
	export let user: User

	let inputNoteName: HTMLInputElement

	$: noteName = currentNote?.name

	async function handleSubmit() {
		if (currentNote === undefined || noteName === undefined) return

		let newName =
			inputNoteName.value.length > 0 ? inputNoteName.value : 'Untitled'

		const { error } = await updateNote(currentNote.id, {
			...currentNote,
			name: newName,
		})
		if (error) console.error(error)
		inputNoteName.blur()
		invalidateAll()
	}
</script>

<svelte:head>
	<title>{'Dango Notes | ' + currentNote?.name ?? 'Untitled'}</title>
</svelte:head>

<main
	class="flex bg-nord6 h-10 w-full max-h-10 justify-between items-center relative dark:bg-nord0">
	<section class="flex trans hover:bg-nord10/20">
		<div class="flex h-10 w-12">
			<img
				src="https://api.iconify.design/fluent-emoji-high-contrast:dango.svg?color=%2381a1c1"
				class="m-auto h-[24px] w-[24px]"
				alt="logo" />
		</div>
	</section>

	{#if currentNote}
		<section id="mid">
			<form on:submit|preventDefault={() => handleSubmit()}>
				<input
					on:focus={() => {
						inputNoteName.select()
					}}
					bind:this={inputNoteName}
					type="text"
					class="bg-transparent h-10 text-center text-sm py-1 px-2 w-32 hover:(dark:bg-nord3 bg-nord5) focus:(outline-none hover:bg-transparent) "
					maxlength="32"
					value={noteName}
					on:blur={() => handleSubmit()} />
			</form>
		</section>
	{/if}

	<section id="right">
		<UserItem {user} />
	</section>
</main>
