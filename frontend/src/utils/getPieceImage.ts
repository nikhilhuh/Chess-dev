// Import all chess piece images
import black_pawn from "../assets/images/chesspieces/bp.png";
import black_knight from "../assets/images/chesspieces/bn.png";
import black_bishop from "../assets/images/chesspieces/bb.png";
import black_rook from "../assets/images/chesspieces/br.png";
import black_queen from "../assets/images/chesspieces/bq.png";
import black_king from "../assets/images/chesspieces/bk.png";

import white_pawn from "../assets/images/chesspieces/wp.png";
import white_knight from "../assets/images/chesspieces/wn.png";
import white_bishop from "../assets/images/chesspieces/wb.png";
import white_rook from "../assets/images/chesspieces/wr.png";
import white_queen from "../assets/images/chesspieces/wq.png";
import white_king from "../assets/images/chesspieces/wk.png";
import { Piece } from "../utils/constants";

// Function to get the correct piece image
export const getPieceImage = (piece: Piece) => {
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
