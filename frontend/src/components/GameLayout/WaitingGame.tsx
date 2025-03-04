import React from "react";
import BlackTeam from "./Teams/BlackTeam";
import ChessBoardImg from "../../assets/images/miscellaneous/chessboard.png";
import WhiteTeam from "./Teams/WhiteTeam";

const WaitingGame: React.FC = () => {
  return (
    <div className="flex mx-auto max-w-[80vw] mobile-tablet:max-w-[56vw] tablet:max-w-[48vw] laptop-sm:max-w-[40vw] laptop-l:max-w-[36vw] items-center">
      <div className="flex flex-col items-start justify-center gap-[2vw] tablet:gap-[1vw] ">
        <BlackTeam />
        <img
          src={ChessBoardImg}
          alt="ChessBoardImg"
          className="w-[80vw] mobile-m:w-[70vw] mobile-l:w-[60vw] mobile-tablet:w-[45vw]"
        />
        <WhiteTeam />
      </div>
    </div>
  );
};

export default WaitingGame;
