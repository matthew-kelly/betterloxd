<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { MovieListResult } from '$lib/types';
	import type { View } from '$lib/views';
	import Poster from './Poster.svelte';

	export let movies: MovieListResult[];
	export let view: View | null = null;
	export let href: string | null;

	let c: HTMLDivElement;

	afterNavigate(() => {
		c.scrollTo(0, 0);
	});
</script>

<div>
	{#if view}
		<div class="column flex justify-between w-full items-end mb-4">
			<h2 class="font-bold text-xl md:text-2xl">
				{view.title}
			</h2>
			{#if href}
				<a class="text-spaced text-xs px-2 py-1" {href}>see all</a>
			{/if}
		</div>
	{/if}

	<div class="relative">
		<div class="carousel px-0" bind:this={c}>
			{#each movies as movie}
				{#key movie.id}
					<a href="/movies/{movie.id}" class="h-full">
						<Poster {movie} border={true} classes="max-w-[inherit] aspect-[2/3] h-full" />
					</a>
				{/key}
			{/each}
		</div>
		<div class="overlay" />
	</div>
</div>

<style lang="postcss">
	.carousel {
		@apply flex gap-2 md:gap-4 whitespace-nowrap overscroll-x-contain overflow-x-auto overflow-y-hidden;

		--padding: max(var(--side), calc(var(--side) + (100vw - 64rem) / 2));

		height: clamp(12rem, 25vw, 20rem);
		overscroll-behavior-x: contain;
		scroll-snap-type: x mandatory;
		scroll-padding-left: var(--padding);
		padding: 0 var(--padding);
		scrollbar-width: none;
	}
	.carousel::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
	}

	.overlay {
		@apply h-full w-full absolute inset-0 bg-no-repeat block z-0 pointer-events-none;
		content: '';
		background: linear-gradient(90deg, #14181c 0%, transparent 20%, transparent 70%, #14181c 100%);
	}

	@media (max-width: 90rem) {
		.overlay {
			background: linear-gradient(
				90deg,
				#14181c 0%,
				transparent 10%,
				transparent 80%,
				#14181c 100%
			);
		}
	}

	@media (max-width: 70rem) {
		.overlay {
			display: none;
		}
	}
</style>
