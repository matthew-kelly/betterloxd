import * as api from '$lib/api';
import type { MovieDetails } from '$lib/types.js';

export async function load({ data, params, fetch }) {
	const movie = (await api.get(fetch, `/movie/${params.id}`, {
		append_to_response: 'images,videos,recommendations,watch/providers,credits,translations'
	})) as MovieDetails;

	const trailer = movie.videos.results.find((video) => {
		return (
			video.official &&
			video.site === 'YouTube' &&
			(video.type === 'Trailer' || video.type === 'Teaser')
		);
	});

	const directors = movie.credits.crew
		.filter((person) => person.job === 'Director')
		.map((person) => [person.name, person.id]);

	const cast = movie.credits.cast;

	const crew = movie.credits.crew;
	// sort crew grouped by job
	const crew_by_job = new Map();
	// set priority jobs up first
	crew_by_job.set('Director', []);
	crew_by_job.set('Producer', []);
	crew_by_job.set('Executive Producer', []);
	crew_by_job.set('Writer', []);
	crew_by_job.set('Cinematographer', []);
	crew_by_job.set('Editor', []);
	crew_by_job.set('Composer', []);
	crew_by_job.set('Sound', []);
	crew.forEach((c) => {
		if (!crew_by_job.has(c.job)) {
			crew_by_job.set(c.job, []);
		}
		crew_by_job.get(c.job).push(c);
	});

	const streaming = movie['watch/providers'].results.CA;

	const alternative_titles = movie?.translations?.translations
		.filter((lang) => lang.data.title)
		.map((lang) => lang.data.title)
		.join(', ');

	return {
		movie,
		directors,
		cast,
		crew: crew_by_job,
		streaming,
		alternative_titles,
		trailer,
		in_watchlist: data.in_watchlist,
		title: movie.title
	};
}
