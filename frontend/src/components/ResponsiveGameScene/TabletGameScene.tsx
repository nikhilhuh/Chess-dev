import React from "react";
import ChessGame from "../GamePageLayout/ChessGame";
import OptionsBar from "../GamePageLayout/OptionsBar";

const TabletGameScene: React.FC = () => {
  return (
    <div className="h-full w-full flex justify-around gap-[2vw] p-[2vw]">
      <ChessGame />
      <OptionsBar />
    </div>
  );
};

export default TabletGameScene;
