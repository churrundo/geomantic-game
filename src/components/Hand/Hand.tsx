import React from "react";
import Tile from "../Tile";
import { useGameContext } from "../../GameContext"; // Import the hook
import "./Hand.css";

type HandProps = {
  tiles: string[];
  player: "player1" | "player2";
  currentPlayer: "player1" | "player2";
};

const Hand: React.FC<HandProps> = ({ player, currentPlayer }) => {
  const { state, dispatch } = useGameContext();
  const tiles = player === "player1" ? state.player1Hand : state.player2Hand;

  const handleDragStart =
    (figure: string, index: number) => (event: React.DragEvent) => {
      const dragData = JSON.stringify({ figure, index });
      console.log("Setting drag data:", dragData);
      event.dataTransfer.setData("application/json", dragData);
    };

  const handleDrop = (targetIndex: number) => (event: React.DragEvent) => {
    event.preventDefault();
    const dragData = JSON.parse(event.dataTransfer.getData("application/json"));
    console.log("Parsed drag data:", dragData);
    const sourceIndex = dragData.index;
    if (sourceIndex !== targetIndex) {
      console.log("Dispatching MERGE_HAND_TILES with payload:", {
        player,
        tileIndices: [sourceIndex, targetIndex],
      });
      dispatch({
        type: "MERGE_HAND_TILES",
        payload: {
          player,
          tileIndices: [sourceIndex, targetIndex],
        },
      });
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault(); // Necessary to allow dropping
  };

  return (
    <div className={`hand ${currentPlayer === player ? "current-player" : ""}`}>
      {tiles.map((tile, index) => (
        <Tile
          key={`${tile}-${index}`}
          figure={tile}
          onDragStart={handleDragStart(tile, index)}
          onDragOver={handleDragOver}
          onDrop={handleDrop(index)}
        />
      ))}
    </div>
  );
};

export default Hand;
