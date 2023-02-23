import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, locals }) => {
	let noteId = params.noteId || ''

	async function getNoteById(noteId: string): Promise<Note> {
		let { data, error } = await locals.sb
			.from('note')
			.select()
			.eq('id', noteId)
			.single()

		if (error) {
			console.error(error)
			throw error
		}
		return data
	}

	return {
		note: getNoteById(noteId),
	}
}
