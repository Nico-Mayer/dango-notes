<script lang="ts">
	import FolderEl from './FolderEl.svelte'
	import AddFolderEl from './AddFolderEl.svelte'
	import { onMount } from 'svelte'
	export let folders: any[]
	export let userId: string | undefined
	export let avatarUrl: string

	let sidebar: HTMLElement
	let resizing = false

	onMount(() => {
		const width = localStorage.getItem('sidebarWidth')
		if (width && parseInt(width) >= 220 && parseInt(width) <= 480) {
			sidebar.style.width = width
		} else {
			sidebar.style.width = '280px'
			localStorage.setItem('sidebarWidth', '280px')
		}
	})

	function handleSidebarResize() {
		resizing = true
		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mouseup', handleMouseUp)
		function handleMouseMove(e: MouseEvent) {
			if (e.clientX > 220 && e.clientX < 480) {
				sidebar.style.width = e.clientX + 'px'
				document.body.style.cursor = 'col-resize'
			}
		}
		function handleMouseUp() {
			resizing = false
			document.body.style.cursor = 'auto'
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseup', handleMouseUp)
			localStorage.setItem('sidebarWidth', sidebar.style.width)
		}
	}
</script>

<main
	class="flex flex-col h-screen bg-nord4 w-70 select-none relative sidebar dark:(bg-nord1 ) "
	bind:this={sidebar}>
	<section id="top">
		<div
			class="cursor-pointer flex h-12 py-1 px-2 transition-all items-center dark:(hover:bg-nord3) hover:bg-nord4">
			<span class="font-bold">🍡 Dango Notes</span>
		</div>
		<div id="options" class="h-22" />
	</section>

	<nav class="max-h-full overflow-y-scroll">
		<ul class="space-y-1  py-1 px-[2px] ">
			{#each folders as folder}
				<li>
					<FolderEl {folder} />
				</li>
			{/each}
		</ul>
		<AddFolderEl {userId} />
	</nav>

	<section id="bottom">
		<div
			class="border-t flex border-nord5 h-13 py-1 px-2 items-center dark:(border-nord2)">
			{#if avatarUrl}
				<img
					src={avatarUrl}
					alt="avatar"
					class="rounded-full h-9 w-auto" />
			{:else}
				<img
					src={`https://api.multiavatar.com/${userId}.png`}
					alt="avatar"
					class="rounded-full h-9 w-auto" />
			{/if}
		</div>
	</section>

	<div class="resize-container">
		<div
			class="flex h-full ml-[-6px] col-resize w-[12px] justify-center group"
			on:mousedown={handleSidebarResize}>
			<div
				class="border-l h-full border-nord2 transition-all duration-500 group-hover:(border-nord4/40) "
				class:is-resizing={resizing} />
		</div>
	</div>
</main>

<style>
	.col-resize {
		cursor: col-resize;
	}

	.is-resizing {
		@apply border-nord4/40;
	}

	.resize-container {
		position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0px;
		width: 0px;
		flex-grow: 0;
		z-index: 1;
		pointer-events: auto;
	}
</style>
