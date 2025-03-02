import React from "react";
import PlayOnlineImg from "../../assets/miscellaneous/playonline.svg";
import PlayFriendsImg from "../../assets/miscellaneous/playfriends.png";
import ChessBoardImg from "../../assets/miscellaneous/chessboard.png";
import { useNavigate } from "react-router-dom";

const HomeOptions: React.FC = () => {
  const navigate = useNavigate();

  const handlePlayOnline = () => {
    navigate("/online");
  };

  const hanndlePlayWithFriends = () => {
    navigate("/friends");
  };

  return (
    <div className="flex flex-col h-full items-center justify-center mobile-tablet:flex-row gap-[10vw] mobile-tablet:gap-[5vw]">
      <img
        src={ChessBoardImg}
        alt="ChessBoardImg"
        className="w-[80vw] mobile-m:w-[70vw] mobile-l:w-[60vw] mobile-tablet:w-[45vw] rounded-lg laptop-sm:rounded-xl"
      />
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-[6vw] mobile-m:text-[5vw] mobile-tablet:text-[4vw] font-bold text-center">
          Play Chess Online!
        </h2>
        <div className="flex flex-col gap-[4vw] mobile-tablet:gap-[2vw] mt-4">
          <button
            onClick={handlePlayOnline}
            className="p-4 laptop-l:p-6 4k:p-10 4k:rounded-3xl bg-primaryButtonBackground rounded-2xl drop-shadow-2xl shadow-2xl hover:scale-105 hover:bg-primaryButtonBackgroundHover transition flex items-center gap-[5vw] mobile-tablet:gap-[2vw] text-white"
          >
            <img
              src={PlayOnlineImg}
              alt=""
              className="w-[10vw] mobile-tablet:w-[6vw]"
            />
            <div className="flex flex-col text-start">
              <div className="text-[4vw] mobile-tablet:text-[2vw] font-bold">
                Play Online
              </div>
              <p className="text-[3vw] mobile-tablet:text-[1.3vw]">
                Play with someone at random
              </p>
            </div>
          </button>
          <button
            onClick={hanndlePlayWithFriends}
            className="p-4  laptop-l:p-6 4k:p-10 4k:rounded-3xl bg-secondaryButtonBackground rounded-2xl drop-shadow-2xl shadow-2xl hover:scale-105 hover:bg-secondaryButtonBackgroundHover transition flex items-center gap-[5vw] mobile-tablet:gap-[2vw] text-white"
          >
            <img
              src={PlayFriendsImg}
              alt=""
              className="w-[10vw] mobile-tablet:w-[6vw]"
            />
            <div className="flex flex-col text-start">
              <div className="text-[4vw] mobile-tablet:text-[2vw] font-bold">
                Play With Friends
              </div>
              <p className="text-[3vw] mobile-tablet:text-[1.3vw]">
                Play with your friends online
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeOptions;
