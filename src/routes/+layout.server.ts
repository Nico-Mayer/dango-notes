import { getServerSession } from '@supabase/auth-helpers-sveltekit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
	return {
		session: await getServerSession(event),
		rootFolders: await loadRootFolders(event.locals),
	}
}

async function loadRootFolders(locals: Locals) {
	if (!locals.session) return
	const { id: owner } = locals?.session?.user
	const { data: folders, error: err } = await locals.sb
		.from('root_folder')
		.select('*')
		.eq('owner', owner)
		.order('created_at', { ascending: true })

	if (err) {
		return console.error(err)
	}

	return folders
}
