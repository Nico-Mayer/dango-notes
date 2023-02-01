import { AuthApiError, type Provider } from '@supabase/supabase-js'
import { fail, redirect, type Actions } from '@sveltejs/kit'

const OAUTH_PROVIDERS = ['github', 'google', 'discord']

export const actions: Actions = {
	login: async ({ request, locals, url }) => {
		const provider = url.searchParams.get('provider')

		if (provider) {
			if (!OAUTH_PROVIDERS.includes(provider)) {
				return fail(400, { message: 'Invalid provider.' })
			}

			const { data, error: err } = await locals.sb.auth.signInWithOAuth({
				provider: provider as Provider,
			})

			if (err) {
				console.log(err)
				return fail(400, { message: 'Something went wrong.' })
			}

			throw redirect(303, data.url)
		}

		const body = Object.fromEntries(await request.formData())
		const { error: err } = await locals.sb.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string,
		})

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Invalid credentials',
				})
			}
			return fail(500, {
				error: 'Server error. Please try again later.',
			})
		}

		throw redirect(303, '/')
	},
}
