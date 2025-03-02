import React from "react";
import { useRoom } from "../../../context/RoomContext";
import UserImg from "../../../assets/images/blackuser.png";
import { usePlayer } from "../../../context/PlayerContext";

const BlackTeam: React.FC = () => {
  const { room } = useRoom();
  const { PlayerDetails } = usePlayer();
  if (!room || !PlayerDetails) return <></>;

  const player = room.players.find(
    (player) => player.team === "black" && player.nickname !== ""
  );
  if (!player)
    return (
      <div>
        <div className="flex items-center gap-[1vw]">
          <div className="bg-secondaryButtonBackground rounded-lg p-1">
            <img
              src={UserImg}
              alt="User image"
              className="h-[4.5vw] w-[4.5vw] tablet:h-[3vw] tablet:w-[3vw]"
            />
          </div>
          <div className="text-[3vw] tablet:text-[1.3vw] font-semibold">
            Opponent
          </div>
        </div>
      </div>
    );

    const isYourTurn =
    room.turn === "black" && PlayerDetails.nickname === player.nickname;
    const isOpponentTurn = room.turn === "black" && PlayerDetails.nickname !== player.nickname;

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-[1vw]">
        <div className="bg-secondaryButtonBackground rounded-lg p-1">
          <img
            src={UserImg}
            alt="User image"
            className="h-[4.5vw] w-[4.5vw] tablet:h-[3vw] tablet:w-[3vw]"
          />
        </div>
        <div className="flex items-center gap-[0.5vw]">
          <span className="text-[3vw] tablet:text-[1.3vw] font-semibold">
            {player.nickname}
          </span>
          {player.nickname === PlayerDetails.nickname && (
            <span className="text-[2.5vw] tablet:text-[0.9vw] text-green-600">
              (You)
            </span>
          )}
        </div>
      </div>
      <div className="text-[2.5vw] tablet:text-[1vw] font-medium text-gray-200 typewriter">
        {isYourTurn
          ? "You are playing.."
          : ""}
        {isOpponentTurn
          ? "Opponent is playing.."
          : ""}
      </div>
    </div>
  );
};

export default BlackTeam;
