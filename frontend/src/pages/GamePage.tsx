import React, { useEffect, useState } from "react";
import { useRoom } from "../context/RoomContext";
import QuantumLoader from "../components/Loaders/QuantumLoader";
import { usePlayer } from "../context/PlayerContext";
import TabletWaitingScreen from "../components/WaitingScreens/TabletWaitingScreen";
import MobileWaitingScreen from "../components/WaitingScreens/MobileWaitingScreen";
import { socketListeners } from "../services/socket/socketListeners";
import socket from "../services/socket/socketSetup";
import TabletGameScene from "../components/Layout/ResponsiveGameScene/TabletGameScene";
import MobileGameScene from "../components/Layout/ResponsiveGameScene/MobileGameScene";

const GamePage: React.FC = () => {
  const { setReset, isLoading, setisLoading, room } = useRoom();
  const { PlayerDetails } = usePlayer();

  const [isWaiting, setIsWaiting] = useState<boolean>(true);

  useEffect(() => {
    if (room && PlayerDetails) {
      setisLoading(false);
      if (room.startGame) setIsWaiting(false);
      if (!room.startGame) setIsWaiting(true);
    }
    if (!room || !PlayerDetails) {
      setisLoading(true);
    }
  }, [room, PlayerDetails]);

  useEffect(() => {
    socketListeners(socket, setReset);

    return () => {
      socket.off("room-updated");
      socket.off("move-made");
      socket.off("match-made");
      socket.off("game-over");
      socket.off("reset-game");
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      {isLoading ? (
        <QuantumLoader />
      ) : isWaiting ? (
        <div className="h-full">
          <div className="hidden tablet:block h-full">
            <TabletWaitingScreen />
          </div>
          <div className="tablet:hidden h-full">
            <MobileWaitingScreen />
          </div>
        </div>
      ) : (
        <div className="h-full">
          <div className="hidden tablet:block h-full">
            <TabletGameScene />
          </div>
          <div className="tablet:hidden h-full">
            <MobileGameScene />
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
