import '$lib/supabase.ts'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { redirect } from '@sveltejs/kit'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const { session, supabaseClient } = await getSupabase(event)

	event.locals.sb = supabaseClient
	event.locals.session = session

	if (
		!session &&
		event.url.pathname !== '/login' &&
		event.url.pathname !== '/register'
	) {
		console.log('redirecting to /login')
		throw redirect(303, '/login')
	}

	if (
		session &&
		(event.url.pathname === '/login' || event.url.pathname === '/register')
	) {
		throw redirect(303, '/')
	}

	return resolve(event)
}
