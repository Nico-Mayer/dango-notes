<script lang="ts">
	import type { User } from '@supabase/supabase-js'

	export let user: User

	$: ({ avatar_url } = user?.user_metadata)
</script>

<section class="flex h-10 w-10 items-center justify-center">
	<div>
		{#if avatar_url}
			<img
				referrerpolicy="no-referrer"
				src={avatar_url}
				alt="avatar"
				class="rounded-full h-6 w-auto" />
		{:else}
			<img
				src={`https://api.multiavatar.com/${user.id}.png`}
				alt="avatar"
				class="rounded-full h-6 w-auto" />
		{/if}
	</div>
</section>
