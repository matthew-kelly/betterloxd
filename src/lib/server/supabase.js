import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
	auth: {
		autoRefreshToken: true,
		persistSession: false,
		detectSessionInUrl: false
	}
});

// TODO: api cron function to keep supabase alive, keep_live table, insert new row with ping:timestamptz
