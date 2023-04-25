import * as api from '$lib/api';
import type { MovieDetails, MovieList } from '$lib/types.js';

export async function load({ fetch }) {
	let [trending, now_playing, upcoming] = await Promise.all([
		api.get(fetch, 'trending/movie/day', { page: '1', region: 'CA' }) as Promise<MovieList>,
		api.get(fetch, 'movie/now_playing', { page: '1', region: 'CA' }) as Promise<MovieList>,
		api.get(fetch, 'movie/upcoming', { page: '1', region: 'CA' }) as Promise<MovieList>
	]);

	trending.results = [...trending.results].filter(
		(item) => item.popularity >= 50 || item.vote_count > 1000
	);
	now_playing.results = [...now_playing.results].filter(
		(item) => item.popularity >= 50 || item.vote_count > 1000
	);
	upcoming.results = [...upcoming.results].filter((item) => item.poster_path);

	const featured = (await api.get(fetch, `movie/${trending.results[0].id}`, {
		append_to_response: 'images,videos,recommendations'
	})) as MovieDetails;

	return {
		trending,
		now_playing,
		upcoming,
		featured
	};
}
