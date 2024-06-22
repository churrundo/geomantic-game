// src/GameContext.ts
import React, { createContext, useContext, useReducer, useEffect } from "react";
import gameReducer from "./utils/gameReducer";
import {
  GameState,
  GameProviderProps,
  GameContextType,
  GameAction,
} from "./types/types";
import { io } from "socket.io-client";

const GameContext = createContext<GameContextType | undefined>(undefined);
const socket = io("http://localhost:4000");

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

export const initialState: GameState = {
  roomCode: null,
  boardTiles: Array(4)
    .fill(null)
    .map(() => Array(4).fill(null)),
  player1Hand: [],
  player2Hand: [],
  currentPlayer: "player1",
  winner: null,
  diceRolledThisTurn: false,
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    // Listen for game actions from the server
    socket.on("gameAction", (action) => {
      dispatch(action);
    });

    // Listen for room creation success
    socket.on("roomCreated", (roomId) => {
      console.log(`Room created with ID: ${roomId}`);
      // Handle state updates or UI changes here
    });

    // Listen for successful room join
    socket.on("joinSuccess", (roomId) => {
      console.log(`Successfully joined room: ${roomId}`);
      // Handle state updates or UI changes here
    });

    // Handle errors (like room full or not found)
    socket.on("error", (error) => {
      console.error(`Socket error: ${error}`);
      // Handle state updates or UI changes here
    });

    // Clean up on unmount
    return () => {
      socket.off("gameAction");
      socket.off("roomCreated");
      socket.off("joinSuccess");
      socket.off("error");
    };
  }, []);

  // Function to send actions to the server
  const sendAction = (action: GameAction) => {
    socket.emit("gameAction", action);
  };

  return (
    <GameContext.Provider value={{ state, dispatch, sendAction }}>
      {children}
    </GameContext.Provider>
  );
};
