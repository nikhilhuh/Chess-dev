import React from "react";
import RoomDetails from "../RoomOptions/RoomOptions";
import WaitingGame from "../GameLayout/WaitingGame";

const TabletWaitingScreen: React.FC = () => {
  
  return (
    <div className="h-full w-full flex items-center justify-around gap-[2vw] p-[2vw]">
      <WaitingGame />
      <RoomDetails />
    </div>
  );
};

export default TabletWaitingScreen;
