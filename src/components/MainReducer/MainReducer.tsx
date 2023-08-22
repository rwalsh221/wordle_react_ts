import { useState, useEffect, useCallback, useReducer } from 'react';
import classes from './Main.module.css';
import GameBoard from '../GameBoard/GameBoard';
import Keyboard from '../Keyboard/Keyboard';
import GameStatusModal from '../GameStatusModal/GameStatusModal';
import _ from 'lodash';
import { copyState } from '../../helpers/helpers';
import userInputReducer from '../Main/Main.reducer';

import type {
  GameStateType,
  GameStateStatus,
  UserInputType,
  KeyboardControllerType,
  GameStateX,
} from '../../types/types';

type RowType = {
  status: GameStateStatus;
  input: UserInputType[];
};

type InputKey = {
  backSpace: 'Backspace';
  enter: 'Enter';
};

type GameRunningType = {
  status: 'win' | 'lose' | 'init' | 'running';
  running: boolean;
};

const Main = () => {
  // TODO: DEEP COPY STATE OBJ

  const gameStatex: GameStateX = {
    winningWord: '',
    inputState: {
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
    },
    keyboardController: {
      inCorrectPlace: [],
      inWinningWord: [],
      notInWinningWord: [],
    },
    gameStatus: {
      status: 'init',
      running: false,
    },
  };
  // STATE START

  const [gameRunning, setGameRunning] = useState<GameRunningType>({
    status: 'init',
    running: false,
  });

  // GET FROM JSON FILE
  const [winningWord, setWinningWord] = useState<string>('');

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

  const [keyboardController, setKeyboardController] =
    useState<KeyboardControllerType>({
      inCorrectPlace: [],
      inWinningWord: [],
      notInWinningWord: [],
    });

  // STATE END

  const deleteHandler = (inputArr: UserInputType[]) => {
    inputArr.pop();
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

  // const getWinningWordHandler = async () => {
  //   try {
  //     const getWinningWord = await fetch('./src/json/words.json');
  //     if (!getWinningWord.ok) {
  //       throw new Error();
  //     }
  //     const winningWordArr: string[] = (await getWinningWord.json()) as [];

  //     return winningWordArr[Math.floor(Math.random() * winningWordArr.length)];
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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

  const [gameStateRed, gameStateDispatch] = useReducer(
    userInputReducer,
    gameStatex
  );

  const userInputHandler = useCallback(
    (userInput: string) => {
      const endGameHandler = (winLose: 'win' | 'lose') => {
        const gameRunningCopy = _.cloneDeep(gameRunning);

        gameRunningCopy.running = false;
        gameRunningCopy.status = winLose;
        setGameRunning({ ...gameRunningCopy });
        return;
      };

      const checkWordHandler = (
        activeRow: RowType,
        keyboardControllerCopy: KeyboardControllerType
      ) => {
        const winningWordArr = winningWord.split('');
        const gameStateInputCopy = [...activeRow.input]; // DONT NEED COPY

        // NEEDED FOR DEEP COPY OF STATE INPUT ????? not sure
        // row.input.forEach((el) => {
        //   console.log(el);
        //   gameStateInputCopy.push(structuredClone(el));
        // });

        // CHECK IF USER INPUT IS IN CORRECT PLACE IN WINNING WORD
        for (let i = winningWordArr.length - 1; i >= 0; i--) {
          if (winningWordArr[i] === gameStateInputCopy[i].input) {
            keyboardControllerCopy.inCorrectPlace.push(winningWordArr[i]);

            gameStateInputCopy[i].inWinningWord = false;
            gameStateInputCopy[i].inCorrectPlace = true;
            gameStateInputCopy.splice(i, 1);

            winningWordArr.splice(i, 1);
          } else {
            gameStateInputCopy[i].inCorrectPlace = false;
          }
        }

        // CHECK IF USER INPUT IS IN WINNING WORD BUT NOT CORRECT PLACE
        gameStateInputCopy.forEach((el) => {
          if (winningWordArr.indexOf(el.input) !== -1) {
            el.inWinningWord = true;
            winningWordArr.splice(winningWordArr.indexOf(el.input), 1);
            keyboardControllerCopy.inWinningWord.push(el.input);
          } else {
            keyboardControllerCopy.notInWinningWord.push(el.input);
            el.inWinningWord = false;
          }
        });
      };

      const inputKey: InputKey = {
        backSpace: 'Backspace',
        enter: 'Enter',
      };

      const userInputKeys = Object.keys(gameState);
      const gameStateCopy = { ...gameState };
      const keyboardControllerCopy = { ...keyboardController };

      let keyPressed: string | null = userInput;
      let reRender = false;

      if (!gameRunning.running) {
        return;
      }
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
    },
    [gameState, gameRunning, keyboardController, winningWord]
  );

  // HANDLES INPUT FROM USER KEYBOARD
  const userKeyboardInputHandler = useCallback(
    (event: KeyboardEvent) => {
      const keyPressedCode: string = event.code;
      const keyPressed: string = event.key;

      if (!validateKeyPressedHandler(keyPressed, keyPressedCode)) {
        return;
      }
      userInputHandler(keyPressed);
    },
    [userInputHandler]
  );

  // HANDLES INPUT FROM UI KEYBOARD
  const UIKeyboardInputHandler = (UIKeyboardClick: string) => {
    return userInputHandler(UIKeyboardClick);
  };

  useEffect(() => {
    document.addEventListener('keydown', userKeyboardInputHandler);
    return function cleanUp() {
      document.removeEventListener('keydown', userKeyboardInputHandler);
    };
  }, [userKeyboardInputHandler]);

  return (
    <main className={classes.main}>
      {!gameRunning.running && (
        <GameStatusModal
          setGameRunningProps={gameRunningHandler}
          gameStatusProps={gameRunning.status}
          winningWordProps={winningWord}
        />
      )}
      <GameBoard gameStateProps={gameState} winningWordProps={winningWord} />
      <Keyboard
        keyboardControllerProps={keyboardController}
        keyboardClickHandlerProps={UIKeyboardInputHandler}
      ></Keyboard>
    </main>
  );
};

export default Main;
