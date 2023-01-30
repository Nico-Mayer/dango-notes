export function isFolder(value: any): value is Folder {
	return value.type === 'folder'
}

export function isNote(value: any): value is Note {
	return value.type === 'note'
}

export function isWorkspace(value: any): value is Folder {
	return value.type === 'workspace'
}
