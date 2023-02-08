<script lang="ts">
	// relies on script in app.html
	import { onMount } from 'svelte'
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
	on:click={toggleTheme}>
	<div class="m-auto text-xl i-ri-moon-line dark:i-ri-sun-line" />
</button>
