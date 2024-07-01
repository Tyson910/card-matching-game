<script lang="ts">
	import { onMount } from 'svelte';

	
	let { stopTimer }: { stopTimer: boolean } = $props();

	let interval: number;

	let minutes = $state(0);
	let seconds = $state(0);

	onMount(() => {
		interval = setInterval(() => {
			if (stopTimer) {
				return () => {
					clearInterval(interval);
				};
			}
			if (seconds < 59) {
				seconds += 1;
			} else {
				seconds = 0;
				minutes += 1;
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="flex gap-x-2 text-5xl text-center items-center">
	<div>Timer</div>
	<p id="time">{seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`}</p>
</div>
