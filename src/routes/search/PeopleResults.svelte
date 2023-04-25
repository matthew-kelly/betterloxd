<script lang="ts">
	import { media } from '$lib/api';
	import Poster from '$lib/components/Poster.svelte';
	import type { PeopleListResult } from '$lib/types';

	export let people: PeopleListResult[];
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
	{#each people as person}
		<a
			href="/people/{person.id}"
			class="flex gap-2 items-center p-2 rounded-md bg-slate-700 hover:bg-slate-800 transition-colors duration-100"
		>
			{#if person.profile_path}
				<img
					class="w-1/3 h-auto aspect-[2/3] max-w-[100px] rounded-md"
					src={media(person.profile_path, 500)}
					alt={person.name}
				/>
			{:else}
				<div
					class="w-full h-auto aspect-[2/3] max-w-[100px] bg-slate-800 flex flex-col items-center justify-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="h-8 fill-slate-400"
						role="img"
					>
						<title>{person.name}</title>
						<path
							d="M22 20.7L3.3 2L2 3.3L3 4.3V19C3 20.1 3.9 21 5 21H19.7L20.7 22L22 20.7M5 19V6.3L12.6 13.9L11.1 15.8L9 13.1L6 17H15.7L17.7 19H5M8.8 5L6.8 3H19C20.1 3 21 3.9 21 5V17.2L19 15.2V5H8.8"
						/>
					</svg>
				</div>
			{/if}
			<div class="flex flex-col">
				<span class="text-xl mb-1 font-medium">{person.name}</span>
				{#if person.known_for}
					<span class="text-slate-400 text-sm mb-1">Known for:</span>
					<div class="flex flex-col gap-1 text-slate-400 text-xs">
						{#each person.known_for as item}
							<span
								>{item.title ?? item.name} ({new Date(
									item.release_date ?? item.first_air_date
								).toLocaleDateString('en-CA', {
									year: 'numeric'
								})})</span
							>
						{/each}
					</div>
				{/if}
			</div>
		</a>
	{/each}
</div>
