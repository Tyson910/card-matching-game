import { useState } from 'react';
import React from 'react'
import MatchingGame from './MatchingGame.js';
import Rules from './Rules.js'


export default function Lost(){
    const [replay, setReplay] = useState('');

    if(replay === 'play'){
        return <MatchingGame />
    }
    else if(replay === 'rules'){
        return <Rules />
    }
    else{
        return (
            <React.Fragment>
                <div>
                Sorry, you Lost
                </div>
                
                <button className='button-nav' id='replay-button' 
                onClick={()=> {setReplay('play')}} >
                Play Again
                </button>

                                
                <button className='button-nav' id='replay-button' 
                onClick={()=> {setReplay('rules')}} >
                View Rules
                </button>
            
            </React.Fragment>
        )

    }

}