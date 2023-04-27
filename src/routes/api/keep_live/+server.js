import { supabase } from '$lib/server/supabase';
import { json } from '@sveltejs/kit';

export async function POST() {
	const ping = new Date().toISOString();
	const data = await supabase.from('keep_live').insert({ ping });

	return json(data);
}
