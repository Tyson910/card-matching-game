<script>
	import { onMount, beforeUpdate } from 'svelte';
	import { createDeck } from '$lib/create-deck.js';
	import Timer from '$components/timer.svelte';
	import Card from '$components/card.svelte';
	import ShowStrikes from '$components/show-strikes.svelte';
	/** @typedef {import('$lib/create-deck.js').card} card */
	
	// import SaveScore from './SaveScore.js';
	// import Lost from './Lost.js';
	let deck = createDeck();

	let strikes = 0;
	let pairs = 0;

	/** @type {string | null} */
	let score = null;

	/** @type {card | null} */
	let guessOne = null;

	/** @type {card | null} */
	let guessTwo = null;

	/** @type {'lost' | 'won' | 'started' | null }  */
	let gameStatus = null;

	//shows all cards in deck
	function flipAllCardsDown() {
		deck = deck.map((card) => {
			card.isFaceDown = true;
			return card;
		});
		// starts timer once cards are flipped
		gameStatus = 'started';
	}

	function checkIfCardsMatch() {
		//resets selection and saves number of pairs if match
		if (guessOne.cardValue === guessTwo.cardValue) {
			guessOne = null;
			guessTwo = null;
			pairs += 1;
		} else {
			strikes += 1;
			//lets user see wrong choices for a short time before flipping
			var showPicks = setTimeout(() => flipPicksDown(), 1400);
			return function cleanup() {
				clearTimeout(showPicks);
			};
		}
	}

	//flips 2 selected cards down in a deck
	function flipPicksDown() {
		deck = deck.map((card) => {
			if (card.cardID === guessOne.cardID || card.cardID === guessTwo.cardID) {
				card.isFaceDown = true;
			}
			return card;
		});
		guessOne = null;
		guessTwo = null;
	}

	//stops timer
	function checkForWinOrLoss() {
		if (strikes === 3) {
			gameStatus = 'lost';
		} else if (pairs === 4) {
			gameStatus = 'won';
			// probably a better way to do this ¯\_₍⸍⸌̣ʷ̣̫⸍̣⸌₎_/¯
			score = document.getElementById('time')?.textContent || null;
		}
	}

	//saves card info upon click
	/** @param { card } guessInput */
	function saveClick(guessInput) {
		if (!guessInput.isFaceDown) throw new Error('Remove this function from a face up card');
		if (!guessOne) {
			guessOne = guessInput;
		} else if (!guessTwo) {
			guessTwo = guessInput;
		}
		// flip users guess card face up
		deck = [
			...deck.map((card) => {
				if (card.cardID == guessInput.cardID) {
					return { ...card, isFaceDown: false };
				}
				return { ...card };
			})
		];
	}

	/** @returns {string | null} */
	const getCardNameStr = (/** @type {string} */ cardValue) => {
		switch (cardValue?.slice(-1)) {
			case 'h':
				return parseInt(cardValue) + ' of Hearts';
				break;
			case 's':
				return parseInt(cardValue) + ' of Spades';
				break;
			case 'd':
				return parseInt(cardValue) + ' of Diamonds';
				break;
			case 'c':
				return parseInt(cardValue) + ' of Clubs';
				break;
			default:
				return null;
		}
	};

	//shows users the deck for a limited amount of time
	onMount(() => {
		var peek = setTimeout(() => flipAllCardsDown(), 3000);
		return () => {
			clearTimeout(peek);
		};
	});

	//check if selected cards are a match
	beforeUpdate(() => {
		if (guessOne && guessTwo) {
			checkIfCardsMatch();
			checkForWinOrLoss();
		}
	});
</script>

{#if strikes === 3}
	<button on:click={() => location.reload()} class="btn bg-black container"> Reset Game </button>
{:else if pairs === 4}
	<!-- <SaveScore {score} /> -->
	<p>u won :D</p>
{:else}
	<div class="container">
		<ShowStrikes {strikes} />
		<p>Guess One: {getCardNameStr(guessOne?.cardValue) || ''}</p>
		<p>Guess Two: {getCardNameStr(guessTwo?.cardValue) || ''}</p>
		<Timer stopTimer={strikes == 2 || pairs === 4} />
		<div class="">
			{#each deck as card, i ('card' + i)}
				<Card {card} onClick={saveClick} />
			{/each}
		</div>
	</div>
{/if}
