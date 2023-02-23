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
			last_edited: Date.now(),
			parent_folder_id: parentFolderId,
		})
		.select()
		.single()
	return { data, error }
}

export async function deleteNote(noteId: string) {
	const { data, error } = await supabaseClient
		.from('note')
		.delete()
		.eq('id', noteId)
		.single()
	return { data, error }
}

export async function getNote(noteId: string) {
	const { data, error } = await supabaseClient
		.from('note')
		.select('*')
		.eq('id', noteId)
		.single()
	return { data, error }
}

export async function updateNote(noteId: string, newNote: Note) {
	const { data, error } = await supabaseClient
		.from('note')
		.update({ ...newNote, last_edited: Date.now() })
		.eq('id', noteId)
		.single()
	return { data, error }
}

export async function trashNote(noteId: string) {
	const { data, error } = await supabaseClient
		.from('note')
		.update({ trash: true, trashedAt: Date.now() })
		.eq('id', noteId)
	return { data, error }
}

export async function recoverNote(noteId: string) {
	const { data, error } = await supabaseClient
		.from('note')
		.update({ trash: false, trashedAt: null })
		.eq('id', noteId)
	return { data, error }
}

// Folder API
export async function addFolder(newFolder: {
	name: string
	owner: string
	type?: string
	parent_folder_id: string | null
}) {
	const { data, error } = await supabaseClient
		.from('folder')
		.insert(newFolder)
		.select()
		.single()
	return { data, error }
}

export async function getFolder(folderId: string) {
	const { data, error } = await supabaseClient
		.from('folder')
		.select()
		.eq('id', folderId)
		.single()
	return { data, error }
}

export async function updateFolder(folderId: string, newFolder: Folder) {
	delete newFolder.notes
	delete newFolder.subfolders
	const { data, error } = await supabaseClient
		.from('folder')
		.update(newFolder)
		.eq('id', folderId)
		.select()
		.single()
	return { data, error }
}

export async function deleteFolder(folderId: string) {
	const { data, error } = await supabaseClient
		.from('folder')
		.delete()
		.eq('id', folderId)
		.single()
	return { data, error }
}

export async function trashFolder(folderId: string) {
	const { data, error } = await supabaseClient
		.from('folder')
		.update({ trash: true, trashedAt: Date.now() })
		.eq('id', folderId)
	return { data, error }
}

export async function recoverFolder(folderId: string) {
	const { data, error } = await supabaseClient
		.from('folder')
		.update({ trash: false, trashedAt: null })
		.eq('id', folderId)
	return { data, error }
}
