import React, { createContext, useContext, useReducer } from "react";
import gameReducer from "./utils/gameReducer";

type GameContextType = {
  state: typeof initialState;
  dispatch: React.Dispatch<any>; // You can define a more specific type for your actions
};

type GameProviderProps = {
  children: React.ReactNode;
};

export type GameState = {
    boardTiles: (string | null)[][];
    player1Hand: string[];
    player2Hand: string[];
    currentPlayer: "player1"|"player2"
  };
  

// Define the shape of your game's state
const initialState: GameState = {
  boardTiles: Array(4)
    .fill(null)
    .map(() => Array(4).fill(null)),
  player1Hand: [],
  player2Hand: [],
  currentPlayer: "player1",
};

// Create a context
export const GameContext = createContext<GameContextType | undefined>(undefined);
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
// Context provider component
export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
  
    return (
      <GameContext.Provider value={{ state, dispatch }}>
        {children}
      </GameContext.Provider>
    );
  };