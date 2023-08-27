import { useEffect, useCallback, useReducer } from 'react';
import classes from './Main.module.css';
import GameBoard from '../GameBoard/GameBoard';
import Keyboard from '../Keyboard/Keyboard';
import GameStatusModal from '../GameStatusModal/GameStatusModal';
import GameState from '../../helpers/classes/GameState';

import { validateKeyPressedHandler } from '../../helpers/helpers';
import userInputReducer from '../../helpers/reducers/userInputReducer';

import type { InputKey } from '../../types/types';

// TODO: REPLACE WITH MAIN. AND TYPES OF X

const MainReducer = () => {
  // STATE AND REDUCER

  const gameStateInit = new GameState();

  const [gameState, gameStateDispatch] = useReducer(
    userInputReducer,
    gameStateInit
  );

  // END STATE AND REDUCER

  const userInputHandler = useCallback(
    (userInput: string) => {
      const inputKey: InputKey = {
        backSpace: 'Backspace',
        enter: 'Enter',
      };

      const userInputKeys = Object.keys(gameState.inputState);

      const keyPressed: string | null = userInput;

      if (!gameState.gameStatus.running) {
        return;
      }
      userInputKeys.forEach((key, index) => {
        // MOVES TO NEXT ITEM IN KEY IF STATUS IS INACTIV
        if (
          gameState.inputState[key].status === 'inactive' ||
          keyPressed === null
        ) {
          return;
        }

        // CHECK WIN
        if (
          keyPressed === inputKey.enter &&
          gameState.inputState[key].input.length === 5
        ) {
          gameStateDispatch({
            type: 'check-win',
            payload: {
              activeRowKey: key,
              activeRowIndex: index,
              nextRowKey: userInputKeys[index + 1],
            },
          });
        }

        // DELETE KEY
        if (
          keyPressed === inputKey.backSpace &&
          gameState.inputState[key].input.length > 0
        ) {
          gameStateDispatch({
            type: 'delete-input',
            payload: {
              activeRowKey: key,
            },
          });
        }

        gameStateDispatch({
          type: 'add-input',
          payload: {
            keyPressed: keyPressed,
            activeRowKey: key,
          },
        });
      });
    },
    [gameState]
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
      {!gameState.gameStatus.running && (
        <GameStatusModal
          dispatchGameRunningProps={gameStateDispatch}
          gameStatusProps={gameState.gameStatus.status}
          winningWordProps={gameState.winningWord}
        />
      )}
      <GameBoard
        gameStateProps={gameState}
        winningWordProps={gameState.winningWord}
      />
      <Keyboard
        keyboardControllerProps={gameState.keyboardController}
        keyboardClickHandlerProps={UIKeyboardInputHandler}
      ></Keyboard>
    </main>
  );
};

export default MainReducer;
