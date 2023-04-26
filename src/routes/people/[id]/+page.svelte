<script lang="ts">
	import { media } from '$lib/api';
	import { cubicOut } from 'svelte/easing';
	import PersonResultsPage from './PersonResultsPage.svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { getMaxValueKey } from '$lib/utils';

	export let data;

	$: ({ person, roles, departments } = data);
	$: current = roles[0];
	$: current_job = current[0];
	$: current_roles = current[1];

	function update_current_by_job(job: string) {
		const t = roles.find((el) => {
			return !!~el.indexOf(job);
		});
		if (!t) return;
		const index = roles.indexOf(t);
		current = roles[index];
	}

	function convert_department_to_job(department: string) {
		if (department === 'Acting') return 'Actor';
		const t = departments.find((el) => {
			return !!~el.indexOf(department);
		});
		if (!t) return;
		let d: string[] = t[1];
		const counts: { [key: string]: number } = {};
		for (let i = 0; i < d.length; i++) {
			counts[d[i]] = 1 + (counts[d[i]] || 0);
		}
		return getMaxValueKey(counts);
	}

	onMount(() => {
		const j = convert_department_to_job(person.known_for_department);
		if (j) {
			update_current_by_job(j);
		}
	});

	let bio: HTMLDivElement;

	let is_dropdown_open = false;
	function toggle_dropdown() {
		is_dropdown_open = !is_dropdown_open;
	}
</script>

<div class="column flex flex-col md:grid profile-grid gap-8 h-full my-8 overflow-x-clip">
	<div class="flex flex-col">
		<div class="flex flex-col gap-0.5">
			<span class="text-spaced text-slate-400 text-xs">Films of</span>
			<h1 class="font-bold text-2xl">{person.name}</h1>
		</div>

		<button
			on:click={() => bio.scrollIntoView({ behavior: 'smooth' })}
			class="md:hidden absolute -top-6 -right-2 p-2 whitespace-nowrap bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold text-spaced text-xs rounded-md"
		>
			Skip to bio
		</button>

		<div class="border-y border-slate-700 flex mt-4 mb-6 md:mb-8">
			<div role="menu">
				<span
					role="menuitem"
					on:click={toggle_dropdown}
					on:keydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') toggle_dropdown();
					}}
					tabindex="0"
					class="flex gap-1 p-2 text-slate-300 font-semibold text-spaced text-xs rounded-md cursor-pointer select-none"
				>
					Role: {current_job}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="h-4 w-4 fill-slate-200"
					>
						{#if is_dropdown_open}
							<title>dropdown is open</title>
							<path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
						{:else}
							<title>dropdown is closed</title>
							<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
						{/if}
					</svg>
				</span>
				{#if is_dropdown_open}
					<div transition:fly={{ duration: 200, easing: cubicOut, y: 50 }} class="menu-items">
						{#each roles as [job, credit]}
							<button
								role="menuitem"
								tabindex="0"
								on:click={() => {
									update_current_by_job(job);
									toggle_dropdown();
								}}
							>
								{job}
								<span class="text-slate-200 bg-slate-500 p-1 rounded-md font-bold"
									>{credit.length}</span
								></button
							>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<PersonResultsPage credits={current_roles} />
	</div>

	<div bind:this={bio} class="flex flex-col sm:flex-row sm:items-start md:flex-col gap-4 w-full">
		<div class="flex flex-col gap-1">
			<h2 class="md:hidden font-bold text-sm text-spaced">Bio</h2>
			{#if person.profile_path}
				<img
					src={media(person.profile_path, 300)}
					alt={person.name}
					loading="eager"
					class="rounded-md border border-slate-400 max-w-[230px]"
				/>
			{/if}
		</div>
		<div class="flex flex-col gap-4 mt-0 sm:mt-6 md:mt-0">
			{#if person.biography}
				<div class="flex flex-col gap-2">
					{#each person.biography.split('\n') as section}
						<p class="text-sm text-slate-400">{section}</p>
					{/each}
				</div>
			{/if}
			<span class="text-xs text-slate-400 mt-4">
				More details at <a
					class="ml-px border-2 border-gray-800 uppercase p-1 text-tiny cursor-pointer hover:text-white hover:border-slate-400 rounded-base"
					href="https://www.themoviedb.org/person/{person.id}/"
					target="_blank"
					rel="noreferrer"
				>
					TMDB
				</a>
			</span>
		</div>
	</div>
</div>

<style lang="postcss">
	.profile-grid {
		grid-template-columns: 1fr 230px;
	}
	.menu-items {
		@apply flex flex-col gap-0.5 absolute top-8 h-fit p-2 bg-slate-600 rounded-md z-20 w-[200px];
	}
	.menu-items > button {
		@apply font-semibold text-sm w-full bg-slate-600 hover:bg-slate-700 p-2 text-left;
	}
</style>
