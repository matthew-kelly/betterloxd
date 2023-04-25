<script lang="ts">
	import type { MovieListResult } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import Poster from './Poster.svelte';

	export let movies: MovieListResult[];
	export let next: string | null;
	export let loading = false;

	const dispatch = createEventDispatcher();

	let next_button: HTMLAnchorElement;

	function handle_scroll() {
		if (!next_button) return;
		const { top } = next_button.getBoundingClientRect();
		const { innerHeight } = window;
		if (top < innerHeight) {
			dispatch('end');
		}
	}
</script>

<svelte:window on:scroll={handle_scroll} />

<div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
	{#each movies as movie}
		<a href="/movies/{movie.id}">
			<Poster {movie} />
		</a>
	{/each}
</div>

{#if next}
	<a
		class="ml-auto mt-4 flex items-center justify-center px-4 py-2 text-spaced text-tiny md:text-xs rounded-md bg-slate-700 text-slate-200 transition duration-200"
		href={next}
		bind:this={next_button}
		transition:fade
	>
		{#if loading}
			<svg
				class="animate-spin -ml-1 mr-3 h-4 w-4"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
			Loading...
		{:else}
			Next page
		{/if}
	</a>
{/if}
