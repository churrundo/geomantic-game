import React from 'react';
import { rollDice } from '../../utils/gameUtils';
import './Dice.css';

const Dice: React.FC<{ onRoll: (figures: string[]) => void }> = ({ onRoll }) => {
  const handleDiceRoll = () => {
    const figures = rollDice();
    onRoll(figures);
  };

  return (
    <div className="dice">
      <button onClick={handleDiceRoll}>Roll Dice</button>
    </div>
  );
};

export default Dice;