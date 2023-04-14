<script lang="ts">
	import { media } from '$lib/api';
	import type { MovieDetails } from '$lib/types';

	export let movie: MovieDetails;

	$: backdrop =
		movie.images.backdrops.find((image) => !image.iso_639_1) || movie.images.backdrops[0];
</script>

<div class="hero">
	<div class="backdrop">
		<img
			src={media(backdrop.file_path, 1280)}
			style="aspect-ratio: {backdrop.aspect_ratio}"
			alt={movie.title}
		/>
	</div>

	<div class="info">
		<h1>{movie.title}</h1>
		<p>{movie.overview}</p>
	</div>
</div>

<style>
	.hero {
		display: grid;
		background: black;
	}
	@media (min-width: 60em) {
		.hero {
			grid-template-columns: 1fr 80em;
			grid-template-rows: auto;
		}
		.backdrop {
			grid-column: 2/3;
		}
		.backdrop::after {
			width: 15rem;
			height: 100%;
			left: 100px;
			left: 0;
			bottom: 0;
			background: linear-gradient(to right, black, transparent);
		}

		.info {
			position: absolute;
			justify-content: center;
			top: 0;
			left: 0;
			width: 40em;
			height: 100%;
			grid-column: 1/2;
			margin-top: 0;
			filter: drop-shadow(0 0 0.5rem black);
		}
	}
</style>
