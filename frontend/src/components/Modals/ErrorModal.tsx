import React from "react";
import { MdError } from "react-icons/md";

interface ErrorModalProps {
  error: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ error, onClose }) => {
  return (
    <div className="fixed inset-0 bg-primaryButtonBackground bg-opacity-50 z-40 flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primaryBackground z-50 max-h-[60vh] min-w-[90%] mobile-m:min-w-[75%] mobile-l:min-w-[65%] tablet:min-w-[55%] laptop-sm:min-w-[40%] laptop-l:min-w-[30%] 4k:min-w-[25%] max-w-[90%] mobile-m:max-w-[75%] mobile-l:max-w-[65%] tablet:max-w-[55%] laptop-sm:max-w-[40%] laptop-l:max-w-[30%] 4k:max-w-[25%] overflow-hidden rounded-xl laptop-l:rounded-3xl p-4 flex flex-col items-center gap-[2.5vw] tablet:gap-[1.5vw] laptop-sm:gap-[1vw] laptop-l:gap-[0.8vw] shadow-2xl drop-shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="text-red-500 font-semibold text-[8vw] tablet:text-[5vw] laptop-sm:text-[3vw] laptop-l:text-[2.5vw]">
            <MdError />
          </div>
          <p className="text-red-500 font-semibold font-serif text-[6vw] tablet:text-[4vw] laptop-sm:text-[3vw] laptop-l:text-[2.5vw]">
            Error
          </p>
        </div>
        <div className="break-words text-center text-[4vw] tablet:text-[3vw] laptop-sm:text-[2vw] laptop-l:text-[1.7vw]">
          {error}
        </div>
        <button
          onClick={onClose}
          className="bg-secondaryButtonBackground hover:bg-secondaryButtonBackgroundHover hover:scale-105 transition font-semibold text-white px-4 py-2 rounded-md text-[3vw] tablet:text-[2vw] laptop-sm:text-[1.5vw] laptop-l:text-[1.2vw]"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
