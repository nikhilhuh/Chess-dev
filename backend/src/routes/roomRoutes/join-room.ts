import express, { Request, Response } from "express";
import cors from "cors";
import { rooms } from "../../utils/room";
import { Player, Room } from "../../models/Types";

const router = express.Router();

router.use(cors({ origin: process.env.FRONTEND_URL, methods: ["POST"] }));

router.post("/join-room", (req: Request, res: Response) => {
  const { roomId, nickname } = req.body;

  if (!roomId || !nickname) {
    res.status(400).json({
      success: false,
      message: "Room ID and player name are required",
    });
    return;
  }

  const room: Room = rooms.get(roomId);

  if (!room) {
    res.status(404).json({ success: false, message: "Room not found" });
    return;
  }

  const playerExists: boolean = room.players.some((p) => p.nickname === nickname);
  if (playerExists) {
    res
      .status(400)
      .json({ success: false, message: "Player already in the room" });
    return;
  }

  const player: Player = room.players.find((p) => p.nickname === "");

  if (!player) {
    res.status(400).json({ success: false, message: "Room is full" });
    return;
  }
  player.nickname = nickname;

  if (!room.players.some((p)=> p.nickname === "")){
    room.startGame = true;
  }

  res.json({ success: true, message: "Player added successfully" });
});

export { router };
