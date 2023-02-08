<script lang="ts">
	import { sidebarOpen } from '$lib/store'
	import type { User } from '@supabase/supabase-js'
	import { onMount } from 'svelte'
	import AddWorkspaceEl from './AddWorkspaceEl.svelte'
	import NavFolder from './NavFolder.svelte'
	import UserItem from './UserItem.svelte'
	import { tippy } from '$lib/tippy'
	import DarkToggle from '$lib/DarkToggle.svelte'
	import SideItem from './SideItem.svelte'

	export let folderTree: Folder[] | null
	export let user: User

	$: ({ id } = user)

	const xOff = 48
	const minSize = 270
	const maxSize = 500

	const sidebarItems = [
		{
			icon: 'files-icon',
			name: 'main',
			link: '/',
		},
		{
			icon: 'search-icon',
			name: 'Search',
			link: `/profile/${id}`,
		},
		{
			icon: 'trash-icon',
			name: 'Trash',
			link: '/trash',
		},
		{
			icon: 'settings-icon',
			name: 'Settings',
			link: '/settings',
		},
	]

	let sidebar: HTMLElement
	let resizing = false
	let scrollContainer: HTMLElement

	onMount(() => {
		const width = localStorage.getItem('sidebarWidth')
		if (width && parseInt(width) >= minSize && parseInt(width) <= maxSize) {
			sidebar.style.width = width
		} else {
			sidebar.style.width = `${330}px`
			localStorage.setItem('sidebarWidth', `${330}px`)
		}
	})

	function handleSidebarResize() {
		resizing = true
		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mouseup', handleMouseUp)
		function handleMouseMove(e: MouseEvent) {
			if (e.clientX - xOff > minSize && e.clientX - xOff < maxSize) {
				console.log(e.clientX - xOff)
				sidebar.style.width = e.clientX - xOff + 'px'
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

<main class="flex select-none ">
	<div
		class="flex flex-col h-full bg-nord6 w-12 items-center justify-between dark:bg-nord0">
		<section class="flex flex-col">
			{#each sidebarItems as item}
				<SideItem name={item.name} class={item.icon} />
			{/each}
		</section>
		<section class="flex flex-col items-center">
			<DarkToggle />
			<button class="h-12 w-12">
				<div
					class="m-auto text-xl opacity-60 i-ri-side-bar-line hover:opacity-100" />
			</button>
		</section>
	</div>

	<div
		class="flex flex-col min-w-[270px] w-70 relative dark:bg-nord1"
		class:hide={!$sidebarOpen}
		bind:this={sidebar}>
		<nav
			class="border-transparent border-t max-h-full h-[calc(100vh_-_48px)] overflow-y-auto dark:border-transparent"
			on:scroll={handleScroll}
			bind:this={scrollContainer}>
			<ul>
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

		<div class="resize-container">
			<div
				class="flex h-full ml-[-6px] col-resize w-[12px] justify-center group"
				on:mousedown={handleSidebarResize}>
				<div
					class=" h-full trans group-hover:(border-l border-nord3 opacity-50) dark:group-hover:(border-l border-nord4) "
					class:is-resizing={resizing} />
			</div>
		</div>
	</div>
</main>

<style>
	.col-resize {
		cursor: col-resize;
	}

	.is-resizing {
	}
	.hide {
		--at-apply: hidden;
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
