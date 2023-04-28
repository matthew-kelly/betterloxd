<script lang="ts">
	import { smoothload } from '$lib/actions';
	import { media } from '$lib/api';
	import type { MovieDetails } from '$lib/types';

	export let movie: MovieDetails;
	$: images = movie.images;
	$: backdrop = images.backdrops.find((image) => !image.iso_639_1) || images.backdrops[0];
	$: logo = images.logos.find((image) => image.iso_639_1 === 'en');
</script>

<a class="flex" href="/movies/{movie.id}">
	<picture>
		<source media="(min-width: 780px)" srcset={media(backdrop.file_path, 1280)} />
		<source media="(min-width: 300px)" srcset={media(backdrop.file_path, 780)} />
		<source srcset={media(backdrop.file_path, 300)} />
		<img
			class="w-full object-cover rounded-lg border border-slate-400"
			src={media(backdrop.file_path, 1280)}
			alt={movie.title}
			style="aspect-ratio: {backdrop.aspect_ratio}"
			use:smoothload
		/>
	</picture>

	{#if logo}
		<img
			class="logo"
			src={media(logo.file_path, 300)}
			alt={movie.title}
			style="aspect-ratio: {logo.aspect_ratio}"
			use:smoothload
		/>
	{/if}
</a>

<style lang="postcss">
	.logo {
		@apply absolute left-8 top-0 h-full w-[30%] object-contain;
		filter: drop-shadow(0 0 1rem black);
	}
</style>
