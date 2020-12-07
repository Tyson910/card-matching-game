import React from 'react';


export default function ShowStrikes({strikes}){

    let strikeArray = [ ];
    for (let i=0; i < strikes; i++){
        strikeArray.push(
            {strikeIndex: 'strike' + i.toString(),
            strikeEmoji: ' ❌ '
            }
            );
    }

    let strikeDisplay = strikeArray.map( item =>(
        <div className='strike' key={item.strikeIndex} 
        id={item.strikeIndex} >
        {item.strikeEmoji}
        </div>
    ));

    

    return (
        <div className='strike-container'>
        <div id='strikes-title'>Strikes</div>
        {strikeDisplay}
        </div>

    )
}