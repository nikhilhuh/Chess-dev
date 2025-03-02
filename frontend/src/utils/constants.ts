export type Team = "black" | "white";

export type Player = {
  nickname: string;
  team: Team;
};

export type Piece = {
  type: "pawn" | "knight" | "bishop" | "rook" | "queen" | "king";
  team: Team;
  position: string;
  hasMoved?: boolean; 
};

export type Move = {
  piece: string;
  initialPosition: string; 
  finalPosition: string; 
};

export type gameMove = [Move , Move];

export interface Room {
  players: [Player, Player]; 
  creator: string;
  turn: Team;
  board: Piece[]; 
  previousMove: string[];
  gameHistory: gameMove[];
  draw: boolean;
  winner: {
    team: Team;
    way: "timeOver" | "checkMate" | "resignation" ;
  } | null;
};
