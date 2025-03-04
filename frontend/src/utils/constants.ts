export type Team = "black" | "white";

export type Player = {
  nickname: string;
  team: Team;
  ready: boolean;
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

export type gameMove = [Move | null , Move | null]; 

export interface Room {
  players: [Player, Player]; 
  creator: string;
  turn: Team;
  startGame: boolean;
  board: Piece[]; 
  captures: {
    white: Piece[];
    black: Piece[];
  };
  previousMove: string[];
  gameHistory: gameMove[];
  draw: boolean;
  winner: {
    team: Team;
    way: "timeOver" | "checkMate" | "resignation" ;
  } | null;
};
