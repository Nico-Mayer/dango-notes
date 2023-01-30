<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
	$: ({ session } = data)
</script>

<h1>{session?.user.email}</h1>
