<script>
	export let strikes = 0;
</script>

<div class="flex max-w-lg items-center">
	<p class="lg:text-2xl">Strikes: </p>
	{#each Array(strikes) as _, index (index)}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-10 w-10 text-red-500"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	{/each}
</div>
