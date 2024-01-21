import React, { useState } from 'react';
import './Board.css';

type BoardState = (string | null)[][];

const Board: React.FC = () => {
  const gridSize = 4;
  const initialBoardState: BoardState = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));
  const [board, setBoard] = useState<BoardState>(initialBoardState);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, row: number, col: number) => {
    event.preventDefault();
    const figure = event.dataTransfer.getData("figure");

    // Update the board state with the new figure
    setBoard(currentBoard => {
      // Clone the current board
      const newBoard = currentBoard.map(innerArray => innerArray.slice());
      // Update the specific cell
      newBoard[row][col] = figure;
      return newBoard;
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Necessary to allow dropping
  };

  return (
    <div className="board">
      {board.map((row: (string | null)[], rowIndex: number) =>
        row.map((cell: string | null, colIndex: number) => (
          <div 
            key={`${rowIndex}-${colIndex}`} 
            className="board-cell" 
            onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
            onDragOver={handleDragOver}
          >
            {cell}
          </div>
        ))
      )}
    </div>
  );
};

export default Board;
