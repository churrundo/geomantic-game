// src/GameContext.ts
import React, { createContext, useContext, useReducer } from "react";
import gameReducer from "./utils/gameReducer";
import { GameState, GameProviderProps, GameContextType } from "./types/types"; // Adjust the import path as needed

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

export const initialState: GameState = {
  boardTiles: Array(4).fill(null).map(() => Array(4).fill(null)),
  player1Hand: [],
  player2Hand: [],
  currentPlayer: "player1",
  winner: null,
  diceRolledThisTurn: false,
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
