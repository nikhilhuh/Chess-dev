import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { Room } from "../utils/constants";

interface RoomContextType {
  room: Room | null;
  roomId: string | null;
  privateRoom: boolean;
  setPrivateRoom: React.Dispatch<React.SetStateAction<boolean>>;
  reset: boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setisLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const defaultRoomContext: RoomContextType = {
  room: null,
  roomId: null,
  privateRoom: false,
  setPrivateRoom: () => {},
  reset: false,
  setReset: () => {},
  isLoading: true,
  setisLoading: () => {},
};

const RoomContext = createContext<RoomContextType>(defaultRoomContext);

export const useRoom = (): RoomContextType => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
};

interface RoomProviderProps {
  children: ReactNode;
}

export const RoomProvider = ({ children }: RoomProviderProps) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [privateRoom, setPrivateRoom] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);

  useEffect(() => {
    const updateFromStorage = () => {
      const storedRoomId = localStorage.getItem("roomId");
      const storedRoomDetails = localStorage.getItem("roomDetails");

      if (storedRoomId) setRoomId(storedRoomId);
      if (storedRoomDetails) {
        try {
          const parsedRoom = JSON.parse(storedRoomDetails);
          setRoom(parsedRoom);
        } catch (error) {
          console.error("Error parsing roomDetails:", error);
        }
      }
    };

    updateFromStorage();
    window.addEventListener("storage", updateFromStorage);

    return () => {
      window.removeEventListener("storage", updateFromStorage);
    };
  }, []);

  return (
    <RoomContext.Provider
      value={{
        room,
        roomId,
        privateRoom,
        setPrivateRoom,
        reset,
        setReset,
        isLoading,
        setisLoading,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
