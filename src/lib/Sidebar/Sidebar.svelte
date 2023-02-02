<script lang="ts">
	import { sidebarOpen } from '$lib/store'
	import type { User } from '@supabase/supabase-js'
	import { onMount } from 'svelte'
	import AddWorkspaceEl from './AddWorkspaceEl.svelte'
	import NavFolder from './NavFolder.svelte'
	import UserItem from './UserItem.svelte'
	import { tippy } from '$lib/tippy'

	export let folderTree: Folder[] | null
	export let user: User

	$: ({ id } = user)

	const minSize = 270
	const maxSize = 500

	let sidebar: HTMLElement
	let resizing = false
	let scrollContainer: HTMLElement

	onMount(() => {
		const width = localStorage.getItem('sidebarWidth')
		if (width && parseInt(width) >= minSize && parseInt(width) <= maxSize) {
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
			if (e.clientX > minSize && e.clientX < maxSize) {
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

	function handleScroll() {
		if (
			scrollContainer.scrollTop > 0 &&
			!scrollContainer.classList.contains('border-nord3')
		) {
			scrollContainer.classList.remove('border-transparent')
			scrollContainer.classList.add('border-nord3')
			return
		} else if (scrollContainer.scrollTop === 0) {
			scrollContainer.classList.remove('border-nord3')
			scrollContainer.classList.add('border-transparent')
		}
	}

	function handleMinimize() {
		$sidebarOpen = false
		localStorage.setItem('sidebarOpen', 'false')
	}
</script>

<main
	class="flex flex-col h-screen bg-nord1 min-w-[270px] text-nord6/60 w-70 select-none relative sidebar"
	class:hidden={!$sidebarOpen}
	bind:this={sidebar}>
	<section id="top" class="group">
		<div class="flex h-12 p-2  items-center justify-between">
			<div class="flex ml-2 gap-2 items-center">
				<iconify-icon
					icon="fluent-emoji-high-contrast:dango"
					class="text-lg" />
			</div>

			<button
				class="rounded-lg flex opacity-0 p-1 trans items-center hover:bg-nord2 group-hover:opacity-100"
				on:click={handleMinimize}
				use:tippy={{ content: 'Close sidebar' }}>
				<iconify-icon
					class="text-xl hover:(rubberBand text-nord6/80) "
					icon="material-symbols:keyboard-double-arrow-left-rounded" />
			</button>
		</div>
		<section class="flex flex-col w-full p-2 gap-2">
			<div
				class="rounded-lg flex bg-nord2 w-full py-2 px-4 items-center justify-center ">
				<iconify-icon icon="ri:search-line" />
				<input
					class="bg-transparent outline-none ml-2 w-full"
					placeholder="Search..."
					type="text" />
			</div>

			<div class="flex text-lg justify-between">
				<a
					href="/"
					class="rounded-lg flex bg-nord2 h-13 w-13 trans items-center justify-center  hover:(bg-nord3 text-nord6/80) ">
					<iconify-icon icon="akar-icons:home-alt1" />
				</a>
				<button
					class="rounded-lg flex bg-nord2 h-13 w-13 trans items-center justify-center hover:(bg-nord3 text-nord6/80) ">
					<iconify-icon icon="ri:moon-line" />
				</button>
				<a
					href="/trash"
					class="rounded-lg flex bg-nord2 h-13 w-13 trans items-center justify-center hover:(bg-nord3 text-nord6/80) ">
					<iconify-icon icon="akar-icons:trash-bin" />
				</a>
				<button
					class="rounded-lg flex bg-nord2 h-13 w-13 trans items-center justify-center hover:(bg-nord3 text-nord6/80) ">
					<iconify-icon icon="ri:settings-3-line" />
				</button>
			</div>
		</section>

		<section />
	</section>

	<nav
		class="border-transparent border-t h-full max-h-full overflow-y-auto"
		on:scroll={handleScroll}
		bind:this={scrollContainer}>
		<ul class="py-1">
			{#if folderTree}
				{#each folderTree as rootFolder}
					<NavFolder item={rootFolder} lvl={0} />
				{/each}
			{/if}
		</ul>
		<div class="mt-2">
			<AddWorkspaceEl userId={id} />
		</div>
	</nav>

	<UserItem {user} />

	<div class="resize-container">
		<div
			class="flex h-full ml-[-6px] col-resize w-[12px] justify-center group"
			on:mousedown={handleSidebarResize}>
			<div
				class="border-l h-full border-nord3 trans group-hover:(border-nord4/40) "
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
		transition: width 0.2s ease 0s;
	}
</style>
