<script lang="ts">
	import { smoothload } from '$lib/actions';
	import { media } from '$lib/api';
	import type { MovieDetails } from '$lib/types';

	export let movie: MovieDetails;

	$: backdrop =
		movie.images.backdrops.find((image) => !image.iso_639_1) || movie.images.backdrops[0];
</script>

{#if backdrop}
	<div class="grid">
		<div class="backdrop">
			<picture>
				<source media="(min-width: 780px)" srcset={media(backdrop.file_path, 1280)} />
				<source media="(min-width: 300px)" srcset={media(backdrop.file_path, 780)} />
				<source srcset={media(backdrop.file_path, 300)} />
				<img
					class="w-full object-cover"
					src={media(backdrop.file_path, 1280)}
					alt={movie.title}
					style="aspect-ratio: {backdrop.aspect_ratio}"
					use:smoothload
				/>
			</picture>

			<div class="blur-overlay" />
		</div>
	</div>
{/if}

<style lang="postcss">
	.backdrop {
		@apply mx-auto my-0 w-full;
		max-width: calc(var(--column) + 10rem);
	}

	.backdrop > * {
		@apply pointer-events-none select-none;
	}

	.blur-overlay {
		@apply w-full h-[120%] absolute inset-0 bg-no-repeat block z-0;
		content: '';
		background-image: linear-gradient(
			0deg,
			#14181d 0,
			#14181d 21.48148148%,
			rgba(20, 24, 29, 0.986) 23.63703704%,
			rgba(20, 24, 29, 0.945) 26.1%,
			rgba(20, 24, 29, 0.883) 28.80740741%,
			rgba(20, 24, 29, 0.803) 31.70740741%,
			rgba(20, 24, 29, 0.711) 34.74074074%,
			rgba(20, 24, 29, 0.61) 37.84814815%,
			rgba(20, 24, 29, 0.504) 40.97407407%,
			rgba(20, 24, 29, 0.398) 44.05925926%,
			rgba(20, 24, 29, 0.296) 47.04814815%,
			rgba(20, 24, 29, 0.203) 49.88148148%,
			rgba(20, 24, 29, 0.122) 52.5%,
			rgba(20, 24, 29, 0.059) 54.85185185%,
			rgba(20, 24, 29, 0.016) 56.87777778%,
			rgba(20, 24, 29, 0) 58.51851852%
		);
	}

	@screen md {
		.blur-overlay {
			background-image: linear-gradient(
					90deg,
					#14181d 0,
					rgba(20, 24, 29, 0.986) 0.97%,
					rgba(20, 24, 29, 0.945) 2.07833333%,
					rgba(20, 24, 29, 0.883) 3.29666667%,
					rgba(20, 24, 29, 0.803) 4.60166667%,
					rgba(20, 24, 29, 0.711) 5.96666667%,
					rgba(20, 24, 29, 0.61) 7.365%,
					rgba(20, 24, 29, 0.504) 8.77166667%,
					rgba(20, 24, 29, 0.398) 10.16%,
					rgba(20, 24, 29, 0.296) 11.505%,
					rgba(20, 24, 29, 0.203) 12.78%,
					rgba(20, 24, 29, 0.122) 13.95833333%,
					rgba(20, 24, 29, 0.059) 15.01666667%,
					rgba(20, 24, 29, 0.016) 15.92833333%,
					rgba(20, 24, 29, 0) 16.66666667%,
					rgba(20, 24, 29, 0) 83.33333333%,
					rgba(20, 24, 29, 0.016) 84.07166667%,
					rgba(20, 24, 29, 0.059) 84.98333333%,
					rgba(20, 24, 29, 0.122) 86.04166667%,
					rgba(20, 24, 29, 0.203) 87.22%,
					rgba(20, 24, 29, 0.296) 88.495%,
					rgba(20, 24, 29, 0.398) 89.84%,
					rgba(20, 24, 29, 0.504) 91.22833333%,
					rgba(20, 24, 29, 0.61) 92.635%,
					rgba(20, 24, 29, 0.711) 94.03333333%,
					rgba(20, 24, 29, 0.803) 95.39833333%,
					rgba(20, 24, 29, 0.883) 96.70333333%,
					rgba(20, 24, 29, 0.945) 97.92166667%,
					rgba(20, 24, 29, 0.986) 99.03%,
					#14181d
				),
				linear-gradient(
					0deg,
					#14181d 0,
					#14181d 21.48148148%,
					rgba(20, 24, 29, 0.986) 23.63703704%,
					rgba(20, 24, 29, 0.945) 26.1%,
					rgba(20, 24, 29, 0.883) 28.80740741%,
					rgba(20, 24, 29, 0.803) 31.70740741%,
					rgba(20, 24, 29, 0.711) 34.74074074%,
					rgba(20, 24, 29, 0.61) 37.84814815%,
					rgba(20, 24, 29, 0.504) 40.97407407%,
					rgba(20, 24, 29, 0.398) 44.05925926%,
					rgba(20, 24, 29, 0.296) 47.04814815%,
					rgba(20, 24, 29, 0.203) 49.88148148%,
					rgba(20, 24, 29, 0.122) 52.5%,
					rgba(20, 24, 29, 0.059) 54.85185185%,
					rgba(20, 24, 29, 0.016) 56.87777778%,
					rgba(20, 24, 29, 0) 58.51851852%
				);
		}
	}
</style>
