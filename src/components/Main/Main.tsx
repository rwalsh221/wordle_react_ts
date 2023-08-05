import { useState, useEffect } from 'react';
import classes from './Main.module.css';
import GameBoard from '../GameBoard/GameBoard';
import Keyboard from '../Keyboard/Keyboard';

import type { GameStateType } from '../../types/types';

// import json from '../../json/words.json';

type UserInputType = {
  input: string;
  inWinningWord: boolean | null;
  inCorrectPlace: boolean | null;
};

type rowType = {
  active: boolean;
  input: string[];
  inWinningWord: string[];
  inCorrectPlace: string[];
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

  // TODO: SOMETHING WRONGZ WITH LAST ROW ENTER

  // 1, for each throgh obj.keys to geneertate game squares
  // CAN USE ACTIVE KEY TO PREVENT UNESSCERAY RERENDER

  // 2, after 'ENTER' check input against winnnig word and fill inWinngingword and inCorrectPlace

  // 3, style game square based on inWinningWord and inCorrectPlace

  // 4, user inWinninngWord and inCorrectPlace to style keyboard or seperate to prevent additonal loop throgh all keys

  const [gameState, setGameState] = useState<GameStateType>({
    row1: {
      status: 'active',
      input: [],
      inWinningWord: [],
      inCorrectPlace: [],
    },
    row2: {
      status: 'inactive',
      input: [],
      inWinningWord: [],
      inCorrectPlace: [],
    },
    row3: {
      status: 'inactive',
      input: [],
      inWinningWord: [],
      inCorrectPlace: [],
    },
    row4: {
      status: 'inactive',
      input: [],
      inWinningWord: [],
      inCorrectPlace: [],
    },
    row5: {
      status: 'inactive',
      input: [],
      inWinningWord: [],
      inCorrectPlace: [],
    },
    row6: {
      status: 'inactive',
      input: [],
      inWinningWord: [],
      inCorrectPlace: [],
    },
  });

  console.log(gameState);

  const [keyboardController, setKeyboardController] = useState({
    inCorrectPlace: [],
    inWinningWord: [],
  });

  // TODO: press enter to check winning word - last item on array needs to be enter to continue
  // TODO: ADD KEY CODE TO PREVENTER ENTER CTRL ETC SHOWING ON BOARD
  // TODO: ADD POPUP WITH BASIC GAME RULES
  // TODO: ONLY SET STATE IF CHANGE MADE

  // const [userInput2, setUserInput2] = useState<string[][]>([]);

  const deleteHandler = (inputArr: UserInputType[]) => {
    inputArr.pop();
  };

  const checkWordHandler = (row: rowType, keyboardControllerCopy) => {
    console.log('hello');
    console.log(row);
    const winningWordArr = winningWord.split('');
    const gameStateInputCopy = [...row.input];
    // NEEDED FOR DEEP COPY OF STATE INPUT ????? not sure
    // row.input.forEach((el) => {
    //   console.log(el);
    //   gameStateInputCopy.push(structuredClone(el));
    // });
    console.log(gameStateInputCopy);
    const inWinnigWordTest = [];
    const inCorrectPlaceTest = [];

    for (let i = winningWordArr.length - 1; i >= 0; i--) {
      console.log(winningWordArr[i]);
      if (winningWordArr[i] === gameStateInputCopy[i].input) {
        keyboardControllerCopy.inCorrectPlace.push(winningWordArr[i]);
        console.log(true, winningWordArr[i], gameStateInputCopy[i]);
        inCorrectPlaceTest.push(winningWordArr.splice(i, 1));
        gameStateInputCopy[i].inWinningWord = false;
        gameStateInputCopy[i].inCorrectPlace = true;
        gameStateInputCopy.splice(i, 1);
      } else {
        console.log(false, winningWordArr[i], gameStateInputCopy[i]);
        gameStateInputCopy[i].inCorrectPlace = false;
      }
    }
    console.log('betwtte', gameStateInputCopy);

    //
    gameStateInputCopy.forEach((el, index) => {
      console.log('this is EL EL EL', el, winningWordArr);
      if (winningWordArr.indexOf(el.input) !== -1) {
        el.inWinningWord = true;
        winningWordArr.splice(winningWordArr.indexOf(el.input), 1);
        // gameStateInputCopy.splice(index, 1);

        // inWinnigWordTest.push(winningWordArr.pop());
        keyboardControllerCopy.inWinningWord.push(el.input);
      } else {
        el.inWinningWord = false;
      }
    });
    //

    // while (gameStateInputCopy.length) {
    //   console.log('while //////////////////////////////////////////////');
    //   console.log(winningWordArr);
    //   console.log(winningWordArr[winningWordArr.length - 1]);
    //   console.log(gameStateInputCopy[winningWordArr.length - 1].input);
    //   console.log(
    //     winningWordArr.indexOf(
    //       gameStateInputCopy[winningWordArr.length - 1].input
    //     )
    //   );
    //   console.log('while //////////////////////////////////////////////');

    //   if (
    //     winningWordArr.indexOf(
    //       gameStateInputCopy[winningWordArr.length - 1].input
    //     ) !== -1
    //   ) {
    //     console.log(
    //       'true inword',
    //       gameStateInputCopy[winningWordArr.length - 1]
    //     );
    //     gameStateInputCopy[winningWordArr.length - 1].inWinningWord = true;
    //     gameStateInputCopy.splice(
    //       gameStateInputCopy.indexOf(
    //         winningWordArr[winningWordArr.length - 1],
    //         1
    //       )
    //     );

    //     inWinnigWordTest.push(winningWordArr.pop());
    //   } else {
    //     console.log('12212', gameStateInputCopy[winningWordArr.length - 1]);
    //     gameStateInputCopy[winningWordArr.length - 1].inWinningWord = false;
    //     winningWordArr.pop();
    //   }
    // }
    console.log(inWinnigWordTest);
    console.log(inCorrectPlaceTest);
  };

  const userInputHandler = (event: React.KeyboardEvent) => {
    const inputKey = {
      backSpace: 'Backspace',
      enter: 'Enter',
    };

    const gameStateCopy = { ...gameState };
    const keyboardControllerCopy = { ...keyboardController };
    let keyPressed: string | null = event.key;
    const userInputKeys = Object.keys(gameState);

    if (!gameRunning) {
      return;
    }
    // NEED TO CHNAGE TO FOR LOOP SO CAN USE BREAK AFTER 'ENTER'
    userInputKeys.forEach((key, index) => {
      if (keyPressed === null) {
        return;
      }
      // MOVES TO NEXT ITEM IN KEY IF STATUS IS INACTIVE
      if (gameStateCopy[key].status === 'inactive') {
        return;
      }
      // SET NEXT ROW ACTIVE && KEY === 'ENTER'
      if (
        gameStateCopy[key].input.length === 5 &&
        index !== userInputKeys.length - 1
      ) {
        if (keyPressed === inputKey.backSpace) {
          deleteHandler(gameStateCopy[key].input);
          return;
        }
        if (keyPressed === inputKey.enter) {
          checkWordHandler(
            // winningWord,
            // gameStateCopy[key].input,
            gameStateCopy[key],
            keyboardControllerCopy
          );
          gameStateCopy[key].status = 'inactive';
          gameStateCopy[userInputKeys[index + 1]].status = 'active';
          keyPressed = null;
        }
        console.log(gameState);
        console.log('enter return');
        return;
      }
      // DELETE KEY
      if (keyPressed === inputKey.backSpace) {
        deleteHandler(gameStateCopy[key].input);
        return;
      }
      // GAME END
      if (
        gameStateCopy[key].input.length === 5 &&
        index === userInputKeys.length - 1
      ) {
        setGameRunning(false);
        return;
      }
      console.log('no return');
      gameStateCopy[key].input.push({
        input: keyPressed,
        inWinningWord: null,
        inCorrectPlace: null,
      });
    });
    console.log('return test');
    console.log(keyboardControllerCopy);
    setGameState({ ...gameStateCopy });
    setKeyboardController({ ...keyboardControllerCopy });
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
    const gameStateCopy = [...userInput2];
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
      <GameBoard gameStateProps={gameState} winningWordProps={winningWord} />
      {/* <Keyboard setUserInput={setUserInput} /> */}
      <Keyboard keyboardControllerProps={keyboardController}></Keyboard>
    </main>
  );
};

export default Main;
