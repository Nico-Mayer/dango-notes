<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import Navbar from '$lib/Navbar/Navbar.svelte'
	import ContextMenuAdd from '$lib/Sidebar/ContextMenuAdd.svelte'
	import ContextMenuEdit from '$lib/Sidebar/ContextMenuEdit.svelte'
	import ContextRename from '$lib/Sidebar/ContextRename.svelte'
	import Sidebar from '$lib/Sidebar/Sidebar.svelte'
	import {
		contextMenuAdd,
		contextMenuEdit,
		contextRename,
		sidebarOpen,
	} from '$lib/store'
	import { supabaseClient } from '$lib/supabase'
	import { onMount } from 'svelte'
	import { Toaster } from 'svelte-french-toast'
	import '../app.css'
	import type { LayoutData } from './$types'

	export let data: LayoutData
	let userId: string

	let currentNote: Note | undefined = undefined

	$: ({ session, folderTree, notes, trashItems } = data)
	$: user = session?.user

	$: {
		if (session) userId = session.user.id
		else userId = ''
	}
	$: {
		if ($page.params.noteId) {
			currentNote = notes?.find((note) => note.id === $page.params.noteId)
		} else {
			currentNote = undefined
		}
	}

	onMount(() => {
		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll()
		})
		return () => {
			subscription.unsubscribe()
		}
	})

	function handleKeyDown(event: KeyboardEvent) {
		const meta = event.metaKey
		const control = event.ctrlKey
		const key = event.key

		if ((meta || control) && key === 'b') {
			$sidebarOpen = !$sidebarOpen
		}
	}
</script>

<svelte:head>
	<title>Dango Notes</title>
	<meta
		name="description"
		content="Efficient and organized notetaking for students, professionals, and anyone looking to improve their productivity. Take notes online and access them from anywhere." />
	<meta
		name="keywords"
		content="notetaking, productivity, notes, organization, online" />
	<meta name="robots" content="index, follow" />
</svelte:head>
<svelte:window on:keydown={handleKeyDown} />
<main
	class="flex h-screen w-screen text-nord-3 relative overflow-hidden dark:bg-nord-0 dark:text-nord-4">
	{#if $contextMenuAdd.show}
		<ContextMenuAdd {userId} />
	{/if}
	{#if $contextMenuEdit.show}
		<ContextMenuEdit />
	{/if}
	{#if $contextRename.show}
		<ContextRename />
	{/if}

	<Toaster />

	<div class="flex flex-col h-screen w-screen overflow-hidden">
		{#if session && user}
			<Navbar {user} {currentNote} />
		{/if}

		<div class="flex w-screen h-[calc(100vh_-_40px)]">
			{#if session && user}
				<Sidebar {user} {folderTree} {trashItems} />
			{/if}
			<slot />
		</div>
	</div>
</main>

<style uno:preflights uno:safelist global></style>
