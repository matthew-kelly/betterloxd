<script>
	import { page } from '$app/stores';
	import '../styles.css';
	import logo from '$lib/images/logo.svg';
	import tmdb from '$lib/images/tmdb_long.svg';
	import mainbg from '$lib/images/main-bg.png';

	$: console.log('$page', $page);
</script>

<div class="header">
	<nav>
		<a href="/" class="logo">
			<img src={logo} alt="Betterloxd" />
			Betterloxd
		</a>

		<div class="links">
			<a href="/search">Search</a>
			<a href="/watchlist">Watchlist</a>
			<a href="/login">Login</a>
		</div>
	</nav>
</div>

<main
	class:infinite={$page.data.infinite}
	class:is-home={$page.url.pathname === '/'}
	class:is-movie={$page.data.movie?.title}
	style="background-image: url({mainbg})"
>
	<slot />
</main>

<footer>
	<p>
		Data provided by <a href="https://www.themoviedb.org/"><img src={tmdb} alt="the movie db" /></a>
	</p>
</footer>

<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}

	nav {
		display: flex;
		width: 100%;
		height: 4rem;
		align-items: center;
		justify-content: space-between;
		max-width: var(--column);
		padding: 0 var(--side);
		/* color: var(--accent); */
	}

	.logo {
		font-weight: 800;
		font-size: 2em;
		color: white;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.logo img {
		height: 30px;
	}

	a {
		color: inherit;
		text-decoration: none;
		font-weight: 600;
		color: #ccc;
	}

	img {
		height: 1rem;
	}

	.links {
		display: flex;
		gap: 1rem;
	}

	main {
		background: #14181c 0 -1px repeat-x;
		margin-top: 4rem;
		padding-bottom: 4rem;
		/* padding: 30px 0; */
	}

	main.infinite {
		height: 0;
		flex: 1;
		overflow: hidden;
	}

	main.is-home {
		/* margin-top: 4rem; */
	}

	main.is-movie {
		background-image: none !important;
		margin-top: 0;
		padding-top: 0;
	}

	footer {
		display: flex;
		justify-content: center;
		height: 5rem;
	}
</style>
