<script lang="ts">
	import { media } from '$lib/api';
	import justwatch from '$lib/images/justwatch.svg';
	import type { Streaming } from '$lib/types';

	export let streaming: Streaming;
</script>

<div class="flex flex-col border border-slate-400 rounded-md">
	<div
		class="flex justify-between items-center text-slate-400 bg-slate-800 text-xs p-2 rounded-t-md"
	>
		<span class="uppercase">Where to watch</span>
		<a href="#trailer" class="hidden md:flex items-center gap-2 hover:text-white">
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
				<a
					href={streaming.link}
					class="flex items-center text-slate-400 hover:text-white pb-2 md:pb-0 border-b md:border-none border-slate-800"
				>
					<img
						src={media(service.logo_path, 'original')}
						alt={service.provider_name}
						class="w-6 h-6 rounded-md mr-2"
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
			<div
				class="flex items-center justify-between md:pt-2 border-none md:border-t border-slate-800"
			>
				<a href={streaming.link} class="text-blue-400 hover:text-white">All Services...</a>
				<a href={streaming.link} class="justwatch" style="background-image: url({justwatch});">
					JustWatch
				</a>
			</div>
		{/if}
	</div>
</div>

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
</style>
