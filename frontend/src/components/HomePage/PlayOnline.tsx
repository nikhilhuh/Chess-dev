import React, { useEffect, useState } from "react";
import NickName from "./Nickname";
import ErrorModal from "../Modals/ErrorModal";
import ChessBoardImg from "../../assets/images/miscellaneous/chessboard.png";
import QuantumLoader from "../Loaders/QuantumLoader";
import { useRoom } from "../../context/RoomContext";
import FindMatch from "../RandomMatch/FindMatch";

const PlayOnline: React.FC = () => {
  const [nickname, setNickname] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { isLoading, setisLoading } = useRoom();

  useEffect(() => {
    if (error) setisLoading(false);
  }, [error]);

  return (
    <>
      {error && <ErrorModal error={error} onClose={() => setError("")} />}
      {isLoading ? (
        <QuantumLoader />
      ) : (
        <div className="flex flex-col h-full items-center justify-center mobile-tablet:flex-row gap-[10vw] mobile-tablet:gap-[5vw]">
          <img
            src={ChessBoardImg}
            alt="ChessBoardImg"
            className="w-[80vw] mobile-m:w-[70vw] mobile-l:w-[60vw] mobile-tablet:w-[45vw] rounded-lg laptop-sm:rounded-xl"
          />
          <div className="flex flex-col gap-2 tablet:gap-4 h-full items-center justify-center w-full">
            <div className="w-full flex flex-col gap-2 tablet:gap-4 max-w-[60vw] tablet:max-w-[40vw]">
              <NickName nickname={nickname} setNickName={setNickname} />
              <FindMatch nickname={nickname} setError={setError}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayOnline;
