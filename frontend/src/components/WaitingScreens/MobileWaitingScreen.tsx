import React from "react";
import RoomDetails from "../RoomOptions/RoomOptions";
import WaitingGame from "../GameLayout/WaitingGame";

const MobileWaitingScreen: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center gap-[8vw] px-2 pt-4 pb-2">
      <WaitingGame />
      <RoomDetails />
    </div>
  );
};

export default MobileWaitingScreen;
