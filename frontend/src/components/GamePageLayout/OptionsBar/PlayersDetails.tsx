import React, { useEffect, useRef, useState } from "react";
import { useRoom } from "../../../context/RoomContext";
import PlayersDropdown from "../../Dropdowns/PlayersDropdown";
import { FaUser } from "react-icons/fa";

const PlayersDetails: React.FC = () => {
  const [playersDropdown, setPlayersDropdown] = useState<boolean>(false);
  const playersRef = useRef<HTMLDivElement>(null);
  const { room, roomId } = useRoom();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        playersRef.current &&
        !playersRef.current.contains(event.target as Node)
      ) {
        setPlayersDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!room || !roomId) return <></>;

  const playersClick = () => {
    setPlayersDropdown((prev) => !prev);
  };

  return (
    <div ref={playersRef} className="relative">
      <button
        onClick={playersClick}
        title="Room Details"
        className="flex text-center justify-center gap-[1vw] tablet:min-w-[15vw] tablet:max-w-[15vw] laptop-sm:min-w-[10vw] laptop-sm:max-w-[10vw] tablet:gap-[0.5vw] items-center px-[2.5vw] py-[1vw] tablet:px-[1vw] tablet:py-[0.8vw] bg-primaryButtonBackground hover:bg-primaryButtonBackgroundHover hover:scale-105 rounded-full shadow-xl transition"
      >
        <span>Players</span> <FaUser />{" "}
        {room.players.filter(player => player.nickname !== "").length}
      </button>
      {playersDropdown && <PlayersDropdown onClose={playersClick} />}
    </div>
  );
};

export default PlayersDetails;
