import React, { useState } from "react";
import ErrorModal from "../Modals/ErrorModal";
import RoomIdShare from "./components/RoomIdShare";
import PlayersInRoom from "./components/PlayersInRoom";
import LeaveRoom from "./components/LeaveRoom";

const PlayersDropdown: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [error, setError] = useState<string>("");

  return (
    <div
      className="absolute left-0 tablet:left-auto tablet:right-0 top-[110%] z-50 rounded-xl bg-gray-800 w-[60vw] tablet:w-[35vw] laptop-sm:w-[25vw] laptop-l:w-[20vw] text-[2.2vw] tablet:text-[1.2vw] laptop-sm:text-[1vw] laptop-l:text-[0.8vw] 4k:text-[1vw] shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {error && <ErrorModal onClose={() => setError("")} error={error} />}
      <RoomIdShare setError={setError} />

      <div className="bg-gray-700 p-2 tablet:p-4 4k:p-6 rounded-bl-xl rounded-br-xl flex flex-col gap-1 laptop-l:gap-2 4k:gap-4">
        <PlayersInRoom />
        <LeaveRoom onClose={onClose} setError={setError} />
      </div>
    </div>
  );
};

export default PlayersDropdown;
