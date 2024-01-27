// components/Dice/Dice.tsx
import React from 'react';
import './Dice.css';

const Dice: React.FC<{ onRoll: (figures: string[]) => void }> = ({ onRoll }) => {
  const rollDice = () => {
    const figures = Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => Math.round(Math.random()).toString()).join('')
    );
    onRoll(figures);
  };

  return (
    <div className="dice">
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  );
};

export default Dice;
