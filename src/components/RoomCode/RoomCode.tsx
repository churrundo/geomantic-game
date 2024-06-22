// src/components/RoomCode.tsx
import React from "react";
import { useGameContext } from "../../GameContext"; // Adjust the import path as needed

const RoomCode: React.FC = () => {
  const { state } = useGameContext();
  const { roomCode } = state;
  
  return (
    <div className="room-code">
      <h3>Room Code: {roomCode || "Not connected"}</h3>
    </div>
  );
};

export default RoomCode;
