import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinRoom } from "../../services/api/apiCalls/joinRoom";
import { useRoom } from "../../context/RoomContext";

const JoinRoom: React.FC<{
  nickname: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}> = ({ nickname, setError }) => {
  const [roomId, setRoomId] = useState<string>("");
    const { setisLoading , setPrivateRoom } = useRoom();
  const navigate = useNavigate();

  const handleJoinRoom = async () => {
    if (roomId.trim() === "") {
      setError("Enter Room ID to join");
      return;
    }
    if (nickname.trim() === "") {
      setError("Enter your Nickname to continue");
      return;
    }
    setisLoading(true);
    try {
      const response = await joinRoom(roomId, nickname);
      if (response?.success) {
        setPrivateRoom(true);
        navigate(`/friends/${roomId}`);
      } else {
        setError(
          response?.message ||
            "Failed to join the room. Please check the Room ID and try again."
        );
      }
    } catch (error) {
      setError(`Error joining room , please try again`);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="joinRoomId"
        className="font-mono text-center text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw]"
      >
        Enter Room ID
      </label>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        id="joinRoomId"
        name="joinRoomId"
        className="outline-none bg-gray-200 text-black border-gray-200 border-2 rounded-full text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] py-1 px-2 laptop-sm:px-4 4k:px-8"
      />
      <button
        onClick={handleJoinRoom}
        className="mt-1 4k:mt-2 p-2 4k:p-4 bg-secondaryButtonBackground text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] font-semibold font-serif rounded-xl hover:bg-secondaryButtonBackgroundHover hover:scale-105 transition text-white"
      >
        Join Room
      </button>
    </div>
  );
};

export default JoinRoom;
