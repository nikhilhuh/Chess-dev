import React from "react";
import { createRoom } from "../../services/api/apiCalls/createRoom";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../../context/RoomContext";

const CreateRoom: React.FC<{
  nickname: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}> = ({ nickname, setError }) => {
  const navigate = useNavigate();
  const { setisLoading } = useRoom();

  const handleCreateRoom = async () => {
    if (nickname.trim() === "") {
      setError("Enter your Nickname to continue");
      return;
    }
    try {
      setisLoading(true);      
      const response = await createRoom(nickname);
      if (response && response.success && "roomId" in response) {
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
      className="p-2 tablet:p-4 bg-primaryButtonBackground text-[3vw] tablet:text-[2.5vw] laptop-l:text-[2vw] font-semibold font-serif rounded-xl hover:bg-primaryButtonBackgroundHover hover:scale-105 transition text-white"
    >
      Create Room
    </button>
  );
};

export default CreateRoom;
