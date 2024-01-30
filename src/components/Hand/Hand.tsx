import React from "react";
import Tile from "../Tile";
import { useGameContext } from "../../GameContext"; // Import the hook
import "./Hand.css";

type HandProps = {
  tiles: string[];
};

const Hand: React.FC<HandProps> = ({tiles}) => {
  const { state, dispatch } = useGameContext();
  const currentHand =
    state.currentPlayer === "player1" ? state.player1Hand : state.player2Hand;

  const handleDragStart = (
    event: React.DragEvent,
    figure: string,
    index: number
  ) => {
    const dragData = JSON.stringify({ figure, index });
    event.dataTransfer.setData("application/json", dragData);
  };

  const handleTileDrop = (targetIndex: number) => (event: React.DragEvent) => {
    event.preventDefault();
    const dragData = JSON.parse(event.dataTransfer.getData("application/json"));
    if (dragData && dragData.index !== targetIndex) {
      // Dispatch merge action
      dispatch({
        type: "MERGE_HAND_TILES",
        payload: {
          player: state.currentPlayer,
          tileIndices: [dragData.index, targetIndex],
        },
      });
    }
  };

  return (
    <div className="hand">
      {currentHand.map((figure, index) => (
        <Tile
          key={`${figure}-${index}`}
          figure={figure}
          onDragStart={(event) => handleDragStart(event, figure, index)}
          onDrop={() => handleTileDrop(index)}
        />
      ))}
    </div>
  );
};

export default Hand;
