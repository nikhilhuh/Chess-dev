import {router as createRoomRouter} from "./roomRoutes/create-room";
import {router as joinRoomRouter} from "./roomRoutes/join-room";
import {router as getRoomDetailsRouter} from "./roomRoutes/room-details";
import {router as makeMoveRouter} from "./gameRoutes/make-move";
import {router as resetGameRouter} from "./gameRoutes/reset-game";
import {router as leaveRoomRouter} from "./roomRoutes/leave-room";
import express from "express";

const mainRouter = express.Router();

// Middleware to log requests
mainRouter.use("/", createRoomRouter);
mainRouter.use("/", joinRoomRouter);
mainRouter.use("/", getRoomDetailsRouter);
mainRouter.use("/", makeMoveRouter);
mainRouter.use("/", resetGameRouter);
mainRouter.use("/", leaveRoomRouter);

export { mainRouter };