import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

export default function ShowStrikes({strikes}){

    let strikeArray = [ ];
    for (let i=0; i < strikes; i++){
        strikeArray.push('❌');
    }

    let strikeDisplay = strikeArray.map( item =>(
        <div className='strike'>
        <img src='cross-mark-icon-55.png' alt='Strike' />
        </div>
    ));

    return strikeDisplay
}