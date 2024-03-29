<script lang="ts">
	import Carousel from '$lib/components/Carousel.svelte';
	import Hero from './Hero.svelte';
	import RatingsCurve from './RatingsCurve.svelte';
	import DetailsRow from './DetailsRow.svelte';
	import { format_money } from '$lib/utils';
	import { afterNavigate, invalidateAll } from '$app/navigation';
	import Poster from '$lib/components/Poster.svelte';
	import Streaming from './Streaming.svelte';
	import { fade } from 'svelte/transition';
	import playicon from '$lib/images/play.svg';
	import { enhance } from '$app/forms';

	afterNavigate(() => {
		limit = 30;
		activeTab = 'Cast';
	});

	export let data;

	$: ({ movie, trailer, cast, crew, streaming, alternative_titles, directors } = data);

	$: recommendations = movie.recommendations.results.filter(
		(item) => item.popularity >= 50 || item.vote_count > 1000
	);

	const tabs = ['Cast', 'Crew', 'Details', 'Genres'];
	let activeTab = 'Cast';

	let limit = 30;
	function show_all_cast() {
		limit = 1000;
	}

	let is_submitting = false;
</script>

<Hero {movie} />

<div
	class={`column md:grid gap-8 movie-grid ${
		movie.images?.backdrops.length ? '-mt-20 md:-mt-40' : 'mt-16 md:mt-24'
	}`}
