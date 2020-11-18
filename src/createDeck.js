
//creates string for card component
function randCard(){
    let suitArray = ['h', 'c', 's', 'd'];

    let cardNum = Math.floor( Math.random() * 13 ) + 1 ;
    let cardSuit = Math.floor( Math.random() * 3 );
    return cardNum.toString() + suitArray[cardSuit] ;
}

function shuffle(deck){
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

export default function createDeck(){
    let deck = [ ];

    for (let i=0; i<4; i++){

        let newCard = randCard();

        //prevents a pair from appearing twice
        while(deck.includes(newCard)){
            newCard=randCard();
        }
        //adds unique card pair to deck (array)
        deck.push( newCard );
        deck.push( newCard );
    }

   shuffle(deck);
   shuffle(deck);

    //creates object to output 
   let deckObject = [ ] ;

   for (let i=0; i<9; i++){
       deckObject.push(
           {
               cardID: 'card'+ i.toString(),
               cardValue: deck[i],
               isFaceDown: false
           }
       )
   }
   return deckObject;
}
