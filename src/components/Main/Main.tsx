import { useState, useEffect } from 'react';
import classes from './Main.module.css';
import GameBoard from '../GameBoard/GameBoard';
import Keyboard from '../Keyboard/Keyboard';
// import json from '../../json/words.json';

type userInputType = {
  [key: string]: {
    active: boolean;
    input: string[];
    inWinningWord: string[];
    inCorrectPlace: string[];
  };
};

const Main = () => {
  console.log('RENDER');
  // GET FROM JSON FILE
  const [winningWord, setWinningWord] = useState('');
  useEffect(() => {
    console.log('useffect');
    // VOID STATEMENT TO IGNORE NO_FLOATING_PROMISES ESLINT FOR BELOW ASYNC FUNCTION
    // https://github.com/typescript-eslint/typescript-eslint/issues/2569
    void (async () => {
      try {
        const getWinningWord = await fetch('./src/json/words.json');
        if (!getWinningWord.ok) {
          throw new Error();
        }
        const winningWordArr: string[] = (await getWinningWord.json()) as [];
        console.log(winningWordArr);
        // const test = winningWord;
        setWinningWord(
          winningWordArr[Math.floor(Math.random() * winningWordArr.length)]
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  console.log(winningWord);

  // 1, for each throgh obj.keys to geneertate game squares
  // CAN USE ACTIVE KEY TO PREVENT UNESSCERAY RERENDER

  // 2, after 'ENTER' check input against winnnig word and fill inWinngingword and inCorrectPlace

  // 3, style game square based on inWinningWord and inCorrectPlace

  // 4, user inWinninngWord and inCorrectPlace to style keyboard or seperate to prevent additonal loop throgh all keys

  const [userInput, setUserInput] = useState<userInputType>({
    row1: { active: true, input: [], inWinningWord: [], inCorrectPlace: [] },
    row2: { active: false, input: [], inWinningWord: [], inCorrectPlace: [] },
    row3: { active: false, input: [], inWinningWord: [], inCorrectPlace: [] },
    row4: { active: false, input: [], inWinningWord: [], inCorrectPlace: [] },
    row5: { active: false, input: [], inWinningWord: [], inCorrectPlace: [] },
    row6: { active: false, input: [], inWinningWord: [], inCorrectPlace: [] },
  });

  const [keyboardController, setKeyboardController] = useState({
    inCorrectPlace: [],
    inWinningWord: [],
  });

  // TODO: press enter to check winning word - last item on array needs to be enter to continue
  // TODO: press backspace to pop from array
  // TODO: ADD KEY CODE TO PREVENTER ENTER CTRL ETC SHOWING ON BOARD
  // TODO: ADD POPUP WITH BASIC GAME RULES

  const [userInput2, setUserInput2] = useState<string[][]>([]);

  const userInputHandler = (event: React.KeyboardEvent) => {
    const userInputCopy = { ...userInput };
    const keyPressed = event.key;
    const userInputKeys = Object.keys(userInput);
    console.log(userInputKeys);
    console.log(keyPressed);
    console.log(userInput);

    if (!gameRunning) {
      return;
    }

    userInputKeys.forEach((key, index) => {
      if (!userInputCopy[key].active) {
        return;
      }
      if (
        userInputCopy[key].input.length === 5 &&
        index !== userInputKeys.length - 1
      ) {
        userInputCopy[key].active = false;
        userInputCopy[userInputKeys[index + 1]].active = true;
        return;
      }
      if (
        userInputCopy[key].input.length === 5 &&
        index === userInputKeys.length - 1
      ) {
        setGameRunning(false);
        return;
      }
      if (keyPressed === 'Backspace') {
        userInputCopy[key].input.pop();
        return;
      }
      userInputCopy[key].input.push(keyPressed);
    });

    setUserInput({ ...userInputCopy });
  };

  /*
  OLD
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

    // WAIT FOR USER TO PRESS ENTER
    if (userInputCopy[userInputCopy.length - 1].length === 5) {
      if (key === 'Enter') {
        // RUN CHECK GAME WIN FUNC
        userInputCopy[userInputCopy.length - 1].push(key);
        console.log(key);
        return;
      } else {
        return;
      }
    }

    // display user input
    if (userInputCopy[userInputCopy.length - 1].length < 5) {
      console.log(3);
      if (key !== 'Backspace') {
        userInputCopy[userInputCopy.length - 1].push({
          key,
          inWinningWord: null,
          inCorrectPlace: null,
        });
      } else {
        userInputCopy[userInputCopy.length - 1].pop();
      }
    } else {
      userInputCopy.push([]);
      userInputCopy[userInputCopy.length - 1].push(key);
    }
    console.log(userInputCopy);
    setUserInput2(userInputCopy);
    return;
  };*/

  /*
  object keys for each or for loop.
  if row active is true && input.length <5 push keypress to input array
  else set active false and move to next key and set active true
  

  */

  const checkWordHandler = (letterArray: string[], winningWord: string) => {};

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
      <GameBoard userInputProps={userInput} />
      {/* <Keyboard setUserInput={setUserInput} /> */}
    </main>
  );
};

export default Main;
