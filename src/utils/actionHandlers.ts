import { GameState } from "../GameContext";
import { mergeTiles, performMulligan } from "./gameUtils";

export const addTileToBoard = (state: GameState, payload: { tile: string; row: number; col: number }): GameState => {
    const { tile, row, col } = payload;
    const newBoardTiles = [...state.boardTiles];
    newBoardTiles[row][col] = tile;
    return { ...state, boardTiles: newBoardTiles };
  };
  
  // Handle dice roll
  export const handleDiceRoll = (state: GameState, payload: { player: string; newHand: string[] }): GameState => {
    const { player, newHand } = payload;
    return player === "player1"
      ? { ...state, player1Hand: newHand }
      : { ...state, player2Hand: newHand };
  };
  
  // Merge hand tiles
  export const mergeHandTiles = (state: GameState, payload: { player: string; tileIndices: [number, number] }): GameState => {
    const { player, tileIndices } = payload;
    const hand = player === "player1" ? state.player1Hand : state.player2Hand;
    const [index1, index2] = tileIndices;
  
    const mergedTile = mergeTiles(hand[index1], hand[index2]);
    const newHand = [...hand];
    newHand.splice(index1, 1, mergedTile);
    newHand.splice(index2 > index1 ? index2 - 1 : index2, 1);
  
    return player === "player1"
      ? { ...state, player1Hand: newHand }
      : { ...state, player2Hand: newHand };
  };
  
  export const handleMulligan = (state: GameState, player: 'player1' | 'player2'): GameState => {
    const currentHand = player === 'player1' ? state.player1Hand : state.player2Hand;
    const newHand = performMulligan(currentHand);
  
    return player === 'player1'
      ? { ...state, player1Hand: newHand }
      : { ...state, player2Hand: newHand };
  };