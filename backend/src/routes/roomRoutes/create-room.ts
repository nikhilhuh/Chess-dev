import express, { Request, Response } from "express";
import { generateBoard } from "../../utils/generateBoard";
import cors from "cors";
import { generateRoomCode } from "../../utils/generateRoomcode";
import { rooms } from "../../utils/room";
import { Room, Player, Team } from "../../models/Types";
const router = express.Router();

router.use(cors({ origin: process.env.FRONTEND_URL, methods: ["POST"] }));

router.post("/create-room", (req: Request, res: Response) => {
  const { nickname } = req.body;

  if (!nickname) {
    res
      .status(400)
      .json({ success: false, message: "Player name is required" });
    return;
  }

  const roomId: string = generateRoomCode();
  const assignedTeam: Team = Math.random() < 0.5 ? "black" : "white";
  const otherTeam: Team = assignedTeam === "black" ? "white" : "black";

  const player: Player = {
    nickname,
    team: assignedTeam
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

  res.json({ succes: true, roomId });
});

export { router };
