import React from "react";
import BlackTeam from "./Teams/BlackTeam";
import Board from "../ChessBoard.tsx/Board";
import WhiteTeam from "./Teams/WhiteTeam";

const ChessGame: React.FC<{isWaiting: boolean}> = ({isWaiting}) => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-start justify-center gap-[1.5vw] tablet:gap-[0.5vw] ">
        <BlackTeam />
        <Board isWaiting={isWaiting}/>
        <WhiteTeam />
      </div>
    </div>
  );
};

export default ChessGame;
