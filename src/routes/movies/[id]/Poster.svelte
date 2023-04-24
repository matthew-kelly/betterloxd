<script lang="ts">
	import { smoothload } from '$lib/actions';
	import { media } from '$lib/api';
	import type { MovieDetails } from '$lib/types';

	export let movie: MovieDetails;
</script>

<img
	class="border border-slate-400 rounded-sm"
	src={media(movie.poster_path, 500)}
	alt={movie.title}
	use:smoothload
/>
