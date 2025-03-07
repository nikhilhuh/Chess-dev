import React from "react";
import WaitingGame from "../GameLayout/WaitingGame";
import OptionsBar from "../GameLayout/OptionsBar/OptionsBar";

const TabletWaitingScreen: React.FC = () => {
  
  return (
    <div className="h-full w-full flex items-center justify-around gap-[2vw] p-[2vw]">
      <WaitingGame />
      <OptionsBar />
    </div>
  );
};

export default TabletWaitingScreen;
