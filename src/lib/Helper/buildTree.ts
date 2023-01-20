export function buildTree(folders: Folder[], notes: Note[]) {
	let folderMap = new Map()
	let rootFolders = []

	for (let folder of folders) {
		folderMap.set(folder.id, { ...folder, subfolders: [], notes: [] })
		if (!folder.parent_folder_id) {
			rootFolders.push(folder.id)
		}
	}

	for (let note of notes) {
		let folder = folderMap.get(note.parent_folder_id)
		if (folder) {
			folder.notes.push(note)
		}
	}

	for (let folder of folders) {
		let parent = folderMap.get(folder.parent_folder_id)
		if (parent) {
			parent.subfolders.push(folderMap.get(folder.id))
		}
	}

	return rootFolders.map((id) => folderMap.get(id))
}
