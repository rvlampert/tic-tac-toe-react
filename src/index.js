import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const PlayAgainButton = (props) => {
  return (
    <button 
      className='playAgainButton'
      onClick = {props.onClickEvent}
    >
      Play Again
    </button>
  );
}; 

const SquareButton = (props) => {
  return (
    <button 
      className='squareButton'
      onClick = {props.onClickEvent}
    >
      {props.value} 
    </button>
  );
}; 

const Board = () => {
  const initialSquares = Array(9).fill(null);

  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true)

  const winner = calculateWinner(squares);
  const status = winner ?
    `Winner: ${winner}` :
    `Player: ${xIsNext ? 'X' : 'O'}`;
  
  const handleSquareButtonEvent = (i) => {
    const newSquares = [...squares]

    const declareWinner = Boolean(calculateWinner(newSquares))
    const squareFilled = Boolean(newSquares[i])
    if (declareWinner || squareFilled){
      return;
    }

    newSquares[i] = xIsNext ? 'X' : 'O';

    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handlePlayAgainButtonEvent = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderSquareButton = (i) => {
    return (
      <SquareButton 
      value={squares[i]}
      onClickEvent={() => handleSquareButtonEvent(i)}
      />
    );
  };

  const board_item = 
    <div>
      <div className='statusSession'>{status}</div>
      <div className='board-row'>
        {renderSquareButton(0)}{renderSquareButton(1)}{renderSquareButton(2)}
      </div>
      <div className='board-row'>
        {renderSquareButton(3)}{renderSquareButton(4)}{renderSquareButton(5)}
      </div>
      <div className='board-row'>
        {renderSquareButton(6)}{renderSquareButton(7)}{renderSquareButton(8)}
      </div>
      {
        winner ? 
        <div className='playAgainSession'>
          <PlayAgainButton
            onClickEvent={() => handlePlayAgainButtonEvent()}
          />
        </div> : null
      }
    </div>;
  return (board_item);
}; 

const Game = () => {
  return (
    <div className="game" >
      Tic-Tac-Toe
      <Board />
    </div>
  );
};

ReactDOM.render (
  <Game />,
  document.getElementById('root')
)  


function calculateWinner(squares) {
  const lines = [
    [0,1,2], [3,4,5],[6,7,8], //rows
    [0,3,6], [1,4,7],[2,5,8], //colluns
    [0,4,8], [2,4,6] //diagoals
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && 
      squares[a] === squares[b] &&
      squares[a] === squares[c]
      )
      return squares[a];
  }

  return null;
}