import React, { useState, useEffect, useCallback } from "react";
import Square from "./Square";

function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = useCallback(() => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return i;
      }
    }
    return null;
  }, [board]);

  const checkTie = useCallback(() => {
    return board.every((square) => square !== null);
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || winner || gameOver) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setPlayer(player === "X" ? "O" : "X");
  };

  useEffect(() => {
    const winningLine = checkWinner();
    if (winningLine !== null) {
      setWinner(winningLine);
      setGameOver(true);
      setTimeout(() => {
        setBoard(Array(9).fill(null));
        setPlayer("X");
        setWinner(null);
        setGameOver(false);
      }, 2000);
    }
  }, [board, checkWinner, checkTie]);

  const renderSquare = (index) => {
    return (
      <Square
        value={board[index]}
        onClick={() => handleClick(index)}
      />
    );
  };
  
  const getStatus = () => {
    if (typeof winner === "number") {
      return `Winner: ${player === "X" ? "O" : "X"} (line ${winner + 1})`;
    }
    else if (winner === "Tie") {
      return "It's a tie!";
    }
    else {
      return `Next player: ${player}`;
    }
  };
  
  return (
    <div className="board">
      <div className="status">{getStatus()}</div>
      <div className="grid">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

export default Board;


