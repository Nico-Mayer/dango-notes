<script lang="ts">
	import FolderEl from './FolderEl.svelte'
	import AddFolderEl from './AddFolderEl.svelte'
	import { onMount } from 'svelte'

	export let folders: any[]
	export let userId: string | undefined
	export let avatarUrl: string

	let sidebar: HTMLElement
	let resizing = false
	let scrollContainer: HTMLElement
	folders.map((folder) => {
		folder.children = [...folder.childNotes, ...folder.childFolders]
	})

	$: console.log(folders)

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
</script>

<main
	class="flex flex-col h-screen bg-nord4 w-70 select-none relative sidebar dark:(bg-nord1 ) "
	bind:this={sidebar}>
	<section id="top">
		<div
			class="cursor-pointer flex h-12 py-1 px-2  items-center dark:(hover:bg-nord3) hover:bg-nord4">
			<span class="font-bold">🍡 Dango Notes</span>
		</div>
		<div id="options" class="h-22" />
	</section>

	<nav
		class="border-transparent border-t h-full max-h-full overflow-y-auto"
		on:scroll={handleScroll}
		bind:this={scrollContainer}>
		<ul class="space-y-1 py-1 px-[2px]">
			{#each folders as folder}
				<li>
					<FolderEl {folder} />
					{#if folder?.children?.length > 0}
						{#each folder.children as child}
							{#if child.type === 'folder'}
								<div class="ml-5">
									<FolderEl folder={child} />
								</div>
							{:else}
								<div class="flex text-sm ml-10">
									{child.name}
								</div>
							{/if}
						{/each}
					{/if}
				</li>
			{/each}
		</ul>
		<AddFolderEl {userId} />
	</nav>

	<section id="bottom">
		<div
			class="border-t flex border-nord5 h-13 py-1 px-2 items-center dark:(border-nord3)">
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
				class="border-l h-full border-nord3 transition-all duration-500 group-hover:(border-nord4/40) "
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
