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

    console.log(`Tile dropped: ${droppedFigure} onto ${targetFigure}`);

    setTiles((prevTiles) => {
      const newTiles = [...prevTiles];
      const targetIndex = newTiles.indexOf(targetFigure);
      
      if (targetIndex !== -1) {
        console.log(`Merging tiles: ${targetFigure} with ${droppedFigure}`);
        newTiles[targetIndex] = mergeTiles(targetFigure, droppedFigure);

        // Log the new state of tiles after merge
        console.log(`New state of tiles after merge: ${newTiles}`);

        // Filter out the dropped tile
        const updatedTiles = newTiles.filter(tile => tile !== droppedFigure);

        // Log the final state of tiles
        console.log(`Final state of tiles: ${updatedTiles}`);
        return updatedTiles;
      }

      // Log if no merge happened
      console.log(`No tile was merged. Current state: ${newTiles}`);
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
