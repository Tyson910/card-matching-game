import { useState, useEffect } from 'react';
import createDeck from './createDeck.js';
import Card from './Card.js';
import React from 'react';

export default function MatchingGame(){

    const [deck, setDeck] = useState( createDeck() ); 
    const [pairs, setPairs] = useState( 0 );
    const [strikes, setStrikes] = useState( 0 );
    const [warning, setWarning] = useState( 'g' );    
    const [guess1, setGuess1] = useState(''); 
    const [guess2, setGuess2] = useState('');
    
    //shows users the deck for a limited amount of time
    useEffect( ()=> {
        var peek = setTimeout( () => flipAllCards(), 3000 );

        return function cleanup() {
            clearTimeout(peek);
          };
       }

    , [ ])

    //shows all cards in deck
    function flipAllCards(){
        setDeck( deck.map((card) =>{
            card.isFaceDown =true;
            return card;
        }))
       }


    useEffect( ()=>{
        if(guess2){
            cardsMatch()
        }
    }, [guess2])

    function cardsMatch(){
        if (guess1.cardValue === guess2.cardValue){
            setWarning('match!')
            setGuess1('')
            setGuess2('')
            setPairs(pairs + 1)
        }

        else{
            setWarning('strike')
            setStrikes(strikes+1)
            var showPicks = setTimeout( () => flipPicksDown(), 1200 );
            return function cleanup() {
                clearTimeout(showPicks);
              };
        }
}

    //flips a given card up in a deck using .cardID
    function flipPicksDown(){
        setDeck( deck.map((card) =>{
            if(card.cardID === guess1.cardID ||
                card.cardID === guess2.cardID ){
                card.isFaceDown =true;
            }
            return card;
        }
        ))

        setGuess1('');
        setGuess2('');
    
    }

    function guessSaver(guessInput){
        if (guessInput.isFaceDown){

        if(!guess1){
            setGuess1(guessInput)
            guessInput.isFaceDown = false;
            
        }
        else if(guess1.cardID !== guessInput.cardID){
            setGuess2(guessInput)
            guessInput.isFaceDown = false;
        }}
    }


    let deckDisplay = deck.map(item => {
        if(item.cardValue){
        return ( 
        <Card key={item.cardID} cardValue={item.cardValue} 
        isFaceDown={item.isFaceDown}
        onClick={()=> {
             guessSaver(item) 
            }}
        />)}

        else{
          return null;
        }
      });

    return (    
        <div>
        {deckDisplay}
        {warning}
        </div>
    )
}
