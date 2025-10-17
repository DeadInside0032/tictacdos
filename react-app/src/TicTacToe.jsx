import React, { useState } from 'react';
// npm install express cors react-toastify
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
    // TODO - implement backend POST
    await fetch('/api/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ result })
    });
  };
  // TODO - implement backend GET: query previous match results

  const calculateWinner = function(board) {/* TODO - implement */}

  const handleClick = (idx) => {
    //TODO - if (board[idx] || winner) return;
    const newBoard = board.slice();
    newBoard[idx] = 'X'; // TODO
    
    setBoard(newBoard);
    setNextPlayer('O'); // TODO
    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      //toast(`${win} wins!`);
      //postResult(`${win} wins`);
    } else if (!newBoard.includes(null)) {
      //toast('Draw!');
      //postResult('Draw');
    }
  };

  const handleRestart = () => {/* TODO */};

  const handleSurrender = () => {
    if (!winner) {/* TODO */}
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
