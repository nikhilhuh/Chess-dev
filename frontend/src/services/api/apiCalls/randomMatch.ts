import { getRoomDetails } from "./getRoomDetails";
import { axiosInstance } from "../../axios/axiosInstance";
import { updateLocalStorage } from "../../../utils/updateLocalStorage";
import socket from "../../socket/socketSetup";
import { apiErrorHandler } from "../apiErrorHandling";
import { Player } from "../../../utils/constants";

export const randomMatch = async (nickname: Player["nickname"]) => {
  try {
    const response = await axiosInstance.post("/random-match", { nickname });
    const { roomId , message } = response.data;

    updateLocalStorage("nickname", nickname);
    updateLocalStorage("roomId", roomId);

    if (message === "Matchmaking") socket.emit("match-making", roomId);
    else if (message === "Matchmade") socket.emit("match-made", roomId);

    // Fetch room details and ensure it's not undefined
    const roomResponse = await getRoomDetails(roomId);

    if (!roomResponse) {
      return { success: false, message: "Failed to fetch room details" };
    }

    if ("room" in roomResponse) {
      updateLocalStorage("roomDetails", roomResponse.room);
      return { success: true, message: "Completed", roomId };
    } else {
      return {
        success: false,
        message: roomResponse.message ?? "An unexpected error occurred",
      };
    }
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
