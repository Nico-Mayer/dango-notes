<script lang="ts">
	import '../app.css'
	import 'virtual:windi.css'
	import { onMount } from 'svelte'
	import { invalidateAll } from '$app/navigation'
	import { supabaseClient } from '$lib/supabase'
	import Sidebar from '$lib/Sidebar/Sidebar.svelte'
	import ContextMenuAdd from '$lib/Sidebar/ContextMenuAdd.svelte'
	import ContextMenuEdit from '$lib/Sidebar/ContextMenuEdit.svelte'
	import type { LayoutData } from './$types'
	import { contextMenuAdd, contextMenuEdit } from '$lib/store'

	export let data: LayoutData
	let userId: string

	$: ({ session, folderTree } = data)
	$: avatarUrl = session?.user?.user_metadata.avatar_url
	$: {
		if (session) userId = session.user.id
		else userId = ''
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

	<slot />
</main>
