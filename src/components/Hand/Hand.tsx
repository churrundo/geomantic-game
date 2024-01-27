// components/Hand/Hand.tsx
import React from 'react';
import Tile from '../Tile';
import { mergeTiles } from '../../utils/gameUtils'; // Assuming this utility is implemented
import './Hand.css';

type HandProps = {
  tiles: string[];
  setTiles: React.Dispatch<React.SetStateAction<string[]>>;
};

const Hand: React.FC<HandProps> = ({ tiles, setTiles }) => {
  const handleTileDrop = (targetFigure: string) => (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFigure = event.dataTransfer.getData("text/plain");
  
    setTiles((prevTiles) => {
      const newTiles = [...prevTiles];
      const targetIndex = newTiles.indexOf(targetFigure);
      if (targetIndex !== -1) {
        newTiles[targetIndex] = mergeTiles(targetFigure, droppedFigure);
        return newTiles.filter(tile => tile !== droppedFigure);
      }
      return newTiles;
    });
  };

  return (
    <div className="hand">
      {tiles.map((tile, index) => (
        <Tile 
          key={`${tile}-${index}`} 
          figure={tile}
          onDragStart={() => {}} // Implement if needed
          onDrop={handleTileDrop(tile)}
        />
      ))}
    </div>
  );
};

export default Hand;
