import React, { useState } from "react";
import GameOptions from "./GameOptions";
import ResetButton from "./ResetButton";
import GameHistory from "./MovesHistory";
import LeaveRoom from "../../RoomOptions/components/LeaveRoom";
import ErrorModal from "../../Modals/ErrorModal";

const OptionsBar: React.FC = () => {
  const [error, setError] = useState<string>("");
  return (
    <div className="bg-rgbaBackground rounded-xl 4k:rounded-3xl w-[90vw] min-h-[calc(100svh-60px)] tablet:min-h-0 tablet:h-full">
      {error && <ErrorModal onClose={() => setError("")} error={error} />}
      <div className="flex flex-col h-full justify-between gap-2 p-[4vw] tablet:p-[1.5vw]">
        <div className="flex justify-between items-center gap-2">
          <ResetButton />
          <LeaveRoom setError={setError} />
        </div>
        <GameHistory />
        <GameOptions />
      </div>
    </div>
  );
};

export default OptionsBar;
