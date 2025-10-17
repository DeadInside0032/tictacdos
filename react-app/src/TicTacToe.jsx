import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // with custom childish styles

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [nextPlayer, setNextPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const reset = () => toast.warn("Game restarted!",{
    autoClose: 1000,
    theme: "dark"
  });
  const surrender = () => toast.error("You surrendered, opponent wins!",{
    autoClose: 3000,
    theme: "colored"
  });

  const postResult = async (result) => {
    await fetch('http://localhost:3000/api/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ result })
    });
  };

  const getResults = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/results');
      const data = await response.json();
      console.log('Previous game results:', data);
      return data;
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const calculateWinner = function(bd) {
    const lines = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // cols
      [0,4,8], [2,4,6]           // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a,b,c] = lines[i];
      if (bd[a] && bd[a] === bd[b] && bd[a] === bd[c]) {
        return bd[a];
      }
    }
    return null;
  };

  const handleClick = (idx) => {
    if (board[idx] || winner) return;
    const newBoard = board.slice();
    newBoard[idx] = nextPlayer;

    setBoard(newBoard);
    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      toast(`${win} wins!`);
      postResult(`${win} wins`);
      setNextPlayer(prev => prev); // no change after end
    } else if (!newBoard.includes(null)) {
      toast('Draw!');
      postResult('Draw');
      setNextPlayer(prev => prev);
    } else {
      setNextPlayer(prev => (prev === 'X' ? 'O' : 'X'));
    }
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setNextPlayer('X');
    setWinner(null);
  };

  const handleSurrender = () => {
    if (!winner) {
      const surrenderedBy = nextPlayer; // the player who would play next surrenders
      const victor = surrenderedBy === 'X' ? 'O' : 'X';
      setWinner(victor);
      toast(`${victor} wins by surrender`);
      postResult(`${victor} wins by surrender`);
    }
  };

return (
  <div className="gameContainer">
    <h1>TicTacToe!</h1>
    <div className="grid">
      {
        [0,1,2].map(row => (
          <div className="board-row" key={row}>
            {[0,1,2].map(col => {
              const idx = row * col // TODO - recalculate button address index
              return (
                <button 
                  key="idx" 
                  className="square" 
                  
                >
                  {board?.idx} {/* TODO */}
                </button>
              );
            })}
          </div>
        ))
      }
    </div>
    <div className="controls">
      <button onClick={reset}>Restart</button>
      <button onClick={surrender}>Surrender</button>
    </div>
      <ToastContainer 
        position="top-center"
      />
  </div>
);
}

export default TicTacToe;
