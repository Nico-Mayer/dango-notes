<script lang="ts">
	export let label = ''
	export let value: FormDataEntryValue | string = ''
	export let type = 'text'
	export let name = 'inputField'
	export let placeholder = ''
	export let required = false
	export let selected = false
	export let autofocus = false
	export let autocomplete = true
	let hasAutocomplete = autocomplete ? 'on' : 'off'
</script>

<div
	class="rounded flex flex-col bg-nord1 w-full py-2 px-4 ring-blue-400 gap-2"
	class:ring-2={selected}>
	<label class="flex text-sm gap-1 items-center" for="username">
		<div class={$$props.class} />
		<span>{label}</span>
		{#if required}
			&ensp
			<span class="text-sm text-red-400">*</span>
		{/if}
	</label>

	{#if type === 'password'}
		<!-- svelte-ignore a11y-autofocus -->
		<input
			class="bg-transparent focus:outline-none"
			{autofocus}
			type="password"
			name={name ? name : 'password'}
			autocomplete={hasAutocomplete}
			{placeholder}
			bind:value />
	{:else if type === 'email'}
		<!-- svelte-ignore a11y-autofocus -->
		<input
			class="bg-transparent focus:outline-none"
			{autofocus}
			type="email"
			name={name ? name : 'username'}
			autocomplete={hasAutocomplete}
			{placeholder}
			bind:value />
	{:else}
		<!-- svelte-ignore a11y-autofocus -->
		<input
			class="bg-transparent focus:outline-none"
			{autofocus}
			type="text"
			name={name ? name : 'username'}
			autocomplete={hasAutocomplete}
			{placeholder}
			bind:value />
	{/if}
</div>
