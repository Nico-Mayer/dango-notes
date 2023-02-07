<script lang="ts">
	export let currentFolder: Folder | undefined
	export let currentNote: Note | undefined
</script>

<main class="flex h-12 w-full justify-between items-center">
	<section class="flex w-12">
		<img
			src="https://api.iconify.design/fluent-emoji-high-contrast:dango.svg?color=%2381a1c1"
			class="m-auto h-[24px] w-[24px]"
			alt="logo" />
	</section>

	<section id="mid">
		<div>Name Note</div>
	</section>

	<section id="right">
		<div>User</div>
	</section>
</main>
