import React, { useState } from "react";
import GameOptions from "./GameOptions";
import ResetButton from "./ResetButton";
import GameHistory from "./GameHistory";
import LeaveRoom from "./LeaveRoom";
import ErrorModal from "../../Modals/ErrorModal";
import { useRoom } from "../../../context/RoomContext";
import { TbCopy } from "react-icons/tb";
import { TbCopyCheck } from "react-icons/tb";

const OptionsBar: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const { roomId, privateRoom } = useRoom();

  if (!roomId) return <></>;

  const handleRoomIdCopy = () => {
    if (roomId) {
      navigator.clipboard
        .writeText(roomId)
        .then(() => {
          setCopied(true);
        })
        .catch((error) => {
          setError(error);
          setCopied(false);
        });
    }
  };

  return (
    <div className="bg-rgbaBackground rounded-xl 4k:rounded-3xl w-[92vw] mobile-m:w-[85vw] mobile-l:w-[80vw] tablet:w-[35vw] laptop-sm:w-[30vw] laptop-l:w-[25vw] h-[calc(100svh-60px)] tablet:h-full text-[3vw] mobile-tablet:text-[2vw] tablet:text-[1.5vw] laptop-sm:text-[1vw] flex flex-col overflow-hidden">
      {error && <ErrorModal onClose={() => setError("")} error={error} />}
      <div className="bg-rgba2Background p-[3vw] tablet:p-[1vw] flex justify-center items-center rounded-tr-xl 4k:rounded-tr-3xl rounded-tl-xl 4k:rounded-tl-3xl font-bold text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-sm:text-[1.5vw] laptop-l:text-[1.2vw]">
        Play {privateRoom ? "with Friends" : "Online"}
      </div>
      <div className="h-full flex flex-col gap-2 laptop-l:gap-3 p-[4vw] tablet:p-[1.5vw] laptop-sm:p-[1vw]">
        <div className="flex flex-wrap gap-[2vw] justify-center items-center font-semibold text-[3vw] mobile-tablet:text-[2vw] tablet:text-[1.5vw] laptop-sm:text-[1vw]">
          <ResetButton />
          <LeaveRoom setError={setError} />
        </div>
        <hr />
        <div className="flex-1 overflow-y-auto">
          <GameHistory />
        </div>
        <hr />
        <GameOptions />
        <div
          className={`${
            privateRoom
              ? "flex gap-1 justify-center items-baseline w-full text-center"
              : "hidden"
          }`}
        >
          <p className="text-[2.8vw] mobile-m:text-[2.4vw] mobile-l:text-[1.9vw] mobile-tablet:text-[1.6vw] tablet:text-[1vw] laptop-sm:text-[0.8vw] laptop-l:text-[0.7vw]">
            Invite other players by sending them this room id:
          </p>
          <div className="flex gap-0.5 items-center text-[3.2vw] mobile-m:text-[2.8vw] mobile-l:text-[2.2vw] mobile-tablet:text-[2vw] tablet:text-[1.4vw] laptop-sm:text-[1.1vw] laptop-l:text-[0.9vw]">
            <p>{roomId}</p>
            <div onClick={handleRoomIdCopy} className="cursor-pointer">
              {copied ? <TbCopyCheck /> : <TbCopy />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsBar;
