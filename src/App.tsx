import React, { useCallback } from "react";
import Board from "./components/Board";
import Hand from "./components/Hand";
import Dice from "./components/Dice";
import { GameProvider, useGameContext } from "./GameContext";

const App = () => {
  const { state, dispatch } = useGameContext();
  const { boardTiles, currentPlayer, player1Hand, player2Hand } = state;
  const currentHand = currentPlayer === "player1" ? player1Hand : player2Hand;

  const handleDiceRoll = useCallback((figures: string[]) => {
    // Dispatch an action to update the hand tiles in the global state
    dispatch({ type: "PLAYER_DICE_ROLL", payload: { player: currentPlayer, newHand: figures } });
  }, [currentPlayer]); // Only currentPlayer is the dependency

  return (
    <GameProvider>
      <div className="App">
        <h1>Geomantic Game</h1>
        <Board boardTiles={boardTiles} />
        <Dice onRoll={handleDiceRoll} />
        <Hand tiles={currentHand} />
      </div>
    </GameProvider>
  );
};

export default App;
