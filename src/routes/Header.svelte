<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import logo from '$lib/images/logo.svg';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	let show_menu = false;
	let screen_width: number;

	beforeNavigate(() => {
		show_menu = false;
	});

	function toggle_navbar() {
		show_menu = !show_menu;
	}
</script>

<svelte:window bind:innerWidth={screen_width} />

<div class="flex items-center justify-center w-full absolute top-0 left-0 right-0 z-50">
	<nav class="text-white h-16 w-full flex items-center justify-between column">
		<a href="/" class="flex gap-2 items-center text-2xl md:text-3xl font-extrabold">
			<img class="h-5 md:h-6" src={logo} alt="Betterloxd" />
			Betterloxd
		</a>

		<!-- Mobile menu button -->
		<button
			type="button"
			class="md:hidden text-white hover:text-slate-200 focus:text-slate-200 p-2"
			aria-label="mobile menu button"
			on:click={toggle_navbar}
			on:keydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') toggle_navbar;
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="w-6 h-6 fill-white button-icon"
			>
				{#if show_menu}
					<title>close</title>
					<path
						d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
					/>
				{:else}
					<title>menu</title>
					<path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
				{/if}
			</svg>
		</button>

		{#if show_menu || screen_width > 768}
			<div
				transition:fly={{ duration: 200, easing: cubicOut, y: -50 }}
				class="menu-items {show_menu ? 'flex' : 'hidden'}"
				role="menu"
			>
				<a role="menuitem" class="text-spaced md:hidden" href="/">Home</a>
				<a role="menuitem" class="text-spaced" href="/search">Search</a>
				{#if $page.data.user}
					<a role="menuitem" class="text-spaced" href="/watchlist">Watchlist</a>
					<form method="POST" use:enhance action="/logout" class="flex items-center">
						<button
							role="menuitem"
							type="submit"
							class="text-spaced font-semibold text-base md:text-sm text-shadow-sm shadow-slate-800"
							>Logout</button
						>
					</form>
				{:else}
					<a role="menuitem" class="text-spaced" href="/login">Login</a>
				{/if}
			</div>
		{/if}
	</nav>
</div>

<style lang="postcss">
	a {
		@apply text-inherit no-underline text-shadow-sm shadow-slate-800;
	}

	.menu-items {
		@apply flex-col gap-8 absolute top-16 left-2 right-2 bg-slate-600 h-fit p-8 rounded-md;
	}
	.menu-items > a {
		@apply font-semibold text-base md:text-sm;
	}

	.button-icon {
		filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.6));
	}

	@screen md {
		.menu-items {
			@apply flex flex-row gap-6 items-center bg-inherit w-auto p-0 static;
		}
	}
</style>
