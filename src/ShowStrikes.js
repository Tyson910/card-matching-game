import React from 'react';
import './App.css';

export default function ShowStrikes({strikes}){

    let strikeArray = [ ];
    for (let i=0; i < strikes; i++){
        strikeArray.push(
            {strikeIndex: i,
            strikeEmoji: ' ❌ '
            }
            );
    }

    let strikeDisplay = strikeArray.map( item =>(
        <div className='strike' key={item.strikeIndex}>
        {item.strikeEmoji}
        </div>
    ));

    

    return (
        <div className='strike-container'>
        <div>Strikes</div>
        <div className='strike-display'>
        {strikeDisplay}
        </div>
        </div>
    )
}