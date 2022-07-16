<script>
	/**
	 * @typedef {import('$lib/create-deck.js').card} card
	 */
	/** @type {card} */
	export let card;

	$: isFaceDown = card.isFaceDown;

	/** @type {svelte.JSX.MouseEventHandler<HTMLButtonElement>} */
	export let onClick;

	/** @type {string} */
	let cardFile = './DECKGIF/' + card.cardValue + '.gif';

	/** @returns {string} */
	const getCardNameStr = (/** @type {string} */ cardValue) => {
		switch (cardValue.slice(-1)) {
			case 'h':
				return parseInt(cardValue) + ' of hearts';
				break;
			case 's':
				return parseInt(cardValue) + ' of spades';
				break;
			case 'd':
				return parseInt(cardValue) + ' of diamonds';
				break;
			case 'c':
				return parseInt(cardValue) + ' of clubs';
				break;
			default:
				return null;
		}
	};
</script>

{#if isFaceDown}
	<button on:click={() => onClick(card)} class="card">
		<img src="./DECKGIF/b.gif" alt="back of playing card" />
	</button>
{:else}
	<button class="card" value={card.cardValue}>
		<img src={cardFile} alt={getCardNameStr(card.cardValue)} />
	</button>
{/if}
