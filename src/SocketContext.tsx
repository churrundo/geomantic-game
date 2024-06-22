// SocketContext.tsx
import React, { createContext, useContext, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import {SocketContextType, SocketProviderProps} from "./types/types"

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Connect to the server
    socketRef.current = io('http://localhost:4000');

    socketRef.current.on('connect', () => {
      console.log('Connected to server');
    });

    return () => {
      if (socketRef.current) {
        console.log('Disconnecting from server');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};
