import React from "react";
import { usePlayer } from "../../../context/PlayerContext";
import { Piece, Player } from "../../../utils/constants";
import { getPieceImage } from "../../../utils/getPieceImage";
import { useRoom } from "../../../context/RoomContext";

const TeamPlayer: React.FC<{
  UserImg: string;
  player: Player;
  isYourTurn: boolean;
  isOpponentTurn: boolean;
  capturedPieces: Piece[];
}> = ({ UserImg, player, isYourTurn, isOpponentTurn, capturedPieces }) => {
  const { PlayerDetails } = usePlayer();
  const { room } = useRoom();

  if (!PlayerDetails || !room) return <></>;

  return (
    <div className="flex w-full items-center">
      <div className="flex items-center w-[40%] max-w-[40%] gap-[2vw] mobile-tablet:gap-[1vw]">
        <div className="bg-secondaryButtonBackground rounded-lg p-1 4k:p-2">
          <img
            src={UserImg}
            alt="User image"
            className="h-[5vw] w-[5vw] mobile-tablet:h-[4vw] mobile-tablet:w-[4vw] tablet:h-[3vw] tablet:w-[3vw] object-contain"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-[0.3vw]">
            <span className="text-[2.5vw] mobile-tablet:text-[2vw] tablet:text-[1.3vw] font-semibold">
              {player.nickname}
            </span>
            {player.nickname === PlayerDetails.nickname && (
              <span className="text-[2vw] mobile-tablet:text-[1.5vw] tablet:text-[0.9vw] text-green-600">
                (You)
              </span>
            )}
          </div>
          {room.startGame && (
            <div className="text-[1.8vw] mobile-tablet:text-[1.2vw] tablet:text-[0.8vw] font-medium text-gray-200">
            {isYourTurn ? "You are playing.." : ""}
            {isOpponentTurn ? "Opponent is playing.." : ""}
          </div>
          )}
        </div>
      </div>

      <div className="flex w-[60%] max-w-[60%] overflow-x-auto justify-center items-center">
        {capturedPieces &&
          capturedPieces.map((piece, index) => (
            <img
              key={index}
              src={getPieceImage(piece)}
              alt={`${piece.team} ${piece.type}`}
              className="w-[5vw] h-[5vw] mobile-tablet:h-[4vw] mobile-tablet:w-[4vw] tablet:h-[3vw] tablet:w-[3vw] object-contain"
            />
          ))}
      </div>
    </div>
  );
};

export default TeamPlayer;
