// Merges two binary strings using bitwise XOR operation
export const mergeTiles = (tile1: string, tile2: string): string => {
  const binary1 = tile1.padStart(4, "0");
  const binary2 = tile2.padStart(4, "0");

  // Convert binary strings to numbers
  const num1 = parseInt(binary1, 2);
  const num2 = parseInt(binary2, 2);

  // Perform bitwise XOR and convert back to binary string
  const merged = (num1 ^ num2).toString(2).padStart(4, "0");

  return merged;
};

export const updateBoard = (
  currentBoard: (string | null)[][],
  row: number,
  col: number,
  newFigure: string
): (string | null)[][] => {
  // Create a deep copy of the current board
  const newBoard = currentBoard.map((row) => [...row]);

  // Update the specified cell with the new figure
  newBoard[row][col] = newFigure;

  return newBoard;
};
