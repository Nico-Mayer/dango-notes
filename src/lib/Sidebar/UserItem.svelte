<script lang="ts">
	import type { User } from '@supabase/supabase-js'

	export let user: User

	$: ({ avatar_url } = user?.user_metadata)
</script>

<section
	class="border-t flex border-nord3 h-13 py-1 px-2 items-center justify-between">
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

	<div>
		{#if user}
			<span class="text-sm">{user.email}</span>
		{/if}
	</div>
	<form action="/logout" method="POST">
		<button type="submit" class="flex">
			<iconify-icon
				class="m-auto text-xl hover:(rubberBand text-nord6/80) "
				icon="ri:logout-box-line" />
		</button>
	</form>
</section>
