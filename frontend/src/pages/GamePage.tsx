import React, { useEffect } from "react";
import { socketListeners } from "../services/socketListeners";
import { useRoom } from "../context/RoomContext";
import socket from "../services/socketSetup";
import QuantumLoader from "../components/Loaders/QuantumLoader";
import TabletGameScene from "../components/ResponsiveGameScene/TabletGameScene";
import MobileGameScene from "../components/ResponsiveGameScene/MobileGameScene";
import { usePlayer } from "../context/PlayerContext";

const GamePage: React.FC = () => {
  const { setReset, isLoading, setisLoading, room } = useRoom();
  const { PlayerDetails } = usePlayer();

  useEffect(() => {
    if (room && PlayerDetails) {
      setisLoading(false);
    }
    if (!room || !PlayerDetails) {
      setisLoading(true);
    }
  }, [room, PlayerDetails]);

  useEffect(() => {
    socketListeners(socket, setReset);

    return () => {
      socket.off("room-updated");
      socket.off("game-over");
      socket.off("reset-game");
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <QuantumLoader />
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
    </>
  );
};

export default GamePage;
