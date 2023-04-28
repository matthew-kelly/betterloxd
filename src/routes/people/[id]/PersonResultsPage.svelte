<script lang="ts">
	import Poster from '$lib/components/Poster.svelte';
	import type { CastMemberCredit, CrewMemberCredit } from '$lib/types';

	export let credits: CastMemberCredit[] | CrewMemberCredit[];
</script>

<div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
	{#each credits as movie}
		<!-- FIXME: sort out this type mess lol -->
		<a
			href="/movies/{movie.id}"
			class="tooltip"
			data-text={movie.character || movie.job ? movie.character ?? movie.job : 'Unknown'}
		>
			{#key movie.id}
				<Poster {movie} border={true} />
			{/key}
		</a>
	{/each}
</div>
