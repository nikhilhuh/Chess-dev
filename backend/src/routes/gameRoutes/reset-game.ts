import express, { Request, Response } from "express";
import { generateBoard } from "../../utils/generateBoard";
import cors from "cors";
import { io } from "../../socket/socketSetUp";
import { rooms } from "../../utils/room";
import { Room } from "../../models/Types";

const router = express.Router();

router.use(cors({ origin: process.env.FRONTEND_URL, methods: ["POST"] }));

router.post("/reset-game", (req: Request, res: Response) => {
  const { roomId, nickname } = req.body;

  if (!roomId || !nickname) {
    res.status(400).json({
      success: false,
      message: "RoomId and Player nickname is required",
    });
    return;
  }

  const room: Room = rooms.get(roomId);

  if (!room) {
    res.status(404).json({ success: false, message: "Room not found" });
    return;
  }

  if (!room.players.find((p) => p.nickname === nickname)) {
    res
      .status(403)
      .json({ success: false, message: "Player is not in the room" });
    return;
  }

  // Shuffle players randomly
  const shuffledPlayers = [...room.players].sort(() => Math.random() - 0.5);
  shuffledPlayers.forEach((player, index) => {
    player.team = index % 2 === 0 ? "black" : "white";
  });

  // Reset the room state
  room.board = generateBoard();
  room.turn = "white";
  room.previousMove = [];
  room.gameHistory = [];
  room.captures = {
    white: [],
    black: [],
  };
  room.draw = false;
  room.winner = null;

  io.to(roomId).emit("reset-game", roomId);

  res.json({ success: true, message: "Game reset successfully" });
});

export { router };
