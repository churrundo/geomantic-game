import React from 'react';
import './Tile.css';

type TileProps = {
  figure: string;
  onDragStart: (event: React.DragEvent) => void;
};

const Tile: React.FC<TileProps> = ({ figure, onDragStart }) => {
    const handleDragStart = (event: React.DragEvent) => {
      event.dataTransfer.setData("figure", figure);
      onDragStart(event);
    };
  
    return (
      <div 
        draggable
        onDragStart={handleDragStart}
        className="tile"
      >
        {figure}
      </div>
    );
  };
  

export default Tile;
