import { useState, useEffect } from 'react';
import classes from './Main.module.css';
import GameBoard from '../GameBoard/GameBoard';
import Keyboard from '../Keyboard/Keyboard';
import GameStatusModal from '../GameStatusModal/GameStatusModal';

import type { GameStateType } from '../../types/types';

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

type InputKey = {
  backSpace: 'Backspace';
  enter: 'Enter';
};

type KeyboardControllerType = {
  inCorrectPlace: string[];
  inWinningWord: string[];
  notInWinningWord: string[];
};

type GameRunningType = {
  status: 'win' | 'lose' | 'init' | 'running';
  running: boolean;
};

const Main = () => {
  console.log('RENDER');
  // SET FALSE ON FAIL OR SUCCESS
  const [gameRunning, setGameRunning] = useState<GameRunningType>({
    status: 'init',
    running: false,
  });

  // GET FROM JSON FILE
  const [winningWord, setWinningWord] = useState<string | undefined>('');

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

  const [gameState, setGameState] = useState<GameStateType>({
    row1: {
      status: 'active',
      input: [],
    },
    row2: {
      status: 'inactive',
      input: [],
    },
    row3: {
      status: 'inactive',
      input: [],
    },
    row4: {
      status: 'inactive',
      input: [],
    },
    row5: {
      status: 'inactive',
      input: [],
    },
    row6: {
      status: 'inactive',
      input: [],
    },
  });

  console.log(gameState);

  const [keyboardController, setKeyboardController] =
    useState<KeyboardControllerType>({
      inCorrectPlace: [],
      inWinningWord: [],
      notInWinningWord: [],
    });

  // TODO: press enter to check winning word - last item on array needs to be enter to continu  NEED REFACTOR

  // TODO: ADD POPUP WITH BASIC GAME RULES
  // TODO: CHECK FOR WIN
  // TODO: CREATE RESET GAMESTATE FUNC

  // const [userInput2, setUserInput2] = useState<string[][]>([]);

  const deleteHandler = (inputArr: UserInputType[]) => {
    inputArr.pop();
  };

  const checkWordHandler = (
    row: rowType,
    keyboardControllerCopy: KeyboardControllerType
  ) => {
    const winningWordArr = winningWord.split('');
    const gameStateInputCopy = [...row.input];
    // NEEDED FOR DEEP COPY OF STATE INPUT ????? not sure
    // row.input.forEach((el) => {
    //   console.log(el);
    //   gameStateInputCopy.push(structuredClone(el));
    // });

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
    gameStateInputCopy.forEach((el) => {
      if (winningWordArr.indexOf(el.input) !== -1) {
        el.inWinningWord = true;
        winningWordArr.splice(winningWordArr.indexOf(el.input), 1);
        // gameStateInputCopy.splice(index, 1);

        // inWinnigWordTest.push(winningWordArr.pop());
        keyboardControllerCopy.inWinningWord.push(el.input);
      } else {
        keyboardControllerCopy.notInWinningWord.push(el.input);
        el.inWinningWord = false;
      }
    });
  };

  const checkWinHandler = (inputArr: UserInputType[]) => {
    let win = true;

    for (let i = 0; i < inputArr.length; i++) {
      if (!win) {
        break;
      }
      if (!inputArr[i].inCorrectPlace) {
        win = false;
      }
    }
    return win;
  };

  const endGameHandler = (winLose: 'win' | 'lose') => {
    const gameRunningCopy: GameRunningType = { ...gameRunning };

    gameRunningCopy.running = false;
    gameRunningCopy.status = winLose;
    setGameRunning({ ...gameRunningCopy });
    return;
  };

  const resetGameHandler = () => {
    // TODO: need to reste keyboard and get new Word
    const gameStateCopy = { ...gameState };
    const gameStateCopyKeys = Object.keys(gameStateCopy);
    gameStateCopyKeys.forEach((el, index) => {
      while (gameStateCopy[el].input.length) {
        gameStateCopy[el].input.pop();
      }
      if (index === 0) {
        gameStateCopy[el].status = 'active';
      } else {
        gameStateCopy[el].status = 'inactive';
      }
    });
  };

  const clearKeyboardHandler = () => {
    const keyboardControllerCopy = { ...keyboardController };
    const keyboardControllerCopyKeys = Object.keys(keyboardControllerCopy);

    keyboardControllerCopyKeys.forEach((el) => {
      while (keyboardControllerCopy[el].length) {
        keyboardControllerCopy[el].pop();
      }
    });
    setKeyboardController({ ...keyboardControllerCopy });
  };

  const getWinningWordHandler = async () => {
    try {
      const getWinningWord = await fetch('./src/json/words.json');
      if (!getWinningWord.ok) {
        throw new Error();
      }
      const winningWordArr: string[] = (await getWinningWord.json()) as [];
      console.log(winningWordArr);
      // const test = winningWord;
      return winningWordArr[Math.floor(Math.random() * winningWordArr.length)];
    } catch (error) {
      console.error(error);
    }
  };

  const validateKeyPressedHandler = (
    keyPressed: string | null,
    keyPressedCode: string
  ) => {
    let validate = true;
    if (keyPressed === null) {
      validate = false;
      return validate;
    }
    if (keyPressedCode[0] !== 'K') {
      validate = false;
    }
    if (keyPressedCode === 'Backspace') {
      validate = true;
    }
    if (keyPressedCode === 'Enter') {
      validate = true;
    }

    return validate;
  };

  const pushInputHandler = (
    input: UserInputType[],
    keyPressed: string | null,
    inputKey: InputKey
  ) => {
    if (keyPressed === null) {
      return false;
    }
    if (keyPressed === inputKey.backSpace || keyPressed === inputKey.enter) {
      return false;
    }

    if (input.length < 5) {
      input.push({
        input: keyPressed,
        inWinningWord: null,
        inCorrectPlace: null,
      });
      return true;
    }
    return false;
  };

  // TODO: NEED TO MAKE DEEP COPY OF STATE

  const userInputHandler = (event: React.KeyboardEvent) => {
    const inputKey: InputKey = {
      backSpace: 'Backspace',
      enter: 'Enter',
    };

    const keyPressedCode: string | null = event.code;
    const userInputKeys = Object.keys(gameState);
    const gameStateCopy = { ...gameState };
    const keyboardControllerCopy = { ...keyboardController };

    let keyPressed: string | null = event.key;
    let reRender = false;

    if (!validateKeyPressedHandler(keyPressed, keyPressedCode)) {
      return;
    }

    if (!gameRunning.running) {
      return;
    }
    // NEED TO CHNAGE TO FOR LOOP SO CAN USE BREAK AFTER 'ENTER'
    userInputKeys.forEach((key, index) => {
      // MOVES TO NEXT ITEM IN KEY IF STATUS IS INACTIVE
      if (gameStateCopy[key].status === 'inactive' || keyPressed === null) {
        return;
      }

      // CHECK WIN
      if (
        keyPressed === inputKey.enter &&
        gameStateCopy[key].input.length === 5
      ) {
        checkWordHandler(gameStateCopy[key], keyboardControllerCopy);

        gameStateCopy[key].status = 'inactive';
        if (index !== userInputKeys.length - 1) {
          gameStateCopy[userInputKeys[index + 1]].status = 'active';
        }

        if (checkWinHandler(gameStateCopy[key].input)) {
          // TODO: CREATE FUNC AS REPEATED BELOW

          endGameHandler('win');
          return;
        }

        // END GAME
        if (index === userInputKeys.length - 1) {
          endGameHandler('lose');
        }
        keyPressed = null;
        reRender = true;
        return;
      }

      // DELETE KEY
      if (
        keyPressed === inputKey.backSpace &&
        gameStateCopy[key].input.length > 0
      ) {
        console.log(gameStateCopy[key].input);
        deleteHandler(gameStateCopy[key].input);
        reRender = true;
        return;
      }

      // create func with check for ENTER BACKSPACE TO prevent rerender
      if (pushInputHandler(gameStateCopy[key].input, keyPressed, inputKey)) {
        reRender = true;
      }
    });
    if (reRender) {
      setGameState({ ...gameStateCopy });
      setKeyboardController({ ...keyboardControllerCopy });
    }
  };

  const gameRunningHandler = async (): Promise<boolean> => {
    const gameRunningStateCopy = { ...gameRunning };
    gameRunningStateCopy.running = true;
    if (
      gameRunningStateCopy.status === 'win' ||
      gameRunningStateCopy.status === 'lose'
    ) {
      resetGameHandler();
      clearKeyboardHandler();
    }
    const winningWord = await getWinningWordHandler();
    setWinningWord(winningWord);
    setGameRunning({ ...gameRunningStateCopy });
    return true;
  };

  return (
    <main
      className={classes.main}
      tabIndex={0}
      onKeyDown={(event) => {
        userInputHandler(event);
      }}
    >
      <p>{gameRunning.running ? 'game is running' : 'game is not running'}</p>
      {!gameRunning.running && (
        <GameStatusModal
          setGameRunningProps={gameRunningHandler}
          gameStatusProps={gameRunning.status}
          winningWordProps={winningWord}
        />
      )}
      <GameBoard gameStateProps={gameState} winningWordProps={winningWord} />
      <Keyboard keyboardControllerProps={keyboardController}></Keyboard>
    </main>
  );
};

export default Main;
