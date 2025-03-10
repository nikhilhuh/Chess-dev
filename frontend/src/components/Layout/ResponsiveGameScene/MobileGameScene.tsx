import React from "react";
import ChessGame from "../../GameLayout/ChessGame";
import OptionsBar from "../../GameLayout/OptionsBar/OptionsBar";

const MobileGameScene: React.FC<{isWaiting: boolean}> = ({isWaiting}) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-[10vw] px-2 pt-4 pb-6">
      <ChessGame isWaiting={isWaiting}/>
      <OptionsBar />
    </div>
  );
};

export default MobileGameScene;
