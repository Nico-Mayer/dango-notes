import { getServerSession } from '@supabase/auth-helpers-sveltekit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
	return {
		session: await getServerSession(event),
		folders: await loadFolders(event.locals),
	}
}

async function loadFolders(locals: any) {
	if (!locals.session) return
	const { id: owner } = locals?.session?.user
	const { data: folders, error: err } = await locals.sb
		.from('folder')
		.select('*, notes:note(*)')
		.eq('owner', owner)
		.order('created_at', { ascending: true })

	if (err) {
		return console.error(err)
	}

	return folders
}
