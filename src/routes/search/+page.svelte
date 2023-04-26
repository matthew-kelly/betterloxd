<script lang="ts">
	import ResultsPage from '$lib/components/ResultsPage.svelte';
	import { cubicOut } from 'svelte/easing';
	import PeopleResults from './PeopleResults.svelte';
	import { fade } from 'svelte/transition';
	export let data;

	let query = '';
	let h_movies: HTMLHeadingElement;
	let h_people: HTMLHeadingElement;
</script>

<div class="column h-full">
	<div class="flex items-center my-4 gap-4">
		<h1 class="font-bold text-2xl md:text-3xl">Search</h1>

		<div class="grow">
			<form class="w-full">
				<input
					name="query"
					bind:value={query}
					autocomplete="off"
					spellcheck="false"
					placeholder="Search for a movie or person"
					class="bg-slate-700 text-sm text-slate-200 rounded-md block w-full p-2.5"
				/>
			</form>
			{#if query}
				<button
					transition:fade={{ duration: 100, easing: cubicOut }}
					on:click={() => (query = '')}
					class="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="w-6 h-6 fill-white"
					>
						<title>clear</title>
						<path
							d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
						/>
					</svg>
				</button>
			{/if}
		</div>
	</div>

	{#if data.query}
		{#key data.query}
			<div class="flex flex-col gap-8">
				<div class="mt-2">
					<span
						class="text-xs text-spaced {data.movies.length && data.people.length
							? 'inline'
							: 'hidden'}"
						>Jump to:
					</span>
					{#if data.movies.length}
						<button
							on:click={() => h_movies.scrollIntoView({ behavior: 'smooth' })}
							class="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold text-spaced text-xs rounded-md mr-1"
						>
							Movies <span class="text-slate-200 bg-slate-500 p-1 rounded-md font-bold">
								{data.movies.length}
							</span>
						</button>
					{/if}
					{#if data.people.length}
						<button
							on:click={() => h_people.scrollIntoView({ behavior: 'smooth' })}
							class="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold text-spaced text-xs rounded-md"
						>
							People <span class="text-slate-200 bg-slate-500 p-1 rounded-md font-bold">
								{data.people.length}
							</span>
						</button>
					{/if}

					{#if !data.movies.length && !data.people.length}
						<p>No results</p>
					{/if}
				</div>

				{#if data.movies.length}
					<div>
						<h2 bind:this={h_movies} class="font-bold text-xl md:text-2xl mb-4">Movies</h2>
						<ResultsPage movies={data.movies} next={null} />
					</div>
				{/if}

				{#if data.people.length}
					<div>
						<h2 bind:this={h_people} class="font-bold text-xl md:text-2xl mb-4">People</h2>
						<PeopleResults people={data.people} />
					</div>
				{/if}

				<button
					on:click={() => scrollTo(0, 0)}
					class="{data.movies.length && data.people.length
						? 'block'
						: 'hidden'} mx-auto mt-2 p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold text-spaced text-xs rounded-md"
					>Back to top</button
				>
			</div>
		{/key}
	{:else}
		<div class="flex flex-col justify-center items-center text-slate-400 h-full">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-16 h-16 fill-slate-400">
				<title>Search</title>
				<path
					d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
				/>
			</svg>
			<span class="text-spaced text-sm font-semibold">Search</span>
		</div>
	{/if}
</div>
