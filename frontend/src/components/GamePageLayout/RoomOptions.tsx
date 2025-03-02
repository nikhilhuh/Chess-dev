import PlayersDetails from "./OptionsBar/PlayersDetails";
import ResetButton from "./OptionsBar/ResetButton";

const RoomOptions: React.FC = () => {
  return (
    <div className="w-full bg-transparent">
      <div className="flex flex-wrap gap-[2vw] justify-center items-center font-semibold text-[3vw] mobile-l:text-[2.5vw] mobile-tablet:text-[1.5vw] tablet:text-[1.5vw] laptop-sm:text-[1vw]">
        <PlayersDetails />
        <div className="flex gap-[1vw] items-center">
          <ResetButton />
        </div>
      </div>
    </div>
  );
};

export default RoomOptions;
