import { mergeTiles, performMulligan, checkForWin } from "./gameUtils";
const playTile = (state, action) => {
    const { row, col, figure } = action.payload;
    console.log(`Playing tile at row: ${row}, col: ${col} with figure: ${figure}`);
    const targetCell = state.boardTiles[row][col];
    console.log(`Target cell before placing tile: ${targetCell}`);
    // If there's already a figure in the target cell, merge them, otherwise just use the new figure.
    const newFigure = targetCell ? mergeTiles(targetCell, figure) : figure;
    console.log(`New figure after merging (if applicable): ${newFigure}`);
    // Create a deep copy of the current board and update the cell with the new figure.
    const newBoardTiles = state.boardTiles.map((rowArr, rowIndex) => rowArr.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
            return newFigure; // Place the new or merged figure.
        }
        return cell; // Keep the existing cell as is.
    }));
    console.log("Updated board state:", newBoardTiles);
    // Determine the hand property name based on the current player
    const currentPlayerHandKey = state.currentPlayer === "player1" ? "player1Hand" : "player2Hand";
    // Filter out the played tile from the current player's hand
    const updatedHand = state[currentPlayerHandKey].filter((tile) => tile !== figure);
    console.log(`Updated hand for ${state.currentPlayer}:`, updatedHand);
    // After placing the tile, check if this move wins the game.
    const hasWon = checkForWin(newBoardTiles, { row, col });
    console.log(`Does this move win the game? ${hasWon}`);
    // Determine the next player.
    const nextPlayer = state.currentPlayer === "player1" ? "player2" : "player1";
    console.log(`Next player: ${nextPlayer}`);
    const updatedState = {
        ...state,
        boardTiles: newBoardTiles,
        [currentPlayerHandKey]: updatedHand,
        currentPlayer: hasWon ? state.currentPlayer : nextPlayer,
        winner: hasWon ? state.currentPlayer : state.winner,
    };
    // Log the updated game state for debugging
    console.log("Updated game state after action:", updatedState);
    return updatedState;
};
// Handle dice roll
const handleDiceRoll = (state, action) => {
    const { player, newHand } = action.payload;
    return player === "player1"
        ? { ...state, player1Hand: newHand }
        : { ...state, player2Hand: newHand };
};
// Merge hand tiles
const mergeHandTiles = (state, action) => {
    const { player, tileIndices } = action.payload;
    const [sourceIndex, targetIndex] = tileIndices.sort((a, b) => a - b); // Ensure indices are in ascending order
    const hand = player === "player1" ? state.player1Hand : state.player2Hand;
    console.log(`Merging tiles at indices: ${sourceIndex}, ${targetIndex}, Figures: ${hand[sourceIndex]}, ${hand[targetIndex]}`);
    // Perform the merge
    const mergedTile = mergeTiles(hand[sourceIndex], hand[targetIndex]);
    console.log(`Result of merge: ${mergedTile}`);
    // Update the hand: place the merged tile at the target index
    let newHand = [...hand];
    if (sourceIndex !== targetIndex) {
        // If dragging onto a different tile, remove the source tile and update the target tile with the merged result
        newHand[targetIndex] = mergedTile; // Update the target position with the merged tile
        newHand.splice(sourceIndex, 1); // Remove the source tile from the hand
    }
    else {
        // If dropped onto itself, just update the tile
        newHand[sourceIndex] = mergedTile;
    }
    console.log(`New hand after merge: ${newHand.join(",")}`);
    return player === "player1"
        ? { ...state, player1Hand: newHand }
        : { ...state, player2Hand: newHand };
};
const handleMulligan = (state, action) => {
    const { player } = action.payload;
    const currentHand = player === "player1" ? state.player1Hand : state.player2Hand;
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
