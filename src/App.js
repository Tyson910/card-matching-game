import React from 'react';
import './App.css';
import Card from './Card.js'
//import Clock from './Timer.js'
import MatchingGame from './MatchingGame.js'

function App() {

  return (
    <div className="App">
      <header className="App-header">

        <Card cardValue='9h' isFaceDown={false} />
        <div>
        <MatchingGame />
        </div>
      </header>
    </div>
  );
}

export default App;
