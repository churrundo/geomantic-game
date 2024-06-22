// src/types/types.ts
import { ReactNode } from "react";
import { Socket } from "socket.io-client";
// GameState
export type GameState = {
  boardTiles: (string | null)[][];
  player1Hand: string[];
  player2Hand: string[];
  currentPlayer: "player1" | "player2";
  winner: "player1" | "player2" | null;
  diceRolledThisTurn: boolean;
  roomCode: string | null;
};

export type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  sendAction: (action: GameAction) => void;
};

//Socket
export type SocketProviderProps = {
  children: ReactNode;
};

export type SocketContextType = {
  socket: Socket | null;
};

// Actions
export type PlayTileAction = {
  type: "PLAY_TILE";
  payload: { row: number; col: number; figure: string };
};

export type PlayerDiceRollAction = {
  type: "PLAYER_DICE_ROLL";
  payload: { player: "player1" | "player2"; newHand: string[] };
};

export type MergeHandTilesAction = {
  type: "MERGE_HAND_TILES";
  payload: { player: "player1" | "player2"; tileIndices: [number, number] };
};

export type MulliganAction = {
  type: "MULLIGAN";
  payload: { player: "player1" | "player2" };
};

//All Actions
export type GameAction =
  | PlayTileAction
  | PlayerDiceRollAction
  | MergeHandTilesAction
  | MulliganAction;

//Other Types
export type GameProviderProps = {
  children: React.ReactNode;
};
