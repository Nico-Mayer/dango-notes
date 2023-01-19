import { getServerSession } from '@supabase/auth-helpers-sveltekit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
	return {
		session: await getServerSession(event),
		rootFolders: await newLoadFolders(event.locals),
		folders: await loadFolders(event.locals),
	}
}

async function loadFolders(locals: Locals) {
	if (!locals.session) return
	const { id: owner } = locals?.session?.user
	const { data: folders, error: err } = await locals.sb
		.from('folder')
		.select('*, childNotes:note(*),childFolders:folder(*)')
		.eq('owner', owner)
		.is('parent_folderId', null)
		.order('created_at', { ascending: true })

	if (err) {
		return console.error(err)
	}

	return folders
}

async function newLoadFolders(locals: Locals) {
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
