import React from "react";
import { usePlayer } from "../../../context/PlayerContext";
import { useRoom } from "../../../context/RoomContext";
import { resetGame } from "../../../services/api/apiCalls/resetGame";
import { IoIosRefresh } from "react-icons/io";

const ResetButton: React.FC = () => {
  const { PlayerDetails } = usePlayer();
  const { roomId } = useRoom();

  if (!PlayerDetails || !roomId) return <></>;

  const handleResetGame = async () => {
    await resetGame(roomId, PlayerDetails.nickname);
  };
  
  return (
   <div className="w-full flex justify-center">
     <button
       title="Reset Board"
       onClick={handleResetGame}
       className="flex items-center justify-center gap-[1vw] bg-primaryButtonBackground w-full p-2 4k:p-4 shadow-xl rounded-full hover:bg-primaryButtonBackgroundHover transition"
     >
       <IoIosRefresh />
       <span>Reset Game</span>
     </button>
   </div>
  );
};

export default ResetButton;
