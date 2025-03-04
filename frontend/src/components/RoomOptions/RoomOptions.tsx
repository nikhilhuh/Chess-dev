import React, { useState } from "react";
import ErrorModal from "../Modals/ErrorModal";
import { useRoom } from "../../context/RoomContext";
import RoomIdShare from "./components/RoomIdShare";
import PlayersInRoom from "./components/PlayersInRoom";
import LeaveRoom from "./components/LeaveRoom";

const RoomDetails: React.FC = () => {
  const [error, setError] = useState<string>("");
  const { room } = useRoom();

  if (!room) return <></>;

  return (
    <div
      className=" text-[2vw] mobile-tablet:text-[1.5vw] tablet:text-[1vw] lapotp-sm:text-[0.8vw] shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {error && <ErrorModal onClose={() => setError("")} error={error} />}
      {!room.startGame && <RoomIdShare setError={setError} />}

      <div className={`bg-gray-700 p-2 tablet:p-4 4k:p-6 rounded-bl-xl rounded-br-xl ${room.startGame ? "rounded-tr-xl rounded-tl-xl" : ""} flex flex-col gap-1 laptop-l:gap-2 4k:gap-4`}>
        <PlayersInRoom />
        <LeaveRoom setError={setError} />
      </div>
    </div>
  );
};

export default RoomDetails;
