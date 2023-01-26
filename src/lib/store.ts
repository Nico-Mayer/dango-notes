import { writable } from 'svelte/store'

export const contextMenuAdd = writable({
	show: false,
	x: 0,
	y: 0,
	parentFolderId: '',
})

export const contextMenuEdit = writable({
	show: false,
	itemId: '',
	type: '',
	x: 0,
	y: 0,
	parentFolderId: '',
})

export const sidebarOpen = writable(true)
