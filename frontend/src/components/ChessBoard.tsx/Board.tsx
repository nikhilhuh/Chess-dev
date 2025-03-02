import React, { useState } from "react";
import BoardPiece from "./BoardPiece";
import { useRoom } from "../../context/RoomContext";
import { usePlayer } from "../../context/PlayerContext";
import ErrorModal from "../Modals/ErrorModal";
import { makeMove } from "../../services/api/apiCalls/makeMove";
import { Piece } from "../../utils/constants";

const Board: React.FC = () => {
  const { room, roomId } = useRoom();
  const { PlayerDetails } = usePlayer();
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const [error, setError] = useState<string>("");
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);

  if (!room || !roomId || !PlayerDetails) return <></>;
  const { board } = room;
  const columns = "abcdefgh".split("");
  const rows = [8, 7, 6, 5, 4, 3, 2, 1];

  const handlePieceMove = async (
    piece: Piece,
    initialPosition: string,
    finalPosition: string
  ) => {
    try {
      const response = await makeMove(
        roomId,
        piece,
        initialPosition,
        finalPosition,
        PlayerDetails.nickname
      );
      if (response && !response.success) {
        setError(
          response.message || "Error while moving the piece , please try again"
        );
      } else {
        setPossibleMoves([]);
        setSelectedPosition(null);
      }
    } catch (error) {
      setError("Error while moving the piece , please try again");
    }
  };

  return (
    <div className="grid grid-cols-8 transition-transform">
      {error && <ErrorModal error={error} onClose={() => setError("")} />}
      {rows.map((row, rowIndex) =>
        columns.map((col, colIndex) => {
          const position = `${col}${row}`;
          const piece = board.find((p) => p.position === position);
          const isDarkSquare = (rowIndex + colIndex) % 2 === 1;

          return (
            <div
              key={position}
              onClick={() => {
                if (
                  possibleMoves.includes(position) &&
                  selectedPosition &&
                  selectedPiece &&
                  selectedPiece.team === room.turn
                ) {
                  handlePieceMove(selectedPiece, selectedPosition, position);
                }
              }}
              className={`h-[10vw] w-[10vw] mobile-tablet:h-[7vw] mobile-tablet:w-[7vw] tablet:h-[6vw] tablet:w-[6vw] laptop-sm:w-[5vw] laptop-sm:h-[5vw] laptop-l:h-[4.5vw] laptop-l:w-[4.5vw] relative flex items-center justify-center transition
                          ${isDarkSquare ? "bg-[#779556]" : "bg-[#E4E4C3]"}
                          ${
                            possibleMoves.includes(position) && "cursor-pointer"
                          } 
                          ${
                            room.previousMove &&
                            room.previousMove.includes(position) &&
                            "bg-yellow-300 border-[1px] 4k:border-[2px] border-white"
                          }
                          ${
                            selectedPosition === position &&
                            possibleMoves.length !== 0 &&
                            "bg-yellow-500"
                          }
                          ${
                            possibleMoves.includes(position) && piece && "bg-red-500"
                          }
                          `}
            >
              {/* Row Number (Top-Left) */}
              {colIndex === 0 && (
                <span className="absolute top-0.5 left-0.5 text-[2vw] tablet:text-[1vw] text-black font-bold">
                  {row}
                </span>
              )}

              {/* Column Letter (Bottom-Right) */}
              {rowIndex === 7 && (
                <span className="absolute bottom-0.5 right-0.5 text-[2vw] tablet:text-[1vw]  text-black font-bold">
                  {col}
                </span>
              )}

              {/* Show if it is the possible move of the piece selected */}
              {possibleMoves?.includes(position) && !piece && (
                <div
                  title="Move Piece Here"
                  className="h-[4vw] w-[4vw] mobile-l:h-[3vw] mobile-l:w-[3vw] tablet:h-[2vw] tablet:w-[2vw] rounded-full bg-secondaryButtonBackgroundHover flex justify-center items-center"
                ></div>
              )}

              {/* Chess Piece */}
              {piece && (
                <BoardPiece
                  piece={piece}
                  setSelectedPosition={setSelectedPosition}
                  setError={setError}
                  setPossibleMoves={setPossibleMoves}
                  setSelectedPiece={setSelectedPiece}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Board;
