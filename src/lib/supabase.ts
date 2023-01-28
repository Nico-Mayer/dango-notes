import { createClient } from '@supabase/auth-helpers-sveltekit'
import { PUBLIC_SB_URL, PUBLIC_SB_ANON_KEY } from '$env/static/public'

export const supabaseClient = createClient(PUBLIC_SB_URL, PUBLIC_SB_ANON_KEY)

// Note API
export async function addNote(userId: string, parentFolderId: string) {
	const { data, error } = await supabaseClient
		.from('note')
		.insert({
			name: 'Untitled Note',
			owner: userId,
			parent_folder_id: parentFolderId,
		})
		.select()
		.single()
	return { data, error }
}

export async function deleteNote(userId: string, noteId: string) {
	const { data, error } = await supabaseClient
		.from('note')
		.delete()
		.eq('id', noteId)
		.eq('owner', userId)
		.single()
	return { data, error }
}

export async function getNote(userId: string, noteId: string) {
	const { data, error } = await supabaseClient
		.from('note')
		.select()
		.eq('id', noteId)
		.eq('owner', userId)
		.single()
	return { data, error }
}

export async function updateNote(
	userId: string,
	noteId: string,

	newNote: Note
) {
	const { data, error } = await supabaseClient
		.from('note')
		.update(newNote)
		.eq('id', noteId)
		.eq('owner', userId)
		.single()
	return { data, error }
}

export async function trashNote(userId: string, noteId: string) {
	const { data, error } = await supabaseClient
		.from('note')
		.update({ trash: true, trashedAt: Date.now() })
		.eq('id', noteId)
		.eq('owner', userId)

	if (error) console.error(error)

	return { data, error }
}

// Folder API
export async function addFolder(newFolder: {
	name: string
	owner: string
	parent_folder_id: string | null
}) {
	const { data, error } = await supabaseClient
		.from('folder')
		.insert(newFolder)
		.select()
		.single()
	return { data, error }
}

export async function getFolder(userId: string, folderId: string) {
	const { data, error } = await supabaseClient
		.from('folder')
		.select()
		.eq('id', folderId)
		.eq('owner', userId)
		.single()
	return { data, error }
}

export async function updateFolder(
	userId: string,
	folderId: string,
	newFolder: Folder
) {
	delete newFolder.notes
	delete newFolder.subfolders
	const { data, error } = await supabaseClient
		.from('folder')
		.update(newFolder)
		.eq('id', folderId)
		.eq('owner', userId)
		.select()
		.single()

	if (error) console.log(error)
	return { data, error }
}

export async function deleteFolder(userId: string, folderId: string) {
	const { data, error } = await supabaseClient
		.from('folder')
		.delete()
		.eq('id', folderId)
		.eq('owner', userId)
		.single()
	return { data, error }
}

export async function trashFolder(userId: string, folderId: string) {
	const { data, error } = await supabaseClient
		.from('folder')
		.update({ trash: true, trashedAt: Date.now() })
		.eq('id', folderId)
		.eq('owner', userId)

	return { data, error }
}
