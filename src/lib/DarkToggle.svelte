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

<button class={$$props.class} on:click={toggleTheme}>
	<div class="i-ri-sun-line" />
</button>
