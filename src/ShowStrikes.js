import React from 'react';
import './App.css';

export default function ShowStrikes({strikes}){

    let strikeArray = [ ];
    for (let i=0; i < strikes; i++){
        strikeArray.push( i);
    }

    let strikeDisplay = strikeArray.map( strikeNum =>(
        <div className='strike' key={strikeNum}>
        <img src='cross-mark-icon-55.png' alt='Strike' />
        </div>
    ));

    

    return (
        <React.Fragment>
        <div>Strikes</div>
        <div className='strike-container'>
        {strikeDisplay}
        </div>
        </React.Fragment>
    )
}