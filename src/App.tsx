import React, {useState, useCallback} from 'react';
import Board from './components/Board';
import Hand from './components/Hand';
import Dice from './components/Dice';

const App = () => {
  const [handTiles, setHandTiles] = useState<string[]>([]);

  const handleDiceRoll = (figures: string[]) => {
    console.log("Dice rolled, new figures:", figures);
    setHandTiles(figures); 
  };
  const removeTileFromHand = useCallback((figure: string) => {
    setHandTiles((prevTiles) => prevTiles.filter(tile => tile !== figure));
  }, []);

  return (
    <div className="App">
      <h1>Geomantic Game</h1>
      <Board onTilePlaced={removeTileFromHand} />
      <Dice onRoll={handleDiceRoll} />
      <Hand tiles={handTiles} setTiles={setHandTiles} />
    </div>
  );
};

export default App;
