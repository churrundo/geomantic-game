import React, { useState, useCallback } from "react";
import Board from "./components/Board";
import Hand from "./components/Hand";
import Dice from "./components/Dice";
import { GameProvider } from "./GameContext";

const App = () => {
  const [handTiles, setHandTiles] = useState<string[]>([]);

  const handleDiceRoll = (figures: string[]) => {
    console.log("Dice rolled, new figures:", figures);
    setHandTiles(figures);
  };
  const removeTileFromHand = useCallback((figure: string) => {
    setHandTiles((prevTiles) => prevTiles.filter((tile) => tile !== figure));
  }, []);

  return (
    <GameProvider>
      <div className="App">
        <h1>Geomantic Game</h1>
        <Board onTilePlaced={removeTileFromHand} />
        <Dice onRoll={handleDiceRoll} />
        <Hand tiles={handTiles} setTiles={setHandTiles} />
      </div>
    </GameProvider>
  );
};

export default App;
