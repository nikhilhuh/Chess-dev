import React from "react";
import GameOptions from "./GameOptions";
import ResetButton from "./ResetButton";
import RoomDetails from "../../RoomOptions/RoomOptions";
import GameHistory from "./MovesHistory";

const OptionsBar: React.FC = () => {
  return (
    <div className="bg-rgbaBackground rounded-xl 4k:rounded-3xl min-h-[calc(100svh-52px)] tablet:min-h-0 tablet:h-full">
      <div className="flex flex-col h-full justify-between gap-2 p-[4vw] tablet:p-[1.5vw]">
        <ResetButton />
        <RoomDetails />
        <GameHistory />
        <GameOptions />
      </div>
    </div>
  );
};

export default OptionsBar;
