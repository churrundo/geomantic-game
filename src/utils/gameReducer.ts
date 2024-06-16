import { GameState } from './../GameContext';
import actionHandlers, {
    PlayTileAction,
    PlayerDiceRollAction,
    MergeHandTilesAction,
    MulliganAction,
  } from './actionHandlers'; // Adjust the import path as needed
  import {  GameAction } from './actionHandlers'; //adjust the import path as needed
  
  const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
      case "PLAY_TILE":
        return actionHandlers.PLAY_TILE(state, action as PlayTileAction);
      case "PLAYER_DICE_ROLL":
        return actionHandlers.PLAYER_DICE_ROLL(state, action as PlayerDiceRollAction);
      case "MERGE_HAND_TILES":
        return actionHandlers.MERGE_HAND_TILES(state, action as MergeHandTilesAction);
      case "MULLIGAN":
        return actionHandlers.MULLIGAN(state, action as MulliganAction);
      default:
        return state;
    }
  };
  
  export default gameReducer;
  