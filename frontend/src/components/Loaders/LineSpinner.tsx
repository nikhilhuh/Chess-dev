import React from "react";
import { lineSpinner } from "ldrs";

const LineSpinner: React.FC = () => {
  lineSpinner.register();
  return (
      <div className="flex items-center gap-[1vw] mobile-tablet:gap-[0.5vw]">
        <div className="text-[2vw] mobile-tablet:text-[1.5vw] tablet:text-[1vw] lapotp-sm:text-[0.8vw]">Waiting for Opponent</div>
        <div className="hidden laptop-sm:block">
          <l-line-spinner size="30" speed="1.0" color="white"></l-line-spinner>
        </div>
        <div className="laptop-sm:hidden block">
          <l-line-spinner size="20" speed="1.0" color="white"></l-line-spinner>
        </div>
      </div>
  );
};

export default LineSpinner;
