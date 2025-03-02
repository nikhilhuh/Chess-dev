import express, { Request, Response } from "express";
import cors from "cors";
import { Player } from "../../models/Types";
import { io } from "../../socket/socketSetUp";
import { rooms } from "../../utils/room";

const router = express.Router();
router.use(cors({ origin: process.env.FRONTEND_URL, methods: ["PATCH"] }));

router.patch("/leave-room", (req: Request, res: Response) => {
  const { roomId, nickname } = req.body;
  const room = rooms.get(roomId);

  if (!room) {
    res.status(404).json({ success: false, message: "Room not found" });
    return;
  }

  // Find the player
  const player = room.players.find((p: Player) => p.nickname === nickname);

  if (!player) {
    res.status(404).json({ success: false, message: "Player not found in the room" });
    return;
  }

  const isCreator = room.creator === nickname;

  // Update player instead of removing
  player.nickname = ""; // Keep team and other info intact

  // If the leaving player is the creator, assign a new creator if possible
  if (isCreator) {
    const remainingPlayer = room.players.find((p) => p.nickname !== ""); // Find another active player
    if (remainingPlayer) {
      room.creator = remainingPlayer.nickname;
    } else {
      // No active players left, delete the room without emitting an event
      rooms.delete(roomId);
      res.json({ success: true, message: "Room deleted as no players remain" });
      return;
    }
  }

  io.to(roomId).emit("room-updated", roomId);

  res.json({
    success: true,
    message: "Player left room successfully",
  });
});

export { router };
