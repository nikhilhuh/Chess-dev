import React, { useEffect, useState } from "react";
import { useRoom } from "../../../context/RoomContext";
import UserImg from "../../../assets/images/miscellaneous/blackuser.png";
import { usePlayer } from "../../../context/PlayerContext";
import { Piece, Player } from "../../../utils/constants";
import WaitingOpponent from "./WaitingOpponent";
import TeamPlayer from "./TeamPlayer";

const BlackTeam: React.FC = () => {
  const { room } = useRoom();
  const { PlayerDetails } = usePlayer();
  const [capturedPieces, setCapturedPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (room?.captures.black) setCapturedPieces(room.captures.black);
  }, [room]);

  if (!room || !PlayerDetails) return <></>;

  const player: Player | undefined = room.players.find(
    (player) => player.team === "black" && player.nickname !== ""
  );

  if (!player)
    return (
      <WaitingOpponent UserImg={UserImg} />
    );

  const isYourTurn =
    room.turn === "black" && PlayerDetails.nickname === player.nickname;
  const isOpponentTurn =
    room.turn === "black" && PlayerDetails.nickname !== player.nickname;

  return (
    <TeamPlayer UserImg={UserImg} player={player} isYourTurn={isYourTurn} isOpponentTurn={isOpponentTurn} capturedPieces={capturedPieces}/>
  );
};

export default BlackTeam;
