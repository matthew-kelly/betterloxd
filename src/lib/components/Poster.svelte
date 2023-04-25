<script lang="ts">
	import { smoothload } from '$lib/actions';
	import { media } from '$lib/api';
	import type { MovieDetails, MovieListResult } from '$lib/types';

	export let movie: MovieDetails | MovieListResult;
	export let classes = '';
	export let border = false;
</script>

{#if movie.poster_path}
	<img
		class="w-full aspect-[2/3] h-auto bg-slate-800 {border
			? 'border border-slate-400 rounded-md'
			: ''} {classes}"
		alt={movie.title}
		src={media(movie.poster_path, 500)}
		use:smoothload
	/>
{:else}
	<div
		class="w-full h-auto aspect-[2/3] bg-slate-800 flex flex-col items-center justify-center {classes} {border
			? 'border border-slate-400 rounded-md'
			: ''}"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			class="h-8 fill-slate-400"
			role="img"
		>
			<title>{movie.title}</title>
			<path
				d="M22 20.7L3.3 2L2 3.3L3 4.3V19C3 20.1 3.9 21 5 21H19.7L20.7 22L22 20.7M5 19V6.3L12.6 13.9L11.1 15.8L9 13.1L6 17H15.7L17.7 19H5M8.8 5L6.8 3H19C20.1 3 21 3.9 21 5V17.2L19 15.2V5H8.8"
			/>
		</svg>
		<span class="absolute bottom-2 text-xs text-slate-400 px-2 text-center">{movie.title}</span>
	</div>
{/if}
