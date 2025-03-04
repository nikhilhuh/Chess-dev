import React from "react";
import ChessGame from "../../GameLayout/ChessGame";
import OptionsBar from "../../GameLayout/OptionsBar/OptionsBar";

const TabletGameScene: React.FC = () => {
  return (
    <div className="h-full w-full flex justify-around gap-[2vw] p-[2vw]">
      <ChessGame />
      <OptionsBar />
    </div>
  );
};

export default TabletGameScene;
