import React from 'react';
import { useState } from 'react';
import MatchingGame from './MatchingGame.js';
import Rules from './Rules.js';

export default function Start(){
    
    const [fauxRoute, setFauxRoute] = useState('')

    switch (fauxRoute){

        case 'newGame':
        return <MatchingGame />;
        

        case 'rules':
        return <Rules />;
        

    default :
    return ( 
            <React.Fragment>
            <h2>Welcome</h2>

            <div className='start-nav'>
            <button className='button-nav' onClick={()=> {
                setFauxRoute('rules')}}> 
                Game Rules
                </button>

            <button className='button-nav' onClick={()=> {
                setFauxRoute('newGame')}}>
                New Game
                </button>

            <a className='button-nav' href='scores.php' > High Scores </a>

            </div>

            </React.Fragment>

    );
    }

}