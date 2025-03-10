import React, { useEffect, useState } from "react";
import { useRoom } from "../../../context/RoomContext";
import UserImg from "../../../assets/images/miscellaneous/whiteuser.png";
import { usePlayer } from "../../../context/PlayerContext";
import { Piece } from "../../../utils/constants";
import TeamPlayer from "./TeamPlayer";
import WaitingOpponent from "./WaitingOpponent";

const WhiteTeam: React.FC = () => {
  const { room } = useRoom();
  const { PlayerDetails } = usePlayer();
  const [capturedPieces, setCapturedPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (room?.captures.white) setCapturedPieces(room.captures.white);
  }, [room]);

  if (!room || !PlayerDetails) return <></>;

  const player = room.players.find(
    (player) => player.team === "white" && player.nickname !== ""
  );
  if (!player)
    return (
      <WaitingOpponent UserImg={UserImg}/>
    );

  const isTurn =
    room.turn === "white";

  return (
    <TeamPlayer UserImg={UserImg} player={player} isTurn={isTurn} capturedPieces={capturedPieces}/>
  );
};

export default WhiteTeam;
