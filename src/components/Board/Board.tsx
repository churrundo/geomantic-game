// components/Board/Board.tsx
import React, { useState } from "react";
import Tile from "../Tile";
import { mergeTiles, updateBoard } from "../../utils/gameUtils";
import "./Board.css";

type BoardState = (string | null)[][];

const Board: React.FC = () => {
  const gridSize = 4;
  const initialBoardState: BoardState = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(null)
  );
  const [board, setBoard] = useState<BoardState>(initialBoardState);

  const handleDrop = (row: number, col: number) => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const figure = event.dataTransfer.getData("text/plain");
      // Update the board state with the new or merged figure
      setBoard((currentBoard) => {
        const targetCell = currentBoard[row][col];
        const newFigure = targetCell ? mergeTiles(targetCell, figure) : figure;
        return updateBoard(currentBoard, row, col, newFigure);
      });
    };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        console.log("Row: ", row); // Debugging
        return row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="board-cell"
            onDrop={handleDrop(rowIndex, colIndex)}
            onDragOver={handleDragOver}
          >
            {cell && (
              <Tile figure={cell} onDragStart={() => {}} onDrop={() => {}} />
            )}
          </div>
        ));
      })}
    </div>
  );
};

export default Board;
