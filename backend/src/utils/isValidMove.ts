import { Piece, Room } from "../models/Types";
import { getPossibleMoves } from "./getPossibleMoves"; // Import move logic

export const isValidMove = (
  piece: Piece["type"],
  initialPosition: string,
  finalPosition: string,
  team: Piece['team'],
  board: Piece[] 
): boolean => {
  // Get possible moves instead of modifying room
  const possibleMoves = getPossibleMoves(piece, initialPosition, team , board);

  // Check if finalPosition is in the possible moves list
  return possibleMoves.includes(finalPosition);
};
