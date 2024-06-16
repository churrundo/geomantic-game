import { GameState } from "../GameContext";
import { mergeTiles, performMulligan, checkForWin } from "./gameUtils";

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

export type GameAction =
  | PlayTileAction
  | PlayerDiceRollAction
  | MergeHandTilesAction
  | MulliganAction;

const playTile = (state: GameState, action: PlayTileAction): GameState => {
  const { row, col, figure } = action.payload;
  const targetCell = state.boardTiles[row][col];
  const newFigure = targetCell ? mergeTiles(targetCell, figure) : figure;

  // Create a deep copy of the current board and update the cell
  const newBoardTiles = state.boardTiles.map((row) => [...row]);
  newBoardTiles[row][col] = newFigure;

  const hasWon = checkForWin(newBoardTiles, { row, col });

  const nextPlayer = state.currentPlayer === "player1" ? "player2" : "player1";

  return hasWon
    ? { ...state, boardTiles: newBoardTiles, winner: state.currentPlayer }
    : { ...state, boardTiles: newBoardTiles, currentPlayer: nextPlayer };
};

// Handle dice roll
const handleDiceRoll = (
  state: GameState,
  action: PlayerDiceRollAction
): GameState => {
  const { player, newHand } = action.payload;
  return player === "player1"
    ? { ...state, player1Hand: newHand }
    : { ...state, player2Hand: newHand };
};

// Merge hand tiles
const mergeHandTiles = (
  state: GameState,
  action: MergeHandTilesAction
): GameState => {
  const { player, tileIndices } = action.payload;
  const [sourceIndex, targetIndex] = tileIndices.sort((a, b) => a - b); // Ensure indices are in ascending order
  const hand = player === "player1" ? state.player1Hand : state.player2Hand;

  console.log(
    `Merging tiles at indices: ${sourceIndex}, ${targetIndex}, Figures: ${hand[sourceIndex]}, ${hand[targetIndex]}`
  );

  // Perform the merge
  const mergedTile = mergeTiles(hand[sourceIndex], hand[targetIndex]);
  console.log(`Result of merge: ${mergedTile}`);

  // Update the hand: place the merged tile at the target index
  let newHand = [...hand];
  if (sourceIndex !== targetIndex) {
    // If dragging onto a different tile, remove the source tile and update the target tile with the merged result
    newHand[targetIndex] = mergedTile; // Update the target position with the merged tile
    newHand.splice(sourceIndex, 1); // Remove the source tile from the hand
  } else {
    // If dropped onto itself, just update the tile
    newHand[sourceIndex] = mergedTile;
  }

  console.log(`New hand after merge: ${newHand.join(",")}`);

  return player === "player1"
    ? { ...state, player1Hand: newHand }
    : { ...state, player2Hand: newHand };
};

const handleMulligan = (
  state: GameState,
  action: MulliganAction
): GameState => {
  const { player } = action.payload;
  const currentHand =
    player === "player1" ? state.player1Hand : state.player2Hand;
  const newHand = performMulligan(currentHand);

  return player === "player1"
    ? { ...state, player1Hand: newHand }
    : { ...state, player2Hand: newHand };
};

const actionHandlers = {
  PLAY_TILE: playTile,
  PLAYER_DICE_ROLL: handleDiceRoll,
  MERGE_HAND_TILES: mergeHandTiles,
  MULLIGAN: handleMulligan,
  // ... add any additional action handlers here ...
};

export default actionHandlers;
