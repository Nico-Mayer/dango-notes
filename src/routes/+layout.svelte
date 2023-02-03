<script lang="ts">
	import '@unocss/reset/tailwind.css'
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import Navbar from '$lib/Navbar.svelte'
	import ContextMenuAdd from '$lib/Sidebar/ContextMenuAdd.svelte'
	import ContextMenuEdit from '$lib/Sidebar/ContextMenuEdit.svelte'
	import ContextRename from '$lib/Sidebar/ContextRename.svelte'
	import Sidebar from '$lib/Sidebar/Sidebar.svelte'
	import { contextMenuAdd, contextMenuEdit, contextRename } from '$lib/store'
	import { supabaseClient } from '$lib/supabase'
	import 'iconify-icon'
	import { onMount } from 'svelte'
	import { Toaster } from 'svelte-french-toast'
	import '../app.css'
	import type { LayoutData } from './$types'

	export let data: LayoutData
	let userId: string
	let currentFolder: Folder | undefined = undefined
	let currentNote: Note | undefined = undefined

	$: ({ session, folderTree, notes, folders } = data)
	$: user = session?.user

	$: {
		if (session) userId = session.user.id
		else userId = ''
	}
	$: {
		if ($page.params.folderId) {
			currentFolder = folders?.find(
				(folder) => folder.id === $page.params.folderId
			)
		} else {
			currentFolder = undefined
		}
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

<main
	class="flex h-screen w-screen dark:bg-nord0 dark:text-nord4 relative overflow-hidden">
	{#if $contextMenuAdd.show}
		<ContextMenuAdd {userId} />
	{/if}
	{#if $contextMenuEdit.show}
		<ContextMenuEdit />
	{/if}
	{#if $contextRename.show}
		<ContextRename />
	{/if}

	{#if session && user}
		<Sidebar {user} {folderTree} />
	{/if}

	<Toaster />

	<div class="flex flex-col flex-1">
		{#if session}
			<Navbar {currentFolder} {currentNote} />
		{/if}

		<slot />
	</div>
</main>

<style uno:preflights uno:safelist global></style>
