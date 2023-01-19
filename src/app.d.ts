// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit'
import type { Session } from '@supabase/supabase-js'

// and what to do when importing types
declare global {
	type Note = {
		id?: string
		name: string
		content: string
		type: string
		shared_with?: string[]
		created_at?: string
		updated_at?: string
		owner: string
		parent_id: string
	}
	type Folder = {
		id?: string
		name: string
		type: string
		open: boolean
		shared_with?: string[]
		created_at?: string
		updated_at?: string
		owner: string
		parent_id: string
		children?: JSON
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
		// interface Platform {}
	}
}
