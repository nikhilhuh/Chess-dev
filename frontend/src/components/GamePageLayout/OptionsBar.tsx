import React from "react";
import RoomOptions from "./RoomOptions";
import GameOptions from "./GameOptions";
import GameHistory from "./GameHistory";

const OptionsBar: React.FC = () => {
  return (
    <div className="bg-rgbaBackground rounded-xl 4k:rounded-3xl min-h-[calc(100svh-52px)] tablet:min-h-0 tablet:h-full">
      <div className="flex flex-col h-full justify-between gap-[1.5vw] p-[4vw] tablet:p-[1.5vw]">
        <RoomOptions />
        <GameHistory />
        <GameOptions />
      </div>
    </div>
  );
};

export default OptionsBar;
