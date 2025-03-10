import { ReactNode } from "react";
import { RoomProvider } from "./RoomContext";
import { PlayerProvider } from "./PlayerContext";
import { AuthProvider } from "./AuthContext";

// Create an AppProvider that wraps RoomProvider , PlayerProvider and AuthProvider
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <RoomProvider>
      <PlayerProvider>
        <AuthProvider>{children}</AuthProvider>
      </PlayerProvider>
    </RoomProvider>
  );
};
