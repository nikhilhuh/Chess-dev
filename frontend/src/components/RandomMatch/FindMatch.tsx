import React from "react";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../../context/RoomContext";
import { randomMatch } from "../../services/api/apiCalls/randomMatch";

const FindMatch: React.FC<{
  nickname: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}> = ({ nickname, setError }) => {
  const { setisLoading } = useRoom();
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
      className="mt-2 p-2 tablet:p-4 bg-primaryButtonBackground text-[3vw] tablet:text-[2.5vw] laptop-l:text-[2vw] font-semibold font-serif rounded-xl hover:bg-primaryButtonBackgroundHover hover:scale-105 transition text-white"
    >
      Find Match
    </button>
  );
};

export default FindMatch;
