export interface Genre {
	id: number;
	name: string;
}

interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

interface SpokenLanguage {
	iso_639_1: string;
	name: string;
	english_name: string;
}

export interface MovieDetails {
	adult: boolean;
	backdrop_path: string;
	budget: number;
	credits: MovieCredits;
	genres: Genre[];
	homepage: string | null;
	id: number;
	images: {
		backdrops: Image[];
		logos: Image[];
		poster: Image[];
	};
	imdb_id: string | null;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: {
		name: string;
	}[];
	production_countries: ProductionCountry[];
	recommendations: {
		page: number;
		results: MovieListResult[];
		total_pages: number;
		total_results: number;
	};
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
	tagline: string;
	title: string;
	video: boolean;
	videos: {
		results: Video[];
	};
	vote_average: number;
	vote_count: number;
	'watch/providers': {
		results: {
			CA: Streaming;
		};
	};
	translations: {
		translations: {
			data: {
				title: string;
			};
		}[];
	};
}

export interface Streaming {
	link: string;
	flatrate: {
		link: string;
		provider_name: string;
		logo_path: string;
		display_priority: number;
	}[];
}

export interface Image {
	aspect_ratio: number;
	file_path: string;
	height: string;
	iso_639_1: string | null;
	vote_average: number;
	vote_count: number;
	width: number;
}

export interface Video {
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	published_at: string;
	id: string;
}

export interface MovieImages {
	id: number;
	backdrops: Image[];
	posters: Image[];
}

export interface MovieListResult {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface MovieList {
	page: number;
	results: MovieListResult[];
	dates: {
		maximum: string;
		minimum: string;
	};
	total_pages: number;
	total_results: number;
}

export interface MovieCredits {
	id: number;
	cast: CastMember[];
	crew: CrewMember[];
}

export interface CastMember extends Member {
	cast_id: number;
	character: string;
	order: number;
}

export interface CrewMember extends Member {
	department: string;
	job: string;
}

export interface Member {
	adult: boolean;
	gender: number | null;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
	credit_id: string;
}
