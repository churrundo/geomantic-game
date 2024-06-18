export const checkRowAndCol = (board, position) => {
    const rowWin = board[position.row].every((cell, _, arr) => cell !== null && cell === arr[0]);
    const colWin = board.every((row) => row[position.col] !== null && row[position.col] === board[0][position.col]);
    return rowWin || colWin;
};
const checkDescendingDiagonal = (board) => {
    let initial = board[0][0];
    for (let i = 1; i < board.length; i++) {
        if (board[i][i] === null || board[i][i] !== initial) {
            return false;
        }
    }
    return initial !== null;
};
const checkAscendingDiagonal = (board) => {
    let initial = board[board.length - 1][0];
    for (let i = 1; i < board.length; i++) {
        if (board[board.length - 1 - i][i] === null ||
            board[board.length - 1 - i][i] !== initial) {
            return false;
        }
    }
    return initial !== null;
};
export const checkDiagonals = (board) => {
    return checkDescendingDiagonal(board) || checkAscendingDiagonal(board);
};
