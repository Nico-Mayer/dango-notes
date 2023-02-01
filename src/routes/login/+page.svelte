<script lang="ts">
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	import InputText from '$lib/InputText.svelte'
	import { supabaseClient } from '$lib/supabase'
	import type { Provider } from '@supabase/supabase-js'
	import type { SubmitFunction } from '@sveltejs/kit'
	let email = ''
	let password = ''
	function clearForm() {
		email = ''
		password = ''
	}
	async function singInWithProvider(provider: Provider) {
		await supabaseClient.auth.signInWithOAuth({
			provider: provider,
		})
	}

	const submitSocialLogin: SubmitFunction = async ({ action, cancel }) => {
		switch (action.searchParams.get('provider')) {
			case 'google':
				singInWithProvider('google')
				break
			case 'github':
				singInWithProvider('github')
				break
			case 'discord':
				singInWithProvider('discord')
				break
			default:
				console.log('Invalid Provider')
				break
		}
		cancel()
	}

	const submitLogin: SubmitFunction = async ({ data, cancel }) => {
		const body = Object.fromEntries(data)
		const { error: err } = await supabaseClient.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string,
		})
		if (err) {
			console.log(err)
			clearForm()
			goto('/login')
		} else {
			goto('/')
		}
		cancel()
	}
</script>

<main class="flex flex-col h-full w-full justify-center items-center">
	<h1 class="font-extrabold mt-20 mb-10 text-4xl">🍡 Dango Notes</h1>
	<div class="text-center w-100">
		<form
			class="flex flex-col mb-3 gap-5"
			action="?/login"
			method="POST"
			use:enhance={submitLogin}>
			<InputText
				name="email"
				label="Email"
				required={true}
				bind:value={email} />

			<InputText
				name="password"
				type="password"
				label="Password"
				autocomplete={false}
				required={true}
				bind:value={password} />

			<button
				class="rounded font-bold bg-nord10 p-2 text-nord6"
				type="submit">Login</button>
		</form>

		<div class="h-8 separator">Or login with</div>

		<form
			class="flex mt-3 w-full gap-3 justify-around"
			method="POST"
			use:enhance={submitSocialLogin}>
			<button
				class="bg-[#1C2128] text-white social-btn"
				formaction="?/login&provider=github">
				<iconify-icon icon="ri-github-fill" class="text-xl" />
			</button>
			<button
				class="bg-[#5865F2] text-white social-btn"
				formaction="?/login&provider=discord">
				<iconify-icon icon="carbon-logo-discord" class="text-xl" />
			</button>
			<button
				class="bg-white border text-gray-500 social-btn hover:bg-gray-50"
				formaction="?/login&provider=google">
				<iconify-icon icon="logos-google-icon" class="text-xl" />
			</button>
		</form>
		<div class="flex h-10 text-sm items-center justify-center">
			<span>Need an account?</span>
			<a href="/register" class="ml-2 text-nord8 underline">SIGN UP</a>
		</div>
	</div>
</main>

<style>
	.social-btn {
		@apply rounded-full flex font-semibold p-3 transition-all gap-3 duration-200 justify-center items-center;
	}
	.social-btn:hover {
		@apply opacity-90;
		@apply shadow-lg;
	}
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
