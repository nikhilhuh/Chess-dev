import { Room } from "../models/Types";

// Function to switch turn after revealing a card
export const switchTurn = (room: Room) => {
  if (!room.winner) {
    room.turn = room.turn === "white" ? "black" : "white";
    return;
  }
};
