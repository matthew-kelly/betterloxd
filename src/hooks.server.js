import { supabase } from '$lib/server/supabase';

export async function handle({ event, resolve }) {
	const { data } = await supabase.auth.getUser(event.cookies.get('supabase.auth.token'));

	if (!data.user) {
		event.locals.user = null;
	} else {
		event.locals.user = data.user;
	}
	event.cookies.delete('supabase.auth.token');

	return await resolve(event);
}
