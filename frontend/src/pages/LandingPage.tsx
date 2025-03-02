import React from "react";
import { useLocation } from "react-router-dom";
import HomeOptions from "../components/HomePage/HomeOptions";
import PlayOnline from "../components/HomePage/PlayOnline";
import PlayFriends from "../components/HomePage/PlayFriends";

const LandingPage: React.FC = () => {
  const location = useLocation();

  return (
    <div className="h-full p-2 mobile-l:p-3 laptop-sm:p-4 4k:p-10">
      {location.pathname === "/" && <HomeOptions />}
      {location.pathname === "/online" && <PlayOnline />}
      {location.pathname === "/friends" && <PlayFriends />}
    </div>
  );
};

export default LandingPage;
