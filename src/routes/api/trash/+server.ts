import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ locals }) => {
	async function getTrashedNotes(locals: Locals): Promise<Note[]> {
		if (!locals.session) return []
		const { data: notes, error: err } = await locals.sb
			.from('note')
			.select('*')
			.eq('trash', true)
			.order('created_at', { ascending: true })

		if (err) {
			console.error(err)
			throw err
		}

		return notes
	}

	async function getTrashedFolders(locals: Locals): Promise<Folder[]> {
		if (!locals.session) return []
		const { data: folders, error: err } = await locals.sb
			.from('folder')
			.select('*')
			.eq('trash', true)
			.order('created_at', { ascending: true })

		if (err) {
			console.error(err)
			throw err
		}

		return folders
	}

	async function getTrashItems(locals: Locals) {
		const notes = await getTrashedNotes(locals)
		const folders = await getTrashedFolders(locals)
		return [...notes, ...folders]
	}

	return new Response(
		JSON.stringify({ trashItems: await getTrashItems(locals) })
	)
}
