import React from "react";
import { usePlayer } from "../../../context/PlayerContext";
import { Piece, Player } from "../../../utils/constants";
import { getPieceImage } from "../../../utils/getPieceImage";
import { useRoom } from "../../../context/RoomContext";

type timeRemaining = {
  minutes: string;
  seconds: string;
};

const TeamPlayer: React.FC<{
  UserImg: string;
  player: Player;
  isTurn: boolean;
  capturedPieces: Piece[];
}> = ({ UserImg, player, isTurn, capturedPieces }) => {
  const { PlayerDetails } = usePlayer();
  const { room } = useRoom();

  const timeRemaining: timeRemaining = {
    minutes: "00",
    seconds: "00"
  };

  if (!PlayerDetails || !room) return <></>;

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center w-[40%] max-w-[40%] gap-[2vw] mobile-tablet:gap-[1vw]">
        <div className="bg-secondaryButtonBackground rounded-lg p-1 4k:p-2">
          <img
            src={UserImg}
            alt="User image"
            className="h-[6] w-[6vw] mobile-tablet:h-[5vw] mobile-tablet:w-[5vw] tablet:h-[4vw] tablet:w-[4vw] laptop-sm:h-[3vw] laptop-sm:w-[3vw] object-contain"
          />
        </div>
        <div className="flex flex-col gap-[0.2vw]">
          <div className="flex items-center gap-[1vw] tablet:gap-[0.3vw]">
            <span className="text-[2.5vw] mobile-tablet:text-[2vw] tablet:text-[1.3vw] font-semibold">
              {player.nickname}
            </span>
            {player.nickname === PlayerDetails.nickname && (
              <span className="text-[2vw] mobile-tablet:text-[1.5vw] tablet:text-[0.9vw] text-green-600">
                (You)
              </span>
            )}
            {room.startGame && isTurn && (
                <div className="bg-green-700 h-[1.5vw] w-[1.5vw] tablet:h-[1vw] tablet:w-[1vw] rounded-full"></div>
              
            )}
          </div>
          <div className="flex w-full max-w-full overflow-x-auto justify-start items-baseline">
            {capturedPieces &&
              capturedPieces.map((piece, index) => (
                <img
                  key={index}
                  src={getPieceImage(piece)}
                  alt={`${piece.team} ${piece.type}`}
                  className="w-auto h-[3vw] mobile-m:h-[2.5vw] mobile-l:h-[2.2vw] mobile-tablet:h-[2vw] tablet:h-[1.5vw] laptop-sm:h-[1vw] object-contain"
                />
              ))}
          </div>
        </div>
      </div>
      <div className="bg-rgbaBackground p-1 mobile-tablet:p-2 4k:p-4 text-[3vw] mobile-tablet:text-[2.2vw] tablet:text-[1.8vw] laptop-sm:text-[1.5vw] laptop-l:text-[1.2vw]">
        <div className="flex items-center gap-[0.2vw]">
          <span>{timeRemaining.minutes}</span>
          <span>:</span>
          <span>{timeRemaining.seconds}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamPlayer;
