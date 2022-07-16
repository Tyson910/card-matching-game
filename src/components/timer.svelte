<script>
	import { onMount } from 'svelte';
	/** @type { Boolean } */
	export let stopTimer;

	/** @type { NodeJS.Timer } */
	let interval;

	let minutes = 0;
	let seconds = 0;

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
