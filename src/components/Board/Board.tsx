import React from 'react';

const Board: React.FC = () => {
  const gridSize = 4;

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    // Logic to place the tile on the board
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault(); // Necessary to allow dropping
  };

  return (
    <div 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${gridSize}, 50px)`, 
        gridGap: '5px' 
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {Array.from({ length: gridSize * gridSize }).map((_, index) => (
        <div key={index} style={{ width: '50px', height: '50px', border: '1px solid grey' }} />
      ))}
    </div>
  );
};

export default Board;
