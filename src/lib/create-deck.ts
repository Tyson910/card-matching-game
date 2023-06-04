/**
 * Creates string for card component
 * @returns {string} Card File String - e.g. 5h is 5 of hearts
 */
function createRandomCard(): string {
  const array = new Uint32Array(10);
  crypto.getRandomValues(array);

  console.log("Your lucky numbers:");
  // for (const num of array) {
  //   console.log(num);
  // }

  const suitArray = ["h", "c", "s", "d"];

  const cardNum = Math.floor(Math.random() * 13) + 1;
  const cardSuit = Math.floor(Math.random() * 3);
  return cardNum.toString() + suitArray[cardSuit];
}

function shuffle(deck: string[]) {
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

/**
 * Assign the project to an card.
 */
export interface Card {
  isFaceDown: boolean;
  cardValue: string;
  cardID: string;
}

/** @returns {Card[]} - Array of Card objects */
export function createDeck(): Card[] {
  const deck: string[] = [];

  for (let i = 0; i < 4; i++) {
    let newCard = createRandomCard();
    //prevents a pair from appearing twice
    while (deck.includes(newCard)) {
      newCard = createRandomCard();
    }
    //adds unique card pair to deck
    deck.push(newCard);
    deck.push(newCard);
  }

  shuffle(deck);
  shuffle(deck);

  //creates object to output
  return deck.map((cardValue, i) => ({
    cardID: "card" + i.toString(),
    cardValue,
    isFaceDown: false,
  }));
}
