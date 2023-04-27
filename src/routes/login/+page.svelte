<script lang="ts">
	import { page } from '$app/stores';
	export let data;

	$: message = $page?.form?.message;
	$: error = $page?.form?.error;
</script>

<div class="column min-h-[50%] flex flex-col justify-center items-center pt-4 mb-8">
	<div
		class="flex flex-col px-4 py-4 sm:px-8 md:px-12 md:py-8 bg-slate-800 rounded-lg shadow-lg items-center border border-slate-400"
	>
		<h1 class="font-bold text-lg mb-6 text-spaced">Log in or register</h1>

		<form method="POST">
			{#if error?.email}
				<div class="col-span-2">
					<p class="text-xs error-text text-center">{error.email}</p>
				</div>
			{/if}
			<label for="email" class="text-spaced"
				><span class={error?.email ? 'error-text' : 'hidden'}>*</span>Email</label
			>
			<input
				id="email"
				type="email"
				name="email"
				value={$page?.form?.email ?? ''}
				required
				class="{error?.email ? 'border border-red-500' : ''} md:w-80"
			/>

			<label for="password" class="text-spaced">Password</label>
			<input id="password" type="password" name="password" required />

			{#if message}
				<div class="col-span-2 mt-2 -mb-2">
					<p class="text-sm error-text text-center">{message}</p>
				</div>
			{/if}

			<div class="flex gap-2 col-span-2 justify-center mt-4">
				<button
					class="p-2 whitespace-nowrap bg-slate-600 hover:bg-slate-700 text-slate-300 font-semibold text-spaced text-xs rounded-md"
					formaction="?/login&redirect_to={data.redirect_to}"
					type="submit">Login</button
				>
				<button
					class="p-2 whitespace-nowrap bg-slate-600 hover:bg-slate-700 text-slate-300 font-semibold text-spaced text-xs rounded-md"
					formaction="?/register&redirect_to={data.redirect_to}"
					type="submit">Register</button
				>
			</div>
		</form>
	</div>
</div>

<style lang="postcss">
	form {
		@apply grid gap-2 items-center;
		grid-template-columns: 1fr 3fr;
	}

	label {
		@apply text-sm font-semibold text-right;
	}

	input {
		@apply bg-slate-100 text-sm text-slate-800 rounded-md block w-full p-2;
	}

	.error-text {
		@apply text-red-500 font-semibold;
	}
</style>
