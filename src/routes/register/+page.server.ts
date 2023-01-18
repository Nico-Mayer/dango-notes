import { AuthApiError } from '@supabase/supabase-js'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { z } from 'zod'

const registerSchema = z
	.object({
		email: z
			.string({ required_error: 'Email is required' })
			.min(1, { message: 'Email is required' })
			.max(64, { message: 'Email must be less than 64 characters' })
			.email({ message: 'Email must be a valid email address' }),
		password: z
			.string({ required_error: 'Password is Required' })
			.min(6, { message: 'Password must be at least 6 characters' })
			.max(32, { message: 'Password must be less than 32 characters' })
			.trim(),
		passwordConfirm: z
			.string({ required_error: 'Password is Required' })
			.min(6, { message: 'Password must be at least 6 characters' })
			.max(32, { message: 'Password must be less than 32 characters' })
			.trim(),
	})
	.superRefine(({ password, passwordConfirm }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['password'],
			})
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['passwordConfirm'],
			})
		}
	})

async function register(email: string, pw: string, locals: App.Locals) {
	try {
		const { data, error: errSb } = await locals.sb.auth.signUp({
			email: email,
			password: pw,
		})

		if (errSb) {
			if (errSb instanceof AuthApiError && errSb.status === 400) {
				return fail(400, {
					error: 'Invalid email or password',
				})
			}
			return fail(500, {
				error: 'Server error. Please try again later.',
			})
		}
	} catch (errSb) {
		console.error(errSb)
	}
}

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData())

		try {
			const result = registerSchema.parse(formData)
			await register(result.email, result.password, locals)
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten()
			const { password, passwordConfirm, ...rest } = formData

			return {
				data: rest,
				errors,
			}
		}
		throw redirect(303, '/login')
	},
}
