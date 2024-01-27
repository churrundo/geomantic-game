import React, {useState} from 'react';
import Board from './components/Board';
import Hand from './components/Hand';
import Dice from './components/Dice';

const App = () => {
  const [handTiles, setHandTiles] = useState<string[]>([]);

  const handleDiceRoll = (figures: string[]) => {
    setHandTiles(figures); 
  };

  return (
    <div className="App">
      <h1>Geomantic Game</h1>
      <Board />
      <Dice onRoll={handleDiceRoll} />
      <Hand tiles={handTiles} setTiles={setHandTiles} />
    </div>
  );
};

export default App;
