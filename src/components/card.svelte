<script lang="ts">
	import type { CardInterface } from '$lib/game.svelte.ts';

	let { card, onClick }: { card: CardInterface; onClick: (value: CardInterface) => void } =
		$props();

	const cardFile = $derived('./DECKGIF/' + card.cardValue + '.gif');
</script>

{#if !card.isFaceDown}
	<button onclick={() => onClick(card.cardId)} class="card">
		<img src="./DECKGIF/b.gif" alt="back of playing card" />
	</button>
{:else}
	<button class="card" value={card.cardValue}>
		<img src={cardFile} alt={card.cardName} />
	</button>
{/if}
