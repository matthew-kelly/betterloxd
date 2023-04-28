<script lang="ts">
	import { media } from '$lib/api';
	import type {
		CastMemberCredit,
		CrewMemberCredit,
		MovieDetails,
		MovieListResult
	} from '$lib/types';
	import LazyLoad from 'vanilla-lazyload';
	import blob from '$lib/images/blob.svg';
	import { onMount } from 'svelte';
	import { smoothload } from '$lib/actions';

	export let movie: MovieDetails | MovieListResult | CastMemberCredit | CrewMemberCredit;
	export let classes = 'w-full';
	export let border = false;

	onMount(() => {
		const ll = new LazyLoad();
	});
</script>

{#if movie.poster_path}
	<picture>
		<source media="(min-width: 768px)" data-srcset={media(movie.poster_path, 300)} />
		<source media="(min-width: 640px)" data-srcset={media(movie.poster_path, 200)} />
		<source media="(min-width: 413px)" data-srcset={media(movie.poster_path, 300)} />
		<source data-srcset={media(movie.poster_path, 185)} />
		<img
			src={blob}
			class="lazy aspect-[2/3] h-full bg-slate-800 object-cover {border
				? 'border border-slate-400 rounded-md'
				: ''} {classes}"
			alt={movie.title}
			use:smoothload
		/>
	</picture>
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
		<span
			class="absolute bottom-2 text-xs text-slate-400 px-2 text-center max-w-[128px] whitespace-break-spaces"
			>{movie.title}</span
		>
	</div>
{/if}
