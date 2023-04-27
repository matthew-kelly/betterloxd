<script lang="ts">
	import Hero from './Hero.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import { views } from '$lib/views';

	export let data;
</script>

<div class="column pt-4 mb-8">
	{#if data.user?.email}
		<span class="text-spaced text-center font-semibold text-xs md:text-sm block mb-4 text-lime-400"
			>Welcome {data.user.email}!</span
		>
	{/if}
	<h1 class="font-bold text-2xl md:text-3xl mb-4">Today's top movie</h1>
	<Hero movie={data.featured} />
</div>

<div class="flex flex-col gap-8 mb-4">
	<Carousel view={views.trending} href="/movies/trending" movies={data.trending.results} />
	<Carousel view={views.now_playing} href="/movies/now_playing" movies={data.now_playing.results} />
	<Carousel view={views.upcoming} href="movies/upcoming" movies={data.upcoming.results} />
</div>
