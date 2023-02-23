<script lang="ts">
	import { sidebarOpen } from '$lib/store'
	import type { User } from '@supabase/supabase-js'
	import { onMount } from 'svelte'
	import { tippy } from '$lib/tippy'
	import DarkToggle from '$lib/DarkToggle.svelte'
	import SideItem from './SideItem.svelte'
	import Workspaces from '$lib/Sidebar/Views/Workspace/Workspaces.svelte'
	import Trash from './Views/Trash/Trash.svelte'

	export let folderTree: Folder[] | null
	export let trashItems: (Folder | Note)[] | undefined
	export let user: User

	$: ({ id } = user)

	const xOff = 48
	const minSize = 270
	const maxSize = 500
	let active = 0

	const sidebarItems = [
		{
			icon: 'i-akar-icons-copy',
			name: 'Files',
			link: '/',
			index: 0,
		},
		{
			icon: '	 i-akar-icons-search',
			name: 'Search',
			link: `/profile/${id}`,
			index: 1,
		},
		{
			icon: 'i-akar-icons-trash-bin',
			name: 'Trash',
			link: '/trash',
			index: 2,
		},
		{
			icon: 'i-akar-icons-gear',
			name: 'Settings',
			link: '/settings',
			index: 3,
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
			!scrollContainer.classList.contains('border-nord-3')
		) {
			scrollContainer.classList.remove('border-transparent')
			scrollContainer.classList.add('border-nord-3')
			return
		} else if (scrollContainer.scrollTop === 0) {
			scrollContainer.classList.remove('border-nord-3')
			scrollContainer.classList.add('border-transparent')
		}
	}

	function toggleSidebar() {
		$sidebarOpen = !$sidebarOpen
		localStorage.setItem('sidebarOpen', $sidebarOpen.toString())
	}
</script>

<main class="flex select-none ">
	<div
		class="flex flex-col h-full bg-nord-5 w-12 items-center justify-between dark:bg-nord-0">
		<section class="flex flex-col py-1">
			{#each sidebarItems as item}
				<SideItem
					on:click={() => (active = item.index)}
					{item}
					class={item.icon}
					active={active === item.index} />
			{/each}
		</section>
		<section class="flex flex-col items-center">
			<DarkToggle />
			<button
				class="h-12 opacity-60 w-12 hover:opacity-100"
				on:click={toggleSidebar}
				use:tippy={{
					content: 'Toggle Sidebar cmd + b',
				}}>
				<div
					class="m-auto text-xl trans"
					class:i-ri-side-bar-fill={$sidebarOpen}
					class:i-ri-side-bar-line={!$sidebarOpen} />
			</button>
		</section>
	</div>

	<div
		class="flex flex-col bg-nord-6 min-w-[270px] w-70 relative dark:bg-nord-1"
		class:hidden={!$sidebarOpen}
		bind:this={sidebar}>
		<nav
			class="border-transparent border-t max-h-full h-[calc(100vh_-_48px)] overflow-y-auto dark:border-transparent"
			on:scroll={handleScroll}
			bind:this={scrollContainer}>
			<div class="flex h-full flex-col">
				{#if active === 0}
					<Workspaces {folderTree} {id} />
				{:else if active === 2}
					<Trash {trashItems} />
				{/if}
			</div>
		</nav>

		<div class="resize-container">
			<div
				class="flex h-full ml-[-6px] cursor-col-resize w-[12px] justify-center group"
				on:mousedown={handleSidebarResize}>
				<div
					class="h-full trans
					group-hover:border-l
					group-hover:opacity-50
					group-hover:border-nord-3
					dark:group-hover:border-nord-4
					"
					class:is-resizing={resizing} />
			</div>
		</div>
	</div>
</main>

<style>
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
