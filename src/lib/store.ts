import { writable } from 'svelte/store'

export const contextMenuAdd = writable({
	show: false,
	x: 0,
	y: 0,
	parentFolderId: '',
})
