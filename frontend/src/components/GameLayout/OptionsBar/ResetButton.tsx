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
     <button
       title="Reset Board"
       onClick={handleResetGame}
       className="flex gap-[1vw] text-center justify-center tablet:gap-[0.5vw] items-center px-[2.5vw] py-[1vw] tablet:px-[1vw] tablet:py-[0.6vw] bg-primaryButtonBackground hover:bg-primaryButtonBackgroundHover hover:scale-105 rounded-full shadow-xl transition"
     >
       <IoIosRefresh />
       <span>Reset Game</span>
     </button>
  
  );
};

export default ResetButton;
