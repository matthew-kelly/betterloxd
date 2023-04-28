<script lang="ts">
	export let rating: number;
	$: converted = rating / 2;

	const bars = [
		{ label: 'half-★', score: 0 },
		{ label: '★', score: 0 },
		{ label: '★1/2', score: 0 },
		{ label: '★★', score: 0 },
		{ label: '★★1/2', score: 0 },
		{ label: '★★★', score: 0 },
		{ label: '★★★1/2', score: 0 },
		{ label: '★★★★', score: 0 },
		{ label: '★★★★1/2', score: 0 },
		{ label: '★★★★★', score: 0 }
	];

	$: {
		const rounded = Math.round(rating);
		const ri = rounded - 1;
		bars[ri].score = 10;

		// simulate normal distribution curve
		for (let i = 0; i < 10; i++) {
			const distance = (10 - Math.abs(ri - i)) ** 1.1;
			let score = (distance ** 5 / 10 ** 5) * 5;

			// adjust adjacent number to break perfect curve
			if (rounded > 5) {
				if (ri - 1 === i) {
					score = score * 0.75;
				} else if (ri - 2 === i) {
					score = score * 0.7;
				}
			} else {
				if (ri + 1 === i) {
					score = score * 0.75;
				} else if (ri + 2 === i) {
					score = score * 0.7;
				}
			}
			bars[i].score = score;
		}
	}
</script>

<div class="flex items-end gap-2 justify-between mt-2 max-w-md w-full">
	<span class="star">★</span>
	<div class="bars grid grid-cols-10 grow gap-px mb-1 h-[50px]">
		{#each bars as bar}
			<div
				class="tooltip bg-slate-600 h-full max-h-[50px] min-h-[1px] hover:bg-slate-500 cursor-pointer self-end"
				style="height: {(bar.score / 10) * 100}%; min-width: 10px; width: 100%;"
				data-text={bar.label}
			/>
		{/each}
	</div>
	<div class="flex flex-col items-center">
		<span class="text-slate-400 font-extralight text-xl">{converted.toFixed(1)}</span>
		<span class="star">★★★★★</span>
	</div>
</div>

<style lang="postcss">
	.star {
		font-size: 9px;
		@apply text-lime-500;
	}
</style>
