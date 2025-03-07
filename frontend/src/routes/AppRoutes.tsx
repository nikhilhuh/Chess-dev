import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import GamePage from "../pages/GamePage";
import Error404 from "../pages/Error404";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/online" element={<LandingPage />} />
        <Route path="/friends" element={<LandingPage />} />
        <Route path="/online/:roomId" element={<GamePage />} />
        <Route path="/friends/:roomId" element={<GamePage />} />
      </Routes>
  );
};

export default AppRoutes;
