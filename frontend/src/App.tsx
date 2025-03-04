import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/Layout/Navbar/Sidebar";
import Navbar from "./components/Layout/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <div
        className={`h-screen bg-primaryBackground text-gray-100 overflow-x-hidden flex flex-col laptop-sm:flex-row`}
      >
        <div className="hidden laptop-sm:block">
          <Sidebar />
        </div>
        <div className="laptop-sm:hidden">
          <Navbar />
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
};

export default App;
