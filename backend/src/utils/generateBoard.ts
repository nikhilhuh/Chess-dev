import { Piece, Team } from "../models/Types";

export function generateBoard(): Piece[] {
  const initialSetup: { type: Piece["type"]; position: string }[] = [
    { type: "rook", position: "a1" },
    { type: "knight", position: "b1" },
    { type: "bishop", position: "c1" },
    { type: "queen", position: "d1" },
    { type: "king", position: "e1" },
    { type: "bishop", position: "f1" },
    { type: "knight", position: "g1" },
    { type: "rook", position: "h1" },
    { type: "pawn", position: "a2" },
    { type: "pawn", position: "b2" },
    { type: "pawn", position: "c2" },
    { type: "pawn", position: "d2" },
    { type: "pawn", position: "e2" },
    { type: "pawn", position: "f2" },
    { type: "pawn", position: "g2" },
    { type: "pawn", position: "h2" },

    { type: "rook", position: "a8" },
    { type: "knight", position: "b8" },
    { type: "bishop", position: "c8" },
    { type: "queen", position: "d8" },
    { type: "king", position: "e8" },
    { type: "bishop", position: "f8" },
    { type: "knight", position: "g8" },
    { type: "rook", position: "h8" },
    { type: "pawn", position: "a7" },
    { type: "pawn", position: "b7" },
    { type: "pawn", position: "c7" },
    { type: "pawn", position: "d7" },
    { type: "pawn", position: "e7" },
    { type: "pawn", position: "f7" },
    { type: "pawn", position: "g7" },
    { type: "pawn", position: "h7" },
  ];

  const board: Piece[] = initialSetup.map((piece, index) => ({
    type: piece.type,
    position: piece.position,
    team: index < 16 ? "white" : "black",
    hasMoved: false,
  }));

  return board;
}
