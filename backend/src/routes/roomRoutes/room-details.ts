import express, { Request, Response } from "express";
import cors from "cors";
import { rooms } from "../../utils/room";
import { Room } from "../../models/Types";
const router = express.Router();

router.use(cors({origin: process.env.FRONTEND_URL, methods:["GET"]}));

router.get("/room-details", (req: Request, res: Response) => {
  const roomId = req.query.roomId;

  if (!roomId || typeof roomId !== "string") {
    res
      .status(400)
      .json({ success: false , message: "Room ID is required and must be a string" });
    return;
  }

  const room: Room = rooms.get(roomId);

  if (!room) {
    res.status(404).json({succes: false, message: "Room not found" });
    return;
  }

  res.json({success: true , room});
});

export {router};