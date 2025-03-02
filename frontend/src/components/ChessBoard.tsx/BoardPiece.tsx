import React from "react";
import { Piece } from "../../utils/constants";
import { useRoom } from "../../context/RoomContext";
import { usePlayer } from "../../context/PlayerContext";
import { getPossibleMoves } from "../../services/getPossibleMoves";

// Import all chess piece images
import black_pawn from "../../assets/chesspieces/bp.png";
import black_knight from "../../assets/chesspieces/bn.png";
import black_bishop from "../../assets/chesspieces/bb.png";
import black_rook from "../../assets/chesspieces/br.png";
import black_queen from "../../assets/chesspieces/bq.png";
import black_king from "../../assets/chesspieces/bk.png";

import white_pawn from "../../assets/chesspieces/wp.png";
import white_knight from "../../assets/chesspieces/wn.png";
import white_bishop from "../../assets/chesspieces/wb.png";
import white_rook from "../../assets/chesspieces/wr.png";
import white_queen from "../../assets/chesspieces/wq.png";
import white_king from "../../assets/chesspieces/wk.png";


// Function to get the correct piece image
const getPieceImage = (piece: Piece) => {
  const images: Record<string, string> = {
    "black pawn": black_pawn,
    "black knight": black_knight,
    "black bishop": black_bishop,
    "black rook": black_rook,
    "black queen": black_queen,
    "black king": black_king,
    "white pawn": white_pawn,
    "white knight": white_knight,
    "white bishop": white_bishop,
    "white rook": white_rook,
    "white queen": white_queen,
    "white king": white_king,
  };

  return images[`${piece.team} ${piece.type}`] || "";
};

// BoardPiece component
const BoardPiece: React.FC<{
  piece: Piece;
  setSelectedPosition: React.Dispatch<React.SetStateAction<string | null>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setPossibleMoves: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedPiece: React.Dispatch<React.SetStateAction<Piece | null>>;
}> = ({ piece, setSelectedPosition, setError, setPossibleMoves , setSelectedPiece }) => {
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
    <div onClick={possibleMoves}>
      <img
        src={getPieceImage(piece)}
        alt={`${piece.team} ${piece.type}`}
        className="w-full h-full object-contain z-10 cursor-pointer hover:scale-110 transition"
      />
    </div>
  );
};

export default BoardPiece;
