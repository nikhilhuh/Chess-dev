import React from "react";
import { Piece } from "../../utils/constants";
import { useRoom } from "../../context/RoomContext";
import { usePlayer } from "../../context/PlayerContext";
import { getPossibleMoves } from "../../utils/getPossibleMoves";
import { getPieceImage } from "../../utils/getPieceImage";

// BoardPiece component
const BoardPiece: React.FC<{
  piece: Piece;
  setSelectedPosition: React.Dispatch<React.SetStateAction<string | null>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setPossibleMoves: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedPiece: React.Dispatch<React.SetStateAction<Piece | null>>;
  isWaiting: boolean;
}> = ({ piece, setSelectedPosition, setError, setPossibleMoves , setSelectedPiece , isWaiting }) => {
  const { roomId , room } = useRoom();
  const { PlayerDetails } = usePlayer();

  if (!roomId || !PlayerDetails || !room) return <></>;

  const possibleMoves = () => {
    try {
      setPossibleMoves(
        getPossibleMoves(piece.type, piece.position, piece.team , room.board)
      );
      setSelectedPosition(piece.position);
      setSelectedPiece(piece);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  return (
    <div onClick={()=> {
      if (!isWaiting && piece.team === PlayerDetails.team)
        possibleMoves();
  
    }}>
      <img
        src={getPieceImage(piece)}
        alt={`${piece.team} ${piece.type}`}
        className={`w-full h-full object-contain z-10 cursor-pointer ${!isWaiting && piece.team === PlayerDetails.team? "hover:scale-110" : ""} transition`}
      />
    </div>
  );
};

export default BoardPiece;
