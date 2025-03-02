import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import GamePage from "../pages/GamePage";
import Error404 from "../pages/Error404";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/online" element={<LandingPage />} />
        <Route path="/friends" element={<LandingPage />} />
        <Route path="/online/:roomId" element={<GamePage />} />
        <Route path="/friends/:roomId" element={<GamePage />} />
      </Routes>
  );
};

export default AppRoutes;
