import React from "react";
import { createRoom } from "../../services/api/apiCalls/createRoom";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../../context/RoomContext";

const CreateRoom: React.FC<{
  nickname: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}> = ({ nickname, setError }) => {
  const navigate = useNavigate();
  const { setisLoading, setPrivateRoom } = useRoom();

  const handleCreateRoom = async () => {
    if (nickname.trim() === "") {
      setError("Enter your Nickname to continue");
      return;
    }
    try {
      setisLoading(true);      
      const response = await createRoom(nickname);
      if (response && response.success && "roomId" in response) {
        setPrivateRoom(true);
        const newRoomId = response.roomId;
        navigate(`/friends/${newRoomId}`);
      } else {
        setError(response?.message || "Error creating room , please try again");
      }
    } catch (error) {
      setError("Error creating room , please try again");
    }
  };

  return (
    <button
      onClick={handleCreateRoom}
      className="p-2 4k:p-4 bg-primaryButtonBackground text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] font-semibold font-serif rounded-xl hover:bg-primaryButtonBackgroundHover hover:scale-105 transition text-white"
    >
      Create Room
    </button>
  );
};

export default CreateRoom;
