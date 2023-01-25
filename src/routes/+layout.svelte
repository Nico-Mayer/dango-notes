<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import Navbar from '$lib/Navbar.svelte'
	import ContextMenuAdd from '$lib/Sidebar/ContextMenuAdd.svelte'
	import ContextMenuEdit from '$lib/Sidebar/ContextMenuEdit.svelte'
	import Sidebar from '$lib/Sidebar/Sidebar.svelte'
	import { contextMenuAdd, contextMenuEdit } from '$lib/store'
	import { supabaseClient } from '$lib/supabase'
	import { onMount } from 'svelte'
	import 'virtual:windi.css'
	import '../app.css'
	import type { LayoutData } from './$types'

	export let data: LayoutData
	let userId: string
	let currentFolder: Folder | undefined = undefined
	let currentNote: Note | undefined = undefined

	$: ({ session, folderTree, notes, folders } = data)
	$: avatarUrl = session?.user?.user_metadata.avatar_url
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

<main class="flex h-screen bg-nord0 border-nord3 w-screen text-nord6 relative">
	{#if $contextMenuAdd.show}
		<ContextMenuAdd x={$contextMenuAdd.x} y={$contextMenuAdd.y} {userId} />
	{/if}
	{#if $contextMenuEdit.show}
		<ContextMenuEdit
			x={$contextMenuEdit.x}
			y={$contextMenuEdit.y}
			{userId} />
	{/if}

	{#if session}
		<Sidebar {folderTree} {avatarUrl} {userId} />
	{/if}

	<div class="w-full">
		<Navbar {currentFolder} {currentNote} />
		<slot />
	</div>
</main>