>
	<div class="hidden md:block relative w-full">
		<div class="flex sticky top-4 flex-col gap-1">
			{#key movie.id}
				<Poster {movie} border={true} />
				<Streaming {streaming} trailer={!!trailer} />
			{/key}
		</div>
	</div>

	<div class="flex flex-col gap-4 md:gap-6">
		<div class="flex items-center md:items-start gap-2 md:block">
			<div
				class="grow flex gap-4 md:gap-0 self-end items-center md:items-end flex-wrap text-slate-400 text-sm md:text-lg"
			>
				<h1 class="text-2xl md:text-3xl mb-0 mr-4 font-bold font-serif text-white">
					{movie.title}
				</h1>
				<span class="mr-4 md:text-slate-200 md:underline underline-offset-4 decoration-slate-600"
					>{movie.release_date.split('-')[0]}</span
				>
				{#if movie.original_language !== 'en' && movie?.original_title}
					<span class="italic mr-4">{'‘' + movie.original_title + '’'}</span>
				{/if}
				<span class="uppercase md:normal-case">
					Directed by
					{#each directors as director}
						<a
							href="/people/{director[1]}"
							class="normal-case text-base text-slate-200 md:underline underline-offset-4 decoration-slate-600 font-bold md:font-normal"
							>{director[0]}</a
						><span class="last:hidden">,&nbsp;</span>
					{/each}
				</span>
			</div>
			<div class="md:hidden grow-0 max-w-[33%] w-full">
				{#key movie.id}
					<Poster {movie} border={true} />
				{/key}
			</div>
		</div>

		<div class="md:hidden flex items-center text-slate-400 text-xs gap-2">
			{#if trailer}
				<a
					href="#trailer"
					class="flex items-center gap-1 text-spread uppercase bg-slate-700 px-2 py-1 rounded-[3px] mb-px shadow-sm hover:text-white"
				>
					<img src={playicon} alt="play" class="w-3 h-4" />
					Trailer
				</a>
			{/if}
			<span>{movie.runtime} mins</span>
		</div>

		<div class="flex flex-col-reverse md:flex-row gap-4">
			<div class="flex flex-col gap-6 w-full">
				<p class="text-slate-400 font-serif">{movie.overview}</p>
				<div>
					<div class="text-lime-500 border-b border-b-slate-700 mb-4">
						<div class="-mb-px flex gap-4">
							{#each tabs as tab}
								<span
									class={`cursor-pointer text-spaced text-xs md:text-sm border-b hover:border-b-lime-500 pb-1 ${
										activeTab === tab
											? 'border-b-white hover:border-b-white text-white'
											: 'border-b-slate-700'
									}`}
									on:click={() => (activeTab = tab)}
									on:keydown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') activeTab = tab;
									}}
									role="button"
									tabindex="0"
								>
									{tab}
								</span>
							{/each}
						</div>
					</div>
					{#if activeTab === 'Cast'}
						<div
							in:fade
							class="flex flex-wrap gap-1 text-slate-400 text-xs overflow-x-hidden md:overflow-x-visible"
						>
							{#each cast as person, i}
								{#if i <= limit}
									<a
										href="/people/{person.id}"
										class="md:tooltip group cursor-pointer bg-slate-800 px-[6px] py-[3px] rounded-[3px] mb-px shadow-sm hover:text-white"
										data-text={person.character ? person.character : 'Unknown'}
										role="button"
										tabindex="0"
										transition:fade|local
									>
										{person.name}<span class="md:hidden"
											>&nbsp;&ndash; <span
												class="text-lime-600 group-hover:text-lime-500 transition-colors duration-100"
												>{person.character ? person.character : 'Unknown'}</span
											></span
										>
									</a>
								{/if}
							{/each}
							<span
								class:hidden={limit > 30 || cast.length <= 30}
								class="cursor-pointer bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm hover:text-white"
								on:click={show_all_cast}
								on:keydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') show_all_cast();
								}}
								role="button"
								tabindex="0"
							>
								Show All...
							</span>
						</div>
					{/if}
					{#if activeTab === 'Crew'}
						<div in:fade class="flex flex-col gap-4 text-slate-400 text-xs">
							{#each [...crew] as [job, people]}
								{#if people.length}
									<DetailsRow title={job}>
										{#each people as person}
											<a
												href="/people/{person.id}"
												class="bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm hover:text-white whitespace-nowrap"
											>
												{person.name}
											</a>
										{/each}
									</DetailsRow>
								{/if}
							{/each}
						</div>
					{/if}
					{#if activeTab === 'Details'}
						<div in:fade class="flex flex-col gap-4 text-slate-400 text-xs">
							{#if movie?.production_companies.length}
								<DetailsRow title="Studio">
									{#each movie.production_companies as company}
										<span
											class="bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm whitespace-nowrap"
										>
											{company.name}
										</span>
									{/each}
								</DetailsRow>
							{/if}
							<DetailsRow title="Release date">
								<span
									class="bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm whitespace-nowrap"
								>
									{new Date(movie.release_date).toLocaleDateString('en-CA', {
										weekday: 'long',
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</span>
							</DetailsRow>

							<DetailsRow title="Budget">
								<span
									class="bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm whitespace-nowrap"
								>
									{format_money(movie.budget)}
								</span>
							</DetailsRow>

							<DetailsRow title="Revenue">
								<span
									class="bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm whitespace-nowrap"
								>
									{format_money(movie.revenue)}
								</span>
							</DetailsRow>

							{#if movie?.production_countries.length}
								<DetailsRow title="Country">
									{#each movie.production_countries as country}
										<span
											class="bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm whitespace-nowrap"
										>
											{country.name}
										</span>
									{/each}
								</DetailsRow>
							{/if}

							{#if movie?.spoken_languages.length}
								<DetailsRow title="Language">
									{#each movie.spoken_languages as lang}
										<span
											class="bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm whitespace-nowrap"
										>
											{lang.english_name}
										</span>
									{/each}
								</DetailsRow>
							{/if}

							{#if alternative_titles}
								<DetailsRow title="Alternative titles">
									<span class="text-slate-400">
										{alternative_titles}
									</span>
								</DetailsRow>
							{/if}
						</div>
					{/if}

					{#if activeTab === 'Genres'}
						<div in:fade class="flex flex-col gap-4 text-slate-400 text-xs">
							{#if movie?.genres.length}
								<DetailsRow title="Genres">
									{#each movie.genres as genre}
										<span
											class="bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm whitespace-nowrap"
										>
											{genre.name}
										</span>
									{/each}
								</DetailsRow>
							{/if}
						</div>
					{/if}
				</div>

				<div class="hidden md:flex text-slate-400 text-xs gap-4">
					<span>{movie.runtime} mins</span>
					<span>
						More at <a
							class="ml-px border-2 border-gray-800 uppercase p-1 text-tiny cursor-pointer hover:text-white hover:border-slate-400 rounded-base"
							href="https://www.themoviedb.org/movie/{movie.id}/"
							target="_blank"
							rel="noreferrer"
						>
							TMDB
						</a>
					</span>
				</div>

				{#if trailer}
					<div class="flex flex-col" class:has-trailer={!!data.trailer}>
						<iframe
							src="https://www.youtube.com/embed/{trailer.key}"
							title="YouTube video player"
							frameborder="0"
							allowfullscreen
							id="trailer"
							class="aspect-video w-full"
							loading="lazy"
						/>
					</div>
				{/if}
			</div>

			<div class="md:max-w-[200px] md:w-full flex flex-col items-center">
				<div
					class="rounded-md bg-slate-800 bg-opacity-10 border border-slate-400 w-full flex flex-col p-4 mb-4"
				>
					{#if data.user}
						<form
							method="POST"
							action="/watchlist?/{data.in_watchlist ? 'delete' : 'add'}"
							use:enhance={() => {
								is_submitting = true;

								return async () => {
									await invalidateAll();
									is_submitting = false;
								};
							}}
							class="flex justify-center items-center"
						>
							<input type="hidden" name="movie_id" value={movie.id} />
							<button
								disabled={is_submitting}
								type="submit"
								class="group max-w-[168px] md:max-w-full disabled:text-slate-500 disabled:cursor-not-allowed flex justify-center items-center gap-1 p-2 bg-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-spaced text-xs rounded-md"
							>
								{#if data.in_watchlist}
									<span>Remove from watchlist</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										class="min-w-[40px] w-10 pr-1 fill-red-400 group-disabled:fill-slate-500"
									>
										<path
											d="M14.47 15.08L11 13V7H12.5V12.25L15.58 14.08C15.17 14.36 14.79 14.7 14.47 15.08M13.08 19.92C12.72 19.97 12.37 20 12 20C7.58 20 4 16.42 4 12S7.58 4 12 4 20 7.58 20 12C20 12.37 19.97 12.72 19.92 13.08C20.61 13.18 21.25 13.4 21.84 13.72C21.94 13.16 22 12.59 22 12C22 6.5 17.5 2 12 2S2 6.5 2 12C2 17.5 6.47 22 12 22C12.59 22 13.16 21.94 13.72 21.84C13.4 21.25 13.18 20.61 13.08 19.92M21.12 15.46L19 17.59L16.88 15.47L15.47 16.88L17.59 19L15.47 21.12L16.88 22.54L19 20.41L21.12 22.54L22.54 21.12L20.41 19L22.54 16.88L21.12 15.46Z"
										/>
									</svg>
								{:else}
									<span>Add to watchlist</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										class="min-w-[40px] w-10 pr-1 fill-lime-400 group-disabled:fill-slate-500"
									>
										<path
											d="M14.47 15.08L11 13V7H12.5V12.25L15.58 14.08C15.17 14.36 14.79 14.7 14.47 15.08M13.08 19.92C12.72 19.97 12.37 20 12 20C7.58 20 4 16.42 4 12S7.58 4 12 4 20 7.58 20 12C20 12.37 19.97 12.72 19.92 13.08C20.61 13.18 21.25 13.4 21.84 13.72C21.94 13.16 22 12.59 22 12C22 6.5 17.5 2 12 2S2 6.5 2 12C2 17.5 6.47 22 12 22C12.59 22 13.16 21.94 13.72 21.84C13.4 21.25 13.18 20.61 13.08 19.92M18 15V18H15V20H18V23H20V20H23V18H20V15H18Z"
										/>
									</svg>
								{/if}
							</button>
						</form>
					{:else}
						<a
							href="/login"
							class="mx-auto max-w-[168px] md:max-w-full text-center p-2 bg-slate-700 hover:bg-slate-800 text-slate-300 fill-lime-400 font-semibold text-spaced text-xs rounded-md flex items-center justify-center"
							><span>Login to add to watchlist</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								class="min-w-[40px] w-10 pr-2"
							>
								<path
									d="M14.47 15.08L11 13V7H12.5V12.25L15.58 14.08C15.17 14.36 14.79 14.7 14.47 15.08M13.08 19.92C12.72 19.97 12.37 20 12 20C7.58 20 4 16.42 4 12S7.58 4 12 4 20 7.58 20 12C20 12.37 19.97 12.72 19.92 13.08C20.61 13.18 21.25 13.4 21.84 13.72C21.94 13.16 22 12.59 22 12C22 6.5 17.5 2 12 2S2 6.5 2 12C2 17.5 6.47 22 12 22C12.59 22 13.16 21.94 13.72 21.84C13.4 21.25 13.18 20.61 13.08 19.92M18 15V18H15V20H18V23H20V20H23V18H20V15H18Z"
								/>
							</svg></a
						>
					{/if}
				</div>

				<div class="md:hidden w-full mb-4">
					<Streaming {streaming} trailer={!!trailer} />
				</div>

				{#if movie.vote_average && movie.vote_average > 0}
					<div
						class="flex justify-between items-baseline text-slate-400 pb-1 border-b border-b-slate-600 w-full"
					>
						<span class="text-spaced text-xs md:text-sm">Ratings</span>
						<span class="text-xs text-slate-600">
							{#if movie.vote_count > 1000}
								{Math.round(movie.vote_count / 1000)}K ratings
							{:else}
								{movie.vote_count} ratings
							{/if}
						</span>
					</div>
					<RatingsCurve rating={movie.vote_average} />
				{/if}
			</div>
		</div>

		{#if recommendations.length > 0}
			<div class="mt-2 md:mt-0 mb-2 md:mb-8">
				<div
					class="flex justify-between items-baseline text-slate-400 pb-1 border-b border-b-slate-600 w-full"
				>
					<span class="text-spaced text-xs md:text-sm">Similar films</span>
				</div>
				<div class="hidden md:grid grid-cols-6 gap-1 h-24 mt-2">
					{#each recommendations.slice(0, 6) as rec}
						<a href="/movies/{rec.id}">
							{#key rec.id}
								<Poster border={true} movie={rec} />
							{/key}
						</a>
					{/each}
				</div>
				<div class="block md:hidden mt-2 -mx-4">
					<Carousel movies={recommendations} href={null} />
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.movie-grid {
		grid-template-columns: 230px 1fr;
	}
</style>
