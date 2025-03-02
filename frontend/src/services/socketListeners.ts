import { Socket } from "socket.io-client";
import { updateRoomDetails } from "./updateRoomDetails";

export const socketListeners = (socket: Socket , setReset: React.Dispatch<React.SetStateAction<boolean>>) => {
  if (!socket.connected) {
    console.warn("Socket not connected. Listeners may not work properly.");
  }

  socket.on("room-updated", async (roomId: string) => {
    await updateRoomDetails(roomId);
  });

  socket.on("move-made", async (roomId: string) => {
    await updateRoomDetails(roomId);
  });

  socket.on("game-over", async (roomId: string) => {
    await updateRoomDetails(roomId);
  })

  socket.on("reset-game", async (roomId: string) => {
    await updateRoomDetails(roomId);
    setReset(true);
  });
};
