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

export async function deleteNote(
	userId: string,
	noteId: string,
	parentFolderId: string
) {
	const { data, error } = await supabaseClient
		.from('note')
		.delete()
		.eq('id', noteId)
		.eq('owner', userId)
		.eq('parent_folder_id', parentFolderId)
		.single()
	return { data, error }
}

export async function getNote(
	userId: string,
	noteId: string,
	parentFolderId: string
) {
	const { data, error } = await supabaseClient
		.from('note')
		.select()
		.eq('id', noteId)
		.eq('owner', userId)
		.eq('parent_folderId', parentFolderId)
		.single()
	return { data, error }
}

export async function updateNote(
	userId: string,
	noteId: string,
	parentFolderId: string,
	newNote: Note
) {
	const { data, error } = await supabaseClient
		.from('note')
		.update(newNote)
		.eq('id', noteId)
		.eq('owner', userId)
		.eq('parent_folderId', parentFolderId)
		.single()
	return { data, error }
}

export async function getFolderNotes(userId: string, parentFolderId: string) {
	const { data, error } = await supabaseClient
		.from('note')
		.select()
		.eq('owner', userId)
		.eq('parent_folderId', parentFolderId)
		.order('created_at', { ascending: true })

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

export async function deleteFolder(userId: string, folderId: string) {
	await deleteChildNotes(userId, folderId)

	const { data, error } = await supabaseClient
		.from('folder')
		.delete()
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
	return { data, error }
}

async function deleteChildNotes(userId: string, folderId: string) {
	const { data, error } = await supabaseClient
		.from('note')
		.delete()
		.eq('parent_folder_id', folderId)
		.eq('owner', userId)

	return { data, error }
}
