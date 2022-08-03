import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

function Board() {
const calculateWinner = (squares) => {
  const lines = [
    // horizontal win
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical win
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal win
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] && 
      squares[a] === squares[b] && 
      squares[a] === squares[c]
    ) {
      return squares[a]; // return the winning marker
    }
  }
  return null;
};


const [squares, setSquares] = useState(Array(9).fill(null)); 
const [xIsPlaying, setXIsPlaying] = useState(true);
// [null, null, null,
// null, null, null,
// null, null, null]
const winner = calculateWinner(squares);
let status = 'Next player: ' + (xIsPlaying ? 'X' : 'O');

if (winner) {
  status = 'Winner is ' + winner;
}



const handleClick = (i) => {
  const squares_copy = squares.slice();
  if (calculateWinner(squares) || squares[i]) {
    return;
  }
  squares_copy[i] = xIsPlaying ? "X" : "O";
  // if x is playing render the marker to "X"
  setXIsPlaying(!xIsPlaying);
  setSquares(squares_copy);
}

const renderSquare = (i) => { 
  // i is the index to the squares array
  return <Square value={squares[i]} onClick={() => handleClick(i)}/>;
}
 
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(
<Game />,
document.getElementById('root')
);