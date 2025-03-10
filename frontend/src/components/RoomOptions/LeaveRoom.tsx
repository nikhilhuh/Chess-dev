import React from "react";
import { leaveRoom } from "../../services/api/apiCalls/leaveRoom";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";
import { useRoom } from "../../context/RoomContext";
import { GiExitDoor } from "react-icons/gi";

const LeaveRoom: React.FC<{
  setError: React.Dispatch<React.SetStateAction<string>>;
  onClose?: () => void;
}> = ({ setError, onClose }) => {
  const { PlayerDetails } = usePlayer();
  const { roomId } = useRoom();
  if (!PlayerDetails || !roomId) return <></>;
  const navigate = useNavigate();

  const handleLeaveRoom = async () => {
    try {
      const response = await leaveRoom(roomId, PlayerDetails.nickname);
      if (response && !response.success) {
        setError(response.message || "Error leaving room , please try again");
      } else if (response?.success) {
        onClose?.();
        navigate("/");
      }
    } catch (error) {
      setError("Error Leaving Room , please try again");
    }
  };
  return (
    <button
      onClick={handleLeaveRoom}
      className="flex gap-[1vw] text-center justify-center tablet:gap-[0.5vw] items-center px-[2.5vw] py-[1vw] tablet:px-[1vw] tablet:py-[0.6vw] bg-red-400 hover:bg-red-600 hover:scale-105 rounded-full shadow-xl transition"
    >
      Leave Room
      <GiExitDoor />
    </button>
  );
};

export default LeaveRoom;
