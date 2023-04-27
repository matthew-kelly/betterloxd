import { supabase } from '$lib/server/supabase.js';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string()
});

export function load({ request, url, locals }) {
	if (locals.user) {
		throw redirect(307, '/');
	}

	const referer = request.headers.get('referer');
	const redirect_to = referer?.startsWith(url.origin) ? encodeURIComponent(referer) : null;

	return {
		redirect_to,
		title: 'Login'
	};
}

// TODO: change site URL in supabase to live site, add redirect URL if necessary

export const actions = {
	register: async ({ request, cookies, url }) => {
		const form = await request.formData();
		const input = schema.safeParse({
			email: form.get('email'),
			password: form.get('password')
		});
		const input_errors = input.success ? {} : input.error.flatten();

		if (!input.success) {
			return fail(400, { email: form.get('email'), error: input_errors?.fieldErrors });
		}

		const { email, password } = input.data;

		// try to login first with email/password
		const { data: login_data, error: login_error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (!login_error) {
			if (login_data.session) {
				cookies.set('supabase.auth.token', login_data.session.access_token);
			}
			throw redirect(303, url.searchParams.get('redirect_to') ?? '/');
		}

		// if login fails, register
		const { data, error } = await supabase.auth.signUp({ email, password });

		if (error) {
			return fail(error.status ?? 500, {
				message: error.message
			});
		}

		if (data.session) {
			cookies.set('supabase.auth.token', data.session.access_token);
		}

		throw redirect(303, url.searchParams.get('redirect_to') ?? '/');
	},

	async login({ request, cookies, url }) {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');

		const input = schema.safeParse({
			email,
			password
		});

		const input_errors = input.success ? {} : input.error.flatten();

		if (!input.success) {
			return fail(400, { email: form.get('email'), error: input_errors?.fieldErrors });
		}

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			return fail(error.status ?? 500, {
				email,
				message: error.message
			});
		}

		if (data.session) {
			cookies.set('supabase.auth.token', data.session.access_token);
		}

		throw redirect(303, url.searchParams.get('redirect_to') ?? '/');
	}
};
