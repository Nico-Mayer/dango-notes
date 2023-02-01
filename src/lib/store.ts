import { writable } from 'svelte/store'

type contextMenuType = {
	show: boolean
	x: number
	y: number
	boxBoundaries?: DOMRect
	item?: Folder | Note
}
const empty: contextMenuType = {
	show: false,
	x: 0,
	y: 0,
}

export const contextMenuAdd = writable(empty)

export const contextMenuEdit = writable(empty)

export const contextRename = writable(empty)

export const sidebarOpen = writable(true)
