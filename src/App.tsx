// App.tsx
import React, { useCallback } from "react";
import Board from "./components/Board";
import Hand from "./components/Hand";
import Dice from "./components/Dice";
import RoomCode from './components/RoomCode';
import { useGameContext } from "./GameContext";
import "./App.css"

const App = () => {
  const { state, dispatch } = useGameContext();
  const { boardTiles, player1Hand, player2Hand, currentPlayer, diceRolledThisTurn } = state;

  const handleDiceRoll = useCallback((figures: string[]) => {
    if (diceRolledThisTurn) {
      console.log("Dice already rolled for this turn.");
      return;
    }
    dispatch({ type: "PLAYER_DICE_ROLL", payload: { player: currentPlayer, newHand: figures } });
  }, [dispatch, currentPlayer, diceRolledThisTurn]);

  return (
    <div className="App">
      <h1>Geomantic Game</h1>
      <div className="game-area">
        <Hand tiles={player1Hand} player="player1" currentPlayer={currentPlayer} />
        <Board boardTiles={boardTiles} />
        <Hand tiles={player2Hand} player="player2" currentPlayer={currentPlayer} />
      </div>
      <Dice onRoll={handleDiceRoll} canRoll={!diceRolledThisTurn} />
      <RoomCode />
    </div>
  );
};

export default App;
