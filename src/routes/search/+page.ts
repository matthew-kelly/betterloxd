import * as api from '$lib/api';
import type { MovieList, PeopleList } from '$lib/types.js';

export async function load({ url, fetch }) {
	const query = url.searchParams.get('query');

	if (!query) {
		return {
			query,
			movies: [],
			people: [],
			next_page: null
		};
	}

	let [movies, people] = await Promise.all([
		api.get(fetch, 'search/movie', { query }) as Promise<MovieList>,
		api.get(fetch, 'search/person', { query }) as Promise<PeopleList>
	]);

	movies.results = [...movies.results]
		.filter((movie) => movie.popularity >= 1)
		.sort((a, b) => {
			return b.popularity - a.popularity;
		});
	people.results = [...people.results]
		.filter((person) => person.popularity >= 1)
		.sort((a, b) => {
			return b.popularity - a.popularity;
		});

	return {
		query,
		movies: movies.results,
		people: people.results,
		next_page: null
	};
}
