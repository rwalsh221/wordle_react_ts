import { useState } from 'react';
import classes from './Main.module.css';
import GameBoard from '../GameBoard/GameBoard';
import Keyboard from '../Keyboard/Keyboard';

const Main = () => {
  const [userInput, setUserInput] = useState<{
    [key: string]: { active: boolean; input: string[] };
  }>({
    row1: { active: false, input: [''] },
    row2: { active: false, input: [''] },
    row3: { active: false, input: [''] },
    row4: { active: false, input: [''] },
    row5: { active: false, input: [''] },
    row6: { active: false, input: [''] },
  });

  const [winningWord, setWinningWord] = useState('');
  return (
    <main className={classes.main}>
      <GameBoard userInputProps={userInput} />
      <Keyboard setUserInput={setUserInput} />
    </main>
  );
};

export default Main;
