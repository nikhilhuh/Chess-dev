import React from "react";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../../context/RoomContext";
import { randomMatch } from "../../services/api/apiCalls/randomMatch";

const FindMatch: React.FC<{
  nickname: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}> = ({ nickname, setError }) => {
  const { setisLoading , setPrivateRoom } = useRoom();
  const navigate = useNavigate();

  const handleFindMatch = async () => {
    if (nickname.trim() === "") {
      setError("Enter your Nickname to continue");
      return;
    }
    setisLoading(true);
    try {
      setisLoading(true);      
      const response = await randomMatch(nickname);
      if (response && response.success && "roomId" in response) {
        const newRoomId = response.roomId;
        setPrivateRoom(false);
        navigate(`/online/${newRoomId}`);
      } else {
        setError(response?.message || "Error during matchmaking , please try again");
      }
    } catch (error) {
      setError("Error during matchmaking , please try again");
    }
  };

  return (
    <button
      onClick={handleFindMatch}
      className="p-2 4k:p-4 bg-primaryButtonBackground text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] font-semibold font-serif rounded-xl hover:bg-primaryButtonBackgroundHover hover:scale-105 transition text-white"
    >
      Find Match
    </button>
  );
};

export default FindMatch;
