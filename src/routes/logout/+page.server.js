import { supabase } from '$lib/server/supabase.js';
import { fail, redirect } from '@sveltejs/kit';

export async function load() {
	throw redirect(307, '/login');
}

export const actions = {
	default: async ({ request, cookies }) => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			return fail(error.status ?? 500, {
				message: error.message
			});
		}

		cookies.delete('supabase.auth.token');

		const referer = request.headers.get('referer');

		throw redirect(303, referer ?? '/login');
	}
};
