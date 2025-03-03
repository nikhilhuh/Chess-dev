import React from "react";
import { useRoom } from "../../../context/RoomContext";

const PlayersInRoom: React.FC = () => {
  const { room } = useRoom();
  if (!room) return <></>;
  const { players } = room;
  const Players = players.filter((player) => player.nickname !== "");
  return (
    <>
      <div className="text-center">Players in Room</div>
      <div className="mt-2 flex flex-wrap gap-1 laptop-sm:gap-2">
        {Players.map((player, index) => (
          <div key={index} className="bg-gray-600 px-2 py-1 rounded-lg">
            {player.nickname}
          </div>
        ))}
      </div>
    </>
  );
};

export default PlayersInRoom;
