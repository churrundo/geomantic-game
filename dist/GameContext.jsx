import React, { createContext, useContext, useReducer } from "react";
import gameReducer from "./utils/gameReducer";
// Define the shape of your game's state
const initialState = {
    boardTiles: Array(4)
        .fill(null)
        .map(() => Array(4).fill(null)),
    player1Hand: [],
    player2Hand: [],
    currentPlayer: "player1",
    winner: null,
    diceRolledThisTurn: false,
};
// Create a context
export const GameContext = createContext(undefined);
export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGameContext must be used within a GameProvider");
    }
    return context;
};
// Context provider component
export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    return (<GameContext.Provider value={{ state, dispatch }}>
        {children}
      </GameContext.Provider>);
};
