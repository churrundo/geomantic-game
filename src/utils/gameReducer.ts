import { GameState } from "./../GameContext";
import actionHandlers, {
  PlayTileAction,
  PlayerDiceRollAction,
  MergeHandTilesAction,
  MulliganAction,
} from "./actionHandlers"; // Adjust the import path as needed
import { GameAction } from "./actionHandlers"; //adjust the import path as needed

const gameReducer = (state: GameState, action: GameAction): GameState => {
  let newState: GameState;

  switch (action.type) {
    case "PLAY_TILE":
      newState = actionHandlers.PLAY_TILE(
        state, 
        action as PlayTileAction);
      newState.diceRolledThisTurn = false;
      break;
    case "PLAYER_DICE_ROLL":
      newState = actionHandlers.PLAYER_DICE_ROLL(
        state,
        action as PlayerDiceRollAction
      );
      newState.diceRolledThisTurn = true;
      break;
    case "MERGE_HAND_TILES":
      newState = actionHandlers.MERGE_HAND_TILES(
        state,
        action as MergeHandTilesAction
      );
      break;
    case "MULLIGAN":
      newState = actionHandlers.MULLIGAN(
        state,
        action as MulliganAction);
      break;
    default:
      newState = state;
  }

  console.log("Updated game state after action:", action.type, newState);

  return newState;
};
export default gameReducer;
