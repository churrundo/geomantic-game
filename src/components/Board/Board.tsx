// components/Board/Board.tsx
import React, { useState } from "react";
import Tile from "../Tile";
import { mergeTiles, updateBoard } from "../../utils/gameUtils";
import "./Board.css";

type BoardState = (string | null)[][];
type BoardProps = {
  onTilePlaced: (figure: string) => void;
};

const Board: React.FC<BoardProps> = ({onTilePlaced}) => {
  console.log("Board component rendered");
  const gridSize = 4;
  const initialBoardState: BoardState = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(null)
  );
  const [board, setBoard] = useState<BoardState>(initialBoardState);

  const handleDrop = (row: number, col: number) => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const figure = event.dataTransfer.getData("text/plain");
    console.log(`Tile dropped: ${figure} at row: ${row}, col: ${col}`);
    // Update the board state with the new or merged figure
    setBoard((currentBoard) => {
      console.log("Current board state before drop:", currentBoard); // Log the board state before update

      const targetCell = currentBoard[row][col];
      const newFigure = targetCell ? mergeTiles(targetCell, figure) : figure;
      const updatedBoard = updateBoard(currentBoard, row, col, newFigure);
  
      console.log("Updated board state after drop:", updatedBoard); // Log the board state after update

      // Call onTilePlaced to remove the tile from the hand
      onTilePlaced(figure);
  
      return updatedBoard;
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
