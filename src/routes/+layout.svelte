<script>
	import { page } from '$app/stores';
	import '../styles.css';
	import logo from '$lib/images/logo.svg';
	import tmdb from '$lib/images/tmdb_long.svg';
	import mainbg from '$lib/images/main-bg.png';

	$: console.log('$page', $page);
</script>

<div class="flex items-center justify-center w-full absolute top-0 left-0 right-0 z-50">
	<nav class="text-white h-16 w-full flex items-center justify-between column">
		<a href="/" class="flex gap-2 items-center text-3xl font-black">
			<img class="h-8" src={logo} alt="Betterloxd" />
			Betterloxd
		</a>

		<div class="flex gap-4">
			<a href="/search">Search</a>
			<a href="/watchlist">Watchlist</a>
			<a href="/login">Login</a>
		</div>
	</nav>
</div>

<main
	class:infinite={$page.data.infinite}
	class:is-movie={$page.data.movie?.title}
	style="background-image: url({mainbg})"
>
	<slot />
</main>

<footer class="flex justify-center h-20 p-4">
	<span class="flex flex-nowrap items-center text-spaced text-sm font-bold">
		Data provided by <a href="https://www.themoviedb.org/"
			><img class="ml-2 h-3" src={tmdb} alt="the movie db" /></a
		>
	</span>
</footer>

<style lang="postcss">
	a {
		@apply text-inherit no-underline font-semibold;
	}

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
