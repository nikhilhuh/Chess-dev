import React from "react";
import BlackTeam from "./Teams/BlackTeam";
import Board from "../ChessBoard.tsx/Board";
import WhiteTeam from "./Teams/WhiteTeam";

const ChessGame: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-start justify-center gap-[2vw] tablet:gap-[1vw]">
        <BlackTeam />
        <Board />
        <WhiteTeam />
      </div>
    </div>
  );
};

export default ChessGame;
