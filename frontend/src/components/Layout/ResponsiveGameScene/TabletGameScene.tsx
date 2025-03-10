import React from "react";
import ChessGame from "../../GameLayout/ChessGame";
import OptionsBar from "../../GameLayout/OptionsBar/OptionsBar";

const TabletGameScene: React.FC<{isWaiting: boolean}> = ({isWaiting}) => {
  return (
    <div className="h-full w-full flex justify-around gap-[2vw] p-[1vw]">
      <ChessGame isWaiting={isWaiting}/>
      <OptionsBar />
    </div>
  );
};

export default TabletGameScene;
