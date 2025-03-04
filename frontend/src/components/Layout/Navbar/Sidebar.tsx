import React from "react";
import { Link, useLocation } from "react-router-dom";
import HomeImg from "../../../assets/images/miscellaneous/home.svg";
import LogoImg from "../../../assets/images/miscellaneous/logo.webp";
import PLayFriendsImg from "../../../assets/images/miscellaneous/playfriends.png";
import PLayOnlineImg from "../../../assets/images/miscellaneous/playonline.svg";
import { IoMdClose } from "react-icons/io";

interface SidebarProps {
  toggleSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar }) => {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isPlayFriends = location.pathname.startsWith("/friends");
  const isPlayOnline = location.pathname.startsWith("/online");

  return (
    <div className="p-4 laptop-l:px-2 laptop-l:py-4 bg-secondaryBackground dark:bg-primarySecondary flex flex-col justify-between h-screen laptop-sm:w-[15vw] laptop-sm:max-w-[15vw] text-[5vw] mobile-m:text-[4.5vw] mobile-l:text-[4vw] tablet:text-[2.5vw] laptop-sm:text-[1.2vw] z-50">
      <div className="flex justify-between">
        <div onClick={toggleSidebar} className="laptop-sm:hidden text-[6vw] mobile-m:text-[5.5vw] mobile-l:text-[5vw] tablet:text-[3.5vw] cursor-pointer">
          <IoMdClose />
        </div>
        <div className="flex items-center gap-[3vw] mobile-m:gap-[2.5vw] mobile-l:gap-[2vw] tablet:gap-[1.5vw] laptop-sm:gap-[1vw]">
          <img
            src={LogoImg}
            alt="Logo"
            className="h-[8vw] w-[8vw] mobile-m:h-[7vw] mobile-m:w-[7vw] mobile-l:h-[6vw] mobile-l:w-[6vw] tablet:h-[5vw] tablet:w-[5vw] laptop-sm:h-[4vw] laptop-sm:w-[4vw] rounded-full"
          />
          <div className="font-bold font-mono">Chess Online</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="pt-2 pb-4 space-y-1 text-md md:text-lg dark:text-gray-100">
          <Link to="/" onClick={toggleSidebar}>
            <li
              className={`${
                isHome ? "bg-primaryButtonBackground text-black font-bold" : ""
              }`}
            >
              <div className="flex items-center p-2 4k:p-4 space-x-3 cursor-pointer laptop-sm:hover:scale-105">
                <img src={HomeImg} alt="Home " className="h-[6vw] w-[6vw] mobile-m:h-[5vw] mobile-m:w-[5vw] mobile-l:h-[4vw] mobile-l:w-[4vw] tablet:h-[3vw] tablet:w-[3vw] laptop-sm:h-[2vw] laptop-sm:w-[2vw]" />
                <span>Home</span>
              </div>
            </li>
          </Link>
          <Link to="/friends" onClick={toggleSidebar}>
            <li
              className={`${
                isPlayFriends
                  ? "bg-primaryButtonBackground text-black font-bold"
                  : ""
              }`}
            >
              <div className="flex items-center p-2 4k:p-4 space-x-3 cursor-pointer laptop-sm:hover:scale-105">
                <img
                  src={PLayFriendsImg}
                  alt="Play with Friends"
                  className="h-[6vw] w-[6vw] mobile-m:h-[5vw] mobile-m:w-[5vw] mobile-l:h-[4vw] mobile-l:w-[4vw] tablet:h-[3vw] tablet:w-[3vw] laptop-sm:h-[2vw] laptop-sm:w-[2vw]"
                />
                <span>Play with Friends</span>
              </div>
            </li>
          </Link>
          <Link to="/online" onClick={toggleSidebar}>
            <li
              className={`${
                isPlayOnline
                  ? "bg-primaryButtonBackground text-black font-bold"
                  : ""
              }`}
            >
              <div className="flex items-center p-2 4k:p-4 space-x-3 cursor-pointer laptop-sm:hover:scale-105">
                <img
                  src={PLayOnlineImg}
                  alt="Play Online"
                  className="h-[6vw] w-[6vw] mobile-m:h-[5vw] mobile-m:w-[5vw] mobile-l:h-[4vw] mobile-l:w-[4vw] tablet:h-[3vw] tablet:w-[3vw] laptop-sm:h-[2vw] laptop-sm:w-[2vw]"
                />
                <span>Play Online</span>
              </div>
            </li>
          </Link>
        </ul>
      </div>

      <div className="flex flex-col gap-2 laptop-l:gap-4 4k:gap-6 w-full justify-center">
        <button className="bg-primaryButtonBackground hover:bg-primaryButtonBackgroundHover laptop-sm:hover:scale-105 p-2 laptop-sm:px-4 laptop-sm:py-2 4k:p-4 text-black font-bold rounded-lg 4k:rounded-2xl">
          Sign In
        </button>

        <button className="bg-secondaryButtonBackground hover:bg-secondaryButtonBackgroundHover laptop-sm:hover:scale-105 p-2 laptop-sm:px-4 laptop-sm:py-2 4k:p-4 text-white font-bold rounded-lg 4k:rounded-2xl">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
