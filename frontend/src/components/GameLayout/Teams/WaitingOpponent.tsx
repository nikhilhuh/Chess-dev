import React from "react";
import LineSpinner from "../../Loaders/LineSpinner";

const WaitingOpponent: React.FC<{ UserImg: string }> = ({ UserImg }) => {
  return (
    <div className="flex w-full items-center justify-between">

      <div className="flex items-center gap-[1vw]">
        <div className="bg-secondaryButtonBackground rounded-lg p-1">
          <img
            src={UserImg}
            alt="User image"
            className="h-[5vw] w-[5vw] mobile-tablet:h-[4vw] mobile-tablet:w-[4vw] tablet:h-[3vw] tablet:w-[3vw] object-contain"
          />
        </div>
        <div className="text-[2.5vw] mobile-tablet:text-[2vw] tablet:text-[1.3vw] font-semibold">
          Opponent
        </div>
      </div>
      
      <LineSpinner />
    </div>
  );
};

export default WaitingOpponent;
