import React from 'react';
import './Tile.css';

type TileProps = {
  figure: string;
  onDragStart: (event: React.DragEvent) => void;
};

const Tile: React.FC<TileProps> = ({ figure, onDragStart }) => {
  return (
    <div 
      draggable
      onDragStart={onDragStart}
      className="tile"
    >
      {figure}
    </div>
  );
};

export default Tile;
