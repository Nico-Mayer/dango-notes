<script lang="ts">
	import InputText from '$lib/InputText.svelte'
	import type { ActionData } from './$types'

	export let form: ActionData
</script>

<main class="flex flex-col h-full w-full justify-center items-center">
	<h1 class="font-extrabold mt-20 mb-10 text-4xl">🍡 Dango Notes</h1>
	<div class="text-center w-100">
		<form
			class="flex flex-col mb-3 gap-5"
			action="?/register"
			method="POST">
			<div>
				<InputText
					name="email"
					type="email"
					label="Email"
					required={true}
					value={form?.data?.email ?? ''} />
				{#if form?.errors?.email}
					<p class="text-xs text-start text-red-500">
						{form.errors.email[0]}
					</p>
				{/if}
			</div>

			<div>
				<InputText
					name="password"
					type="password"
					label="Password"
					autocomplete={false}
					required={true} />
				{#if form?.errors?.password}
					<p class="text-xs text-start text-red-500">
						{form.errors.password[0]}
					</p>
				{/if}
			</div>

			<div>
				<InputText
					type="password"
					name="passwordConfirm"
					label="Confirm Password"
					autocomplete={false}
					required={true} />
				{#if form?.errors?.passwordConfirm}
					<p class="text-xs text-start text-red-500">
						{form.errors.passwordConfirm[0]}
					</p>
				{/if}
			</div>

			<button class="rounded font-bold p-2" type="submit"
				>Register</button>
		</form>

		<div class="h-8 separator">Or</div>
		<a href="/login" class="text-sm underline">SIGN IN</a>
	</div>
</main>

<style>
	.separator {
		display: flex;
		align-items: center;
		text-align: center;
		@apply text-sm;
	}

	.separator::before,
	.separator::after {
		content: '';
		flex: 1;
		@apply border-b;
	}

	.separator:not(:empty)::before {
		margin-right: 0.25em;
	}

	.separator:not(:empty)::after {
		margin-left: 0.25em;
	}
</style>
