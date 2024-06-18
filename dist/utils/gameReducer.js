import actionHandlers from "./actionHandlers"; // Adjust the import path as needed
const gameReducer = (state, action) => {
    let newState;
    switch (action.type) {
        case "PLAY_TILE":
            newState = actionHandlers.PLAY_TILE(state, action);
            newState.diceRolledThisTurn = false;
            break;
        case "PLAYER_DICE_ROLL":
            newState = actionHandlers.PLAYER_DICE_ROLL(state, action);
            newState.diceRolledThisTurn = true;
            break;
        case "MERGE_HAND_TILES":
            newState = actionHandlers.MERGE_HAND_TILES(state, action);
            break;
        case "MULLIGAN":
            newState = actionHandlers.MULLIGAN(state, action);
            break;
        default:
            newState = state;
    }
    console.log("Updated game state after action:", action.type, newState);
    return newState;
};
export default gameReducer;
