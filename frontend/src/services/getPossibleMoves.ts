import { Piece } from "../utils/constants";

// Chess board representation
const boardSize = 8;
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];

// Function to convert board notation (e.g., "c3") into (row, col) index
const getPositionIndex = (position: string): [number, number] | null => {
  const file = position[0]; // Letter (column)
  const rank = position[1]; // Number (row)

  const col = files.indexOf(file);
  const row = ranks.indexOf(rank);

  return col !== -1 && row !== -1 ? [row, col] : null;
};

// Function to convert (row, col) index into board notation (e.g., "c3")
const getPositionNotation = (row: number, col: number): string | null => {
  if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
    return files[col] + ranks[row];
  }
  return null;
};

// Function to get the piece at a specific position
const getPieceAtPosition = (
  position: string,
  board: Piece[]
): Piece | null => {
  return board.find((piece) => piece.position === position) || null;
};

// Function to calculate possible moves
export const getPossibleMoves = (
  piece: Piece["type"],
  position: Piece["position"],
  team: Piece["team"],
  board: Piece[] // Accept the board as a flat array
): string[] => {
  let possibleMoves: string[] = [];

  const index = getPositionIndex(position);
  if (!index) return possibleMoves;

  const [row, col] = index;

  switch (piece.toLowerCase()) {
    case "pawn":
      handlePawnMoves(row, col, team, possibleMoves, board);
      break;
    case "rook":
      handleRookMoves(row, col, team, possibleMoves, board);
      break;
    case "knight":
      handleKnightMoves(row, col, team, possibleMoves, board);
      break;
    case "bishop":
      handleBishopMoves(row, col, team, possibleMoves, board);
      break;
    case "queen":
      handleQueenMoves(row, col, team, possibleMoves, board);
      break;
    case "king":
      handleKingMoves(row, col, team, possibleMoves, board);
      break;
  }

  return possibleMoves;
};

// Pawn moves
const handlePawnMoves = (
  row: number,
  col: number,
  team: string,
  possibleMoves: string[],
  board: Piece[]
) => {
  const direction = team === "white" ? 1 : -1; // White moves up, Black moves down

  // Single step forward
  const singleStep = getPositionNotation(row + direction, col);
  if (singleStep && !getPieceAtPosition(singleStep, board)) {
    addMoveIfValid(row + direction, col, possibleMoves);

    // Double step forward (only on starting row)
    if ((team === "white" && row === 1) || (team === "black" && row === 6)) {
      const doubleStep = getPositionNotation(row + 2 * direction, col);
      if (doubleStep && !getPieceAtPosition(doubleStep, board)) {
        addMoveIfValid(row + 2 * direction, col, possibleMoves);
      }
    }
  }

  // Diagonal captures
  const captureMoves = [
    [row + direction, col - 1], // Left diagonal
    [row + direction, col + 1], // Right diagonal
  ];

  for (const [r, c] of captureMoves) {
    const capturePosition = getPositionNotation(r, c);
    if (capturePosition && isOpponentPiece(capturePosition, team, board)) {
      addMoveIfValid(r, c, possibleMoves);
    }
  }
};

// Rook moves (straight lines)
const handleRookMoves = (
  row: number,
  col: number,
  team: string,
  possibleMoves: string[],
  board: Piece[]
) => {
  addLinearMoves(row, col, team, possibleMoves, [
    [1, 0], // Down
    [-1, 0], // Up
    [0, 1], // Right
    [0, -1], // Left
  ], board);
};

// Bishop moves (diagonals)
const handleBishopMoves = (
  row: number,
  col: number,
  team: string,
  possibleMoves: string[],
  board: Piece[]
) => {
  addLinearMoves(row, col, team, possibleMoves, [
    [1, 1], // Down-right
    [1, -1], // Down-left
    [-1, 1], // Up-right
    [-1, -1], // Up-left
  ], board);
};

// Queen moves (rook + bishop combined)
const handleQueenMoves = (
  row: number,
  col: number,
  team: string,
  possibleMoves: string[],
  board: Piece[]
) => {
  handleRookMoves(row, col, team, possibleMoves, board);
  handleBishopMoves(row, col, team, possibleMoves, board);
};

// King moves (one step in any direction)
const handleKingMoves = (
  row: number,
  col: number,
  team: string,
  possibleMoves: string[],
  board: Piece[]
) => {
  const moves = [
    [1, 0], // Down
    [-1, 0], // Up
    [0, 1], // Right
    [0, -1], // Left
    [1, 1], // Down-right
    [1, -1], // Down-left
    [-1, 1], // Up-right
    [-1, -1], // Up-left
  ];

  for (const [dr, dc] of moves) {
    const r = row + dr;
    const c = col + dc;
    const movePosition = getPositionNotation(r, c);
    if (movePosition && (isSquareEmpty(movePosition, board) || isOpponentPiece(movePosition, team, board))) {
      addMoveIfValid(r, c, possibleMoves);
    }
  }
};

// Knight moves (L-shape)
const handleKnightMoves = (
  row: number,
  col: number,
  team: string,
  possibleMoves: string[],
  board: Piece[]
) => {
  const moves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  for (const [dr, dc] of moves) {
    const r = row + dr;
    const c = col + dc;
    const movePosition = getPositionNotation(r, c);
    if (movePosition && (isSquareEmpty(movePosition, board) || isOpponentPiece(movePosition, team, board))) {
      addMoveIfValid(r, c, possibleMoves);
    }
  }
};

// Function to add linear moves (used for Rook, Bishop, Queen)
const addLinearMoves = (
  row: number,
  col: number,
  team: string,
  possibleMoves: string[],
  directions: number[][],
  board: Piece[]
) => {
  for (const [dr, dc] of directions) {
    let r = row + dr;
    let c = col + dc;
    while (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
      const movePosition = getPositionNotation(r, c);
      if (!movePosition) break;

      const pieceAtPosition = getPieceAtPosition(movePosition, board);
      if (!pieceAtPosition) {
        addMoveIfValid(r, c, possibleMoves);
      } else {
        if (pieceAtPosition.team !== team) {
          addMoveIfValid(r, c, possibleMoves); // Can capture opponent's piece
        }
        break; // Stop further moves in this direction
      }
      r += dr;
      c += dc;
    }
  }
};

// Function to add a move if it's within the board boundaries
const addMoveIfValid = (
  row: number,
  col: number,
  possibleMoves: string[]
) => {
  const move = getPositionNotation(row, col);
  if (move) possibleMoves.push(move);
};

// Helper function to check if a square is empty
const isSquareEmpty = (
  position: string,
  board: Piece[]
): boolean => {
  return !getPieceAtPosition(position, board);
};

// Helper function to check if a square contains an opponent's piece
const isOpponentPiece = (
  position: string,
  team: string,
  board: Piece[]
): boolean => {
  const piece = getPieceAtPosition(position, board);
  return piece !== null && piece.team !== team;
};