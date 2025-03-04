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
       className="flex gap-[1vw] text-center justify-center tablet:gap-[0.5vw] items-center px-[2.5vw] py-[1.5vw] tablet:px-[1vw] tablet:py-[0.8vw] bg-primaryButtonBackground hover:bg-primaryButtonBackgroundHover hover:scale-105 rounded-full shadow-xl transition text-[2.5vw] mobile-tablet:text-[2vw] tablet:text-[1.5vw] laptop-sm:text-[1vw]"
     >
       <IoIosRefresh />
       <span>Reset Game</span>
     </button>
   </div>
  );
};

export default ResetButton;
