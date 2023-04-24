<script>
	import '../styles.css';
	import { page } from '$app/stores';
	import tmdb from '$lib/images/tmdb_long.svg';
	import mainbg from '$lib/images/main-bg.png';
	import { browser } from '$app/environment';
	import Header from './Header.svelte';

	$: if (browser) {
		console.log('$page', $page);
	}
</script>

<Header />

<main
	class:infinite={$page.data.infinite}
	class:is-movie={$page.data.movie?.title}
	style="background-image: url({mainbg})"
>
	<slot />
</main>

<footer class="flex justify-center h-20 p-4">
	<span class="flex flex-nowrap items-center text-spaced text-tiny md:text-sm font-bold">
		Data provided by <a
			href="https://www.themoviedb.org/"
			class="text-inherit no-underline font-semibold text-shadow-sm shadow-slate-800"
		>
			<img class="ml-2 h-2 md:h-3" src={tmdb} alt="the movie db" />
		</a>
	</span>
</footer>

<style lang="postcss">
	main {
		@apply mt-16 pb-16;
		background: #14181c 0 -1px repeat-x;
	}

	main.infinite {
		@apply h-0 flex-1 overflow-hidden;
	}

	main.is-movie {
		@apply mt-0 pt-0;
		background-image: none !important;
	}
</style>
