import React from "react";
import ChessGame from "../GamePageLayout/ChessGame";
import OptionsBar from "../GamePageLayout/OptionsBar";

const MobileGameScene: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col justify-between gap-[8vw] px-2 pt-4 pb-2">
      <ChessGame />
      <OptionsBar />
    </div>
  );
};

export default MobileGameScene;
