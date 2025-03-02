import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import CreateRoom from "../FriendsRoom/CreateRoom";
import JoinRoom from "../FriendsRoom/JoinRoom";
import NickName from "./Nickname";
import ErrorModal from "../Modals/ErrorModal";

const PlayOnline: React.FC = () => {
  const [nickname, setNickname] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <>
      {error && <ErrorModal error={error} onClose={() => setError("")} />}
      <div className="h-full flex flex-col">
        <IoArrowBack
          onClick={handleGoBack}
          className="flex text-[12vw] mobile-m:text-[10vw] mobile-l:text-[8vw] tablet:text-[7vw] laptop-sm:text-[5vw] cursor-pointer hover:bg-secondaryButtonBackgroundHover rounded-full p-2 justify-start items-start"
        />
        <div className="flex flex-col gap-2 tablet:gap-4 h-full items-center justify-center w-full">
          
          <div className="w-full flex flex-col gap-2 tablet:gap-4 max-w-[60vw] tablet:max-w-[40vw]">
            <NickName nickname={nickname} setNickName={setNickname} />
            <CreateRoom nickname={nickname} setError={setError} />
            <hr />
            <JoinRoom nickname={nickname} setError={setError} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayOnline;
