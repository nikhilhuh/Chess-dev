import React from "react";

const NickName: React.FC<{
  nickname: string;
  setNickName: React.Dispatch<React.SetStateAction<string>>;
}> = ({ nickname, setNickName }) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="inputNickName"
        className="font-mono text-center text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw]"
      >
        Enter your NickName
      </label>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickName(e.target.value)}
        id="inputNickName"
        name="inputNickName"
        className="outline-none bg-gray-200 text-black border-gray-200 border-2 rounded-full text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] py-1 px-2 laptop-sm:px-4 4k:px-8"
        required
      />
    </div>
  );
};

export default NickName;
