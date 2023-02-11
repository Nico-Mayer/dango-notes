<script lang="ts">
	import { onMount } from 'svelte'
	import { tippy } from '$lib/tippy'

	let theme: string | null
	onMount(() => {
		theme = localStorage.getItem('theme')
	})
	function toggleTheme() {
		document.documentElement.classList.toggle('dark')
		if (theme === 'dark') {
			theme = 'light'
			localStorage.setItem('theme', 'light')
			return
		}
		theme = 'dark'
		localStorage.setItem('theme', 'dark')
	}
</script>

<button
	class="h-12 opacity-60 w-12 trans hover:opacity-100"
	on:click={toggleTheme}
	use:tippy={{
		content: 'Toggle Theme',
	}}>
	<div class="m-auto text-xl i-ri-moon-line dark:i-ri-sun-line" />
</button>
