<script>
	import '../styles.css';
	import { page } from '$app/stores';
	import tmdb from '$lib/images/tmdb_long.svg';
	import mainbg from '$lib/images/main-bg.png';
	import favicon from '$lib/images/favicon.svg';
	import Header from './Header.svelte';
	import * as api from '$lib/api';
</script>

<svelte:head>
	<title>{$page.data.title ? `${$page.data.title} | Betterloxd` : 'Betterloxd'}</title>
	<link rel="preconnect" href={api.base} />
	<meta name="description" content="The internet's other favourite movie site" />
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />

<main class="grow" class:is-movie={$page.data.movie?.title} style="background-image: url({mainbg})">
	<slot />
</main>

<footer class="flex justify-center h-20 p-4 bg-slate-800">
	<span class="flex flex-nowrap items-center text-spaced text-xs md:text-sm font-bold">
		Data provided by <a href="https://www.themoviedb.org/">
			<img class="ml-2 h-[9px] md:h-3" src={tmdb} alt="the movie db" />
		</a>
	</span>
</footer>

<style lang="postcss">
	main {
		@apply mt-16 pb-4 md:pb-16;
		background: #14181c 0 -1px repeat-x;
	}

	main.is-movie {
		@apply mt-0 pt-0;
		background-image: none !important;
	}
</style>
