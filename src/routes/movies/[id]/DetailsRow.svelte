<script lang="ts">
	export let title: string;
</script>

<div class="grid grid-cols-2 justify-between items-start gap-2">
	<div class="flex justify-between items-end gap-1 mt-1">
		<span class="whitespace-nowrap uppercase">{title}</span>
		<div class="border-b border-dotted border-slate-600 grow" />
	</div>
	<div class="flex flex-wrap gap-1">
		<slot />
	</div>
</div>
