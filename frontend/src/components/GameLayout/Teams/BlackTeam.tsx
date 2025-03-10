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

  const isTurn =
    room.turn === "black";

  return (
    <TeamPlayer UserImg={UserImg} player={player} isTurn={isTurn} capturedPieces={capturedPieces}/>
  );
};

export default BlackTeam;
