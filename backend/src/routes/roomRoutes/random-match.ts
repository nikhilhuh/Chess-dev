import express, { Request, Response } from "express";
import { generateBoard } from "../../utils/generateBoard";
import cors from "cors";
import { generateRoomCode } from "../../utils/generateRoomcode";
import { rooms } from "../../utils/room";
import { Room, Player, Team, WaitingPlayer } from "../../models/Types";
import { io } from "../../socket/socketSetUp";
const router = express.Router();

router.use(cors({ origin: process.env.FRONTEND_URL, methods: ["POST"] }));

let waitingPlayer: WaitingPlayer | null = null;

router.post("/random-match", (req: Request, res: Response) => {
  const { nickname } = req.body;

  if (!nickname) {
    res
      .status(400)
      .json({ success: false, message: "Player name is required" });
    return;
  }

  if (!waitingPlayer) {
    const roomId: string = generateRoomCode();
    const assignedTeam: Team = Math.random() < 0.5 ? "black" : "white";
    const otherTeam: Team = assignedTeam === "black" ? "white" : "black";

    const player: Player = {
      nickname,
      team: assignedTeam,
    };

    waitingPlayer = {
      nickname,
      team: assignedTeam,
      roomId,
    };

    const newRoom: Room = {
      players: [player, { nickname: "", team: otherTeam }],
      creator: nickname,
      board: generateBoard(),
      turn: "white",
      startGame: false,
      previousMove: [],
      gameHistory: [],
      captures: {
        white: [],
        black: [],
      },
      draw: false,
      winner: null,
    };

    rooms.set(roomId, newRoom);
    res.json({ succes: true, message: "Matchmaking", roomId });
  } else if (waitingPlayer) {
    const roomId: string = waitingPlayer.roomId;
    const room: Room = rooms.get(roomId);
    if (!room) {
      res.status(404).json({
        success: false,
        message: "Room not found in waiting player",
      });
      return;
    }
    const player: Player = room.players.find((p) => p.nickname === "");

    if (!player) {
      res.status(400).json({ success: false, message: "Room is full" });
      return;
    }
    player.nickname = nickname;

    if (!room.players.some((p) => p.nickname === "")) {
      room.startGame = true;
    }

    waitingPlayer = null;
    res.json({ success: true, message: "Matchmade", roomId });
  }
});

export { router };
