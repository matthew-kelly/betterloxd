<script lang="ts">
	import Carousel from '$lib/components/Carousel.svelte';
	import Hero from './Hero.svelte';
	import { media } from '$lib/api';
	import { smoothload } from '$lib/actions';
	import justwatch from '$lib/images/justwatch.svg';
	import RatingsCurve from './RatingsCurve.svelte';
	import DetailsRow from './DetailsRow.svelte';
	import { format_money } from '$lib/utils';
	import { afterNavigate } from '$app/navigation';

	afterNavigate(() => {
		limit = 30;
		activeTab = 'Cast';
	});

	export let data;

	$: ({ movie, trailer, title, cast, crew, streaming, alternative_titles, directors } = data);

	const tabs = ['Cast', 'Crew', 'Details', 'Genres'];
	let activeTab = 'Cast';

	let limit = 30;
	function show_all_cast() {
		limit = 1000;
	}
</script>

<svelte:head>
	<title>{movie.title} | Betterloxd</title>
</svelte:head>

<Hero {movie} />

<div class={`column container ${movie.images?.backdrops.length ? '-mt-40' : 'mt-24'}`}>
	<div class="relative w-full">
		<div class="sticky top-4 flex flex-col gap-1">
			<img
				class="border border-slate-400 rounded-sm"
				src={media(movie.poster_path, 500)}
				alt={movie.title}
				use:smoothload
			/>
			<div class="flex flex-col border border-slate-400 rounded-md">
				<div
					class="flex justify-between items-center text-slate-400 bg-slate-800 text-xs p-2 rounded-t-md"
				>
					<span class="uppercase">Where to watch</span>
					<a href="#trailer" class="flex items-center gap-2 hover:text-white">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
							<path
								class="fill-slate-300"
								fill-rule="evenodd"
								d="M9,18 C1.77943725,18 0,16.2205627 0,9 C0,1.77943725 1.77943725,0 9,0 C16.2205627,0 18,1.77943725 18,9 C18,16.2205627 16.2205627,18 9,18 Z M7.50702013,4.88648243 C7.35334348,4.7960844 7.17829278,4.74841664 7,4.74841664 C6.44771525,4.74841664 6,5.19613189 6,5.74841664 L6,12.2515834 C6,12.4298761 6.04766776,12.6049268 6.13806578,12.7586035 C6.41808527,13.2346366 7.030987,13.3935371 7.50702013,13.1135176 L13.0347118,9.86193422 C13.1812655,9.77572618 13.3034179,9.65357379 13.3896259,9.50702013 C13.6696454,9.030987 13.510745,8.41808527 13.0347118,8.13806578 L7.50702013,4.88648243 Z"
							/>
						</svg>
						<span>Trailer</span>
					</a>
				</div>
				<div class="flex flex-col gap-2 p-2 text-xs">
					{#if streaming?.flatrate?.length}
						{#each streaming.flatrate.sort((a, b) => a.display_priority - b.display_priority) as service}
							<a href={streaming.link} class="flex items-center text-slate-400 hover:text-white">
								<img
									src={media(service.logo_path, 'original')}
									alt={service.provider_name}
									class="w-6 rounded-md mr-2"
								/>
								<span class="text-xs">{service.provider_name}</span>
							</a>
						{/each}
					{:else}
						<div class="flex items-center">
							<span class="text-xs text-slate-400">Not streaming</span>
						</div>
					{/if}
					{#if streaming?.link}
						<div class="flex items-center justify-between pt-2 border-t border-slate-800">
							<a href={streaming.link} class="text-blue-400 hover:text-white">All Services...</a>
							<a
								href={streaming.link}
								class="justwatch"
								style="background-image: url({justwatch});"
							>
								JustWatch
							</a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="flex flex-col gap-6">
		<div class="flex items-end flex-wrap text-slate-400 text-lg">
			<h1 class="text-3xl mb-0 mr-4 font-bold font-serif text-white">{movie.title}</h1>
			<span class="mr-4 text-slate-200 underline underline-offset-4 decoration-slate-600"
				>{movie.release_date.split('-')[0]}</span
			>
			{#if movie.original_language !== 'en' && movie?.original_title}
				<span class="italic mr-4">{'‘' + movie.original_title + '’'}</span>
			{/if}
			<span>
				Directed by <span class="text-slate-200 underline underline-offset-4 decoration-slate-600"
					>{directors}</span
				>
			</span>
		</div>

		<div class="flex flex-col-reverse md:flex-row gap-4">
			<div class="flex flex-col gap-6 w-full">
				<p class="text-slate-400 font-serif">{movie.overview}</p>

				<div>
					<div class="text-lime-500 border-b border-b-slate-700 mb-4">
						<div class="-mb-px flex gap-4">
							{#each tabs as tab}
								<span
									class={`cursor-pointer text-spaced text-sm border-b hover:border-b-lime-500 pb-1 ${
										activeTab === tab
											? 'border-b-white hover:border-b-white text-white'
											: 'border-b-slate-700'
									}`}
									on:click={() => (activeTab = tab)}
									on:keydown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') activeTab = tab;
									}}
								>
									{tab}
								</span>
							{/each}
						</div>
					</div>
					{#if activeTab === 'Cast'}
						<div class="flex flex-wrap gap-1 text-slate-400 text-xs">
							{#each cast as person, i}
								{#if i <= limit}
									<span
										class="tooltip cursor-pointer bg-slate-800 px-[6px] py-[3px] rounded-[3px] mb-px shadow-sm hover:text-white"
										data-text={person.character}
									>
										{person.name}
									</span>
								{/if}
							{/each}
							<span
								class:hidden={limit > 30 || cast.length <= 30}
								class="cursor-pointer bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm hover:text-white"
								on:click={show_all_cast}
								on:keydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') show_all_cast();
								}}
							>
								Show All...
							</span>
						</div>
					{/if}
					{#if activeTab === 'Crew'}
						<div class="flex flex-col gap-4 text-slate-400 text-xs">
							{#each [...crew] as [job, people]}
								{#if people.length}
									<DetailsRow title={job}>
										{#each people as person}
											<span
												class="cursor-pointer bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm hover:text-white whitespace-nowrap"
											>
												{person.name}
											</span>
										{/each}
									</DetailsRow>
								{/if}
							{/each}
						</div>
					{/if}
					{#if activeTab === 'Details'}
						<div class="flex flex-col gap-4 text-slate-400 text-xs">
							{#if movie?.production_companies.length}
								<DetailsRow title="Studio">
									{#each movie.production_companies as company}
										<span
											class="cursor-pointer bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm hover:text-white whitespace-nowrap"
										>
											{company.name}
										</span>
									{/each}
								</DetailsRow>
							{/if}
							<DetailsRow title="Release date">
								<span
									class=" bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm whitespace-nowrap"
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
									class=" bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm whitespace-nowrap"
								>
									{format_money(movie.budget)}
								</span>
							</DetailsRow>

							<DetailsRow title="Revenue">
								<span
									class=" bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm whitespace-nowrap"
								>
									{format_money(movie.revenue)}
								</span>
							</DetailsRow>

							{#if movie?.production_countries.length}
								<DetailsRow title="Country">
									{#each movie.production_countries as country}
										<span
											class="cursor-pointer bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm hover:text-white whitespace-nowrap"
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
											class="cursor-pointer bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm hover:text-white whitespace-nowrap"
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
						<div class="flex flex-col gap-4 text-slate-400 text-xs">
							{#if movie?.genres.length}
								<DetailsRow title="Genres">
									{#each movie.genres as genre}
										<span
											class="cursor-pointer bg-slate-800 px-[6px] py-[3px] rounded-[3px] shadow-sm hover:text-white whitespace-nowrap"
										>
											{genre.name}
										</span>
									{/each}
								</DetailsRow>
							{/if}
						</div>
					{/if}
				</div>

				<div class="text-slate-400 text-xs flex gap-4">
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
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowfullscreen
							id="trailer"
							class="aspect-video w-full"
						/>
					</div>
				{/if}
			</div>

			<div class="max-w-[200px] md:w-full flex flex-col">
				<div
					class="flex justify-between items-baseline text-slate-400 pb-1 border-b border-b-slate-600"
				>
					<span class="text-spaced text-sm">Ratings</span>
					<span class="text-xs text-slate-600">
						{#if movie.vote_count > 1000}
							{Math.round(movie.vote_count / 1000)}K ratings
						{:else}
							{movie.vote_count} ratings
						{/if}
					</span>
				</div>
				<RatingsCurve rating={movie.vote_average} />
			</div>
		</div>
	</div>
</div>

{#if movie.recommendations.results.length > 0}
	<div class="mt-8">
		<Carousel
			view={{ title: 'Similar films', endpoint: '' }}
			movies={movie.recommendations.results}
			href={null}
		/>
	</div>
{/if}

<style lang="postcss">
	.justwatch {
		align-self: center;
		background-repeat: no-repeat;
		background-position: 0 0;
		background-size: 62px 20px;
		color: hsla(0, 0%, 100%, 0);
		display: block;
		font: 0/0 Arial;
		height: 10px;
		overflow: hidden;
		text-indent: -3000px;
		width: 62px;
	}
	.justwatch:hover {
		background-position: 0 -10px;
	}

	.container {
		@apply grid gap-8;
		grid-template-columns: 230px 1fr;
	}
</style>
