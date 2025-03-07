import React from "react";
import WaitingGame from "../GameLayout/WaitingGame";
import OptionsBar from "../GameLayout/OptionsBar/OptionsBar";

const MobileWaitingScreen: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center gap-[8vw] px-2 pt-4 pb-2">
      <WaitingGame />
      <OptionsBar />
    </div>
  );
};

export default MobileWaitingScreen;
