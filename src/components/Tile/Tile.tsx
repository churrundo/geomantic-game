// components/Tile/Tile.tsx
import React from 'react';
import './Tile.css';

type TileProps = {
  figure: string;
  onDragStart: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void; 
};

const Tile: React.FC<TileProps> = ({ figure, onDragStart, onDrop }) => {
  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("text/plain", figure);
    onDragStart(event); // Pass the event, not the figure
  };
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    onDrop(event);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault(); // Necessary to allow dropping
  };

  return (
    <div 
      draggable
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="tile"
    >
      {figure}
    </div>
  );
};

export default Tile;
