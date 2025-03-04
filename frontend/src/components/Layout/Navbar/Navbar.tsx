import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import LogoImg from "../../../assets/images/miscellaneous/logo.webp";

const Navbar: React.FC = () => {
  const [isSidebar, setIsSidebar] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebar((prev) => !prev);
  };

  useEffect(() => {
    if (isSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebar]);

  return (
    <div className="bg-secondaryBackground">
      <div className="flex justify-between px-4 py-2 font-bold items-center text-[4vw] mobile-l:text-[3vw] mobile-tablet:text-[2vw]">

       <div className="flex gap-[3vw] items-center">
         <div className="text-[6vw] mobile-m:text-[5.5vw] mobile-l:text-[5vw] tablet:text-[3.5vw] cursor-pointer" onClick={toggleSidebar}>
           <IoMenu />
         </div>
         <Link to="/">
           <div className="flex items-center gap-[2vw] mobile-m:gap-[1.5vw] mobile-l:gap-[1vw]">
             <img
               src={LogoImg}
               alt="Logo"
               className="h-[8vw] w-[8vw] mobile-m:h-[7vw] mobile-m:w-[7vw] mobile-l:h-[6vw] mobile-l:w-[6vw] tablet:h-[5vw] tablet:w-[5vw] rounded-full"
             />
             <div className="font-bold font-mono">Chess Online</div>
           </div>
         </Link>
       </div>

       <button className="bg-secondaryButtonBackground hover:bg-secondaryButtonBackgroundHover hover:scale-105 p-1 text-white rounded-md">
          Log In
        </button>
      </div>

      {isSidebar && (
        <div className="absolute w-full z-50 top-0 left-0">
          <Sidebar toggleSidebar={toggleSidebar} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
