import { useState } from 'react';
import classes from './Main.module.css';
import GameBoard from '../GameBoard/GameBoard';
import Keyboard from '../Keyboard/Keyboard';

type userInputType = { [key: string]: { active: boolean; input: string[] } };

const Main = () => {
  // const [userInput, setUserInput] = useState<userInputType>({
  //   row1: { active: true, input: [] },
  //   row2: { active: false, input: [] },
  //   row3: { active: false, input: [] },
  //   row4: { active: false, input: [] },
  //   row5: { active: false, input: [] },
  //   row6: { active: false, input: [] },
  // });

  const [userInput2, setUserInput2] = useState<string[][]>([]);

  const userInputHandler = (event: React.KeyboardEvent) => {
    console.log('sadhjhdksjahdkajhdjksd');
    const key = event.key;
    if (userInput2[5]?.length === 5) {
      setGameRunning(false);
      return;
    }
    if (gameRunning === false) {
      return;
    }
    const userInputCopy = [...userInput2];
    if (userInputCopy.length > 6) {
      return;
    }
    if (userInputCopy.length === 0) {
      console.log(2);
      userInputCopy.push([]);
      console.log(userInputCopy.length);
    }
    if (userInputCopy[userInputCopy.length - 1].length < 5) {
      console.log(3);
      userInputCopy[userInputCopy.length - 1].push(key);
    } else {
      userInputCopy.push([]);
      userInputCopy[userInputCopy.length - 1].push(key);
    }
    console.log(userInputCopy);
    setUserInput2(userInputCopy);
    return;
  };

  /*
  object keys for each or for loop.
  if row active is true && input.length <5 push keypress to input array
  else set active false and move to next key and set active true
  

  */

  // GET FROM JSON FILE
  const [winningWord, setWinningWord] = useState('');
  // SET FALSE ON FAIL OR SUCCESS
  const [gameRunning, setGameRunning] = useState(true);
  return (
    <main
      className={classes.main}
      tabIndex={0}
      onKeyDown={(event) => {
        userInputHandler(event);
      }}
    >
      <p>{gameRunning ? 'game is running' : 'game is not running'}</p>
      <GameBoard userInputProps={userInput2} />
      {/* <Keyboard setUserInput={setUserInput} /> */}
    </main>
  );
};

export default Main;
