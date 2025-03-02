import { axiosInstance } from "../../axiosInstance";
import { apiErrorHandler } from "../apiErrorHandling";
import { Piece, Player } from "../../../utils/constants";

export const makeMove = async (
  roomId: string,
  piece: Piece,
  initialPosition: string,
  finalPosition: string,
  nickname: Player["nickname"]
) => {
  try {
    const response = await axiosInstance.post("/make-move", {
      roomId,
      piece,
      initialPosition,
      finalPosition,
      nickname,
    });
    if (response.data.success) {
      return { success: true, message: "Completed" };
    } else {
      return {
        success: false,
        message: response.data.message ?? "An unexpected error occurred",
      };
    }
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
