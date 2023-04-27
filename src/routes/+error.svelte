<script>
	import { page } from '$app/stores';
</script>

<div class="column h-full">
	<div class="h-full flex flex-col justify-center items-center">
		<span class="text-spaced">{$page.status}</span>
		<h1 class="text-spaced">{$page.error.message}</h1>

		<div class="flex gap-2 col-span-2 justify-center mt-8">
			<a
				href="/"
				class="p-2 whitespace-nowrap bg-slate-600 hover:bg-slate-700 text-slate-300 font-semibold text-spaced text-xs rounded-md"
				>Home</a
			>
			<a
				href="/login"
				class="p-2 whitespace-nowrap bg-slate-600 hover:bg-slate-700 text-slate-300 font-semibold text-spaced text-xs rounded-md"
				>Login</a
			>
		</div>
	</div>
</div>

<style lang="postcss">
	span {
		@apply font-bold text-9xl mb-2;
	}

	h1 {
		@apply font-bold text-2xl;
	}
</style>
