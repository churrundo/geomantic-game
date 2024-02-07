import React from 'react';
import { rollDice } from '../../utils/gameUtils';
import './Dice.css';

const Dice: React.FC<{ onRoll: (figures: string[]) => void; canRoll: boolean }> = ({ onRoll, canRoll }) => {
  const handleDiceRoll = () => {
    if (!canRoll) {
      console.log("Dice can't be rolled more than once per turn.");
      return;
    }
    const figures = rollDice();
    console.log("Dice Rolled:", figures);
    onRoll(figures);
  };

  return (
    <div className="dice">
      <button onClick={handleDiceRoll} disabled={!canRoll}>Roll Dice</button>
    </div>
  );
};

export default Dice;