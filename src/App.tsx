import React from 'react';
import Board from './components/Board';
import Tile from './components/Tile';

const App = () => {

  const handleDragStart = (event: React.DragEvent) => {
    // Handle drag start logic if needed
  };
  return (
    <div className="App">
      <h1>Geomantic Game</h1>
      <Board />
      <div style={{ marginTop: '20px' }}>
        <Tile figure="Sample Figure" onDragStart={handleDragStart} />
      </div>
    </div>
  );
};

export default App;
