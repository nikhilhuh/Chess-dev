import express, { Request, Response } from "express";
import cors from "cors";
import { io } from "../../socket/socketSetUp";
import { rooms } from "../../utils/room";
import { switchTurn } from "../../utils/switchTurn";
import { checkWinner } from "../../utils/checkWinner";
import { isValidMove } from "../../utils/isValidMove";
import { Move, Player, Room } from "../../models/Types";

const router = express.Router();

router.use(cors({ origin: process.env.FRONTEND_URL, methods: ["POST"] }));

// Mapping of piece types to Unicode symbols
const pieceSymbols: Record<string, { white: string; black: string }> = {
  pawn: { white: "♙", black: "♟" },
  knight: { white: "♘", black: "♞" },
  bishop: { white: "♗", black: "♝" },
  rook: { white: "♖", black: "♜" },
  queen: { white: "♕", black: "♛" },
  king: { white: "♔", black: "♚" },
};

router.post("/make-move", (req: Request, res: Response) => {
  const { roomId, piece, nickname, initialPosition, finalPosition } = req.body;

  if (!roomId || !nickname || !piece || !initialPosition || !finalPosition) {
    res.status(400).json({
      success: false,
      message:
        "RoomId, Piece, Initial / Final Position and Player nickname are required",
    });
    return;
  }

  const room: Room = rooms.get(roomId);
  if (!room) {
    res.status(404).json({ success: false, message: "Room not found" });
    return;
  }

  const player: Player = room.players.find((p) => p.nickname === nickname);
  if (!player) {
    res.status(400).json({ success: false, message: "Player not found" });
    return;
  }

  if (player.team !== room.turn) {
    res.status(403).json({ success: false, message: "Not your turn" });
    return;
  }

  // ✅ Validate if the move is legal
  if (
    !isValidMove(
      piece.type,
      initialPosition,
      finalPosition,
      piece.team,
      room.board
    )
  ) {
    res.status(400).json({ success: false, message: "Invalid move" });
    return;
  }

  // Check if the move is capturing an opponent's piece
  const capturedPiece = room.board.find((p) => p.position === finalPosition);
  if (capturedPiece) {
    // Ensure the captured piece belongs to the opponent
    if (capturedPiece.team !== piece.team) {
      if (piece.team === "white") {
        room.captures.white.push(capturedPiece); // Add to white's captures
      } else {
        room.captures.black.push(capturedPiece); // Add to black's captures
      }

      // Remove captured piece from board
      room.board = room.board.filter((p) => p.position !== finalPosition);
    }
  }

  // ✅ Update board state
  room.board = room.board.map((p) => {
    if (p.position === initialPosition) {
      return { ...p, position: finalPosition, hasMoved: true };
    }
    return p;
  });

  // Convert piece type to its corresponding symbol
  const pieceSymbol = pieceSymbols[piece.type]?.[piece.team];

  // Push the move to Game History with symbols
  const newMove: Move = {
    piece: pieceSymbol || piece.type,
    initialPosition,
    finalPosition,
  };

  if (room.turn === "white") {
    room.previousMove[0] = initialPosition;
    room.previousMove[1] = finalPosition;
  } else {
    room.previousMove[2] = initialPosition;
    room.previousMove[3] = finalPosition;
  }

  if (
    room.gameHistory.length === 0 ||
    room.gameHistory[room.gameHistory.length - 1][1] !== null
  ) {
    // Start a new tuple with a placeholder move
    room.gameHistory.push([newMove, null]);
  } else {
    // Complete the last move tuple
    room.gameHistory[room.gameHistory.length - 1][1] = newMove;
  }

  io.to(roomId).emit("move-made", roomId);

  // Check if the game is won
  if (room.winner) {
    io.to(roomId).emit("game-over", roomId);
    res.json({ success: true, message: "Game Over" });
    return;
  }

  switchTurn(room); // ✅ Switch turns only after a valid move

  res.json({ success: true, message: "Move made and turn switched" });
});

export { router };
