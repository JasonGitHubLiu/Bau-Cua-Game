import React, { useState } from 'react';
import './BauCuaGame.css';

const SYMBOLS = [
  { name: 'deer', imagePath: '/images/baucuadeer.png' },
  { name: 'gourd', imagePath: '/images/baucuagourd.png' },
  { name: 'chicken', imagePath: '/images/baucuachicken.png' },
  { name: 'fish', imagePath: '/images/baucuafish.png' },
  { name: 'crab', imagePath: '/images/baucuacrab.png' },
  { name: 'shrimp', imagePath: '/images/baucuashrimp.png' },
];

const BET_OPTIONS = [1, 5, 10, 20, 50, 100];

function BauCuaGame() {
  const [balance, setBalance] = useState(200);
  const [bet, setBet] = useState(10);
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [rolledSymbols, setRolledSymbols] = useState([]);

  const rollDice = () => {
    let result = [];
    for (let i = 0; i < 3; i++) {
      let randomSymbol =
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)].name;
      result.push(randomSymbol);
    }
    return result;
  };

  const calculateWinnings = (selectedSymbol, rolledSymbols) => {
    let count = 0;
    for (let i = 0; i < rolledSymbols.length; i++) {
      if (selectedSymbol === rolledSymbols[i]) {
        count++;
      }
    }
    return count * bet;
  };

  const displayWinningsMessage = (winnings) => {
    if (winnings > 0) {
      alert(`You won $${winnings}!`);
    } else {
      alert(`You lost $${bet}!`);
    }
  };

  const playGame = () => {
    if (!selectedSymbol) {
      alert('Please select a symbol before playing.');
      return;
    }
    let currentBet = bet;
    if (currentBet > balance) {
      alert("You don't have enough balance to make this bet.");
      return;
    }
    let newBalance = balance - currentBet;
    let rolledSymbols = rollDice();
    setRolledSymbols(rolledSymbols);
    setTimeout(() => {
      let winnings = calculateWinnings(selectedSymbol, rolledSymbols);
      newBalance += winnings;
      setBalance(newBalance);
      displayWinningsMessage(winnings);
    }, 500); // Delay for 3 seconds
  };

  return (
    <div className="BauCuaGame">
      <div>
        <h1>Fish-Prawn-Crab / Bầu cua cá cọp</h1>
      </div>
      <div id="balance-container">
        <span>Balance:</span>
        <span id="balance"> ${balance}</span>
      </div>
      <div id="bet-container">
        <label htmlFor="bet">Bet:</label>
        <select
          id="bet"
          value={bet}
          onChange={(e) => setBet(parseInt(e.target.value))}
        >
          {BET_OPTIONS.map((option) => (
            <option key={option} value={option}>
              ${option}
            </option>
          ))}
        </select>
      </div>
      <br></br>
      <div id="symbols-grid">
        {SYMBOLS.map((symbol, index) => (
          <img
            key={index}
            className={`symbol${
              selectedSymbol === symbol.name ? ' selected' : ''
            }`}
            src={symbol.imagePath}
            alt={symbol.name}
            onClick={() => setSelectedSymbol(symbol.name)}
          />
        ))}
      </div>
      <div id="rolled-symbols">
        {rolledSymbols.map((symbol, index) => (
          <img
            key={index}
            className="rolled-symbol"
            src={SYMBOLS.find((s) => s.name === symbol).imagePath}
            alt={symbol}
          />
        ))}
      </div>
      <div id="buttons-container">
        <button onClick={playGame}>Play</button>
      </div>
    </div>
  );
}

export default BauCuaGame;
