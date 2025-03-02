import React from "react";
import { quantum } from "ldrs";

const QuantumLoader: React.FC = () => {
  quantum.register();
  return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="hidden laptop-sm:flex justify-center">
          <l-quantum size="120" speed="1.0" color="white"></l-quantum>
        </div>
        <div className="laptop-sm:hidden flex justify-center">
          <l-quantum size="60" speed="1.0" color="white"></l-quantum>
        </div>
        <div className="text-white text-center text-[3vw] tablet:text-[2vw] laptop-sm:text-[1.5vw] laptop-l:text-[1vw]">
          Connecting to the room...
        </div>
      </div>
  );
};

export default QuantumLoader;
