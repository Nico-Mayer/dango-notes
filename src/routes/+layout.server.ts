import { getServerSession } from '@supabase/auth-helpers-sveltekit'
import type { LayoutServerLoad } from './$types'
import { buildTree } from '$lib/Helper/buildTree'

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.session)
		return {
			session: await getServerSession(event),
			folderTree: null,
		}
	let folders = await getAllFolders(event.locals)
	let notes = await getAllNotes(event.locals)

	return {
		session: await getServerSession(event),
		folderTree: buildTree(folders, notes),
		notes: notes,
		folders: folders,
	}
}

async function getAllFolders(locals: Locals): Promise<Folder[]> {
	if (!locals.session) return []
	const { id: owner } = locals?.session?.user
	const { data: folders, error: err } = await locals.sb
		.from('folder')
		.select('*')
		.eq('owner', owner)
		.eq('trash', false)
		.order('created_at', { ascending: true })

	if (err) {
		console.error(err)
		throw err
	}

	return folders
}

async function getAllNotes(locals: Locals): Promise<Note[]> {
	if (!locals.session) return []
	const { id: owner } = locals?.session?.user
	const { data: notes, error: err } = await locals.sb
		.from('note')
		.select('*')
		.eq('owner', owner)
		.eq('trash', false)
		.order('created_at', { ascending: true })

	if (err) {
		console.error(err)
		throw err
	}

	return notes
}
