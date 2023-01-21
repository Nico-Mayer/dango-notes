<script lang="ts">
	import '../app.css'
	import 'virtual:windi.css'
	import { onMount } from 'svelte'
	import { invalidateAll } from '$app/navigation'
	import { supabaseClient } from '$lib/supabase'
	import Sidebar from '$lib/Sidebar/Sidebar.svelte'
	import type { LayoutData } from './$types'

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

<main
	class="flex h-screen bg-nord6 border-nord0 w-screen text-nord0 dark:(bg-nord0 text-nord6) ">
	{#if session}
		<Sidebar {folderTree} {avatarUrl} {userId} />
	{/if}

	<slot />
</main>
