import React, { createContext, useReducer } from "react";
import {
  addTileToBoard,
  handleDiceRoll,
  mergeHandTiles,
  handleMulligan,
} from "./utils/actionHandlers"; // adjust import path
type GameContextType = {
  state: typeof initialState;
  dispatch: React.Dispatch<any>; // You can define a more specific type for your actions
};

export type GameState = {
  boardTiles: (string | null)[][];
  player1Hand: string[];
  player2Hand: string[];
};

export type GameAction =
  | {
      type: "ADD_TILE_TO_BOARD";
      payload: { tile: string; row: number; col: number };
    }
  | {
      type: "PLAYER_DICE_ROLL";
      payload: { player: "player1" | "player2"; newHand: string[] };
    }
  | {
      type: "MERGE_HAND_TILES";
      payload: { player: "player1" | "player2"; tileIndices: [number, number] };
    }
  | {
      type: "MULLIGAN";
      payload: { player: "player1" | "player2" };
    };

type GameProviderProps = {
  children: React.ReactNode;
};

// Define the shape of your game's state
const initialState: GameState = {
  boardTiles: Array(4)
    .fill(null)
    .map(() => Array(4).fill(null)),
  player1Hand: [],
  player2Hand: [],
};

// Create a context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Define a reducer for state updates
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "ADD_TILE_TO_BOARD":
      return addTileToBoard(state, action.payload);
    case "PLAYER_DICE_ROLL":
      return handleDiceRoll(state, action.payload);
    case "MERGE_HAND_TILES":
      return mergeHandTiles(state, action.payload);
    case "MULLIGAN":
      return handleMulligan(state, action.payload.player);
    default:
      return state;
  }
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
