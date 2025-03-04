import React from "react";
import { FaFlag } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";

const GameOptions: React.FC = () => {
  return (
    <div className="flex flex-wrap w-full gap-[2vw] justify-center items-center font-semibold text-[3vw] mobile-tablet:text-[2vw] tablet:text-[1.5vw] laptop-sm:text-[1vw]">
        <button title="Offer Draw" className="flex gap-[1vw] tablet:min-w-[15vw] tablet:max-w-[15vw] laptop-sm:min-w-[10vw] laptop-sm:max-w-[10vw] text-center justify-center tablet:gap-[0.5vw] items-center px-[2.5vw] py-[1.5vw] tablet:px-[1vw] tablet:py-[0.8vw] bg-secondaryButtonBackground hover:bg-secondaryButtonBackgroundHover hover:scale-105 rounded-full shadow-xl transition">
        <FaHandshake />
        <p>Offer Draw</p>
      </button>
      <button title="Resign" className="flex gap-[1vw] tablet:min-w-[15vw] tablet:max-w-[15vw] laptop-sm:min-w-[10vw] laptop-sm:max-w-[10vw] text-center justify-center tablet:gap-[0.5vw] items-center px-[2.5vw] py-[1.5vw] tablet:px-[1vw] tablet:py-[0.8vw] bg-secondaryButtonBackground hover:bg-secondaryButtonBackgroundHover hover:scale-105 rounded-full shadow-xl transition">
        <FaFlag />
        <p>Resign</p>
      </button>
    </div>
  );
};

export default GameOptions;
