import { toast } from 'svelte-french-toast'

export function isFolder(value: any): value is Folder {
	return value.type === 'folder'
}

export function isNote(value: any): value is Note {
	return value.type === 'note'
}

export function isWorkspace(value: any): value is Folder {
	return value.type === 'workspace'
}

export async function makeToastPromise(
	promise: Promise<any>,
	{
		loading,
		success,
		error,
	}: { loading: string; success: string; error: string },
	theme: 'red' | 'green' = 'red'
) {
	const primary = theme === 'red' ? '#BF616A' : '#A3BE8C'
	await toast.promise(
		promise,
		{
			loading: loading,
			success: success,
			error: error,
		},
		{
			style: 'border-radius: 200px; background: #D8DEE9; color: #2E3440;',
			position: 'bottom-center',
			iconTheme: {
				primary: primary,
				secondary: '#ECEFF4',
			},
		}
	)
}
