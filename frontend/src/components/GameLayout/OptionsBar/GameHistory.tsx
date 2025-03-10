import React, { useEffect, useState } from "react";
import { gameMove } from "../../../utils/constants";
import { useRoom } from "../../../context/RoomContext";
;

const GameHistory: React.FC = () => {
  const [moves, setMoves] = useState<gameMove[]>([]);
  const { room } = useRoom();

  useEffect(() => {
    if (room?.gameHistory) setMoves(room.gameHistory);
  }, [room?.gameHistory]);

  if (!room) return <></>;

  return (
    <div>
      <div className="flex flex-col gap-[0.5vw] text-[3vw] mobile-l:text-[2.5vw] mobile-tablet:text-[1.5vw] tablet:text-[1.5vw] laptop-sm:text-[1vw]">
        <div className="text-center">Game History</div>
        <ul className="list-decimal list-inside space-y-[1vw] tablet:space-y-[0.5vw]">
          {moves &&
            moves.map((move, index) => (
              <li
                key={index}
                className="grid grid-cols-[auto_1fr] gap-2 items-center"
              >
                {/* This is the list number */}
                <span>{index + 1}.</span>

                {/* Moves container */}
                <div className="flex justify-between w-full">
                  {move.map((each, subIndex) =>
                    each ? (
                      <div
                        key={subIndex}
                        className="flex gap-[0.4vw] bg-secondaryBackground p-1 rounded-md"
                      >
                        <div>{each.piece}</div>
                        <div>{each.initialPosition}</div>
                        <div>-&gt;</div>
                        <div>{each.finalPosition}</div>
                      </div>
                    ) : null
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default GameHistory;
