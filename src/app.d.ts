// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit'
import type { Session } from '@supabase/supabase-js'

// and what to do when importing types
declare global {
	type Note = {
		id: string
		created_at: string
		parent_folder_id: string
		owner: string
		name: string
		content: string
		icon: string | null
		last_edited: number | null
		shared_with: string | null
		type: string
		trash: boolean
		trashedAt: number | null
	}
	type Folder = {
		id: string
		created_at: string
		owner: string
		name: string
		icon: string | null
		shared_with: string | null
		desc: string
		parent_folder_id: string | null
		type: string
		open: boolean
		trash: boolean
		trashedAt: number | null
		notes?: Note[]
		subfolders?: Folder[]
	}

	type Locals = {
		sb: TypedSupabaseClient
		session: Session | null
	}

	declare namespace App {
		// interface Error {}
		interface Locals {
			sb: TypedSupabaseClient
			session: Session | null
		}
		interface PageData {
			session: import('@supabase/supabase-js').Session | null
		}
		interface LayoutData {
			session: import('@supabase/supabase-js').Session | null
			rootFolders: Folder[]
		}
		// interface Platform {}
	}
}
