<script lang="ts">
	import * as api from '$lib/api';
	import ResultsPage from '$lib/components/ResultsPage.svelte';

	export let data;
	let loading = false;
</script>

<div class="column pt-4 mb-8 flex flex-col h-full">
	<h1 class="font-bold text-2xl md:text-3xl mb-4">{data.title}</h1>

	<ResultsPage
		movies={data.movies}
		next={data.next_page ? `/movies/${data.view}?page=${data.next_page}?region=CA` : null}
		{loading}
		on:end={async () => {
			if (!data.next_page) return;
			if (loading) return;

			loading = true;

			const next = await api.get(fetch, data.endpoint, {
				page: String(data.next_page),
				region: 'CA'
			});

			data.movies = [...data.movies, ...next.results];
			data.next_page = next.page < next.total_pages ? next.page + 1 : null;
			loading = false;
		}}
	/>
</div>
