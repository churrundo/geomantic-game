import React from "react";
import Tile from "../Tile";
import { useGameContext } from "../../GameContext";
import "./Board.css";
const Board = ({ boardTiles }) => {
    const { dispatch } = useGameContext();
    const handleTileDrop = (row, col) => (event) => {
        event.preventDefault();
        const dragData = JSON.parse(event.dataTransfer.getData("application/json"));
        const { figure } = dragData; // Extract the figure from the parsed data
        // Dispatch PLAY_TILE action
        dispatch({
            type: "PLAY_TILE",
            payload: { row, col, figure },
        });
    };
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    return (<div className="board">
      {boardTiles.map((row, rowIndex) => row.map((cell, colIndex) => (<div key={`${rowIndex}-${colIndex}`} className="board-cell" onDrop={handleTileDrop(rowIndex, colIndex)} onDragOver={handleDragOver}>
            {cell && <Tile figure={cell}/>}
          </div>)))}
    </div>);
};
export default Board;
