import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import MatchingGame from './MatchingGame.js'
import SaveScore from './SaveScore.js'

function App() {
  const [score, setScore]= useState('');

  return (
    <div className="App">
      <header className="App-header">
        <div>
        <MatchingGame />
        </div>
        <div>
          <SaveScore />
        </div>
      </header>
    </div>
  );
}

export default App;
