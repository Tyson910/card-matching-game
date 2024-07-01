import { onMount } from 'svelte';

const suitArray = ['h', 'c', 's', 'd'] as const;

type SuitOptions = (typeof suitArray)[number];

class Card {
	isFaceDown = $state(false);
	// eslint-disable-next-line @typescript-eslint/ban-types
	cardValue = $state<`${SuitOptions}${string}` | (string & {})>('');
	cardFile = $derived('./DECKGIF/' + this.cardValue + '.gif');
	cardId: `${string}-${string}-${string}-${string}-${string}` = $state(crypto.randomUUID());
	cardName: string = $derived.by(() => {
		switch (this.cardValue?.slice(-1)) {
			case 'h':
				return parseInt(this.cardValue) + ' of Hearts';
			case 's':
				return parseInt(this.cardValue) + ' of Spades';
			case 'd':
				return parseInt(this.cardValue) + ' of Diamonds';
			case 'c':
				return parseInt(this.cardValue) + ' of Clubs';
			default:
				throw new Error('Invalid cardValue');
		}
	});

	constructor(cardValue: string) {
		this.cardValue = cardValue;
	}

	flipCard() {
		this.isFaceDown = !this.isFaceDown;
	}

	turnCardFaceUp() {
		this.isFaceDown = false;
	}

	turnCardFaceDown() {
		this.isFaceDown = true;
	}
}

export type CardInterface = Card;

function shuffle(deck: Card[]) {
	// eslint-disable-next-line no-var
	var m = deck.length;
	let t, i;

	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = deck[m];
		deck[m] = deck[i];
		deck[i] = t;
	}

	return deck;
}

function createRandomCardValue(): string {
	const cardNum = Math.floor(Math.random() * 13) + 1;
	const cardSuit = Math.floor(Math.random() * 3);
	return cardNum.toString() + suitArray[cardSuit];
}

function createDeck(): Card[] {
	const deck: Card[] = [];
	const cardValuesArr: string[] = [];
	for (let i = 0; i < 4; i++) {
		let newCardValue = createRandomCardValue();

		//prevents a pair from appearing twice
		while (cardValuesArr.includes(newCardValue)) {
			newCardValue = createRandomCardValue();
		}
		cardValuesArr.push(newCardValue);
		//adds unique card pair to deck
		deck.push(new Card(newCardValue));
		deck.push(new Card(newCardValue));
	}

	shuffle(deck);
	shuffle(deck);
	//creates object to output
	return deck;
}

type GameStatus = 'lost' | 'won' | 'started' | null;
type Guess = Card | null;

export class MatchingGameMachine {
	gameStatus: GameStatus = $derived.by(() => {
		if (this.strikes === 3) {
			return 'lost';
		} else if (this.pairs === 4) {
			return 'won';
			// probably a better way to do this ¯\_₍⸍⸌̣ʷ̣̫⸍̣⸌₎_/¯
			// this.score = document.getElementById('time')?.textContent || null;
		} else return 'started';
	});
	strikes = $state(0);
	pairs = $state(0);
	score = $state<number | null>(0);

	deck = $state<Card[]>([]);
	guessOne = $state<Guess>(null);
	guessTwo = $state<Guess>(null);

	constructor() {
		this.deck = createDeck();
		this.strikes = 0;
		// TODO: start timer onMount
		onMount(() => {
			// Wait n seconds, then flip all cards down
			const peek = setTimeout(() => {
				this.deck.forEach((card) => {
					card.isFaceDown = true;
				});
			}, 3000);

			return () => {
				clearTimeout(peek);
			};
		});
	}

	checkIfCardsMatch() {
		if (this.guessOne == null || this.guessTwo == null) return;
		//resets selection and saves number of pairs if match
		if (this.guessOne.cardValue === this.guessTwo.cardValue) {
			this.pairs += 1;
		} else {
			this.strikes += 1;
			//lets user see wrong choices for a short time before flipping
			const showPicks = setTimeout(() => {
				// flip cards down
				this.deck = this.deck.map((card) => {
					if (card.cardId == this.guessOne?.cardId || card.cardId == this.guessTwo?.cardId) {
						card.isFaceDown = true;
					}
					return card;
				});
			}, 1400);
			return function cleanup() {
				clearTimeout(showPicks);
			};
		}

		this.guessOne = null;
		this.guessTwo = null;
	}

	/** Saves card info upon click */
	saveClick(guessInput: Card) {
		if (!guessInput.isFaceDown) throw new Error('Remove this function from a face up card');
		if (this.guessOne == null) {
			this.guessOne = guessInput;
		} else if (this.guessTwo == null) {
			this.guessTwo = guessInput;
		}


		// flip users guess card face up
		this.deck.forEach((card) => {
			if (card.cardId == guessInput.cardId) {
				card.isFaceDown = false;
			}
		});

    this.checkIfCardsMatch()
	}
}
